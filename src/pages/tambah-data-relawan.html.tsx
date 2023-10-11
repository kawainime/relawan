import baseUrl from "@/config";
import axios, { AxiosResponse } from "axios";
import Head from "next/head";
import { NextRouter, useRouter } from "next/router";
import { useState } from "react";
import qs from "query-string";
import Link from "next/link";

const Tambah_data_relawan: React.FC = () => {
    const navigate: NextRouter = useRouter();

    const [nama, setNama] = useState<string>('');
    const [alamat, setAlamat] = useState<string>('');
    const [nohandphone, setNohandphone] = useState<string>('');


    const _simpan = (e: React.FormEvent) => {
        axios.post(baseUrl("relawan"),
            qs.stringify({
                nama: nama,
                alamat: alamat,
                no_handphone: nohandphone,
            }),
        )
            .then((respon: AxiosResponse<any, any>) => {
                if (respon.data.status == "sukses") {
                    window.alert("DATA BERHASIL DI SIMPAN");
                    navigate.push("/data-relawan.html")
                }
            }).catch((error: any) => {
                window.alert("error gays")
            })
        e.preventDefault();
    }

    return (<>
        <Head>
            <title>Tambah Data Relawan</title>
        </Head>
        <div className="container-fluid" id="container-wrapper">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <button onClick={() => {
                    navigate.back();
                }} className="btn btn-danger"><i className="fa fa-chevron-left" />Kembali</button>
                <h1 className="h3 mb-0 text-gray-800">Tambah Data Relawan</h1>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link href="./">Home</Link></li>
                    <li className="breadcrumb-item"><Link href="/data-relawan.html">Data Relawan</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Tambah Data Relawan</li>
                </ol>
            </div>
            <div className="col-lg-5" style={{ margin: "auto" }}>
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={_simpan}>
                            <div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Nama Lengkap</label>
                                    <input required onChange={(e) => {
                                        setNama(e.target.value);
                                    }} type="text" className="form-control" placeholder="Contoh : Alif" />
                                    <small id="emailHelp" className="form-text text-muted">Masukkan nama lengkap calon relawan</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Alamat Lengkap</label>
                                    <textarea required onChange={(e) => {
                                        setAlamat(e.target.value);
                                    }} className="form-control" placeholder="Contoh : Bataraguru" ></textarea>
                                    <small id="emailHelp" className="form-text text-muted">Masukkan alamat lengkap  relawan</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Nomor Handphone</label>
                                    <input required onChange={(e) => {
                                        setNohandphone(e.target.value);
                                    }} type="tel" maxLength={15} className="form-control" placeholder="08234....." />
                                </div>

                                <button type="submit" className="btn btn-primary">Simpan</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div >
    </>);

}

export default Tambah_data_relawan;