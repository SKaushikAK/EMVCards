import './css/AddButton.css';
import Header from './Header';
import SideBar from './SideBar';


// eslint-disable-next-line react/prop-types
const AddButton = ({ navigate, handleRevert }) => {
  const handleAccountSubmit = async (e) => {
    e.preventDefault();

    // Collect form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const batch = JSON.parse(localStorage.getItem("batch"));

    data.batch_no = batch;

    try {
      navigate('/add_details/extra_details', {state : data}); // Navigate to the next page if needed
    } catch (error) {
      alert('Error submitting data: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <>  
      
    <div className="add-details-container">
      <Header />
      <SideBar handleRevert={handleRevert} side = {"2"}/>

      <main className="scrollable-form">
      
        <h2>Add EMV Card Details</h2>
        <form className="add-details-form" onSubmit={handleAccountSubmit}>
          {/* First Section */}
          <div className="form-row">
            <div className="form-column">
              <label>
                Branch Code:
                <input name="branch_code" placeholder = "Eg. 100" type="number" required />
              </label>
              <label>
                Card Seq No:
                <input name="card_seq_no"  placeholder =  "Eg 1" type="number"  required />
              </label>
              <label>
                Card Number:
                <input name="card_number" pattern = ".{16}" placeholder =  "16 digits"  type="number"  required />
              </label>
              <label>
                Encoded Name:
                <input name="encoded_name" placeholder =  "Eg. SMITH/J.MR" type="text" required />
              </label>
              <label>
                Embossed Name:
                <input name="embossed_name" type="text" placeholder =  "Eg SMITH J.MR"  />
              </label>
              <label>
                Corporate Name:
                <input name="corporate_name" type="text"   />
              </label>
            </div>
            <div className="form-column">
              <label>
                PIN Mailer Name:
                <input name="pin_mailer_name" type="text" placeholder =  "Mr Smith J"  />
              </label>
              <label>
                Address 1:
                <input name="address_1" type="text" placeholder='address1'/>
              </label>
              <label>
                Address 2:
                <input name="address_2" type="text"  placeholder='address2'/>
              </label>
              <label>
                Address 3:
                <input name="address_3" type="text" placeholder='address3' />
              </label>
              <label>
                Address 4:
                <input name="address_4" type="text" placeholder='address4' />
              </label>
            </div>
          </div>

          {/* Second Section */}
          <div className="form-row">
            <div className="form-column">
              <label>
                Language:
                <input name="language" type="text"  />
              </label>
              <label>
                Version:
                <input name="version" type="number"  />
              </label>
              <label>
                Currency Code:
                <input name="currency_code" type="number"  />
              </label>
              <label>
                Currency Exponent:
                <input name="currency_exponent" type="number"  />
              </label>
              <label>
                Begin Date (YYMM):
                <input name="begin_date" type="number"  />
              </label>
              <label>
                Expiry Date (YYMM):
                <input name="expiry_date" type="number"  />
              </label>
              <label>
                Cash Cycle Date (DDMMYY):
                <input name="cash_cycle_date" type="number" />
              </label>
              <label>
                Cash Limit:
                <input name="cash_limit" type="number" />
              </label>
              <label>
                Offline Limit:
                <input name="offline_limit" type="number" />
              </label>              

              <label>
                Sale Freq Limit
                <input name="sale_freq" type="number" />
              </label>     
            </div>
            <div className="form-column">    
              <label>
                Network Limit:
                <input name="network_limit" type="number" />
              </label>
              <label>
                Sale Cycle Date:
                <input name="sale_cycle_date" type="number" />
              </label>
              <label>
                Cash Cycle Length:
                <input name="cash_cycle_length" type="number" />
              </label>
              <label>
                Sale Cycle Length:
                <input name="sale_cycle_length" type="number" />
              </label>
              <label>
                Sale Limit:
                <input name="sale_limit" type="number" />
              </label>
              <label>
                Manual Cash:
                <input name="manual_cash" type="number" />
              </label>
              <label>
                Service Code:
                <input name="service_code" type="number" />
              </label>
              <label>
                ISO Service Restriction:
                <input name="iso_service_restriction" type="number" />
              </label>
              <label>
                Cash Freq Limit:
                <input name="cash_freq" type="number" />
              </label>
            </div>x
          </div>

          {/* Card Scheme Section */}
          <div className="form-card-scheme">
            <h3>Card Scheme</h3>
            <label>
              Scheme ID:
              <input name="scheme_id" type="number"  required />
            </label>
            <br />
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

            <button type="submit" className="submit-btn">
              Next Page
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