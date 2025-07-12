import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PendingBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['pendingBookings', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?email=${user.email}&status=pending`);
      return res.data;
    },
  });

  const cancelBookingMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/bookings/${id}`);
    },
    onSuccess: () => {
      Swal.fire('Cancelled', 'Booking has been cancelled.', 'success');
      queryClient.invalidateQueries(['pendingBookings', user.email]);
    },
    onError: () => {
      Swal.fire('Error', 'Failed to cancel booking.', 'error');
    },
  });

  const handleCancel = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to cancel this booking.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
    }).then((result) => {
      if (result.isConfirmed) {
        cancelBookingMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <p>Loading bookings...</p>;

  if (bookings.length === 0) {
    return <p className="text-center mt-6">You have no pending bookings.</p>;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {bookings.map((booking) => (
        <div key={booking._id} className="card bg-base-100 shadow-xl">
          <figure>
            <img src={booking.image} alt={booking.courtName} className="h-48 w-full object-cover" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{booking.courtName}</h2>
            <p><strong>Type:</strong> {booking.courtType}</p>
            <p><strong>Date:</strong> {booking.date}</p>
            <p><strong>Slots:</strong> {booking.slots.join(', ')}</p>
            <p><strong>Total Price:</strong> ${booking.price}</p>
            <button onClick={() => handleCancel(booking._id)} className="btn btn-error mt-2">
              Cancel Booking
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PendingBookings;
