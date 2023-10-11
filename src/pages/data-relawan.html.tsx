import Edit_relawan from "@/Componen/edit-relawan";
import baseUrl from "@/config";
import axios, { AxiosResponse } from "axios";
import Head from "next/head";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";

interface DataRelawan {
    id_relawan: string,
    nama: string,
    alamat: string,
    no_handphone: string,
}
const Data_relawan: React.FC = () => {
    const navigator: NextRouter = useRouter();
    const [edit, setEdit] = useState<any>();
    const [reload, setReload] = useState<number>(0);
    const [data, setData] = useState<DataRelawan[]>();
    const _getData = () => {
        axios.get(baseUrl('relawan'))
            .then((respon) => {
                setData(respon.data.data);
            })
    }
    useEffect(() => {
        _getData();
    }, [reload])
    const hapus = (id: string) => {
        const confirm = window.confirm("Apakah anda ingin menghapus data ini?");
        if (confirm) {
            axios.delete(baseUrl("relawan/" + id)).
                then((respon: AxiosResponse<any, any>) => {
                    if (respon.data.status == "sukses") {
                        setReload(reload + 1);
                    }
                });
        }
    }
    return (<>
        <Head>
            <title>Data Relawan</title>
        </Head>
        <div className="container-fluid" id="container-wrapper">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">

                <h1 className="h3 mb-0 text-gray-800">Data Relawan</h1>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link href="/">Dashboard</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Data Relawan</li>
                </ol>
            </div>
            <div className="card">
                <div className="card-body">
                    <button onClick={() => {
                        navigator.push("/tambah-data-relawan.html");
                    }} className="btn btn-danger">Tambah Data</button>
                    <table className="table">
                        <thead>
                            <tr className="font-weight-bold">
                                <td>No</td>
                                <td>Nama Lengkap</td>
                                <td>Nomor Handphone</td>
                                <td>Alamat</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((list, index) => (
                                edit == list.id_relawan ? <Edit_relawan
                                    key={`sd${index}`}
                                    reload={{ reload, setReload, setEdit }}
                                    id_relawan={list.id_relawan}
                                    nama={list.nama}
                                    alamat={list.alamat}
                                    no_handphone={list.no_handphone}
                                /> : <tr key={`ind${index}`}>
                                    <td>{index + 1}</td>
                                    <td>{list.nama}</td>
                                    <td>{list.no_handphone}</td>
                                    <td>{list.alamat}</td>
                                    <td style={{ textAlign: "right" }}>
                                        <button
                                            onClick={() => {
                                                setEdit(list.id_relawan);
                                            }}
                                            className="btn btn-sm btn-warning">Edit</button>{" "}
                                        <button onClick={() => {
                                            hapus(list.id_relawan);
                                        }} className="btn btn-sm btn-danger">Hapus</button>{" "}
                                        <button className="btn btn-sm btn-primary">Lihat Data Pendukung</button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                    {data?.length == 0 && <center>
                        <br />
                        <i style={{ fontSize: "24px" }} className="fa fa-info" />
                        <div>Oppss</div>
                        <div>Data relawan masih kosong</div>
                    </center>}
                </div>
            </div>
        </div>
    </>);
}
export default Data_relawan;
