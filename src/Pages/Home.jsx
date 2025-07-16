import React from 'react';

import AboutClub from '../Components/AboutClub';
import LocationMap from '../Components/LocationMap';
import Promotions from '../Components/PromoCoupons';
import Banner from '../Components/Banner';


const Home = () => {
    return (
        <div className='bg-white '>
            <Banner></Banner>
            <AboutClub></AboutClub>
            <LocationMap></LocationMap>
            <Promotions></Promotions>
        </div>
    );
};

export default Home;