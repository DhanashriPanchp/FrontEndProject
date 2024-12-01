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
      {filteredExpenses.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredExpenses.map((expense, index) => (
              <tr key={index}>
                <td className="px-4 py-2 whitespace-nowrap">{expense.title}</td>
                <td className="px-4 py-2 whitespace-nowrap">${expense.amount}</td>
                <td className="px-4 py-2 whitespace-nowrap">{expense.category}</td>
                <td className="px-4 py-2 whitespace-nowrap">{expense.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-600 mt-4">No expenses found!</p>
      )}
    </div>
  );
};

export default ExpenseList;