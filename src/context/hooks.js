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

export const useStepper = () => {
    const { state: { step }, dispatch } = React.useContext(context)
    return [step, (_value) => dispatch({ type: 'SET_STEPPER', value: _value })]
}
