import React from 'react'
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure } from '@chakra-ui/react'
import { FormControl, FormLabel, Input } from '@chakra-ui/react'

const TransactionModal = ({children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
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
                <Input focusBorderColor='lime' placeholder='Date' type='date' />
            </FormControl>

            <FormControl mt={4}>
                <FormLabel>Amount</FormLabel>
                <Input focusBorderColor='lime' placeholder='Amount'  type='number'/>
            </FormControl>

            <FormControl mt={4}>
                <FormLabel>Category</FormLabel>
                {/* //take input in form of option between food grocery travel entertainment miscellaneous */}
                <Select placeholder='Select option' focusBorderColor='lime'>
                    <option value='Food'>Food</option>
                    <option value='Grocery'>Groceries</option>
                    <option value='Travel'>Shopping</option>
                    <option value='Entertainment'>Repayments</option>
                    <option value='Sports'>Logistics</option>
                    <option value='Miscellaneous'>Miscellaneous</option>
                </Select>
            </FormControl>
                
            <FormControl mt={4}>
                <FormLabel>Transaction Type</FormLabel>
                <Select placeholder='Select option' focusBorderColor='lime'>
                    <option value='Income'>Income</option>
                    <option value='Expense'>Expense</option>
                </Select>
            </FormControl>

            </ModalBody>

            <ModalFooter>
            <Button colorScheme='teal' mr={3} >
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