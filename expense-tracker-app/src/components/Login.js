import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Ajv from "ajv";
import { motion } from "framer-motion";
import { UserContext } from "./UserContext";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);

  // Define JSON schema for login credentials
  const credentialsSchema = {
    type: "object",
    properties: {
      username: { type: "string", minLength: 1 },
      password: { type: "string", minLength: 6 }
    },
    required: ["username", "password"]
  };

  const ajv = new Ajv();
  const validate = ajv.compile(credentialsSchema);

  const handleLogin = () => {
    // Validate credentials against schema
    if (!validate(credentials)) {
      alert("Invalid input! Please check your details.");
      return;
    }

    // Retrieve users from local storage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if user exists with matching username and password
    const user = users.find(
      (user) => user.username === credentials.username && user.password === credentials.password
    );

    if (user) {
      alert("Logged In");
      setCurrentUser(user);
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <motion.div
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          className="w-full p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          className="w-full p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Login
        </button>
      </motion.div>
    </div>
  );
};

export default Login;