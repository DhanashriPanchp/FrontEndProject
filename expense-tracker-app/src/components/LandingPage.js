import React from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import featureImage1 from '../assets/featureImage1.png';
import featureImage2 from '../assets/featureImage2.jpg';
import featureImage3 from '../assets/featureImage3.png';
// import heroBackground from '../assets/financing.jpg';
import Logo from '../assets/logo.png';

const LandingPage = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white text-black shadow-md py-4">
        <div className="container mx-auto flex items-center justify-between px-4">
          <a href="/" className="flex items-center cursor-pointer">
            <img src={Logo} alt="Expense Tracker Logo" className="h-8 mr-3" />
            <span className="text-xl font-bold">Expense Tracker</span>
          </a>
          <nav className="flex space-x-4">
            <button onClick={() => scrollToSection('features')} className="hover:text-gray-700">Features</button>
            <button onClick={() => scrollToSection('testimonials')} className="hover:text-gray-700">Testimonials</button>
            <button onClick={() => scrollToSection('faqs')} className="hover:text-gray-700">FAQs</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-gray-700">About</button>
            <a href="/login" className="hover:text-gray-700">Login</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <section id="hero" className="flex justify-center items-center bg-white text-black relative overflow-hidden" style={{ height: 'calc(100vh - 64px)' }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="relative z-10 max-w-xl mx-4 px-4 text-center">
            <h1 className="text-6xl font-extrabold mb-6 leading-tight">Your money. Made simple.</h1>
            <p className="text-xl mb-8">Take control of your finances. Track expenses, save money, and plan your future!</p>
            <motion.a href="/register" whileHover={{ scale: 1.05 }} className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 hover:bg-indigo-700">
              Get Started
            </motion.a>
          </motion.div>

          {/* Down Arrow */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }} className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer" onClick={() => scrollToSection('features')}>
            <FaChevronDown size={30} className="animate-bounce text-black" />
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-white py-20">
          <div className="max-w-screen-lg mx-auto px-4">
            <motion.h2 initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="text-4xl font-semibold text-gray-700 mb-8 text-center">
              Features
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { img: featureImage1, title: 'Quick Expense Logging', description: 'Add expenses in seconds and keep track of your spending.' },
                { img: featureImage2, title: 'Visual Spending Insights', description: 'Understand your financial health at a glance with bold visuals.' },
                { img: featureImage3, title: 'Customizable Budgets', description: 'Create budgets that fit your lifestyle and spending habits.' },
              ].map((feature, index) => (
                <motion.article key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.3 }} className="bg-gray-100 rounded-lg shadow-md p-6 hover:bg-gray-200 transition-all duration-300">
                  <figure>
                    <img src={feature.img} alt={feature.title} className="w-full h-48 object-cover rounded-t-lg" />
                    <figcaption className="mt-4 text-center">
                      <h3 className="text-xl font-bold text-gray-800">{feature.title}</h3>
                      <p className="text-gray-600 mt-2">{feature.description}</p>
                    </figcaption>
                  </figure>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="bg-gray-50 py-20">
          <div className="max-w-screen-lg mx-auto px-4">
            <motion.h2 initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="text-4xl font-semibold text-gray-700 mb-8 text-center">
              What Our Users Say
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { name: 'John Doe', feedback: 'This app has transformed the way I manage my finances. Highly recommend!', imageUrl: 'https://via.placeholder.com/150' },
                { name: 'Jane Smith', feedback: 'A must-have tool for anyone serious about budgeting.', imageUrl: 'https://via.placeholder.com/150' },
              ].map((testimonial, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.3 }} className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 hover:bg-gray-100 transition-all duration-300">
                  <img src={testimonial.imageUrl} alt={testimonial.name} className="w-16 h-16 rounded-full" />
                  <div>
                    <p className="text-lg font-semibold">{testimonial.name}</p>
                    <p className="text-gray-600">{testimonial.feedback}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* FAQs Section */}
          <section id="faqs" className="bg-white py-20">
            <div className="max-w-screen-lg mx-auto px-4">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-semibold text-gray-700 mb-8 text-center"
              >
                FAQs
              </motion.h2>
              <div className="space-y-6">
                {[
                  {
                    question: "How do I track my expenses?",
                    answer:
                      "You can log expenses manually by entering the amount, category, and date. Our app also supports receipt scanning for quick entry.",
                  },
                  {
                    question: "Can I set budgets?",
                    answer:
                      "Yes, you can create customizable budgets to manage your spending across different categories.",
                  },
                  {
                    question: "Is my financial data secure?",
                    answer:
                      "We use industry-standard encryption to ensure your data is safe and secure.",
                  },
                ].map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <h3 className="text-xl font-bold text-gray-800">{faq.question}</h3>
                    <p className="text-gray-600 mt-2">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="bg-gray-50 py-20">
            <div className="max-w-screen-lg mx-auto px-4">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-semibold text-gray-700 mb-8 text-center"
              >
                About Us
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-lg text-gray-600 mb-6"
              >
                At Expense Tracker, we are dedicated to helping you manage your finances effortlessly. Our mission is to provide a simple yet powerful tool that empowers individuals to take control of their financial lives.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-lg text-gray-600"
              >
                Founded in 2024, we have continuously worked to improve our platform based on user feedback and the latest technological advancements. Join us on our journey to make financial management accessible and stress-free for everyone.
              </motion.p>
            </div>
          </section>

          {/* Footer */}
          <footer className="w-full bg-gray-x00 py-x text-center">
            <div className="max-w-screen-lg mx-auto px-x">
              <p className="text-1xl font-semibold text-gray-700 mb-8 text-center">&copy; {new Date().getFullYear()} Expense Tracker. All rights reserved.</p>
            </div>
          </footer>

        </section>
      </main>

    </div>
  );
};

export default LandingPage;