import React from 'react'
import { Box } from '@chakra-ui/react'
import { Button, FormControl, FormErrorMessage, FormLabel, Input, ButtonGroup, IconButton, useBreakpointValue } from '@chakra-ui/react'  
import { AddIcon } from '@chakra-ui/icons'
import TransactionModal from '../components/TransactionModal'
import BarChart from '../components/BarChart'
import PolarChart from '../components/PolarChart'

const HomePage = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Box 
    margin={"auto"}
    marginTop={"10px"}
    marginBottom={"10px"}
    minW={{base:"95%", md:"60%"}}
    minH={"100vh"}
    padding={"10px"}
    bg = {"white"}
    boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"}
    >
    <Box display={"flex"} justifyContent={"right"} width={"100%"} >
      <TransactionModal>
        <ButtonGroup size='md' isAttached variant='outline'>
          <IconButton aria-label='Add to friends' icon={<AddIcon />} />
          <Button>Transaction</Button>
        </ButtonGroup>
      </TransactionModal>
    </Box>
    <Box mt = {"20px"}>
      {isMobile ? <PolarChart/> : <BarChart/>}
    </Box>
    
    
        
        
           
          
       
     

    </Box>
  )
}

export default HomePage