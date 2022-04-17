export const types = {
    CONFIRM_REGISTRATION: 'CONFIRM_REGISTRATION',
    SET_IS_CONFIRMED: 'SET_IS_CONFIRMED',
};

export const confirmRegistration = (token: string) => ({
    type: types.CONFIRM_REGISTRATION,
    payload: { token },
});

export const setIsConfirmed = (isConfirmed: boolean) => ({
    type: types.SET_IS_CONFIRMED,
    payload: { isConfirmed },
});
