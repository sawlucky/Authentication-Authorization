const User = require("../models/user")
const { generateToken } = require("../middlewares/jwtMiddleware");
const { sendResetEmail } = require("../utils/sendMail");
const crypto = require("crypto");
const HandleSignup = async (req, res) => {
    const { username, email, password } = req.body;
    const newUser = new User({
        username, email, password
    })
   const user= await newUser.save();
    console.log("username:", username, email, password);
    const payload = {
        id: user._id,
    }
    const token = generateToken(payload);
    res.cookie("token", token, {
      httpOnly: true,
    });
    
  res.status(200).json({ message:"success",token:token});
};
const HandleUserProfile = async(req,res) => {
    try {
        const userId = req.user.id;
        console.log(userId);
        const user = await User.findById(userId);
        res.status(200).json(user);
    }
    catch (error) {
        console.log(error);

    }
}

const HandleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    console.log("email:", email, "password:", password);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
      }
      console.log(user);

     if(user.password!== password)
     { 
         console.log("invalid password")
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const payload = { id: user._id };
    const token = generateToken(payload);

    console.log("Login token:", token);

    res.cookie("token", token, {
      httpOnly: true,
    });

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const HandleForgotPassword = async(req,res) => {
    const { email } = req.body;
    console.log(email);
      console.log("yaha ayaa h")
         try {
             const user = await User.findOne({ email });
             console.log(user);
           if (!user) {
             return res.status(404).json({ message: "User not found" });
           }

           // Generate a secure reset token
           const resetToken = crypto.randomBytes(32).toString("hex");

           // Store token in the database (you may need to modify User schema)
           user.resetToken = resetToken;
           user.resetTokenExpiry = Date.now() + 3600000; // Token expires in 1 hour
           await user.save();
            console.log("yaha v aaya1");
           // Send reset email
           await sendResetEmail(email, resetToken);
             console.log("yaha v aaya2");
           res
             .status(200)
             .json({ message: "Reset password email sent successfully" });
         } catch (error) {
           console.error("Forgot password error:", error);
           res.status(500).json({ message: "Internal server error" });
         }
}
const HandlePassword = async (req, res) => {
    const { token, newPassword } = req.body;
    try {
         const user = await User.findOne({ resetToken: token });
         if (!user) {
           return res.status(400).json({ message: "Invalid or expired token" });
        }
        user.password = newPassword;
        user.resetToken = null; 
        await user.save();

        res.status(200).json({ message: "Password reset successful!" });
    } catch (error) {
          res.status(500).json({ message: "Internal Server Error" });
    }

}
const HandleLogout = (req,res) => {
    res.clearCookie("token", {
        httpOnly: true,

        
    })
    res.status(200).json({ message: "LoggedOut Succesfully" });
}
module.exports = {
  HandleSignup,
  HandleUserProfile,
  HandleLogout,
  HandleLogin,
  HandleForgotPassword,
  HandlePassword,
};