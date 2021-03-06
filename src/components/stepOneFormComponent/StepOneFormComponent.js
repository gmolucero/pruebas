

import React from "react";
import PropTypes from 'prop-types';
import {
    CButton,
    CForm,
    CInput,
    CSelect,
    CInvalidFeedback,
    CFormGroup,
    CRow,
    CCol
} from "@coreui/react";

import DateComponent from 'components/dateComponent/DateComponent';
import { getValidationResult } from 'utils';
import { getRegion, getComuneById } from 'services/location';
import { getEducationOptions, getProfession, getCountries } from 'services/lists';
import Spinner from 'app/common/Spinner'

const StepOneFormComponent = ({ formik, onChange, errorAge }) => {

    const [countires, setCountries] = React.useState([]);
    const [region, setRegion] = React.useState([]);
    const [communes, setCommunes] = React.useState([]);
    const [loadingCommunes, setLoadingCommunes] = React.useState(false);
    const [education, setEducation] = React.useState([]);
    const [profession, setProfession] = React.useState([]);
    const [isMounted, setIsMounted] = React.useState(false);

    const handleGetCountries = async () => {
        try {
            const resp = await getCountries();
            setCountries(resp.data.result)
        } catch (error) {
            console.log('StepOneFormComponent ERROR: ', error);
        }
    }

    const handleGetRegion = async () => {
        try {
            const resp = await getRegion();
            setRegion(resp.data.result)
        } catch (error) {
            console.log('StepOneFormComponent ERROR: ', error);
        }
    }

    const handleGetEducation = async () => {
        const resp = await getEducationOptions();
        try {
            setEducation(resp.data.result)
        } catch (error) {
            console.log('ERROR: ', error);
        }
    }
    const handleGetProfession = async () => {
        const resp = await getProfession();
        try {
            setProfession(resp.data.result)
        } catch (error) {
            console.log('ERROR: ', error);
        }
    }

    const handleGetCommuneById = async (region_id) => {
        setLoadingCommunes((prevState) => !prevState);
        const resp = await getComuneById(region_id);
        try {
            setCommunes(resp.data.result)
        } catch (error) {
            console.log('ERROR: ', error);
        }
        setLoadingCommunes((prevState) => !prevState);
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
        handleGetEducation();
        handleGetProfession();
        handleGetRegion();
        handleGetCountries();
        setIsMounted(true)
    }, [])

    return (
        <CForm onSubmit={formik.handleSubmit}>

            <CFormGroup className="mb-3 text-left">
                <label>??Cu??ndo Naciste?</label>
                <DateComponent day={Number(formik.values.day)} month={formik.values.month} year={formik.values.year} onChange={onChange} size="lg" />

                <CInvalidFeedback
                    className="d-block"
                    invalid={getValidationResult(
                        (formik.touched.day && !!formik.errors.day) ||
                        (formik.touched.month && !!formik.errors.month) ||
                        (formik.touched.year && !!formik.errors.year)
                    )}>
                    {[formik.errors.day, formik.errors.month, formik.errors.year].filter((el) => typeof el !== 'undefined').join(', ')}</CInvalidFeedback
                >
                {errorAge ? <p style={{ color: '#e55353' }}>Edad minima 18 a??os</p> : ''}

            </CFormGroup>

            <CFormGroup className="mb-3 text-left">
                <label>Nacionalidad</label>
                {
                    countires.length === 0 ? <Spinner /> : <CSelect size="lg" onChange={onChange} name="country" value={formik.values.country}>
                        <option disabled hidden value="">Seleccione Nacionalidad ...</option>
                        {
                            countires.map((_country) => (<option key={_country.id} value={parseInt(_country.id)}>{_country.name}</option>))
                        }
                    </CSelect>
                }
                <CInvalidFeedback className="d-inline" invalid={getValidationResult(!!formik.errors.country)}>{formik.errors.country}</CInvalidFeedback>
            </CFormGroup>

            <CFormGroup className="mb-3 text-left">
                <label>Regi??n</label>
                {
                    region.length === 0 ? <Spinner /> : <CSelect size="lg" onChange={onChange} name="region" value={formik.values.region}>
                        <option disabled hidden value="">Seleccione Region...</option>
                        {
                            region.map((_region) => (<option key={_region.id} value={_region.id}>{_region.name}</option>))
                        }
                    </CSelect>
                }
                <CInvalidFeedback className="d-inline" invalid={getValidationResult(!!formik.errors.region)}>{formik.errors.region}</CInvalidFeedback>
            </CFormGroup>

            <CFormGroup className="mb-3 text-left">    
                <label>Comuna</label>
                {
                    loadingCommunes ? <Spinner /> : <CSelect size="lg" onChange={onChange} name="commune" value={formik.values.commune}>
                        <option disabled hidden value="">Seleccione Comuna...</option>
                        {
                            communes.map((_commune) => (<option key={_commune.id} value={_commune.id}>{_commune.name}</option>))
                        }
                    </CSelect>
                }
                <CInvalidFeedback className="d-inline" invalid={getValidationResult(!!formik.errors.commune)}>{formik.errors.commune}</CInvalidFeedback>

            </CFormGroup>

            <CFormGroup className="mb-3 text-left">
                <label>Nivel de Estudios</label>
                {education.length === 0 ? <Spinner /> : <CSelect size="lg" onChange={onChange} name="education_level" value={formik.values.education_level}>
                    <option disabled hidden value="">Nivel de Estudios...</option>
                    {
                        education.map((_education_level) => (<option key={_education_level.id} value={_education_level.nombre}>{_education_level.nombre}</option>))
                    }
                </CSelect>
                }
                <CInvalidFeedback className="d-inline" invalid={getValidationResult(!!formik.errors.education_level)}>{formik.errors.education_level}</CInvalidFeedback>
            </CFormGroup>

            <CFormGroup className="mb-3 text-left">
                <label>Profesi??n</label>
                {profession.length === 0 ? <Spinner /> : <CSelect size="lg" onChange={onChange} name="occupation" value={formik.values.occupation}>
                    <option disabled hidden value="">??A qu?? te dedicas?</option>
                    {
                        profession.map((_occupation) => (<option key={_occupation.id} value={_occupation.name}>{_occupation.name}</option>))
                    }
                </CSelect>
                }
                <CInvalidFeedback className="d-inline" invalid={getValidationResult(!!formik.errors.occupation)}>{formik.errors.occupation}</CInvalidFeedback>
            </CFormGroup>

            {
                formik.values.occupation === 'Otro' && <CFormGroup className="mb-3 text-left">
                    <CInput
                        size="lg"
                        placeholder="A que te dedicas"
                        value={formik.values.other_occupation}
                        invalid={formik.touched.other_occupation && !!formik.errors.other_occupation}
                        onChange={onChange}
                        name="other_occupation"
                    />
                    <CInvalidFeedback invalid={getValidationResult(formik.touched.other_occupation && !!formik.errors.other_occupation)}>{formik.errors.other_occupation}</CInvalidFeedback>
                </CFormGroup>
            }

            <CRow>
                <CCol xs="12" sm="5" className="text-left pt-2">
                    <CButton type="submit" color="secondary" size="lg" className="btn-login d-inline px-4 w-100" >
                        Continuar
                    </CButton>
                </CCol>
            </CRow>
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
