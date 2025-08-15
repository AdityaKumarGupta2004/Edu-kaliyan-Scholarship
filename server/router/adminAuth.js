const express = require("express");
const router = express.Router();
const db = process.env.MONGO_DB;
const Admin = require("../model/adminSchema");

const requireAdminLogin = async (req, res, next) => {
  try {
    if (req.session.isAdminLoggedIn) {
      next();
    } else {
      res.status(401).send("Unauthorized access");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

router.post("/adminlogin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .send({ success: false, message: "Email and Password are required" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).send({
        success: false,
        message: "Email not registered. Please Register.",
      });
    }

    if (password !== admin.password) {
      return res.status(401).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    req.session.isAdminLoggedIn = true; // set session flag BEFORE sending response

    res.status(200).send({
      success: true,
      message: "Login Successful",
      user: { email: admin.email },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false, message: `Login Error: ${err}` });
  }
});

router.get("/admin-auth", requireAdminLogin, (req, res) => {
  res.status(200).send({ ok: true });
});

module.exports = router;
