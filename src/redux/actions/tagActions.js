import {
  CREATE_TAG,
  READ_TAG_ALL,
  READ_TAG,
  UPDATE_TAG,
  DELETE_TAG,
  READ_LOADING_TAG,
  WRITE_LOADING_TAG,
  SET_TAG_ERROR
} from "../types";
import axios from "axios";

import { addMessageUtil, getErrors } from "./actionsUtil.js";

export const getTags = () => async dispatch => {
  dispatch({ type: READ_LOADING_TAG });
  try {
    const tags = await axios.get("/tag");
    dispatch({ type: READ_TAG_ALL, payload: tags.data });
    return tags;
  } catch (err) {
    const errors = getErrors(err);
    console.log(err);
    console.log(errors);
    dispatch({
      type: SET_TAG_ERROR,
      payload: errors
    });
  }
};

export const getTag = id => async dispatch => {
  dispatch({ type: READ_LOADING_TAG });
  try {
    const tag = await axios.get("/tag/" + id);
    dispatch({ type: READ_TAG, payload: tag.data });
    return tag;
  } catch (err) {
    const errors = getErrors(err);
    console.log(err);
    console.log(errors);
    dispatch({
      type: SET_TAG_ERROR,
      payload: errors
    });
  }
};

export const createTag = (data, history) => async dispatch => {
  dispatch({ type: WRITE_LOADING_TAG });
  try {
    const tag = await axios.post("/tag", data);
    dispatch({ type: CREATE_TAG, payload: tag.data });
    addMessageUtil({ message: "Tag created successfully", timeout: 4000 }, dispatch);
    history.push(`/tag`);
  } catch (err) {
    const errors = getErrors(err);
    console.log(err);
    console.log(errors);
    dispatch({
      type: SET_TAG_ERROR,
      payload: errors
    });
  }
};

export const editTag = (id, tag, history) => async dispatch => {
  dispatch({ type: WRITE_LOADING_TAG });
  try {
    const tagData = await axios.put(`/tag/${id}`, tag);
    dispatch({
      type: UPDATE_TAG,
      payload: tagData.data
    });
    addMessageUtil(
      { message: "Tag updated successfully", timeout: 4000 },
      dispatch
    );
    history.push(`/tag/${id}`);
  } catch (err) {
    const errors = getErrors(err);
    console.log(err);
    console.log(errors);
    dispatch({
      type: SET_TAG_ERROR,
      payload: errors
    });
  }
};

export const deleteTag = (id, history) => async dispatch => {
  dispatch({ type: WRITE_LOADING_TAG });
  try {
    const tag = await axios.delete("/tag/" + id);
    dispatch({ type: DELETE_TAG, payload: tag.data });
    addMessageUtil(
      { message: "Tag deleted successfully", timeout: 4000 },
      dispatch
    );
    history.push("/tag");
  } catch (err) {
    const errors = getErrors(err);
    console.log(err);
    console.log(errors);
    dispatch({
      type: SET_TAG_ERROR,
      payload: errors
    });
  }
};
