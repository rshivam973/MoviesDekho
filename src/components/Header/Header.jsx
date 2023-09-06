import React from "react";
import SiteLogo from "../../images/Moviesdekho.png"
import "./header.css"
import { LinkContainer } from "react-router-bootstrap";

function Header(){

    return <div>
        <header>
        <LinkContainer to={'/'}><img className="site-logo" src={SiteLogo} align="center" alt="Moviesdekho"/></LinkContainer>
        </header>
        
    </div>
}
export default Header;