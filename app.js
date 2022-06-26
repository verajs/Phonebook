const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const contactRouter = require("./controllers/persons");
const usersRouter = require("./controllers/users")
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const morgan = require("morgan");

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use("/api/persons", contactRouter);
app.use("/api/users", usersRouter)
app.use(morgan("tiny", ":body"));


app.use(middleware.requestLogger)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

morgan.token("body", (req) => JSON.stringify(req.body));

module.exports = app;
