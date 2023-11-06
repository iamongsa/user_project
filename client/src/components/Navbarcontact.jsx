import React from 'react'
import "./Navbarcontact.css"
import { Link, NavLink } from "react-router-dom";
import Logo from "../img/logochangdum.png";

function Navbarcontact() {
    return (
        <div>
          <nav className="bar-con">
          <div>
              <Link to ="/" className="text-chag">ChangDum</Link>
            </div>
            <div>
              <li>
                <NavLink to="/contact" className="text-con">
                  ติดต่อเรา
                </NavLink>
              </li>
            </div>
          </nav>
        </div>
      );
}

export default Navbarcontact