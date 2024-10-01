import axios from 'axios';
import { jwtDecode } from "jwt-decode";
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

/** Admin login function */
export async function adminLogin(credentials) {
  try {
    const response = await axios.post('http://127.0.0.1:5000/admin/login', credentials);
    const { data, status } = response;

    if (status === 200) {
      return Promise.resolve(data); // Return the login response data if successful
    }
  } catch (error) {
    return Promise.reject({ error: error.response.data.message || 'Login failed' });
  }
}

// Function to create a new event (Admin only)
export const createAdminEvent = async (eventData, token) => {
  try {
    const response = await axios.post(
      'http://127.0.0.1:5000/event/create',
      eventData,
      {
        headers: {
          Authorization: `Bearer ${token}`,  // Admin token for authorization
          'Content-Type': 'application/json'  // Ensure JSON content type
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Event creation failed' };
  }
};

/** Fetch events */
export const fetchAdminEvents = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:5000/event/events');
    return response.data.events;
  } catch (error) {
    throw error;
  }
};