const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
require("dotenv").config();
const { HandleMongoDb } = require("./src/database/dbConnection");
require("./src/utils/passport")
const userRouter = require("./src/routes/authuser");
const authRouter = require("./src/routes/authRouter");

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
app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallback-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true if using HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/", userRouter);
app.use("/auth", authRouter);



const PORT = process.env.PORT || 8081;
HandleMongoDb("mongodb://localhost:27017/authentication")
  .then(
    app.listen(PORT, () => {
      console.log("mongoDBConnected");
      console.log(`Server is running on port ${PORT}`);
    })
  )
  .catch(() => console.log("failed to connect to mongodb"));