async function getCoordsFromLocation(query) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address="${query}"&key=${process.env.GOOGLE_MAPS_API_KEY}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const coordinates = (await response.json()).results[0].geometry.location;

  return { latitude: coordinates.lat, longitude: coordinates.lng };
}

module.exports = getCoordsFromLocation;
