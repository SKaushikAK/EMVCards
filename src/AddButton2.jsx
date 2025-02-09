import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./css/AddButton2.css";
import axios from'axios';
import Header from "./Header";
import SideBar from "./SideBar";
import Footer from "./Footer";

// eslint-disable-next-line react/prop-types
const AddButton2 = ({handleRevert, navigate}) => {


  const location = useLocation();
  const main = location.state || {}
  console.log(main.address_1)
  const [formData, setFormData] = useState([
    {
      accountNo: "",
      accSysNo: "",
      accSysName: "Local System",
      descNo: "",
      accName: "CREDIT",
      iso: "",
      currencyCode: "",
      currencyName: "",
    },
  ]);

  const [options, setOptions] = useState([Array(20).fill(false)]); // Options grid starts with one account

  // Handle changes to specific inputs
  const handleFieldChange = (rowIndex, field, value) => {
    setFormData((prevFormData) =>
      prevFormData.map((row, i) =>
        i === rowIndex ? { ...row, [field]: value } : row
      )
    );
  };

  // Handle checkbox changes in the options grid
  const handleOptionChange = (rowIndex, colIndex) => {
    setOptions((prevOptions) =>
      prevOptions.map((row, i) =>
        i === rowIndex
          ? row.map((col, j) => (j === colIndex ? !col : col))
          : row
      )
    );
  };

  // Clear specific row fields
  const handleClear = (rowIndex) => {
    setFormData((prevFormData) =>
      prevFormData.map((row, i) =>
        i === rowIndex
          ? {
              accountNo: "",
              accSysNo: "",
              accSysName: "Local System",
              descNo: "",
              accName: "CREDIT",
              iso: "",
              currencyCode: "",
              currencyName: "",
            }
          : row
      )
    );
    setOptions((prevOptions) =>
      prevOptions.map((row, i) =>
        i === rowIndex ? Array(20).fill(false) : row
      )
    );
  };

  // Add a new account dynamically
  const handleAddAccount = () => {
    setFormData((prevFormData) => [
      ...prevFormData,
      {
        accountNo: "",
        accSysNo: "",
        accSysName: "Local System",
        descNo: "",
        accName: "CREDIT",
        iso: "",
        currencyCode: "",
        currencyName: "",
      },
    ]);
    setOptions((prevOptions) => [...prevOptions, Array(20).fill(false)]);
  };

  const validateForm = () => {
    for (let i = 0; i < formData.length; i++) {
      const row = formData[i];
      if (!row.accountNo || !row.accSysNo || !row.currencyCode) {
        alert(`Row ${i + 1} is incomplete!`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const selectedBatch = JSON.parse(localStorage.getItem("batch"));

    const payload = {
      main_data : main,
      batch: selectedBatch, // Add batch_no to the payload
      formData: formData,
      options,
    };

    try {
        const response = await axios.post('http://localhost:5000/add_details/extra_details/api', payload);
      // const response = await axios.post('/add_details/api', data);
      alert(response.data.message);
      navigate('/'); // Navigate to the next page
    } catch (error) {
        console.error('Error details:', error);
        alert('Error submitting data: ' + (error.response?.data?.error || error.message));
    }
  }

  return (
    <>
    <Header />
    <SideBar handleRevert={handleRevert} side = {"3"}/>
    <div className="container">
      <h3>Card Record - Page 2</h3>
      <form onSubmit={handleSubmit}>
        <table className="account-table">
          <thead>
            <tr>
              <th></th>
              <th>Acc Sys No.</th>
              <th>Account Sys Name</th>
              <th>Desc No.</th>
              <th>Account No.</th>
              <th>Account Name</th>
              <th>ISO</th>
              <th>Currency Code</th>
              <th>Currency Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {formData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td>Account {rowIndex + 1}</td>
                <td>
                  <input
                    type="text"
                    className="small-input"
                    value={row.accSysNo}
                    onChange={(e) =>
                      handleFieldChange(rowIndex, "accSysNo", e.target.value)
                    }
                  />
                </td>
                <td>
                  <select
                    className="dropdown"
                    value={row.accSysName}
                    onChange={(e) =>
                      handleFieldChange(rowIndex, "accSysName", e.target.value)
                    }
                  >
                    <option>Local System</option>
                    <option>Remote System</option>
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    className="small-input"
                    value={row.descNo}
                    onChange={(e) =>
                      handleFieldChange(rowIndex, "descNo", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="small-input"
                    value={row.accountNo}
                    onChange={(e) =>
                      handleFieldChange(rowIndex, "accountNo", e.target.value)
                    }
                  />
                </td>
                <td>
                  <select
                    className="dropdown"
                    value={row.accName}
                    onChange={(e) =>
                      handleFieldChange(rowIndex, "accName", e.target.value)
                    }
                  >
                    <option>CREDIT</option>
                    <option>DEBIT</option>
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    className="small-input"
                    value={row.iso}
                    onChange={(e) =>
                      handleFieldChange(rowIndex, "iso", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="small-input"
                    value={row.currencyCode}
                    onChange={(e) =>
                      handleFieldChange(rowIndex, "currencyCode", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="small-input"
                    value={row.currencyName}
                    onChange={(e) =>
                      handleFieldChange(rowIndex, "currencyName", e.target.value)
                    }
                  />
                </td>
                <td>
                  <button
                    type="button"
                    className="clear-btn"
                    onClick={() => handleClear(rowIndex)}
                  >
                    Clear
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h4>Options</h4>
        <table className="options-table">
          <thead>
            <tr>
              {[
                "Account",
                "Cash",
                "TCs",
                "B/Eq",
                "C/Rq",
                "S/Rq",
                "Xfm",
                "Xto",
                "Dpos",
                "Bill",
                "F/SR",
                "M/SR",
                "Draft",
                "Ndr/W",
                "S/Curr",
                "M/Cash",
                "Q/C",
                "Sale",
                "Cash/Bk",
                "Qloc",
                "CPn",
              ].map((opt) => (
                <th key={opt}>{opt}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {options.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td>{`Account ${rowIndex + 1}`}</td>
                {row.map((col, colIndex) => (
                  <td key={colIndex}>
                    <input
                      type="checkbox"
                      checked={col}
                      onChange={() => handleOptionChange(rowIndex, colIndex)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="button-group">
          <button type="button" className="add-account-btn" onClick={handleAddAccount}>
            + Add Account
          </button>
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </div>
      </form>
    </div>
    <Footer />
    </>
  );
};

export default AddButton2;
