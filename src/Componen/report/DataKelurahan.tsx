import baseUrl from "@/config";
import axios, { AxiosResponse } from "axios";
import { MDBDataTableV5 } from "mdbreact";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import queryString from "query-string";

interface itData {
    id_kelurahan: string,
    kelurahan: string,
    tps: itTps[],
}
interface itTps {
    id_tps: string,
    tps: string
}
interface itDataPendukung {
    no: number,
    nama: string, jenis_kelamin: string, nik: string,
    rt_rw: string, tps: string, usia: string,
    id_tps?: string
    kelurahan: string,
}

interface column {
    label: string,
    field: string,
    sort: string,
}
interface dataTable {
    columns: column[],
    rows: itDataPendukung[],
}

const DataKelurahan: React.FC = () => {
    const header: column[] = [
        {
            label: "No",
            field: "no",
            sort: "asc",
        },
        {
            label: "Nik",
            field: "nik",
            sort: "asc",
        },
        {
            label: "Nama",
            field: "nama",
            sort: "asc",
        },
        {
            label: "Jenis Kelamin",
            field: "jenis_kelmain",
            sort: "asc",
        },
        {
            label: "RT RW",
            field: "rt_rw",
            sort: "asc",
        },
        {
            label: "Usia",
            field: "usia",
            sort: "asc",
        },
        {
            label: "TPS",
            field: "tps",
            sort: "asc",
        },
        {
            label: "Kelurahan",
            field: "kelurahan",
            sort: "asc",
        },
    ];
    const [data, setData] = useState<itData[]>([]);
    const [tps, setTps] = useState<itTps[]>([]);
    const [loadingKelurahan, setLoadingKelurahan] = useState<boolean>(false);
    const [loadingData, setLoadingData] = useState<boolean>(false);
    const [pilihTps, setPilihTps] = useState<string>();
    const [dataPendukung, setDataPendukung] = useState<dataTable>();
    const [dataPendukungFilter, setDataPendukungFilter] = useState<dataTable>();
    const _getKelurahan = () => {
        setLoadingKelurahan(true)
        axios.get(baseUrl("get-kelurahan"))
            .then((respon: AxiosResponse<any, any>) => {
                setData(respon.data);
                setLoadingKelurahan(false)
            })
    }
    const _handle = (e: React.ChangeEvent<HTMLSelectElement>) => {
        _getData_kelurahan(e.target.value);
        const datax: itData[] = data.filter((row) => row.id_kelurahan == e.target.value);
        const c = datax[0]["tps"];
        setTps(c);

    }




    const _getData_kelurahan = (id_kelurahan: string) => {
        setLoadingData(true)
        axios.get(baseUrl("get-pendukung-by-kelurahan/" + id_kelurahan))
            .then((respon: AxiosResponse<any, any>) => {
                const tmp_data: itDataPendukung[] = [];
                respon.data.pendukung.map((list: itDataPendukung, index: number) => {
                    tmp_data.push({
                        no: index + 1,
                        nik: list.nik,
                        nama: list.nama,
                        jenis_kelamin: list.jenis_kelamin,
                        rt_rw: list.rt_rw,
                        usia: list.usia,
                        tps: list.tps,
                        id_tps: list.id_tps,
                        kelurahan: list.kelurahan,
                    });
                })
                const _dataTable = {
                    columns: header,
                    rows: tmp_data,
                }
                setDataPendukung(_dataTable);
                setDataPendukungFilter(_dataTable);
                setLoadingData(false)

            })
    }
    const [download, setDownload] = useState<boolean>(false);
    const _handleDonwload = () => {
        setDownload(true);
        axios.post(baseUrl("export-table.php"),

            queryString.stringify({
                "data": JSON.stringify(dataPendukungFilter)
            }),

            {
                responseType: "arraybuffer",
            }

        )
            .then((respon: AxiosResponse<any, any>) => {
                const type = respon.headers['content-type']
                const blob = new Blob([respon.data], { type: type })
                const link = document.createElement('a')
                link.href = window.URL.createObjectURL(blob)
                link.download = 'file.xlsx'
                link.click()
                setDownload(false);
            })
    }
    useEffect(() => {
        _getKelurahan();
    }, [])
    return (<>
        <div className="col-lg-6" style={{ textAlign: "center", border: "1px solid #DFDFDF", padding: "10px", margin: "auto" }}>
            Pilih Kelurahan :
            <br />
            <center>
                <select onChange={_handle} style={{ width: "300px" }} className="form-control">
                    <option>{loadingKelurahan ? "Mengambil data ..." : "Semua Kelurahan"}</option>
                    {data.map((list, index) => (
                        <option key={`xadf${index}`} value={list.id_kelurahan}>{list.kelurahan}</option>
                    ))}
                </select>
                <br />
                <hr />

                <div>
                    <button onClick={() => {
                        setPilihTps("");
                        setDataPendukungFilter(dataPendukung);
                    }} style={{ fontSize: "12px", ...pilihTps == null && { background: "#6261FB" } }} className="btn btn-sm btn-danger">SEMUA</button>
                    {tps.map((list, index) => (
                        <button
                            key={`adf${index}`}
                            onClick={() => {
                                setPilihTps(list.id_tps);
                                const tmp_data: itDataPendukung[] = [];
                                dataPendukung?.rows.filter((rows) => rows.id_tps == list.id_tps)
                                    .map((list, index) => {
                                        tmp_data.push({
                                            no: index + 1,
                                            nik: list.nik,
                                            nama: list.nama,
                                            jenis_kelamin: list.jenis_kelamin,
                                            rt_rw: list.rt_rw,
                                            usia: list.usia,
                                            tps: list.tps,
                                            id_tps: list.id_tps,
                                            kelurahan: list.kelurahan,
                                        });
                                    })



                                const _dataTable: dataTable = {
                                    columns: header,
                                    rows: tmp_data,
                                }
                                setDataPendukungFilter(_dataTable);
                            }}
                            style={{ fontSize: "12px", margin: "4px", ...list.id_tps == pilihTps && { background: "#6261FB" } }} className={"btn btn-sm btn-danger"}>TPS {list.tps}</button>
                    ))}
                </div>


            </center >
            <br />
            {download ? "Memproses data..." : <button
                onClick={() => {
                    _handleDonwload();
                }}
            >Donwload </button>}

        </div >
        <hr />
        <div className="col-lg-12">
            {loadingData && <center>
                <LoadingSpinner />
                <br />
                Mengambail data...
            </center>}
            <MDBDataTableV5 data={dataPendukungFilter} />
        </div>
    </>);
}

export default DataKelurahan;