import { RootState } from '../../../store';

export const selectGuesses = (state: RootState) => state.wordle.guesses;
export const selectGameId = (state: RootState) => state.wordle.gameId;
