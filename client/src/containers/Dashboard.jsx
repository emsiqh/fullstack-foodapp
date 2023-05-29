import React from 'react';
import { DBLeft, DBRight } from '../components';

const Dashboard = () => {
    return (
        <div className='w-screen h-screen flex items-center bg-primary'>
            <DBLeft />
            <DBRight />
        </div>
    )
}

export default Dashboard;