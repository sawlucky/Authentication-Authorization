import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Secret = () => {
  const [availableToken, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login"); 
    } else {
      setToken(token);
    }
  }, [navigate]); // Include navigate in dependencies

  if (!availableToken) return null; // Prevent rendering before token check is complete

  return <div>There is a secret here</div>;
};

export default Secret;
