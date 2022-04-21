export const types = {
    SEND_FEEDBACK: 'SEND_FEEDBACK',
    SET_SUPPORT_ERRORS: 'SET_SUPPORT_ERRORS',
};

export const sendFeedback = (email: string, subject: string, message: string) => ({
    type: types.SEND_FEEDBACK,
    payload: { email, subject, message },
});

export const setSupportErrors = (errors: Record<string, any> | null) => ({
    type: types.SET_SUPPORT_ERRORS,
    payload: { errors },
});
