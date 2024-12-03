import React, { useState, useEffect, useContext, useCallback } from 'react';
import { BarChart, Bar, PieChart, Pie, Tooltip, XAxis, YAxis, Cell } from 'recharts';
import { UserContext } from './UserContext';
import Header from "./Header";

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1', '#a4de6c', '#d0ed57', '#8a2be2']; // Define a color palette

const Analytics = () => {
    const { currentUser } = useContext(UserContext);
    const [expenses, setExpenses] = useState([]);
    const [barTimeFrame, setBarTimeFrame] = useState('monthly');
    const [pieTimeFrame, setPieTimeFrame] = useState('monthly');
    const [filteredBarExpenses, setFilteredBarExpenses] = useState([]);
    const [filteredPieExpenses, setFilteredPieExpenses] = useState([]);

    useEffect(() => {
        if (currentUser) {
            const storedExpenses = JSON.parse(localStorage.getItem(`expenses_${currentUser.id}`)) || [];
            setExpenses(storedExpenses);
        }
    }, [currentUser]);

    const filterExpenses = useCallback((expenses, timeFrame) => {
        const now = new Date();
        if (timeFrame === 'weekly') {
            return expenses.filter(expense => isCurrentWeek(new Date(expense.date), now));
        } else if (timeFrame === 'monthly') {
            return expenses.filter(expense => new Date(expense.date).getMonth() === now.getMonth());
        } else {
            return expenses.filter(expense => new Date(expense.date).getFullYear() === now.getFullYear());
        }
    }, []);

    useEffect(() => {
        setFilteredBarExpenses(filterExpenses(expenses, barTimeFrame));
        setFilteredPieExpenses(filterExpenses(expenses, pieTimeFrame));
    }, [expenses, barTimeFrame, pieTimeFrame, filterExpenses]);

    const isCurrentWeek = (date, now) => {
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        return date >= startOfWeek;
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <Header />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">

                <div className="mb-8 p-6 bg-white shadow-md rounded-lg w-full max-w-4xl">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold">Expense Distribution by Category</h3>
                        <select
                            onChange={(e) => setBarTimeFrame(e.target.value)}
                            value={barTimeFrame}
                            className="p-2 border border-gray-300 rounded"
                        >
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                    </div>
                    <p className="text-sm text-gray-600 mb-4 text-center">This chart shows the distribution of your expenses across different categories.</p>
                    <div className="flex justify-center">
                        <BarChart width={800} height={400} data={filteredBarExpenses}>
                            <XAxis dataKey="category" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="amount" isAnimationActive={true} animationDuration={1500}>
                                {filteredBarExpenses.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </div>
                </div>

                <div className="mb-8 p-6 bg-white shadow-md rounded-lg w-full max-w-4xl">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold">
                            Expense Percentage Breakdown</h3>
                        <select
                            onChange={(e) => setPieTimeFrame(e.target.value)}
                            value={pieTimeFrame}
                            className="p-2 border border-gray-300 rounded"
                        >
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                    </div>
                    <p className="text-sm text-gray-600 mb-4 text-center">This chart shows the percentage breakdown of your expenses by category.</p>
                    <div className="flex justify-center">
                        <PieChart width={400} height={400}>
                            <Pie
                                data={filteredPieExpenses}
                                dataKey="amount"
                                nameKey="category"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                                isAnimationActive={true}
                                animationDuration={1500}
                            >
                                {filteredPieExpenses.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;