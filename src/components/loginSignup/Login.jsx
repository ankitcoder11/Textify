import React, { useContext, useState } from 'react'
import { FiMessageSquare } from 'react-icons/fi'
import InputLoginComponent, { InputPasswordComponent } from '../../utiles/InputLoginComponent'
import { CiLock, CiMail } from 'react-icons/ci'
import Button from '../../utiles/Button'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { MyContext } from '../../contextApi/MyContext'
import { Link, useNavigate } from 'react-router-dom'
import { loginUsers } from '../../api'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie';

const formikLoginSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required.')
        .email('Invalid email address.'),
    password: Yup.string()
        .required('New password is required.')
});

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const loginUser = async (values) => {
        setLoading(true)
        try {
            const response = await loginUsers({
                email: values.email,
                password: values.password
            });
            if (!response?.data?.user?.isOtpVerified) {
                toast.success(response.message);
                navigate(`/user/verify-otp/${response?.data?.user?._id}`)
                return;
            }
            Cookies.set('accessToken', response?.data?.accessToken, { expires: 1 });
            localStorage.setItem('user', JSON.stringify(response?.data?.user))
            toast.success(response.message);
            formikLogin.resetForm();
            setShowPassword(false)
            window.location.href = '/'
        } catch (error) {
            toast.error(error.message || 'An unexpected error occurred. Please try again.');
            console.error('Error:', error.message);
        } finally {
            setLoading(false);
        }
    };
    const formikLogin = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: formikLoginSchema,
        onSubmit: (values) => loginUser(values),
    })
    return (
        <form className='flex flex-col items-center justify-center gap-[20px] w-[80%] mx-auto'
            onSubmit={formikLogin.handleSubmit}>
            <div className='flex flex-col items-center justify-center gap-[3px] '>
                <div className='p-[4px] rounded bg-buttonColour text-bgColour'><FiMessageSquare /></div>
                <h1 className='text-3xl font-medium'>Welcome Back</h1>
                <p>Sign in to your account</p>
            </div>
            <div className='flex items-center w-full justify-center flex-col gap-[10px]'>
                <InputLoginComponent icon={<CiMail />} placeholder={'Email'} name={'email'} value={formikLogin?.values?.email} changeHandler={formikLogin.handleChange} errors={formikLogin?.errors?.email} touched={formikLogin?.touched?.email} />
                <InputPasswordComponent icon={<CiLock />} showPassword={showPassword} setShowPassword={() => setShowPassword(prev => !prev)} placeholder={'Password'} name={'password'} value={formikLogin?.values?.password} changeHandler={formikLogin.handleChange} errors={formikLogin?.errors?.password} touched={formikLogin?.touched?.password} />
                <Link to='/user/forgot-password' className='hover:underline cursor-pointer'>Forgot your Password?</Link>
            </div>
            <div className='flex flex-col w-full items-center gap-[3px]'>
                <Button text="Login" onClick={formikLogin.handleSubmit} isLoading={loading} className='w-full' />
                <p>Don't have an account? <Link to='/user/signup' className='underline cursor-pointer'>Create account</Link></p>
            </div>
        </form>
    )
}

export default Login