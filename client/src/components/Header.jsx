import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signOut } from "firebase/auth";

import { Avatar, Logo } from '../assets';
import { isActiveStyle, isNotActiveStyle } from '../utils/style';
import { buttonClick, slideTop } from '../animations';
import { MdShoppingCart, MdLogout } from '../assets/icons';
import { app } from '../config/firebase.config';
import { setUserNull } from '../context/actions/userActions';
import { setCartOn } from '../context/actions/displayCartActions';

const Header = () => {
    const user = useSelector((state) => state.user);
    const cart = useSelector((state) => state.cart);

    const [isMenu, setIsMenu] = useState(false);
    const firebaseAuth = getAuth(app)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signOutt = async () => {
        try {
            await signOut(firebaseAuth).then(() => {
                dispatch(setUserNull());
                navigate('/login', { replace: true });
            });
        } catch (err) {
            console.log(err);
        }
    };

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
                    onClick={() => dispatch(setCartOn())}
                >
                    <MdShoppingCart className='text-3xl text-textColor' />
                    {cart?.length > 0 && (
                        <div className='w-5 h-5 rounded-full bg-red-500 flex items-center justify-center absolute -top-2 -right-1'>
                            <p className='text-primary text-sm font-semibold'>{cart?.length}</p>
                        </div>
                    )}
                </motion.div>
                {user ? (
                    <>
                        <div className='relative cursor-pointer' onMouseEnter={() => setIsMenu(true)}>
                            <div className='w-10 h-10 rounded-full shadow-md cursor-pointer overflow-hidden flex items-center justify-center'>
                                <motion.img
                                    className='w-full h-full object-cover'
                                    src={user?.picture ? user?.picture : Avatar}
                                    whileHover={{ scale: 1.15 }}
                                    referrerPolicy='no-referrer'
                                />
                            </div>

                            {/* Dropdown menu */}
                            {isMenu && (
                                <motion.div
                                    {...slideTop}
                                    className='px-6 py-4 w-44 bg-cardOverlay backdrop-blur-md rounded-md shadow-md absolute top-12 right-0 flex flex-col gap-3'
                                    onMouseLeave={() => setIsMenu(false)}
                                >
                                    {user?.user_id === process.env.REACT_APP_ADMIN_ID && (
                                        <Link
                                            className='hover:text-red-500 text-lg text-textColor'
                                            to={'/dashboard/home'}
                                        >
                                            Dashboard
                                        </Link>
                                    )}

                                    <Link
                                        className='hover:text-red-500 text-lg text-textColor'
                                        to={'/profile'}
                                    >
                                        My Profile
                                    </Link>
                                    <Link
                                        className='hover:text-red-500 text-lg text-textColor'
                                        to={'/user-orders'}
                                    >
                                        Orders
                                    </Link>
                                    <hr />
                                    <motion.div
                                        {...buttonClick}
                                        onClick={signOutt}
                                        className='shadow-md py-2 px-4 rounded-md bg-gray-100 flex items-center justify-start gap-3 hover:bg-gray-200 cursor-pointer'
                                    >
                                        <MdLogout className='text-xl text-textColor' />
                                        <p className='text-lg text-textColor'>Sign out</p>
                                    </motion.div>
                                </motion.div>
                            )}
                        </div>
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