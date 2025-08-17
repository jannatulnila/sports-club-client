import React from 'react';

import AboutClub from '../Components/AboutClub';
import LocationMap from '../Components/LocationMap';
import Promotions from '../Components/PromoCoupons';
import Banner from '../Components/Banner';
import Testimonials from '../Components/Testimonials';
import Achievements from '../Components/Achievements';
import Newsletter from '../Components/Newsletter';
import Announcements from '../Components/Announcements';


const Home = () => {
    return (
        <div className='bg-white '>
            <Banner></Banner>
            <Announcements></Announcements>
            <Testimonials></Testimonials>
            <Achievements></Achievements>
            <AboutClub></AboutClub>
            <Newsletter></Newsletter>
            <LocationMap></LocationMap>
            <Promotions></Promotions>
        </div>
    );
};

export default Home;