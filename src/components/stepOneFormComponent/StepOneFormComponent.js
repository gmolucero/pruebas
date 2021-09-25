

import React from "react";
import PropTypes from 'prop-types';
import {
    CButton,
    CForm,
    CInput,
    CSelect,
    CInvalidFeedback,
    CFormGroup,
} from "@coreui/react";

import DateComponent from 'components/dateComponent/DateComponent';
import { getValidationResult } from 'utils';
import { getRegion, getComuneById } from 'services/location';
import educations from './educationLevelOptions';

const StepOneFormComponent = ({ formik, onChange }) => {

    const [region, setRegion] = React.useState([]);
    const [communes, setCommunes] = React.useState([]);
    const [isMounted, setIsMounted] = React.useState(false);

    const handleGetRegion = async () => {
        const resp = await getRegion();
        try {
            setRegion(resp.data.result)
        } catch (error) {
            console.log('ERROR: ', error);
        }
    }

    const handleGetCommuneById = async (region_id) => {
        const resp = await getComuneById(region_id);
        try {
            setCommunes(resp.data.result)
        } catch (error) {
            console.log('ERROR: ', error);
        }
    }

    React.useEffect(() => {
        if (formik.values.region !== '') {
            if (isMounted)
                formik.setFieldValue('commune', '')
            setCommunes([]);
            handleGetCommuneById(formik.values.region);
        }
    }, [formik.values.region])

    React.useEffect(() => {
        handleGetRegion();
        setIsMounted(true)
    }, [])



    console.log('formik.errors', formik.errors);

    return (
        <CForm onSubmit={formik.handleSubmit}>

            <CFormGroup className="mb-3 text-left">
                <label>¿cuándo naciste?</label>
                <DateComponent day={formik.values.day} month={formik.values.month} year={formik.values.year} onChange={onChange} />

                <CInvalidFeedback
                    className="d-block"
                    invalid={getValidationResult(
                        (formik.touched.day && !!formik.errors.day) ||
                        (formik.touched.month && !!formik.errors.month) ||
                        (formik.touched.year && !!formik.errors.year)
                    )}>
                    {[formik.errors.day, formik.errors.month, formik.errors.year].filter((el) => typeof el !== 'undefined').join(', ')}</CInvalidFeedback>

            </CFormGroup>

            <CFormGroup className="mb-3 text-left">
                <CSelect size="lg" onChange={onChange} name="region" value={formik.values.region}>
                    <option disabled value="">Seleccione region...</option>
                    {
                        region.map((_region) => (<option key={_region.id} value={_region.id}>{_region.name}</option>))
                    }
                </CSelect>
                <CInvalidFeedback className="d-inline" invalid={getValidationResult(!!formik.errors.region)}>{formik.errors.region}</CInvalidFeedback>
            </CFormGroup>

            <CFormGroup className="mb-3 text-left">
                <CSelect size="lg" onChange={onChange} name="commune" value={formik.values.commune}>
                    <option disabled value="">Seleccione Comuna...</option>
                    {
                        communes.map((_commune) => (<option key={_commune.id} value={_commune.id}>{_commune.name}</option>))
                    }
                </CSelect>
                <CInvalidFeedback className="d-inline" invalid={getValidationResult(!!formik.errors.commune)}>{formik.errors.commune}</CInvalidFeedback>

            </CFormGroup>

            <CFormGroup className="mb-3 text-left">
                <CSelect size="lg" onChange={onChange} name="education_level" value={formik.values.education_level}>
                    <option disabled value="">Nivel de estudios...</option>
                    {
                        educations.map((_education_level) => (<option key={_education_level.id} value={_education_level.name}>{_education_level.name}</option>))
                    }
                </CSelect>
                <CInvalidFeedback className="d-inline" invalid={getValidationResult(!!formik.errors.education_level)}>{formik.errors.education_level}</CInvalidFeedback>
            </CFormGroup>

            <CFormGroup className="mb-3 text-left">
                <CInput
                    size="lg"
                    placeholder="A que te dedicas"
                    value={formik.values.occupation}
                    invalid={formik.touched.occupation && !!formik.errors.occupation}
                    onChange={onChange}
                    name="occupation"
                />
                <CInvalidFeedback invalid={getValidationResult(formik.touched.occupation && !!formik.errors.occupation)}>{formik.errors.occupation}</CInvalidFeedback>
            </CFormGroup>

            <CButton type="submit" color="secondary" size="lg" className="btn-login d-inline px-4" >
                continuar
            </CButton>

        </CForm>
    )
}

StepOneFormComponent.defaultProps = {
    onChange: () => null
}

StepOneFormComponent.propTypes = {
    formik: PropTypes.shape({
        errors: PropTypes.object.isRequired,
        values: PropTypes.object.isRequired,
        touched: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
    }).isRequired,
    onChange: PropTypes.func
}

export default StepOneFormComponent;
