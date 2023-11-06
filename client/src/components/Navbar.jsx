import React from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import Logo from "../img/logochangdum.png";

function Navbar() {
  return (
    <div>
      <nav className="bar-home">
        <div className="textcontact">
          <li>
            <NavLink to="/contact" className="menu">
              ติดต่อเรา
            </NavLink>
          </li>
        </div>
        <div className="tittle">
          <Link to ="/">
            <img src={Logo} alt="Logo" className="logo"></img>
            </Link>
          <div class="header-home">ติดตามสถานะการซ่อมรถ</div>

        </div>
      </nav>
    </div>
  );
}

export default Navbar;
