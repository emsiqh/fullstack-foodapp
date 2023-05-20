import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { LoginBg, Logo } from '../assets';
import { LoginInput } from '../components';
import { FaEnvelope, FaLock } from '../assets/icons';
import { buttonClick } from '../animations';

const Login = () => {
    const [userEmail, setUserEmail] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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
                <p className='text-xl text-textColor -mt-6'>{isSignUp ? 'Sign up' : 'Sign in'} with following</p>

                {/* Input section */}
                <div className='w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-1'>
                    <LoginInput
                        placeHolder={"Email"}
                        icon={<FaEnvelope className='text-xl text-textColor' />}
                        inputState={userEmail}
                        inputStateFunc={setUserEmail}
                        type="email"
                        isSignUp={isSignUp} />
                </div>
                <div className='w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-1'>
                    <LoginInput
                        placeHolder={"Password"}
                        icon={<FaLock className='text-xl text-textColor' />}
                        inputState={password}
                        inputStateFunc={setPassword}
                        type="password"
                        isSignUp={isSignUp} />
                </div>
                {
                    isSignUp && (
                        <div className='w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-1'>
                            <LoginInput
                                placeHolder={"Confirm Password"}
                                icon={<FaLock className='text-xl text-textColor' />}
                                inputState={confirmPassword}
                                inputStateFunc={setConfirmPassword}
                                type="password"
                                isSignUp={isSignUp} />
                        </div>
                    )
                }

                {/* Text */}
                {!isSignUp ? (
                    <p>
                        Doesn't have an account:{" "}
                        <motion.button
                            {...buttonClick}
                            className='text-red-700 underline cursor-pointer bg-transparent'
                            onClick={() => setIsSignUp(true)}
                        >
                            Create
                        </motion.button>
                    </p>
                ) : (
                    <p>
                        Already have an account:{" "}
                        <motion.button
                            {...buttonClick}
                            className='text-red-700 underline cursor-pointer bg-transparent'
                            onClick={() => setIsSignUp(false)}
                        >
                            Sign-in
                        </motion.button>
                    </p>
                )}

                {/* Button section */}
                {!isSignUp ? (
                    <motion.button
                        {...buttonClick}
                        className='w-full rounded-md bg-red-400 px-4 py-2 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-150'
                    >
                        Sign in
                    </motion.button>
                ) : (
                    <motion.button
                        {...buttonClick}
                        className='w-full rounded-md bg-red-400 px-4 py-2 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-150'
                    >
                        Sign up
                    </motion.button>
                )
                }
            </div>

        </div>
    )
}

export default Login