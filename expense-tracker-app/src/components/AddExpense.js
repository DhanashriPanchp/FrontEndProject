import React, { useState } from "react";

const AddExpense = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({ title: "", amount: "", category: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!expense.title || !expense.amount || !expense.category) {
      alert("Please fill out all fields!");
      return;
    }
    onAddExpense({ ...expense, amount: parseFloat(expense.amount) });
    setExpense({ title: "", amount: "", category: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Expense Title"
          value={expense.title}
          onChange={(e) => setExpense({ ...expense, title: e.target.value })}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <input
          type="number"
          placeholder="Amount"
          value={expense.amount}
          onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <select
          value={expense.category}
          onChange={(e) => setExpense({ ...expense, category: e.target.value })}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            Select Category
          </option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg w-full"
      >
        Add Expense
      </button>
    </form>
  );
};

export default AddExpense;
