import React from 'react';
import PropTypes from 'prop-types';
import {
    CContainer,
    CNavbar,
    CNavbarBrand,
    CNavbarNav,
    CNavItem,
    CNavLink,
} from "@coreui/react";
import Logo from "../assets/img/logo_portal.png";

import NotificationComponent from 'components/notificationComponent/NotificationComponent';

const PublicLayout = ({ children, menu }) => {

    return (
        <>
            <NotificationComponent />
            <CContainer fluid className="bg-primary-dark" >
                <CNavbar expand="md" colorscheme="light" >

                    <CNavbarBrand href="#/"><img src={Logo} alt="Logo" /></CNavbarBrand>
                    <CNavbarNav className="flex-row">
                        {
                            menu && menu.map(element => (<CNavItem key={element.name}>
                                <CNavLink href={`#/${element.target}`} className="text-white"> {element.name} </CNavLink>
                            </CNavItem>))
                        }
                    </CNavbarNav>

                </CNavbar>
            </CContainer>
            {children}
        </>
    )
}


PublicLayout.defaultProps = {
    menu: []
}

PublicLayout.propTypes = {
    menu: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        target: PropTypes.string.isRequired
    }).isRequired)
}

export default PublicLayout;