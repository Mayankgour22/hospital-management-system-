import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", 
    specialization: "",
  });

  const [message, setMessage] = useState("");

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/signup",
        formData
      );
      setMessage(res.data.message);
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "user",
        specialization: "",
      });
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        backgroundColor: "#f8f9fa",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#007bff" }}>Hospital Signup</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <label>Register as:</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        >
          <option value="user">User / Patient</option>
          <option value="doctor">Doctor</option>
        </select>

        
        {formData.role === "doctor" && (
          <>
            <label>Specialization:</label>
            <input
              type="text"
              name="specialization"
              placeholder="e.g. Cardiologist"
              value={formData.specialization}
              onChange={handleChange}
              style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
              required
            />
          </>
        )}

        <button
          type="submit"
          style={{
            width: "100%",
            backgroundColor: "#007bff",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Signup
        </button>
      </form>

      {message && (
        <p style={{ textAlign: "center", marginTop: "10px", color: "green" }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Signup;
