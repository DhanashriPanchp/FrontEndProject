import React, { useState } from "react";
import Ajv from "ajv";
import { useNavigate } from "react-router-dom";

// Function to generate a unique ID
const generateUniqueId = () => {
  return Date.now().toString() + Math.floor(Math.random() * 1000).toString();
};

const Register = () => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate(); // Initialize useNavigate

  // Define the JSON Schema within the component
  const userSchema = {
    type: "object",
    properties: {
      username: { type: "string", minLength: 1 },
      email: { type: "string", format: "email" },
      password: { type: "string", minLength: 6 }
    },
    required: ["username", "email", "password"]
  };

  const ajv = new Ajv();
  const validate = ajv.compile(userSchema);

  const handleRegister = (e) => {
    e.preventDefault();

    // Validate user data against schema
    if (!validate(user)) {
      alert("Invalid input! Please check your details.");
      return;
    }

    // Retrieve existing users from local storage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    if (existingUsers.some(u => u.email === user.email)) {
      alert("Email already registered!");
      return;
    }

    // Add new user with a unique ID to the list
    const newUser = { ...user, id: generateUniqueId() };
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    alert("User registered successfully!");
    setUser({ username: "", email: "", password: "" });

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;