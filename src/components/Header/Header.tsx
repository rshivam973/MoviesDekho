import React from "react";
import SiteLogo from "../../images/Moviesdekho.png"
import { Link } from "react-router-dom";

const Header: React.FC = () => {
    return (
        <div className="flex justify-center py-4 bg-background border-b shadow-sm">
            <Link to="/">
                <img
                    className="h-12 w-auto hover:opacity-80 transition-opacity duration-200"
                    src={SiteLogo}
                    alt="Moviesdekho"
                />
            </Link>
        </div>
    );
}

export default Header;
