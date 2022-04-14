import { all, spawn } from 'redux-saga/effects';
import wordleSaga from '../components/Wordle/modules/saga';

const sagas = [
  wordleSaga,
];

export default function * rootSaga() {
  yield all(sagas.map(spawn));
};
