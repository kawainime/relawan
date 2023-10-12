import baseUrl from "@/config";
import axios, { AxiosResponse } from "axios";
import Head from "next/head";
import { NextRouter, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import qs from "query-string";
import Select, { SingleValue } from 'react-select'
import { vl } from "@/interface/value";
interface inTps {
    id_tps: string,
    tps: string
}

interface inKelurahan {
    id_kelurahan: string,
    kelurahan: string,
    tps: inTps[],
}
interface inRelawan {
    id_relawan: string,
    nama: string,
    no_handphone: string,
    alamat: string,
}
const Tambah_relawan: React.FC = () => {
    const navigate: NextRouter = useRouter();
    const [nik, setNik] = useState<string>();
    const [nama, setNama] = useState<string>();
    const [jenis_kelamin, setJenis_kelamin] = useState<string>();
    const [usia, setUsia] = useState<string>();
    const [rtrw, setRtrw] = useState<string>();
    const [kelurahan, setKelurahan] = useState<string>();
    const [tps, setTps] = useState<string>();
    const [dataRelawan, setDataRelawan] = useState<inRelawan[]>();
    const [id_relawan, setId_relawan] = useState<string>();

    const [data_tps, setData_tps] = useState<inTps[]>([]);
    const [dataKelurahan, setDataKelurahan] = useState<inKelurahan[]>();

    const [dsRelawan, setDsRelawan] = useState<vl[]>([]);
    const simpan_data = () => {

    }
    const _getKelurahan = () => {
        axios.get(baseUrl("get-tps"))
            .then((respon: AxiosResponse<any, any>) => {
                setDataKelurahan(respon.data);
            });
    }
    const _getRelawan = () => {
        axios.get(baseUrl("relawan"))
            .then((respon: AxiosResponse<any, any>) => {
                setDataRelawan(respon.data.data);
                const c: any = [];
                respon.data.data.map((list: any, index: any) => {
                    c.push({
                        value: list.id_relawan,
                        label: list.nama
                    })
                });
                setDsRelawan(c);
            })
    }
    const _saveData = (e: React.FormEvent) => {
        e.preventDefault();
        axios.post(baseUrl('pendukung/save-pendukung'),
            qs.stringify({
                nik: nik,
                nama: nama,
                jenis_kelamin: jenis_kelamin,
                usia: usia,
                rtrw: rtrw,
                kelurahan: kelurahan,
                tps: tps,
                id_relawan: id_relawan,
            })
        ).then((respon: AxiosResponse<any, any>) => {
            if (respon.data.status == "data_tersimpan") {
                alert("Data berhasil di simpan")
                navigate.push("/data-calon-pendukung.html");
            }
        })


    }
    const _getTps = (id: string) => {
        axios.get(baseUrl(`list-tps/${id}`))
            .then((respon: AxiosResponse<any, any>) => {
                setData_tps(respon.data);
            }
            )
    }
    useEffect(() => {
        _getKelurahan();
        _getRelawan();


    }, [])

    return (<>
        <Head>
            <title>Tambah Relawan</title>
        </Head>
        <div className="col-lg-6 auto" style={{ margin: "auto" }}>
            {/* Form Basic */}
            <div className="card mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <button onClick={() => {
                        navigate.back();
                    }} className="btn btn-danger"><i className="fa fa-chevron-left" />Kembali</button>
                    <h6 className="m-0 font-weight-bold text-primary">Tambah Pendukung</h6>
                </div>
                <div className="card-body">
                    <form onSubmit={_saveData}>
                        <div className="form-group">
                            <label>NIK</label>
                            <input
                                onChange={(e) => {
                                    setNik(e.target.value);
                                }}
                                required type="number" className="form-control" placeholder="Nomor KTP" />
                            <small id="emailHelp" className="form-text text-muted">Nomor KTP boleh kosong</small>
                        </div>
                        <div className="form-group">
                            <label>Nama Lengkap</label>
                            <input
                                onChange={(e) => {
                                    setNama(e.target.value);
                                }} required type="tel" className="form-control" placeholder="Misal Ivan" />
                            <small id="emailHelp" className="form-text text-muted">Gunakan awalah huruf kapita</small>
                        </div>
                        <div className="form-group">
                            <label>Jenis Kelmain</label>
                            <select
                                onChange={(e) => {
                                    setJenis_kelamin(e.target.value);
                                }}
                                required className="form-control">
                                <option value={""}>Pilh Jenis Kelamin</option>
                                <option value={"Laki-laki"}>Laki-laki</option>
                                <option value={"Perempuan"}>Perempuan</option>
                            </select>
                            <small id="emailHelp" className="form-text text-muted">Gunakan awalah huruf kapita</small>
                        </div>
                        <div className="form-group">
                            <label>Usia</label>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <input
                                                onChange={(e) => {
                                                    setUsia(e.target.value);

                                                }}
                                                style={{ width: "100px" }}
                                                required
                                                type="number" className="form-control" placeholder="" />
                                        </td>
                                        <td> Tahun</td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                        <div className="form-group">
                            <label>RT/RW</label>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <input
                                                onChange={(e) => {
                                                    setRtrw(e.target.value);
                                                }}
                                                style={{ width: "300px" }} type="tel"
                                                required
                                                className="form-control" placeholder="Contoh : 04/05" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                        <div className="form-group">

                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <label>Kelurahan</label>
                                            <select
                                                onChange={(e) => {
                                                    setData_tps([]);
                                                    setTps("");
                                                    setKelurahan(e.target.value);

                                                    _getTps(e.target.value);

                                                }} required className="form-control">
                                                <option value={""}>Pilih Kelurahan</option>
                                                {dataKelurahan?.map((list, index) => (
                                                    <option key={`adfc${index}`} value={list.id_kelurahan}>{list.kelurahan}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td width={10}></td>
                                        <td style={{ opacity: (data_tps?.length == 0) ? 0.4 : 1 }}>
                                            <label>Pilih TPS {tps}</label>
                                            <select
                                                onChange={(e) => {

                                                    setTps(e.target.value);


                                                }} required className="form-control">
                                                <option value={""}>Pilih TPS</option>
                                                {data_tps?.map((list, index) => (
                                                    <option key={`cds${index}`} value={list.id_tps}>{list.tps}</option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                        <div className="form-group">
                            <label>Nama Relawan</label>
                            <Select placeholder="Pilih Relawan" required onChange={(e: SingleValue<vl>) => {
                                setId_relawan(e?.value)
                            }} options={dsRelawan} />
                        </div>
                        <button type="submit" className="btn btn-primary">Simpan</button>
                    </form>
                </div>
            </div >
            {/* Form Sizing */}

        </div >

    </>);
}

export default Tambah_relawan;