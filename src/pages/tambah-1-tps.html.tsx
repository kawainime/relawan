import React, { useState } from "react";
import Link from 'next/link';
import { GetServerSideProps, GetServerSidePropsContext, } from 'next';
import axios, { AxiosResponse } from "axios";
import baseUrl from "@/config";
import qs from "query-string"
import { useRouter } from "next/router";
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const query = context.query;
    return {
        props: {
            url_data: query
        }
    }
}
interface inDataProps {
    url_data: any,
}
const Tambah_1_tps: React.FC<inDataProps> = (props) => {
    const navigator = useRouter();
    const [tps, setTps] = useState<string>();
    const _simpan = (e: React.FormEvent) => {
        axios.post(baseUrl("save-single-tps/" + props.url_data.id_kelurahan),
            qs.stringify({
                tps: tps
            })
        ).then((respon: AxiosResponse<any, any>) => {
            if (respon.data.status == "sukses") {
                alert("Data berhasil di simpan");
                navigator.push("/data-tps.html");
            }
        })
        e.preventDefault();
    }
    return (<>


        <div className="container-fluid" id="container-wrapper">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <Link
                    href="/data-tps.html"
                    className="btn btn-danger"><i className="fa fa-chevron-left" /> Kembali</Link>
                <h1 className="h3 mb-0 text-gray-800">Tambah 1 TPS</h1>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link href="/data-tps.html">tps</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Tambah 1 TPS</li>
                </ol>
            </div>
            <div className="col-lg-4" style={{ margin: "auto" }}>
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={_simpan}>
                            <div>
                                <label>Nama TPS</label>
                                <input
                                    required
                                    onChange={(e) => {
                                        setTps(e.target.value);
                                    }}
                                    type="text" className="form-control" />
                                <button className="btn btn-danger">Simpan</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>


        </div>
    </>);
}

export default Tambah_1_tps;