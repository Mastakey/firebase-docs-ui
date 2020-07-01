//tag reducers
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

const initialState = {
  readLoading: false,
  writeLoading: false,
  error: {},
  tags: [],
  tag: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case READ_TAG_ALL:
      return {
        ...state,
        readLoading: false,
        tags: action.payload,
        error: {}
      };
    case READ_TAG:
      return {
        ...state,
        readLoading: false,
        tag: action.payload,
        error: {}
      };
    case CREATE_TAG:
      return {
        ...state,
        writeLoading: false,
        tags: [...state.tags, action.payload],
        error: {}
      };
    case DELETE_TAG:
      return {
        ...state,
        writeLoading: false,
        error: {}
      };
    case UPDATE_TAG:
      return {
        ...state,
        writeLoading: false,
        error: {}
      };
    case READ_LOADING_TAG:
      return {
        ...state,
        readLoading: true,
        error: {}
      };
    case WRITE_LOADING_TAG:
      return {
        ...state,
        writeLoading: true,
        error: {}
      };
    case SET_TAG_ERROR:
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
