import React from 'react'
import { useState } from 'react'
import { Stack } from '@chakra-ui/react'
import { Button, Input, InputGroup, InputRightElement , Text, useToast} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';



const Signup = () => {
  const [show, setShow] = React.useState(false)
  const [coshow, setcoShow] = React.useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigate = useNavigate()
  const toast = useToast()
  const dispatch = useDispatch()

  const { loading, error } = useSelector((state) => state.user)

  const handleSubmit = (e) => {
    e.preventDefault()
    //check if email and password is not empty
    if(name && email && password && confirmPassword){
      if(password === confirmPassword){
        dispatch(register({name, email, password, navigate, toast }))
      }
      else{
        toast({
          title: 'Passwords do not match',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
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
      <Text>Name</Text>
      <Input focusBorderColor='lime' placeholder='Enter your name' 
      onChange={(e) => setName(e.target.value)}
      />
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
    <Text>Confirm Password</Text>
      <InputGroup size='md'>
      <Input
        pr='4.5rem'
        type={coshow ? 'text' : 'password'}
        placeholder='Enter password'
        focusBorderColor='lime'
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={()=> setcoShow(!coshow)}>
          {coshow ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
    <Text>Upload Profile Picture</Text>
    <Input
          type="file"
          p={1.5}
          accept="image/*"
        />
    <Button colorScheme='teal' onClick={handleSubmit} isLoading={loading}>Signup</Button>
    </Stack>
  )
}

export default Signup