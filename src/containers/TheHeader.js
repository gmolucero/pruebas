import React from "react";
import {
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CButton
} from "@coreui/react";

import logo from "../assets/img/logo_portal.png";
import { Link } from "react-router-dom";
import CIcon from "@coreui/icons-react";
// routes config

const TheHeader = (props) => {

  const logout = (props) => {
    localStorage.clear();
  };

  return (
    <CHeader withSubheader className="px-sm-5 px-3 py-2">
      <CHeaderBrand className="" to="/">
        <img src={logo} alt="Logo" style={{ height: "48px" }} />
      </CHeaderBrand>

      <CHeaderNav className="d-xs-down-none mr-auto">
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/dashboard"></CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>

      <CHeaderNav className="px-sm-3">
        <CButton className="btn-secondary mr-2">Cotiza tu crédito</CButton>
        <Link onClick={logout}>
          <CIcon name="cil-account-logout" className="text-white" />
        </Link>
      </CHeaderNav>
    </CHeader>
  );
};

export default TheHeader;
