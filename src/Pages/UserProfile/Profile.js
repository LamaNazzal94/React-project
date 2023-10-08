import React, { useState, useEffect } from "react";
import axios from "axios";

function RoomDetails({ hotelid, roomId, onClose }) {
  const [room, setRoom] = useState(null);

  useEffect(() => {
    try {
      axios
        .get(
          `https://64bbac6a7b33a35a4446905c.mockapi.io/hotels/${hotelid}/rooms/${roomId}`
        )
        .then((response) => {
          setRoom(response.data);
        });
    } catch (error) {
      console.error("Error fetching room data: ", error);
    }
  }, [hotelid, roomId]);

  // Function to render star icons based on the rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <i
          className="fa fa-star"
          key={i}
          style={{ color: "yellow", marginRight: "5px" }}
        ></i>
      );
    }
    return stars;
  };

  if (!room) {
    return <div>Loading room details...</div>;
  }

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">Room Details</h3>
        <div className="row">
          <div className="col-lg-6">
            <p className="card-text">Room Name: {room.room_name}</p>
            <p className="card-text">Room Type: {room.type}</p>
            <p className="card-text">Price: {room.price}</p>
          </div>
          <div className="col-lg-6">
            <img src={`${room.image}`} className="img-fluid" alt="Room" />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <p className="card-text">Capacity: {room.capacity}</p>
            <p className="card-text">Rating: {renderStars(room.rating)}</p>
          </div>
        </div>
        <div className="text-right">
          <button className="btn btn-default mbtn" onClick={() => onClose()}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

function Profile() {
  const [user, setUser] = useState({});
  const [books, setBooks] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  
  const userId=+localStorage.getItem("userid");

  // const userId = 1; // Change this back to your localStorage approach if needed

  useEffect(() => {
    // Fetch user data from the API when the component mounts
    axios
      .get(`https://64c259d9eb7fd5d6ebcfae46.mockapi.io/user/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data: ", error);
      });
  }, [userId]);

  useEffect(() => {
    // Fetch booking data from the API when the component mounts
    axios
      .get(`https://651d606a44e393af2d59a7e0.mockapi.io/booking`)
      .then((response) => {
        let userbook = response.data.filter(
          (booking) => booking.user_aid === userId
        );
        setBooks(userbook);
        setLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching booking data: ", error);
      });
  }, [userId]);

  useEffect(() => {
    // Fetch all hotels from the API when the component mounts
    axios
      .get(`https://64bbac6a7b33a35a4446905c.mockapi.io/hotels`)
      .then((response) => {
        setHotels(response.data);
      })
      .catch((error) => {
        console.error("Error fetching hotel data: ", error);
      });
  }, []);

  const deleteBook = (id) => {
    axios
      .delete(`https://651d606a44e393af2d59a7e0.mockapi.io/booking/${id}`)
      .then(() => {
        const updatedBooks = books.filter((book) => book.id !== id);
        setBooks(updatedBooks);
      })
      .catch((error) => console.error("Error deleting booking:", error));
  };

  return (
    <section className="contact-section spad">
      <div className="container">
        {/* User Info Row */}
        <div className="row">
          <div className="col-lg-5">
            <div className="contact-text">
              <div>
                <img
                  src={`${user.image}`}
                  width={"200px"}
                  height={"200px"}
                  alt={`${user.first_name}`}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="contact-text">
              <h3>
                {user.first_name} {user.last_name}
              </h3>
              <p>Email: {user.email}</p>
            </div>
          </div>
        </div>
        <br></br>

        {/* Booking Table and Room Details Row */}
        <div className="row">
          {/* Left Column - Booking Table */}
          {loaded && (
            <div className="col-lg-8">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Hotel</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Delete</th>
                    <th>More</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => (
                    <tr key={book.id}>
                      {hotels.map((hotel) => {
                        if (book.hotelid === hotel.id) {
                          return <td key={hotel.id}>{hotel.hotel_name}</td>;
                        }
                        return null; // Return null for non-matching hotels
                      })}
                      <td>{book.checkIn}</td>
                      <td>{book.checkOut}</td>
                      <td>
                        <button
                          className="btn btn-danger mbtn"
                          onClick={() => deleteBook(book.id)}
                        >
                          Delete
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-default mbtn"
                          onClick={() =>
                            setSelectedRoom({
                              hotelid: book.hotelid,
                              roomId: book.roomid,
                            })
                          }
                        >
                          More Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Right Column - Room Details */}
          {/* {selectedRoom && (
            <div className="col-lg-4">
              <RoomDetails
                hotelid={book.hotelid}
                roomId={book.roomId}
                onClose={() => setSelectedRoom(null)}
              />
            </div>
          )} */}
        </div>
      </div>
    </section>
  );
}

export default Profile;
