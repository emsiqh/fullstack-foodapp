import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { buttonClick, slideIn, staggerFadeInOut } from '../animations';
import { setCartOff } from '../context/actions/displayCartActions';
import { BiChevronRight, FcClearFilters, HiCurrencyDollar } from '../assets/icons';
import { alertNull, alertSuccess } from '../context/actions/alertActions';
import { setCartItems, clearCartItems } from '../context/actions/cartActions';
import { baseUrl, getAllCartItems, increaseItemQuantity, emptyCart } from '../api';
import EmptyCart from "../assets/img/emptyCart.svg";

const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        let tot = 0;
        if (cart) {
            tot = cart.reduce((acc, data) => acc + data.product_price * data.quantity, 0);
            setTotal(tot);
        }
    }, [cart]);

    const handleCheckout = () => {
        const data = {
            user: user,
            cart: cart,
            total: total,
        };

        axios.post(`${baseUrl}/api/products/create-checkout-session`, { data }).then((res) => {
            window.location.href = res.data.url;
        }).catch((err) => console.log(err));
    };

    const removeCart = async () => {
        dispatch(clearCartItems());
        console.log('ok');
        dispatch(alertSuccess("Removed the cart item"));
        try {
            await emptyCart(user?.user_id);
            // const items = await getAllCartItems(user?.user_id);
            // dispatch(setCartItems(items));
            dispatch(alertNull());
        } catch (error) {
            console.error("Failed to remove cart items:", error);
        }
    };

    return (
        <motion.div
            {...slideIn}
            className="fixed z-50 top-0 right-0 w-300 md:w-[460px] bg-lightOverlay backdrop-blur-md shadow-md h-screen"
        >
            <div className="w-full flex items-center justify-between py-4 px-6">
                <motion.i
                    {...buttonClick}
                    className="cursor-pointer"
                    onClick={() => dispatch(setCartOff())}
                >
                    <BiChevronRight className="text-[50px] text-textColor" />
                </motion.i>
                <p className='text-2xl text-headingColor font-semibold'>Your Cart</p>
                <motion.i
                    {...buttonClick}
                    className='cursor-pointer'
                    onClick={() => removeCart()}
                >
                    <FcClearFilters className='text-[30px] text-textColor' />
                </motion.i>
            </div>

            <div className="flex flex-col rounded-t-3xl bg-zinc-900 h-full py-6 gap-3 relative">
                {cart ? <>
                    <div className="flex flex-col w-full items-start justify-start gap-3 h-[65%] overflow-y-scroll no-scrollbar px-4">
                        {cart && cart?.length > 0 && cart?.map((item, i) => (<CartItemCard key={i} index={i} data={item} />
                        ))}
                    </div>

                    <div className=" bg-zinc-800 rounded-t-[60px] w-full h-[30%] flex flex-col items-center justify-center px-4 py-6 gap-2">
                        <div className="w-full flex items-center justify-evenly">
                            <p className="text-3xl text-zinc-500 font-semibold">Total</p>
                            <p className="text-3xl text-orange-500 font-semibold flex items-center justify-center gap-1">
                                <HiCurrencyDollar className="text-primary" />
                                {total}
                            </p>
                        </div>

                        {/* Button checkout */}
                        {user ? (
                            <motion.button
                                onClick={handleCheckout}
                                {...buttonClick}
                                type="button"
                                className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
                            >
                                Check Out
                            </motion.button>
                        ) : (
                            <motion.button
                                {...buttonClick}
                                type="button"
                                className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
                            >
                                Login to check out
                            </motion.button>
                        )}
                    </div>
                </> :
                    (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
                            <img src={EmptyCart} className="w-300" alt="" />
                            <p className="text-xl text-textColor font-semibold">
                                Add some items to your cart
                            </p>
                        </div>
                    )
                }
            </div>
        </motion.div>
    );
};

export const CartItemCard = ({ index, data }) => {
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user);
    const [itemTotal, setItemTotal] = useState(0);
    const dispatch = useDispatch();

    const decrementCart = (productId) => {
        dispatch(alertSuccess("Updated the cart item"));
        increaseItemQuantity(user?.user_id, productId, 'decrement').then((data) => {
            getAllCartItems(user?.user_id).then((items) => {
                dispatch(setCartItems(items));
                dispatch(alertNull());
            });
        });
    };

    const incrementCart = (productId) => {
        dispatch(alertSuccess("Updated the cart item"));
        increaseItemQuantity(user?.user_id, productId, 'increment').then((data) => {
            getAllCartItems(user?.user_id).then((items) => {
                dispatch(setCartItems(items));
                dispatch(alertNull());
            });
        });
    };

    useEffect(() => {
        setItemTotal(data.product_price * data.quantity);
    }, [itemTotal, cart]);

    return (
        <motion.div
            key={index}
            {...staggerFadeInOut(index)}
            className='w-full flex items-center justify-start bg-zinc-800 rounded-md drop-shadow-md px-4 gap-4'
        >
            <img
                src={data?.imageURL}
                className="w-24 min-w-[94px] h-24 object-contain"
                alt=""
            />
            <div className="flex items-center justify-start gap-1 w-full">
                <p className="text-lg text-primary font-semibold">
                    {data?.product_name}
                    <span className="text-sm block capitalize text-gray-400">
                        {data.product_category}
                    </span>
                </p>
                <p className="text-sm font-semibold text-red-400 ml-auto flex items-center justify-center gap-1">
                    <HiCurrencyDollar className='text-red-400 text-xl' /> {itemTotal}
                </p>
            </div>

            <div className="al-auto flex items-center justify-center gap-3">
                <motion.div
                    {...buttonClick}
                    onClick={() => decrementCart(data?.productId)}
                    className="w-8 h-8 flex items-center justify-center rounded-md drop-shadow-md bg-zinc-900 cursor-pointer"
                >
                    <p className="text-xl font-semibold text-primary">--</p>
                </motion.div>
                <p className="text-lg text-primary font-semibold">{data?.quantity}</p>
                <motion.div
                    {...buttonClick}
                    className="w-8 h-8 flex items-center justify-center rounded-md drop-shadow-md bg-zinc-900 cursor-pointer"
                    onClick={() => incrementCart(data?.productId)}
                >
                    <p className="text-xl font-semibold text-primary">+</p>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Cart;