import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Marquee from "react-fast-marquee";


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
    <div className="flex items-center gap-5 bg-base-200 p-3">
        <h1 className="text-base-100 bg-secondary px-3 py-2 ">Announcements</h1>
        <Marquee className="flex gap-2" pauseOnHover={true}>
             {activeAnnouncements.map((a) => (
        <div 
          key={a._id} 
          className="bg-base-200 flex gap-1 p-2 rounded-lg shadow hover:shadow-md transition-all"
        >
          <h1 className="text-gray-300 mt-1 font-bold text-xl">{a.title}</h1>
          <h1 className="text-gray-300 mt-1 font-bold text-xl">{a.message}</h1>
        </div>
      ))}
        </Marquee>
    </div>
  );
};

export default Announcements;
