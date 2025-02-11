import React, { useContext, useState } from 'react'
import { MyContext } from '../contextApi/MyContext'
import { FaCamera, FaUser } from 'react-icons/fa'
import InputLoginComponent from '../utiles/InputLoginComponent'
import { CiMail, CiUser } from 'react-icons/ci'
import { updateProfile } from '../api/profile'
import toast from 'react-hot-toast'
import ButtonLoader from '../utiles/ButtonLoader'

const Profile = () => {
    const { user } = useContext(MyContext)
    const [loading, setLoading] = useState(false)
    const [selectedImg, setSelectedImg] = useState(null)
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();

        reader.onerror = () => {
            toast.error('Error reading file. Please try again.');
            setLoading(false);
        };

        reader.onload = async () => {
            const base64Image = reader.result;
            setSelectedImg(base64Image);
            setLoading(true)
            try {
                const response = await updateProfile({ profilePic: base64Image });
                toast.success(response.message);
                const updatedUser = { ...user, profilePic: response.data.profilePic };
                localStorage.setItem('user', JSON.stringify(updatedUser));
            } catch (error) {
                toast.error(error.message || 'An unexpected error occurred. Please try again.');
            } finally {
                setLoading(false)
            }
        }
        reader.readAsDataURL(file);
    }
    return (
        <div className='flex flex-col gap-[20px] items-center justify-center '>
            <div className='flex flex-col items-center justify-center gap-[3px] '>
                <h1 className='text-3xl font-medium'>Profile</h1>
                <p>Your profile information</p>
            </div>
            <div className='w-[150px] h-[150px] border-[2px] border-textColour rounded-full flex items-center justify-center relative'>
                {loading ? <ButtonLoader /> :
                    user?.profilePic || selectedImg
                        ? <img className='w-full h-full rounded-full object-cover' src={selectedImg || user?.profilePic} alt='users loading img' />
                        : <div className='text-[80px]'><FaUser /></div>
                }
                <label className='absolute text-[20px] bottom-0 right-0 bg-buttonHoverColour rounded-full h-[40px] w-[40px] flex items-center justify-center cursor-pointer'>
                    <FaCamera />
                    <input className='hidden' type='file' accept='image/*' onChange={handleImageUpload} disabled={loading} />
                </label>
            </div>
            <div className='w-1/2 flex flex-col gap-[10px] '>
                <InputLoginComponent icon={<CiUser />} readOnly={true}
                    name={'fullName'} value={user?.fullName} />
                <InputLoginComponent icon={<CiMail />} readOnly={true}
                    name={'email'} value={user?.email} />
            </div>
        </div>
    )
}

export default Profile