import LoadingTable from "@/Componen/LoadingTable";
import baseUrl from "@/config";
import axios, { AxiosResponse } from "axios";
import Head from "next/head";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";

interface data_tps {
    id_tps: string,
    tps: string,
}
interface data {
    id_kelurahan: string,
    kelurahan: string,
    tps: data_tps[]
}
const Data_tps: React.FC = () => {
    let navigator: NextRouter = useRouter();
    const [data, setData] = useState<data[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const _load = () => {
        setLoading(true);
        axios.get(baseUrl("get-tps"))
            .then((respon: AxiosResponse<any, any>) => {
                setData(respon.data);
                setLoading(false);
            })
    }
    useEffect(() => {
        _load();
    }, [])
    return (
        <>
            <Head>
                <title>Data TPS</title>
            </Head>
            <div className="container-fluid" id="container-wrapper">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Data TPS</h1>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link href="/">Dasboard</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Data TPS</li>
                    </ol>
                </div>
                <div className="card">
                    <div className="card-header">
                        <div style={{ fontWeight: "bold", fontSize: "20px" }}>Data Kecamatan</div>
                    </div>
                    <div className="card-body">
                        <table className="table">
                            <thead>
                                <tr style={{ color: "#1783FF" }}>
                                    <td>No</td><td>Nama Kelurahan</td><td></td>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? <LoadingTable baris={10} kolom={3} /> : data?.map((list, index) => (
                                    <tr key={`dadf${index}`}>
                                        <td>{index + 1}</td><td>{list.kelurahan}
                                            <div>
                                                {list.tps.map((_list, i) => (
                                                    <button key={`adf${i}`} style={{ margin: "4px " }} className="btn btn-sm btn-warning">TPS {_list.tps}</button>
                                                ))}
                                            </div>

                                        </td>
                                        <td style={{ textAlign: "right" }}>
                                            <button
                                                onClick={() => {
                                                    navigator.push("/tps-generator.html?id_kelurahan=" + list.id_kelurahan)
                                                }}
                                                className="btn btn-success">TPS Generator</button>
                                            {" "}

                                        </td>
                                    </tr>
                                ))}

                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Data_tps;