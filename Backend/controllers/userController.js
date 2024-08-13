const User = require('../model/userModel');
const jwt = require('jsonwebtoken');

async function registerUser(req,res){
    try {
            const user = new User(req.body);
            result = await user.save();
            return res.status(201).send({message: "user added successfully", result});
          } catch (error) {
            res.status(500).send(error);
          }
          
};

async function loginUser(req,res){
    try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user || !(await user.comparePassword(password))) {
              return res.status(400).send({ error: 'Invalid login credentials' });
            }
            const token = jwt.sign({ _id: user._id }, 'Rudra', { expiresIn: "1h"});
            res.status(200).send({accessToken: token});
          } 
          catch (error) {
            res.status(500).send(error);
          } 
}; 


module.exports = {
    registerUser,
    loginUser,
}
