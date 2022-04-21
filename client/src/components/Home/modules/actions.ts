export const types = {
    JOIN_GAME: 'JOIN_GAME',
};

export const joinGame = (gameCode: string,) => ({
    type: types.JOIN_GAME,
    payload: { gameCode },
});
