import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import club from '../assets/club.png'
import courts from '../assets/courts.png'
import activities from '../assets/activities.png'
import { Carousel } from 'react-responsive-carousel';

const Banner = () => {
    return (
        <div >
            <Carousel
                autoPlay={true}
                infiniteLoop={true}
                showThumbs={false}
                showStatus={false}
                showArrows={false}
                >
                <div>
                    <img src={club} />
                </div>
                <div>
                    <img src={courts} />
                </div>
                <div >
                    <img src={activities} />
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;