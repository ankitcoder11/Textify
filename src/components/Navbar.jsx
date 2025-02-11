import React, { useContext } from 'react'
import { FiMessageSquare, FiUser } from 'react-icons/fi'
import { IoSettingsOutline } from 'react-icons/io5'
import { MyContext } from '../contextApi/MyContext'
import { CiLogout } from 'react-icons/ci'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const { isAuthenticated, logout } = useContext(MyContext);
    return (
        <div className='p-[10px] text-2xl flex items-center justify-between'>
            <div className='flex items-center gap-[10px] '>
                <div className='p-[4px] rounded bg-buttonColour text-bgColour'><FiMessageSquare /></div>
                <div className='font-buttonFont cursor-default'>Textify</div>
            </div>
            <div className='flex gap-[30px] '>
                <div className='flex items-center gap-[8px] cursor-pointer '>
                    <div><IoSettingsOutline /></div>
                    <div className='text-xl'>Settings</div>
                </div>
                {isAuthenticated &&
                    <>
                        <Link to='/profile' className='flex items-center gap-[8px] cursor-pointer '>
                            <div><FiUser /></div>
                            <div className='text-xl'>Profile</div>
                        </Link>
                        <div className='flex items-center gap-[8px] cursor-pointer' onClick={logout}>
                            <div><CiLogout /></div>
                            <div className='text-xl'>Logout</div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Navbar