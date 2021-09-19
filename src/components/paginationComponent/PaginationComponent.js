import React from 'react';

import {
    CPagination
} from '@coreui/react';

import './paginationStyles.scss';

const Pagination = (props) => {
    return (
        <CPagination
            className="paginator"
            align="end"
            dots={false}
            doubleArrows={false}
            {...props} />
    )
}

export default Pagination;