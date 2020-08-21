import * as types from '../../utils/actionTypes';

const INITIAL_STATE = {
  songlistData: [],
  isLoading: true,
  fetchSongStatus: undefined,
  isFetching: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_SONG:
      return {
        ...state,
        isLoading: true,
      };

    case types.FETCH_SONG_SUCCESS:
      // console.log('ActionAction', action);
      return {
        ...state,
        isLoading: false,
        songlistData: action.payload && action.payload.results,
        fetchSongStatus: 'success',
      };

    case types.FETCH_SONG_FAILURE:
      return {
        ...state,
        isLoading: false,
        songlistData: [],
        fetchSongStatus: 'fail',
      };
    default:
      return state;
  }
};
