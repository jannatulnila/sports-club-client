// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
// import useAuth from "../../Hooks/useAuth";
// import { useNavigate } from "react-router";
// import { useState } from "react";
// import BookingModal from "../Dashboard/BookingModal/BookingModal";


// const Courts = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();
//   const navigate = useNavigate();
//   const [selectedCourt, setSelectedCourt] = useState(null);

//   const { data: courts = [], isLoading } = useQuery({
//     queryKey: ["courts"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/courts");
//       return res.data;
//     },
//   });

//   if (isLoading) return <p>Loading...</p>;

//   const handleBookNow = (court) => {
//     if (!user) {
//       return navigate("/login");
//     }
//     setSelectedCourt(court);
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold mb-6">Available Courts</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {courts.map((court) => (
//           <div key={court._id} className="card bg-base-100 shadow-xl">
//             <figure><img src={court.image} alt={court.courtName} /></figure>
//             <div className="card-body">
//               <h2 className="card-title">{court.courtName}</h2>
//               <p>Type: {court.courtType}</p>
//               <p>Price: ${court.price}/slot</p>
//               <p>Slots: {court.availableSlots.join(", ")}</p>
//               <div className="card-actions justify-end">
//                 <button className="btn btn-primary btn-sm" onClick={() => handleBookNow(court)}>Book Now</button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {selectedCourt && (
//         <BookingModal court={selectedCourt} onClose={() => setSelectedCourt(null)} />
//       )}
//     </div>
//   );
// };

// export default Courts;


import React from 'react';

const Courts = () => {
    return (
        <div>
            
        </div>
    );
};

export default Courts;