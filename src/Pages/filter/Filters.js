// Filter.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

function Filter({ onFilter }) {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [roomDetails, setRoomDetails] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [price, setPrice] = useState("");
  const [book, setBook] = useState([]);

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

  useEffect(() => {
    axios
      .get(`https://64bbac6a7b33a35a4446905c.mockapi.io/hotels`)
      .then((response) => {
        const hotelData = response.data;
        setHotels(hotelData);
      })
      .catch((error) => {
        console.error("Error fetching hotel data: ", error);
      });

    axios
      .get(`https://651d606a44e393af2d59a7e0.mockapi.io/booking`)
      .then((response) => {
        const bookData = response.data;
        setBook(bookData);
      })
      .catch((error) => {
        console.error("Error fetching hotel data: ", error);
      });

    axios
      .get(`https://6521236ba4199548356cd771.mockapi.io/all_rooms`)
      .then((response) => {
        const roomData = response.data;
        setRoomDetails(roomData);
      })
      .catch((error) => {
        console.error("Error fetching Rooms data: ", error);
      });
  }, []);

  const filterRooms = () => {
    let filteredRooms = [...roomDetails];

    // Filter by location
    if (location) {
      const hotel = hotels.find((h) => h.location === location);
      filteredRooms = filteredRooms.filter((room) => room.hotelId === hotel.id);
      setLocation("");
    }

    // Filter by capacity
    if (capacity) {
      const [minCapacity, maxCapacity] = capacity.split("-");
      filteredRooms = filteredRooms.filter(
        (room) =>
          parseInt(room.capacity) >= parseInt(minCapacity) &&
          parseInt(room.capacity) <= parseInt(maxCapacity)
      );
      setCapacity("");
    }

    // Filter by price
    if (price) {
      const [minPrice, maxPrice] = price.split("-");
      filteredRooms = filteredRooms.filter(
        (room) =>
          parseInt(room.price) >= parseInt(minPrice) &&
          parseInt(room.price) <= parseInt(maxPrice)
      );
      setPrice("");
    }
     const selectedCheckOut = new Date(checkOut);

     console.log(selectedCheckOut);
 if (checkIn && checkOut) {
   filteredRooms = filteredRooms.filter((room) => {
     // Check if the room is available for the selected dates
     const isRoomAvailable = !book.some((booking) => {
       const bookingCheckIn = new Date(booking.checkIn);
       const bookingCheckOut = new Date(booking.checkOut);
       const selectedCheckIn = new Date(checkIn);
       const selectedCheckOut = new Date(checkOut);

       // If there is a booking that conflicts with the selected date range, the room is not available
       return (
         !room.availability ||
         (room.id === booking.roomid &&
           !(
             selectedCheckIn >= bookingCheckOut ||
             selectedCheckOut <= bookingCheckIn
           ))
       );
     });

     return isRoomAvailable;
   });
 }


    return filteredRooms;
  };

  const handleFilterClick = () => {
    const filteredRooms = filterRooms();
    onFilter(filteredRooms);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12 col-lg">
          <div className="booking-form">
            <div className="row">
              <div className="col-md-10">
                <h3>Booking Your Hotel</h3>
              </div>
              <div className="col-md-2 text-right">
                <Button
                  className="btn-booking"
                  style={{ fontSize: "12px" }}
                  onClick={handleFilterClick}
                >
                  Check
                </Button>
              </div>
            </div>

            <Form className="create-form">
              <div className="form-row">
                <div className="form-group col-md-2">
                  <label htmlFor="date-in">Check In:</label>
                  <input
                    type="date"
                    className="form-control"
                    name="checkIn"
                    id="date-in"
                    min={getCurrentDate()}
                    value={checkIn || ""}
                    onChange={(e) => {
                      setCheckIn(e.target.value);
                    }}
                  />
                </div>
                <div className="form-group col-md-2">
                  <label htmlFor="date-out">Check Out:</label>
                  <input
                    type="date"
                    className="form-control"
                    name="checkOut"
                    id="date-out"
                    min={getCurrentDate()}
                    value={checkOut || ""}
                    onChange={(e) => {
                      setCheckOut(e.target.value);
                    }}
                  />
                </div>
           
                <div className="form-group col-md-2">
                  <label htmlFor="location">Location:</label>
                  <select
                    id="location"
                    className="form-control"
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                    }}
                  >
                    <option value="">Select a location</option>
                    {hotels.map((hotel) => (
                      <option key={hotel.id} value={hotel.location}>
                        {hotel.location}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-md-2">
                  <label htmlFor="price">Price:</label>
                  <select
                    id="price"
                    className="form-control"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  >

                    <option value="">Select a price</option>
                    <option value="100-200">100-200</option>
                    <option value="200-300">200-300</option>
                    <option value="300-400">300-400</option>
                    <option value="400-500">400-500</option>
                    <option value="500-600">500-600</option>
                    <option value="600-700">600-700</option>
                    <option value="700-800">700-800</option>
                    <option value="800-1000">800-1000</option>
                  </select>
                </div>
                <div className="form-group col-md-2">
                  <label htmlFor="capacity">capacity:</label>
                  <select
                    id="capacity"
                    className="form-control"
                    value={capacity}
                    onChange={(e) => {
                      setCapacity(e.target.value);
                    }}
                  >
                    <option value="">Select a capacity</option>
                    <option value="1-5">1-5</option>
                    <option value="5-10">5-10</option>
                    <option value="10-15">5-15</option>
                    <option value=">15"> More than 15</option>
                  </select>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
