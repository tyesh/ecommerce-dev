import axios from 'axios';
import {
  GENRE_CREATE_REQUEST,
  GENRE_CREATE_SUCCESS,
  GENRE_CREATE_FAIL,
  GENRE_DETAILS_REQUEST,
  GENRE_DETAILS_SUCCESS,
  GENRE_DETAILS_FAIL,
  GENRE_LIST_FAIL,
  GENRE_LIST_REQUEST,
  GENRE_LIST_SUCCESS,
} from '../constants/genreConstants';

export const listGenres = () => async (dispatch) => {
  try {
    dispatch({ type: GENRE_LIST_REQUEST });

    const { data } = await axios.get(`/api/genres`);

    dispatch({ type: GENRE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GENRE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listGenreDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: GENRE_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/genres/${id}`);

    dispatch({ type: GENRE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GENRE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createGenre = (genre) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GENRE_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/genres`, genre, config);

    dispatch({
      type: GENRE_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GENRE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
