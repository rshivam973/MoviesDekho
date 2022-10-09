import React from "react";
import SiteLogo from "../../images/Moviesdekho.png"
import "./header.css"

function Header(){

    return <div>
        <header>
        <img className="site-logo" src={SiteLogo} align="center" alt="Moviesdekho"/>
        </header>
        
    </div>
}
export default Header;