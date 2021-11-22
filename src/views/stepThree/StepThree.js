import React from 'react'
import PropTypes from 'prop-types'
import { useFormik } from "formik";


import {
    CCol,
    CRow,
    CModal
} from "@coreui/react";

import { stepThreechema as schema } from 'components/stepThreeFormComponent/stepThreechema'
import StepThreeFormComponent from 'components/stepThreeFormComponent/StepThreeFormComponent'

import { validate, handlerInputChangeCreator, isEmpty } from 'utils';
import Spinner from 'app/common/Spinner'

import { createSolicitude } from 'services/quotation';

import CardComponent from 'components/cardComponent/CardComponent';

const SUCCESS_MESSAGE = {
    title: "¡Tu cotización de Crédito de Consumo fue enviada con éxito!",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    btnText: "Ir a productos",
    iconName: "cil-check-circle",
    iconClassName: "text-success",
    btnOnClick: () => null,
}

const ERROR_MESSAGE = {
    title: "Tu cotización no pudo ser enviada.",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    btnText: "Editar cotización",
    iconName: "cil-warning",
    iconClassName: "text-danger",
    btnOnClick: () => null,
}

const StepThree = ({ prev, history, setStepKeepData, stepKeepData }) => {
    const [modalConfig, setModalConfig] = React.useState({
        show: false,
        ...ERROR_MESSAGE
    })

    const [loading, setLoading] = React.useState(false);

    const onSubmit = async (data) => {
        try {
            setLoading(true);                        
            let clearAmount = data.requested_amount.replace(/\./g, '')
            let tempData = {...data, requested_amount: clearAmount}  
            const response = await createSolicitude(tempData);
            if (response.status >= 400) {                
                setModalConfig({
                    show: true, ...ERROR_MESSAGE,
                    text: response.data.message,
                    btnOnClick: () => setModalConfig((_p) => ({ ..._p, show: false }))
                })
                setLoading(false);
            } else {
                setModalConfig({
                    show: true, ...SUCCESS_MESSAGE,
                    text: response.data.message,
                    btnOnClick: () => history.push('/resumen')
                })
            }
            setLoading(false);
        } catch (error) {
            console.log('onSubmit Error: ', error);
        }
    }

    const formik = useFormik({
        initialValues: stepKeepData ? stepKeepData :{
            reason: "",
            requested_amount: "",
            number_quotas: "",
            credit_start: ""
        },
        validate: validate(schema),
        onSubmit: onSubmit,
    });

    const handleTextChange = handlerInputChangeCreator(formik);

    const prevStape = () =>{
        prev();
        setStepKeepData(formik.values);
    }

    const changeAmount = (e) => {
        const { value } = e.target;
        let clearValue = value.replace(/\./g, '')
        let clearAmount = clearValue.replace(/[^0-9 ]/g, '')
        let format = new Intl.NumberFormat("es-CL").format(clearAmount);  
        formik.setValues({ ...formik.values, requested_amount: format })
    }
    

    return (
        <>
            
            <CRow className="justify-content-center">
                {loading ? <Spinner/> : (
                    <CCol md={8} lg={6}>
                        <StepThreeFormComponent
                            formik={formik}
                            prev={prevStape}
                            changeAmount={changeAmount}
                            onChange={handleTextChange} />
                            
                    </CCol>
                )}
                <CModal
                    size="lg"
                    show={modalConfig.show}
                    onClose={() => setModalConfig((_p) => ({ ..._p, show: false }))}
                    className="modal-custom"
                >
                    <CardComponent {...modalConfig} />
                </CModal>
            </CRow>
           
        </>
    )
}

StepThree.propTypes = {

}

export default StepThree
