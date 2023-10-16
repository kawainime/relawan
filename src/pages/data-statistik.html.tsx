import baseUrl from '@/config';
import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { MDBDataTableV5 } from 'mdbreact';
import { setTimeout } from 'timers';
import LoadingSpinner from '@/Componen/LoadingSpinner';

interface inDataKel {
    kelurahan: string, dukungan: any,
    perempuan: string, laki_laki: string,
    total: any
}
interface inDataStatistik {
    nama: string, jenis_kelamin: string,
    jumlah: number,
}

interface dataColumn {
    label: string,
    field: string,
    sort: string
}
interface dataRows {
    no: number,
    persentase: any,
    nilai_persentase: any,
    nama_relawan: string,
    jumlah_pendukung: any,
}

interface dataTable {
    rows: dataRows[],
    columns: dataColumn[],
}
interface ifLoading {
    loading1?: boolean,
    loading2?: boolean,
}
const Data_statistik: React.FC = () => {
    const [reload, setReload] = useState<number>(0);
    const [data, setData] = useState<inDataKel[]>([]);
    const [dataRelawan, setDataRelawan] = useState<dataTable>();
    const [loading, setLoading] = useState<ifLoading>();


    const [totalDukungan, setTotalDukungan] = useState<number>(0);
    const [jumlahPendukung, setJumlahPendukung] = useState<number>(0);
    const _dataKelurahan = () => {
        setLoading({
            loading1: true,
        });
        axios.get(baseUrl("statistik/kelurahan"))
            .then((respon: AxiosResponse<any, any>) => {
                setData(respon.data);
                setLoading({
                    loading1: false,
                });
            })
    }
    const _getRelawan = () => {
        axios.get(baseUrl("statistik/relawan"))
            .then((respon: any) => {
                setLoading({
                    loading2: true,
                });
                console.log("pertama");
                setTotalDukungan(respon.data.total_pendukung);
                console.log("kedua");

                const datax: any = [];
                respon.data.data.map((list: inDataStatistik, index: number) => {


                    let hasil = 0;
                    try {
                        let persentase = ((list.jumlah / respon.data.total_pendukung) * 100);
                        if (isFinite(persentase)) {
                            hasil = persentase;
                        }
                    } catch (error) {
                        let persentase = ((list.jumlah / respon.data.total_pendukung) * 100);
                        if (isFinite(persentase)) {
                            hasil = persentase;
                        }
                        console.log('gagal');
                    }

                    datax.push({
                        no: index + 1,
                        persentase: <div style={{ width: 40, height: 40 }}>
                            <CircularProgressbar
                                background
                                backgroundPadding={2}
                                styles={buildStyles({
                                    backgroundColor: "#FE3200",
                                    textColor: "#fff",
                                    pathColor: "#fff",
                                    trailColor: "transparent"
                                })}
                                strokeWidth={14}
                                value={hasil} text={`${hasil.toFixed(2)}%`} />
                        </div>,
                        nilai_persentase: hasil.toFixed(2) + " %",
                        nama_relawan: list.nama,
                        jumlah_pendukung: list.jumlah,
                    });
                })
                console.log("ketiga");

                const datac = {
                    columns: [
                        {
                            label: 'No',
                            field: 'no',
                            sort: 'asc',
                        },
                        {
                            label: 'Persentase',
                            field: 'persentase',
                            sort: 'asc',
                        },
                        {
                            label: 'Nilai Peresentase(%)',
                            field: 'nilai_persentase',
                            sort: 'asc',
                        },
                        {
                            label: 'Nama Relawan',
                            field: 'nama_relawan',
                            sort: 'asc',
                        },

                        {
                            label: 'Jumlah Pendukung',
                            field: 'jumlah_pendukung',
                            sort: 'asc',
                        },
                    ],
                    rows: datax,
                };

                setDataRelawan(datac);

                setLoading({
                    loading2: false,
                });


            })
    }
    useEffect(() => {
        _dataKelurahan();

    }, [])
    useEffect(() => {

        _getRelawan();


    }, []);


    return (<>
        <div className="container-fluid" id="container-wrapper">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Data Statistik</h1>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="./">Home</a></li>
                    <li className="breadcrumb-item">Pages</li>
                    <li className="breadcrumb-item active" aria-current="page">Blank Page</li>
                </ol>
            </div>
            <div className='row'>
                <div className='col-lg-12'>
                    <div className="card">
                        <div className="card-header">
                            <h5>Data Pementangan Berdasarkan Kelurahan</h5>
                        </div>
                        <div className="card-body">
                            <table className='table'>
                                <thead>
                                    <tr style={{ fontWeight: "bold" }}>
                                        <td>No</td>
                                        <td></td>
                                        <td>Nama Kelurahan</td><td>Jumlah Laki-laki</td><td>Jumlah Perempuan</td><td>Total</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((list, index) => (
                                        <tr key={`dc${index}`}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <div style={{ width: 50, height: 50 }}>
                                                    <CircularProgressbar
                                                        background
                                                        backgroundPadding={2}
                                                        styles={buildStyles({
                                                            backgroundColor: "#3e98c7",
                                                            textColor: "#fff",
                                                            pathColor: "#fff",
                                                            trailColor: "transparent"
                                                        })}
                                                        strokeWidth={14}
                                                        value={(list.dukungan / list.total) * 100} text={`${((list.dukungan / list.total) * 100).toFixed(0)}%`} />
                                                </div>
                                            </td>
                                            <td>{list.kelurahan}</td><td>{list.laki_laki}</td><td>{list.perempuan}</td><td>{list.dukungan}</td>
                                        </tr>
                                    ))}

                                </tbody>

                            </table>
                            {loading?.loading1 && <>
                                <center>
                                    <LoadingSpinner /><br />
                                    Mengambil data...
                                </center>
                            </>}
                        </div>
                    </div>
                </div>
                <div className='col-lg-12'>
                    <br />
                </div>
                <div className='col-lg-12'>
                    <div className="card">
                        <div className="card-header">
                            <div><b>Peresentase Berdasarkan Relawan</b></div>
                        </div>
                        <div className="card-body">
                            <MDBDataTableV5
                                data={dataRelawan}
                                paging={true} // Optional: Enable pagination
                                searching={true} // Optional: Enable searching
                            />
                            {loading?.loading2 && <>
                                <center>
                                    <LoadingSpinner /><br />
                                    Mengambil data...
                                </center>
                            </>}
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </>);
}

export default Data_statistik;