import Semua_data from "@/Componen/report/SemuaData";
import Link from "next/link";
import React from "react";
import { Tab, Tabs } from "react-bootstrap";

const Data_report: React.FC = () => {

    return (<>
        <div className="container-fluid" id="container-wrapper">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Data Report</h1>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link href="/">Dashboard</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Data Re</li>
                </ol>
            </div>
            <div className="card">
                <div className="card-body">
                    <Tabs
                        defaultActiveKey="semuax"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    >
                        <Tab eventKey="semuax" title="Semua Pendukung">
                            <Semua_data />
                        </Tab>
                        <Tab eventKey="semuas" title="Data Relawan">
                            df
                        </Tab>
                        <Tab eventKey="semuaf" title="Data Pendukung Per Kelurahan">
                            fdf
                        </Tab>
                        <Tab eventKey="semuaad" title="Data Pendukung Per Kelurahan">
                            Data Pendukung Per Relawan
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    </>);
}

export default Data_report;