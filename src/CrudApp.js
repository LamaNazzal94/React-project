import React, { useState, useEffect } from "react";
import axios from "axios"; // Note the lowercase 'axios'
import { Button, Checkbox, Form } from "semantic-ui-react";
import Swal from "sweetalert2"; // Import SweetAlert
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const [showSignUpForm, setShowSignUpForm] = useState(true);

  const toggleForm = () => {
    setShowSignUpForm(!showSignUpForm);
  };
  

  const handleSignUp = (e) => {
    e.preventDefault();
    // Validation code for name, email, and password goes here
    const nameRegex = /^[A-Za-z\s]+$/;
    const isValidfirst_name = (first_name) => nameRegex.test(first_name);
    const isValidlast_name = (last_name) => nameRegex.test(last_name);

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const isValidEmail = (email) => emailRegex.test(email);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const isValidPassword = (password) => passwordRegex.test(password);

    if (!isValidfirst_name(newUser.first_name)) {
      // Handle name validation error
      Swal.fire({
        title: "Error!",
        text: "The name should be characters only",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    if (!isValidlast_name(newUser.last_name)) {
      // Handle name validation error
      Swal.fire({
        title: "Error!",
        text: "The name should be characters only",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    if (!isValidEmail(newUser.email)) {
      // Handle email validation error
      Swal.fire({
        title: "Error!",
        text: "Invalid email format",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    if (!isValidPassword(newUser.password)) {
      // Handle password validation error
      Swal.fire({
        title: "Error!",
        text: "Password should contain uppercase, lowercase, special characters, and numbers",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    //----------------------------------------registration-------------------------------------
  };

  //----------------------------------------registration-------------------------------------

  const [users, setUsers] = useState([]);

  const [newUser, setNewuser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    image: "",
  });

  useEffect(() => {
    // Fetch data from the API when the component mounts
    axios
      .get("https://64c259d9eb7fd5d6ebcfae46.mockapi.io/user")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const addUser = () => {
    let EmailIsStore = false;
    users.forEach((user) => {
      if (user.email == newUser.email) {
        EmailIsStore = true;
      }
    });

    if (!EmailIsStore) {
      axios
        .post("https://64c259d9eb7fd5d6ebcfae46.mockapi.io/user", newUser)
        .then((response) => {
          setUsers([...users, response.data]);
          setNewuser({
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            image: "",
          });
        })

        .catch((error) => {
          console.error("Error adding user: ", error);
        });
    } else {
      Swal.fire({
        title: "Error!",
        text: "Email is already registered.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  //-------------------------------------------registration------------------------------------------

  // login////////////////////////////////////////////////////////////

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  // const [islogin, setahmad] = useState('false');
  const [check, setacheck] = useState("true");

  // const [setItem, setcheckIn] = localStorage.setItem('islogin', "false");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      let isUserLoggedIn = false;
      console.log("email", email);
      users.forEach((user) => {
        if (user.email === email && user.password === password) {
          setacheck("true");

          // Set the local storage variable for login
          localStorage.setItem("islogin", "true");

          // Set the user id in local storage
          localStorage.setItem("userid", user.id);

          // Set the flag to indicate that the user is logged in
          isUserLoggedIn = true;
         window.history.back();
        } else {
          setEmail("");
          setPassword("");
          setLoginMessage("Invalid email or password");
        }
      });
    } else {
      setLoginMessage("Please enter email and password");
    }
  };

  useEffect(() => {
    setacheck(localStorage.getItem("islogin"));
    // console.log(islogin);
  }, []);

  //////////////////

  return (
    <>
      <div id="form">
        <div className="container">
          <div className="col-lg-6 col-lg-offset-3 col-md-6 col-lg-offset-3 col-md-8 col-md-offset-2">
            <div id="userform">
              {/* <ul className="nav nav-tabs nav-justified" role="tablist">
                <li className={`nav-item ${showSignUpForm ? "active" : ""}`}>
                  <button className="nav-link btn-form" onClick={toggleForm}>
                    Sign up
                  </button>
                </li>
                <li className={`nav-item ${!showSignUpForm ? "active" : ""}`}>
                  <button className="nav-link btn-form" onClick={toggleForm}>
                    Log in
                  </button>
                </li>
              </ul> */}
              <ul className="nav nav-tabs nav-justified" role="tablist">
                <li className={showSignUpForm ? "active" : ""} id="btnform">
                  <a
                    href="#signup"
                    className=" btn formbtn"
                    role="tab"
                    data-toggle="tab"
                    onClick={toggleForm}
                  >
                    Sign up
                  </a>
                </li>
                <li className={!showSignUpForm ? "active" : ""} id="btnform">
                  <a
                    href="#login"
                    className=" btn formbtn"
                    role="tab"
                    data-toggle="tab"
                    onClick={toggleForm}
                  >
                    Log in
                  </a>
                </li>
              </ul>
              <div className="tab-content">
                {showSignUpForm ? (
                  <div
                    className={`tab-pane ${showSignUpForm ? "active" : ""}`}
                    id="signup"
                  >
                    <h2 className="text-uppercase text-center">
                      Sign Up for Free
                    </h2>
                    <Form onSubmit={handleSignUp}>
                      <div className="form-group">
                        <Form.Field>
                          <label htmlFor="first_name"></label>
                          <input
                            type="text"
                            className="form-control"
                            id="first_name"
                            name="first_name"
                            placeholder="First Name"
                            value={newUser.first_name}
                            onChange={(e) =>
                              setNewuser({
                                ...newUser,
                                first_name: e.target.value,
                              })
                            }
                            required
                          />
                        </Form.Field>
                      </div>
                      <div className="form-group">
                        <Form.Field>
                          <label htmlFor="last_name"></label>
                          <input
                            type="text"
                            className="form-control"
                            id="last_name"
                            name="last_name"
                            placeholder="Last Name:"
                            value={newUser.last_name}
                            onChange={(e) =>
                              setNewuser({
                                ...newUser,
                                last_name: e.target.value,
                              })
                            }
                            required
                          />
                        </Form.Field>
                      </div>
                      <div className="form-group">
                        <Form.Field>
                          <label htmlFor="email"></label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="Email:"
                            value={newUser.email}
                            onChange={(e) =>
                              setNewuser({ ...newUser, email: e.target.value })
                            }
                            required
                          />
                        </Form.Field>
                      </div>
                      <div className="form-group">
                        <Form.Field>
                          <label htmlFor="password"></label>
                          <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            placeholder="Password:"
                            value={newUser.password}
                            onChange={(e) =>
                              setNewuser({
                                ...newUser,
                                password: e.target.value,
                              })
                            }
                            required
                          />
                        </Form.Field>
                      </div>
                      <div className="form-group">
                        <Form.Field>
                          <label htmlFor="image">Image URL:</label>
                          <input
                            type="text"
                            className="form-control"
                            id="image"
                            name="image"
                            value={newUser.image}
                            onChange={(e) =>
                              setNewuser({ ...newUser, image: e.target.value })
                            }
                            required
                          />
                        </Form.Field>
                      </div>
                      <div className="mrgn-30-top">
                        <button
                          type="submit"
                          className="btn btn-larger btn-block"
                          onClick={addUser}
                        >
                          Sign up
                        </button>
                      </div>
                    </Form>
                  </div>
                ) : (
                  <div
                    className={`tab-pane ${!showSignUpForm ? "active" : ""}`}
                    id="login"
                  >
                    <h2 className="text-uppercase text-center">Log in</h2>
                    <Form onSubmit={handleLogin}>
                      <div className="form-group">
                        <Form.Field>
                          <label htmlFor="login_email"></label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Your Email:"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </Form.Field>
                      </div>
                      <div className="form-group">
                        <Form.Field>
                          <label htmlFor="login_password"></label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Password:"
                            value={password}
                            id="password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </Form.Field>
                      </div>
                      <div className="mrgn-30-top">
                        <button
                          type="submit"
                          className="btn btn-larger btn-block"
                          onClick={handleLogin}
                        >
                          Log in
                        </button>
                      </div>
                    </Form>
                    {loginMessage && (
                      <p style={{ color: "red", fontSize: "20px" }}>
                        {loginMessage}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
