import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllLoansPage = () => {
  const [loans, setLoans] = useState([]);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(1);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchLoans = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const response = await axios.get("http://localhost:5050/loans", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setLoans(response.data.loans);
      setFilteredLoans(response.data.loans);
    } catch (error) {
      setError("Failed to fetch loans.");
    }
  };

  const applyFiltersAndSort = () => {
    let filtered = [...loans];
    if (statusFilter !== "all") {
      filtered = filtered.filter(loan => loan.status === statusFilter);
    }
    if (sortOrder === "asc") {
      filtered.sort((a, b) => a.amount - b.amount);
    } else {
      filtered.sort((a, b) => b.amount - a.amount);
    }
    setFilteredLoans(filtered);
  };

  const handleStatusChange = async (loanId, status) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }
    const response = await axios.post(`http://localhost:5050/loan/${loanId}`, {status},{
        headers: { Authorization: `Bearer ${token}` },
      });
    fetchLoans()
  };

  const getCurrentPageLoans = () => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;
    return filteredLoans.slice(startIndex, endIndex);
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [statusFilter, sortOrder, loans]);


  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f4f7fa", height: "100vh", fontFamily: "Arial, sans-serif" }}>

<div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <button
          onClick={(e)=> navigate ('/home')}
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
          Create New Loan
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
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333", fontSize: "28px" }}>All Loan Applications</h2>

      {error && <div style={{ color: "red", marginBottom: "15px", fontSize: "14px" }}>{error}</div>}


      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: "15px" }}>
          <label style={{ fontSize: "14px", color: "#555" }}>Filter by Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ddd",
              fontSize: "14px",
              outline: "none",
            }}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

          <label style={{ fontSize: "14px", color: "#555" }}>Sort by Amount:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ddd",
              fontSize: "14px",
              outline: "none",
            }}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>


      <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse", border: "1px solid #ddd", borderRadius: "4px" }}>
        <thead style={{ backgroundColor: "#007bff", color: "white" }}>
          <tr>
            <th style={{ padding: "12px", textAlign: "left" }}>Loan Amount</th>
            <th style={{ padding: "12px", textAlign: "left" }}>Interest Rate</th>
            <th style={{ padding: "12px", textAlign: "left" }}>Tenure (Years)</th>
            <th style={{ padding: "12px", textAlign: "left" }}>Status</th>
            <th style={{ padding: "12px", textAlign: "left" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {getCurrentPageLoans().map((loan) => (
            <tr key={loan.id} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "10px" }}>{loan.amount}</td>
              <td style={{ padding: "10px" }}>{loan.interestRate}</td>
              <td style={{ padding: "10px" }}>{loan.tenure}</td>
              <td style={{ padding: "10px" }}>{loan.status}</td>
              <td style={{ padding: "10px" }}>
                {loan.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleStatusChange(loan.id, "approved")}
                      style={{
                        backgroundColor: "#28a745",
                        color: "white",
                        padding: "6px 12px",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        marginRight: "10px",
                      }}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange(loan.id, "rejected")}
                      style={{
                        backgroundColor: "#dc3545",
                        color: "white",
                        padding: "6px 12px",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
          style={{
            padding: "8px 15px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          Previous
        </button>
        <span style={{ fontSize: "16px", fontWeight: "bold" }}>{` Page ${page} `}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page * itemsPerPage >= filteredLoans.length}
          style={{
            padding: "8px 15px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginLeft: "10px",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllLoansPage;
