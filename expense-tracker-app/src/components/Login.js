import React, { useState, useContext } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Ajv from "ajv";
import { motion } from "framer-motion";
import { UserContext } from "./UserContext";
import LoginImage from '../assets/LoginImage.png';
import Header from "./Header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const location = useLocation();
  const { setCurrentUser } = useContext(UserContext);

  // Check for registration success message
  React.useEffect(() => {
    if (location.state?.registrationSuccess) {
      toast.success("User registered successfully!");
    }
  }, [location.state]);

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
      toast.error("Invalid input! Please check your details.");
      return;
    }

    // Retrieve users from local storage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if user exists with matching username and password
    const user = users.find(
      (user) => user.username === credentials.username && user.password === credentials.password
    );

    if (user) {
      setCurrentUser(user);
      navigate("/dashboard");
    } else {
      toast.error("Invalid input! Please check your details.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />

      {/* Main Content Container */}
      <div className="flex-grow flex justify-center items-center">
        <div className="flex w-full max-w-4xl justify-center items-center">
          {/* Image Section */}
          <div className="w-1/2 flex justify-end items-center">
            <div style={{ width: '100%', height: '100%' }}>
              <img src={LoginImage} alt="Login" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Form Section */}
          <div className="flex justify-start items-center w-1/2 max-w-md ml-4">
            <motion.div
              className="bg-white shadow-lg rounded-lg p-8 w-full"
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
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mb-4"
              >
                Login
              </button>
              {/* Signup link */}
              <p className="text-center text-gray-600">
                New user?{" "}
                <Link to="/register" className="text-blue-500 hover:text-blue-700">
                  Sign up
                </Link>
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Toast Container for Notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div >
  );
};

export default Login;