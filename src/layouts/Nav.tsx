import React from "react";

const Nav: React.FC = () => {
    return (<>
        <nav className="navbar navbar-expand navbar-light bg-navbar topbar mb-4 static-top">
            <button id="sidebarToggleTop" className="btn btn-link rounded-circle mr-3">
                <i className="fa fa-bars" />
            </button>

        </nav>
    </>);
}

export default Nav;