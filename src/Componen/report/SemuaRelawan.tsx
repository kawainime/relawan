import baseUrl from "@/config";
import axios, { AxiosResponse } from "axios";
import { MDBDataTable, MDBDataTableV5 } from "mdbreact";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";

interface irData {
    nama: string,
    no_handphone: string,
    alamat: string,
    jumlah_pendukung: number,
}
interface columns {
    label: string,
    field: string,
    sort: string,
}
interface rows {
    no: number,
    nama: string,
    alamat: string,
    jumlah_pendukung: number
}
interface dataTable {
    rows: rows[],
    columns: columns[],
}
const Semua_relawan: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<dataTable>();
    const _getData = () => {
        setLoading(true);
        axios.get(baseUrl("report/get-relawan"))
            .then((respon: AxiosResponse<any, any>) => {
                const datax: rows[] = [];
                respon.data.map((list: any, index: number) => {
                    datax.push({
                        no: index + 1,
                        nama: list.nama,
                        alamat: list.alamat,
                        jumlah_pendukung: list.jumlah_pendukung,
                    })

                })
                const format_data: dataTable = {
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
                            label: "No Handphone",
                            field: "no_handphone",
                            sort: "asc",
                        },
                        {
                            label: "Alamat",
                            field: "alamat",
                            sort: "asc",
                        },
                        {
                            label: "Jumlah Pendukung",
                            field: "jumlah_pendukung",
                            sort: "asc",
                        },
                    ],
                    rows: datax
                }

                setData(format_data);
                setLoading(false);

            })
    }
    useEffect(() => {
        _getData();
    }, [])
    return (<>
        <h4>Data Semua Relawan</h4>
        <MDBDataTableV5 paging={true}
            data={data}
            btn={true}
            striped={true}
            searching={true} searchingLabel="Cari" />
        {loading ??
            <div>
                <center>
                    <LoadingSpinner /><br />
                    Mengambil data...
                </center>
            </div>}
    </>);
}

export default Semua_relawan;