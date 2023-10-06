import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes correctly
import Layout from "./layout/Layout";
import Footer from "./layout/Footer";
import AboutUs from "./Pages/about-us/About_us"; // Update component name
import Contact from "./Pages/contact/Contact";
import RoomDetails from "./Pages/room-details/Room_details"; // Update component name
import Rooms from "./Pages/rooms/Rooms";
import IndexComponent from "./Pages/index/index_component"; // Update component name
import CrudApp from "./CrudApp";
import './login';
import './login.css';

function App() {
  return (
    <Router>
      <div>
        <Layout /> {/* Layout outside Routes */}
        <Routes>
          <Route path="/" element={<IndexComponent />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="room-details" element={<RoomDetails />} />
          <Route path="rooms/:Hotelid" element={<Rooms />} />
          <Route path="CrudApp" element={<CrudApp />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
