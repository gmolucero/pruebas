import React from "react";
import {
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CButton,  
  CToggler,
  CNavbarNav,
  CDropdown,
  CDropdownMenu,
  CDropdownToggle
} from "@coreui/react";
import { useSelector, useDispatch } from "react-redux";
import logo from "../assets/img/logo_portal.png";
import { Link } from "react-router-dom";
import CIcon from "@coreui/icons-react";
// routes config

const TheHeader = (props) => {
  const dispatch = useDispatch();
  const asideShow = useSelector(state => state.asideShow)
  const logout = (props) => {
    localStorage.clear();
  };

  return (
    <CHeader withSubheader className="px-sm-5 px-3 py-2 bg-primary">
      <CHeaderBrand className="" to="/">
        <img src={logo} alt="Logo" style={{ height: "48px" }} />
      </CHeaderBrand>

      <CHeaderNav className="d-xs-down-none mr-auto">
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/"></CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>
      <CHeaderNav className=" ml-auto px-sm-3  d-sm-down-none">  
        <CHeaderNavItem className="px-2">
          <CHeaderNavLink to="/resumen">PRODUCTOS SOLICITADOS</CHeaderNavLink>
        </CHeaderNavItem>
        <CDropdown inNav>
          <CDropdownToggle className="text-white">USUARIO</CDropdownToggle>
          <CDropdownMenu>                                   
            <Link to="/actualizar-datos" className="btn-logout dropdown-item">
              Cambiar datos
            </Link>                              
            {/* <Link to="/login" onClick={logout} className="btn-logout dropdown-item">
              Cerrar sesión
            </Link>                                */}
          </CDropdownMenu>
        </CDropdown>
        <Link to="/cotizacion" className="pl-2">
          <CButton className="btn-secondary mr-2">Cotiza tu crédito</CButton>
        </Link>
        <Link to="/" onClick={logout}>
          <CIcon name="cil-account-logout" className="text-white" />
        </Link>
      </CHeaderNav>

      <CToggler
        inHeader
        className="ml-sm-3 d-md-none"
        onClick={() => dispatch({type: 'set', asideShow: !asideShow})}
      />
    </CHeader>
  );
};

export default TheHeader;
