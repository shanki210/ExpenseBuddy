// PolarChart.js
import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { getExpense } from '../redux/slices/expenseSlice';
import { useEffect } from 'react';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const PolarChart = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('black', 'white');
  const dispatch = useDispatch();

  const { expenses, isLoading } = useSelector((state) => state.expense);

  useEffect(() => {
    dispatch(getExpense());
  }, [dispatch]);

  const processData = () => {
    const categories = ['food', 'groceries', 'sports', 'shopping', 'miscellaneous', 'repayments', 'logistics'];
    return categories.map(category => {
      return expenses.filter(expense => expense.category === category).reduce((total, expense) => total + expense.amount, 0);
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const data = {
    labels: ['Food', 'Groceries', 'Sports', 'Shopping', 'Miscellaneous', 'Repayments', 'Logistics'],
    datasets: [
      {
        label: 'Expenses',
        data: processData(),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(99, 255, 132, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(99, 255, 132, 1)',
        ],
        borderWidth: 1,
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
        text: 'Expenses by Category',
        color: textColor,
      },
    },
    scales: {
      r: {
        ticks: {
          color: textColor,
        },
      },
    },
  };

  return (
    <Box
      width={{ base: '100%', md: '80%' }}
      margin="auto"
      padding="20px"
      bg={bgColor}
      borderRadius="md"
      boxShadow="md"
    >
      <PolarArea data={data} options={options} />
    </Box>
  );
};

export default PolarChart;
