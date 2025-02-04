import React from "react";
import "./css/Header.css";
import logo from "./assets/cr2.png";

const Header = () => {
    return(
    
    <header>
        <nav className="navbar">
          <img src={logo} alt="CR2 Logo" className="navbar-logo" />
          <span style = {{"position" : "relative", "left" : "40px" }}> Premier Digital Banking | Payment Platform</span>
        </nav>
    </header>
    )
}

export default Header