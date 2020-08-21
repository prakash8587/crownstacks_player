import {put, takeLatest, call} from 'redux-saga/effects';
import * as types from '../../utils/actionTypes';

function* songSaga() {
  yield takeLatest(types.FETCH_SONG, fetchSongs);
}

function* fetchSongs() {
  let response = [];
  try {
    const url = 'https://itunes.apple.com/search?term=Michael+jackson';
    const response = yield fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const res = yield response.json();
    yield put({
      type: types.FETCH_SONG_SUCCESS,
      payload: res,
    });
  } catch (error) {
    yield put({
      type: types.FETCH_SONG_FAILURE,
      payload: error,
    });
  }
}

export default songSaga;
