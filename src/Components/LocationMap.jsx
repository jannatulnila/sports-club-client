// import React from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// // Fix default icon issues in React Leaflet
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//   iconUrl:
//     'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//   shadowUrl:
//     'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// });

// const LocationMap = () => {
//   const position = [23.767895, 90.365019]; // Shaheed Suhrawardi Indoor Stadium

//   return (
//     <section className="bg-gray-200 py-12 px-4 md:px-8 lg:px-16">
//       <div className="max-w-5xl mx-auto text-center">
//         {/* Heading */}
//         <h2 className="text-4xl font-bold text-secondary mb-4">📍 Our Location</h2>
//         <p className="text-gray-700 mb-6">
//           Visit <span className="text-primary font-semibold">PrimeFit Sports Club</span> at the renowned Shaheed Suhrawardi Indoor Stadium for the best court-based sports experience.
//         </p>

//         {/* Address Info */}
//         <div className="bg-white shadow-md p-6 rounded-lg mb-6">
//           <h3 className="text-xl font-semibold mb-2 text-primary">📫 Address</h3>
//           <p className="text-gray-700 leading-relaxed">
//             Shaheed Suhrawardi Indoor Stadium<br />
//             Mirpur Road, Dhaka 1207<br />
//             Bangladesh
//           </p>
//         </div>

//         {/* Interactive Map with Marker */}
//         <div className="rounded-lg max-w-4xl mx-auto overflow-hidden shadow-md">
//           <MapContainer
//             center={position}
//             zoom={6}
//             scrollWheelZoom={false}
//             style={{ height: '400px', width: '100%' }}
            
//           >
//             <TileLayer
//               attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
//             <Marker position={position}>
//               <Popup>
//                 📍 Shaheed Suhrawardi Indoor Stadium<br />
//                 Home of PrimeFit Sports Club
//               </Popup>
//             </Marker>
//           </MapContainer>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default LocationMap;


import { FaMapMarkerAlt, FaBus, FaParking } from "react-icons/fa";

const LocationMap = () => {
  return (
    <section className="bg-gray-200 py-6 md:py-10 px-4 md:px-8 lg:px-20">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-secondary mb-4">Visit Our Location</h2>
        <p className="text-gray-600">
          Conveniently located in the heart of the city with easy access and ample parking
        </p>
      </div>

      {/* Grid Layout */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        
        {/* Left - Directions */}
        <div className="bg-white shadow-lg rounded-2xl p-6 text-left">
          <h3 className="text-xl text-secondary font-semibold mb-6">Get Directions</h3>

          {/* Address */}
          <div className="flex items-start gap-3 mb-4">
            <FaMapMarkerAlt className="text-primary text-xl mt-1" />
            <div>
              <p className="font-medium text-secondary">Address</p>
              <p className="text-gray-600">
                123 Sports Avenue<br />
                Athletic District, City 12345<br />
                United States
              </p>
            </div>
          </div>

          {/* Parking */}
          <div className="flex items-start gap-3 mb-4">
            <FaParking className="text-primary text-xl mt-1" />
            <div>
              <p className="font-medium text-secondary">Parking</p>
              <p className="text-gray-600">
                Free parking for all members<br />
                500+ parking spaces available
              </p>
            </div>
          </div>

          {/* Public Transport */}
          <div className="flex items-start gap-3 mb-6">
            <FaBus className="text-primary text-xl mt-1" />
            <div>
              <p className="font-medium text-secondary">Public Transport</p>
              <p className="text-gray-600">
                Metro Station: Sports Center (Line 2)<br />
                Bus stops: 15, 22, 45
              </p>
            </div>
          </div>

          {/* Button */}
          <a
            href="https://www.google.com/maps"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition"
          >
            Open in Google Maps
          </a>
        </div>

        {/* Right - Google Map Embed */}
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <iframe
            title="Club Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.993165918354!2d-74.007138!3d40.713054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ3LjAiTiA3NMKwMDAnMjYuMCJX!5e0!3m2!1sen!2sus!4v1673467890123!5m2!1sen!2sus"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;
