export const types = {
    REGISTER: 'REGISTER',
    SET_REGISTER_ERRORS: 'SET_REGISTER_ERRORS',
};

export const register = (username: string, password: string, email: string, confirmPassword: string) => ({
    type: types.REGISTER,
    payload: { username, password, email, confirmPassword },
});

export const setRegisterErrors = (errors: Record<string, any> | null) => ({
    type: types.SET_REGISTER_ERRORS,
    payload: { errors },
});
