import React, { ReactNode, useContext, useEffect } from 'react';
import Header from './Header';
import Nav from './Nav';
import { createContext } from 'vm';

import { useMyContext } from '@/interface/myContext';
import { NextRouter, useRouter } from 'next/router';
interface props_componen {

    children: React.ReactNode;
}

const MainLayoutx = (props: props_componen) => {
    const route: NextRouter = useRouter();
    const { menu } = useMyContext();
    const _cekLogin = () => {
        if (typeof window !== "undefined") {
            const c = window.localStorage.getItem("data_login");
            if (c == null) {
                window.alert("Anda harus login dulu");
                route.push("/login.html");
            }
            else {

            }
        }
        else {
            console.log("und");
        }
    }
    useEffect(() => {
        _cekLogin();
    }, [menu]);
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
                    {props.children}
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