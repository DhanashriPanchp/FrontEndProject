import React, { useState } from "react";
import AddExpense from "./AddExpense";
import ExpenseList from "./ExpenseList";

const initialExpenses = [
  {
    id: "1",
    title: "Groceries",
    amount: 50.0,
    category: "Other",
    date: "2024-11-01",
  },
  {
    id: "2",
    title: "Taxi",
    amount: 20.0,
    category: "Transport",
    date: "2024-11-02",
  },
  {
    id: "3",
    title: "Pizza",
    amount: 20.0,
    category: "Food",
    date: "2024-11-02",
  },
];

const Dashboard = () => {
  const [expenses, setExpenses] = useState(initialExpenses);

  const handleAddExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
    };
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Expense Dashboard</h2>
      <AddExpense onAddExpense={handleAddExpense} />
      {expenses.length > 0 ? (
        <ExpenseList expenses={expenses} />
      ) : (
        <p className="text-center text-gray-600 mt-4">No expenses added yet!</p>
      )}
    </div>
  );
};

export default Dashboard;
