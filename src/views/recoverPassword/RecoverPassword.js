import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  CCol,
  CContainer,
  CRow,
  CSpinner,
  CButton,
  CForm,
  CInput,
  CInvalidFeedback,
  CFormGroup
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useNotification } from "context/hooks";

import { validate, handlerInputChangeCreator, getValidationResult } from 'utils';
import { resetPassword } from "../../services/login";

import PublicLayout from 'containers/ThePublicLayout.js';

import ImgFondo from "../../assets/img/bg-1.png";

var styles = {
  backgroundImage: `url(${ImgFondo})`,
  backgroundSize: "cover",
};

const RecoverPassword = ({ history }) => {
  const [visible, setVisible] = useState(true);
  const [, setNotification] = useNotification();

  const menu = [
    {
      name: 'Registros',
      target: 'registro'
    }
  ]

  const onSubmit = async (user) => {
    try {
      setVisible(false);
      const res = await resetPassword(user)
      if (res.status !== 200) throw new Error("error ")
      setNotification({ open: true, type: 'info', message: 'Revise su correo electronico' });
      history.push('/');
    } catch (error) {
      setNotification({ open: true, type: 'warning', message: 'Datos de usuario inválidos' });
      setVisible(true);
      console.log('[onSubmit error]', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: ''
    },
    validate: validate(() => Yup.object().shape({
      username: Yup.string()
        .email('Email inválido')
        .max(100, 'El texto no debe superar los 50 carácteres')
        .required("La dirección de correo es requerida"),
    })),
    onSubmit: onSubmit,
  });

  const handleTextChange = handlerInputChangeCreator(formik)

  return (

    <PublicLayout menu={menu} >
      <div
        className="c-app c-default-layout flex-row bg-public"
      >
        <CContainer fluid={true}>
          <CRow className="justify-content-center h-100">
            <CCol md="6" style={styles} className="align-items-center bg-gradient-blue">
              <div className="d-flex h-100 justify-content-center align-items-center text-center flex-column text-white p-relative">
                <h1 className="bold f-48 mt-5 mt-md-0">Recuperar contraseña</h1>
                <p className="mb-5 h3 px-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas fugit cupiditate ut mollitia itaque, accusamus beatae qui eaque corporis excepturi. </p>

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
                  {visible ?

                    <CForm className="my-5 mt-md-0" onSubmit={formik.handleSubmit}>
                      <CFormGroup className="mb-3">
                        <CInput
                          type="email"
                          placeholder="Correo electronico"
                          autoComplete="email"
                          value={formik.values.username}
                          invalid={formik.touched.username && !!formik.errors.username}
                          onChange={handleTextChange}
                          name="username"
                        />
                        <CInvalidFeedback invalid={getValidationResult(formik.touched.username && !!formik.errors.username)}>{formik.errors.username}</CInvalidFeedback>
                      </CFormGroup>

                      <CButton type="submit" className="btn-login d-inline px-4" >
                        Recuperar
                      </CButton>

                    </CForm>

                    : <div className="text-center"><CSpinner color="light" /></div>}
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </PublicLayout>


  );
};

export default RecoverPassword;
