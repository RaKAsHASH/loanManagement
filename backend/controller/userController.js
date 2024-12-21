import {User} from '../models/associations.js'
import  bcrypt from "bcryptjs";
import  jwt from "jsonwebtoken";

const signUp = async (req,res) =>{
    const { name, email, password } = req.body;
    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({name, email, password: hashedPassword });
      res.status(201).json({ message: "User created successfully", userId: newUser.id });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
}

const logIn = async (req,res) =>{
  
  console.log('<<<<email>>','>>>')
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

const test = async (req,res) =>{
  res.status(200).json("Hello From this side os world")
}


export  {signUp,logIn,test};
