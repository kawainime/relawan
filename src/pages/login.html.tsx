import baseUrl from '@/config';
import axios, { AxiosResponse } from 'axios';
import Head from 'next/head';
import CryptoJS from 'crypto-js';
import queryString from 'query-string';
import React, { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

export const getData = async () => {
    let data = "";
    await axios.get(baseUrl("pubs/token.key")).then((respon: AxiosResponse<any, any>) => {
        data = respon.data.data;

    })
    return data;
}
interface dataProps {
    datax: string,
}

const Login: React.FC = () => {
    const route = useRouter();

    const [username, setUsername] = useState<string>("admin");
    const [password, setPassword] = useState<string>("admin123");
    const [readyState, setReadyState] = useState<boolean>(true);
    useEffect(() => {

    }, [])
    const _handleLogin = (e: FormEvent) => {

        e.preventDefault();
        axios.post(baseUrl("login"), queryString.stringify({
            username: username,
            password: password,
        }), {
            headers: {
                Authorization: "Bearer " + CryptoJS.AES.encrypt("", "").toString(),
            }
        }).then((respon: AxiosResponse<any, any>) => {
            if (respon.data.status == "login_berhasil") {
                let data: string = JSON.stringify(respon.data.data);
                data = CryptoJS.AES.encrypt(data, '123').toString();
                window.localStorage.setItem("data_login", data);
                alert("Login berhasil");
                route.push("/");
            }
            else {
                alert("Usrename atau password tidak benar");
            }
        });
    }
    return (<>
        <Head>
            <title>
                Login
            </title>
        </Head>
        <div className="container-login">
            <div className="row justify-content-center">
                <div className="col-xl-3 col-lg-4 col-md-4">
                    <div className="card shadow-sm my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="login-form">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">5 Shaf </h1>
                                            <h1 className="h4 text-gray-900 mb-4">Login</h1>
                                        </div>
                                        <form onSubmit={_handleLogin} className="user">
                                            <div className="form-group">
                                                <input
                                                    onChange={(e) => {
                                                        setUsername(e.target.value);
                                                    }}
                                                    type="text" className="form-control"
                                                    required
                                                    id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Masukkan username anda" />
                                            </div>
                                            <div className="form-group">
                                                <input type="password"
                                                    required
                                                    onChange={(e) => {
                                                        setPassword(e.target.value);
                                                    }}
                                                    className="form-control" id="exampleInputPassword"
                                                    placeholder="Masukkan password anda" />
                                            </div>

                                            <div className="form-group">
                                                <button type='submit' className="btn btn-primary btn-block">Login</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>);
}

export default Login;
