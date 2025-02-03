import React, {useState} from 'react'
import "./css/SideSearch.css"

const SideSearch = ({navigate, onFilter}) => {
  const [batch, setBatch] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(batch, date)
    onFilter({ batch, date });
  };

  return (
    <>
    <aside className="sidebar">
      <h3>FILTER</h3>
      <form onSubmit={handleSubmit}>
      <label>
            Enter the batch: 
            <input className = "batch-no" onChange = {(e) => setBatch(e.target.value)}type = "number"/>
        </label>
        <label>
            Enter date: 
            <input type =  "date" onChange={(e) => setDate(e.target.value)} className = "data-date"/>
        </label>
        <button className = "back-button" type = "submit" >
          Apply Filter
        </button>
        <button type="button" className="back-button" onClick={() => {navigate("/")}}>
            Back
        </button>
      </form>
    </aside>
    </>
  )
}

export default SideSearch