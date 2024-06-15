import { useState } from 'react'
import './App.css'
import {Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage'
import ProtectedRoute from './components/authenticate/ProtectedRoute'
import { Box } from '@chakra-ui/react'
import { useSelector } from 'react-redux'

function App() {


  const { userInfo } = useSelector((state) => state.user);
  
  return(
    <div className="App">
      <Navbar/>
      <Box display={'flex'}>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/home' element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
        </Routes>
      </Box>
    </div>
  )

}

export default App
