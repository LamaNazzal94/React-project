import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import Navigate
import Layout from "./layout/Layout";
import Footer from "./layout/Footer";
import About_us from "./Pages/about-us/About_us";
import Contact from "./Pages/contact/Contact";
import Room_details from "./Pages/room-details/Room_details";
import Rooms from "./Pages/rooms/Rooms";
import Index_component from "./Pages/index/index_component";

function App() {
  return (
    <Router>
      <div>
        <Layout /> {/* Layout outside Routes */}
        <Routes>
          <Route path="/" element={<Index_component />} />
          <Route path="about" element={<About_us />} />
          <Route path="contact" element={<Contact />} />
          <Route path="room-details" element={<Room_details />} />
          <Route path="rooms" element={<Rooms />} />
          {/* Add a catch-all route for unmatched paths */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer /> {/* Footer outside Routes */}
      </div>
    </Router>
  );
}

export default App;
