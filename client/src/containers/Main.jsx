import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Cart, FilterSection, Home, HomeSlider, Header } from '../components';
import { setAllProducts } from '../context/actions/productActions';
import { getAllProducts } from '../api';

const Main = () => {
    const products = useSelector((state) => state.products);
    const isCart = useSelector((state) => state.isCart);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!products) {
            getAllProducts().then((data) => {
                dispatch(setAllProducts(data));
            });
        }
    }, []);

    return (
        <main className='w-screen min-h-screen flex items-center justify-center flex-col bg-primary '>
            <Header />
            <div className='w-full flex flex-col item-start justify-center mt-32 px-6 md:px-20 2xl:px-96 gap-12 pb-24'>
                <Home />
                <HomeSlider />
                <FilterSection />
            </div>

            {isCart && <Cart />}
        </main>
    )
}

export default Main;