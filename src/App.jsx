import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import Login from './components/loginSignup/Login'
import Signup from './components/loginSignup/Signup'

const LoginLayoutWrapper = ({ children }) => {
  return (
    <div className='w-full'>
      <div className='w-1/2'>{children}</div>
      <div className='w-1/2'>
        <div className='w-[80%] mx-auto'></div>
      </div>
    </div>
  )
};

const App = () => {
  return (
    <div className='bg-bgColour text-textColour font-bodyFont w-full h-screen'>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/user/*"
          element={
            <LoginLayoutWrapper>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </LoginLayoutWrapper>
          }
        />
      </Routes>

    </div>
  )
}

export default App