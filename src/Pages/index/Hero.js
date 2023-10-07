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
  const [hotels, setHotels] = useState([]);
  const [isRoomsAvailable, setIsRoomsAvailable] = useState(true);
  console.log("hotels", hotels);

  useEffect(() => {
    // Fetch all hotels from the API when the component mounts
    axios
      .get(`https://64bbac6a7b33a35a4446905c.mockapi.io/hotels`)
      .then((response) => {
        const hotelData = response.data;
        setHotels(hotelData);
      })
      .catch((error) => {
        console.error("Error fetching hotel data: ", error);
      });
  }, []);

  useEffect(() => {
    for (const hotel of hotels) {
      try {
        axios
          .get(
            `https://64bbac6a7b33a35a4446905c.mockapi.io/hotels/${hotel.id}/rooms`
          )
          .then((response) => {
            setRoomDetails(response.data);
          });
      } catch (error) {
        console.error("Error fetching room data: ", error);
      }
    }
  }, []);
  console.log('roomDetails',roomDetails);


  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    if (month < 10) {
      month = `0${month}`;
    }

    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  };

  const booking = () => {
    if (checkOut === null) {
      Swal.fire("Don't Forget!", "You Must Fill CheckOut Field", "warning");
    } else if (checkIn === null) {
      Swal.fire("Don't Forget!", "You Must Fill CheckIn Field", "warning");
    } else {
      let  totalAvailability=[];
      roomDetails.forEach((room) => {
        if (room.availability) {
          totalAvailability += room.availability; // Accumulate the availability
        }
      });
      
      setAvailability(totalAvailability); 
      
        // Automatically clear date inputs
          setCheckIn(null);
          setCheckOut(null);
   
    }
  };

  const filterAvailableRooms = () => {
    if (!checkIn || !checkOut) {
      return roomDetails;
    }

    return roomDetails.filter((room) => {
      return !room.bookings.some((booking) => {
        return checkOut >= booking.checkIn && checkIn <= booking.checkOut;
      });
    });
  };
  console.log('availability',availability);


  const availableRooms = filterAvailableRooms();
  console.log('availableRooms',availableRooms);


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
                <Link to="/about" className="primary-btn">Discover Now</Link>
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
                      <label htmlFor="date-out">Check Out:</label>
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
                  Check Availability
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
            </div>
          </div>
        </div>
        <div className="hero-slider">
          <div
            className="hs-item set-bg"
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/asset/img/hero/hero-1.jpg)`,
            }}
          ></div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
