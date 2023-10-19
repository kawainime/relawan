import baseUrl from "@/config";
import axios, { Axios, AxiosResponse } from "axios";
import { MDBDataTable } from "mdbreact";
import React, { FormEvent, useEffect, useState } from "react";
import Select from 'react-select'
import { SingleValue } from 'react-select';
import LoadingSpinner from "../LoadingSpinner";
interface itData {
    no: number,
    id_relawan: string,
    nama: string,
    alamat: string,
    no_handphone: string,
}
interface iPendukung {
    no: number,
    id_pendukung: string,
    nik: string,
    nama: string,
    jenis_kelamin: string,
    usia: string,
    rt_rw: string,
    kelurahan: string,
    tps: string,
}
interface column {
    label: string,
    field: string,
    sort: string,
}
interface dataTable {
    rows: iPendukung[],
    columns: column[],
}
const Data_pendukungRelawan: React.FC = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<{ value: string, label: string }[]>([]);
    const [dataTable, setDataTable] = useState<dataTable>();
    const _getData = () => {
        axios.get(baseUrl('report/get-relawan'))
            .then((respon: AxiosResponse<any, any>) => {
                const tmp_data: { value: string, label: string }[] = [];
                respon.data.map((list: itData, index: number) => {
                    tmp_data.push({
                        label: list.nama,
                        value: list.id_relawan
                    });
                })
                setData(tmp_data);
            })
    }
    const _handle = (id: string) => {

        setLoading(true)
        axios.get(baseUrl('report/get-pendukung-relawan/' + id))
            .then((respon: AxiosResponse<any, any>) => {
                const tmp_data: any = [];
                respon.data.data.map((list: iPendukung, index: number) => {
                    tmp_data.push({
                        no: index + 1,
                        nama: list.nama,
                        nik: list.nik,
                        jenis_kelamin: list.jenis_kelamin,
                        usia: list.usia,
                        rt_rw: list.rt_rw,
                        kelurahan: list.kelurahan,
                        tps: list.tps,
                    });
                })


                const data_table: dataTable = {
                    columns: [
                        {
                            label: "No",
                            field: "no",
                            sort: "asc",
                        },
                        {
                            label: "Nama",
                            field: "nama",
                            sort: "asc",
                        },
                        {
                            label: "NIK",
                            field: "nik",
                            sort: "asc",
                        },
                        {
                            label: "Jenis Kelamin",
                            field: "jenis_kelmain",
                            sort: "asc",
                        },
                        {
                            label: "Usia",
                            field: "usia",
                            sort: "asc",
                        },
                        {
                            label: "RT/RW",
                            field: "rt_rw",
                            sort: "asc",
                        },
                        {
                            label: "Kelurahan",
                            field: "kelurahan",
                            sort: "asc",
                        },
                        {
                            label: "TPS",
                            field: "tps",
                            sort: "asc",
                        },
                    ],
                    rows: tmp_data,
                };
                setDataTable(data_table);
                setLoading(false)
            })
    }

    useEffect(() => {
        _getData();
    }, [])
    return (<>
        <div className="col-lg-12">
            <table>
                <tbody>
                    <tr>
                        <td>
                            Pilh Relawan
                        </td>
                        <td width={"20px"}></td>
                        <td width={"300px"}>
                            <Select onChange={(e: any) => {
                                _handle(e?.value);
                            }} placeholder={"Pilih Data"} options={data} />
                        </td>
                    </tr>
                </tbody>
            </table>
            {loading && <>
                <center>
                    <LoadingSpinner />
                    <br />
                    Mengambil data...
                </center>
            </>}
            <div style={{ opacity: loading ? .3 : 1 }}>

                <MDBDataTable data={dataTable} />
            </div>

            <div>

            </div>
        </div>
    </>);
}

export default Data_pendukungRelawan;