import React from 'react';
import { useTranslation } from "react-i18next";


function About() {
    const { t, i18n } = useTranslation();

  return (
    <section className="aboutus-section spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="about-text">
              <div className="section-title">
                <span>{t("about")} </span>
                <h2>{t("sonatitle")}</h2>
              </div>
              <p className="f-para">{t("sona")}</p>
              {/* <p className="s-para">So when it comes to booking the perfect hotel, vacation rental, resort,
                apartment, guest house, or tree house, we’ve got you covered.</p> */}
              {/* <a href="/read-more-link" className="primary-btn about-btn">Read More</a> */}
            </div>
          </div>
          <div className="col-lg-6">
            <div className="about-pic">
              <div className="row">
                <div className="col-sm-6">
                  <img src="asset/img/about/about-1.jpg" alt="About Image 1" />
                </div>
                <div className="col-sm-6">
                  <img src="asset/img/about/about-2.jpg" alt="About Image 2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
