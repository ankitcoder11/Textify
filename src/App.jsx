import React, { useContext } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './components/loginSignup/Login'
import Signup from './components/loginSignup/Signup'
import image1 from '../src/images/image1.jpg'
import image2 from '../src/images/image2.jpg'
import image3 from '../src/images/image3.jpg'
import image4 from '../src/images/image4.jpg'
import image5 from '../src/images/image5.jpg'
import image6 from '../src/images/image6.jpg'
import image7 from '../src/images/image7.jpg'
import image8 from '../src/images/image8.jpg'
import image9 from '../src/images/image9.jpg'
import OTPVerify from './components/loginSignup/OTPVerify'
import ForgotPassword from './components/loginSignup/ForgotPassword'
import ResetPassword from './components/loginSignup/ResetPassword'
import { MyContext } from './contextApi/MyContext'
import Profile from './components/Profile'

const LoginLayoutWrapper = ({ children }) => {
  const { isAuthenticated } = useContext(MyContext);
  if (isAuthenticated) {
    return <Navigate to="/" />
  }
  const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9];
  return (
    <div className='w-full flex pt-10 '>
      <div className='w-1/2 flex items-center justify-center'>{children}</div>
      <div className='w-1/2 flex items-center justify-center'>
        <div className='w-[80%] mx-auto flex flex-col items-center justify-center gap-[15px]'>
          <div className='flex flex-wrap justify-between items-center gap-[10px] w-[320px]'>
            {images.map((image, index) => (
              <div key={index} className='w-[100px] h-[100px] '>
                <img className='w-full h-full object-cover rounded-[10px]' src={image} alt={`image-${index}`} />
              </div>
            ))}
          </div>
          <div className='flex flex-col gap-[3px] items-center'>
            <h1 className='text-3xl font-medium'>Join our community</h1>
            <p>Connect with friends, share moments, and stay in touch with your loved ones</p>
          </div>
        </div>
      </div>
    </div>
  )
};

const App = () => {
  return (
    <div className='bg-bgColour text-textColour font-bodyFont w-full h-screen overflow-x-hidden overflow-y-auto'>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/user/*"
          element={
            <LoginLayoutWrapper>
              <Routes>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="verify-otp/:id" element={<OTPVerify />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="reset-password/:id" element={<ResetPassword />} />
              </Routes>
            </LoginLayoutWrapper>
          }
        />
        <Route path='/profile' element={<Profile />} />
      </Routes>

    </div>
  )
}

export default App