import axios from "axios";
import React from "react";
import { useLocation } from "react-router-dom";

const GenerateP3Page = () => {
  const location = useLocation();
  const { mainItem, details } = location.state || {};
  console.log("Main",mainItem,"details", details);
  
  React.useEffect(() => {
    const request = axios.post("/generateP3", mainItem);
  })
  
  if (!mainItem) {
    return <div>No data available for P3 generation.</div>;
  }
  

  return (
    <div>
      <h1>Generate P3</h1>
      <h2>Main Details</h2>
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>    
          <tr>
            <th style={{ padding: "8px", textAlign: "left" }}>Field</th>
            <th style={{ padding: "8px", textAlign: "left" }}>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(mainItem.main).map(([key, value]) => (
            <tr key={key}>
              <td style={{ padding: "8px", textAlign: "left" }}>{key}</td>
              <td style={{ padding: "8px", textAlign: "left" }}>{value.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GenerateP3Page;
