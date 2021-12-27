import React from "react";
import {
    CNav,
    CNavItem,
    CNavLink
} from "@coreui/react";

const UserEditNavComponent = () => {
    return (
        <CNav variant="tabs">
            <CNavItem>
                <CNavLink to="/actualizar-datos">
                    Identificación
                </CNavLink>
            </CNavItem>
            <CNavItem>
                <CNavLink to="/actualizar-profesion">
                    Dirección y Estudios
                </CNavLink>
            </CNavItem>
            <CNavItem>
                <CNavLink to="/actualizar-renta">
                    Rentas
                </CNavLink>
            </CNavItem>
        </CNav>)
}

export default UserEditNavComponent;
