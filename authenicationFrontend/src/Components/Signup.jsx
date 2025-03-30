import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
   
    const navigate = useNavigate();
    const handleChange = (e) => {
      
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(formData);
     try {
    const response = await axios.post(
      "http://localhost:8080/signup",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
         console.log(response.data);
         if (response.status === 200)
         { 
              localStorage.setItem("authToken", response.data.token);
             console.log(response.data.token);
             navigate("/");
             }
  
    setFormData({ username: "", email: "", password: "" }); // Reset form
  } catch (error) {
    console.error("Error signing up:", error.response?.data || error.message);
  }
  };

  return (
    <div
      style={{ maxWidth: "300px", margin: "50px auto", textAlign: "center" }}
    >
      <h3>Signup</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          style={{
            display: "block",
            width: "100%",
            marginBottom: "10px",
            padding: "8px",
          }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{
            display: "block",
            width: "100%",
            marginBottom: "10px",
            padding: "8px",
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{
            display: "block",
            width: "100%",
            marginBottom: "10px",
            padding: "8px",
          }}
        />
        <button
          type="submit"
          style={{ padding: "8px 15px", cursor: "pointer" }}
        >
          Signup
        </button>
      </form>

      <div className="flex flex-col items-center justify-center">
     
        <button
          
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          aria-label="Login with Google"
        >
          Login with google
        </button>
      </div>
    </div>
  );
};

export default Signup;
