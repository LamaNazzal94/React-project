import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing

function RoomDetails() {
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
                  <Link to="/">Home</Link> {/* Use Link for Home */}
                  <span>Rooms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Breadcrumb Section End */}

      {/* Room Details Section Begin */}
      <section className="room-details-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="room-details-item">
                {/* Update image path */}
                <img src="/asset/img/room/room-details.jpg" alt="" />
                <div className="rd-text">
                  <div className="rd-title">
                    <h3>Premium King Room</h3>
                    <div className="rdt-right">
                      <div className="rating">
                        <i className="icon_star"></i>
                        <i className="icon_star"></i>
                        <i className="icon_star"></i>
                        <i className="icon_star"></i>
                        <i className="icon_star-half_alt"></i>
                      </div>
                      <a href="#">Booking Now</a>
                    </div>
                  </div>
                  <h2>159$<span>/Pernight</span></h2>
                  <table>
                    <tbody>
                      <tr>
                        <td className="r-o">Size:</td>
                        <td>30 ft</td>
                      </tr>
                      <tr>
                        <td className="r-o">Capacity:</td>
                        <td>Max person 5</td>
                      </tr>
                      <tr>
                        <td className="r-o">Bed:</td>
                        <td>King Beds</td>
                      </tr>
                      <tr>
                        <td className="r-o">Services:</td>
                        <td>Wifi, Television, Bathroom,...</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="f-para">
                    {/* Add your room details */}
                  </p>
                  <p>
                    {/* Add more room details */}
                  </p>
                </div>
              </div>
              <div className="rd-reviews">
                <h4>Reviews</h4>
                <div className="review-item">
                  <div className="ri-pic">
                    <img src="/asset/img/room/avatar/avatar-1.jpg" alt="" />
                  </div>
                  <div className="ri-text">
                    <span>27 Aug 2019</span>
                    <div className="rating">
                      <i className="icon_star"></i>
                      <i className="icon_star"></i>
                      <i className="icon_star"></i>
                      <i className="icon_star"></i>
                      <i className="icon_star-half_alt"></i>
                    </div>
                    <h5>Brandon Kelley</h5>
                    <p>
                      {/* Add review text */}
                    </p>
                  </div>
                </div>
                <div className="review-item">
                  <div className="ri-pic">
                    <img src="/asset/img/room/avatar/avatar-2.jpg" alt="" />
                  </div>
                  <div className="ri-text">
                    <span>27 Aug 2019</span>
                    <div className="rating">
                      <i className="icon_star"></i>
                      <i className="icon_star"></i>
                      <i className="icon_star"></i>
                      <i className="icon_star"></i>
                      <i className="icon_star-half_alt"></i>
                    </div>
                    <h5>Brandon Kelley</h5>
                    <p>
                      {/* Add review text */}
                    </p>
                  </div>
                </div>
              </div>
              <div className="review-add">
                <h4>Add Review</h4>
                <form action="#" className="ra-form">
                  <div className="row">
                    <div className="col-lg-6">
                      <input type="text" placeholder="Name*" />
                    </div>
                    <div className="col-lg-6">
                      <input type="text" placeholder="Email*" />
                    </div>
                    <div className="col-lg-12">
                      <div>
                        <h5>Your Rating:</h5>
                        <div className="rating">
                          <i className="icon_star"></i>
                          <i className="icon_star"></i>
                          <i className="icon_star"></i>
                          <i className="icon_star"></i>
                          <i className="icon_star-half_alt"></i>
                        </div>
                      </div>
                      <textarea placeholder="Your Review"></textarea>
                      <button type="submit">Submit Now</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="room-booking">
                <h3>Your Reservation</h3>
                <form action="#">
                  <div className="check-date">
                    <label htmlFor="date-in">Check In:</label>
                    <input type="text" className="date-input" id="date-in" />
                    <i className="icon_calendar"></i>
                  </div>
                  <div className="check-date">
                    <label htmlFor="date-out">Check Out:</label>
                    <input type="text" className="date-input" id="date-out" />
                    <i className="icon_calendar"></i>
                  </div>
                  <div className="select-option">
                    <label htmlFor="guest">Guests:</label>
                    <select id="guest">
                      <option value="">3 Adults</option>
                    </select>
                  </div>
                  <div className="select-option">
                    <label htmlFor="room">Room:</label>
                    <select id="room">
                      <option value="">1 Room</option>
                    </select>
                  </div>
                  <button type="submit">Check Availability</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Room Details Section End */}
    </div>
  );
}

export default RoomDetails;
