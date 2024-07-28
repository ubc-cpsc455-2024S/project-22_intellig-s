const addItinerary = async (itineraryPayload) => {
  const { itinerary, userId } = itineraryPayload;
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/itineraries/${userId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itinerary),
    }
  );

  const data = await response.json();
  if (!response.ok) {
    const errorMsg = data?.message;
    throw new Error(errorMsg);
  }

  return data;
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

const getItineraries = async (userId) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/itineraries/${userId}`,
    {
      method: "GET",
    }
  );
  return await response.json();
};

export default {
  addItinerary,
  deleteItinerary,
  getItineraries,
};
