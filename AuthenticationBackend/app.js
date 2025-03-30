const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const { HandleMongoDb } = require("./src/database/dbConnection")
const userRouter= require("./src/routes/authuser")
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
    credentials: true, // Allow cookies and authentication headers
  })
);
app.use("/", userRouter);

const PORT = process.env.PORT || 8081;
HandleMongoDb("mongodb://localhost:27017/authentication")
  .then(
    app.listen(PORT, () => {
      console.log("mongoDBConnected");
      console.log(`Server is running on port ${PORT}`);
    })
  )
  .catch(() => console.log("failed to connect to mongodb"));