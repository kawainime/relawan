import baseUrl from "@/config";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import qs from "query-string";

interface dataEdit {
    id_relawan: string,
    nama: string,
    alamat: string,
    no_handphone: string,
    reload: any,

}
const Edit_relawan: React.FC<dataEdit> = (props) => {
    const [nama, setNama] = useState<string>(props.nama)
    const [alamat, setAlamat] = useState<string>(props.alamat)
    const [no_handphone, setNo_handphone] = useState<string>(props.no_handphone)

    const _handlerEdit = () => {
        let conf = window.confirm('Apakah anda ingin mengubah data ini?');
        if (conf) {
            axios.put(baseUrl("relawan/update"),
                qs.stringify({
                    id_relawan: props.id_relawan,
                    nama: nama,
                    alamat: alamat,
                    no_handphone: no_handphone,
                })
            ).then((respon: AxiosResponse<any, any>) => {
                if (respon.data.status == "sukses") {
                    alert("Data berhasil di update");
                    props.reload.setReload(props.reload.reload + 1);
                    props.reload.setEdit("");
                }
            })
        }
    }
    return (<>
        <tr>
            <td>#</td>
            <td>
                <input onChange={(e) => {
                    setNama(e.target.value);
                }} value={nama} placeholder="Masukkan nama..." type="text" className="form-control" />
            </td>
            <td>
                <input
                    onChange={(e) => {
                        setNo_handphone(e.target.value);
                    }}
                    value={no_handphone} placeholder="0823" type="text" className="form-control" />
            </td>
            <td>
                <textarea
                    onChange={(e) => {
                        setAlamat(e.target.value);
                    }}
                    value={alamat} placeholder="Masukkan alamat" className="form-control"></textarea>
            </td>
            <td style={{ textAlign: "right" }}>
                <button
                    onClick={() => {
                        _handlerEdit()
                    }}
                    className="btn btn-success">Simpan</button>{" "}
                <button onClick={() => {
                    props.reload.setEdit("");
                }} className="btn btn-danger">Batal</button>
            </td>
        </tr>
    </>);
}

export default Edit_relawan;