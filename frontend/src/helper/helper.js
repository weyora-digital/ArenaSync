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
    return await axios.post(`http://127.0.0.1:5002/api/authenticate`, {
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
      `http://127.0.0.1:5002/api/user/${username}`
    );
    return { data };
  } catch (error) {
    return { error: "Password doesn't Match...!" };
  }
}

/** register user function */
export async function registerUser(credentials) {
  try {
    const response = await axios.post(
      `http://127.0.0.1:5002/user/signup`,
      credentials
    );

    const { data, status } = response;

    let { username, email } = credentials;

    /** send email */
    // if(status === 201){
    //     await axios.post(`http://127.0.0.1:5002/api/registerMail`, { username, userEmail : email, text : msg})
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
      `http://127.0.0.1:5002/user/login`,
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
      const { data } = await axios.post(`http://127.0.0.1:5002/api/login`, {
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
      `http://127.0.0.1:5002/api/updateuser`,
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
    } = await axios.get(`http://127.0.0.1:5002/api/generateOTP`, {
      params: { username },
    });

    // send mail with the OTP
    if (status === 201) {
      let {
        data: { email },
      } = await getUser({ username });
      let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
      await axios.post(`http://127.0.0.1:5002/api/registerMail`, {
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
      `http://127.0.0.1:5002/api/verifyOTP`,
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
      `http://127.0.0.1:5002/api/resetPassword`,
      { username, password }
    );
    return Promise.resolve({ data, status });
  } catch (error) {
    return Promise.reject({ error });
  }
}

/** fetch user details */
export async function getUserDetails() {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");
  try {
    const { data } = await axios.get(
      `http://127.0.0.1:5002/user/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error });
  }
}

/** update user details */
export async function updateUserDetails(values) {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");
  try {
    const { data } = await axios.put(
      `http://127.0.0.1:5002/user/user/${userId}`,
      values,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error });
  }
}

/** add favorite games */
export async function addFavoriteGames(list) {
  const { player_id, games } = list;
  try {
    // Convert games array to a comma-separated string
    const gamesString = games.join(",");

    const response = await axios.post(
      `http://127.0.0.1:5002/recommendation/addrelationship`,
      null,
      {
        params: {
          player_id: player_id,
          games: gamesString, // Send comma-separated string
        },
      }
    );
    return Promise.resolve({ response });
  } catch (error) {
    return Promise.reject({ error });
  }
}

/** fetch UpComing Events */
export async function fetchUpcomingEvents() {
  try {
    const response = await axios.get("http://127.0.0.1:5002/event/events");
    return response.data.events;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: "Failed to fetch events" };
  }
}

/** fetch Recommanded Events */
export async function fetchRecommandedEvents() {
  const token = localStorage.getItem("token");
  let decode = jwtDecode(token);
  const player_id = decode.sub;
  try {
    const response = await axios.get(
      "http://127.0.0.1:5002/recommendation/getRecommendation",
      {
        params: {
          player_id: player_id,
        },
      }
    );
    if (response.data.recommendation == null) {
      return "No events to fetch";
    }
    const recommendations = response.data.recommendation;
    const gameNames = recommendations.map((item) => item.game);
    const result = {
      game_names: gameNames,
    };
    try {
      const response = await axios.post(
        "http://127.0.0.1:5002/event/eventsbygames",
        result
      );
      return response.data.events;
    } catch (error) {
      throw error.response
        ? error.response.data
        : { message: "Failed to fetch events" };
    }
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: "Failed to fetch events" };
  }
}

/** fetch Events */
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

/** fetch All Games */
export async function fetchAllGames() {
  try {
    const response = await axios.get(
      "http://127.0.0.1:5002/recommendation/getallgames"
    );
    return response;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: "Failed to fetch country list" };
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
      `http://127.0.0.1:5002/event/registrations/${eventId}`
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
      `http://127.0.0.1:5002/event/register_event`,
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

/** get registered events */
export async function getRegisteredEvents() {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(
      `http://127.0.0.1:5002/event/user_events`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const sortedEvents = response.data.sort(
      (a, b) => a.registration_id - b.registration_id
    );
    return Promise.resolve(sortedEvents);
  } catch (error) {
    return Promise.reject({ error });
  }
}

/** update registered event */
export async function updateRegisteredEvent(values, registration_id) {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.put(
      `http://127.0.0.1:5002/event/update_user_event/${registration_id}`,
      values,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return Promise.resolve(response.status);
  } catch (error) {
    console.log(error);
    throw error.response
      ? error.response.data
      : { message: "Failed to update" };
  }
}

/** Delete registered event */
export async function deleteRegisteredEvent(registration_id) {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.delete(
      `http://127.0.0.1:5002/event/delete_user_event/${registration_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return Promise.resolve(response.status);
  } catch (error) {
    console.log(error);
    throw error.response
      ? error.response.data
      : { message: "Failed to update" };
  }
}

/** get selected game list */
export async function getFavGames() {
  const userId = localStorage.getItem("user_id");
  try {
    const response = await axios.get(
      `http://127.0.0.1:5002/recommendation/getrelationship?player_id=${userId}`
    );
    return Promise.resolve(response);
  } catch (error) {
    console.log(error);
    throw error.response
      ? error.response.data
      : { message: "Failed to update" };
  }
}

/** update selected game list */
export async function updateFavGames(values) {
  const userId = localStorage.getItem("user_id");
  try {
    const response = await axios.put(
      `http://127.0.0.1:5002/recommendation/updaterelationship?player_id=${userId}`,
      values
    );
    return Promise.resolve(response);
  } catch (error) {
    console.log(error);
    throw error.response
      ? error.response.data
      : { message: "Failed to update" };
  }
}
