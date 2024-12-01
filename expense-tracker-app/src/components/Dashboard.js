import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import AddExpense from "./AddExpense";
import ExpenseList from "./ExpenseList";
import { UserContext } from "./UserContext";

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
      date: new Date().toISOString().split("T")[0],
    };

    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    localStorage.setItem(`expenses_${currentUser.id}`, JSON.stringify(updatedExpenses));
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex justify-center items-center">
      <motion.div
        className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-6"
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
        >
          {expenses.length > 0 ? (
            <ExpenseList expenses={expenses} />
          ) : (
            <p className="text-center text-gray-600 mt-4">No expenses added yet!</p>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;