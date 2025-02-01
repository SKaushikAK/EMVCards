import React from 'react'

const SideSearch = ({navigate}) => {
  return (
    <>
    <aside className="sidebar">
      <h3>FILTER</h3>
      <form>
      <label>
            Enter the batch: 
            <input className = "batch-no" type = "number"/>
        </label>
        <label>
            Enter date: 
            <input type =  "date"   className = "data-date"/>
        </label>
        <input type = "submit" />
        <button type="button" className="back-button" onClick={() => {navigate("/")}}>
            Back
        </button>
      </form>
    </aside>
    </>
  )
}

export default SideSearch