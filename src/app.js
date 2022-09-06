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
    extra: {
      spesificEndpoint: "/v1/en/1 until 70",
      filter: ["/v1/en?id=1&id=2"],
      limit: ["/v1/en?_limit=20"],
      sort: ["/v1/en?_sort=id&_order=desc"],
      operator: {
        like: ["/v1/en?jokes_like=pig"],
        exclude: ["/v1/en?id_ne=4"],
        range: ["/v1/en?id_gte=1&id_lte=4"],
      },
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
