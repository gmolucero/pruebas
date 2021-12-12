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
    cae,
    quotas_offered,
    executive,
    client_accepts,
    handleAcceptOffer,
    offer_expiration,
    offer_created_at
}) => {

    
    return (
        <CCard>
            <CCardBody className="text-center p-3 p-md-4">
                <div className="mx-auto d-block px-4 mb-5 mt-3">
                    <img src={bank.img} alt="img" style={{maxHeight:'42px', maxWidth:'190px'}}  />
                </div>
                {
                    client_accepts === 1 && <>
                        <p className="mb-1"><CIcon name="cil-check-circle" size="4xl"  className="c-d-dark-none m-1 text-success"  /></p>
                    </>
                }
                               {
                    client_accepts === 2 && <>
                        <p className="mb-1"><CIcon name="cil-x-circle" size="4xl"  className="c-d-dark-none m-1 text-danger"  /></p>
                    </>
                }
                <p className="mb-2">Cuota: <span className="bold text-primary-light">$ {formatClp(enhanced_quota_value)}</span> </p>
                <p className="mb-2">Monto solicitado: {formatClp(requested_amount)}</p>
                <p className="mb-2">Tasa de interés: {interest} %</p>
                <p className="mb-2">CAE: {cae} %</p>
                <p className="mb-2">N° de cuotas: {quotas_offered}</p>
                <p className="mb-4">Fecha creación preoferta: {offer_created_at}</p>
                <p className="mb-2">Oferta válida hasta el: {offer_expiration}</p>
                

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
