const server = require("json-server");
const clone = require("clone");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const data = require("./data/db.json");

const app = server.create();
const router = server.router(clone(data), { _isFake: true });

app.use(cors());
app.use(compression());
app.use(helmet());

app.get("/", (req, res) => {
  return res.json({
    message: "Welcome to the Jokes Rest API",
    apiVersion: "1.0.0",
    author: "https://github.com/radespratama",
    endpoint: {
      english: "/v1/en",
      indonesian: "/v1/id",
    },
    time: new Date().getTime(),
  });
});

app.use(
  server.defaults({
    logger: process.env.NODE_ENV !== "production",
  })
);

app.use("/v1", router);

module.exports = app;
