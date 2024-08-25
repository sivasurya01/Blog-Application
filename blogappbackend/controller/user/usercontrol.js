const router = require("express").Router();
const cookieparser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const registerusermodel = require("../../models/registeruser");
router.post("/", (req, res) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      registerusermodel
        .create({ name, email, password: hash })
        .then((users) => res.json(users))
        .catch((err) => res.json(err));
    })
    .catch((err) => res.json(err));
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await registerusermodel.findOne({ email: email });

    // If user not found
    if (!user) {
      return res.status(404).json({ message: "No record exists" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password does not match
    if (!isPasswordValid) {
      return res.status(401).json({ message: "The password is incorrect" });
    }

    // If password matches
    const token = jwt.sign(
      { email: user.email, role: user.role },
      "jwt-secret-key",
      { expiresIn: "1h" }
    );

    res.cookie("token", token, { httpOnly: true, secure: true }); // Ensure secure in production
    return res.json({ user, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
