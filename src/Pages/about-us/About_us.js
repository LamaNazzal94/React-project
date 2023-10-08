import React from 'react';
import { Link } from 'react-router-dom'; // Import Link and Route
import { Route } from 'react-router-dom';
import { useTranslation } from "react-i18next";


function AboutUs() {
    const { t, i18n } = useTranslation();

  return (
    <div>
      {/* Breadcrumb Section Begin */}
      <div className="breadcrumb-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text">
                <h2>{t("about")}</h2>
                <div className="bt-option">
                  <Link to="/" className="primary-btn">
                    {t("home")}
                  </Link>
                  <span>{t("about")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Breadcrumb Section End */}

      {/* About Us Page Section Begin */}
      <section className="aboutus-page-section spad">
        <div className="container">
          <div className="about-page-text">
            <div className="row">
              <div className="col-lg-6">
                <div className="ap-title">
                  <h2>{t("welcome")}</h2>
                  <p>{t("aboutpara")}</p>
                </div>
              </div>
              <div className="col-lg-5 offset-lg-1">
                <ul className="ap-services">
                  <li>
                    <i className="icon_check"></i> {t("offer1")}
                  </li>
                  <li>
                    <i className="icon_check"></i> {t("offer2")}
                  </li>
                  <li>
                    <i className="icon_check"></i> {t("offer3")}
                  </li>
                  <li>
                    <i className="icon_check"></i> {t("offer4")}
                  </li>
                  <li>
                    <i className="icon_check"></i> {t("offer5")}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="about-page-services">
            <div className="row">
              <div className="col-md-4">
                <div
                  className="ap-service-item set-bg"
                  style={{
                    backgroundImage: "url(asset/img/about/about-p1.jpg)",
                  }}
                >
                  <div className="api-text">
                    <h3>{t("aboutcate1")}</h3>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div
                  className="ap-service-item set-bg"
                  style={{
                    backgroundImage: "url(asset/img/about/about-p2.jpg)",
                  }}
                >
                  <div className="api-text">
                    <h3>{t("aboutcate2")}</h3>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div
                  className="ap-service-item set-bg"
                  style={{
                    backgroundImage: "url(asset/img/about/about-p3.jpg)",
                  }}
                >
                  <div className="api-text">
                    <h3>{t("aboutcate3")}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* About Us Page Section End */}

      {/* Gallery Section Begin */}
      <section className="gallery-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <span>{t("gallery")}</span>
                <h2>{t("descover")}</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div
                className="gallery-item set-bg"
                style={{
                  backgroundImage: "url(asset/img/gallery/gallery-1.jpg)",
                }}
              >
                <div className="gi-text">
                  <h3>Room Luxury</h3>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div
                    className="gallery-item set-bg"
                    style={{
                      backgroundImage: "url(asset/img/gallery/gallery-3.jpg)",
                    }}
                  >
                    <div className="gi-text">
                      <h3>Room Luxury</h3>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div
                    className="gallery-item set-bg"
                    style={{
                      backgroundImage: "url(asset/img/gallery/gallery-4.jpg)",
                    }}
                  >
                    <div className="gi-text">
                      <h3>Room Luxury</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div
                className="gallery-item large-item set-bg"
                style={{
                  backgroundImage: "url(asset/img/gallery/gallery-2.jpg)",
                }}
              >
                <div className="gi-text">
                  <h3>Room Luxury</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Gallery Section End */}
    </div>
  );
}

export default AboutUs;
