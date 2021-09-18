import React, { useContext, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CRow,
  CLabel,
  CAlert,
} from "@coreui/react";

import { context } from "../../context/context";
import ImgFondo from "../../assets/img/login-imgfondo-2.png";
import Logo from "../../assets/img/cliente-logo-blanco.png";
import login from "../../services/login";

var styles = {
  backgroundImage: `url(${ImgFondo})`,
  backgroundSize: "cover",
};

const Login = (props) => {
  const { setValue } = useContext(context);
  const [user, setUser] = useState({ username: "", password: "" });
  const [visible, setVisible] = useState(false);
  const handleUser = (e) => {
    const username = e.target.value;

    setUser({
      ...user,
      username,
    });
  };

  const handlePass = (e) => {
    const password = e.target.value;

    setUser({
      ...user,
      password,
    });
  };

  const setUserLogged = (username, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", username);
    setValue(username);
    props.history.push("/dashboard");
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setVisible(false);
    if (process.env.REACT_APP_FAKE_LOGIN) {
      setUserLogged("fake_user", "fake_token");
    } else {
      login.login(user).then(
        (response) => {
          if (response.status === 200) {
            setUserLogged(user.username, response.data.data);
          } else {
            if (response.status === 404) {
              setVisible(true);
            }
          }
        },
        (error) => { }
      );
    }
  };

  return (
    <>
      <div
        className="c-app c-default-layout flex-row align-items-center bg-login"
        style={styles}
      >
        <CContainer>
          <div className="text-center mb-5 ">
            <img src={Logo} alt="Logo" style={{ height: "100px" }} />
          </div>
          <CRow className="justify-content-center">
            <CCol md="9" lg="7" xl="6">
              <CCard className="mx-4 pl-4 pr-4">
                <CCardBody className="p-4">
                  <CAlert color="danger" closeButton show={visible}>
                    Usuario o contraseña equivocada
                  </CAlert>
                  <CForm>
                    <CLabel className="bold">E-mail</CLabel>
                    <CInputGroup className="mb-3">
                      <CInput
                        type="email"
                        label="Name"
                        placeholder="hola@suma.cl"
                        autoComplete="email"
                        required
                        data={user.userName}
                        onChange={handleUser}
                        name="username"
                      />
                    </CInputGroup>
                    <CLabel className="bold">Contraseña</CLabel>
                    <CInputGroup className="mb-3">
                      <CInput
                        type="password"
                        placeholder=""
                        onChange={handlePass}
                        data={user.password}
                        autoComplete="Password"
                        name="password"
                      />
                    </CInputGroup>

                    <CButton className="btn-login" onClick={onSubmit} block>
                      Ingresar
                    </CButton>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  );
};

export default Login;
