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

const StepOne = ({ next, stepsContent, setStepsContent }) => {
    let [timer, setTimer] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [errorAge, setErrorAge] = React.useState(false);
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
            });
            if (data.result.has_debt) {
                setStepsContent([...stepsContent, stepsContent[0].title = 'Hola!! Necesitamos actualizar algunos datos para que las Instituciones Financieras puedan realizar una Pre-Oferta a tu medida!!'])
            }
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
                    title: 'Advertencia',
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
        if (formik.values.day && formik.values.month && formik.values.year) {
            let valAge = getAge(formik.values.year + '/' + formik.values.month + '/' + formik.values.day)
            if (valAge) {
                setErrorAge(false);
                if (formik.values.day && formik.values.month && formik.values.year && formik.values.region && formik.values.commune && formik.values.education_level && formik.values.occupation) {
                    setTimer(setTimeout(() => {
                        handleUpdate(formik.values)
                    }, 500))
                }
            } else {
                setErrorAge(true)
            }

        }

    }, [formik.values])


    React.useEffect(() => {
        handleInit();
    }, [])

    function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age >= 18) {
            return true;
        } else {
            return false;
        }
        // return age;
    }

    return (
        <CRow className="justify-content-center">
            <CCol md={8} lg={6}>
                {loading ? <Spinner /> : <StepOneFormComponent formik={formik} onChange={handleTextChange} errorAge={errorAge} />}
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
