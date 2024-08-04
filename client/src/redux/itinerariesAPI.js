import axios from "axios";

const addItinerary = async (itineraryPayload, token) => {
  const response = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/itineraries`,

    itineraryPayload,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const deleteItinerary = async (id, token) => {
  const response = await axios
    .delete(`${import.meta.env.VITE_BACKEND_URL}/itineraries/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .catch(() => {
      return response.data;
    });

  return id;
};

const getItineraries = async (token) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/itineraries/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.data;
};

export default {
  addItinerary,
  deleteItinerary,
  getItineraries,
};
