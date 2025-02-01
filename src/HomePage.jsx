// import { useState } from 'react';
import './css/HomePage.css';

const HomePage = ({selectedBatch, handleBatchChange, navigate}) => {


  const handleNavigate = (what) => {
    if (selectedBatch === "") {
      alert ("Please select te batch number first...")
      
    } 
    else{
      if (what === "add"){
        navigate("/add_details");}
      else{
        navigate("/show_details")
      }
      }
    }

  return (
    <>
      <header className="header">
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item"><a href="#" className="nav-link">Home</a></li>
            <li className="nav-item"><a href="#" className="nav-link">About</a></li>
            <li className="nav-item"><a href="#" className="nav-link">Services</a></li>
            <li className="nav-item"><a href="#" className="nav-link">Contact</a></li>
          </ul>
          <div className="batch-input">
            Batch No:
            <input type="number" value = {selectedBatch} onChange = {handleBatchChange} className="batch-number" required/>
          </div>
        </nav>
      </header>

      <main className="main-content">
        <section className="hero">
          <h1 className="hero-title">CR2: Premier Digital Banking | Payment Platform</h1>
          <p className="hero-description">Discover our amazing products and services.</p>
          <div className="hero-buttons">
            <button className="hero-cta" onClick={() => handleNavigate("add")} >Add Card Details</button>
            <button className="hero-cta" onClick={ () => handleNavigate("show")}>Show Card Details</button>
          </div>
        </section>

        <section className="features">
          <div className="feature-card">
            <i className="feature-icon fas fa-rocket"></i>
            <h3 className="feature-title">Fast and Efficient</h3>
            <p className="feature-description">Our services are designed to save you time and effort.</p>
          </div>
          <div className="feature-card">
            <i className="feature-icon fas fa-shield-alt"></i>
            <h3 className="feature-title">Secure and Reliable</h3>
            <p className="feature-description">Your data is safe with us.</p>
          </div>
          <div className="feature-card">
            <i className="feature-icon fas fa-users"></i>
            <h3 className="feature-title">Dedicated Support</h3>
            <p className="feature-description">Our team is here to help you every step of the way.</p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p className="footer-text">&copy; 2025 My Website. All rights reserved.</p>
      </footer>
    </>
  );
}; 

export default HomePage;