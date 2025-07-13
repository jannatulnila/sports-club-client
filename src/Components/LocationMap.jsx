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
