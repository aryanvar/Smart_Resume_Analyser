const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.registerUser =async (req,res)=>{
    const {email,password} =req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser =new User({
        email,
        password:hashedPassword
    })
    await newUser.save();
    res.status(201).json({
        message:"User registered successfully"});
}

exports.loginUser=async (req,res)=>{
    const {email,password} =req.body;
    const user = await User.findOne({email});
    if(!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({id: user._Id}, process.env.JWT_SECRET, { expiresIn: "1d" })
    res.json({token});
}