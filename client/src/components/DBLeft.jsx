import React from 'react';
import { NavLink } from 'react-router-dom';

import { Logo } from '../assets';
import { isActiveStyle, isNotActiveStyle } from '../utils/style';

const DBLeft = () => {
    return (
        <div className='h-full py-12 flex flex-col bg-cardOverlay backdrop-blur-md shadow-md min-w-210 w-[250px] gap-3'>
            <NavLink to={'/'} className='flex items-center justify-start px-6 gap-4'>
                <img src={Logo} className='w-12' alt='' />
                <p className='font-semibold text-xl'>City</p>
            </NavLink>
            <hr />
            <ul className='flex flex-col gap-8'>
                <NavLink
                    to={'/dashboard/home'}
                    className={({ isActive }) => isActive ? `${isActiveStyle}  px-4 py-2 border-l-8 border-red-500` : isNotActiveStyle}
                >
                    Home
                </NavLink>
                <NavLink
                    to={'/dashboard/orders'}
                    className={({ isActive }) => isActive ? `${isActiveStyle}  px-4 py-2 border-l-8 border-red-500` : isNotActiveStyle}
                >
                    Orders
                </NavLink>
                <NavLink
                    to={'/dashboard/items'}
                    className={({ isActive }) => isActive ? `${isActiveStyle}  px-4 py-2 border-l-8 border-red-500` : isNotActiveStyle}
                >
                    Items
                </NavLink>
                <NavLink
                    to={'/dashboard/newItem'}
                    className={({ isActive }) => isActive ? `${isActiveStyle}  px-4 py-2 border-l-8 border-red-500` : isNotActiveStyle}
                >
                    Add New Item
                </NavLink>
                <NavLink
                    to={'/dashboard/users'}
                    className={({ isActive }) => isActive ? `${isActiveStyle}  px-4 py-2 border-l-8 border-red-500` : isNotActiveStyle}
                >
                    Users
                </NavLink>
            </ul>
        </div>
    )
}

export default DBLeft