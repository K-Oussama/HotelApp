import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const apiService = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchHotelData = () => {
  return apiService.get('/hotel');
};

// Define other API calls needed for login, rooms, users, reservations, etc.
