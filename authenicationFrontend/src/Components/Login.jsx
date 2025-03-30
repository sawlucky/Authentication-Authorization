import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [forgotEmail, setForgotEmail] = useState({ email: "" });

  const [forgotPassword, setForgotPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        loginData, // <-- Use loginData instead of forgotEmail
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(response.data);
      if (response.status === 200) {
        localStorage.setItem("authToken", response.data.token);
        console.log(response.data.token);
        navigate("/");
      }

      setLoginData({ email: "", password: "" });
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid credentials. Please try again.");
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!forgotEmail.email) {
      alert("Please enter your email.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/forgotPassword",
        { email: forgotEmail.email }, // <-- Fix incorrect wrapping
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Response:", response.data);
        alert("Password reset link sent to your email.");
        navigate("/login");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      alert("Error sending reset email. Please try again.");
    }
  };

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>{forgotPassword ? "Reset Password" : "Login"}</h2>
      <form onSubmit={forgotPassword ? handleForgotPassword : handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={forgotPassword ? forgotEmail.email : loginData.email}
          onChange={
            forgotPassword
              ? (e) => setForgotEmail({ email: e.target.value })
              : handleChange
          }
          required
          style={{ display: "block", margin: "10px auto", padding: "8px" }}
        />
        {!forgotPassword && (
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
            required
            style={{ display: "block", margin: "10px auto", padding: "8px" }}
          />
        )}
        <button
          type="submit"
          style={{ padding: "8px 20px", marginTop: "10px" }}
        >
          {forgotPassword ? "Reset Password" : "Login"}
        </button>
      </form>
      <p
        style={{ cursor: "pointer", color: "blue", marginTop: "10px" }}
        onClick={() => setForgotPassword(!forgotPassword)}
      >
        {forgotPassword ? "Back to Login" : "Forgot Password?"}
      </p>
    </div>
  );
};

export default Login;
