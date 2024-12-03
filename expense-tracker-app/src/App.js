import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ExpenseList from "./components/ExpenseList";
import AddExpense from "./components/AddExpense";
import LandingPage from "./components/LandingPage";
import Register from "./components/Register";
import Analytics from "./components/Analytics";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/addExpense" element={<AddExpense />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/expenseList" element={<ExpenseList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
