import {
  CREATE_MDOC,
  READ_MDOC_ALL,
  READ_MDOC,
  UPDATE_MDOC,
  DELETE_MDOC,
  READ_LOADING_MDOC,
  WRITE_LOADING_MDOC,
  SET_MDOC_ERROR
} from "../types";
import axios from "axios";

import { addMessageUtil, getErrors } from "./actionsUtil.js";

export const getMdocs = () => async dispatch => {
  dispatch({ type: READ_LOADING_MDOC });
  try {
    const mdocs = await axios.get("/mdoc");
    dispatch({ type: READ_MDOC_ALL, payload: mdocs.data });
    return mdocs;
  } catch (err) {
    const errors = getErrors(err);
    console.log(err);
    console.log(errors);
    dispatch({
      type: SET_MDOC_ERROR,
      payload: errors
    });
  }
};

export const getMdoc = id => async dispatch => {
  dispatch({ type: READ_LOADING_MDOC });
  try {
    const mdoc = await axios.get("/mdoc/" + id);
    dispatch({ type: READ_MDOC, payload: mdoc.data });
    return mdoc;
  } catch (err) {
    const errors = getErrors(err);
    console.log(err);
    console.log(errors);
    dispatch({
      type: SET_MDOC_ERROR,
      payload: errors
    });
  }
};

export const createMdoc = (data, history) => async dispatch => {
  dispatch({ type: WRITE_LOADING_MDOC });
  try {
    const mdoc = await axios.post("/mdoc", data);
    dispatch({ type: CREATE_MDOC, payload: mdoc.data });
    addMessageUtil({ message: "Mdoc created successfully", timeout: 4000 }, dispatch);
    history.push(`/mdoc`);
  } catch (err) {
    const errors = getErrors(err);
    console.log(err);
    console.log(errors);
    dispatch({
      type: SET_MDOC_ERROR,
      payload: errors
    });
  }
};

export const editMdoc = (id, mdoc, history) => async dispatch => {
  dispatch({ type: WRITE_LOADING_MDOC });
  try {
    const mdocData = await axios.put(`/mdoc/${id}`, mdoc);
    dispatch({
      type: UPDATE_MDOC,
      payload: mdocData.data
    });
    addMessageUtil(
      { message: "Mdoc updated successfully", timeout: 4000 },
      dispatch
    );
    history.push(`/mdoc/${id}`);
  } catch (err) {
    const errors = getErrors(err);
    console.log(err);
    console.log(errors);
    dispatch({
      type: SET_MDOC_ERROR,
      payload: errors
    });
  }
};

export const deleteMdoc = (id, history) => async dispatch => {
  dispatch({ type: WRITE_LOADING_MDOC });
  try {
    const mdoc = await axios.delete("/mdoc/" + id);
    dispatch({ type: DELETE_MDOC, payload: mdoc.data });
    addMessageUtil(
      { message: "Mdoc deleted successfully", timeout: 4000 },
      dispatch
    );
    history.push("/mdoc");
  } catch (err) {
    const errors = getErrors(err);
    console.log(err);
    console.log(errors);
    dispatch({
      type: SET_MDOC_ERROR,
      payload: errors
    });
  }
};
