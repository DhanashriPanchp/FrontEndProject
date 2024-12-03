import React, { useState } from 'react';
import Ajv from 'ajv';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegistrationImage from '../assets/registrationImage.png';

const generateUniqueId = () => {
  return Date.now().toString() + Math.floor(Math.random() * 1000).toString();
};

const Register = () => {
  const [user, setUser] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const userSchema = {
    type: 'object',
    properties: {
      username: { type: 'string', minLength: 1 },
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 6 }
    },
    required: ['username', 'email', 'password']
  };

  const ajv = new Ajv();
  const validate = ajv.compile(userSchema);

  const handleRegister = (e) => {
    e.preventDefault();

    if (!validate(user)) {
      toast.error("Invalid input! Please check your details.");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    if (existingUsers.some(u => u.email === user.email)) {
      toast.error("Email already registered!");
      return;
    }

    const newUser = { ...user, id: generateUniqueId() };
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    navigate("/login", { state: { registrationSuccess: true } });
  };

  return (
    <div className='bg-gray-100 min-h-screen flex flex-col'>
      <Header />
      <div className="flex-grow flex justify-center items-center">
        <div className="flex w-full max-w-4xl justify-center items-center">
          {/* Image Section */}
          <div className="w-1/2 flex justify-end items-center">
            <div style={{ width: '100%', height: '100%' }}>
              <img src={RegistrationImage} alt="Registration" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
            </div>
          </div>
          {/* Form Section */}
          <div className="flex justify-start items-center w-1/2 max-w-md ml-4">
            <motion.div
              className='bg-white shadow-lg rounded-lg p-8 w-full'
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className='text-2xl font-bold mb-4 text-center text-gray-800'>Register</h2>
              <form onSubmit={handleRegister} className='space-y-4'>
                <input type='text' placeholder='Username' value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />
                <input type='email' placeholder='Email' value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />
                <input type='password' placeholder='Password' value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />
                <button type='submit' className='w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg'>Register</button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
      {/* Toast Container for Notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default Register;