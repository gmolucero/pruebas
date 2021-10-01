import React from 'react'
import PropTypes from 'prop-types'
import { useFormik } from "formik";

import {
    CCol,
    CRow
} from "@coreui/react";

import { stepOnechema as schema } from 'components/stepOneFormComponent/stepOnechema'
import StepOneFormComponent from 'components/stepOneFormComponent/StepOneFormComponent'

import { validate, handlerInputChangeCreator, isEmpty } from 'utils';

import { updateCustomer, getCustomer } from 'services/customer';

import Spinner from 'app/common/Spinner';

const StepOne = ({ next }) => {
    let [timer, setTimer] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    const formik = useFormik({
        initialValues: {
            day: '',
            month: '',
            year: '',
            region: '',
            commune: '',
            education_level: '',
            occupation: '',
            other_occupation: ''
        },
        validate: validate(schema),
        onSubmit: next,
    });


    const handleInit = async () => {
        try {
            const { data } = await getCustomer();
            formik.setValues({
                ...data.result,
                other_occupation: data.result.other_occupation || ''
            })
            setLoading(false)
        } catch (error) {
            console.log('ERROR: ', error);
        }
    }

    const handleUpdate = async (data) => {
        try {
            await updateCustomer(data);
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


    React.useEffect(() => {
        handleInit();
    }, [])

    return (
        <CRow className="justify-content-center">
            <CCol md={8} lg={6}>
                {loading ? <Spinner /> : <StepOneFormComponent formik={formik} onChange={handleTextChange} />}
            </CCol>
        </CRow>
    )
}

StepOne.propTypes = {

}

export default StepOne
