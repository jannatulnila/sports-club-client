// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
// import { motion } from 'framer-motion';
// import 'swiper/css';
// import 'swiper/css/effect-fade';
// import 'swiper/css/pagination';

// const banners = [
//   {
//     title: 'Welcome to PrimeFit Club',
//     subtitle: 'Where Passion Meets Performance',
//     image: '/Image/club.webp',
//   },
//   {
//     title: 'World-Class Courts',
//     subtitle: 'Tennis, Badminton, Squash & More',
//     image: '/Image/top-view-people-playing-paddle-tennis.jpg',
//   },
//   {
//     title: 'Exciting Activities',
//     subtitle: 'Tournaments, Training, and Fun!',
//     image: '/Image/activities.jpg',
//   },
// ];

// const Banner = () => {
//   return (
//     <div className="w-full h-[500px]  overflow-hidden">
//       <Swiper
//         modules={[Autoplay, Pagination, EffectFade]}
//         effect="fade"
//         pagination={{ clickable: true }}
//         autoplay={{ delay: 4000, disableOnInteraction: false }}
//         loop={true}
//         className="h-full"
//       >
//         {banners.map((banner, index) => (
//           <SwiperSlide key={index}>
//             <div
//               className=" w-full h-full bg-cover bg-center flex items-center justify-center"
//               style={{ backgroundImage: `url(${banner.image})` }}
//             >
//               <div className="bg-black/40 w-full h-full absolute top-0 left-0 z-0" />
//               <motion.div
//                 className="z-10 text-center text-white px-4"
//                 initial={{ opacity: 0, y: 50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 1 }}
//               >
//                 <h2 className="text-4xl md:text-5xl font-bold mb-4">{banner.title}</h2>
//                 <p className="text-xl md:text-2xl">{banner.subtitle}</p>
//               </motion.div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default Banner;



import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const banners = [
  {
    title: 'Welcome to PrimeFit Club',
    subtitle: 'Where Passion Meets Performance',
    image: '/Image/club.webp',
  },
  {
    title: 'World-Class Courts',
    subtitle: 'Tennis, Badminton, Squash & More',
    image: '/Image/top-view-people-playing-paddle-tennis.jpg',
  },
  {
    title: 'Exciting Activities',
    subtitle: 'Tournaments, Training, and Fun!',
    image: '/Image/activities.jpg',
  },
];

const Banner = () => {
  return (
    <div className="w-full h-[300px] md:h-[500px] relative overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        speed={1200} // smooth transition speed (ms)
        fadeEffect={{ crossFade: true }} // smoother fade
        className="h-full"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full h-full bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: `url(${banner.image})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 z-0" />

              {/* Animated Content */}
              <motion.div
                className="z-10 text-center text-white px-4"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                  {banner.title}
                </h2>
                <p className="text-xl md:text-2xl drop-shadow-md">{banner.subtitle}</p>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
