import {
    all,
    put,
    select,
    takeEvery,
  } from 'redux-saga/effects';
  import { AnyAction } from 'redux';
  import {
    types,
    setGameId,
    addGuess,
  } from './actions';
import axios from 'axios';
import { selectGameId } from './selectors';
  
  function * startWordle() {
    try {
      const { data: { gameId } }:
      { data: { gameId: number } } = yield axios.post(`${process.env.REACT_APP_API_URL}/start-game`);
      yield put(setGameId(gameId));
    } catch (e) {
        // todo: error handling
    }
  }
  
  function * guessWordle(action: AnyAction) {
    try {
      const gameId: number = yield select(selectGameId);
      const { data }:
      { data: any[] } = yield axios.post(`${process.env.REACT_APP_API_URL}/check-guess`, { guess: action.payload.word, gameId });
      yield put(addGuess(data));
    } catch (e) {
        // todo: error handling
    }
  }
  
  export default function * warningsSaga() {
    yield all([
      takeEvery(types.START_WORDLE, startWordle),
      takeEvery(types.GUESS_WORDLE, guessWordle),
    ]);
  }
  