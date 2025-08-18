// import { FaHistory } from 'react-icons/fa';
// import { BsBullseye } from 'react-icons/bs';
// import { AiOutlineEye } from 'react-icons/ai';

// const AboutClub = () => (
//   <section className="bg-white py-12 px-4 md:px-8 lg:px-20">
//     <div className="max-w-6xl mx-auto text-center itc">
//       <h2 className="text-4xl text-secondary font-bold mb-6">About Our Club</h2>
//       <p className="text-gray-600 mb-12">
//         Welcome to <span className="font-semibold text-primary">PrimeFit Sports Club</span> — a modern and inclusive court-based fitness community
//         offering tennis, squash, and badminton sessions for athletes of all levels.
//       </p>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        
//         {/* History */}
//         <div className="bg-white shadow-md p-6  rounded-lg">
//           <div className="flex items-center gap-2 mb-3 text-secondary justify-center">
//             <FaHistory className="text-2xl " />
//             <h3 className="text-xl font-semibold">Our History</h3>
//           </div>
//           <p className="text-gray-700 text-center">
//             Established in 2010, PrimeFit began with just some courts and a small team of passionate coaches.
//             Over the years, we've grown into one of the city’s most respected sports clubs, serving 1,000+ members.
//           </p>
//         </div>

//         {/* Mission */}
//         <div className="bg-white shadow-md p-6 rounded-lg">
//           <div className="flex items-center gap-2 mb-3 text-secondary justify-center">
//             <BsBullseye className="text-2xl" />
//             <h3 className="text-xl font-semibold">Our Mission</h3>
//           </div>
//           <p className="text-gray-700 text-center">
//             To promote a healthy and active lifestyle by providing a welcoming space where individuals can train,
//             compete, and connect through court-based sports — all while receiving professional support and mentorship.
//           </p>
//         </div>

//         {/* Vision */}
//         <div className="bg-white shadow-md p-6 rounded-lg">
//           <div className="flex items-center gap-2 mb-3 text-secondary justify-center">
//             <AiOutlineEye className="text-2xl" />
//             <h3 className="text-xl font-semibold">Our Vision</h3>
//           </div>
//           <p className="text-gray-700 text-center">
//             We envision a vibrant fitness community that inspires excellence, nurtures talent, and
//             fosters lifelong friendships through the spirit of sportsmanship and collaboration.
//           </p>
//         </div>
//       </div>
//     </div>
//   </section>
// );

// export default AboutClub;



// import React, { useState, useEffect, useRef } from 'react';
// import { FaHistory } from 'react-icons/fa';
// import { BsBullseye } from 'react-icons/bs';
// import { AiOutlineEye } from 'react-icons/ai';
// import { Users, Trophy, MapPin } from 'lucide-react';

// const AboutClub = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const sectionRef = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//         }
//       },
//       { threshold: 0.1 }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   const stats = [
//     { number: '1000+', label: 'Active Members', icon: Users },
//     { number: '15+', label: 'Years Experience', icon: FaHistory },
//     { number: '50+', label: 'Championships', icon: Trophy },
//     { number: '3', label: 'Court Sports', icon: MapPin }
//   ];

//   return (
//     <section 
//       ref={sectionRef}
//       className="relative py-20 px-4 md:px-8 bg-gray-200 lg:px-20 overflow-hidden"
      
//     >

//       <div className="max-w-7xl mx-auto relative z-10">
//         {/* Header Section */}
//         <div className="text-center mb-16">
//           <div>
//             <div className="inline-flex items-center gap-3 mb-4">
//               <div 
//                 className="w-12 h-1 rounded-full bg-primary"
                
//               ></div>
//               <span 
//                 className="text-md font-semibold text-secondary "
                
//               >
//                 ABOUT US
//               </span>
//               <div 
//                 className="w-12 h-1 rounded-full bg-primary"
//               ></div>
//             </div>
            
//             <h2 
//               className="text-xl md:text-3xl text-secondary font-bold mb-6 leading-tight"
              
//             >
//               About Our{' '}
//               <span 
//                 className="relative inline-block text-primary"
                
//               >
//                 Club
//                 <div 
//                   className="absolute -bottom-2 bg-primary opacity-25 left-0 w-full h-1 rounded-full"
                  
//                 ></div>
//               </span>
//             </h2>
            
//             <p className="text-md md:text-lg max-w-4xl mx-auto leading-relaxed text-gray-700">
//               Welcome to{' '}
//               <span 
//                 className="font-bold text-primary"            
//               >
//                 PrimeFit Sports Club
//               </span>
//               {' '}— a modern and inclusive court-based fitness community offering tennis, squash, and badminton sessions for athletes of all levels.
//             </p>
//           </div>
//         </div>

//         {/* Stats Section */}
//         <div 
//           className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 "
//         >
//           {stats.map((stat, index) => {
//             const IconComponent = stat.icon;
//             return (
//               <div 
//                 key={index}
//                 className="text-center group cursor-pointer"
//               >
//                 <div 
//                   className="w-12 h-12 mx-auto mb-4 rounded-2xl flex items-center justify-center  bg-primary duration-300 "
                  
//                 >
//                   <IconComponent className="w-5 h-5 text-white" />
//                 </div>
//                 <div 
//                   className="text-4xl font-bold mb-2 text-secondary "
                  
//                 >
//                   {stat.number}
//                 </div>
//                 <div className="text-gray-600 font-semibold">{stat.label}</div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Main Content Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* History Card */}
//           <div 
//             className="group cursor-pointer"
            
