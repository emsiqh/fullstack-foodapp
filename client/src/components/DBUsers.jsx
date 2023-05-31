import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { DataTable } from '../components';
import { getAllUsers } from '../api';
import { setAllUsersDetail } from '../context/actions/allUsersActions';
import { alertNull, alertSuccess, alertWarning } from '../context/actions/alertActions';
import { Avatar } from '../assets';

const DBUsers = () => {
    const allUsers = useSelector((state) => state.allUsers);
    const dispatch = useDispatch();

    return (
        <div className='flex items-center justify-center pt-6 w-full'>
            <DataTable columns={[
                {
                    title: 'Image',
                    field: 'photoURL',
                    render: (rowData) => (
                        <img
                            src={rowData.photoURL ? rowData.photoURL : Avatar}
                            className='w-32 h-16 object-contain rounded-md'
                        />
                    )

                },
                {
                    title: 'Name',
                    field: 'displayName',
                    render: (rowData) => (
                        <p>{rowData.displayName ? rowData.displayName : rowData.email}</p>
                    )
                },
                {
                    title: 'Verified',
                    field: 'emailVerified',
                    render: (rowData) => (
                        <p
                            className={`px-2 py-1 w-32 text-center text-primary rounded-md ${rowData.emailVerified ? 'bg-emerald-500' : 'bg-red-500'}`}
                        >
                            {rowData.emailVerified ? 'Verified' : 'Not verified'}
                        </p>
                    )
                },
            ]}
                data={allUsers}
                title='List of Users'
            // actions={[
            //     {
            //         icon: 'edit',
            //         tooltip: 'Edit Data',
            //         onClick: (event, rowData) => {
            //             alert('You want to edit ' + rowData.productId);
            //         },
            //     },
            //     {
            //         icon: 'delete',
            //         tooltip: 'Delete Data',
            //         onClick: (event, rowData) => {
            //             if (window.confirm('Are you sure you want to delete?')) {
            //                 deleteProduct(rowData.productId).then(() => {
            //                     dispatch(alertSuccess('Product deleted successfully'));
            //                     const updatedProducts = products.filter(product => product.productId !== rowData.productId);
            //                     dispatch(setAllProducts(updatedProducts));
            //                     setTimeout(() => {
            //                         dispatch(alertNull());
            //                     }, 3000);
            //                 }).catch((error) => {
            //                     console.error(`Error deleting product ${rowData.productId}: ${error}`);
            //                     dispatch(alertWarning(`Error deleting product ${rowData.productId}: ${error}`));
            //                 });
            //             }
            //         },
            //     },
            // ]}
            />
        </div>
    )
}

export default DBUsers