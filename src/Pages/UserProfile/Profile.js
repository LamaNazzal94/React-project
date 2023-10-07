import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState({});
  const [books, setBooks] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [hotel, setHotel] = useState([]);
  const [loaded, setloadeds] = useState(false);
  // const userId = localStorage.getItem("userid");
  const userId = 1;

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
  }, []);

  useEffect(() => {
    // Fetch booking data from the API when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://651d606a44e393af2d59a7e0.mockapi.io/booking`
        );
        const userbook = response.data.filter(
          (booking) => booking.userid == userId
        );
        setBooks(userbook);
        setloadeds(true);
      } catch (error) {
        console.error("Error fetching booking data: ", error);
      }
    };

    fetchData();
  }, []);

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
    // Fetch room data for each booking
    const fetchRoomData = async () => {
      const roomData = [];
      for (const book of books) {
        try {
          const response = await axios.get(
            `https://64bbac6a7b33a35a4446905c.mockapi.io/hotels/${parseInt(book.hotelid)}/rooms`
          );
          roomData.push(response.data);
        } catch (error) {
          console.error("Error fetching room data: ", error);
          roomData.push([]);
        }
      }
      setRooms(roomData);
    };

    fetchRoomData();
  }, []);

  // console.log(books);

  const deleteBook = (id) => {
    axios
      .delete(`https://651d606a44e393af2d59a7e0.mockapi.io/booking/${id}`)
      .then(() => {
        const updatedBooks = books.filter((book) => book.id !== id);
        setBooks(updatedBooks);
      })
      .catch((error) => console.error("Error deleting booking:", error));
  };
  // console.log(books.name);

  console.log('book',books);

  return (
    <section className="contact-section spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="contact-text">
              <table>
                <tbody>
                  <img src={user.image} width={"200px"} height={"200px"}></img>

                  <tr>
                    <td>
                      <h2>
                        {user.first_name} {user.last_name}
                      </h2>
                    </td>
                  </tr>
                  <tr>
                    <td className="">Email: {user.email}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {loaded && (
            <div className="col-lg-7 offset-lg-1">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Hotel</th>
                    <th>Room</th>
                    <th>Price</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {/* <p>{(JSON.stringify(books, null, 2))}</p> */}
                  {/* <p>{books[0].checkIn}</p> */}
                  

                  {books.map((book) => {
                  let hotel = hotels.filter(
                    (item) => item.id!= book.hotelid
                    );
                    // if (hotel.length != 0) {
                      
                   <p>{(JSON.stringify(hotel, null, 2))}</p> 
                  
                  


                      let room = rooms.filter(
                        (item2) => item2.id != book.roomid
                      );

                      //  <p>{hotel}</p>

                      return (
                        <tr key={book.id}>
                          <td>{hotel ? hotel.name : "Hotel Not Found"}</td>
                          <td>{room ? room.room_name : "Room Not Found"}</td>
                          <td>{room ? room.price : "Room Not Found"}</td>
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
                            <Link
                              to={`rooms/${book.hotelid}/room-details/${book.hotelid}/${book.roomid}`}
                            >
                              Show Details
                            </Link>
                          </td>
                        </tr>
                      );
                    // }
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Profile;
