import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import axios from "axios";
import { Button, Form, Table } from "semantic-ui-react";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";



function Hero() {
  
const { t, i18n } = useTranslation();


  return (
    <div>
      <section className="hero-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="hero-text">
                <h1>Sona A Luxury Hotel</h1>
                <p>{t("sliderdes")}</p>
                <Link to="/about" className="primary-btn">
                  {t("des")}
                </Link>
              </div>
            </div>
            {/* <div className="col-xl-4 col-lg-5 offset-xl-2 offset-lg-1">
              <div className="booking-form">
                <h3>{t("book")}</h3>
                <Form className="create-form">
                  <Form.Field>
                    <div className="check-date">
                      <label htmlFor="date-in">{t("checkin")}:</label>
                      <input
                        type="date"
                        className="date-input"
                        name="checkIn"
                        id="date-in"
                        min={getCurrentDate()}
                        value={checkIn}
                        onChange={(e) => {
                          setCheckIn(e.target.value);
                        }}
                      />
                    </div>
                  </Form.Field>
                  <Form.Field>
                    <div className="check-date">
                      <label htmlFor="date-out">{t("checkout")}:</label>
                      <input
                        type="date"
                        className="date-input"
                        name="checkOut"
                        id="date-out"
                        min={getCurrentDate()}
                        value={checkOut}
                        onChange={(e) => {
                          setCheckOut(e.target.value);
                        }}
                      />
                    </div>
                  </Form.Field>
                </Form>
                <Button className="btn-cust" onClick={booking}>
                  {t("checkava")}
                </Button>

                {availability ? (
                  <div>
                    <Table>
                      <thead>
                        <tr>
                          <th>Room name</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {availableRooms.map((room) => (
                          <tr key={room.id}>
                            <td>{room.room_name}</td>
                            <td>
                              <Link
                                to={`/rooms/${room.hotelId}/room-details/${room.hotelId}/${room.id}`}
                              >
                                Show details
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                ) : isRoomsAvailable ? null : (
                  <div>No rooms available for the selected dates.</div>
                )}
              </div>
            </div> */}
          </div>
        </div>
        <div className="hero-slider">
          <div
           
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/asset/img/hero/hero-1.jpg)`,height:"90%"
            }}
          ></div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
