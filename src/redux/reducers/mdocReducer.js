//mdoc reducers
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

const initialState = {
  readLoading: false,
  writeLoading: false,
  error: {},
  mdocs: [],
  mdoc: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case READ_MDOC_ALL:
      return {
        ...state,
        readLoading: false,
        mdocs: action.payload,
        error: {}
      };
    case READ_MDOC:
      return {
        ...state,
        readLoading: false,
        mdoc: action.payload,
        error: {}
      };
    case CREATE_MDOC:
      return {
        ...state,
        writeLoading: false,
        mdocs: [...state.mdocs, action.payload],
        error: {}
      };
    case DELETE_MDOC:
      return {
        ...state,
        writeLoading: false,
        error: {}
      };
    case UPDATE_MDOC:
      return {
        ...state,
        writeLoading: false,
        error: {}
      };
    case READ_LOADING_MDOC:
      return {
        ...state,
        readLoading: true,
        error: {}
      };
    case WRITE_LOADING_MDOC:
      return {
        ...state,
        writeLoading: true,
        error: {}
      };
    case SET_MDOC_ERROR:
      return {
        ...state,
        readLoading: false,
        writeLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
}
