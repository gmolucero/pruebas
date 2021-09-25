import React from 'react';

import { context } from './context';

export const useNotification = () => {
    const { state: { notification }, dispatch } = React.useContext(context)
    return [notification, (notification) => dispatch({ type: 'NOTIFICACION', value: notification })]
}
