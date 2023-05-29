import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DataTable } from '../components';
import { HiCurrencyDollar } from '../assets/icons';
import { deleteProduct, getAllProducts } from '../api';
import { setAllProducts } from '../context/actions/productActions';
import { alertNull, alertSuccess, alertWarning } from '../context/actions/alertActions';

const DBItems = () => {
    const products = useSelector((state) => state.products);
    const dispatch = useDispatch();

    return (
        <div className='flex items-center justify-center pt-6 w-full'>
            <DataTable columns={[
                {
                    title: 'Image',
                    field: 'imageURL',
                    render: (rowData) => (
                        <img
                            src={rowData.imageURL}
                            className='w-32 h-16 object-contain rounded-md'
                        />
                    )

                },
                {
                    title: 'Name',
                    field: 'product_name',
                },
                {
                    title: 'Category',
                    field: 'product_category',
                },
                {
                    title: 'Price',
                    field: 'product_price',
                    render: (rowData) => (
                        <p className='text-xl font-semibold text-textColor flex items-center justify-start gap-2'>
                            <HiCurrencyDollar className='text-red-400' />
                            {parseFloat(rowData.product_price).toFixed(2)}
                        </p>
                    ),
                },
            ]}
                data={products}
                title='List of products'
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit Data',
                        onClick: (event, rowData) => {
                            alert('You want to edit ' + rowData.productId);
                        },
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete Data',
                        onClick: (event, rowData) => {
                            if (window.confirm('Are you sure you want to delete?')) {
                                deleteProduct(rowData.productId).then(() => {
                                    dispatch(alertSuccess('Product deleted successfully'));
                                    const updatedProducts = products.filter(product => product.productId !== rowData.productId);
                                    dispatch(setAllProducts(updatedProducts));
                                    setTimeout(() => {
                                        dispatch(alertNull());
                                    }, 3000);
                                }).catch((error) => {
                                    console.error(`Error deleting product ${rowData.productId}: ${error}`);
                                    dispatch(alertWarning(`Error deleting product ${rowData.productId}: ${error}`));
                                });
                            }
                        },
                    },
                ]}
            />
        </div>
    )
}

export default DBItems