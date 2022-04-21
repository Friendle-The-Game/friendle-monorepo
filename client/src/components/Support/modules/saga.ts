import {
    all,
    put,
    takeEvery,
  } from 'redux-saga/effects';
  import { AnyAction } from 'redux';
  import {
    setSupportErrors,
    types,
  } from './actions';
import axios from 'axios';
  
function * sendFeedback(action: AnyAction) {
  try {
    const { email, subject, message } = action.payload;
    yield axios.post(`${process.env.REACT_APP_API_URL}/send-feedback`, { email, subject, message });
    yield put(setSupportErrors(null));
  } catch (e: any) {
      yield put(setSupportErrors(e.error));
  }
}

export default function * supportSaga() {
  yield all([
    takeEvery(types.SEND_FEEDBACK, sendFeedback),
  ]);
}
  