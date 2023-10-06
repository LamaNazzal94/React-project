import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CrudApp.css";

const userid = localStorage.getItem("userid");
const API_URL = `https://64c259d9eb7fd5d6ebcfae46.mockapi.io/user/${userid}`;

const CrudApp = () => {
  const [user, setuser] = useState();
  const [editUser, seteditUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    image: "",
  });
  const [checkUser, setchekingUser] = useState(null);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => setuser(response.data))
      .catch((error) =>
        console.error("Error fetching user information:", error)
      );
  }, []);

  const handleEditUser = (user) => {
    setchekingUser(user);
    seteditUser({ ...user });
  };

  const handlecheckUser = () => {
    axios
      .put(`${API_URL}`, editUser)
      .then((response) => {
        setuser()
        setchekingUser(null);
        seteditUser({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          image: "",
        });
      })
      .catch((error) => console.error("Error updating user:", error));
  };

  const handleDeleteUser = (id) => {
    axios
      .delete(`${API_URL}`)
      .then(() => setuser(user.filter((user) => user.id !== id)))
      .catch((error) => console.error("Error deleting user:", error));
  };
};
