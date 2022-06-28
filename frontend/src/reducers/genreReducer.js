import {
  GENRE_CREATE_FAIL,
  GENRE_CREATE_REQUEST,
  GENRE_CREATE_RESET,
  GENRE_CREATE_SUCCESS,
  GENRE_DELETE_FAIL,
  GENRE_DELETE_REQUEST,
  GENRE_DELETE_SUCCESS,
  GENRE_DETAILS_FAIL,
  GENRE_DETAILS_REQUEST,
  GENRE_DETAILS_RESET,
  GENRE_DETAILS_SUCCESS,
  GENRE_LIST_FAIL,
  GENRE_LIST_REQUEST,
  GENRE_LIST_SUCCESS,
  GENRE_UPDATE_FAIL,
  GENRE_UPDATE_REQUEST,
  GENRE_UPDATE_RESET,
  GENRE_UPDATE_SUCCESS,
} from '../constants/genreConstants';

export const genreListReducer = (state = { genres: [] }, action) => {
  switch (action.type) {
    case GENRE_LIST_REQUEST:
      return { loading: true, genres: [] };
    case GENRE_LIST_SUCCESS:
      return {
        loading: false,
        genres: action.payload.genres,
        page: action.payload.page,
        pages: action.payload.pages,
      };
    case GENRE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const genreDetailReducer = (state = { genre: {} }, action) => {
  switch (action.type) {
    case GENRE_DETAILS_REQUEST:
      return { loading: true, ...state };
    case GENRE_DETAILS_SUCCESS:
      return { loading: false, genre: action.payload };
    case GENRE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case GENRE_DETAILS_RESET:
      return { genre: {} };
    default:
      return state;
  }
};

export const genreCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case GENRE_CREATE_REQUEST:
      return { loading: true };
    case GENRE_CREATE_SUCCESS:
      return { loading: false, success: true, genre: action.payload };
    case GENRE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case GENRE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const genreDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case GENRE_DELETE_REQUEST:
      return { loading: true };
    case GENRE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case GENRE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const genreUpdateReducer = (state = { genre: {} }, action) => {
  switch (action.type) {
    case GENRE_UPDATE_REQUEST:
      return { loading: true };
    case GENRE_UPDATE_SUCCESS:
      return { loading: false, success: true, genre: action.payload };
    case GENRE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case GENRE_UPDATE_RESET:
      return { genre: {} };
    default:
      return state;
  }
};
