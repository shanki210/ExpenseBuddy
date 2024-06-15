import { Stack } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { Button, Input, InputGroup, InputRightElement , Text, useToast} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';



const Login = () => {

  const [show, setShow] = React.useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const toast = useToast()
  const dispatch = useDispatch()

  const { loading, error } = useSelector((state) => state.user)

  const handleSubmit = (e) => {
    e.preventDefault()
    //check if email and password is not empty
    if(email && password){
      dispatch(login({email, password, navigate, toast }))
    }
    else{
      //chakra ui toast message
      toast({
        title: 'Please fill all the fields',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }


  return (
    <Stack>
      <Text>Email Address</Text>
      <Input focusBorderColor='lime' placeholder='Enter your email address'
      onChange={(e) => setEmail(e.target.value)} />
      <Text>Password</Text>
      <InputGroup size='md'>
      <Input
        pr='4.5rem'
        type={show ? 'text' : 'password'}
        placeholder='Enter password'
        focusBorderColor='lime'
        onChange={(e) => setPassword(e.target.value)}
      />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={()=> setShow(!show)}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
    <Button colorScheme='teal' onClick={handleSubmit} isLoading={loading}>Login</Button>
    {error && <Text color="red.500">{error}</Text>}
    </Stack>
  )
}

export default Login