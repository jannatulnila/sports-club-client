// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";


// const Announcements = () => {
//   const axiosSecure = useAxiosSecure();

//   const { data: announcements = [], isLoading } = useQuery({
//     queryKey: ['public-announcements'],
//     queryFn: async () => {
//       const res = await axiosSecure.get('/announcements');
//       return res.data;
//     }
//   });

//   if (isLoading) return <p className="text-center mt-10">Loading announcements...</p>;

//   if (announcements.length === 0) {
//     return <p className="text-center text-gray-500 mt-10">No announcements yet.</p>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-4 space-y-4">
//       <h2 className="text-2xl font-bold text-center text-secondary mb-6"> Club Announcements</h2>

//       {announcements.map((a) => (
//         <div key={a._id} className="bg-base-200 p-4 rounded-lg shadow hover:shadow-md transition-all">
//           <h3 className="text-lg font-semibold text-secondary">{a.title}</h3>
//           <p className="text-gray-700 mt-1">{a.message}</p>
//           <p className="text-sm text-gray-500 mt-2">
//             Posted by {a.postedBy || 'Admin'} on {new Date(a.createdAt).toLocaleDateString()}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Announcements;


import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Announcements = () => {
  const axiosSecure = useAxiosSecure();

  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ['public-announcements'],
    queryFn: async () => {
      const res = await axiosSecure.get('/announcements');
      return res.data;
    }
  });

  if (isLoading) return <p className="text-center mt-10">Loading announcements...</p>;

  // Filter: Only keep announcements whose expireDate is today or in the future
  const today = new Date();
  const activeAnnouncements = announcements.filter(a => {
    if (!a.expireDate) return true; // Show if no expiry date
    return new Date(a.expireDate) >= today;
  });

  if (activeAnnouncements.length === 0) {
    return <p className="text-center text-gray-500 mt-10">No active announcements.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold text-center text-secondary mb-6">
        Club Announcements
      </h2>

      {activeAnnouncements.map((a) => (
        <div 
          key={a._id} 
          className="bg-base-200 p-4 rounded-lg shadow hover:shadow-md transition-all"
        >
          <h3 className="text-lg font-semibold text-secondary">{a.title}</h3>
          <p className="text-gray-700 mt-1">{a.message}</p>
          <p className="text-sm text-gray-500 mt-2">
            Posted by {a.postedBy || 'Admin'} on {new Date(a.createdAt).toLocaleDateString()}
          </p>
          {a.expireDate && (
            <p className="text-xs text-red-500 mt-1">
              Expires on {new Date(a.expireDate).toLocaleDateString()}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Announcements;
