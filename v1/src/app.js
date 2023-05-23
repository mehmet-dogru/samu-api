const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const helmet = require("helmet");
const config = require("./config/index");
const loaders = require("./loaders/index");
const { userRoutes, postRoutes, companyRoutes, complaintRoutes, graduationProjectRoutes, departmentRoutes } = require("./api-routes");
const errorHandler = require("./middlewares/error-handler.middleware");
const ApiError = require("./responses/error.response");
const httpStatus = require("http-status");
const path = require("path");

config();
loaders();

const app = express();
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "./", "uploads")));
app.use(helmet());
app.use(cors());
app.use(fileUpload());

app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/departments", departmentRoutes);
app.use("/companies", companyRoutes);
app.use("/complaints", complaintRoutes);
app.use("/graduation-projects", graduationProjectRoutes);

app.use((req, res, next) => {
  next(new ApiError("ENDPOINT NOT FOUND", httpStatus.BAD_REQUEST));
});

app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log(`SERVER ${process.env.PORT} is running`);
});
