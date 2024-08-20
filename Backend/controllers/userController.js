const User = require("../model/userModel");
const jwt = require("jsonwebtoken");





registerUser = async (req, res) => {
  const { username, email, password, mobileNumber, role } = req.body;
  try {
    const existUser = await User.findOne({ email });
    if (!existUser) {
      const user = new User({ username, email, password, mobileNumber, role });
      await user.save();
      return res.status(201).json({ message: "User registered successfully" });
    } else {
      return res.status(400).json({ message: "User already exists" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

loginUser = async (req, res) => {

    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user || !(await user.comparePassword(password))) {
        return res.status(400).send({ error: 'Invalid login credentials' });
      }
      const token = jwt.sign({ _id: user._id }, 'Rudra', { expiresIn: "1h"});
      res.status(200).send({accessToken: token});
    } catch (error) {
      res.status(500).send(error);
    }
};

module.exports = { registerUser, loginUser };