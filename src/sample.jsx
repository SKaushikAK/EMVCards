import { Link } from "react-router-dom";
// import "./css/App.css";

const HomePage = ({selectedBatch, handleBatchChange, batches ,navigate}) => {

  return (
    <div className="container">
      <header className="header">
        <h1>EMV Cards Generation</h1>
        <div className="batch-selector">
          <label htmlFor="batch-select">Select Your Batch:</label>
          <select
            id="batch-select"
            value={selectedBatch}
            onChange={handleBatchChange}
          >
            <option value="">--Select Batch--</option>
            {batches.map((batch, index) => (
              <option key={index} value={batch}>
                {batch}
              </option>
            ))}
          </select>
        </div>
      </header>

      {selectedBatch && (
        <div className="button-container">
          <p>You are in: <strong>{selectedBatch}</strong></p>
            <button className="add-details" onClick={() => navigate("/add_details")}>Add Details</button>
          <button className="show-details" onClick={ () => navigate("/show_details")}>Show Details</button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
