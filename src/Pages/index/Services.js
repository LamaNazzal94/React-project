import React from "react";
import { useTranslation } from "react-i18next";

function Services() {
  const { t, i18n } = useTranslation();

  return (
    <section className="services-section spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <span>{t("wedo")}</span>
              <h2>{t("services")}</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-sm-6">
            <div className="service-item">
              <i
                className="flaticon-036-parking"
                aria-label="Travel Plan Icon"
              ></i>
              <h4>{t("serv1")}</h4>
              <p>{t("serv11")}</p>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6">
            <div className="service-item">
              <i
                className="flaticon-033-dinner"
                aria-label="Catering Service Icon"
              ></i>
              <h4>{t("serv2")}</h4>
              <p>{t("serv22")}</p>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6">
            <div className="service-item">
              <i className="flaticon-026-bed" aria-label="Babysitting Icon"></i>
              <h4>{t("serv3")}</h4>
              <p>{t("serv33")}</p>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6">
            <div className="service-item">
              <i className="flaticon-024-towel" aria-label="Laundry Icon"></i>
              <h4>{t("serv4")}</h4>
              <p>{t("serv44")}</p>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6">
            <div className="service-item">
              <i
                className="flaticon-044-clock-1"
                aria-label="Hire Driver Icon"
              ></i>
              <h4>{t("serv5")}</h4>
              <p>{t("serv55")}</p>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6">
            <div className="service-item">
              <i
                className="flaticon-012-cocktail"
                aria-label="Bar & Drink Icon"
              ></i>
              <h4>{t("serv6")}</h4>
              <p>{t("serv66")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
