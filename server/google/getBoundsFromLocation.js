async function getBoundsFromLocation(query) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address="${query}"&key=${process.env.GOOGLE_MAPS_API_KEY}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const bounds = (await response.json()).results[0].geometry.viewport;

  return {
    north: bounds.northeast.lat,
    east: bounds.northeast.lng,
    south: bounds.southwest.lat,
    west: bounds.southwest.lng,
  };
}

module.exports = getBoundsFromLocation;
