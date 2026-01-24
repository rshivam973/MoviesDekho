import React from "react";
import Link from "next/link";

const Header: React.FC = () => {
    return (
        <div className="flex justify-center py-4 bg-background border-b shadow-sm">
            <Link href="/">
                <img
                    className="h-12 w-auto hover:opacity-80 transition-opacity duration-200"
                    src="/images/Moviesdekho.png"
                    alt="Moviesdekho"
                />
            </Link>
        </div>
    );
}

export default Header;
