import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./HomePage"; // HomePage with batch selector
import AddButton from "./AddButton"; // Page for adding details
import AddButton2 from './AddButton2';
import { useState } from "react";
import ShowDetails from "./ShowDetails";
import GenerateP3 from "./GenerateP3"

const App = () => {

  const [selectedBatch, setSelectedBatch] = useState(""); // Track selected batch

  // Handle batch selection
  const handleBatchChange = (e) => {
    localStorage.setItem("batch", JSON.stringify(e.target.value))
    setSelectedBatch(e.target.value);
  };

  const navigate = useNavigate(); 

  const handleRevert = () => {
    navigate(-1); 
  }
  
  return (
    <Routes>
      <Route path="/" element={<HomePage selectedBatch={selectedBatch}
                                handleBatchChange={handleBatchChange}
                                navigate = {navigate}/>} />

      <Route path="/add_details" element={<AddButton
                                      navigate={navigate}
                                      handleRevert={handleRevert}
                                      batch={selectedBatch} />} />

      <Route path="/add_details/extra_details" element={<AddButton2
                                          handleRevert={handleRevert} 
                                          navigate = {navigate}/>} />
      
      
      <Route path = "/show_details" element = {<ShowDetails 
                                                  navigate = {navigate}/>} />

      <Route path = "/show_details/P3" element = {<GenerateP3 />} />                                        
    </Routes>
  );
};

export default App;
