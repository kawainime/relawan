import baseUrl from "@/config";
import { inRelawan } from "@/pages/data-calon-pendukung.html";
import axios, { AxiosResponse } from "axios";
import { ValueOf } from "next/dist/shared/lib/constants";
import queryString from "query-string";
import React, { useEffect, useState } from "react";

interface inDataKelurahan {
    id_kelurahan: string,
    kelurahan: string
}
interface inDataTps {
    id_tps: string, tps: string,
}
interface inDataProps {
    id_pendukung: string,
    nama: string, nik: string, jenis_kelamin: string,
    usia: string, rt_rw: string, kelurahan: string,
    id_relawan: string, id_tps: string, tps: string, id_kelurahan: string,
    batal: any,
    reload: any

    data_kelurahan: inDataKelurahan[],
    data_relawan: inRelawan[],

}
const EditPendukung: React.FC<inDataProps> = (props) => {
    const [nama, setNama] = useState<string>(props.nama);
    const [nik, setNik] = useState<string>(props.nik);
    const [id_tps, setId_tps] = useState<string>(props.id_tps);
    const [jenis_kelamin, setJenis_kelamin] = useState<string>(props.jenis_kelamin);
    const [usia, setUsia] = useState<string>(props.usia);
    const [rt_rw, setRt_rw] = useState<string>(props.rt_rw);
    const [kelurahan, setKelurahan] = useState<string>(props.id_kelurahan);
    const [id_relawan, setId_relawan] = useState<string>(props.id_relawan);
    const [tps, setTps] = useState<string>(props.tps);
    const [dataKelurahan, setDataKelurahan] = useState<inDataKelurahan[]>(props.data_kelurahan);
    const [isProses, setIsProses] = useState<boolean>(false);

    const [dataTps, setDataTps] = useState<inDataTps[]>([]);
    useEffect(() => {
        _getTps();
    }, [])
    const _getTps = () => {
        axios.get(baseUrl("list-tps/" + props.id_kelurahan))
            .then((respon) => {
                setDataTps(respon.data);
            })
    }


    const _update = () => {

        setIsProses(true);
        axios.put(baseUrl('update-pendukung/' + props.id_pendukung), queryString.stringify({
            nama: nama, nik: nik, jenis_kelamin: jenis_kelamin, usia: usia,
            rt_rw: rt_rw, kelurahan: kelurahan,
            id_relawan: id_relawan, id_tps: id_tps,
        })).then((respon: AxiosResponse<any, any>) => {
            if (respon.data.status == "data_terupdate") {
                props.batal();
                props.reload();
                alert("UPDATE SUKSES");
            }
        });
    }
    return (<>
        <tr>
            <td>**</td>
            <td>
                <input onChange={(e) => {
                    setNik(e.target.value);
                }} value={nik} type="text" autoFocus placeholder="NIK...." className="form-control" />
            </td>
            <td>
                <input
                    onChange={(e) => {
                        setNama(e.target.value);
                    }}
                    type="text" value={nama} placeholder="Masukkan nama...." className="form-control" />
            </td>
            <td>
                <select
                    onChange={(e) => {
                        setJenis_kelamin(e.target.value);
                    }}
                    value={jenis_kelamin} className="form-control">
                    <option value={""}>Pilih Jenis Kelmain</option>
                    <option value={"Laki-laki"}>Laki-laki</option>
                    <option value={"Perempuan"}>Perempuan</option>
                </select>
            </td>
            <td>
                <input
                    onChange={(e) => {
                        setUsia(e.target.value);
                    }}
                    value={usia} type="number" placeholder="Masukkan usia" className="form-control" />
            </td>
            <td>
                <select
                    onChange={(e) => {
                        setKelurahan(e.target.value);
                    }}
                    value={kelurahan} defaultValue={kelurahan} className="form-control">
                    <option value={""}>Pilih Kelurahan</option>
                    {dataKelurahan.map((list, index) => (
                        <option key={index} value={list.id_kelurahan}>{list.kelurahan}</option>
                    ))}
                </select>
            </td>
            <td>
                <input type="text" onChange={(e) => {
                    setRt_rw(e.target.value)
                }} value={rt_rw} className="form-control" placeholder="04/05" />
            </td>

            <td>

                <select
                    onChange={(e) => {
                        setId_tps(e.target.value);
                    }}
                    value={id_tps} className="form-control">
                    <option value={""}>TPS</option>
                    {dataTps.map((list, index) => (
                        <option key={`dfa${index}`} value={list.id_tps}>{list.tps}</option>
                    ))}

                </select>
            </td>
            <td>
                <select onChange={(e) => {
                    setId_relawan(e.target.value)
                }} value={id_relawan} className="form-control">
                    <option value={""}>RELAWAN</option>
                    {props.data_relawan.map((list, index) => (
                        <option key={`3r${index}`} value={list.id_relawan}>{list.nama}</option>
                    ))}

                </select>
            </td>
        </tr>
        <tr>
            <td colSpan={9} style={{ textAlign: "center" }}>
                {isProses ? "Mengupdate.... " : <button className="btn btn-success" onClick={() => {
                    _update()
                }}>Update Data</button>}
                {" "}
                <button className="btn btn-danger" onClick={() => {
                    props.batal()
                }}>Batal</button>
            </td>
        </tr>
    </>);
}

export default EditPendukung;