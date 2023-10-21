import DataKosong from "@/Componen/DataKosong";
import EditPendukung from "@/Componen/EditPendukung";
import LoadingTable from "@/Componen/LoadingTable";
import baseUrl from "@/config";
import { useMyContext } from "@/interface/myContext";
import axios, { AxiosResponse } from "axios";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";


interface Data {
    id_pendukung: string,
    nik: string,
    nama: string,
    jenis_kelamin: string
    usia: string,
    rt_rw: string,
    tps: string,
    id_tps: string,
    id_kelurahan: string,
    kelurahan: string,
    nama_relawan: string,
    id_relawan: string,
}
export interface inRelawan {
    id_relawan: string,
    nama: string,
}
interface inKelurahan {
    id_kelurahan: string, kelurahan: string, pendukung: string,
}
interface inTps {
    id_tps: string, tps: string,
}
const Pendukung: React.FC = () => {
    const { updateMenu } = useMyContext();
    const input_cari = useRef<any>(null);

    const [dataFilter, setDataFilter] = useState<Data[]>();
    const [cariTps, setCariTps] = useState<string>('');
    const [dataKosong, setDataKosong] = useState<boolean>(false);
    const [data, setData] = useState<Data[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [edit, setEdit] = useState<string>();
    const [dataKelurahan, setDataKelurahan] = useState<inKelurahan[]>([]);
    const [reload, setReload] = useState<number>(0);

    const [dataRelawan, setDataRelawan] = useState<inRelawan[]>([]);
    const [tps, setTps] = useState<inTps[]>([]);
    const [pilihTps, setPilihTps] = useState<string>();
    const [cari, setCari] = useState<string>('');
    const [jLaki_laki, setJLaki_laki] = useState<string>('');
    const [jperempuan, setJPerempuan] = useState<string>('');
    const _batal = () => {
        setEdit("");
    }
    const _lihatByKelurahan = (id: string) => {
        setJLaki_laki('')
        setCari('');
        setCariTps('');
        setJPerempuan('')
        if (id == "") {
            setTps([]);
            setReload(reload + 1)
        }
        else {
            setDataKosong(false);
            setLoading(true);
            axios.get(baseUrl("get-pendukung-by-kelurahan/" + id))
                .then((respon: AxiosResponse<any, any>) => {
                    if (respon.data.length == 0) {
                        setDataKosong(true);
                    }
                    setData(respon.data.pendukung);
                    setDataFilter(respon.data.pendukung);
                    setTps(respon.data.tps);
                    setLoading(false);


                })
        }

    }
    const _handleSearch = (search: string) => {
        const filtered = data?.filter((row) =>
            row.nama.toLocaleLowerCase().includes(search.toLowerCase())

        );
        setDataFilter(filtered);
    }

    const _getdata = () => {
        setCari('');
        setCariTps('');
        setLoading(true);
        setJLaki_laki('')
        setJPerempuan('')
        axios.get(baseUrl("pendukung"))
            .then((respon: AxiosResponse<any, any>) => {
                if (respon.data.length == 0) {
                    setDataKosong(true);
                }
                setData(respon.data.pendukung);
                setDataFilter(respon.data.pendukung);
                setJLaki_laki(respon.data.laki_laki);
                setJPerempuan(respon.data.perempuan);
                setLoading(false);


            })
    }
    const _hapus = (id_pendukung: string) => {
        const confim = window.confirm("Apakah anda ingin hapus data ini?");
        if (confim) {
            axios.delete(baseUrl('delete-pendukung/' + id_pendukung))
                .then((respon: AxiosResponse<any, any>) => {
                    if (respon.data.status == "data_deleted") {
                        alert("Data berhasil di hapus");
                        setReload(reload + 5);
                    }
                })
        }
    }
    const _getKelurahan = () => {
        axios.get(baseUrl("get-kelurahan"))
            .then((respon: AxiosResponse<any, any>) => {
                setDataKelurahan(respon.data);
            })
    }
    const _getRelawan = () => {
        axios.get(baseUrl('get-relawan-all'))
            .then((respon: AxiosResponse<any, any>) => {
                setDataRelawan(respon.data);
            })
    }

    const _reload = () => {
        setReload(reload + 1);
    }
    useEffect(() => {
        _getdata();
    }, [reload])
    useEffect(() => {
        updateMenu("pendukung")
        _getKelurahan();
        _getRelawan();
    }, [])

    return (<>
        <Head>
            <title>{cariTps}Data Calon Pendukung</title>
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
                <div className="card-header">
                    <table width={"100%"}>
                        <tbody>
                            <tr>
                                <td>
                                    <Link className="btn btn-primary" href="/tambah-pendukung.html">Tambah Pendukung</Link>
                                </td>
                                <td>
                                    <input
                                        ref={input_cari}
                                        onChange={(e) => {
                                            _handleSearch(e.target.value);
                                        }} placeholder="Cari nama, relawan, kelurahan , tps" type="search" className="form-control" />
                                </td>
                                <td> &nbsp;</td>
                                <td>
                                    <select onChange={(e) => {
                                        _lihatByKelurahan(e.target.value);
                                    }} className="form-control">
                                        <option value="">By Kelurahan</option>
                                        {dataKelurahan.map((list, index) => (
                                            <option key={`dafa${index}`} value={list.id_kelurahan}>{list.kelurahan} ({list.pendukung})</option>
                                        ))}
                                    </select>

                                </td>

                                <td style={{ textAlign: "right" }}>Jumlah Data : {data?.length} | Jumlah Laki-laki :{jLaki_laki} | Jumlah Permepuan :{jperempuan}</td>

                            </tr>
                        </tbody>
                    </table>
                    Pilih Tps :
                    {tps.map((list, index) => (
                        <button key={`adf${index}`} onClick={() => {
                            setPilihTps(list.id_tps)
                            setCariTps(list.tps)
                            const datax = data?.filter((row) =>
                                row.tps == list.tps
                            )
                            setDataFilter(datax);
                        }} style={{ margin: "4px", border: "0px solid #000", ...pilihTps == list.id_tps ? { "background": "#7EF498", } : {} }}>TPS {list.tps}</button>
                    ))}
                </div>
                <div className="card-body">

                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead style={{ background: "#1783FF", color: "white", fontWeight: "bold" }}>
                                <tr>
                                    <td>No</td>
                                    <td>Nik</td>
                                    <td>Nama</td>
                                    <td>Jenis Kelamin</td>
                                    <td width={"130px"}>Usia</td>
                                    <td>Kelurahan</td>
                                    <td width={"130px"}>RT/RW</td>
                                    <td>TPS</td>
                                    <td>Relawan</td>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? <LoadingTable baris={8} kolom={9} /> :

                                    dataFilter?.map((list, index) => (
                                        edit == list.id_pendukung ? <EditPendukung
                                            key={index}
                                            id_pendukung={list.id_pendukung}
                                            reload={_reload}
                                            batal={_batal}
                                            id_tps={list.id_tps}
                                            data_kelurahan={dataKelurahan}
                                            nama={list.nama}
                                            nama_relawan={list.nama_relawan}
                                            nik={list.nik} jenis_kelamin={list.jenis_kelamin}
                                            usia={list.usia} rt_rw={list.rt_rw} id_kelurahan={list.id_kelurahan}
                                            id_relawan={list.id_relawan} tps={list.tps} kelurahan={list.kelurahan}
                                            data_relawan={dataRelawan} /> : <>
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
                                            <tr>
                                                <td colSpan={9} style={{ textAlign: "center" }}>
                                                    Opsi Menu :
                                                    <button onClick={() => {
                                                        _hapus(list.id_pendukung)
                                                    }} className="btn btn-danger"><i className="fa fa-trash" /> Hapus</button>
                                                    {" "}
                                                    <button onClick={() => {
                                                        setEdit(list.id_pendukung);
                                                    }} className="btn btn-warning"><i className="fa fa-edit" /> Edit</button>
                                                </td>
                                            </tr>
                                        </>
                                    ))}
                            </tbody>
                        </table>
                    </div>

                    {dataKosong && <DataKosong />}
                </div>
            </div>
        </div>
    </>);
}

export default Pendukung;