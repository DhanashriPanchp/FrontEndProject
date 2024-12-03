import React, { useState } from "react";

const ExpenseList = ({ expenses, onEditExpense, onDeleteExpense }) => {
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({ title: "", amount: "", category: "", date: "" });

  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.title.toLowerCase().includes(search.toLowerCase()) &&
      (!filterCategory || expense.category === filterCategory)
  );

  const handleEditClick = (expense) => {
    setEditingId(expense.id);
    setEditFormData(expense);
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = () => {
    if (!editFormData.title || !editFormData.amount || !editFormData.category || !editFormData.date) {
      alert("Please fill out all fields!");
      return;
    }
    onEditExpense(editFormData);
    setEditingId(null);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      onDeleteExpense(id);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mt-6 overflow-x-auto" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search Expenses"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Other">Other</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
          <option value="Clothing">Clothing</option>
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
              <th className="px-4 py-2"></th> {/* Actions column */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredExpenses.map((expense) => (
              editingId === expense.id ? (
                // Edit form for the selected expense
                <tr key={expense.id}>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <input
                      type="text"
                      name="title"
                      value={editFormData.title}
                      onChange={handleEditChange}
                      className="w-full p-1 border rounded"
                    />
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <input
                      type="number"
                      name="amount"
                      value={editFormData.amount}
                      onChange={handleEditChange}
                      className="w-full p-1 border rounded"
                    />
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <select
                      name="category"
                      value={editFormData.category}
                      onChange={handleEditChange}
                      className="w-full p-1 border rounded"
                    >
                      <option value="">Select Category</option>
                      <option value="Food">Food</option>
                      <option value="Transport">Transport</option>
                      <option value="Utilities">Utilities</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Health">Health</option>
                      <option value="Education">Education</option>
                      <option value="Clothing">Clothing</option>
                      <option value="Other">Other</option>
                    </select>
                  </td>
                  {/* Editable date field */}
                  <td className="px-4 py-2 whitespace-nowrap">
                    <input
                      type="date"
                      name="date"
                      value={editFormData.date}
                      onChange={handleEditChange}
                      className="w-full p-1 border rounded"
                    />
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap flex space-x-3">
                    {/* Update button */}
                    <button
                      onClick={handleEditSubmit}
                      className="text-green-600 hover:text-green-900"
                    >
                      Update
                    </button>
                    {/* Cancel button */}
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ) : (
                // Display row for each expense
                <tr key={expense.id}>
                  <td className="px-4 py-2 whitespace-nowrap">{expense.title}</td>
                  <td className="px-4 py-2 whitespace-nowrap">${expense.amount}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{expense.category}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{expense.date}</td>
                  <td className="px-4 py-2 whitespace-nowrap flex space-x-3">
                    {/* Edit and Delete buttons */}
                    <button
                      onClick={() => handleEditClick(expense)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(expense.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
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