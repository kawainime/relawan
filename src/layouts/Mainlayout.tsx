import React from 'react';
import Header from './Header';
import Nav from './Nav';


interface props_componen {

    children: React.ReactNode;
}
const MainLayoutx = (prop_componen: any) => {
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
                    <div className="container-fluid" id="container-wrapper">
                        <div className="d-sm-flex align-items-center justify-content-between mb-4">
                            <h1 className="h3 mb-0 text-gray-800">Blank Page</h1>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="./">Home</a></li>
                                <li className="breadcrumb-item">Pages</li>
                                <li className="breadcrumb-item active" aria-current="page">Blank Page</li>
                            </ol>
                        </div>
                        <div className="text-center">
                            <img src="img/think.svg" style={{ maxHeight: 90 }} />
                            <h4 className="pt-3">save your <b>imagination</b> here!</h4>
                        </div>
                        {/* Modal Logout */}
                        <div className="modal fade" id="logoutModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabelLogout" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabelLogout">Ohh No!</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">×</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <p>Are you sure you want to logout?</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-outline-primary" data-dismiss="modal">Cancel</button>
                                        <a href="login.html" className="btn btn-primary">Logout</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*-Container Fluid*/}
                </div>
                {/* Footer */}
                <footer className="sticky-footer bg-white">
                    <div className="container my-auto">
                        <div className="copyright text-center my-auto">
                            <span>copyright ©  - developed by
                                <b><a href="https://indrijunanda.gitlab.io/" target="_blank">indrijunanda</a></b>
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