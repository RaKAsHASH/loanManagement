import React, { useState } from "react";
import Login from "./component/login.js";
import Signup from "./component/signUp.js";
import "./App.css";
import { BrowserRouter as Router, Routes, Route ,Navigate} from "react-router-dom";
import LoanDashboard from "./component/home.js";
import AllLoansPage from "./component/myLoans.js";

function App() {
  return (

    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} name='signUp' />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/home" element={<LoanDashboard />} />
          <Route path="/my-loans" element={<AllLoansPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;