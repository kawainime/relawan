import baseUrl from '@/config';
import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface inDataKel {
    kelurahan: string, dukungan: any,
    perempuan: string, laki_laki: string,
    total: any
}
const Data_statistik: React.FC = () => {
    const [data, setData] = useState<inDataKel[]>([]);
    const _dataKelurahan = () => {
        axios.get(baseUrl("statistik/kelurahan"))
            .then((respon: AxiosResponse<any, any>) => {
                setData(respon.data);
            })
    }
    useEffect(() => {
        _dataKelurahan();
    }, [])
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
                <div className='col-lg-7'>
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
                        </div>
                    </div>
                </div>
                <div className='col-lg-5'>
                    <div className="card">
                        <div className="card-body">
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <td>No</td><td>Peresentase</td><td>Nama Relawan</td><td>Jumlah Pendukung</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>No</td><td>Peresentase</td><td>Nama Relawan</td><td>Jumlah Pendukung</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </>);
}

export default Data_statistik;