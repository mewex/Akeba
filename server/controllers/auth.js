import bcryptLib from "bcrypt";
import jwtLib from "jsonwebtoken";
import UserModel from "../models/User.js";

export const signUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const saltRound = await bcryptLib.genSalt();
    const hashedPassword = await bcryptLib.hash(password, saltRound);

    const userInstance = new UserModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    const storedUser = await userInstance.save();
    res.status(201).json(storedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await UserModel.findOne({ email: email });
    if (!foundUser) return res.status(400).json({ msg: "User does not exist. " });

    const passwordMatch = await bcryptLib.compare(password, foundUser.password);
    if (!passwordMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const authToken = jwtLib.sign({ id: foundUser._id }, process.env.JWT_SECRET);
    delete foundUser.password;
    res.status(200).json({ token: authToken, user: foundUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

