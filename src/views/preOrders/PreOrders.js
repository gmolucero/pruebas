import React from 'react'
import {
    CCard,
    CContainer,
    CCol,
    CRow,
    CButton,
    CCardBody
} from "@coreui/react";

import OrderBoxComponent from 'components/orderBoxComponent/OrderBoxComponent';

const PreOrders = () => {
    return (
        <CContainer className="pt-5">
            <CRow>
                {
                    [1, 2, 3].map((el) => <CCol> <OrderBoxComponent key={el} /></CCol>)
                }
            </CRow>
        </CContainer>
    )
}

export default PreOrders
