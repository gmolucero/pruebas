import React, { useEffect } from 'react'
import {
    CAlert
} from "@coreui/react";

import { useNotification } from 'context/hooks';

import './notificationStyles.scss';

const NotificationComponent = () => {
    const [notification, setNotification] = useNotification();
    let timer = null;
    useEffect(() => {
        clearTimeout(timer);
        if (notification.open) {
            timer = setTimeout(() => {
                setNotification({ open: false })
            }, notification.delay)
        }
        return () => clearTimeout(timer)
    }, [notification.open])

    return (
        <CAlert className={`notification-element ${notification.open ? 'open' : ''}`} color={notification.type}>  {notification.message} </CAlert>
    )
}

export default NotificationComponent
