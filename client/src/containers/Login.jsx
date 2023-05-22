import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import { LoginBg, Logo } from '../assets';
import { LoginInput } from '../components';
import { FaEnvelope, FaLock, FcGoogle } from '../assets/icons';
import { buttonClick } from '../animations';
import { app } from '../config/firebase.config';
import { validateUserJWTToken } from '../api';
import { setUserDetails } from '../context/actions/userActions';
import { alertInfo, alertWarning } from '../context/actions/alertActions';

const Login = () => {
    const [userEmail, setUserEmail] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    const alert = useSelector((state) => state.alert);

    useEffect(() => {
        // console.log('ok');
        navigate('/', { replace: true });
    }, [user]);

    const loginWithGoogle = async () => {
        try {
            await signInWithPopup(firebaseAuth, provider).then((userCredential) => {
                firebaseAuth.onAuthStateChanged((cred) => {
                    if (cred) {
                        cred.getIdToken().then((token) => {
                            validateUserJWTToken(token).then(data => {
                                dispatch(setUserDetails(data));
                            });
                            navigate('/', { replace: true });
                        });
                    }
                });
            });
        } catch (error) {
            console.log(error.code);
            console.log(error.message);
        }
    }

    const signUpWithEmailPass = async () => {
        if (userEmail === "" || password === "" || confirmPassword === "") {
            dispatch(alertInfo('Required fields should not be empty'));
        } else {
            if (password === confirmPassword) {
                setUserEmail("");
                setPassword("");
                setConfirmPassword("");
                await createUserWithEmailAndPassword(firebaseAuth, userEmail, password).then((userCredential) => {
                    firebaseAuth.onAuthStateChanged((cred) => {
                        if (cred) {
                            cred.getIdToken().then((token) => {
                                validateUserJWTToken(token).then(data => {
                                    dispatch(setUserDetails(data));
                                })
                                navigate('/', { replace: true });
                            });
                        }
                    });
                });
            } else {
                dispatch(alertWarning('Passwords do not match'));
            }
        }
    };

    const signInWithEmailPass = async () => {
        if (userEmail !== "" && password !== "") {
            try {
                await signInWithEmailAndPassword(firebaseAuth, userEmail, password).then((userCredential) => {
                    firebaseAuth.onAuthStateChanged((cred) => {
                        if (cred) {
                            cred.getIdToken().then((token) => {
                                validateUserJWTToken(token).then(data => {
                                    dispatch(setUserDetails(data));
                                });
                                navigate('/', { replace: true });
                            });
                        }
                    });
                });
            } catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            }

        } else {
            dispatch(alertWarning('Please enter email and password'))
        }
    };

    return (
        <div className='w-screen h-screen relative overflow-hidden flex'>
            {/* Background image */}
            <img src={LoginBg} alt="" className='w-full h-full object-cover absolute top-0 left-0' />

            {/* Content box */}
            <div className='flex flex-col items-center bg-cardOverlay w-[80%] md:w-[400px] h-full z-10 backdrop-blur-md p-4 px-4 pt-8 gap-6'>
                {/* Top logo section */}
                <div className='flex items-center justify-start gap-4 w-full'>
                    <img src={Logo} className='w-8' alt='logo' />
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
                <div className='w-full px-4 py-2 md:px-12'>
                    {!isSignUp ? (
                        <motion.button
                            {...buttonClick}
                            className='w-full rounded-md bg-red-400 px-4 py-2 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-150'
                            onClick={signInWithEmailPass}
                        >
                            Sign in
                        </motion.button>
                    ) : (

                        <motion.button
                            {...buttonClick}
                            className='w-full rounded-md bg-red-400 px-4 py-2 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-150'
                            onClick={signUpWithEmailPass}
                        >
                            Sign up
                        </motion.button>
                    )}

                    {/* white line */}
                    <div className='flex items-center justify-between gap-8 py-6'>
                        <div className='bg-white rounded-sm h-[1px] w-24'></div>
                        <p className='text-white'>or</p>
                        <div className='bg-white rounded-sm h-[1px] w-24'></div>
                    </div>

                    {/* google login btn */}
                    <motion.div
                        {...buttonClick}
                        className='bg-cardOverlay backdrop-blur-md rounded-3xl w-full px-4 py-2 flex items-center justify-center gap-4 cursor-pointer'
                        onClick={loginWithGoogle}
                    >
                        <FcGoogle className='text-3xl' />
                        <p className='capitalize text-base text-headingColor'>Sign in with Google</p>
                    </motion.div>

                </div>




            </div>

        </div>
    )
}

export default Login