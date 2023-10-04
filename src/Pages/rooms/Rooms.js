import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import axios from "axios";


function Rooms() {
const [rooms,setRooms]=useState([]);

useEffect(()=>{
axios.get(`https://64bbac6a7b33a35a4446905c.mockapi.io/hotels/1/rooms`).then((response)=>{
    setRooms(response.data)
})},[])




  return (
    <div>
      {/* Breadcrumb Section Begin */}
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
      {/* Breadcrumb Section End */}

      {/* Rooms Section Begin */}
      <section className="rooms-section spad">
        <div className="container">
          <div className="row">
            {rooms.map((room) => (
              <div className="col-lg-4 col-md-6">
                <div className="room-item">
                  <img src={room.image} alt="" />
                  <div className="ri-text">
                    <h4>{room.room_name} </h4>
                    <h3>
                      {room.price}
                      <span>/Pernight</span>
                    </h3>
                    <table>
                      <tbody>
                        <tr>
                          <td className="r-o">Size:</td>
                          <td>30 ft</td>
                        </tr>
                        <tr>
                          <td className="r-o">Capacity:</td>
                          <td>Max persion {room.capacity}</td>
                        </tr>
                        <tr>
                          <td className="r-o">Bed:</td>
                          <td> {room.type} </td>
                        </tr>
                        <tr>
                          <td className="r-o">Services:</td>
                          <td>Wifi, Television, Bathroom,...</td>
                        </tr>
                      </tbody>
                    </table>
                    <Link
                      to={`room-details/${room.hotelId}/${room.id}`}
                      className="primary-btn">
                      More Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            <div className="col-lg-12">
              <div className="room-pagination">
                <a href="#">1</a>
                <a href="#">2</a>
                <a href="#">
                  Next <i className="fa fa-long-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Rooms Section End */}
    </div>
  );
}

export default Rooms;
