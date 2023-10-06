import { Link } from "react-router-dom"; // Import Link and Route
import { Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Hotel() {
  const [Hotels, setHotels] = useState([]);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    axios
      .get("https://64bbac6a7b33a35a4446905c.mockapi.io/hotels")
      .then((response) => {
        setHotels(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);
  return (
    <section className="hp-room-section">
      <div className="container-fluid">
        <div className="hp-room-items">
          <div className="row">
            {Hotels.map((Hotel) => (
              <div className="col-lg-3 col-md-6" key={Hotel.id}>
                <div
                  className="hp-room-item set-bg"
                  style={{ backgroundImage: `url(${Hotel.image})` }}
                >
                  <div className="hr-text">
                    <h3>{Hotel.hotel_name}</h3>
                    <h2>
                      {Hotel.price}
                      <span>/Per night</span>
                    </h2>
                    <table>
                      <tbody>
                        <tr>
                        <td className="r-o">Location:{Hotel.location}</td>
                        </tr>
                      </tbody>
                    </table>
                    <Link to={`/rooms/${Hotel.id}`} className="primary-btn">
                      More Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {/* Repeat similar code for other room types */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hotel;
