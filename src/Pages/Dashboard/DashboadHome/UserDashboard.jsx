import React from 'react';
import { FiUser, FiBell } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';


const UserDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ['user-announcements'],
    queryFn: async () => {
      const res = await axiosSecure.get('/announcements');
      return res.data;
    }
  });

  const registrationDate = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString()
    : 'N/A';

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-primary">
        <FiUser className="text-xl" /> Welcome, {user?.displayName || 'User'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Info Card */}
        <div className="bg-black rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-2">User Info</h3>
          <p><strong>Name:</strong> {user?.displayName || 'N/A'}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Registered on:</strong> {registrationDate}</p>
        </div>

        {/* Announcements */}
        <div className="bg-black rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-1">
            <FiBell /> Club Announcements
          </h3>
          {isLoading ? (
            <p>Loading announcements...</p>
          ) : announcements.length === 0 ? (
            <p>No announcements yet.</p>
          ) : (
            <ul className="list-disc ml-5 space-y-1">
              {announcements.slice(0, 5).map((announcement) => (
                <li key={announcement._id}>{announcement.message}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
