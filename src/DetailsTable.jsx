import React from 'react'

export const DetailsTable = ({detail}) => {
  return (
    <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
            <tr>
            <th style={{ padding: "8px", textAlign: "left" }}>Field</th>
            <th style={{ padding: "8px", textAlign: "left" }}>Value</th>
            </tr>
        </thead>
        <tbody>
            {Object.entries(detail).map(([key, value]) => (
            <tr key={key}>
                <td style={{ padding: "8px", textAlign: "left" }}>{key}</td>
                <td style={{ padding: "8px", textAlign: "left" }}>{value.toString()}</td>
            </tr>
            ))}
        </tbody>
    </table>  
 )
}
