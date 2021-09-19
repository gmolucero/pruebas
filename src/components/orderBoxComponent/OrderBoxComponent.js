import React from 'react';

import PropTypes from 'prop-types';
import {
    CCard,
    CButton,
    CCardBody
} from "@coreui/react";
import CIcon from "@coreui/icons-react";


const OrderBoxComponent = ({ fee, img, amount, rate, feeNumber, executive }) => {
    return (
        <CCard>
            <CCardBody className="text-center p-3 p-md-4">
                <div className="d-block px-4 mb-5">
                    <img src={img} alt="" className="d-block mb-4 w-100" />
                </div>
                <h2 className="bold text-primary">{fee}</h2>
                <p>valor cuota</p>

                <p className="bold mb-1"><CIcon className="mr-1" name="cil-user" /> {executive.name}</p>
                <p className="bold mb-1"><CIcon className="mr-1" name="cil-envelope-closed" /> {executive.email}</p>
                <p className="bold mb-3"><CIcon className="mr-1" name="cil-phone" /> {executive.phone}</p>

                <p className="mb-2">Monto solicitado: {amount}</p>
                <p className="mb-2">Tasa de interés: {rate}</p>
                <p className="mb-4">N° de cuotas: {feeNumber}</p>

                <div className="d-flex flex-column">
                    <CButton color="secondary" className="mb-3 bold" size="lg">Aceptar</CButton>
                    <CButton color="secondary" variant="outline" className="bold" size="lg">Ver detalles</CButton>
                </div>


            </CCardBody>
        </CCard>
    )
}

OrderBoxComponent.defaultProps = {
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Banco_Santander_Logotipo.svg/2560px-Banco_Santander_Logotipo.svg.png',
    fee: '$ 130.000',
    executive: {
        name: 'juan flores',
        email: 'juan@santander.cl',
        phone: '+56933541456'
    },
    amount: '$10.000.000',
    rate: '1,75%',
    feeNumber: '24'
}

OrderBoxComponent.propTypes = {

}

export default OrderBoxComponent
