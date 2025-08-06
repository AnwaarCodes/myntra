const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ 
            userId: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.json({
            message: "Login successful",
            token,
            user: {
                name: user.name,
                email: user.email,
            },
        })

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const googleAuth = async (req, res) => {
  try {

    // console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID); // Debug line
    // console.log("Received token:", req.body.token);
    const { token } = req.body;
     if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    let user = await User.findOne({ email });

    // If user doesn't exist, create it
    if (!user) {
      user = new User({
        name,
        email,
        password: null, 
      });
      await user.save();
    }

    const authToken = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Google login successful",
      token: authToken,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid Google token" });
  }
};

module.exports = { signup, login, googleAuth };