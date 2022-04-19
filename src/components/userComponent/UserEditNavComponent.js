import React from "react";
import {
    CNav,
    CNavItem,
    CNavLink
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const UserEditNavComponent = () => {
    return (
        <CNav variant="tabs">
            <CNavItem>
                <CNavLink to="/actualizar-datos">
                    <CIcon name="cil-user" size="lg" className="d-block d-md-none" />
                    <span className="d-none d-md-block">Identificación</span>
                </CNavLink>
            </CNavItem>
            <CNavItem>
                <CNavLink to="/actualizar-profesion">
                    <CIcon name="cil-house" size="lg" className="d-block d-md-none" />
                    <span className="d-none d-md-block">Dirección y Estudios</span>
                </CNavLink>
            </CNavItem>
            <CNavItem>
                <CNavLink to="/actualizar-renta">
                    <CIcon name="cil-money" size="lg" className="d-block d-md-none" />
                    <span className="d-none d-md-block">Rentas</span>
                </CNavLink>
            </CNavItem>
        </CNav>)
}

export default UserEditNavComponent;
