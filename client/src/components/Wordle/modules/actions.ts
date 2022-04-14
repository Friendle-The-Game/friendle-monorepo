export const types = {
    START_WORDLE: 'START_WORDLE',
    GUESS_WORDLE: 'GUESS_WORDLE',
    SET_GAME_ID: 'SET_GAME_ID',
    ADD_GUESS: 'ADD_GUESS',
};

export const startWordle = () => ({
    type: types.START_WORDLE,
});

export const guessWordle = (word: string) => ({
    type: types.GUESS_WORDLE,
    payload: { word },
});

export const setGameId = (gameId: number) => ({
    type: types.SET_GAME_ID,
    payload: { gameId },
});

export const addGuess = (guesses: Array<any>) => ({
    type: types.ADD_GUESS,
    payload: { guesses },
});
