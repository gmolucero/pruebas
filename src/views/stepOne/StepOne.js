import React from 'react'
import PropTypes from 'prop-types'
import { useFormik } from "formik";

import {
    CCol,
    CRow
} from "@coreui/react";

import TheQuotationLayout from 'containers/TheQuotationLayout';

import { stepOnechema as schema } from 'components/stepOneFormComponent/stepOnechema'
import StepOneFormComponent from 'components/stepOneFormComponent/StepOneFormComponent'

import { validate, handlerInputChangeCreator, isEmpty } from 'utils';

import { updateQuotation } from 'services/quotation';

const StepOne = ({ next }) => {
    let [timer, setTimer] = React.useState(null);

    const onSubmit = (data) => {
        next();
    }

    const formik = useFormik({
        initialValues: {
            day: '',
            month: '',
            year: '',
            region: '',
            commune: '',
            education_level: '',
            occupation: ''
        },
        validate: validate(schema),
        onSubmit: onSubmit,
    });

    const handleUpdate = async (data) => {
        try {
            console.log('a enviar', data);
            const res = await updateQuotation(data);
            console.log('actualizado', res.data.data);
        } catch (error) {
            console.error('[handleUpdate]', error);
        }
    }

    const handleTextChange = handlerInputChangeCreator(formik)

    React.useEffect(() => {
        clearTimeout(timer)
        if (!isEmpty(formik.values)) {
            setTimer(setTimeout(() => {
                handleUpdate(formik.values)
            }, 500))
        }
    }, [formik.values])

    return (
        <TheQuotationLayout
            title="¡Necesitamos más datos para que las instituciones financieras puedan hacer sus pre-ofertas!"
            text="Las insituciones financieras requieren de datos para generar pre-ofertas personalizadas para ti."
            step={1}>
            <CRow className="justify-content-center">
                <CCol md={8} lg={6}>
                    <StepOneFormComponent formik={formik} onChange={handleTextChange} />
                </CCol>
            </CRow>
        </TheQuotationLayout>
    )
}

StepOne.propTypes = {

}

export default StepOne
