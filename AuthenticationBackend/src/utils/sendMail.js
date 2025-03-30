const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "arjunsaw5650@gmail.com",
    pass: "xigpwikrvsaasube",
  },
});
const sendResetEmail = async (userEmail, resetToken) => {
   const resetLink = `http://localhost:5173/login/${resetToken}`;

   const mailOptions = {
     from:"arjunsaw5650@gmail.com" ,
     to: userEmail,
     subject: "Reset Your Password",
     html: `
            <p>You requested a password reset.</p>
            <p>Click the link below to reset your password:</p>
            <a href="${resetLink}" target="_blank">Reset Password</a>
        `,
     text: `Use this link to reset your password: ${resetLink}`,
   };

   try {
     await transporter.sendMail(mailOptions);
     console.log("Password reset email sent to:", userEmail);
   } catch (error) {
     console.error("Error sending email:", error);
     throw new Error("Email sending failed");
   }
}
module.exports = {sendResetEmail};