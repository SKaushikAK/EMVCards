import React from 'react'
import "./css/SideData.css"


const SideData = ({mainItem}) => {
    
  return (
    <>
    <aside className="p3-sidebar">
        <h2 className="p3-title">Card Details</h2>
        {mainItem.main ? (
          <table className="p3-table">
            <tbody>
              {Object.entries(mainItem.main).map(([key, value]) => (
                <tr key={key}>
                  <td className="p3-table-key">{key}</td>
                  <td className="p3-table-value">{value.toString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="p3-error">No data available.</p>
        )}
      </aside>  
      </>
      )
}

export default SideData