import React, { useState } from "react";
import {
    CCol,
    CContainer,
    CRow,
    CSpinner
} from "@coreui/react";
import { useNotification } from 'context/hooks';
import UserEditNavComponent from 'components/userComponent/UserEditNavComponent';
import UserEditAddressProfessionComponent from 'components/userComponent/UserEditAddressProfessionComponent';
import ImgFondo from "../../assets/img/bg-1.png";
import { useFormik } from "formik";
import { updateCustomer, getCustomer } from 'services/customer';
import { getRegion, getComuneById } from 'services/location';
import { getEducationOptions, getProfession, getCountries } from 'services/lists';

var styles = {
    backgroundImage: `url(${ImgFondo})`,
    backgroundSize: "cover",
};

const EditAddressProfession = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [countires, setCountries] = React.useState([]);
    const [professions, setProfessions] = React.useState([]);
    const [regions, setRegions] = React.useState([]);
    const [communes, setCommunes] = React.useState([]);
    const [educations, setEducations] = React.useState([]);
    const [, setNotification] = useNotification();
    const formik = useFormik({
        initialValues: {
            day: '',
            month: '',
            year: '',
            country: '',
            region: '',
            commune: '',
            education_level: '',
            occupation: '',
            other_occupation: ''
        },
        onSubmit: handleUpdate
    });

    const handleUpdate = async (data) => {
        try {
            const res = await updateCustomer(data);
            if (res.status >= 400) {
                setNotification({ type: 'error', message: 'Ha ocurrido un error, no fue posible actualizar los datos.', delay: 2000 });
            }
            setNotification({ type: 'success', message: 'Datos actualizados correctamente.', delay: 8000 })
        } catch (error) {
            console.error('[handleUpdate]', error);
        }
    }

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
            setRegions(resp.data.result)
        } catch (error) {
            console.log('StepOneFormComponent ERROR: ', error);
        }
    }

    const handleGetCommuneById = async (region_id) => {
        // setLoadingCommunes((prevState) => !prevState);
        const resp = await getComuneById(region_id);
        try {
            setCommunes(resp.data.result);
            // formik.setFieldValue()
        } catch (error) {
            console.log('ERROR: ', error);
        }
        // setLoadingCommunes((prevState) => !prevState);
    }

    const handleGetEducation = async () => {
        const resp = await getEducationOptions();
        try {
            setEducations(resp.data.result)
        } catch (error) {
            console.log('ERROR: ', error);
        }
    }

    const handleGetProfession = async () => {
        const resp = await getProfession();
        try {
            setProfessions(resp.data.result)
        } catch (error) {
            console.log('ERROR: ', error);
        }
    }

    const handleInit = async () => {
        try {
            const { data } = await getCustomer();
            formik.setValues({
                day: data.result.day || '',
                month: data.result.month || '',
                year: data.result.year || '',
                country: data.result.country || '',
                region: data.result.region || '',
                commune: data.result.commune || '',
                education_level: data.result.education_level || '',
                occupation: data.result.occupation || '',
                other_occupation: data.result.other_occupation || ''
            });
            setIsLoading(false);
        } catch (error) {
            console.log('ERROR: ', error);
        }
    }

    React.useEffect(() => {
        handleGetCountries();
        handleGetRegion();
        handleGetEducation();
        handleGetProfession();
        handleInit();
    }, []);

    return (
        <div
            className="c-app c-default-layout flex-row"
        >
            <CContainer fluid={true}>
                <CRow className="justify-content-center h-100">
                    <CCol md="6" style={styles} className="align-items-center bg-gradient-blue">
                        <div className="d-flex h-100 justify-content-center align-items-center text-center flex-column text-white p-relative">
                            <h1 className="bold f-48 mt-5 mt-md-0">Actualiza tus datos</h1>
                        </div>
                    </CCol>

                    <CCol className="p-5" md="6">
                        <CRow className="justify-content-center h-100">
                            <CCol md={8}>
                                <UserEditNavComponent></UserEditNavComponent>
                                {isLoading ? <div className="text-center mt-5"><CSpinner color="light" /></div> :
                                    <UserEditAddressProfessionComponent
                                        formik={formik}
                                        countries={countires}
                                        regions={regions}
                                        communes={communes}
                                        getCommunesByRegion={handleGetCommuneById}
                                        educations={educations}
                                        professions={professions} />}
                            </CCol>
                        </CRow>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    );
}

export default EditAddressProfession;
