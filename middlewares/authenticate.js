const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];

    const decodedUser = jwt.verify(token, process.env.JWT_KEY);
    const userExists = await User.findOne({ email: decodedUser.email });

    if (!userExists) {
      throw new Error("Failed to authenticate");
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authenticate;