//           >
//             <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full relative overflow-hidden">
//               <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 transform translate-x-10 -translate-y-10 bg-primary"></div>
              
//               <div className="relative z-10">
//                 <div 
//                   className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6  bg-secondary"
//                 >
//                   <FaHistory className="w-8 h-8 text-white" />
//                 </div>
                
//                 <h3 
//                   className="text-2xl font-bold text-secondary mb-4"
//                 >
//                   Our History
//                 </h3>
                
//                 <p className="text-gray-700 leading-relaxed">
//                   Established in 2010, PrimeFit began with just a few courts and a small team of passionate coaches. Over the years, we've grown into one of the city's most respected sports clubs, serving over 1,000 members.
//                 </p>
                
//                 <div 
//                   className="w-12 h-1 rounded-full mt-6 group-hover:w-20 transition-all duration-300 bg-primary"
                  
//                 ></div>
//               </div>
//             </div>
//           </div>

//           {/* Mission Card */}
//           <div 
//             className="group cursor-pointer "
//           >
//             <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full relative overflow-hidden">
//               <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 transform translate-x-10 -translate-y-10 bg-secondary"></div>
              
//               <div className="relative z-10">
//                 <div 
//                   className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-primary"
                  
//                 >
//                   <BsBullseye className="w-8 h-8 text-white" />
//                 </div>
                
//                 <h3 
//                   className="text-2xl font-bold mb-4 text-primary"
                  
//                 >
//                   Our Mission
//                 </h3>
                
//                 <p className="text-gray-700 leading-relaxed">
//                   To promote a healthy and active lifestyle by providing a welcoming space where individuals can train, compete, and connect through court-based sports — all while receiving professional support and mentorship.
//                 </p>
                
//                 <div 
//                   className="w-12 h-1 rounded-full mt-6 group-hover:w-20 transition-all duration-300 bg-secondary"
                  
//                 ></div>
//               </div>
//             </div>
//           </div>

//           {/* Vision Card */}
//           <div 
//             className="group cursor-pointer "
            
//           >
//             <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full relative overflow-hidden">
//               <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 bg-primary"
//               ></div>
              
//               <div className="relative z-10">
//                 <div 
//                   className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-secondary"
                  
//                 >
//                   <AiOutlineEye className="w-8 h-8 text-white" />
//                 </div>
                
//                 <h3 
//                   className="text-2xl text-secondary font-bold mb-4"
                  
//                 >
//                   Our Vision
//                 </h3>
                
//                 <p className="text-gray-700 leading-relaxed">
//                   We envision a vibrant fitness community that inspires excellence, nurtures talent, and fosters lifelong friendships through the spirit of sportsmanship and collaboration.
//                 </p>
                
//                 <div 
//                   className="w-12 h-1 rounded-full mt-6 group-hover:w-20 transition-all bg-primary duration-300"
                  
//                 ></div>
//               </div>
//             </div>
//           </div>
//         </div>

//       </div>

//     </section>
//   );
// };

// export default AboutClub;

import { FaHistory } from 'react-icons/fa';
import { BsBullseye } from 'react-icons/bs';
import { AiOutlineEye } from 'react-icons/ai';
import aboutimg1 from "../assets/aboutimg1.jpg"
import aboutimg2 from "../assets/aboutimg2.jpg"
import aboutimg3 from "../assets/aboutimg3.jpg"
import aboutimg4 from "../assets/aboutimg4.jpg"
import { LocationEdit } from 'lucide-react';

const AboutClub = () => (
  <section className="bg-gray-200 py-6 md:py-10 px-4 md:px-8 lg:px-20">
    <h2 className="text-3xl text-secondary text-center font-bold mb-8">About Our Club</h2>
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      {/* Left Content */}
      <div>
        {/* History */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2 text-secondary">
            <FaHistory className="text-2xl" />
            <h3 className="text-xl font-semibold">Our History</h3>
          </div>
          <p className="text-gray-700">
            Established in 2010, PrimeFit began with just a few courts and a small team of passionate coaches. Over the years, we've grown into one of the city's most respected sports clubs, serving over 1,000 members.
          </p>
        </div>

        {/* Mission */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2 text-secondary">
            <BsBullseye className="text-2xl" />
            <h3 className="text-xl font-semibold">Our Mission</h3>
          </div>
          <p className="text-gray-700">
            To provide exceptional sports facilities and programs that inspire athletes of all ages 
            and skill levels to achieve their personal best while fostering a sense of community, 
            sportsmanship, and lifelong wellness.
          </p>
        </div>

        {/* Vision */}
        <div>
          <div className="flex items-center gap-2 mb-2 text-secondary">
            <AiOutlineEye className="text-2xl" />
            <h3 className="text-xl font-semibold">Our Vision</h3>
          </div>
          <p className="text-gray-700">
            To be the premier sports destination that cultivates excellence, promotes healthy living, 
            and builds lasting connections through the power of sport and community engagement.
          </p>
        </div>
      </div>

      {/* Right Images */}
      <div className="grid grid-cols-2 gap-6">
        <img
          src={aboutimg1}
          alt="Trophies"
          className="rounded-lg shadow-md"
        />
        <img
          src={aboutimg2}
          alt="Team"
          className="rounded-lg shadow-md"
        />
        <img
          src={aboutimg3}
          alt="Coaching"
          className="rounded-lg shadow-md"
        />
        <img
          src={aboutimg4}
          alt="Gym"
          className="rounded-lg shadow-md"
        />
      </div>
    </div>
  </section>
);

export default AboutClub;
