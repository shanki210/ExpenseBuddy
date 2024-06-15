import React from 'react'
import { Box, Button, Heading, Text, VStack , useMediaQuery, Grid} from '@chakra-ui/react'
import LoginModal from '../components/LoginModal'
import { motion } from 'framer-motion'
import Lottie from 'react-lottie';
import animationdata from '../assets/animationdata.json'

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionButton = motion(Button);

const LandingPage = () => {
    const cards = [
        {
          title: "Track Expenses Effortlessly",
          description: "Easily log your expenses and keep track of where your money is going.",
        },
        {
          title: "Take Control of Your Finances",
          description: "Analyze your spending habits, set budgets, and achieve financial goals.",
        },
        {
          title: "Stay Organized",
          description: "Categorize your expenses, add notes, and attach receipts for easy reference.",
        },
      ];

    const [isMobile] = useMediaQuery("(max-width: 768px)");

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationdata,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };

  return (
    <MotionBox 
      bg="gray.100" 
      minH="100vh" 
      display="flex" 
      flexDirection={isMobile ? "column" : "row"} 
      alignItems="center" 
      justifyContent="center"
      p={4}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {isMobile ? (
        <Lottie options={defaultOptions} height={200} width={200} />
      ) : null}
      <VStack spacing={5} textAlign="center">
        {!isMobile ? (
          <Box mr={8}>
            <Lottie options={defaultOptions} height={200} width={200} />
          </Box>
        ) : null}
        <MotionHeading 
          as="h1" 
          size="2xl" 
          color="teal.600"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Welcome to ExpanseBuddy
        </MotionHeading>
        <MotionText 
          fontSize="lg" 
          color="gray.600"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Track your expenses effortlessly and take control of your finances.
        </MotionText>
        <MotionText 
          fontSize="md" 
          color="gray.500"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Join us today and start your journey towards financial freedom.
        </MotionText>
        <LoginModal>
          <MotionButton 
            colorScheme="teal" 
            size="lg"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Get Started Now
          </MotionButton>
        </LoginModal>
        <Grid
        templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
        gap={6}
        mt={6}
        p={4}
      >
        {cards.map((card, index) => (
          <Box key={index} p={4} bg="white" boxShadow="md" borderRadius="md" textAlign="center" height="150px">
            <Heading as="h3" size="md" mb={2} color="teal.600">{card.title}</Heading>
            <Text color="gray.600">{card.description}</Text>
          </Box>
        ))}
      </Grid>
      </VStack>
      
    </MotionBox>
  )
}

export default LandingPage