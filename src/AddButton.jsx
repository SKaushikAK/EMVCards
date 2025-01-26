import './css/AddButton.css';
import axios from 'axios';
import { FaIdCard } from "react-icons/fa";
import { MdBatchPrediction } from "react-icons/md";
import { MdAccountBalance } from "react-icons/md";

const AddButton = ({ navigate, handleRevert }) => {
  const handleAccountSubmit = async (e) => {
    e.preventDefault();

    // Collect form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const batch = JSON.parse(localStorage.getItem("batch"));

    data.batch_no = batch;

    try {
      const response = await axios.post('/add_details/api', data);
      localStorage.setItem("card_id", JSON.stringify(response.data.message));
      navigate('/add_details/extra_details'); // Navigate to the next page if needed
    } catch (error) {
      alert('Error submitting data: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <>  
      
    <div className="add-details-container">
      <header>
        <nav className="navbar"  >
          CR2: Premier Digital Banking | Payment Platform
        </nav>
      </header>
      

      <aside className="sidebar">
        <h3>PROCEDURE</h3>
        <ul className="roadmap">
          <li> <  MdBatchPrediction  /> Select Batch</li>
          <br></br>
          <br></br>

          <li className="active"> <FaIdCard />  Add Card Details</li>
          <br></br>
          <br></br>

          <li> <MdAccountBalance /> Add Account Details</li>
        </ul>
      </aside>

      <main className="scrollable-form">
        <h2>Add EMV Card Details</h2>
        <form className="add-details-form" onSubmit={handleAccountSubmit}>
          {/* First Section */}
          <div className="form-row">
            <div className="form-column">
              <label>
                Branch Code:
                <input name="branch_code" type="number" placeholder="100" required />
              </label>
              <label>
                Card Seq No:
                <input name="card_seq_no" type="number" placeholder="0" required />
              </label>
              <label>
                Card Number:
                <input name="card_number" type="number" placeholder="6957452871" required />
              </label>
              <label>
                Encoded Name:
                <input name="encoded_name" type="text" placeholder="SMITH/J.MR" required />
              </label>
              <label>
                Embossed Name:
                <input name="embossed_name" type="text" placeholder="MR J SMITH" />
              </label>
              <label>
                Corporate Name:
                <input name="corporate_name" type="text" placeholder="Enter Corporate Name" />
              </label>
            </div>
            <div className="form-column">
              <label>
                PIN Mailer Name:
                <input name="pin_mailer_name" type="text" placeholder="Mr J Smith" />
              </label>
              <label>
                Address 1:
                <input name="address_1" type="text" placeholder="address line 1" />
              </label>
              <label>
                Address 2:
                <input name="address_2" type="text" placeholder="address line 2" />
              </label>
              <label>
                Address 3:
                <input name="address_3" type="text" placeholder="address line 3" />
              </label>
              <label>
                Address 4:
                <input name="address_4" type="text" placeholder="address line 4" />
              </label>
            </div>
          </div>

          {/* Second Section */}
          <div className="form-row">
            <div className="form-column">
              <label>
                Language:
                <input name="language" type="text" placeholder="en" />
              </label>
              <label>
                Version:
                <input name="version" type="number" placeholder="0" />
              </label>
              <label>
                Currency Code:
                <input name="currency_code" type="number" placeholder="978" />
              </label>
              <label>
                Currency Exponent:
                <input name="currency_exponent" type="number" placeholder="0" />
              </label>
              <label>
                Begin Date (YYMM):
                <input name="begin_date" type="number" placeholder="1311" />
              </label>
              <label>
                Expiry Date (YYMM):
                <input name="expiry_date" type="number" placeholder="1611" />
              </label>
              <label>
                Cash Cycle Date (DDMMYY):
                <input name="cash_cycle_date" type="number" placeholder="011113" />
              </label>
              <label>
                Cash Limit:
                <input name="cash_limit" type="number" placeholder="1000" />
              </label>
              <label>
                Offline Limit:
                <input name="offline_limit" type="number" placeholder="500" />
              </label>
            </div>
            <div className="form-column">
              
              <label>
                Network Limit:
                <input name="network_limit" type="number" placeholder="500" />
              </label>
              <label>
                Sale Cycle Date:
                <input name="sale_cycle_date" type="number" placeholder="500" />
              </label>
              <label>
                Cash Cycle Length:
                <input name="cash_cycle_length" type="number" placeholder="500" />
              </label>
              <label>
                Sale Cycle Length:
                <input name="sale_cycle_length" type="number" placeholder="500" />
              </label>
              <label>
                Sale Limit:
                <input name="sale_limit" type="number" placeholder="500" />
              </label>
              <label>
                Manual Cash:
                <input name="manual_cash" type="number" placeholder="500" />
              </label>
              <label>
                Service Code:
                <input name="service_code" type="number" placeholder="Enter Service Code" />
              </label>
              <label>
                ISO Service Restriction:
                <input name="iso_service_restriction" type="number" placeholder="Enter ISO Restriction" />
              </label>
            </div>
          </div>

          {/* Card Scheme Section */}
          <div className="form-card-scheme">
            <h3>Card Scheme</h3>
            <label>
              Scheme ID:
              <input name="scheme_id" type="number" placeholder="Enter Scheme ID" required />
            </label>
            <label>
              Scheme Name of Card:
              <select name="scheme_name" required>
                <option value="Visa" defaultValue>
                  Visa
                </option>
                <option value="MasterCard">MasterCard</option>
                <option value="Amex">Amex</option>
                <option value="Rupay">Rupay</option>
              </select>
            </label>
          </div>

          {/* Buttons */}
            <button type="submit" className="submit-btn">
              Next Page
            </button>
            <button type="button" className="back-button" onClick={handleRevert}>
              Back
            </button>
        </form>
      </main>
    </div>
    <footer className="footer">
        <p className="footer-text">&copy; 2025 My Website. All rights reserved.</p>
      </footer>
    </>
  );
};

export default AddButton;
