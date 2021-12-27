import React, { useState } from "react";
import {
    CCol,
    CContainer,
    CRow,
    CSpinner
} from "@coreui/react";
import UserEditNavComponent from 'components/userComponent/UserEditNavComponent';
import UserEditRentComponent from 'components/userComponent/UserEditRentComponent';
import ImgFondo from "../../assets/img/bg-1.png";

var styles = {
    backgroundImage: `url(${ImgFondo})`,
    backgroundSize: "cover",
};

const EditRent = () => {
    const [visible, setVisible] = useState(false);
    const handleInit = async () => {
        try {
            setVisible(true);
        } catch (error) {
            console.log('ERROR: ', error);
        }
    }

    React.useEffect(() => {
        handleInit();
    }, [])

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

                    <CCol md="6">
                        <CRow className="justify-content-center mt-5">
                            <CCol md={8}>
                                <UserEditNavComponent></UserEditNavComponent>
                            </CCol>
                        </CRow>
                        <CRow className="justify-content-center align-items-center h-100">
                            <CCol md={8}>
                                {visible ? <UserEditRentComponent /> : <div className="text-center mt-5"><CSpinner color="light" /></div>}
                            </CCol>
                        </CRow>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    );
}

export default EditRent;
