import {
    all,
    put,
    takeEvery,
  } from 'redux-saga/effects';
  import { AnyAction } from 'redux';
  import {
    setIsConfirmed,
    types,
  } from './actions';
import axios from 'axios';
  
function * confirmRegistration(action: AnyAction) {
  try {
    yield axios.post(`${process.env.REACT_APP_API_URL}/confirm-registration`, action.payload);
    yield put(setIsConfirmed(true));
  } catch (e) {
      // todo: error handling
  }
}

export default function * confirmRegistrationSaga() {
  yield all([
    takeEvery(types.CONFIRM_REGISTRATION, confirmRegistration),
  ]);
}
  