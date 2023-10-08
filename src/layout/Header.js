import React, { useState } from "react";

import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Header() {
    const { t, i18n } = useTranslation();

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
      {/* <div id="preloder">
        <div className="loader"></div>
      </div> */}

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
                  <a
                    onClick={() => {
                      i18n.changeLanguage("ar");
                    }}>
                    Zi
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      i18n.changeLanguage("en");
                    }}>
                    Fr
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* <a href="#" className="bk-btn"> */}
          <Link to="/rooms" className="bk-btn">
            {t("title")}
          </Link>
          {/* </a> */}
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
                    <i className="fa fa-phone"></i> (07) 985 40 904
                  </li>
                  <li>
                    <i className="fa fa-envelope"></i> Sona@gmail.com
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
                  <Link to="/rooms" className="bk-btn">
                    {t("title")}
                  </Link>
                  <div className="language-option">
                    {/* <img src="asset/img/flag.jpg" alt="" /> */}
                    <span>
                      EN <i className="fa fa-angle-down"></i>
                    </span>
                    <div className="flag-dropdown">
                      <ul>
                        {i18n.language == "en" && (
                          <li
                            onClick={() => {
                              i18n.changeLanguage("ar");
                            }}>
                            <a
                              onClick={() => {
                                i18n.changeLanguage("ar");
                              }}>
                              <img src="https://s3.eu-west-2.amazonaws.com/qmasters/flags/png/jordan/flag-round-250.png"></img>{" "}
                              AR
                            </a>
                          </li>
                        )}
                        {i18n.language == "ar" && (
                          <li
                            onClick={() => {
                              i18n.changeLanguage("en");
                            }}>
                            <a
                              onClick={() => {
                                i18n.changeLanguage("en");
                              }}>
                              EN
                            </a>
                          </li>
                        )}
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
                        <Link to="/">{t("home")}</Link>
                      </li>
                      <li className={currentPath === "/rooms" ? "active" : ""}>
                        <Link to="/rooms">{t("rooms")} </Link>
                      </li>
                      <li className={currentPath === "/about" ? "active" : ""}>
                        <Link to="/about">{t("about")}</Link>
                      </li>

                      <li
                        className={currentPath === "/contact" ? "active" : ""}>
                        <Link to="/contact">{t("contact")}</Link>
                      </li>
                      <li>
                        {check == null || check === "false" ? (
                          <>
                            <Link to="/CrudApp">
                              <button className="btn-cust">{t("login")}</button>
                            </Link>
                          </>
                        ) : (
                          <>
                            <Link to="/Profile">
                              <i className="fa fa-user"></i>
                            </Link>
                            <button
                              className="btn-cust btn-sm"
                              onClick={handleLogout}>
                              {t("logout")}
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
