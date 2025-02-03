import axios from "axios";
import React, { useState, useEffect } from "react";
import "./css/GenerateP3.css";
import Header from "./Header";
import Footer from "./Footer";
import SideData from "./SideData";
import { useLocation } from "react-router-dom";

const GenerateP3Page = () => {
  const [hexData, setHexData] = useState("");
  const [error, setError] = useState(false);

  const location = useLocation();
  const { mainItem, details } = location.state || {}; // Fix potential undefined error

  useEffect(() => {

    const fetchData = async () => {
      try {
        if (!mainItem) {
          console.warn("No mainItem found, skipping API call.");
          return;
        }

        setHexData("Loading...");
        setError(false);

        const request = await axios.post("http://localhost:5000/generateP3", mainItem);
        const data = request.data.message;

        setHexData(
          data.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
      }
    };

    fetchData();
  }, [mainItem]);

  const handleDownload = () => {
    if (!hexData) return;

    const formattedData = hexData
      .map((item) => item.props.children)
      .join("\n");

    const blob = new Blob([formattedData], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "hex_data.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{"position" : "fixed"}}>
      <Header />
      <SideData mainItem={mainItem} />
      <div className="p3-container">
        <main className="p3-main-content">
          <h2 className="p3-title">Hex Data Viewer</h2>
          {error ? (
            <p className="p3-error">⚠ Error fetching data. Please try again.</p>
          ) : (
            <pre id="hex" className="p3-content">{hexData}</pre>
          )}
          <button onClick={handleDownload} className="p3-download-btn" disabled={error || !hexData}>
            Download Hex Data
          </button>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default GenerateP3Page;
