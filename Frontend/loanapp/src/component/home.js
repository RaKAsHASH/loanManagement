import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoanDashboard = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [emi, setEmi] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const calculateEMI = (loanAmount, interestRate, tenure) => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 12 / 100;
    const months = parseInt(tenure) * 12;

    if (!principal || !rate || !months) {
      return 0;
    }

    const emi = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    return emi.toFixed(2);
  };

  const handleCalculateEmi = (e) => {
    e.preventDefault();
    const emiCalculated = calculateEMI(loanAmount, interestRate, tenure);
    setEmi(emiCalculated);
  };  
  
  const handleLoanSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");

    if (!token) {
        alert("You must be logged in to create a loan.");
        navigate('/login')
        return;
    }

    setLoading(true);
    setError("");
    const loanDetail = { loanAmount, interestRate,tenure };
    try {
      const response = await axios.post("http://localhost:5050/loan", loanDetail, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
      alert(response.data.message);
      navigate("/my-loans");
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setError(error.response.data.message || "Loan Creation failed. Please try again.");
      } else if (error.request) {
        setError("Network error. Please try again later.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f4f7fa",
        height: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <button
          onClick={(e)=> navigate ('/my-loans')}
          style={{
            backgroundColor: "skyblue",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            marginRight:'10px'
          }}
        >
          View My Loans
        </button>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#dc3545",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Logout
        </button>
      </div>

      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        Loan Dashboard
      </h2>

      {error && (
          <div style={{ color: "red", marginBottom: "15px", fontSize: "14px" }}>
            {error}
          </div>
        )}

      <form
        onSubmit={handleCalculateEmi}
        style={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "500px",
          margin: "auto",
          textAlign: "center",
        }}
      >
        <div style={{ marginBottom: "15px", textAlign: "left" }}>
          <label htmlFor="loanAmount" style={{ fontSize: "14px", color: "#555" }}>
            Loan Amount (₹):
          </label>
          <input
            id="loanAmount"
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            placeholder="Enter loan amount"
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

        <div style={{ marginBottom: "15px", textAlign: "left" }}>
          <label htmlFor="interestRate" style={{ fontSize: "14px", color: "#555" }}>
            Interest Rate (% per annum):
          </label>
          <input
            id="interestRate"
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            placeholder="Enter annual interest rate"
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

        <div style={{ marginBottom: "15px", textAlign: "left" }}>
          <label htmlFor="tenure" style={{ fontSize: "14px", color: "#555" }}>
            Loan Tenure (Years):
          </label>
          <input
            id="tenure"
            type="number"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
            placeholder="Enter loan tenure in years"
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
        >
          Calculate EMI
        </button>
      </form>

      {emi && (
        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
            fontSize: "18px",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          <h3>Your EMI: ₹{emi}</h3>
          <button style={{color:'white',backgroundColor:'black',border:'none',padding:'10px 20px',borderRadius:'6px',fontSize:'15px'}} 
                  onClick={(e)=> {handleLoanSubmit(e)}}
                  disabled={loading}
                  >{loading ? "Creating Loan....." : "Create New Loan"}
                  </button>
        </div>
      )}
    </div>
  );
};

export default LoanDashboard;
