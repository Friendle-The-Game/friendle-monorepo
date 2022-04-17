import { all, spawn } from 'redux-saga/effects';
import wordleSaga from '../components/Wordle/modules/saga';
import loginSaga from '../components/Login/modules/saga';
import registerSaga from '../components/Register/modules/saga';
import confirmRegistrationSaga from '../components/ConfirmRegistration/modules/saga';

const sagas = [
  wordleSaga,
  loginSaga,
  registerSaga,
  confirmRegistrationSaga,
];

export default function * rootSaga() {
  yield all(sagas.map(spawn));
};
