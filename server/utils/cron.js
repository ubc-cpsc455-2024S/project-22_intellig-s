const { CronJob } = require("cron");
require("dotenv").config();

const keepRenderAlive = new CronJob("*/10 * * * *", async () => {
  const response = await fetch(`${process.env.BACKEND_URL}/`, (res) => {
    res.statusCode === 200 ? console.log("here 1") : console.log("here 2");
  });

  response.status === 200
    ? console.log("server healthy")
    : console.log("server not healthy");
});

module.exports = { keepRenderAlive };
