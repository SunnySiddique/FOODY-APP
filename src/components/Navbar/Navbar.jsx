import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="container">
        <div className="res-menu">
          <div>
            <button className="sidebar-toggle" onClick={toggleSidebar}>
              &#9776;
            </button>
          </div>
          <div>
            <h4 className="logo">Foody</h4>
          </div>
        </div>
        <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
          <button className="close-btn" onClick={toggleSidebar}>
            &times;
          </button>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/blog">Blog</NavLink>
            </li>
          </ul>
        </div>

        {/* Navbar */}
        <nav className="navbar">
          <div className="logo">Foody</div>
          <div className="nav-links">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/blog">Blog</NavLink>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
