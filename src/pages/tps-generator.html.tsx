import baseUrl from "@/config";
import axios, { AxiosResponse } from "axios";
import Head from "next/head";
import Link from "next/link";
import { useParams } from "next/navigation";
import { NextRouter, useRouter } from "next/router";
import queryString from "query-string";
import React, { useState } from "react";

const Tps_generator: React.FC = () => {
    const navigator: NextRouter = useRouter();
    const [dari, setDari] = useState<any>(1);
    const [sampai, setSampai] = useState<any>();


    const _simpan = (e: React.FormEvent) => {
        axios.post(baseUrl("save-tps-generator"), queryString.stringify({
            id_kelurahan: navigator.query.id_kelurahan,
            dari: dari, sampai: sampai
        })).then((respon: AxiosResponse<any, any>) => {
            if (respon.data.status == "data_tersimpan") {
                navigator.push("/data-tps.html");
            }
        });
        e.preventDefault();
    }
    return (<>
        <Head>
            <title>TambahData TPS</title>
        </Head>

        <div className="container-fluid" id="container-wrapper">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <button onClick={() => {
                    navigator.back();
                }} className="btn btn-danger"><i className="fa fa-chevron-left" />Kembali</button>
                <h1 className="h3 mb-0 text-gray-800">TPS Generator</h1>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link href="/">Dashboard</Link></li>
                    <li className="breadcrumb-item"><Link href="/data-tps.html">Master Data TPS</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">TPS Generator</li>
                </ol>
            </div>
            <div className="col-lg-6" style={{ margin: "auto" }}>
                <div className="card">
                    <div className="card-header">
                        <div className="font-weight-bold">Buat TPS</div>
                    </div>
                    <div className="card-body">
                        <form onSubmit={_simpan}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <label>Dari TPS</label>
                                            <input
                                                onChange={(e) => {
                                                    setDari(e.target.value)
                                                }}
                                                required type="number" className="form-control" />

                                        </td>
                                        <td>{" "}</td>
                                        <td>
                                            <label>Sampai TPS</label>
                                            <input
                                                onChange={(e) => {
                                                    setSampai(e.target.value)
                                                }}
                                                required type="number" className="form-control" />

                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <br />
                            <button className="btn btn-primary">Buat TPS</button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    </>);
}

export default Tps_generator;