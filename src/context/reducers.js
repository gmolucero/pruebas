export const initialState = { count: 0 };

export function reducer(state, action) {
    switch (action.type) {
        case 'NOTIFICACION':
            return { ...state, notification: { ...state.notification, open: true, ...action.value } };
        case 'SET_LOADING':
            return { ...state, loading: action.value };
        default:
            throw new Error();
    }
}