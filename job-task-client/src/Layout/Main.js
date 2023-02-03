import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../Pages/Shared/NavBar/NavBar';

const componentName = () => {
    return (
        <div>
            <NavBar />
            <Outlet></Outlet>
            
            
        </div>
    );
};

export default componentName;