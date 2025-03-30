import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/resetPassword",
        { token, newPassword: passwords.newPassword },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        alert("Password reset successful!");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("Password reset failed. Try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={passwords.newPassword}
          onChange={handleChange}
          required
          style={{ display: "block", margin: "10px auto", padding: "8px" }}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={passwords.confirmPassword}
          onChange={handleChange}
          required
          style={{ display: "block", margin: "10px auto", padding: "8px" }}
        />
        <button
          type="submit"
          style={{ padding: "8px 20px", marginTop: "10px" }}
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
