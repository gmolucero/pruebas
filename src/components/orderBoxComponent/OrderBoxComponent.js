import React from 'react';

import PropTypes from 'prop-types';
import {
    CCard,
    CButton,
    CCardBody
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { formatClp } from 'utils';


const OrderBoxComponent = ({
    id,
    enhanced_quota_value,
    bank,
    requested_amount,
    interest,
    quotas_offered,
    executive,
    client_accepts,
    handleAcceptOffer
}) => {

    
    return (
        <CCard>
            <CCardBody className="text-center p-3 p-md-4">
                <div className="d-block px-4 mb-5">
                    <img src={bank.img} alt="" className="d-block mb-4 w-100" />
                </div>
                <h2 className="bold text-primary-light">$ {formatClp(enhanced_quota_value)}</h2>
                <p class="sub-title">Valor cuota</p>

                {
                    client_accepts === 1 && <>
                        <p className="bold mb-1"><CIcon className="mr-1" name="cil-user" /> {executive.name}</p>
                        <p className="bold mb-1"><CIcon className="mr-1" name="cil-envelope-closed" /> {executive.email}</p>
                        <p className="bold mb-3"><CIcon className="mr-1" name="cil-phone" /> {executive.phone}</p>
                    </>
                }

                <p className="mb-2">Monto solicitado: {formatClp(requested_amount)}</p>
                <p className="mb-2">Tasa de interés: {interest} %</p>
                <p className="mb-4">N° de cuotas: {quotas_offered}</p>

                <div className="d-flex flex-column">
                    {
                        client_accepts === 0 && <CButton color="secondary" className="mb-3 bold" size="lg" onClick={()=>handleAcceptOffer(id)}>Aceptar</CButton>
                    }
                    <CButton to={`/detalle/${id}`} color="secondary" variant="outline" className="bold" size="lg">Ver detalles</CButton>
                </div>


            </CCardBody>
        </CCard>
    )
}

OrderBoxComponent.defaultProps = {
    img: '',
    enhanced_quota_value: 0,
    executive: {
        name: '',
        email: '',
        phone: ''
    },
    requested_amount: '',
    interest: '',
    quotas_offered: 0,
    client_accepts: 0
}

OrderBoxComponent.propTypes = {
    img: PropTypes.string,
    enhanced_quota_value: PropTypes.number,
    executive: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
        phone: PropTypes.string
    }),
    requested_amount: PropTypes.string,
    interest: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    quotas_offered: PropTypes.number,
    client_accepts: PropTypes.number
}

export default OrderBoxComponent
