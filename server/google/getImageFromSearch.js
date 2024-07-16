async function getImageFromSearch(query) {
  const response = await fetch(
    `https://www.googleapis.com/customsearch/v1?cx=f11a4743ef61b4014&key=${process.env.GOOGLE_MAPS_API_KEY}&q="${query}"&searchType=image`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const url = (await response.json()).items[0].link;

  return url;
}

module.exports = getImageFromSearch;
