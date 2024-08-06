const { CronJob } = require("cron");
require("dotenv").config();

const keepRenderAlive = new CronJob("*/10 * * * *", async () => {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/`);

    response.status === 200
      ? console.log("server healthy")
      : console.log("server not healthy");
  } catch (e) {
    console.log(`error running script: ${e.message}`);
  }
});

module.exports = { keepRenderAlive };
