require("dotenv").config();

async function deploy() {
  if (!process.env.RENDER_SERVICE_ID || !process.env.RENDER_API_KEY)
    throw new Error("script missing required environment variables");

  let url = `https://api.render.com/v1/services/${process.env.RENDER_SERVICE_ID}/deploys`;
  let options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: `Bearer ${process.env.RENDER_API_KEY}`,
    },
  };

  let result = await (await fetch(url, options)).json();

  const deployId = result.id;

  url = `https://api.render.com/v1/services/${process.env.RENDER_SERVICE_ID}/deploys/${deployId}`;
  options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: `Bearer ${process.env.RENDER_API_KEY}`,
    },
  };

  let res = await (await fetch(url, options)).json();
  console.log(res);

  while (
    res.status === "created" ||
    res.status === "build_in_progress" ||
    res.status === "update_in_progress"
  ) {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log("build in progress");
    res = await (await fetch(url, options)).json();
  }

  if (res.status === "live") {
    console.log("site deployed successfully!");
    return;
  }
  const err_message = `build not completed. build status: ${res.status}`;
  throw new Error(err_message);
}

try {
  deploy();
} catch (error) {
  console.error(error);
}
