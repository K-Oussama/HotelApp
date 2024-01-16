import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

// Create an axios instance
const instance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true // This will enable cookies
});

// Now you can use this instance for all subsequent requests
export default instance;


