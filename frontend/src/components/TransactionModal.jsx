import React from 'react'
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure } from '@chakra-ui/react'
import { FormControl, FormLabel, Input , useToast} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { addExpense } from '../redux/slices/expenseSlice';

const TransactionModal = ({children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [date, setDate] = React.useState('');
    const [amount, setAmount] = React.useState(0);
    const [category, setCategory] = React.useState('miscellaneous');
    const [transaction, setTransaction] = React.useState('Expense');

    const toast = useToast();
    const dispatch = useDispatch();
    const {isLoading} = useSelector((state) => state.expense);

    const handleSave = () => {
        if(date && amount && category && transaction){
            const data = {date, amount, category, transaction}
            dispatch(addExpense(data))
                .unwrap()
                .then(() => {
                    toast({
                        title: 'Transaction added successfully.',
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    });
                    onClose();
                })
                .catch((error) => {
                    toast({
                        title: error,
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    });
                });

        } else {
            toast({
                title: 'Please fill all the fields',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }

    }
  return (
    <>
        <span onClick={onOpen}>{children}</span>
       

        <Modal
        isOpen={isOpen}
        onClose={onClose}
        >
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Add Transaction</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
            <FormControl>
                <FormLabel>Date</FormLabel>
                <Input focusBorderColor='lime' placeholder='Date' type='date' 
                onChange={(e) => setDate(e.target.value)}
                />
            </FormControl>

            <FormControl mt={4}>
                <FormLabel>Amount</FormLabel>
                <Input focusBorderColor='lime' placeholder='Amount'  type='number'
                onChange={(e) => setAmount(e.target.value)}
                />
            </FormControl>

            <FormControl mt={4}>
                <FormLabel>Category</FormLabel>
                {/* //take input in form of option between food grocery travel entertainment miscellaneous */}
                <Select placeholder='Select option' focusBorderColor='lime' onChange={(e) => setCategory(e.target.value)}>
                    <option value='food'>Food</option>
                    <option value='groceries'>Groceries</option>
                    <option value='shopping'>Shopping</option>
                    <option value='repayments'>Repayments</option>
                    <option value='sports'>Logistics</option>
                    <option value='miscellaneous'>Miscellaneous</option>
                </Select>
            </FormControl>
                
            <FormControl mt={4}>
                <FormLabel>Transaction Type</FormLabel>
                <Select placeholder='Select option' focusBorderColor='lime' onChange={(e) => setTransaction(e.target.value)}>
                    <option value='income'>Income</option>
                    <option value='expense'>Expense</option>
                </Select>
            </FormControl>

            </ModalBody>

            <ModalFooter>
            <Button colorScheme='teal' mr={3} onClick = {handleSave} isLoading={isLoading} >
                Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
        </ModalContent>
        </Modal>
  </>
  )
}

export default TransactionModal