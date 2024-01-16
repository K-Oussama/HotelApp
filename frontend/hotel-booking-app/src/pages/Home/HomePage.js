import React, { useState, useEffect } from 'react';
import './HomePage.css'; // Import the CSS file for styling
import { logout } from '../../services/authService'; // Import the logout function
import { Link } from 'react-router-dom'; // Import the Link component from react-router-dom
import { getAllRooms } from '../../services/roomService';


const HomePage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track user authentication
    const [rooms, setRooms] = useState([]); // State to store rooms data

    // Function to handle user login
    const handleLogin = () => {
        // Perform authentication logic
        if (localStorage.getItem('authToken')) {
            setIsLoggedIn(true); // Set isLoggedIn state to true
            console.log('local : ' + localStorage.getItem('authToken'));
        } else {
            setIsLoggedIn(false); // Set isLoggedIn state to false
        }
    };

    // Function to handle user logout
    const handleLogout = () => {
        logout(); // Call logout service
        setIsLoggedIn(false); // Set isLoggedIn state to false
    };

    // Fetch all rooms data
    useEffect(() => {
        const fetchRooms = async () => {
            const roomsData = await getAllRooms();
            console.warn(roomsData);
            setRooms(roomsData);
        };

        fetchRooms();
        handleLogin();
    }, []);

    return (
        <div className="homepage-container">
            <h1>Welcome to our Hotel Booking App</h1>
            <p>Discover the best rooms for your next stay</p>

            <div className="room-list">
                {/* Display hotel cards */}
                {rooms.map((room) => (
                <div className="room-card" key={room.roomNumber}>
                    <h2>Room Number: {room.roomNumber}</h2>
                    <p>Type: {room.roomType}</p>
                    <p>Price: {room.roomPrice}</p>
                    <p>Available: {room.available ? 'Yes' : 'No'}</p>
                    {/*<a href={room._links.room.href}>Room Details</a>*/}
                    <Link to={`/room/${room._links.room.href.split('/').pop()}`}>Room Details</Link>
                </div>
            ))}
            </div>

            {/* Show different links based on user authentication */}
            {isLoggedIn ? (
                <>
                    <Link to="/dashboard">Go to Dashboard</Link>
                    <button onClick={handleLogout}>Log out</button>
                </>
            ) : (
                <Link to="/login">Login</Link>
            )}
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
        </div>
    );
};

export default HomePage;
