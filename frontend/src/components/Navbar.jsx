import { Box, IconButton, VStack } from '@chakra-ui/react'
import { Button, Text,useBreakpointValue ,Divider} from '@chakra-ui/react'
import React from 'react'
import LoginModal from './LoginModal'
import Lottie from 'react-lottie';
import animationData from '../assets/animationdata2.json'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { ArrowForwardIcon, HamburgerIcon } from '@chakra-ui/icons';
import { useDisclosure, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Input } from '@chakra-ui/react'


const Navbar = () => {

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  // const isMobile = useBreakpointValue({ base: true, md: false }); // Check if it's mobile breakpoint
  const isMobile = true


  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };
  return (
    <>
      <Box 
      display="flex" 
      justifyContent="space-between" 
      alignItems="center" 
      bg="teal" 
      color="white" 
      p={3}
      >
        <Box display="flex" alignItems="center">
           {isMobile&& userInfo && userInfo.name&&(<IconButton  aria-label="Open Sidebar"
            icon={<HamburgerIcon />}
            ref={btnRef} colorScheme='teal' onClick={onOpen}/>)}
            <Lottie 
                options={defaultOptions} 
                height={50} // Adjust the height as needed
                width={50} // Adjust the width as needed
            />
            <Text fontWeight="bold" fontSize="2xl" as='i' fontFamily="'Comic Sans MS', cursive">ExpenseBuddy</Text>
        </Box>
        {userInfo && userInfo.name ? (
        <Box display="flex" alignItems="center">
          <Text mr={3}>Welcome, {userInfo.name}</Text>
          <Button onClick={handleLogout} variant="outline" color="white">
            Logout
          </Button>
        </Box>
      ) : (
        <LoginModal>
          <Button variant="outline" color="white">
            Login / Signup
          </Button>
        </LoginModal>
      )}

    </Box>

      <Drawer
          isOpen={isOpen}
          placement='left'
          onClose={onClose}
          finalFocusRef={btnRef}
        >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Welcome to ExpenseBuddy</DrawerHeader>

          <DrawerBody>
            <VStack>
            <Divider orientation='horizontal' />
              <Button size='lg' width={'100%'} leftIcon={<ArrowForwardIcon />} variant='ghost' colorScheme='teal' onClick={()=>navigate('/home')}>Home</Button>
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
    
  )
}

export default Navbar