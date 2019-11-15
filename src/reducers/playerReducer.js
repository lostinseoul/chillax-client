import {
  PLAY_SOUND,
  PAUSE_SOUND,
  CHANGE_VOLUME,
  SET_CURRENTLY_PLAYING,
} from '../actions/soundActions';

const initalState = {
  isPlayingSound: false,
  volume: 1,
  currentlyPlaying: null,
};

const playerReducer = (state = initalState, action) => {
  switch (action.type) {
    case PLAY_SOUND:
      return {
        ...state,
        isPlayingSound: true,
      };
    case PAUSE_SOUND:
      return {
        ...state,
        isPlayingSound: false,
      };
    case CHANGE_VOLUME:
      return {
        ...state,
        volume: action.payload.volume,
      };
    case SET_CURRENTLY_PLAYING:
      return {
        ...state,
        currentlyPlaying: action.payload.url,
      };
    default:
      return state;
  }
};

export default playerReducer;
