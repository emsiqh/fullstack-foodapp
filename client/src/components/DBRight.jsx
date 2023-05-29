import React from 'react';
import { Route, Routes } from "react-router-dom";

import { DBHeader, DBHome, DBOrders, DBItems, DBNewItem, DBUsers } from '../components';

const DBRight = () => {
    return (
        <div className='flex flex-col h-full py-12 px-12 flex-1'>
            <DBHeader />
            <div className='flex flex-col flex-1 overflow-y-scroll overflow-hidden'>
                <Routes>
                    <Route path='/home' element={<DBHome />} />
                    <Route path='/orders' element={<DBOrders />} />
                    <Route path='/items' element={<DBItems />} />
                    <Route path='/newItem' element={<DBNewItem />} />
                    <Route path='/users' element={<DBUsers />} />
                </Routes>
            </div>
        </div>
    )
}

export default DBRight