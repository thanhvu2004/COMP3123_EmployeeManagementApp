const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const DB_URL = process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase";
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the MongoDB database");
  })
  .catch((err) => {
    console.error("Could not connect to the database. Exiting now...", err);
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.send("<h1>101411302 Conor Le</h1>");
});

const userRoutes = require("./routes/UserRoutes");
const employeeRoutes = require("./routes/EmployeeRoutes");
// Import and use routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/emp", employeeRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});