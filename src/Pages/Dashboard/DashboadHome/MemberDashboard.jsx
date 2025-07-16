import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';


const MemberDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['member-bookings'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/member-confirmed`);
      return res.data;
    },
  });

  const totalBookings = bookings.length;
  const pending = bookings.filter(b => b.status === 'pending').length;
  const paid = bookings.filter(b => b.payment_status === 'paid').length;

  return (
    <div className="p-6 bg-white min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-primary">Welcome, {user?.displayName || 'Member'}!</h2>
      <p className="text-gray-600 mb-6">Email: {user?.email}</p>

      {isLoading ? (
        <p>Loading bookings...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg shadow">
            <h3 className="text-xl text-secondary font-semibold">Total Bookings</h3>
            <p className="text-3xl text-secondary mt-2 ">{totalBookings}</p>
          </div>

          <div className="p-6 rounded-lg shadow">
            <h3 className="text-xl text-secondary font-semibold">Pending</h3>
            <p className="text-3xl text-secondary mt-2 ">{pending}</p>
          </div>

          <div className=" p-6 rounded-lg shadow">
            <h3 className="text-xl text-secondary font-semibold">Paid</h3>
            <p className="text-3xl text-secondary mt-2">{paid}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberDashboard;
