import React from 'react';

import { LoginBg, Logo } from '../assets';

const Login = () => {
    return (
        <div className='w-screen h-screen relative overflow-hidden flex'>
            {/* Background image */}
            <img src={LoginBg} alt="" className='w-full h-full object-cover absolute top-0 left-0' />

            {/* Content box */}
            <div className='flex flex-col items-center bg-cardOverlay w-[80%] md:w-[400px] h-full z-10 backdrop-blur-md p-4 px-4 py-12 gap-6'>
                {/* Top logo section */}
                <div className='flex items-center justify-start gap-4 w-full'>
                    <img src={Logo} className='w-8' />
                    <p className='text-headingColor font-semibold text-2xl'>City</p>
                </div>

                {/* Welcome text */}
                <p className='text-3xl font-semibold text-headingColor'>Welcome Back</p>
                <p className='text-xl text-textColor -mt-6'>Sign in with following</p>

                {/* Input section */}
                <div className='w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4'>
                    <p>a</p>
                    <p>a</p>
                    <p>a</p>
                </div>
            </div>

        </div>
    )
}

export default Login