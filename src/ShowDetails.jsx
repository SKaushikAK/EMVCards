import { useState, useEffect } from "react";
import "./css/ShowDetails.css";
import axios from "axios";
import Options from "./Options";
import Header from "./Header";
import Footer from "./Footer";
import SideSearch from "./SideSearch";

const ShowDetails = ({ navigate }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:500/api_details");
        const fetchedData = response.data.message;

        if (fetchedData.length === 0) {
          setData([]);
        } else {
          const updatedData = fetchedData.map((item) => ({
            ...item,
            isOpen: false,
            details: item.details.map((detail) => ({
              ...detail,
              isOpen: false,
            })),
          }));
          setData(updatedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]); // Ensure data remains an empty array on failure
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchData();
  }, []);

  const toggleMainDropdown = (index) => {
    setData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, isOpen: !item.isOpen } : item
      )
    );
  };

  const toggleDetailDropdown = (mainIndex, detailIndex) => {
    setData((prevData) =>
      prevData.map((item, i) =>
        i === mainIndex
          ? {
              ...item,
              details: item.details.map((detail, j) =>
                j === detailIndex ? { ...detail, isOpen: !detail.isOpen } : detail
              ),
            }
          : item
      )
    );
  };

  const handleGenerateP3 = (mainItem, details) => {
    navigate("/show_details/P3", { state: { mainItem, details } });
  };

  return (
    <>
      <Header />
      <SideSearch navigate={navigate} />
      <div className="main-container">
        <h1>Show Details</h1>

        {/* Show Loading while fetching data */}
        {loading ? (
          <div>Loading...</div>
        ) : data.length === 0 ? (
          <div>No datas found</div>
        ) : (
          data.map((mainItem, mainIndex) => (
            <div key={mainIndex} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
              <h3
                onClick={() => toggleMainDropdown(mainIndex)}
                style={{ cursor: "pointer", color: "#4CAF50" }}
              >
                {mainItem.main.card_number} : {mainItem.main.embossed_name} {mainItem.isOpen ? "▲" : "▼"}
              </h3>

              {mainItem.isOpen && (
                <div>
                  <h4>Main Details</h4>
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

                  {mainItem.details.map((detail, detailIndex) => (
                    <div key={detailIndex} style={{ marginTop: "10px" }}>
                      <h4
                        onClick={() => toggleDetailDropdown(mainIndex, detailIndex)}
                        style={{ cursor: "pointer", color: "#007BFF" }}
                      >
                        Detail {detailIndex + 1} {detail.isOpen ? "▲" : "▼"}
                      </h4>

                      {detail.isOpen && (
                        <div>
                          <h5>Account Details</h5>
                          <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                              <tr>
                                <th style={{ padding: "8px", textAlign: "left" }}>Field</th>
                                <th style={{ padding: "8px", textAlign: "left" }}>Value</th>
                              </tr>
                            </thead>
                            <tbody>
                              {Object.entries(detail[0]).map(([key, value]) => (
                                <tr key={key}>
                                  <td style={{ padding: "8px", textAlign: "left" }}>{key}</td>
                                  <td style={{ padding: "8px", textAlign: "left" }}>{value.toString()}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>

                          <h5>Options</h5>
                          <Options detail={detail} />
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Generate P3 Button */}
                  <button
                    onClick={() => handleGenerateP3(mainItem, mainItem.details)}
                    style={{
                      marginTop: "10px",
                      padding: "10px 20px",
                      backgroundColor: "#FF5733",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Generate P3
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      <Footer />
    </>
  );
};

export default ShowDetails;
