import React from 'react'
import PropTypes from 'prop-types'
import { useFormik } from "formik";

import {
    CCol,
    CRow,
    CModal,
} from "@coreui/react";

import { stepOnechema as schema } from 'components/stepOneFormComponent/stepOnechema'
import StepOneFormComponent from 'components/stepOneFormComponent/StepOneFormComponent'
import CardComponent from 'components/cardComponent/CardComponent';
import { validate, handlerInputChangeCreator, isEmpty } from 'utils';

import { updateCustomer, getCustomer } from 'services/customer';

import Spinner from 'app/common/Spinner';

const StepOne = ({ next }) => {
    let [timer, setTimer] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const ERROR_MESSAGE = {
        title: "",
        text: "",
        btnText: "Cerrar",
        iconName: "cil-warning",
        iconClassName: "text-danger",
        btnOnClick: () => null,
    }

    const [modalConfig, setModalConfig] = React.useState({
        show: false,
        ...ERROR_MESSAGE
    })

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
                day: data.result.day || '',
                month: data.result.month || '',
                year: data.result.year || '',
                region: data.result.region || '',
                commune: data.result.commune || '',
                education_level: data.result.education_level || '',
                occupation: data.result.occupation || '',
                other_occupation: data.result.other_occupation || ''
            })
            setLoading(false)
        } catch (error) {
            console.log('ERROR: ', error);
        }
    }

    const handleUpdate = async (data) => {
        try {           
            const res = await updateCustomer(data);
            if (res.status >= 400) { 
                setModalConfig({
                    show: true, ...ERROR_MESSAGE,
                    title:'Advertencia',
                    text: 'Ocurrió un error',
                    btnOnClick: () => setModalConfig((_p) => ({ ..._p, show: false }))
                });   
            }
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
            <CModal
                size="lg"
                show={modalConfig.show}
                onClose={() => setModalConfig((_p) => ({ ..._p, show: false }))}
                className="modal-custom"
            >
                <CardComponent {...modalConfig} />
            </CModal>
        </CRow>
    )
}

StepOne.propTypes = {

}

export default StepOne
