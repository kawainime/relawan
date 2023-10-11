import React from 'react';
import Header from './Header';
import Nav from './Nav';


interface props_componen {

    children: React.ReactNode;
}
const MainLayoutx = (props_componen: any) => {
    return (<>
        <div id="wrapper">
            {/* Sidebar */}
            <Header />
            {/* Sidebar */}
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    {/* TopBar */}
                    <Nav />
                    {/* Topbar */}
                    {/* Container Fluid*/}
                    {props_componen.children}
                    {/*-Container Fluid*/}
                </div>
                {/* Footer */}
                <footer className="sticky-footer bg-white">
                    <div className="container my-auto">
                        <div className="copyright text-center my-auto">
                            <span>copyright ©  - developed by
                                <b>Azwar Buton</b>
                            </span>
                        </div>
                    </div>
                </footer>
                {/* Footer */}
            </div>
        </div>

    </>)
}

export default MainLayoutx;