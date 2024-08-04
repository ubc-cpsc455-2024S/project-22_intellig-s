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

const deleteItinerary = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/itineraries/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  if (!response.ok) {
    const errorMsg = data?.message;
    throw new Error(errorMsg);
  }

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
