import React from "react";
import "./header.css";
import { Link , useNavigate} from "react-router-dom";
import { useAuth } from '../../contexts/authContext'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping,
  faHome,
  faSearch,
  faSignOut,
  faUser,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { doSignOut } from '../../firebase/auth'


function Header() {
  const navigate = useNavigate()
  const { userLoggedIn } = useAuth()
  const showSidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "flex";
  };

  const hideSidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "none";
  };


  return (
    <div className="header">
      <nav>
        {/* Menu Icon */}
        <FontAwesomeIcon className="menu" icon={faBars} onClick={showSidebar} />

        {/* Title and Logo */}
        <div className="textlogo">
          <h1>ServiceCops</h1>
        </div>


        {/* Sidebar (hidden by default) */}
        <ul className="sidebar">
          <FontAwesomeIcon className="menu2" icon={faX} onClick={hideSidebar} />
          <Link to="/blog" className="linked">
            <li>Home</li>
          </Link>
          <Link to="/logout" className="linked">
            <li onClick={() => { doSignOut().then(() => { navigate('/login') }) }}>Logout</li>
          </Link>
        </ul>

        {/* Right-side Links (evenly spaced) */}
        <div className="right-links">
          <Link to="/blog" className="linked2">
            <li>
              <FontAwesomeIcon icon={faHome} /> Home
            </li>
          </Link>
          <Link to="/gallery" className="linked2">
            <li onClick={() => { doSignOut().then(() => { navigate('/login') }) }}>
              <FontAwesomeIcon icon={faSignOut} /> Logout
            </li>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Header;
