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

const StepThree = ({ prev, history }) => {
    const [modalConfig, setModalConfig] = React.useState({
        show: false,
        ...ERROR_MESSAGE
    })

    const onSubmit = async (data) => {
        try {
            const response = await createSolicitude(data);
            if (response.status >= 400) {
                setModalConfig({
                    show: true, ...ERROR_MESSAGE,
                    text: response.data.message,
                    btnOnClick: () => setModalConfig((_p) => ({ ..._p, show: false }))
                })
            } else {
                setModalConfig({
                    show: true, ...SUCCESS_MESSAGE,
                    text: response.data.message,
                    btnOnClick: () => history.push('/resumen')
                })
            }
        } catch (error) {
            console.log('onSubmit Error: ', error);
        }
    }

    const formik = useFormik({
        initialValues: {
            reason: "",
            requested_amount: "",
            number_quotas: "",
            credit_start: "30"
        },
        validate: validate(schema),
        onSubmit: onSubmit,
    });

    const handleTextChange = handlerInputChangeCreator(formik)

    return (
        <CRow className="justify-content-center">
            <CCol md={8} lg={6}>
                <StepThreeFormComponent
                    formik={formik}
                    prev={prev}
                    onChange={handleTextChange} />
            </CCol>

            <CModal
                size="lg"
                show={modalConfig.show}
                onClose={() => null}
                className="modal-custom"
            >
                <CardComponent {...modalConfig} />
            </CModal>


        </CRow>
    )
}

StepThree.propTypes = {

}

export default StepThree
