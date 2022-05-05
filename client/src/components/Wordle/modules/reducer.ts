import { AnyAction } from 'redux';
import { types } from './actions';

const initialState: { gameId: number, guesses: any[], messages: any[] } = { gameId: 0, guesses: [], messages: [] };

const reducer = (state = initialState, action: AnyAction): typeof initialState => {
  switch (action.type) {
    case types.SET_GAME_ID: {
      return { ...state, gameId: action.payload.gameId };
    }
    case types.ADD_GUESS: {
        return { ...state, guesses: [...state.guesses, action.payload.guesses]};
    }
    case types.HANDLE_NEW_MESSAGE: {
      return { ...state, messages: [...state.messages, action.payload.message]};
    }
    default:
      return state;
  }
};

export default reducer;
