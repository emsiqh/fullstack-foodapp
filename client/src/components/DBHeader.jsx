import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import { BsToggles2, MdSearch, BsFillBellFill } from '../assets/icons'
import { buttonClick } from '../animations';

const DBHeader = () => {
    const user = useSelector((state) => state.user);

    return (
        <div className='w-full flex items-center justify-between gap-3'>
            <p className='text-2xl text-headingColor'>Welcome to City
                {user?.name && (
                    <span className='block text-base text-gray-500'>{`Hello ${user?.name}`}</span>
                )}
            </p>

            <div className='flex items-center justify-center gap-4'>
                <div className='flex items-center justify-center gap-3 px-4 py-2 bg-cardOverlay backdrop-blur-md rounded-md shadow-md'>
                    <MdSearch className='text-2xl text-gray-400' />
                    <input type='text' placeholder='Search here' className='border-none outline-none bg-transparent w-32 text-base font-semibold text-textColor' />
                    <BsToggles2 className='text-2xl text-gray-400' />
                </div>

                <motion.div
                    {...buttonClick}
                    className='w-10 h-10 flex items-center justify-center cursor-pointer bg-cardOverlay backdrop-blur-md rounded-md shadow-md overflow-hidden'
                >
                    <BsFillBellFill className='text-2xl text-gray-400' />
                </motion.div>
            </div>
        </div>
    )
}

export default DBHeader;