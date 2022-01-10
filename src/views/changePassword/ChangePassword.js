import React, { useState } from "react";
import { useFormik } from "formik";
import {
  CCol,
  CContainer,
  CRow,
  CSpinner
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useLocation } from "react-router-dom";
import { useNotification } from 'context/hooks';

import { validate, handlerInputChangeCreator } from 'utils';
import { changePasswordSchema as schema } from 'components/changePasswordFormComponent/changePasswordSchema';

import PublicLayout from 'containers/ThePublicLayout.js';
import ChangePasswordFormComponent from 'components/changePasswordFormComponent/ChangePasswordFormComponent';

import ImgFondo from "../../assets/img/bg-1.png";


import { resetPassword } from 'services/login';

var styles = {
  backgroundImage: `url(${ImgFondo})`,
  backgroundSize: "cover",
};

const ChangePassword = (props) => {
  // const { tokenId } = useParams();
  const search = useLocation().search;
  const token = new URLSearchParams(search).get('token');

  const [visible, setVisible] = useState(true);
  const [, setNotification] = useNotification();
  const menu = [
    {
      name: 'Registro',
      target: 'registro'
    }
  ]

  const onSubmit = async (user) => {
    try {
      setVisible(false);
      const res = await resetPassword(user);
      if (res.status !== 200) throw new Error("error ")
      setNotification({ type: 'info', message: 'Contraseña acutalizada' })
      props.history.push("/")
    } catch (error) {      
      setNotification({ open: true, type: 'warning', message: 'Datos de usuario inválidos' });
      setVisible(true);
      console.error('[onSubmit Error:]', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      token: token,
      email: '',
      password: '',
      password_confirmation: '',
    },
    validate: validate(schema),
    onSubmit: onSubmit,
  });

  const handleTextChange = handlerInputChangeCreator(formik)
  console.log(formik.values,"formik")
  return (
    <PublicLayout menu={menu} >
      <div
        className="c-app c-default-layout flex-row bg-public"
      >
        <CContainer fluid={true}>
          <CRow className="justify-content-center h-100">
            <CCol md="6" style={styles} className="align-items-center bg-gradient-blue">
              <div className="d-flex h-100 justify-content-center align-items-center text-center flex-column text-white p-relative">
                <h1 className="bold f-48 mt-5 mt-md-0">Actualizar</h1>
                <p className="mb-5 h3 px-5">Rellena el formulario y comienza la experiencia con {process.env.REACT_APP_NAME}.</p>

                <ul className="login-list p-0">
                  <li><CIcon name="cil-clock" /> Ahorra tiempo y solicita tu crédito.</li>
                  <li><CIcon name="cil-find-in-page" /> Te llegarán pre-ofertas personalizadas.</li>
                  <li><CIcon name="cil-chat-bubble" /> Negocia la pre-oferta de tu crédito.</li>
                </ul>
              </div>
            </CCol>

            <CCol md="6">
              <CRow className="justify-content-center align-items-center h-100">
                <CCol md={8}>
                  {visible ? <ChangePasswordFormComponent formik={formik} onChange={handleTextChange} /> : <div className="text-center"><CSpinner color="light" /></div>}
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </PublicLayout>
  );
};

export default ChangePassword;
