import {
    all,
    put,
    takeEvery,
  } from 'redux-saga/effects';
  import { AnyAction } from 'redux';
  import {
    setRegisterErrors,
    types,
  } from './actions';
import axios from 'axios';
import localHistory from '../../../localHistory';
  
function * register(action: AnyAction) {
  try {
    yield axios.post(`${process.env.REACT_APP_API_URL}/register`, action.payload);
    yield put(setRegisterErrors(null));
    yield localHistory.push('/login');
  } catch (e: any) {
      yield put(setRegisterErrors(e.error));
  }
}

export default function * registerSaga() {
  yield all([
    takeEvery(types.REGISTER, register),
  ]);
}
  