import {
  CREATE_FOLDER,
  READ_FOLDER_ALL,
  READ_FOLDER,
  UPDATE_FOLDER,
  DELETE_FOLDER,
  READ_LOADING_FOLDER,
  WRITE_LOADING_FOLDER,
  SET_FOLDER_ERROR
} from "../types";
import axios from "axios";

import { addMessageUtil, getErrors } from "./actionsUtil.js";

export const getFolders = () => async dispatch => {
  dispatch({ type: READ_LOADING_FOLDER });
  try {
    const folders = await axios.get("/folder");
    dispatch({ type: READ_FOLDER_ALL, payload: folders.data });
    return folders;
  } catch (err) {
    const errors = getErrors(err);
    console.log(err);
    console.log(errors);
    dispatch({
      type: SET_FOLDER_ERROR,
      payload: errors
    });
  }
};

export const getFolder = id => async dispatch => {
  dispatch({ type: READ_LOADING_FOLDER });
  try {
    const folder = await axios.get("/folder/" + id);
    const children = await axios.get("/folder/" + id + "/children");

    dispatch({ type: READ_FOLDER, payload: {...folder.data, children: children.data }});
    
    return folder;
  } catch (err) {
    const errors = getErrors(err);
    console.log(err);
    console.log(errors);
    dispatch({
      type: SET_FOLDER_ERROR,
      payload: errors
    });
  }
};

export const createFolder = (data, history) => async dispatch => {
  dispatch({ type: WRITE_LOADING_FOLDER });
  try {
    const folder = await axios.post("/folder", data);
    dispatch({ type: CREATE_FOLDER, payload: folder.data });
    addMessageUtil({ message: "Folder created successfully", timeout: 4000 }, dispatch);
    history.push(`/folder`);
  } catch (err) {
    const errors = getErrors(err);
    console.log(err);
    console.log(errors);
    dispatch({
      type: SET_FOLDER_ERROR,
      payload: errors
    });
  }
};

export const editFolder = (id, folder, history) => async dispatch => {
  dispatch({ type: WRITE_LOADING_FOLDER });
  try {
    const folderData = await axios.put(`/folder/${id}`, folder);
    dispatch({
      type: UPDATE_FOLDER,
      payload: folderData.data
    });
    addMessageUtil(
      { message: "Folder updated successfully", timeout: 4000 },
      dispatch
    );
    history.push(`/folder/${id}`);
  } catch (err) {
    const errors = getErrors(err);
    console.log(err);
    console.log(errors);
    dispatch({
      type: SET_FOLDER_ERROR,
      payload: errors
    });
  }
};

export const deleteFolder = (id, history) => async dispatch => {
  dispatch({ type: WRITE_LOADING_FOLDER });
  try {
    const folder = await axios.delete("/folder/" + id);
    dispatch({ type: DELETE_FOLDER, payload: folder.data });
    addMessageUtil(
      { message: "Folder deleted successfully", timeout: 4000 },
      dispatch
    );
    history.push("/folder");
  } catch (err) {
    const errors = getErrors(err);
    console.log(err);
    console.log(errors);
    dispatch({
      type: SET_FOLDER_ERROR,
      payload: errors
    });
  }
};
