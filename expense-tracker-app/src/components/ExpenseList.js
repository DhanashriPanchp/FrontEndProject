import React, { useState } from "react";

const ExpenseList = ({ expenses }) => {
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.title.toLowerCase().includes(search.toLowerCase()) &&
      (!filterCategory || expense.category === filterCategory)
  );

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search Expenses"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          onChange={(e) => setFilterCategory(e.target.value)}
          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <ul className="divide-y divide-gray-200">
        {filteredExpenses.map((expense, index) => (
          <li key={index} className="py-2">
            <span className="font-semibold">{expense.title}</span> - ${expense.amount} (
            <span className="text-gray-500">{expense.category}</span>)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
