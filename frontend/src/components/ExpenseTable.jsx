// ExpenseTable.js
import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Icon } from '@chakra-ui/react';
import { FaUtensils, FaShoppingCart, FaRunning, FaTshirt, FaMoneyBillWave, FaTruck, FaQuestionCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getExpense } from '../redux/slices/expenseSlice';
import { useEffect } from 'react';
import SkeletonLoader from './SkeletonLoader';

const data = [
  { date: '2024-06-01', amount: 50, category: 'Food' },
  { date: '2024-06-02', amount: 100, category: 'Groceries' },
  { date: '2024-06-03', amount: 30, category: 'Sports' },
  { date: '2024-06-04', amount: 200, category: 'Shopping' },
  { date: '2024-06-05', amount: 150, category: 'Miscellaneous' },
  { date: '2024-06-06', amount: 500, category: 'Repayments' },
  { date: '2024-06-07', amount: 70, category: 'Logistics' },
];

const categoryIcons = {
  food: FaUtensils,
  groceries: FaShoppingCart,
  sports: FaRunning,
  shopping: FaTshirt,
  miscellaneous: FaQuestionCircle,
  repayments: FaMoneyBillWave,
  logistics: FaTruck,
};

const ExpenseTable = () => {
  const dispatch = useDispatch();
  const { expenses, isLoading, isError, message } = useSelector((state) => state.expense);

  useEffect(() => {
    dispatch(getExpense());
  }, [dispatch]);

  if (isLoading) {
    return <SkeletonLoader/>;
  }

  if (isError) {
    return <div>Error: {message}</div>;
  }
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <TableContainer>
      <Table variant="simple" colorScheme='teal' bgGradient={'teal'} boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"}>
        <Thead bg="teal">
          <Tr>
            <Th color = "white">Date</Th>
            <Th color = "white">Amount</Th>
            <Th color = "white">Category</Th>
          </Tr>
        </Thead>
        <Tbody>
          {expenses.map((item, index) => (
            <Tr key={index}>
              <Td>{formatDate(item.date)}</Td>
              <Td>{item.amount}</Td>
              <Td>
                <Icon as={categoryIcons[item.category]} marginRight="5px" />
                {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ExpenseTable;
