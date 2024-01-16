
import React, { useState, useEffect } from 'react';
import { getAllRooms } from '../../services/roomService';
import RoomList from '../../components/Room/RoomList';

const RoomPage = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [availabilityFilter, setAvailabilityFilter] = useState('all');

  // Fetch all rooms from the getAllRooms service
  useEffect(() => {
    const fetchRooms = async () => {
        let data = await getAllRooms();
        console.warn(data);
        setRooms(data);
        filterRooms(data, availabilityFilter);
    };
    fetchRooms();
  }, [availabilityFilter]);

  useEffect(() => {
    // Filter rooms whenever the availability filter changes
    filterRooms(rooms, availabilityFilter);
  }, [availabilityFilter]);

  const filterRooms = (rooms, filter) => {
    if (filter === 'all') {
      setFilteredRooms(rooms);
    } else if (filter === 'available') {
      const availableRooms = rooms.filter(room => room.available === true);
      setFilteredRooms(availableRooms);
    }
  };

  const handleFilterChange = event => {
    setAvailabilityFilter(event.target.value);
  };

  return (
    <div>
      <h1>Room Page</h1>
      <label htmlFor="availabilityFilter">Filter by availability:</label>
      <select id="availabilityFilter" value={availabilityFilter} onChange={handleFilterChange}>
        <option value="all">All</option>
        <option value="available">Available</option>
      </select>
      {/* map all rooms to one room to be passed to RoomList component*/}
      <RoomList rooms={filteredRooms} />
    </div>
  );
};

export default RoomPage;
