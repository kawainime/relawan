import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
    return (<>
        <ul className="navbar-nav sidebar sidebar-light accordion" id="accordionSidebar">
            <Link className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                <div className="sidebar-brand-icon">
                    <img src="img/logo/logo2.png" />
                </div>
                <div className="sidebar-brand-text mx-3">5SHAF</div>
            </Link>
            <hr className="sidebar-divider my-0" />
            <li className="nav-item">
                <Link className="nav-link" href="/">
                    <i className="fas fa-fw fa-tachometer-alt" />
                    <span>Dashboard</span></Link>
            </li>
            <hr className="sidebar-divider" />
            <div className="sidebar-heading">
                Features
            </div>
            <li className="nav-item">
                <Link className="nav-link" href="/data-calon-pendukung.html">
                    <i className="fas fa-fw fa-palette" />
                    <span>Data Calon Pendukung</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" href="/data-tps.html">
                    <i className="fas fa-fw fa-palette" />
                    <span>Master Data TPS</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" href="/data-relawan.html">
                    <i className="fas fa-fw fa-palette" />
                    <span>Master Relawan</span>
                </Link>
            </li>
            <hr className="sidebar-divider" />
            <div className="version" id="version-ruangadmin" />
        </ul >

    </>);
}

export default Header;