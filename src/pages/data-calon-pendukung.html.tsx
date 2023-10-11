import Head from "next/head";
import Link from "next/link";
import React from "react";


interface Data {
    id_pendukung: string,
    nama: string,
    jenis_kelamin: string
    usia: string,
    rt_rw: string,
    kelurahan: string,
    id_relawan: string,
}
const Pendukung: React.FC = () => {

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
                        <thead>
                            <tr>
                                <td>No.</td>
                                <td>NIK</td>
                                <td>Nama Lengkap</td>
                                <td>Jenis Kelamin</td>
                                <td>Usia</td>
                                <td>Kelurahan</td>
                                <td>RT/RW</td>
                                <td>TPS</td>
                                <td>RELAWAN</td>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </>);
}

export default Pendukung;