import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Box, useColorModeValue, Select } from '@chakra-ui/react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { getExpense } from '../redux/slices/expenseSlice';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('black', 'white');

  const dispatch = useDispatch();
  const { expenses, isLoading } = useSelector((state) => state.expense);

  const [timePeriod, setTimePeriod] = useState('overall');

  useEffect(() => {
    dispatch(getExpense());
  }, [dispatch]);

  const filterExpensesByPeriod = (expenses, period) => {
    const now = new Date();
    let startDate;
    
    switch (period) {
      case 'week':
        startDate = new Date();
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate = new Date();
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        startDate = new Date();
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        return expenses;
    }

    return expenses.filter(expense => new Date(expense.date) >= startDate);
  };

  const processData = (filteredExpenses) => {
    let labels = [];
    let savingsData = [];
    let expensesData = [];

    if (timePeriod === 'week') {
      // Last week: labels are days of the week
      labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      savingsData = Array(7).fill(0);
      expensesData = Array(7).fill(0);

      filteredExpenses.forEach(expense => {
        const day = new Date(expense.date).getDay();
        if (expense.transaction === 'income') {
          savingsData[day] += expense.amount;
        } else if (expense.transaction === 'expense') {
          expensesData[day] += expense.amount;
        }
      });

    } else if (timePeriod === 'month') {
      // Last month: labels are days of the month
      const daysInMonth = new Date().getDate();
      labels = Array.from({ length: daysInMonth }, (_, i) => i + 1);
      savingsData = Array(daysInMonth).fill(0);
      expensesData = Array(daysInMonth).fill(0);

      filteredExpenses.forEach(expense => {
        const day = new Date(expense.date).getDate();
        if (expense.transaction === 'income') {
          savingsData[day - 1] += expense.amount;
        } else if (expense.transaction === 'expense') {
          expensesData[day - 1] += expense.amount;
        }
      });

    } else if (timePeriod === 'year') {
      // Last year: labels are months of the year
      labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      savingsData = Array(12).fill(0);
      expensesData = Array(12).fill(0);

      filteredExpenses.forEach(expense => {
        const month = new Date(expense.date).getMonth();
        if (expense.transaction === 'income') {
          savingsData[month] += expense.amount;
        } else if (expense.transaction === 'expense') {
          expensesData[month] += expense.amount;
        }
      });

    } else {
      // Overall: labels are months of the year
      labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      savingsData = Array(12).fill(0);
      expensesData = Array(12).fill(0);

      filteredExpenses.forEach(expense => {
        const month = new Date(expense.date).getMonth();
        if (expense.transaction === 'income') {
          savingsData[month] += expense.amount;
        } else if (expense.transaction === 'expense') {
          expensesData[month] += expense.amount;
        }
      });
    }

    return { labels, savingsData, expensesData: expensesData.map(amount => -amount) }; // Convert expenses to negative
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const filteredExpenses = filterExpensesByPeriod(expenses, timePeriod);
  const { labels, savingsData, expensesData } = processData(filteredExpenses);

  const data = {
    labels,
    datasets: [
      {
        label: 'Savings',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)',
        hoverBorderColor: 'rgba(75, 192, 192, 1)',
        data: savingsData,
      },
      {
        label: 'Expenses',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
        hoverBorderColor: 'rgba(255, 99, 132, 1)',
        data: expensesData,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: textColor,
        },
      },
      title: {
        display: true,
        text: 'Savings and Expenses',
        color: textColor,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: textColor,
        },
      },
      x: {
        ticks: {
          color: textColor,
        },
      },
    },
  };

  return (
    <Box width={{ base: '100%', md: '80%' }} margin="auto" padding="20px" bg={bgColor} borderRadius="md" boxShadow="md">
      <Select value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)} mb="20px" focusBorderColor='lime'>
        <option value="overall">Overall</option>
        <option value="week">Last Week</option>
        <option value="month">Last Month</option>
        <option value="year">Last Year</option>
      </Select>
      <Bar data={data} options={options} />
    </Box>
  );
};

export default BarChart;
