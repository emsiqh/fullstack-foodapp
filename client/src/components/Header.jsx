import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

import { Avatar, Logo } from '../assets';
import { isActiveStyle, isNotActiveStyle } from '../utils/style';
import { buttonClick } from '../animations';
import { MdShoppingCart } from '../assets/icons';

const Header = () => {
    const user = useSelector((state) => state.user);

    return (
        <header className='fixed backdrop-blur-md z-50 inset-x-0 top-0 flex items-center justify-between px-12 md:px-20 py-6'>
            <NavLink to={'/'} className='flex items-center justify-center gap-4'>
                <img src={Logo} className='w-12' alt='' />
                <p className='font-semibold text-xl'>City</p>
            </NavLink>

            <nav className='flex items-center justify-center'>
                <ul className='hidden md:flex items-center justify-center gap-8'>
                    <NavLink to={'/'} className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}>Home</NavLink>
                    <NavLink to={'/menu'} className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}>Menu</NavLink>
                    <NavLink to={'/services'} className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}>Services</NavLink>
                    <NavLink to={'/about'} className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}>About us</NavLink>
                </ul>
            </nav>

            <div className='flex items-center justify-center gap-8 relative'>
                <motion.div
                    {...buttonClick}
                    className='relative cursor-pointer'
                >
                    <MdShoppingCart className='text-3xl text-textColor' />
                    <div className='w-5 h-5 rounded-full bg-red-500 flex items-center justify-center absolute -top-2 -right-1'>
                        <p className='text-primary text-base font-semibold'>2</p>
                    </div>
                </motion.div>
                {user ? (
                    <>
                        <div className='relative cursor-pointer'>
                            <div className='w-12 h-12 rounded-full shadow-md cursor-pointer overflow-hidden flex items-center justify-center'>
                                <motion.img
                                    className='w-full h-full object-cover'
                                    src={user?.picture ? user?.picture : Avatar}
                                    whileHover={{ scale: 1.15 }}
                                    referrerPolicy='no-referrer'
                                />
                            </div>
                        </div>

                        <motion.div
                            className='px-6 py-4 bg-cardOverlay backdrop-blur-md rounded-md shadow-md absolute top-12 right-0 flex flex-col'
                        >

                        </motion.div>
                    </>
                ) : (
                    <>
                        <NavLink to={'/login'}>
                            <motion.button
                                {...buttonClick}
                                className='px-4 py-2 rounded-md shadow-md bg-cardOverlay border border-red-300 cursor-pointer'
                            >
                                Login
                            </motion.button>
                        </NavLink>
                    </>
                )}
            </div>



        </header>
    )
}

export default Header;