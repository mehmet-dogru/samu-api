const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const config = require("./config/index");
const loaders = require("./loaders/index");
const { userRoutes, postRoutes, studentRoutes } = require("./api-routes");
const errorHandler = require("./middlewares/error-handler.middleware");
const ApiError = require("./responses/error.response");
const httpStatus = require("http-status");

config();
loaders();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());

app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/student", studentRoutes);

app.use((req, res, next) => {
  next(new ApiError("ENDPOINT NOT FOUND", httpStatus.BAD_REQUEST));
});

app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log(`SERVER ${process.env.PORT} PORTUNDA ÇALIŞIYOR.`);
});
