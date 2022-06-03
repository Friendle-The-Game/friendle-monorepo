
import { AnyAction } from 'redux';
import {
  types,
  handleNewMessage,
} from './actions';
import io, { Socket } from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import {
  take,
  call,
  put,
  all,
  takeEvery,
  select,
} from 'redux-saga/effects';
import { SOCKET_URL } from '../../../constants';
import { selectGameId } from './selectors';

let socket: Socket;

function * connect() {
  socket = io(SOCKET_URL);
  const gameId: number = yield select(selectGameId);
  return new Promise((resolve) => {
    socket.on('connect', () => {
      socket.emit('room:join', gameId);
      resolve(socket);
    });
  });
}

const subscribe = () => {
  return eventChannel((emit) => {
    const newMessageHandler = (message: any) => {
      emit(handleNewMessage(message));
    };
    const unsubscribe = () => {
      socket.off('message', newMessageHandler);
    };
    socket.on('message', newMessageHandler);
    return unsubscribe;
  });
}

function * read() {
  const channel = subscribe();
  while (true) {
    const action: AnyAction = yield take(channel);
    yield put(action);
  }
}

function * flow() {
  socket = yield call(connect);
  yield all([call(read)]);
}

function * guessWordle(action: AnyAction) {
  const gameId: number = yield select(selectGameId);
  yield socket.emit("game:guess", { body: { guess: action.payload.word, gameId } });
}

export default function * wordle() {
  yield all([
    takeEvery(types.START_WORDLE, flow),
    takeEvery(types.GUESS_WORDLE, guessWordle),
  ]);
}
