import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import AddExpense from "./AddExpense";
import ExpenseList from "./ExpenseList";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import Header from "./Header";

const Dashboard = () => {
  const { currentUser } = useContext(UserContext);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const storedExpenses = JSON.parse(localStorage.getItem(`expenses_${currentUser.id}`)) || [];
      setExpenses(storedExpenses);
    }
  }, [currentUser]);

  const handleAddExpense = (expense) => {
    if (!currentUser) return;

    const newExpense = {
      ...expense,
      id: Date.now().toString(),
    };

    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    localStorage.setItem(`expenses_${currentUser.id}`, JSON.stringify(updatedExpenses));
  };

  const handleEditExpense = (updatedExpense) => {
    const updatedExpenses = expenses.map(expense =>
      expense.id === updatedExpense.id ? updatedExpense : expense
    );
    setExpenses(updatedExpenses);
    localStorage.setItem(`expenses_${currentUser.id}`, JSON.stringify(updatedExpenses));
  };

  const handleDeleteExpense = (id) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(updatedExpenses);
    localStorage.setItem(`expenses_${currentUser.id}`, JSON.stringify(updatedExpenses));
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      {/* Main Content Container */}
      <div className="flex-grow flex justify-center items-start mt-8">
        <motion.div
          className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">Expense Dashboard</h2>
          <AddExpense onAddExpense={handleAddExpense} />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6"
          >
            {expenses.length > 0 ? (
              <ExpenseList
                expenses={expenses}
                onEditExpense={handleEditExpense}
                onDeleteExpense={handleDeleteExpense}
              />
            ) : (
              <p className="text-center text-gray-600 mt-4">No expenses added yet!</p>
            )}
          </motion.div>
          {/* Link to Analytics Page */}
          <div className="text-center mt-6">
            <Link to="/analytics" className="text-blue-500 hover:text-blue-700 font-bold">
              View Analytics
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;