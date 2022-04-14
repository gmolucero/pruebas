import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  CCol,
  CContainer,
  CRow,
  CSpinner
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import { validate, handlerInputChangeCreator } from 'utils';
import { loginSchema as schema } from 'components/loginFormComponent/loginSchema';

import PublicLayout from 'containers/ThePublicLayout.js';
import LoginFormComponent from 'components/loginFormComponent/LoginFormComponent';

import ImgFondo from "../../assets/img/bg-1.png";
import { login, reSendEmail } from "../../services/login";
import { useNotification } from "context/hooks";


var styles = {
  backgroundImage: `url(${ImgFondo})`,
  backgroundSize: "cover",
};

const Login = (props) => {
  const [visible, setVisible] = useState(true);
  const [, setNotification] = useNotification()
  const menu = [
    {
      name: 'Registro',
      target: 'registro'
    }
  ]

  useEffect(() => {
    if (window.localStorage.getItem('token')) {
      props.history.push("/");
    }
  }, []);

  const setUserLogged = (email, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", email);

    if (typeof props.location.state !== 'undefined' && typeof props.location.state.from !== 'undefined' && props.location.state.from.pathname != '/' && props.location.state.from.pathname != 'login') {
      props.history.push(props.location.state.from.pathname);
    } else {
      props.history.push("/");
    }
  }

  const onSubmit = (user) => {
    setVisible(false);
    if (process.env.REACT_APP_FAKE_LOGIN === "true") {
      setUserLogged("fake_user", "fake_token");
      props.history.push("/");
    } else {
      login(user).then(
        (response) => {
          if (response.status === 200) {
            if (response.data.result.user.email_verified_at) {
              setUserLogged(user.email, response.data.result.access_token);
            } else {
              setNotification({ type: 'warning', message: 'Debes verificar, para esto ingresa a tu correo y activa tu cuenta desde el correo de verificación que te enviamos al momento de crear tu cuenta', delay: 8000 })
              setVisible(true);
              localStorage.setItem("token", response.data.result.access_token);
              reSendEmail().then(
                (res) => {
                  sessionStorage.clear();
                  if (res.status !== 200) {
                    setNotification({ type: 'warning', message: 'Ocurrió un error al reenviar mensaje de confirmación de correo electrónico', delay: 3000 })
                  }
                },
                (error) => {
                  console.error('Resend email: ', error);
                }
              );
              localStorage.clear();
            }

          } else {
            setNotification({ type: 'warning', message: "Esta credencial no se encuentra en nuestros registros o su contraseña es incorrecta.", delay: 8000 })
            setVisible(true);
          }
        },
        (error) => {
          setVisible(true);
          console.error('Login onSubmit: ', error);
        }
      );
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: validate(schema),
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
                <h1 className="bold f-48 mt-5 mt-md-0">Inicia sesión</h1>
                <p className="mb-5 h3 px-5">Rellena el formulario y comienza la experiencia con {process.env.REACT_APP_NAME}..</p>

                <ul className="login-list p-0">
                  <li><CIcon name="cil-clock" /> Ahorra tiempo</li>
                  <li><CIcon name="cil-find-in-page" /> Pre-ofertas personalizadas</li>
                  <li><CIcon name="cil-chat-bubble" /> Negocia tu pre-oferta</li>
                </ul>
              </div>
            </CCol>

            <CCol md="6">
              <CRow className="justify-content-center align-items-center h-100">
                <CCol md={8}>
                  {visible ? <LoginFormComponent formik={formik} onChange={handleTextChange} /> : <div className="text-center"><CSpinner color="light" /></div>}
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </PublicLayout>
  );
};

export default Login;
