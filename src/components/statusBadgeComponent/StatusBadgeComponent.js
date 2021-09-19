import React from 'react'
import PropTypes from 'prop-types'

import {
    CBadge,
} from "@coreui/react";

import './statusBadgeStyles.scss'

const StatusBadgeComponent = ({ text, status }) => {
    return (
        <CBadge className={`badge badge-${status}`}>
            <CBadge className="d-inline-flex mr-1 circle" />
            {text}
        </CBadge>
    )
}

StatusBadgeComponent.defaultProps = {
    text: 'status',
    status: 'success'
}

StatusBadgeComponent.propTypes = {
    status: PropTypes.oneOf(['success', 'info', 'warning'])
}

export default StatusBadgeComponent
