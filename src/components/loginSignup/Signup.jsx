import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputLoginComponent, { InputPasswordComponent } from '../utiles/InputLoginComponent';
import Button from '../utiles/Button';
import toast from 'react-hot-toast';
import { CiLock, CiMail, CiMobile1, CiUser } from 'react-icons/ci';
import { FiMessageSquare } from 'react-icons/fi';

const formikSignupSchema = Yup.object().shape({
    fullName: Yup.string()
        .required('Full name is required.')
        .min(2, 'Full name must be at least 2 characters.'),
    mobileNumber: Yup.string()
        .required('Mobile Number is required.')
        .min(10, 'Mobile number must be at least 10 numbers')
        .max(10, 'Mobile number must be 10 numbers'),
    email: Yup.string()
        .required('Email is required.')
        .email('Invalid email address.'),
    password: Yup.string()
        .required('Password is required.')
        .min(8, 'Password must be at least 8 characters long.')
        .max(30, 'Password must be less than 30 characters long.')
        .test('has-lowercase', 'Password must contain at least one lowercase letter.', value => /[a-z]/.test(value))
        .test('has-uppercase', 'Password must contain at least one uppercase letter.', value => /[A-Z]/.test(value))
        .test('has-number', 'Password must contain at least one number.', value => /\d/.test(value))
        .test('has-special-char', 'Password must contain at least one special character.', value => /[@$!%*?&]/.test(value)),
    confirmPassword: Yup.string()
        .required('Please confirm your password.')
        .oneOf([Yup.ref('password'), null], 'Passwords must match.')
});

const Signup = () => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const createUser = async (values) => {
        setLoading(true)
        try {
            const response = await registerUsers({
                fullName: values.fullName,
                email: values.email,
                password: values.password,
                mobileNumber: values.mobileNumber
            });
            toast.success(response?.message);
            formikSignup.resetForm();
            navigate(`/login/verify-otp/${response?.data._id}`);
        } catch (error) {
            toast.error(error.message || 'An unexpected error occurred. Please try again.');
            console.error('Error:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const formikSignup = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            mobileNumber: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: formikSignupSchema,
        onSubmit: (values) => createUser(values),
    });

    return (
        <form
            className={`flex flex-col items-center justify-center gap-[20px] w-[80%] mx-auto`}
            onSubmit={formikSignup.handleSubmit}>
            <div className='flex flex-col items-center justify-center gap-[3px] '>
                <div className='p-[4px] rounded bg-buttonColour text-bgColour'><FiMessageSquare /></div>
                <h1 className='text-3xl font-medium'>Create Account</h1>
                <p>Get started with your free account</p>
            </div>
            <div className='flex items-center w-full justify-center flex-col gap-[15px]'>
                <InputLoginComponent icon={<CiUser />}
                    placeholder={'Full Name'} name={'fullName'}
                    value={formikSignup?.values?.fullName}
                    changeHandler={formikSignup.handleChange}
                    errors={formikSignup?.errors?.fullName}
                    touched={formikSignup?.touched?.fullName} />

                <InputLoginComponent icon={<CiMail />}
                    placeholder={'Email'} name={'email'}
                    value={formikSignup?.values?.email}
                    changeHandler={formikSignup.handleChange}
                    errors={formikSignup?.errors?.email}
                    touched={formikSignup?.touched?.email} />

                <InputLoginComponent icon={<CiMobile1 />}
                    placeholder={'Mobile Number'} name={'mobileNumber'}
                    value={formikSignup?.values?.mobileNumber}
                    changeHandler={formikSignup.handleChange}
                    errors={formikSignup?.errors?.mobileNumber}
                    touched={formikSignup?.touched?.mobileNumber} />

                <InputPasswordComponent icon={<CiLock />} showPassword={showPassword}
                    setShowPassword={() => setShowPassword(prev => !prev)}
                    placeholder={'Password'} name={'password'}
                    value={formikSignup?.values?.password}
                    changeHandler={formikSignup.handleChange}
                    errors={formikSignup?.errors?.password}
                    touched={formikSignup?.touched?.password} />

                <InputPasswordComponent icon={<CiLock />} showPassword={showPassword}
                    setShowPassword={() => setShowPassword(prev => !prev)}
                    placeholder={'Confirm Password'} name={'confirmPassword'}
                    value={formikSignup?.values?.confirmPassword}
                    changeHandler={formikSignup.handleChange}
                    errors={formikSignup?.errors?.confirmPassword}
                    touched={formikSignup?.touched?.confirmPassword} />

            </div>
            <Button text="Sign Up" onClick={formikSignup.handleSubmit} isLoading={loading} className='w-full' />
        </form>
    )
}

export default Signup