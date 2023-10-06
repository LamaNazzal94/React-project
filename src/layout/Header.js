import React, { useState } from "react";

import { Link, useLocation } from "react-router-dom";

function Header() {
  const [check, setCheck] = useState(localStorage.getItem("islogin"));
  const location = useLocation();
  const currentPath = location.pathname;

  const handleLogout = () => {
    setCheck("false");
    localStorage.setItem("islogin", "false");
  };

  return (
    <div>
      {/* Page Preloder */}
      <div id="preloder">
        <div className="loader"></div>
      </div>

      {/* Offcanvas Menu Section Begin */}
      <div className="offcanvas-menu-overlay"></div>
      <div className="canvas-open">
        <i className="icon_menu"></i>
      </div>
      <div className="offcanvas-menu-wrapper">
        <div className="canvas-close">
          <i className="icon_close"></i>
        </div>
        <div className="search-icon search-switch">
          <i className="icon_search"></i>
        </div>
        <div className="header-configure-area">
          <div className="language-option">
            <img src="img/flag.jpg" alt="" />
            <span>
              EN <i className="fa fa-angle-down"></i>
            </span>
            <div className="flag-dropdown">
              <ul>
                <li>
                  <a href="#">Zi</a>
                </li>
                <li>
                  <a href="#">Fr</a>
                </li>
              </ul>
            </div>
          </div>
          <a href="#" className="bk-btn">
            Booking Now
          </a>
        </div>
      </div>
      {/* Offcanvas Menu Section End */}

      {/* Header Section Begin */}
      <header className="header-section">
        <div className="top-nav">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <ul className="tn-left">
                  <li>
                    <i className="fa fa-phone"></i> (12) 345 67890
                  </li>
                  <li>
                    <i className="fa fa-envelope"></i> info.colorlib@gmail.com
                  </li>
                </ul>
              </div>
              <div className="col-lg-6">
                <div className="tn-right">
                  <div className="top-social">
                    <a href="#">
                      <i className="fa fa-facebook"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-twitter"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-tripadvisor"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-instagram"></i>
                    </a>
                  </div>
                  <a href="#" className="bk-btn">
                    Booking Now
                  </a>
                  <div className="language-option">
                    <img src="asset/img/flag.jpg" alt="" />
                    <span>
                      EN <i className="fa fa-angle-down"></i>
                    </span>
                    <div className="flag-dropdown">
                      <ul>
                        <li>
                          <a href="#">Zi</a>
                        </li>
                        <li>
                          <a href="#">Fr</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* Profile Icon */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="menu-item">
          <div className="container">
            <div className="row">
              <div className="col-lg-2">
                <div className="logo">
                  <Link to="/">
                    <img src="asset/img/logo.png" alt="" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-10">
                <div className="nav-menu">
                  <nav className="mainmenu">
                    <ul>
                      <li className={currentPath === "/" ? "active" : ""}>
                        <Link to="/">Home</Link>
                      </li>
                      <li className={currentPath === "/rooms" ? "active" : ""}>
                        <Link to="/rooms">Rooms</Link>
                      </li>
                      <li className={currentPath === "/about" ? "active" : ""}>
                        <Link to="/about">About Us</Link>
                      </li>
                      <li
                        className={
                          currentPath.startsWith("/pages") ? "active" : ""
                        }
                      >
                        <Link to="/pages">Pages</Link>
                        <ul className="dropdown">
                          <li
                            className={
                              currentPath === "/room-details" ? "active" : ""
                            }
                          >
                            <Link to="/room-details">Room Details</Link>
                          </li>
                          {/* Add more dropdown items as needed */}
                        </ul>
                      </li>
                      <li
                        className={currentPath === "/contact" ? "active" : ""}
                      >
                        <Link to="/contact">Contact</Link>
                      </li>
                      <li>
                        {check == null || check === "false" ? (
                          <>
                            <Link to="/CrudApp">
                              <button className="btn-warning">LogIn</button>
                            </Link>
                          </>
                        ) : (
                          <>
                            <Link to="/Profile">
                              <i className="fa fa-user"></i>
                            </Link>
                            <button
                              className="btn-warning"
                              onClick={handleLogout}
                            >
                              Logout
                            </button>
                          </>
                        )}
                      </li>
                    </ul>
                  </nav>
                  <div className="nav-right search-switch">
                    <i className="icon_search"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Header End */}
    </div>
  );
}

export default Header;
