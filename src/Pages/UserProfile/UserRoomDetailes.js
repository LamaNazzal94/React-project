import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom"; // Import Link for routing

function RoomDetails() {
  const [room, setRoom] = useState(null);
  const { hotelid, roomid } = useParams();

  console.log("roomid", roomid);

  useEffect(() => {
    // Fetch room data from the API when the component mounts
    axios
      .get(
        `https://64bbac6a7b33a35a4446905c.mockapi.io/hotels/${hotelid}/rooms`
      )
      .then((response) => {
        const foundRoom = response.data.find((r) => r.id === roomid);
        if (foundRoom) {
          setRoom(foundRoom);
        }
      })
      .catch((error) => {
        console.error("Error fetching room data: ", error);
      });
  }, [hotelid, roomid]);

  return (
    <div>
      {room ? (
        <div>
          <h3>Room Details</h3>
          <table>
            <tbody>
              <tr>
                <th>Room Name</th>
                <td>{room.room_name}</td>
              </tr>
              <tr>
                <th>Price</th>
                <td>{room.price}</td>
              </tr>
              {/* Add more room details here */}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading room details...</p>
      )}
    </div>
  );
}

export default RoomDetails;
