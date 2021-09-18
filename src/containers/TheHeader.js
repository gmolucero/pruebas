import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CNavbarNav,
  CDropdown,
  CDropdownToggle,
  CDropdownItem,
  CDropdownMenu,
  CToggler,
} from "@coreui/react";

import logo from "../assets/img/cliente-logo-blanco-sidebar.png";
import { context } from "../context/context";
import { Link } from "react-router-dom";
// routes config

const TheHeader = (props) => {
  const { value } = useContext(context);
  const dispatch = useDispatch();
  // const asideShow = useSelector((state) => state.asideShow);
  // const darkMode = useSelector((state) => state.darkMode);
  const sidebarShow = useSelector((state) => state.sidebarShow);

  const toggleSidebar = () => {
    const val = [true, "responsive"].includes(sidebarShow)
      ? false
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };
  const logout = (props) => {
    localStorage.clear();
  };
  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none f-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        {/* <CIcon name="logo" height="48" alt="Logo" /> */}
        <img src={logo} alt="Logo" style={{ height: "48px" }} />
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/dashboard"></CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>

      <CHeaderNav className="px-3">
        {/* <CToggler
          inHeader
          className="ml-3 d-md-down-none"
          onClick={() => dispatch({type: 'set', darkMode: !darkMode})}
          title="Toggle Light/Dark Mode"
        >
          <CIcon name="cil-moon" className="c-d-dark-none" alt="CoreUI Icons Moon" />
          <CIcon name="cil-sun" className="c-d-default-none" alt="CoreUI Icons Sun" />
        </CToggler> */}
        {/* <CToggler
          inHeader
          className="d-md-down-none"
          onClick={() => dispatch({type: 'set', asideShow: !asideShow})}
        >
          <CIcon className="mr-2" size="lg" name="cil-applications-settings" />
        </CToggler> */}
        <CNavbarNav className="ml-auto">
          <CDropdown inNav>
            <CDropdownToggle className="text-white">{value}</CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem>Cuenta</CDropdownItem>
              {/* <CDropdownItem onClick={logout}> */}
                <Link to="/" onClick={logout} className="btn-logout dropdown-item">
                  Cerrar sesión
                </Link>
              {/* </CDropdownItem> */}
            </CDropdownMenu>
          </CDropdown>
        </CNavbarNav>
      </CHeaderNav>

      {/* <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter className="border-0 c-subheader-nav m-0 px-0 px-md-3" routes={routes} />
      </CSubheader> */}
    </CHeader>
  );
};

export default TheHeader;
