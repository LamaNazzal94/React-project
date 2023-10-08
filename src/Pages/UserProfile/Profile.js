import React, { useState, useEffect } from "react";
import axios from "axios";
import { FormField } from "semantic-ui-react";
import { Form } from 'react-bootstrap';

function RoomDetails({ hotelid, roomId, onClose }) {
  const [room, setRoom] = useState(null);

  useEffect(() => {
    try {
      axios
        .get(
          `https://64bbac6a7b33a35a4446905c.mockapi.io/hotels/1/rooms/1`
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
          <div className="col-lg-12">
            <p className="card-text">Capacity: {room.capacity}</p>
            <p className="card-text">Rating: {renderStars(room.rating)}</p>
          </div>
        </div>
        <br/>
        <div className="text-right">
          <button className="btn-booking sm-btn" onClick={() => onClose()}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

function Profile() {
  const [availability, setavailability] = useState(true);

  const [user, setUser] = useState({});
  const [books, setBooks] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [editUser, setEditUser]=useState({});//----------------for update user------------------------
  const [users, setUsers] = useState({});//----------------for update user------------------------
  const [selectedRoom, setSelectedRoom] = useState(null);
  
  const userId=+localStorage.getItem("userid");

  // const userId = 1; // Change this back to your localStorage approach if needed

  useEffect(() => {
    // Fetch user data from the API when the component mounts
    axios
      .get(`https://64c259d9eb7fd5d6ebcfae46.mockapi.io/user/${userId}`)
      .then((response) => {
        setUser(response.data);
        setEditUser({ ...response.data });
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
          (booking) => booking.user_id === +userId
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

  const deleteBook = (id,roomid,hotelid) => {
    axios
      .delete(`https://651d606a44e393af2d59a7e0.mockapi.io/booking/${id}`)
      .then(() => {
        const updatedBooks = books.filter((book) => book.id !== id);
        setBooks(updatedBooks);
        availabilityy(roomid, hotelid);
      })
      .catch((error) => console.error("Error deleting booking:", error));
  };
  const availabilityy = (hotelid,id) => {
    axios.put(
      `https://64bbac6a7b33a35a4446905c.mockapi.io/hotels/${hotelid}/rooms/${id}`,
      {
        availability,
      }
    );
  };

  //------------------------------------update user----------------------------------------
   

  // const updateUser = () => {
  //   axios
  //     .put(`https://64c259d9eb7fd5d6ebcfae46.mockapi.io/user/${editUser.id}`, editUser)
  //     .then(() => {
  //       // Update the edited post in the 'posts' state with the new values
  //       setUsers((prevUsers) =>
  //       prevUsers.map((user) =>
  //           user.id === editUser.id ? { ...user, ...editUser } : user
  //         )
  //       );
  //       setEditUser({}); // Exit edit mode by setting editPost to an empty object
  //     })
  //     .catch((error) => {
  //       console.error("Error updating User: ", error);
  //     });
  
  // };


  const updateUser = () => {
    axios
      .put(
        `https://64c259d9eb7fd5d6ebcfae46.mockapi.io/user/${editUser.id}`,
        editUser
      )
      .then(() => {
        setUser({ ...editUser }); // Update the user object with edited data
      })
      .catch((error) => {
        console.error("Error updating User: ", error);
      });
  };
//---------------------------------------------------------------------------------------
  return (
    <section className="contact-section spad">
      <div className="container">
        {/* User Info Row */}
        <div className="row">
          <div className="col-lg-3">
            <div className="image_div">
              <img
                className="profile_image"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfYRAWqd6TQyF2T7q3XretY6PCSDQVBnPhYg&usqp=CAU"
              />
            </div>

            <div className="contact-text">
              <div className="contact-text" style={{ paddingTop: "50px" }}>
                <h3>
                  {user.first_name} {user.last_name}
                </h3>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
              </div>
            </div>
          </div>

          <div class="col-lg-7 offset-lg-1">
            <Form action="#" class="contact-form">
              <div class="row">
                <div class="col-lg-6">
                  <FormField>
                    <input
                      type="text"
                      className="input_Form"
                      placeholder="First Name"
                      value={editUser.first_name}
                      defaultValue={editUser.first_name}
                      onChange={(e) =>
                        setEditUser({
                          ...editUser,
                          first_name: e.target.value,
                        })
                      }
                    />
                  </FormField>
                </div>
                <div class="col-lg-6">
                  <FormField>
                    <input
                      type="text"
                      className="input_Form"
                      placeholder="Last Name"
                      value={editUser.last_name}
                      defaultValue={editUser.last_name}
                      onChange={(e) =>
                        setEditUser({
                          ...editUser,
                          last_name: e.target.value,
                        })
                      }
                    />
                  </FormField>
                </div>
                <div class="col-lg-12">
                  <FormField>
                    <input
                      type="number"
                      className="input_Form"
                      placeholder="Phone Number"
                      value={editUser.phone}
                      defaultValue={editUser.phone}
                      onChange={(e) =>
                        setEditUser({
                          ...editUser,
                          phone: e.target.value,
                        })
                      }
                    />
                  </FormField>
                </div>
                <div class="col-lg-12">
                  <FormField>
                    <input
                      type="email"
                      className="input_Form"
                      placeholder={user.email}
                      value={editUser.email}
                      defaultValue={editUser.email}
                      onChange={(e) =>
                        setEditUser({
                          ...editUser,
                          email: e.target.value,
                        })
                      }
                    />
                  </FormField>
                </div>

                <div class="col-lg-12">
                  <FormField>
                    <input
                      type="password"
                      className="input_Form"
                      placeholder="Your password"
                      value={editUser.password}
                      defaultValue={editUser.password}
                      onChange={(e) =>
                        setEditUser({
                          ...editUser,
                          password: e.target.value,
                        })
                      }
                    />
                  </FormField>
                </div>
                <div class="col-lg-12">
                  <button
                    className="button_form"
                    type="submit"
                    onClick={updateUser}>
                    Update Now
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </div>
        <br></br>

        {/* Booking Table and Room Details Row */}
        <div className="row">
          {/* Left Column - Booking Table */}
          {loaded && (
            <div className="col-lg-8" style={{ marginTop: "60px" }}>
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
                          return (
                            <td key={hotel.id} roomid={book.roomid}>
                              {hotel.hotel_name}
                            </td>
                          );
                        }
                        return null; // Return null for non-matching hotels
                      })}
                      <td>{book.checkIn}</td>
                      <td>{book.checkOut}</td>
                      <td>
                        <button
                          className="btn btn-danger mbtn"
                          onClick={() =>
                            deleteBook(book.id, book.hotelid, book.roomid)
                          }>
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
                          }>
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
          {selectedRoom && (
            <div className="col-lg-4">
              <RoomDetails
                hotelid={selectedRoom.hotelid}
                roomId={selectedRoom.roomId}
                onClose={() => setSelectedRoom(null)}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Profile;
