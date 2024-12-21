import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const userCredentials = { email, password };
    try {
      const response = await axios.post("http://localhost:5050/login", userCredentials);
      localStorage.setItem("authToken", response.data.token);
      alert("SuccessFully LogIn ");
      navigate("/home");
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setError(error.response.data.message || "Login failed. Please try again.");
      } else if (error.request) {
        setError("Network error. Please try again later.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f7fa",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "#333" }}>
          Login
        </h2>

        {error && (
          <div style={{ color: "red", marginBottom: "15px", fontSize: "14px" }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: "20px", textAlign: "left" }}>
          <label htmlFor="email" style={{ fontSize: "14px", color: "#555" }}>
            Email:
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "14px",
              marginTop: "5px",
              boxSizing: "border-box",
              outline: "none",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px", textAlign: "left" }}>
          <label htmlFor="password" style={{ fontSize: "14px", color: "#555" }}>
            Password:
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "14px",
              marginTop: "5px",
              boxSizing: "border-box",
              outline: "none",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#007BFF",
            color: "white",
            padding: "12px 20px",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            cursor: "pointer",
            width: "100%",
            marginTop: "20px",
          }}
          disabled={loading}
        >
          {loading ? "Logging In..." : "Login"}
        </button>

        <div style={{ marginTop: "20px", fontSize: "14px", color: "#555" }}>
          Don't have an account?
          <button
            type="button"
            onClick={() => navigate("/signup")}
            style={{
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              padding: "8px 14px",
              borderRadius: "6px",
              cursor: "pointer",
              marginLeft: "10px",
            }}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
