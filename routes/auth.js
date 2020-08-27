const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");

// @route           GET api/auth
// @description     Get already logged in user (find the authorized user)
// @access          Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // -passwords means we won't send the password, only the rest
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route           POST api/auth
// @description     Auth user & get token (Login user)
// @access          Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      // jwt.sign(payload, secretOrPrivateKey, [options, callback])  from https://www.npmjs.com/package/jsonwebtoken
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: "3h",
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
