export const initialState = { count: 0 };

export function reducer(state, action) {
    switch (action.type) {
        case 'NOTIFICACION':
            return { ...state, notification: { ...state.notification, ...action.value } };
        default:
            throw new Error();
    }
}