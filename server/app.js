require("dotenv").config(); // 🔹 Must be at the top

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Middleware
app.use(
  session({
    secret: "tcet",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set secure: true if using HTTPS
  })
);

app.use(express.json());
app.use(cors());

// 🔹 MongoDB connection string from .env
const db = process.env.MONGO_DB;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Connection Successful");
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
  });

// Models and Routes
const User = require("./model/userSchemaa");
app.use(require("./router/auth.js"));

const Admin = require("./model/adminSchema.js");
app.use(require("./router/adminAuth.js"));

const Scholarships = require("./model/scholarshipModel.js");
app.use(require("./router/scholarshipAuth.js"));

const Applications = require("./model/applicationSchema.js");
app.use(require("./router/applicationsAuth.js"));

// Custom middleware
const middleware = (req, res, next) => {
  console.log("hello middleware");
  next();
};

const requireLogin = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect("/login");
    console.log("Login required");
  } else {
    next();
  }
};

// Start server
app.listen(8080, () => {
  console.log("🚀 Server is running on port 8080");
});

console.log("ok");
