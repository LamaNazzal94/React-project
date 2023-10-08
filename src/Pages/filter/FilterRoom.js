import React, { useState } from "react";
import Filter from "./Filters";
import Rooms from "./Rooms";

function FilterRoom() {
  const [availableRooms, setAvailableRooms] = useState([]);

  const handleFilterRooms = (filteredRooms) => {
    setAvailableRooms(filteredRooms);
  };

  return (
    <div>
      <Filter onFilter={handleFilterRooms} />
      <Rooms availableRooms={availableRooms} />
    </div>
  );
}

export default FilterRoom;
