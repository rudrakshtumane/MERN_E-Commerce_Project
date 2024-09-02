const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');


dotenv.config();


  async function registerUser (req, res){
    console.log(req.body);
  const { username, email, password, mobileNumber, role } = req.body;
  try {
    const existUser = await User.findOne({ email });
   
    if (!existUser) {
      const user = new User({ username, email, password, mobileNumber, role });
      console.log(user, 'found');
      await user.save();
      console.log('user saved');
      return res.status(201).send({ message: "User registered successfully" });
    } else {
      return res.status(200).send({ message: "User already exists" });
    }
  } catch (error) {
    console.error("Error in registerUser:", error);
    return res.status(500).send({ error: error.message });
  }
};

  async function loginUser (req, res)  {

    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user || !(await user.comparePassword(password))) {
        return res.status(400).send({ error: 'Invalid login credentials' });
      }
      const payload = { user: { id: user._id, role: user.role } };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(202).send({accessToken: token});
    } catch (error) {
      res.status(500).send(error);
    }
};


async function getUserInfo(req, res){
  const id = req.user.id;
  console.log(req.user.id)
  try {
    const user = await User.findOne({_id: id});
    if(!user){
      return res.status(200).send({ message: "User not found", success: false });
    }else{
      return res.status(200).send({ 
        user, success: true });
    }
    
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = { registerUser, loginUser, getUserInfo };