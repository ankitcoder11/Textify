import React from 'react'
import { FiMessageSquare } from 'react-icons/fi'
import { IoSettingsOutline } from 'react-icons/io5'

const Navbar = () => {
    return (
        <div className='p-[10px] text-2xl flex items-center justify-between'>
            <div className='flex items-center gap-[10px] '>
                <div className='p-[4px] rounded bg-buttonColour text-bgColour'><FiMessageSquare /></div>
                <div className='font-buttonFont cursor-default'>Textify</div>
            </div>
            <div className='flex items-center gap-[10px] cursor-pointer '>
                <div><IoSettingsOutline /></div>
                <div className='text-xl'>Settings</div>
            </div>
        </div>
    )
}

export default Navbar