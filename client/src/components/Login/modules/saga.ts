import {
    all,
    put,
    takeEvery,
  } from 'redux-saga/effects';
  import { AnyAction } from 'redux';
  import {
    setLoginErrors,
    types,
  } from './actions';
import axios from 'axios';
import localHistory from '../../../localHistory';
  
function * login(action: AnyAction) {
  try {
    const { username, password } = action.payload;
    const { data: { token } } = yield axios.post(`${process.env.REACT_APP_API_URL}/login`, { username, password });
    yield put(setLoginErrors(null));
    if (token) localStorage.setItem('token', token);
    yield localHistory.push('/wordle');
  } catch (e: any) {
      yield put(setLoginErrors(e.error));
  }
}

export default function * loginSaga() {
  yield all([
    takeEvery(types.LOGIN, login),
  ]);
}
  