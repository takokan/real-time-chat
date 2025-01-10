import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

export const signup = async (req, res) => {
  const {fullName, email, password} = req.body;
  try {
    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "password should be atleast 6 characters" });
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "user already exists" });

    //hashing
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName: fullName,
      email: email,
      password: hashPassword,
    })

    if (newUser) {
      // generate jwt tokens here
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      })
    } else {
      res.status(400).json({ message: "invaild user data" })
    }
  } catch (error) {
    console.log("error in signup controller", error.message);
    res.status(500).json({ message: "Internal server error" })
  }
};
export const logout = (req, res) => {
  res.send("logout route");
};

export const login = (req, res) => {
  res.send("login route");
};
