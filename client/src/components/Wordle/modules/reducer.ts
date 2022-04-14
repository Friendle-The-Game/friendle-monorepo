import { AnyAction } from 'redux';
import { types } from './actions';

const initialState: { gameId: number, guesses: any[] } = { gameId: 0, guesses: [] };

const reducer = (state = initialState, action: AnyAction): typeof initialState => {
  switch (action.type) {
    case types.SET_GAME_ID: {
      return { ...state, gameId: action.payload.gameId };
    }
    case types.ADD_GUESS: {
        return { ...state, guesses: [...state.guesses, action.payload.guesses]}
    }
    default:
      return state;
  }
};

export default reducer;
