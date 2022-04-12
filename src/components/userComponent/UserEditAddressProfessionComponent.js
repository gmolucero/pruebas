import React from "react";
import DateComponent from 'components/dateComponent/DateComponent';
import { getValidationResult } from 'utils';

import {
    CButton,
    CForm,
    CInput,
    CSelect,
    CInvalidFeedback,
    CFormGroup,
    CSpinner
} from "@coreui/react";

const UserEditAddressProfessionComponent = ({ formik, countries, regions, communes, getCommunesByRegion, educations, professions, mounted }) => {
    const [loadingCommunes, setLoadingCommunes] = React.useState(true);
    const [isMounted, setIsMounted] = React.useState(false);
    const [errorAge, setErrorAge] = React.useState(false);

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
    }



    React.useEffect(() => {
        if (formik.values.day && formik.values.month && formik.values.year) {
            let valAge = getAge(formik.values.year + '/' + formik.values.month + '/' + formik.values.day)
            if (valAge) {
                setErrorAge(false);
            } else {
                setErrorAge(true);
            }

        }
    }, [formik.values.day, formik.values.month, formik.values.year]);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    React.useEffect(() => {
        if (formik.values.region !== '') {
            setLoadingCommunes(true);
            if (isMounted) {
                formik.setFieldValue('commune', '');
            }
            getCommunesByRegion(Number(formik.values.region));
        }
    }, [formik.values.region]);

    React.useEffect(() => {
        if (communes.length > 0 || formik.values.region == '') {
            setLoadingCommunes(false);
        }
    }, [communes]);



    return (
        <CForm className="mt-2" onSubmit={formik.handleSubmit}>
            <CFormGroup className="d-block d-sm-none">
                <h3 className="mb-4">Dirección y Estudios</h3>
            </CFormGroup>
            <CFormGroup className="mb-3">
                <label>¿Cuándo Naciste?</label>
                <DateComponent
                    day={Number(formik.values.day)}
                    month={formik.values.month}
                    year={formik.values.year}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    size="" />

                <CInvalidFeedback
                    className="d-block"
                    invalid={getValidationResult(
                        (formik.touched.day && !!formik.errors.day) ||
                        (formik.touched.month && !!formik.errors.month) ||
                        (formik.touched.year && !!formik.errors.year)
                    )}>

                    {[formik.errors.day, formik.errors.month, formik.errors.year].filter((el) => typeof el !== 'undefined').join(', ')}
                </CInvalidFeedback>
                {errorAge ? <p style={{ color: '#e55353' }}>Edad minima 18 años</p> : ''}

            </CFormGroup>

            <CFormGroup className="mb-3">
                <label>Nacionalidad</label>
                <CSelect custom name="country"
                    value={formik.values.country}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}>
                    <option disabled hidden value="">Seleccione Nacionalidad ...</option>
                    {
                        countries.map((_country) => (<option key={_country.id} value={parseInt(_country.id)}>{_country.name}</option>))
                    }
                </CSelect>
                <CInvalidFeedback className="d-inline" invalid={getValidationResult(!!formik.errors.country)}>{formik.errors.country}</CInvalidFeedback>
            </CFormGroup>

            <CFormGroup className="mb-3">
                <label>Región</label>
                <CSelect custom name="region"
                    value={formik.values.region}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}>
                    <option disabled hidden value="">Seleccione Region...</option>
                    {
                        regions.map((_region) => (<option key={_region.id} value={_region.id}>{_region.name}</option>))
                    }
                </CSelect>
                <CInvalidFeedback className="d-inline" invalid={getValidationResult(!!formik.errors.region)}>{formik.errors.region}</CInvalidFeedback>
            </CFormGroup>

            <CFormGroup className="mb-3">
                <label>Comuna</label>
                {loadingCommunes ? <div className="text-center"><CSpinner color="light" /></div> :
                    <>
                        <CSelect custom name="commune"
                            value={formik.values.commune}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}>
                            <option disabled hidden value="">Seleccione Comuna...</option>
                            {
                                communes.map((_commune) => (<option key={_commune.id} value={_commune.id}>{_commune.name}</option>))
                            }
                        </CSelect>
                        <CInvalidFeedback className="d-inline" invalid={getValidationResult(!!formik.errors.commune)}>{formik.errors.commune}</CInvalidFeedback>
                    </>
                }

            </CFormGroup>

            <CFormGroup className="mb-3">
                <label>Nivel de Estudios</label>
                <CSelect custom name="education_level"
                    value={formik.values.education_level}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}>
                    <option disabled hidden value="">Nivel de Estudios...</option>
                    {
                        educations.map((_education_level) => (<option key={_education_level.id} value={_education_level.nombre}>{_education_level.nombre}</option>))
                    }
                </CSelect>

                <CInvalidFeedback className="d-inline" invalid={getValidationResult(!!formik.errors.education_level)}>{formik.errors.education_level}</CInvalidFeedback>
            </CFormGroup>

            <CFormGroup className="mb-3">
                <label>¿A qué te dedicas?</label>
                <CSelect custom name="occupation"
                    value={formik.values.occupation}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}>
                    <option disabled hidden value="">¿A qué te dedicas?</option>
                    {
                        professions.map((_occupation) => (<option key={_occupation.id} value={_occupation.name}>{_occupation.name}</option>))
                    }
                </CSelect>
                <CInvalidFeedback className="d-inline" invalid={getValidationResult(!!formik.errors.occupation)}>{formik.errors.occupation}</CInvalidFeedback>
            </CFormGroup>

            {
                formik.values.occupation === 'Otro' &&
                <CFormGroup className="mb-3">
                    <CInput
                        placeholder="A que te dedicas"
                        value={formik.values.other_occupation}
                        invalid={formik.touched.other_occupation && !!formik.errors.other_occupation}
                        name="other_occupation"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <CInvalidFeedback invalid={getValidationResult(formik.touched.other_occupation && !!formik.errors.other_occupation)}>{formik.errors.other_occupation}</CInvalidFeedback>
                </CFormGroup>
            }
            {!errorAge &&
                <CButton type="submit" className="btn-login d-inline px-4" >Actualizar</CButton>
            }
        </CForm>
    );
};

export default UserEditAddressProfessionComponent;