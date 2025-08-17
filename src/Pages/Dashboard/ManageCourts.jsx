import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageCourts = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [editingCourt, setEditingCourt] = useState(null);
    const [formData, setFormData] = useState({ type: '', image: '', pricePerSession: '' });

    const { data: courts = [] } = useQuery({
        queryKey: ['courts'],
        queryFn: async () => (await axiosSecure.get('/courts')).data
    });

    const addCourt = useMutation({
        mutationFn: async () => {
            await axiosSecure.post('/courts', formData);
        },
        onSuccess: () => {
            Swal.fire('Court added!');
            queryClient.invalidateQueries(['courts']);
            setFormData({ type: '', image: '', pricePerSession: '' });
        }
    });

    const updateCourt = useMutation({
        mutationFn: async () => {
            await axiosSecure.patch(`/courts/${editingCourt._id}`, formData);
        },
        onSuccess: () => {
            Swal.fire('Court updated!');
            queryClient.invalidateQueries(['courts']);
            setEditingCourt(null);
        }
    });

    const deleteCourt = useMutation({
        mutationFn: async (id) => {
            await axiosSecure.delete(`/courts/${id}`);
        },
        onSuccess: () => {
            Swal.fire('Court deleted!');
            queryClient.invalidateQueries(['courts']);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        editingCourt ? updateCourt.mutate() : addCourt.mutate();
    };

    return (
        <div className='p-4'>
            <h2 className="text-2xl font-bold text-secondary text-center mb-4">Manage Courts</h2>

            {/* Add/Edit Court Form */}
            <form onSubmit={handleSubmit} className="space-y-4 max-w-5xl bg-white p-4 shadow rounded">
                <input
                    className="input input-bordered w-full"
                    placeholder="Court Type"
                    value={formData.type}
                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                    required
                />
                <input
                    className="input input-bordered w-full"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                    required
                />
                <input
                    type="number"
                    className="input input-bordered w-full"
                    placeholder="Price per Session"
                    value={formData.price}
                    onChange={e => setFormData({ ...formData, pricePerSession: e.target.value })}
                    required
                />
                <button className="btn btn-primary w-full" type="submit">
                    {editingCourt ? 'Update Court' : 'Add Court'}
                </button>
            </form>

            {/* Court List */}
            <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courts.map(court => (
                    <div key={court._id} className="card shadow-md p-4 bg-gray-300">
                        <img src={court.image} alt={court.type} className="w-full h-40 object-cover rounded mb-2" />
                        <h3 className="font-bold text-black">{court.type}</h3>
                        <p className='text-black'>Price: ${court.pricePerSession}</p>
                        <div className="mt-2 flex gap-2">
                            <button
                                className="btn btn-sm btn-accent"
                                onClick={() => {
                                    setEditingCourt(court);
                                    setFormData({
                                        type: court.type, image: court.image, pricePerSession: court.pricePerSession
                                    });
                                }}
                            >
                                Edit
                            </button>
                            <button
                                className="btn btn-sm btn-error"
                                onClick={() => deleteCourt.mutate(court._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageCourts;
