import {
  all,
  apply,
  call,
  put,
  select,
  take,
  takeEvery,
} from 'redux-saga/effects';
import { AnyAction } from 'redux';
import {
  addGuess,
  types,
} from './actions';
import { selectGameId } from './selectors';
import { eventChannel } from 'redux-saga'
import io from 'socket.io-client';
import axios from 'axios';


let socket: any;

function createSocketChannel(socket: any) {
  // `eventChannel` takes a subscriber function
  // the subscriber function takes an `emit` argument to put messages onto the channel
  return eventChannel(emit => {

    const roomCreated = (gameId: any) => {
      emit({type: types.SET_GAME_ID, payload: {gameId} })
    }
    const gameGuessed = (response: any) => {
      let guesses: any = response.data
      emit({type: types.ADD_GUESS,payload: { guesses },})
    }

    socket.on('room:created', roomCreated)
    socket.on('game:guessed', gameGuessed);

    // the subscriber must return an unsubscribe function
    // this will be invoked when the saga calls `channel.close` method
    const unsubscribe = () => {
      socket.off('room:created', roomCreated)
      socket.off('game:guessed', gameGuessed);
    }
    return unsubscribe
  })
}


function *startWordle(): any {
  socket = io("localhost:4000");
  const socketChannel = yield call(createSocketChannel, socket)
  yield apply(socket, socket.emit, ['room:create'])
  while (true) {
    try {
      const payload = yield take(socketChannel)
      yield put(payload)
    } catch(err) {
      console.error('socket error:', err)
      // socketChannel is still open in catch block
      // if we want end the socketChannel, we need close it explicitly
      // socketChannel.close()
    }
  }
}


function* guessWordle(action: AnyAction) {

  const gameId: number = yield select(selectGameId);
  yield apply(socket, socket.emit, ['game:guess',{body: { guess: action.payload.word, gameId }}])
}

export default function * warningsSaga() {
  yield all([
    takeEvery(types.START_WORDLE, startWordle),
    takeEvery(types.GUESS_WORDLE, guessWordle),
  ]);
}
