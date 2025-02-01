import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./css/GenerateP3.css"

const GenerateP3Page = () => {
  const location = useLocation();
  const { mainItem, details } = location.state || {};
  console.log("Main",mainItem,"details", details);
  
  const [hex_data, setData] = useState("")

  // React.useEffect( () => {
    // const  fetchData = async () => {
    //   try{
    //     const request = await axios.post("http://localhost:5000/generateP3", mainItem);
    //     const data = JSON.stringify(request.data.message).slice(1,-1);
    //     const formattedText = data.split('\\n').map((line, index) => (
    //       <React.Fragment key={index}>
    //         {line}
    //         <br />
    //       </React.Fragment>
    //     ));
    //   setData(formattedText);
    //   }catch (error){
    //     console.error("Error fetching data:", error);
    //   }}
    //   if (mainItem){
    //       fetchData()
      // }
  // } , [])
  
  if (!mainItem) {
    return <div>No data available for P3 generation.</div>;
  }
  const handleDownload = () => {
    const words = document.getElementById("hex")
    const formattedData = words.innerText

    const blob = new Blob([formattedData], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "hex_data.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <>
    <div className="main-cont" >
      <h2 >Hex Data Viewer</h2>
      <pre id = "hex" >{hex_data || "Loading..."}</pre>
      <button onClick={handleDownload} style={{ marginTop: "10px", padding: "10px", background: "blue", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
        Download Hex Data
      </button>
    </div>
    </>
  );
};

export default GenerateP3Page;
