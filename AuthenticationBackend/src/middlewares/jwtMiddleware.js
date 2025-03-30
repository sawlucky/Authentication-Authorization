const jwt = require("jsonwebtoken");
require("dotenv").config();
const generateToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
    return token;
}
const JwtMiddleware = (req, res, next) => {
  try {
      const token = req.cookies.token;
      console.log(token);
    if (!token)
      return res.status(401).send("Access denied. No token provided.");
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send("Error:" + error?.message);
  }
};
module.exports = { generateToken, JwtMiddleware };