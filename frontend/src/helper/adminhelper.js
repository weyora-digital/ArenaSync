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
          // 'Content-Type': 'application/json'  // Ensure JSON content type
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


// Function to delete an event (Admin only)
export const deleteEvent = async (eventId, token) => {
  try {
    const response = await axios.delete(
      `http://127.0.0.1:5000/event/delete/${eventId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,  // Admin token for authorization
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Event deletion failed' };
  }
};


// Function to update an event (Admin only)
export const updateEvent = async (eventId, updatedEventData, token) => {
  try {
    const response = await axios.put(
      `http://127.0.0.1:5000/event/update/${eventId}`,
      updatedEventData,
      {
        headers: {
          Authorization: `Bearer ${token}`,  // Admin token for authorization
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Event update failed' };
  }
};
