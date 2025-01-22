import React from 'react'

const Options = ({detail}) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
    {Object.entries(detail[1]).map(([key, value]) => (
        <div key={key} style={{ display: "flex", alignItems: "center" }}>
            <input
            type="checkbox"
            checked={value}
            readOnly
            style={{ marginRight: "5px" }}
            />
            <label>{key}</label>
        </div>
        ))}
    </div>
  )
}

export default Options
