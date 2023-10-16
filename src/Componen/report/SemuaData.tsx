import baseUrl from "@/config";
import axios, { Axios, AxiosResponse } from "axios";
import { MDBDataTableV5 } from "mdbreact";
import React, { useEffect, useState } from "react";
import LoadingSpinner from '../LoadingSpinner';
import styles from '@/styles/Home.module.css';


interface columnTable {
    label: string,
    field: string,
    sort: string
}
interface rowTable {
    no: number, nama: string, nik: string,
    jenis_kelamin: "Laki-laki" | "Perempuan",
    usia: number, rt_rw: string, kelurahan: string, nama_relawan: string, tps: string,
}
interface dataTable {
    columns: columnTable[],
    rows: rowTable[],
}
const Semua_data: React.FC = () => {
    const [data, setData] = useState<dataTable>();
    const [loading, setLoading] = useState<boolean>(false);
    const _getData = () => {
        setLoading(true);
        axios.get(baseUrl('pendukung'))
            .then((respon: AxiosResponse<any, any>) => {
                setLoading(false);
                const temp_data: any = [];
                console.log(respon.data.pendukung);
                respon.data.pendukung.map((list: rowTable, index: any) => {
                    temp_data.push({
                        no: (index + 1),
                        nama: list.nama,
                        nik: list.nik,
                        jenis_kelamin: list.jenis_kelamin,
                        usia: list.usia,
                        rt_rw: list.rt_rw,
                        kelurahan: list.kelurahan,
                        nama_relawan: list.nama_relawan,
                        tps: list.tps,
                    });
                })
                const data = {
                    columns: [
                        {
                            label: "No",
                            field: "no",
                            sort: "asc"
                        },
                        {
                            label: "Nama",
                            field: "nama",
                            sort: "asc"
                        },
                        {
                            label: "NIK",
                            field: "nik",
                            sort: "asc"
                        },
                        {
                            label: "Jenis Kelamin",
                            field: "jenis_kelamin",
                            sort: "asc"
                        },
                        {
                            label: "Usia",
                            field: "usia",
                            sort: "asc"
                        },
                        {
                            label: "RT/RW",
                            field: "rt_rw",
                            sort: "asc"
                        },
                        {
                            label: "Kelurahan",
                            field: "kelurahan",
                            sort: "asc"
                        },
                        {
                            label: "Relawan",
                            field: "nama_relawan",
                            sort: "asc"
                        },
                        {
                            label: "TPS",
                            field: "tps",
                            sort: "asc"
                        },
                    ],
                    rows: temp_data,
                }
                setData(data);
            })
    }
    useEffect(() => {
        _getData();
    }, [])
    return (<>
        <h4>Data Semua Pendukung</h4>
        <MDBDataTableV5
            data={data}
            paging={true} // Optional: Enable pagination
            searching={true} // Optional: Enable searching
        />
        {loading && <div style={{ textAlign: "center" }}>
            <LoadingSpinner />
            <br />
            Mengmbail data...</div>}
    </>);
}

export default Semua_data;