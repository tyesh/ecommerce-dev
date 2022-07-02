import {
  AUTHOR_CREATE_FAIL,
  AUTHOR_CREATE_REQUEST,
  AUTHOR_CREATE_RESET,
  AUTHOR_CREATE_SUCCESS,
  AUTHOR_DELETE_FAIL,
  AUTHOR_DELETE_REQUEST,
  AUTHOR_DELETE_SUCCESS,
  AUTHOR_DETAILS_FAIL,
  AUTHOR_DETAILS_REQUEST,
  AUTHOR_DETAILS_RESET,
  AUTHOR_DETAILS_SUCCESS,
  AUTHOR_LIST_ALL_FAIL,
  AUTHOR_LIST_ALL_REQUEST,
  AUTHOR_LIST_ALL_SUCCESS,
  AUTHOR_LIST_FAIL,
  AUTHOR_LIST_REQUEST,
  AUTHOR_LIST_SUCCESS,
  AUTHOR_UPDATE_FAIL,
  AUTHOR_UPDATE_REQUEST,
  AUTHOR_UPDATE_RESET,
  AUTHOR_UPDATE_SUCCESS,
} from '../constants/authorConstants';

export const authorListReducer = (state = { authors: [] }, action) => {
  switch (action.type) {
    case AUTHOR_LIST_REQUEST:
      return { loading: true, authors: [] };
    case AUTHOR_LIST_SUCCESS:
      return {
        loading: false,
        authors: action.payload.authors,
        page: action.payload.page,
        pages: action.payload.pages,
      };
    case AUTHOR_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const authorListAllReducer = (state = { authors: [] }, action) => {
  switch (action.type) {
    case AUTHOR_LIST_ALL_REQUEST:
      return { loading: true, authors: [] };
    case AUTHOR_LIST_ALL_SUCCESS:
      return {
        loading: false,
        authors: action.payload,
      };
    case AUTHOR_LIST_ALL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const authorDetailReducer = (state = { author: {} }, action) => {
  switch (action.type) {
    case AUTHOR_DETAILS_REQUEST:
      return { loading: true, ...state };
    case AUTHOR_DETAILS_SUCCESS:
      return { loading: false, author: action.payload };
    case AUTHOR_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case AUTHOR_DETAILS_RESET:
      return { author: {} };
    default:
      return state;
  }
};

export const authorCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTHOR_CREATE_REQUEST:
      return { loading: true };
    case AUTHOR_CREATE_SUCCESS:
      return { loading: false, success: true, author: action.payload };
    case AUTHOR_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case AUTHOR_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const authorDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTHOR_DELETE_REQUEST:
      return { loading: true };
    case AUTHOR_DELETE_SUCCESS:
      return { loading: false, success: true };
    case AUTHOR_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const authorUpdateReducer = (state = { author: {} }, action) => {
  switch (action.type) {
    case AUTHOR_UPDATE_REQUEST:
      return { loading: true };
    case AUTHOR_UPDATE_SUCCESS:
      return { loading: false, success: true, author: action.payload };
    case AUTHOR_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case AUTHOR_UPDATE_RESET:
      return { author: {} };
    default:
      return state;
  }
};
