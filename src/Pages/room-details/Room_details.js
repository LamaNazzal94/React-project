import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"; // Import Link for routing
import axios from "axios";
import { Button, Checkbox, Form, FormField } from "semantic-ui-react";
import Popup from "reactjs-popup";
import Preloader from "../rooms/Preloader";
import Swal from "sweetalert2";
// import StripeContainer  from "../../payment/StripeContainer"

import Sweetalert from "../../sweetalert";

// https://64c259d9eb7fd5d6ebcfae46.mockapi.io/user
function RoomDetails() {
  let usersss=""
  const [userid, setUserid] = useState(localStorage.getItem("userid"));
  const [islogin, setlogin] = useState(localStorage.getItem("islogin"));
  const [isLoading, setIsLoading] = useState(true);
  const currentDate = new Date().toISOString().split("T")[0];

  const { id, hotelid } = useParams();
  const [roomid, setroomid] = useState(id);
  const [userreviewid, setuserreviewid] = useState(0);
  const [roomdetils, setRoomdetils] = useState([]);
  const [book, setBook] = useState([]);
  const [user, setUser] = useState([]);
  const [checkIn, setcheckIn] = useState(null);
  const [checkOut, setcheckOut] = useState(null);
  const [warning, setwarning] = useState(null);
  const [review, setReview] = useState([]);
  const [availability, setavailability] = useState(false);
  const [reviewerName, setreviewerName] = useState("");
  const [reviewText, setreviewText] = useState("");
  const category_id = hotelid;
  const [image, setuserimage] = useState("");
  const [detils, setdetils] = useState([]);
  const single_id = +id;
  const date = currentDate;
  const user_id = +localStorage.getItem("userid");
const [nights, setNights] = useState(
  (checkOut - checkIn) / (1000 * 60 * 60 * 24)
);
const [amount, setAmount] = useState(nights * roomdetils.price);
// Calculate the number of nights and amount when check-in or check-out dates change
const calculateNightsAndAmount = () => {
  if (checkIn && checkOut) {
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const nights = Math.ceil(
      (new Date(checkOut) - new Date(checkIn)) / millisecondsPerDay
    ); // Calculate nights

    // Calculate amount based on the number of nights and room price
    const amount = nights * roomdetils.price; // Replace 'roomdetils.price' with your actual room price

    return { nights, amount };
  } else {
    return { nights: 0, amount: 0 }; // Default values when dates are not selected
  }
};

// Update the nights and amount whenever checkIn or checkOut dates change
useEffect(() => {
  const { nights, amount } = calculateNightsAndAmount();
  setNights(nights);
  setAmount(amount);
}, [checkIn, checkOut]);
  useEffect(() => {
    setlogin(localStorage.getItem("islogin"));
  });
  useEffect(() => {
    axios
      .get("https://651d596844e393af2d599b52.mockapi.io/reviwe")
      .then((response) => {
        const filteredReview = response.data.filter(
          (item) => item.single_id == id 
        );
        console.log(filteredReview[0]);
        // JSON.stringify(item.single_id);

        setReview(filteredReview);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://64c259d9eb7fd5d6ebcfae46.mockapi.io/user")
      .then((response) => {
        setUser(response.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://64c259d9eb7fd5d6ebcfae46.mockapi.io/user")
      .then((response) => {
        setdetils(
          response.data.filter((e) => {
            return e.id == userid;
          })
        );
        setuserimage(detils.image);
        //  setreviewerName(detils.first_name);
      });
  }, []);
  useEffect(() => {
    axios
      .get(
        `https://64bbac6a7b33a35a4446905c.mockapi.io/hotels/${hotelid}/rooms/${id}`
      )
      .then((response) => {
        setRoomdetils(response.data);
        setIsLoading(false);
      });
  }, []);

  let booking = () => {
    if (islogin === "false") {
      {
        console.log(islogin);
      }
    } else if (checkOut == null) {
      Swal.fire("Don't Forget!", "You Must Fill  CheckOut Field", "warning");
    } else if (checkIn == null) {
      Swal.fire("Don't Forget!", "You Must Fill  CheckIn Field", "warning");
    } else {
      axios.post(`https://651d606a44e393af2d59a7e0.mockapi.io/booking`, {
        user_id,
        hotelid,
        checkIn,
        roomid,
        checkOut,
      });
      availabilityy();
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "Booking in successfully",
      });
    }
  };

  const availabilityy = () => {
    axios.put(
      `https://64bbac6a7b33a35a4446905c.mockapi.io/hotels/${hotelid}/rooms/${id}`,
      {
        availability,
      }
    );
  };

  const Addreview = () => {
    if (reviewerName == "") {
    } else if (reviewText == "") {
    } else {
      axios
        .post(`https://651d596844e393af2d599b52.mockapi.io/reviwe`, {
          reviewerName,
          reviewText,
          category_id,
          single_id,
          image,
          date,
          user_id,
        })
        .then((response) => {
          // Reset the state variables to empty values
          setreviewerName("");
          setreviewText("");
        });
      Swal.fire("thank you for review", "success");
    }
  };
  const filledStars = Math.round(roomdetils.rating);
  const emptyStars = 5 - filledStars;
  const stars = Array.from({ length: filledStars }, (_, index) => (
    <span key={index} className="star-filled">
      &#9733;
    </span>
  ));
  const emptyStar = <span className="star-empty">&#9734;</span>;
  return (
    <div>
      {isLoading ? ( // Show the Preloader component while isLoading is true
        <Preloader />
      ) : (
        <div>
          {/* Breadcrumb Section Begin */}
          <div className="breadcrumb-section">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="breadcrumb-text">
                    {/* {JSON.stringify(user[0].first_name, null, 2)} */}
                    <h2>Our Rooms</h2>
                    <div className="bt-option">
                      <Link to="/">Home</Link> {/* Use Link for Home */}
                      <a>Rooms</a>
                      <span>{roomdetils.room_name}</span>
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
                  <div className="room-details-item" key={roomdetils.id}>
                    {/* Update image path */}
                    <img src={`${roomdetils.image}`} alt="" />
                    <div className="rd-text">
                      <div className="rd-title">
                        <h3>{roomdetils.room_name}</h3>
                        <div className="rdt-right">
                          <div className="rating">
                            {stars}
                            {Array.from({ length: emptyStars }, (_, index) => (
                              <span key={index} className="star-empty">
                                {emptyStar}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <h2>
                        {roomdetils.price}$<span>/Pernight</span>
                      </h2>
                      <table>
                        <tbody>
                          {/* <tr>
                          <td className="r-o">Size:</td>
                          <td>30 ft</td>
                        </tr> */}
                          <tr>
                            <td className="r-o">Capacity:</td>
                            <td>Max person {roomdetils.capacity}</td>
                          </tr>
                          <tr>
                            <td className="r-o">Bed:</td>
                            <td>{roomdetils.type}</td>
                          </tr>
                          <tr>
                            <td className="r-o">Services:</td>
                            <td>Wifi, Television, Bathroom,...</td>
                          </tr>
                        </tbody>
                      </table>
                      <p className="f-para">{/* Add your room details */}</p>
                      <p>{/* Add more room details */}</p>
                    </div>
                  </div>

                  <div className="rd-reviews">
                    <h4>Reviews</h4>
                    {/* {JSON.stringify(review, null, 2)} */}
                    {/* {console.log(review)} */}
                    {review.map((rev) => (
                      <div key={rev} className="review-item">
                        <div className="ri-pic">
                          <img src={`${rev.image}`} alt="" />
                        </div>
                        <div className="ri-text">
                          <span>{rev.date} </span>
                          <div className="rating">
                            <i className="icon_star"></i>
                            <i className="icon_star"></i>
                            <i className="icon_star"></i>
                            <i className="icon_star"></i>
                            <i className="icon_star-half_alt"></i>
                          </div>
                          {/* {console.log("ttt", user[8].first_name)} */}
                          {/* {(usersss = rev.user_id)} */}
                          {/* {setuserreviewid(rev.user_id)} */}
                          {/* <h5>{user[usersss].first_name}</h5> */}
                          <h5>{rev.reviewerName} </h5>
                          <p>{rev.reviewText}</p>
                        </div>
                      </div>
                    ))}
               
                  </div>
                  {console.log(islogin)}
                  {islogin != "true" ? (
                    <p> </p>
                  ) : (
                    <div className="review-add">
                      <h4>Add Review</h4>
                      <Form className="ra-form">
                        <div className="row">
                          <div className="col-lg-6">
                            <Form.Field>
                              <label htmlFor="room">Name</label>

                              <input
                                type="text"
                                required
                                placeholder="Name*"
                                value={reviewerName}
                                onChange={(e) => {
                                  setreviewerName(e.target.value);
                                }}
                                reviewerName
                              />
                              {reviewerName !== "" ? (
                                <span></span>
                              ) : (
                                <p>This filled required</p>
                              )}
                            </Form.Field>
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
                            <Form.Field>
                              <textarea
                                placeholder="Your Review"
                                type="text"
                                required
                                onChange={(e) => {
                                  setreviewText(e.target.value);
                                }}
                                value={reviewText}></textarea>
                              {reviewText !== "" ? (
                                <span></span>
                              ) : (
                                <p>This filled required</p>
                              )}
                              <button type="submit" onClick={Addreview}>
                                Submit Now
                              </button>
                            </Form.Field>
                          </div>
                        </div>
                      </Form>
                    </div>
                  )}
                </div>

                <div className="col-lg-4">
                  <div className="room-booking">
                    <h3>Your Reservation</h3>

                    <Form className="create-form">
                      <Form.Field>
                        <div className="check-date">
                          <label htmlFor="date-in">Check In:</label>

                          <input
                            type="date"
                            className="date-input"
                            id="date-in"
                            onChange={(e) => {
                              setcheckIn(e.target.value);
                            }}
                            min={currentDate}
                          />
                          {/* <i className="icon_calendar"></i> */}
                        </div>
                      </Form.Field>
                      <Form.Field>
                        <div className="check-date">
                          <label htmlFor="date-out">Check Out:</label>
                          <input
                            type="date"
                            className="date-input"
                            id="date-out"
                            onChange={(e) => {
                              setcheckOut(e.target.value);
                            }}
                            min={currentDate }
                          />
                          {/* <StripeContainer /> */}
                          {/* <i className="icon_calendar"></i> */}
                        </div>
                      </Form.Field>
                      <Form.Field>
                        <p>3</p>
                        <div className="select-option">
                          <label htmlFor="guest">Guests:</label>

                          <p value="">3 Adults</p>
                        </div>
                        <div className="select-option">
                          <label htmlFor="room">Room:</label>

                          <p value="">1 Room</p>
                        </div>
                        {Math.round(amount) > 0 && (
                          <div className="select-option">
                            <label htmlFor="room">Amount:</label>
                            <p value="">{Math.round(amount)}</p>
                          </div>
                        )}
                      </Form.Field>
                      {islogin == "true" ? (
                        <Button type="submit" onClick={booking}>
                          Booking Now
                        </Button>
                      ) : (
                        <>
                          <Sweetalert />
                        </>
                      )}
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="services-section">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="section-title">
                    <span>{roomdetils.room_name}</span>
                    <h2>Additional Services</h2>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4 col-sm-6">
                  <div className="service-item">
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/2946/2946876.png"
                      className="w-80px"
                      alt=""
                    />
                    <h4>Entertainment</h4>
                    <p>{roomdetils.entertainment}</p>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="service-item">
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/1668/1668914.png"
                      className="w-80px"
                      alt=""
                    />
                    <h4>Bedding & Linens</h4>
                    <p>{roomdetils.Bedding_and_Linens}</p>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="service-item">
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/3951/3951087.png"
                      className="w-80px"
                      alt=""
                    />
                    <h4>Housekeeping Services</h4>
                    <p>{roomdetils.Housekeeping_Services}</p>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="service-item">
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/857/857681.png"
                      className="w-80px"
                      alt=""
                    />
                    <h4>Food & Cuisine</h4>
                    <p>{roomdetils.Food_and_Cuisine}</p>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="service-item">
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/2684/2684197.png"
                      className="w-80px"
                      alt=""
                    />
                    <h4>Hire Driver</h4>
                    <p>{roomdetils.Hire_Driver}</p>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="service-item">
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/2738/2738890.png"
                      className="w-80px"
                      alt=""
                    />
                    <h4>Juice & Drink</h4>
                    <p>{roomdetils.Juice_and_Drink}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Room Details Section End */}
        </div>
      )}
    </div>
  );
}

export default RoomDetails;
