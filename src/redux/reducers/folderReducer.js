//folder reducers
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

const initialState = {
  readLoading: false,
  writeLoading: false,
  error: {},
  folders: [],
  folder: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case READ_FOLDER_ALL:
      return {
        ...state,
        readLoading: false,
        folders: action.payload,
        error: {}
      };
    case READ_FOLDER:
      return {
        ...state,
        readLoading: false,
        folder: action.payload,
        error: {}
      };
    case CREATE_FOLDER:
      return {
        ...state,
        writeLoading: false,
        folders: [...state.folders, action.payload],
        error: {}
      };
    case DELETE_FOLDER:
      return {
        ...state,
        writeLoading: false,
        error: {}
      };
    case UPDATE_FOLDER:
      return {
        ...state,
        writeLoading: false,
        error: {}
      };
    case READ_LOADING_FOLDER:
      return {
        ...state,
        readLoading: true,
        error: {}
      };
    case WRITE_LOADING_FOLDER:
      return {
        ...state,
        writeLoading: true,
        error: {}
      };
    case SET_FOLDER_ERROR:
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
