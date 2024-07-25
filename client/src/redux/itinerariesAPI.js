const addItinerary = async (userId, itinerary) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/itineraries`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itinerary),
    }
  );

  const newItinerary = await response.json();
  if (!response.ok) {
    throw new Error(newItinerary.message || "Failed to add itinerary");
  }

  // Add the itinerary to the user's list
  await User.findByIdAndUpdate(userId, {
    $push: { itineraries: newItinerary._id }
  });

  return newItinerary;
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
  const user = await User.findById(userId).populate('itineraries');
  return user.itineraries;
};

export default {
  addItinerary,
  deleteItinerary,
  getItineraries,
};
