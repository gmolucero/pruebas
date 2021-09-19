import React from 'react'
import {
    CContainer,
    CCol,
    CRow,
} from "@coreui/react";

import OrderBoxComponent from 'components/orderBoxComponent/OrderBoxComponent';

const PreOrders = () => {
    return (
        <CContainer className="pt-5">
            <h1 className="text-primary mb-4">Pre-ofertas</h1>
            <CRow>
                {
                    [1, 2, 3].map((el) => <CCol> <OrderBoxComponent key={el} /></CCol>)
                }
            </CRow>
        </CContainer>
    )
}

export default PreOrders
