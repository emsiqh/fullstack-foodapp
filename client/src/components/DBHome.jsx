import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CChart } from '@coreui/react-chartjs';

import { getAllProducts, getAllUsers } from '../api';
import { setAllProducts } from '../context/actions/productActions';
import { setAllUsersDetail } from '../context/actions/allUsersActions';

const DBHome = () => {
    const products = useSelector((state) => state.products);
    const allUsers = useSelector((state) => state.allUsers);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!products) {
            getAllProducts().then((data) => {
                dispatch(setAllProducts(data));
            })
        }
        if (!allUsers) {
            getAllUsers().then((data) => {
                dispatch(setAllUsersDetail(data));
            })
        }
    }, []);

    const drinks = products?.filter((item) => item.product_category === 'drinks');
    const deserts = products?.filter((item) => item.product_category === 'deserts');
    const fruits = products?.filter((item) => item.product_category === 'fruits');
    const rice = products?.filter((item) => item.product_category === 'rice');
    const curry = products?.filter((item) => item.product_category === 'curry');
    const chinese = products?.filter((item) => item.product_category === 'chinese');
    const bread = products?.filter((item) => item.product_category === 'bread');
    const cream = products?.filter((item) => item.product_category === 'icecream');

    return (
        <div className='flex items-center justify-center pt-6 w-full h-full'>
            <div className='grid w-full grid-cols-1 md:grid-cols-2 gap-4 h-full'>
                <div className='flex items-center justify-center'>
                    <div className='w-340 md:w-508'>
                        <CChart
                            type="bar"
                            data={{
                                labels: ['Drinks', 'Deserts', 'Fruits', 'Rice', 'Curry', 'Chinese', 'Bread', 'Ice Cream'],
                                datasets: [
                                    {
                                        label: 'Category wise count',
                                        backgroundColor: '#f87979',
                                        data: [
                                            drinks?.length,
                                            deserts?.length,
                                            fruits?.length,
                                            rice?.length,
                                            curry?.length,
                                            chinese?.length,
                                            bread?.length,
                                            cream?.length,
                                        ],
                                    },
                                ],
                            }}
                            labels="months"
                        />
                    </div>
                </div>
                <div className='w-full h-full flex items-center justify-center'>
                    <div className='w-275 md:w-460'>
                        <CChart
                            type="doughnut"
                            data={{
                                labels: [
                                    'Orders', 'Deliveried', 'Cancelled', 'Paid', 'Not Paid'
                                ],
                                datasets: [
                                    {
                                        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16', '#5daccd'],
                                        data: [40, 50, 10, 80, 10],
                                    },
                                ],
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DBHome;