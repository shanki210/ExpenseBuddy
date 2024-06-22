// ExpenseTable.js
import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Icon } from '@chakra-ui/react';
import { FaUtensils, FaShoppingCart, FaRunning, FaTshirt, FaMoneyBillWave, FaTruck, FaQuestionCircle } from 'react-icons/fa';

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
  Food: FaUtensils,
  Groceries: FaShoppingCart,
  Sports: FaRunning,
  Shopping: FaTshirt,
  Miscellaneous: FaQuestionCircle,
  Repayments: FaMoneyBillWave,
  Logistics: FaTruck,
};

const ExpenseTable = () => {
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
          {data.map((item, index) => (
            <Tr key={index}>
              <Td>{item.date}</Td>
              <Td>{item.amount}</Td>
              <Td>
                <Icon as={categoryIcons[item.category]} marginRight="5px" />
                {item.category}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ExpenseTable;
