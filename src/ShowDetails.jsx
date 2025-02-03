import { useState, useEffect } from "react";
import "./css/ShowDetails.css"
import axios from "axios";
import Options from "./Options";
import Header from "./Header";
import Footer from "./Footer";
import SideSearch from "./SideSearch";
import { DetailsTable } from "./DetailsTable";

const ShowDetails = ({navigate}) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api_details");
        const fetchedData = response.data.message;
        

        const updatedData = fetchedData.map((item) => ({
          ...item,
          isOpen: false,
          details: item.details.map((detail) => ({
            ...detail,
            isOpen: false,
          })),
        }));
        console.log("Updated ",fetchedData)
        setData(updatedData);
        setFilteredData(updatedData);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // const track = async () => {
    //   const t = await axios.post("http://localhost:5000/track_data");
    //   }

    // track();
    fetchData();
  }, []);

  
  const handleFilter = ({ batch, date }) => {
    let filtered = [...data];
    console.log("filter",filtered)
    if (batch) {
      filtered = filtered.filter(item => 
        item.main.batch_no?.toString() === batch.toString()
      );
    }
    
    if (date) {
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.main.created_at).toISOString().split('T')[0];
        console.log(itemDate, date, "date")
        return itemDate === date;
      });
    }
    console.log("filtered",filtered)
    setFilteredData(filtered);
  };


  const toggleMainDropdown = (index) => {
    setFilteredData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, isOpen: !item.isOpen } : item
      )
    );
  };

  const toggleDetailDropdown = (mainIndex, detailIndex) => {
    setFilteredData((prevData) =>
      prevData.map((item, i) =>
        i === mainIndex
          ? {
              ...item,
              details: item.details.map((detail, j) =>
                j === detailIndex
                  ? { ...detail, isOpen: !detail.isOpen }
                  : detail
              ),
            }
          : item
      )
    );
  };

  const handleGenerateP3 = (mainItem, details) =>{

  navigate("/show_details/P3", { state: { mainItem , details} })
}

  if (!data.length) return <div>Loading...</div>;

  return (
    <>
    <Header />
    <SideSearch navigate = {navigate} onFilter = {handleFilter}/>
    <div className="main-container">
      <h1>Account Details</h1>
      {filteredData.map((mainItem, mainIndex) => (
        <div key={mainIndex} style={{ marginBottom: "20px", border: "1px solid #ccc", borderRadius : "10px" ,padding: "10px" }}>
          <h3
            onClick={() => toggleMainDropdown(mainIndex)}
            style={{ cursor: "pointer", color: "#007bff" }}
          >
            {mainItem.main.card_number} : {mainItem.main.embossed_name} {mainItem.isOpen ? "▲" : "▼"} 
          </h3>

          {mainItem.isOpen && (
            <div>
              <h4>Main Details</h4>
              
              <DetailsTable detail = {mainItem.main}/>

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
                      
                      <DetailsTable detail = {detail[0]} />

                      <h5>Options</h5>
                      <Options detail={detail} />
                    </div>
                  )}
                </div>
              ))}

              {/* Generate P3 Button */}
              <button
                onClick={() => handleGenerateP3(mainItem, mainItem.details)}
                className="generate-p3-btn"
              >
                Generate P3
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
    <Footer />
    </>
  );
};

export default ShowDetails;
