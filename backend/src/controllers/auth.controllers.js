import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "password should be atleast 6 characters" });
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "user already exists" });

    //hashing
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName: fullName,
      email: email,
      password: hashPassword,
    });

    if (newUser) {
      // generate jwt tokens here
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        password: newUser.password,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "invaild user data" });
    }
  } catch (error) {
    console.log("error in signup controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("uid", "", { maxAge: 0 });
    res.status(200).json({ message: "logged out sucessfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      res.status(400).json({ message: "Invalid Credentials" });

    // generate token and sent it as cookie
    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
