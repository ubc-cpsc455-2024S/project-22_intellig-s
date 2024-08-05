async function retry(maxRetries, fn) {
  console.log("here", maxRetries);
  return await fn().catch(function (err) {
    if (maxRetries <= 0) {
      throw err;
    }
    return retry(maxRetries - 1, fn);
  });
}

module.exports = retry;
