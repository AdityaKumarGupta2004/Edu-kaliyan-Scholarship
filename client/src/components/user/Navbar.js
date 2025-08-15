import React, { useState, useContext } from "react";
import { Button, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../../App.css";
import { UserContext } from "../../context/auth";

const Navbar = () => {
  const {
    loggedIn,
    setLoggedIn,
    user,
    setUser,
    adminLoggedIn,
    setAdminLoggedIn,
  } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    alert("Logged Out Successfully");
    navigate("/");
    setUser(null);
    setLoggedIn(false);
    setAdminLoggedIn(false);
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    window.location.reload();
  };

  const [navShow, setNavShow] = useState(false);

  return (
    <header className="container header">
      <nav className="nav">
        <div className="logo" data-aos="fade-down" data-aos-duration="100">
          <h2>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Edu-kaliyan
            </Link>
          </h2>
        </div>

        <div className="nav_menu" id="nav_menu">
          <button
            className="close_btn"
            id="close_btn"
            onClick={() => setNavShow(false)}
          >
            <i className="ri-close-fill" />
          </button>
          <ul className="nav_menu_list">
            {adminLoggedIn && (
              <li
                className="nav_menu_item"
                data-aos="fade-down"
                data-aos-duration="1000"
              >
                <Link to="/scholarships" className="nav_menu_link">
                  View Scholarships
                </Link>
              </li>
            )}
            {!adminLoggedIn || loggedIn ? (
              <>
                <li
                  className="nav_menu_item"
                  data-aos="fade-down"
                  data-aos-duration="200"
                >
                  <Link to="/" className="nav_menu_link">
                    Home
                  </Link>
                </li>
                <li
                  className="nav_menu_item"
                  data-aos="fade-down"
                  data-aos-duration="400"
                >
                  <Link to="/scholarships" className="nav_menu_link">
                    Scholarships
                  </Link>
                </li>
                <li
                  className="nav_menu_item"
                  data-aos="fade-down"
                  data-aos-duration="600"
                >
                  <Link to="/scholarship_information" className="nav_menu_link">
                    Information
                  </Link>
                </li>
                <li
                  className="nav_menu_item"
                  data-aos="fade-down"
                  data-aos-duration="800"
                >
                  <Link to="/contact" className="nav_menu_link">
                    Contact Us
                  </Link>
                </li>
              </>
            ) : null}

            {loggedIn && (
              <li
                className="nav_menu_item"
                data-aos="fade-down"
                data-aos-duration="1000"
              >
                <Link to="/user-dashboard" className="nav_menu_link">
                  Profile
                </Link>
              </li>
            )}

            {adminLoggedIn && !loggedIn && (
              <li
                className="nav_menu_item"
                data-aos="fade-down"
                data-aos-duration="1200"
              >
                <Link to="/adminDashboard" className="nav_menu_link">
                  Admin Dashboard
                </Link>
              </li>
            )}

            <li
              className="nav_menu_item"
              data-aos="fade-down"
              data-aos-duration="1400"
            >
              {!loggedIn && !adminLoggedIn ? (
                <NavDropdown
                  title="Login"
                  id="basic-nav-dropdown"
                  className="btn btn-primary-outline"
                >
                  <NavDropdown.Item as={Link} to="/login">
                    <i className="ri-account-circle-line" />
                    <span> Student</span>
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin_login">
                    <i className="ri-admin-fill" />
                    <span> Admin</span>
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Button variant="primary" onClick={handleLogout}>
                  Logout
                </Button>
              )}
            </li>
          </ul>
        </div>

        <button
          className="toggle_btn"
          id="toggle_btn"
          onClick={() => setNavShow(true)}
        >
          <i className="ri-menu-line" />
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
