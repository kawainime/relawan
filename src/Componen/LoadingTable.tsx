import React from "react";

interface dataProps {
    baris: number,
    kolom: number,

}
const LoadingTable: React.FC<dataProps> = (props) => {
    return (
        <>
            {[...Array(props.baris)].map((index) => (
                <tr key={`dfaf${index}`}>
                    {[...Array(props.kolom)].map((indexx) => (
                        <td key={`ad${index}`}>
                            <div style={{ width: "100%", height: "10px", background: "#DDE8EF" }}></div>
                        </td>
                    ))}
                </tr >
            ))}
        </>


    );
}

export default LoadingTable;