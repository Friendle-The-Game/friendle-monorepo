import {
  all,
  takeEvery,
} from 'redux-saga/effects';
import { AnyAction } from 'redux';
import { types } from './actions';
import axios from 'axios';
import localHistory from '../../../localHistory';
  
function * joinGame(action: AnyAction) {
  try {
    const { gameCode } = action.payload;
    const { data: { validGameCode } } = yield axios.post(`${process.env.REACT_APP_API_URL}/join-game`, { gameCode });
    if (validGameCode) yield localHistory.push(`/play/${gameCode}`);
  } catch (e: any) {
    // todo: error handling
  }
}

export default function * homeSaga() {
  yield all([
    takeEvery(types.JOIN_GAME, joinGame),
  ]);
}
  