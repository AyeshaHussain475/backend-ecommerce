const User = require("../models/user");
const jwt = require("jsonwebtoken");
// require("dotenv").config();

exports.signin = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email }).exec();

    if (!existingUser) {
      return res.status(400).json({
        message: "User is not registered",
      });
    }

    if (existingUser.authenticate(req.body.password)) {
      const token = jwt.sign(existingUser.toObject(), process.env.JWT_KEY, {
        expiresIn: 3600,
      });

      return res.status(200).json({
        user: {
          _id: existingUser._id,
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          email: existingUser.email,
          role: existingUser.role,
        },
        token,
      });
    }

    return res.status(400).json({
      message: "Invalid Password",
    });
  } catch (error) {
    console.error("Error during user authentication:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.clothes = async (req, res) => {
  return res.json({
    clothes: [
      { name: "Maria B", image: "../assets/images/baby1.jpg" },
      { name: "Gucci", image: "../assets/images/jean.webp" },
    ],
  });
};
exports.signup = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email }).exec();

    if (existingUser) {
      return res.status(400).json({
        message: "User already registered",
      });
    }

    const { firstName, lastName, email, password } = req.body;
    const newUser = new User({
      firstName,
      lastName,
      email,
      virtualPassword: password,
      userName: Math.random().toString(),
    });

    const savedUser = await newUser.save();

    if (savedUser) {
      return res.status(201).json({
        message: "User created successfully",
      });
    } else {
      return res.status(400).json({
        message: "Something went wrong while creating the user",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
