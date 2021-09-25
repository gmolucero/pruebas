import React from 'react';

import { context } from './context';

export const useNotification = () => {
    const { state: { notification }, dispatch } = React.useContext(context)
    return [notification, (_notification) => dispatch({ type: 'NOTIFICACION', value: _notification })]
}

export const useLoading = () => {
    const { state: { loading }, dispatch } = React.useContext(context)
    return [loading, (_value) => dispatch({ type: 'SET_LOADING', value: _value })]
}
