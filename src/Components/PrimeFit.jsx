import React from 'react';
import logo from "../assets/logoimg (2).png"
import { Link } from 'react-router';

const PrimeFit = () => {
     return (
        <Link to="/">
            <div className='flex items-center'>
                <img className='mb-2 w-20 h-20' src={logo} alt="count-mate-logo" />
                <p className='text-2xl text-primary font-extrabold'>PrimeFit</p>
            </div>
        </Link>
    );
};

export default PrimeFit;