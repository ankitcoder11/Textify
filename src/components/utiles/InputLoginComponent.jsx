import React from 'react'
import { VscEye, VscEyeClosed } from 'react-icons/vsc'

const InputLoginComponent = ({ placeholder, icon, name, errors, touched, changeHandler, value }) => {
    return (
        <>
            <div className='p-[10px] border rounded border-textColour w-full flex items-center gap-[10px] relative'>
                <div>{icon}</div>
                <input type='text' placeholder={placeholder} name={name}
                    value={value} onChange={changeHandler}
                    className='bg-bgColour outline-none w-full ' />
                {errors && touched && <p className='absolute text-[10px] bottom-[-14px] text-red-500'> {errors}</p>}
            </div>
        </>
    )
}

export default InputLoginComponent

const InputPasswordComponent = ({ placeholder, icon, name, errors, touched, changeHandler, value, showPassword, setShowPassword }) => {
    return (
        <>
            <div className='p-[10px] border rounded border-textColour w-full flex items-center gap-[10px] relative'>
                <div>{icon}</div>
                <input type={showPassword ? 'text' : 'password'}
                    placeholder={placeholder} name={name} value={value}
                    onChange={changeHandler} autoComplete={name}
                    className='bg-bgColour outline-none w-full ' />
                <p className='cursor-pointer' onClick={setShowPassword}>{showPassword ? <VscEyeClosed /> : <VscEye />}</p>
                {errors && touched && <p className='absolute text-[10px] bottom-[-14px] text-red-500'> {errors}</p>}
            </div>
        </>
    )
}

export { InputPasswordComponent }