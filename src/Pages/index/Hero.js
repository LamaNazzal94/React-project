import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Button, Form, Table } from "semantic-ui-react";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";



function Hero() {
    const { t, i18n } = useTranslation();

  const { hotelid, id } = useParams(); // Use useParams to get hotelid and id
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [availability, setAvailability] = useState(false);
  const [roomDetails, setRoomDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://64bbac6a7b33a35a4446905c.mockapi.io/hotels/1/rooms`
      )
      .then((response) => {
        setRoomDetails(response.data);
        setIsLoading(false);
      });
  }, [hotelid, id]);

  const booking = () => {
    if (checkOut === null) {
      Swal.fire("Don't Forget!", "You Must Fill CheckOut Field", "warning");
    } else if (checkIn === null) {
      Swal.fire("Don't Forget!", "You Must Fill CheckIn Field", "warning");
    } else {
      axios
        .get(`https://651d606a44e393af2d59a7e0.mockapi.io/booking`)
        .then((response) => {
          const availability = response.data.filter((item) => {
            return checkOut >= item.checkIn && checkIn <= item.checkOut;
          });
          setAvailability(availability.length > 0);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  // console.log(availability);
  console.log(roomDetails);


  return (
    <div>
      <section className="hero-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="hero-text">
                <h1>Sona A Luxury Hotel</h1>
                <p>
                  Here are the best hotel booking sites, including
                  recommendations for international travel and for finding
                  low-priced hotel rooms.
                </p>
                <a href="#" className="primary-btn">
                  Discover Now
                </a>
              </div>
            </div>
            <div className="col-xl-4 col-lg-5 offset-xl-2 offset-lg-1">
              <div className="booking-form">
                <h3>Booking Your Hotel</h3>
                <Form className="create-form">
                  <Form.Field>
                    <div className="check-date">
                      <label htmlFor="date-in">Check In:</label>

                      <input
                        type="date"
                        className="date-input"
                        name="checkIn"
                        id="date-in"
                        onChange={(e) => {
                          setCheckIn(e.target.value);
                        }}
                      />
                    </div>
                  </Form.Field>
                  <Form.Field>
                    <div className="check-date">
                      <label htmlFor="date-out">Check Out:</label>
                      <input
                        type="date"
                        className="date-input"
                        name="checkOut"
                        id="date-out"
                        onChange={(e) => {
                          setCheckOut(e.target.value);
                        }}
                      />
                    </div>
                  </Form.Field>
                </Form>
                <Button onClick={booking}>Check Availability</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-slider owl-carousel">
          <div
            className="hs-item set-bg"
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/asset/img/hero/hero-1.jpg)`,
            }}
          ></div>
          <div
            className="hs-item set-bg"
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/asset/img/hero/hero-2.jpg)`,
            }}
          ></div>
          <div
            className="hs-item set-bg"
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/asset/img/hero/hero-3.jpg)`,
            }}
          ></div>
        </div>
      </section>

      <div>
          <Table>
            <thead>
              <tr>
                <th>Room name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {roomDetails.map((room) => (
                <tr key={room.id}>
                  <td>{room.name}</td>
                  <td>
                    <Link to="/">Show details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      {/* {availability && (
        
      )} */}
    </div>
  );
}

export default Hero;
