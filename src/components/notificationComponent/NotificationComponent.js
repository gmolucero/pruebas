import React, { useEffect } from 'react'
import { CAlert } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilCheckCircle, cilWarning, cilXCircle } from '@coreui/icons';

import { useNotification } from 'context/hooks';

import './notificationStyles.scss';

const NotificationComponent = () => {
    const [notification, setNotification] = useNotification();
    const alertIcons = {
        info: 'cil-check-circle',
        warning: 'cil-warning',
        error: 'cil-x-circle'
    };
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
        <CAlert className={`d-flex notification-element ${notification.open ? 'open' : ''}`} color={notification.type}>
            { notification.icon ? <CIcon name={alertIcons[notification.type]} className="flex-shrink-0 me-2 pr-1" width={24} height={24} /> : "" }
            <div>{notification.message}</div> 
        </CAlert>
    )
}

export default NotificationComponent
