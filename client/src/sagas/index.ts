import { all, spawn } from 'redux-saga/effects';
import wordleSaga from '../components/Wordle/modules/saga';
import loginSaga from '../components/Login/modules/saga';
import registerSaga from '../components/Register/modules/saga';
import confirmRegistrationSaga from '../components/ConfirmRegistration/modules/saga';
import homeSaga from '../components/Home/modules/saga';
import supportSaga from '../components/Support/modules/saga';

const sagas = [
  wordleSaga,
  loginSaga,
  registerSaga,
  confirmRegistrationSaga,
  homeSaga,
  supportSaga,
];

export default function * rootSaga() {
  yield all(sagas.map(spawn));
};
