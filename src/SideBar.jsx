import React from 'react';
import { FaIdCard } from "react-icons/fa";
import { MdBatchPrediction } from "react-icons/md";
import { MdAccountBalance } from "react-icons/md";
import "./css/SideBar.css"

const SideBar = ({ handleRevert, side }) => {

  const highlightStyles = {
    backgroundColor: "#004d99", 
    color: "#fff", 
    fontWeight: "bold",
  };

  return (
    <aside className="sidebar">
      <h3>PROCEDURE</h3>
      <ul className="roadmap">
        <li className="active1">
          <MdBatchPrediction /> Select Batch
        </li>
        <li style={side === "2" ? highlightStyles : {}} className="active2">
          <FaIdCard /> Add Card Details
        </li>
        <li style={side === "3" ? highlightStyles : {}} className="active3">
          <MdAccountBalance /> Add Account Details
        </li>
      </ul>
      <button type="button" className="back-button" onClick={() => handleRevert()}>
        Back
      </button>
    </aside>
  );
};

export default SideBar;
