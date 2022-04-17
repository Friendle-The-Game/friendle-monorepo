export const types = {
    LOGIN: 'LOGIN',
    SET_LOGIN_ERRORS: 'SET_LOGIN_ERRORS',
};

export const login = (username: string, password: string) => ({
    type: types.LOGIN,
    payload: { username, password },
});

export const setLoginErrors = (errors: Record<string, any> | null) => ({
    type: types.SET_LOGIN_ERRORS,
    payload: { errors },
});
