import React from 'react';
import { motion } from 'framer-motion';
import Header from './Header'; // Importing the updated Header component
import featureImage1 from '../assets/featureImage1.png'; // Example images
import featureImage2 from '../assets/featureImage2.jpg';
import featureImage3 from '../assets/featureImage3.png';

const LandingPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Use Header Component */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section with Solid Background Color */}
        <section
          className="flex flex-col justify-center items-center text-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10 max-w-xl mx-auto px-4"
          >
            <h1 className="text-5xl font-extrabold mb-6">Welcome to Expense Tracker</h1>
            <p className="text-lg mb-8">
              Take control of your finances with our easy-to-use expense tracking application. Whether you're budgeting for a trip or managing daily expenses, our tool helps you stay on top of your financial game.
            </p>
            <a
              href="/login"
              className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 hover:bg-gray-200"
            >
              Start Tracking Now
            </a>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="bg-gray-100 py-20">
          <div className="max-w-screen-lg mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="text-3xl font-semibold text-gray-700 mb-8 text-center"
            >
              Key Features:
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { img: featureImage1, title: 'Real-time Expense Tracking', description: 'Monitor your expenses as they happen.' },
                { img: featureImage2, title: 'Detailed Reports and Analytics', description: 'Gain insights into your spending habits.' },
                { img: featureImage3, title: 'Customizable Categories and Budgets', description: 'Tailor categories to fit your needs.' },
              ].map((feature, index) => (
                <motion.article 
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.3 }}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <figure>
                    <img src={feature.img} alt={feature.title} className="w-full h-48 object-cover rounded-t-lg" />
                    <figcaption className="mt-4">
                      <h3 className="text-xl font-bold text-gray-800">{feature.title}</h3>
                      <p className="text-gray-600 mt-2">{feature.description}</p>
                    </figcaption>
                  </figure>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-200 py-6 text-center">
        <p className="text-gray-600">&copy; {new Date().getFullYear()} Expense Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;