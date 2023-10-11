import DataKosong from "@/Componen/DataKosong";
import LoadingTable from "@/Componen/LoadingTable";
import baseUrl from "@/config";
import axios, { AxiosResponse } from "axios";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";


interface Data {
    id_pendukung: string,
    nik: string,
    nama: string,
    jenis_kelamin: string
    usia: string,
    rt_rw: string,
    tps: string,
    kelurahan: string,
    nama_relawan: string,
    id_relawan: string,
}
const Pendukung: React.FC = () => {

    const [dataKosong, setDataKosong] = useState<boolean>(false);
    const [data, setData] = useState<Data[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const _getdata = () => {
        setLoading(true);
        axios.get(baseUrl("pendukung"))
            .then((respon: AxiosResponse<any, any>) => {
                if (respon.data.length == 0) {
                    setDataKosong(true);
                }
                setData(respon.data);
                setLoading(false);


            })
    }
    useEffect(() => {
        _getdata();
    }, [])

    return (<>
        <Head>
            <title>Data Calon Pendukung</title>
        </Head>
        <div className="container-fluid" id="container-wrapper">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Data Pendukung</h1>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link href="/">Dashboard</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Data Pendukung</li>
                </ol>
            </div>
            <div className="card">

                <div className="card-body">
                    <Link className="btn btn-primary" href="/tambah-pendukung.html">Tambah Pendukung</Link>
                    <br /><br />
                    <table className="table table-bordered">
                        <thead style={{ background: "#1783FF", color: "white", fontWeight: "bold" }}>
                            <tr>
                                <td>No</td>
                                <td>Nik</td>
                                <td>Nama</td>
                                <td>Jenis Kelamin</td>
                                <td>Usia</td>
                                <td>Kelurahan</td>
                                <td>RT/RW</td>
                                <td>TPS</td>
                                <td>Relawan</td>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? <LoadingTable baris={8} kolom={9} /> : data?.map((list, index) => (
                                <tr key={`adfad${index}`}>
                                    <td>{index + 1}.</td>
                                    <td>{list.nik}</td>
                                    <td>{list.nama}</td>
                                    <td>{list.jenis_kelamin}</td>
                                    <td>{list.usia}</td>
                                    <td>{list.kelurahan}</td>
                                    <td>{list.rt_rw}</td>
                                    <td>{list.tps}</td>
                                    <td>{list.nama_relawan}</td>
                                </tr>
                            ))}



                        </tbody>
                    </table>
                    {dataKosong && <DataKosong />}
                </div>
            </div>
        </div>
    </>);
}

export default Pendukung;