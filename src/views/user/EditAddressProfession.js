import React, { useState } from "react";
import {
    CCol,
    CContainer,
    CRow,
    CSpinner,
    CAlert
} from "@coreui/react";
import UserEditNavComponent from 'components/userComponent/UserEditNavComponent';
import UserEditAddressProfessionComponent from 'components/userComponent/UserEditAddressProfessionComponent';
import ImgFondo from "../../assets/img/bg-1.png";
import { useFormik } from "formik";
import { updateCustomer, getCustomer } from 'services/customer';
import { getRegion, getComuneById } from 'services/location';
import { getEducationOptions, getProfession, getCountries } from 'services/lists';
import { UserEditAddressProfessionSchema as schema } from 'components/userComponent/UserEditAddressProfessionSchema';
import { validate } from 'utils';

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
    const [notification, setNotification] = React.useState({ visible: false, type: 'success', message: '' });
    const [dataLoaded, setDataLoaded] = useState(false);

    async function onSubmit(user) {
        try {
            setIsLoading((prevState) => !prevState);
            const res = await updateCustomer(user);
            checkStatus(res);
            setIsLoading((prevState) => !prevState);
        } catch (error) {
            console.error('[onSubmit Error] form', error);
        }

        function checkStatus(res) {
            if (res.status >= 400) {
                setNotification((notification) => ({ ...notification, type: 'danger', visible: true, message: 'Ha ocurrido un error, no fue posible actualizar los datos.' }));
            } else {
                setNotification((notification) => ({ ...notification, type: 'success', visible: true, message: 'Datos actualizados correctamente.' }));
            }
            setTimeout(() => setNotification((notification) => ({ ...notification, visible: false, message: '' })), 2000);
        }
    }

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
        validate: validate(schema),
        onSubmit: onSubmit
    });

    async function handleGetCountries() {
        try {
            const resp = await getCountries();
            setCountries(resp.data.result);
        } catch (error) {
            console.log('StepOneFormComponent ERROR: ', error);
        }
    }

    async function handleGetRegion() {
        try {
            const resp = await getRegion();
            setRegions(resp.data.result);
        } catch (error) {
            console.log('StepOneFormComponent ERROR: ', error);
        }
    }

    async function handleGetCommuneById(region_id) {
        const resp = await getComuneById(region_id);
        try {
            setCommunes(resp.data.result);
        } catch (error) {
            console.log('ERROR: ', error);
        }
    }

    async function handleGetEducation() {
        const resp = await getEducationOptions();
        try {
            setEducations(resp.data.result);
        } catch (error) {
            console.log('ERROR: ', error);
        }
    }

    async function handleGetProfession() {
        const resp = await getProfession();
        try {
            setProfessions(resp.data.result);
        } catch (error) {
            console.log('ERROR: ', error);
        }
    }

    async function handleInit() {
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
            setDataLoaded(true);
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

    React.useEffect(() => {
        if (dataLoaded) {
            setIsLoading(false);
        }
    }, [dataLoaded]);

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

                    <CCol className="pt-5" md="6">
                        <CRow className="justify-content-center h-100">
                            <CCol md={8}>
                                <UserEditNavComponent></UserEditNavComponent>
                                {
                                    notification.visible &&
                                    <CAlert className="mt-1" color={notification.type} dismissible visible={notification.visible} onClose={() => setNotification((notification) => ({ ...notification, open: false }))}> {notification.message} </CAlert>
                                }
                                {isLoading ? <div className="text-center mt-5"><CSpinner color="light" /></div> :
                                    <UserEditAddressProfessionComponent
                                        formik={formik}
                                        countries={countires}
                                        regions={regions}
                                        communes={communes}
                                        getCommunesByRegion={handleGetCommuneById}
                                        educations={educations}
                                        professions={professions}
                                    />}
                            </CCol>
                        </CRow>
                    </CCol>
                </CRow>
            </CContainer >
        </div >
    );
}

export default EditAddressProfession;
