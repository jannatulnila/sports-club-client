import React from 'react';

import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const MyProfile = () => {
    const { user } = useAuth(); // From Firebase Auth
    const axiosSecure = useAxiosSecure();

    const { data: userInfo = {}, isLoading } = useQuery({
        queryKey: ['userInfo', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        },
    });

    console.log(userInfo);
    console.log(user)
    if (isLoading) {
        return <p className="text-center mt-10">Loading profile...</p>;
    }

    return (
        <div className="my-5 max-w-xl mx-auto bg-white shadow-md rounded-xl p-6 mt-6">
            <h2 className="text-2xl font-bold mb-6 text-center text-secondary">My Profile</h2>
            <div className="flex flex-col items-center space-y-4">
                <img
                    src={userInfo.photoURL || user?.photoURL ||" N/A" }
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-2 border-primary"
                />
                <div className="text-center">
                    <p className="text-lg font-semibold text-black">Name: {userInfo.name || user?.displayName}</p>
                    <p className="text-md text-black">Email: {userInfo.email || user?.email}</p>
                    <p className="text-md text-black">
                        Registered on:{' '}
                        {userInfo.created_at
                            ? new Date(userInfo.
                                created_at).toLocaleString()
                            : 'N/A'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
