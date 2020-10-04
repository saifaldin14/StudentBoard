const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/useModel');
router.post("/register", async (req, res) => {
  try {
    const { email, password, passwordCheck, displayName } = req.body;

    //Validate data
    if (!email || !password || !passwordCheck)
      return res.status(400).json({ msg: "Not all fields have been entered" });

    if (password.length < 5)
      return res.status(400).json({ msg: "Password needs to be at least 5 characters long" });

    if (password !== passwordCheck)
      return res.status(400).json({ msg: "Enter the same password twice for verification" });

    const existingUser = await User.findOne({ email: email });

    if (existingUser)
      return res.status(400).json({ msg: "Account with this email already exists" });

    if (!displayName) displayName = email;

    //Apply hashing function to protect password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    //Create new user
    const newUser = new User({
      email,
      password: passwordHash,
      displayName
    });

    //Save user
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }

});
module.exports = router;