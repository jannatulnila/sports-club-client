// import React from 'react';

// const LocationMap = () => {
//   return (
//     <section className="bg-white py-12 px-4 md:px-8 lg:px-16">
//       <div className="max-w-5xl mx-auto text-center">
//         {/* Section Heading */}
//         <h2 className="text-4xl font-bold text-secondary mb-4">📍 Our Location</h2>
//         <p className="text-gray-700 mb-6">
//           Visit <span className="text-primary font-semibold">PrimeFit Sports Club</span> at our centrally located sports facility for all your court-based fitness needs.
//         </p>

//         {/* Address Block */}
//         <div className="bg-white shadow-md p-6 rounded-lg mb-6">
//           <h3 className="text-xl font-semibold mb-2 text-primary">📫 Address</h3>
//           <p className="text-gray-700 leading-relaxed">
//             Shaheed Suhrawardi Indoor Stadium<br />
//             Mirpur Road, Dhaka 1207<br />
//             Bangladesh
//           </p>
//         </div>

//         {/* Google Map */}
//         <div className="rounded-lg overflow-hidden shadow-md mb-4">
//           <iframe
//             title="Shaheed Suhrawardi Indoor Stadium Map"
//             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.163446382846!2d90.36501921498142!3d23.76789508459481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7473b0271a7%3A0x9f3b4eaf3e92f7e5!2sShaheed%20Suhrawardy%20Indoor%20Stadium!5e0!3m2!1sen!2sbd!4v1688550000000!5m2!1sen!2sbd"
//             width="100%"
//             height="400"
//             style={{ border: 0 }}
//             allowFullScreen=""
//             loading="lazy"
//             referrerPolicy="no-referrer-when-downgrade"
//           ></iframe>
//         </div>

//         {/* Optional Get Directions Button */}
//         <a
//           href="https://www.google.com/maps/dir/?api=1&destination=23.767895,90.365019"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="inline-block bg-primary hover:bg-secondary text-white font-semibold px-6 py-3 rounded transition"
//         >
//           Get Directions on Google Maps
//         </a>
//       </div>
//     </section>
//   );
// };

// export default LocationMap;


import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default icon issues in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LocationMap = () => {
  const position = [23.767895, 90.365019]; // Shaheed Suhrawardi Indoor Stadium

  return (
    <section className="bg-white py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-5xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-secondary mb-4">📍 Our Location</h2>
        <p className="text-gray-700 mb-6">
          Visit <span className="text-primary font-semibold">PrimeFit Sports Club</span> at the renowned Shaheed Suhrawardi Indoor Stadium for the best court-based sports experience.
        </p>

        {/* Address Info */}
        <div className="bg-white shadow-md p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-2 text-primary">📫 Address</h3>
          <p className="text-gray-700 leading-relaxed">
            Shaheed Suhrawardi Indoor Stadium<br />
            Mirpur Road, Dhaka 1207<br />
            Bangladesh
          </p>
        </div>

        {/* Interactive Map with Marker */}
        <div className="rounded-lg max-w-4xl mx-auto overflow-hidden shadow-md">
          <MapContainer
            center={position}
            zoom={6}
            scrollWheelZoom={false}
            style={{ height: '400px', width: '100%' }}
            
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                📍 Shaheed Suhrawardi Indoor Stadium<br />
                Home of PrimeFit Sports Club
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;
