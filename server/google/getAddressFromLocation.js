async function getAddressFromLocation(query) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      query
    )}&key=${process.env.GOOGLE_MAPS_API_KEY}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const address = (await response.json()).results[0].formatted_address;

  return address;
}

module.exports = getAddressFromLocation;
