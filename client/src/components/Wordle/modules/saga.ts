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

import io from 'socket.io-client';

let socket:any;
let gameID:number = -1;

  
  function startWordle() {
    socket = io("localhost:4000");
    socket.on('connect', () => { 
      socket.emit("room:create")
    });
    socket.on('room:created', (roomID:number) => {
      put(setGameId(roomID))  
      gameID = roomID
    });
    socket.on('game:guessed', (guessWithColors:any) => {
    });
  }
  
  function  guessWordle(action: AnyAction) {
    if (gameID === -1)return

    socket.emit("game:guess", {body: { guess: action.payload.word, gameID }})
  }
  
  export default function * warningsSaga() {
    yield all([
      takeEvery(types.START_WORDLE, startWordle),
      takeEvery(types.GUESS_WORDLE, guessWordle),
    ]);
  }
  