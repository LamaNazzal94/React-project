import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"; // Import Link for routing
import axios from "axios";
import Preloader from "./Preloader";



function Rooms({availableRooms }) {
    console.log('Ahmad availableRooms',availableRooms)
  // Check if array is defined and not empty
  const [rooms, setRooms] = useState([]);
//   const { jsonData } = useParams();
//   let data = JSON.parse(jsonData);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of items to display per page
  
  useEffect(() => {
    axios
      .get(
        `https://6521236ba4199548356cd771.mockapi.io/all_rooms`
      )
      .then((response) => {
        setRooms(response.data);
        setIsLoading(false);
      });
  }, []);

  // Calculate the range of items to display for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rooms.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page changes
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Render pagination UI
  const renderPageNumbers = Array(Math.ceil(rooms.length / itemsPerPage))
    .fill(0)
    .map((_, i) => (
      <a
        key={i + 1}
        href="#"
        className={i + 1 === currentPage ? "active activepage" : ""}
        onClick={() => handlePageChange(i + 1)}
      >
        {i + 1}
      </a>
    ));
    
    let displayarray=[];
  if (!availableRooms || availableRooms.length === 0) {
   
    console.log('sara');
    console.log('array from Room',availableRooms);
    displayarray=currentItems;

   } else{
    displayarray=availableRooms;

    }

    
    return (
      <div>
        {isLoading ? (
          <Preloader />
        ) : (
          <div>
            <div className="breadcrumb-section">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="breadcrumb-text">
                      <h2>Our Rooms</h2>
                      <div className="bt-option">
                        <Link to="/" className="primary-btn">
                          Home
                        </Link>
                        <span>Rooms</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <section className="rooms-section spad">
              <div className="container">
                <div className="row">
                  {displayarray.map((room) => (
                    <div key={room.id} className="col-lg-4 col-md-6">
                      <div
                        className={`room-item ${
                          room.availability ? "" : "not-available"
                        }`}>
                        <img src={room.image} alt="" />

                        <div
                          className={`ri-text ${
                            room.availability ? "" : "nigar"
                          }`}>
                          <h4>{room.room_name}</h4>
                          <h3>
                            {room.price}
                            <span>/Per night</span>
                          </h3>
                          <table>
                            <tbody>
                              <tr>
                                <td className="r-o">Size:</td>
                                <td>30 ft</td>
                              </tr>
                              <tr>
                                <td className="r-o">Capacity:</td>
                                <td>Max person {room.capacity}</td>
                              </tr>
                              <tr>
                                <td className="r-o">Bed:</td>
                                <td>{room.type}</td>
                              </tr>
                              <tr>
                                <td className="r-o">Services:</td>
                                <td>Wifi, Television, Bathroom,...</td>
                              </tr>
                            </tbody>
                          </table>

                          {room.availability ? (
                            <Link
                              to={`${room.hotelId}/room-details/${room.hotelId}/${room.id}`}
                              className="primary-btn">
                              More Details
                            </Link>
                          ) : (
                            <p className="primary-btn notav ">
                              Not Available 
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="col-lg-12">
                  <div className="room-pagination">
                    <a
                      href="#"
                      onClick={() => handlePageChange(currentPage - 1)}
                      className={currentPage === 1 ? "disabled" : ""}>
                      Previous
                    </a>
                    {renderPageNumbers}
                    <a
                      href="#"
                      onClick={() => handlePageChange(currentPage + 1)}
                      className={
                        currentPage === Math.ceil(rooms.length / itemsPerPage)
                          ? "disabled"
                          : ""
                      }>
                      Next
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    );
 
}

export default Rooms
