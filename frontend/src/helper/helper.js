import axios from "axios";
import { jwtDecode } from "jwt-decode";
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

/** Make API Requests */

/** To get username from Token */
export async function getUsername() {
  const token = localStorage.getItem("token");
  if (!token) return Promise.reject("Cannot find Token");
  let decode = jwtDecode(token);
  return decode;
}

/** authenticate function */
export async function authenticate(username) {
  try {
    return await axios.post(`http://localhost:5000/api/authenticate`, {
      username,
    });
  } catch (error) {
    return { error: "Username doesn't exist...!" };
  }
}

/** get User details */
export async function getUser({ username }) {
  try {
    const { data } = await axios.get(
      `http://localhost:5000/api/user/${username}`
    );
    return { data };
  } catch (error) {
    return { error: "Password doesn't Match...!" };
  }
}

/** register user function */
export async function registerUser(credentials) {
  try {
    console.log(credentials);
    const response = await axios.post(
      `http://localhost:5000/user/signup`,
      credentials
    );

    const { data, status } = response;

    let { username, email } = credentials;

    /** send email */
    // if(status === 201){
    //     await axios.post(`http://127.0.0.1:5001/api/registerMail`, { username, userEmail : email, text : msg})
    // }

    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject({ error });
  }
}

/** login user function */
export async function loginUser(credentials) {
  try {
    const response = await axios.post(
      `http://localhost:5000/user/login`,
      credentials
    );
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
}

/** login function */
export async function verifyPassword({ username, password }) {
  try {
    if (username) {
      const { data } = await axios.post(`http://localhost:5000/api/login`, {
        username,
        password,
      });
      return Promise.resolve({ data });
    }
  } catch (error) {
    return Promise.reject({ error: "Password doesn't Match...!" });
  }
}

/** update user profile function */
export async function updateUser(response) {
  try {
    const token = await localStorage.getItem("token");
    const data = await axios.put(
      `http://localhost:5000/api/updateuser`,
      response,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Couldn't Update Profile...!" });
  }
}

/** generate OTP */
export async function generateOTP(username) {
  try {
    const {
      data: { code },
      status,
    } = await axios.get(`http://localhost:5000/api/generateOTP`, {
      params: { username },
    });

    // send mail with the OTP
    if (status === 201) {
      let {
        data: { email },
      } = await getUser({ username });
      let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
      await axios.post(`http://localhost:5000/api/registerMail`, {
        username,
        userEmail: email,
        text,
        subject: "Password Recovery OTP",
      });
    }
    return Promise.resolve(code);
  } catch (error) {
    return Promise.reject({ error });
  }
}

/** verify OTP */
export async function verifyOTP({ username, code }) {
  try {
    const { data, status } = await axios.get(
      `http://localhost:5000/api/verifyOTP`,
      { params: { username, code } }
    );
    return { data, status };
  } catch (error) {
    return Promise.reject(error);
  }
}

/** reset password */
export async function resetPassword({ username, password }) {
  try {
    const { data, status } = await axios.put(
      `http://localhost:5000/api/resetPassword`,
      { username, password }
    );
    return Promise.resolve({ data, status });
  } catch (error) {
    return Promise.reject({ error });
  }
}

export async function fetchUpcomingEvents() {
  try {
    const response = await axios.get("http://localhost:5000/event/events");
    return response.data.events;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: "Failed to fetch events" };
  }
}

/** fetch events */
export async function fetchEvent(url) {
  try {
    const response = await axios.get(url);
    return response.data.events;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: "Failed to fetch events" };
  }
}

/** fetch Country List */
export async function fetchCountries() {
  try {
    const response = await axios.get(
      "https://restcountries.com/v3.1/all?fields=name,flags"
    );
    const sortedCountries = response.data.sort((a, b) =>
      a.name.common.localeCompare(b.name.common)
    );
    return sortedCountries;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: "Failed to fetch country list" };
  }
}

/** fetch country flags */
export async function fetchCountryFlag(countryName) {
  try {
    const response = await axios.get(
      "https://restcountries.com/v3.1/all?fields=name,flags"
    );

    const country = response.data.find(
      (c) => c.name.common.toLowerCase() === countryName.toLowerCase()
    );

    if (country) {
      return country.flags.png;
    } else {
      throw new Error("Country not found");
    }
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: "Failed to fetch country flag" };
  }
}

/** fetch event registration count */
export async function fetchGameRegistrationCount(eventId) {
  try {
    const response = await axios.get(
      `http://localhost:5000/event/registrations/${eventId}`
    );
    return response.data.registration_count;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: "Failed to fetch country flag" };
  }
}

/** event registration */
export async function registerTournament(values) {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(
      `http://localhost:5000/event/register_event`,
      values,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.status;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: "Failed to fetch country flag" };
  }
}
