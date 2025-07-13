import { useQuery, useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useState } from 'react';

const ManageCourts = () => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset, setValue } = useForm();
  const [editCourtId, setEditCourtId] = useState(null);

  const { data: courts = [], refetch } = useQuery({
    queryKey: ['courts'],
    queryFn: async () => {
      const res = await axiosSecure.get('/courts');
      return res.data;
    }
  });

  const addCourt = useMutation({
    mutationFn: (newCourt) => axiosSecure.post('/courts', newCourt),
    onSuccess: () => {
      Swal.fire('Success', 'Court added successfully!', 'success');
      refetch();
      reset();
    }
  });

  const updateCourt = useMutation({
    mutationFn: ({ id, data }) => axiosSecure.patch(`/courts/${id}`, data),
    onSuccess: () => {
      Swal.fire('Updated', 'Court updated successfully!', 'success');
      refetch();
      reset();
      setEditCourtId(null);
    }
  });

  const deleteCourt = (id) => {
    Swal.fire({
      title: 'Delete this court?',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      icon: 'warning'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/courts/${id}`).then(() => {
          Swal.fire('Deleted', 'Court deleted successfully.', 'success');
          refetch();
        });
      }
    });
  };

  const onSubmit = (data) => {
    data.price = parseFloat(data.price);
    data.slots = data.slots.split(',').map(slot => slot.trim());
    if (editCourtId) {
      updateCourt.mutate({ id: editCourtId, data });
    } else {
      addCourt.mutate(data);
    }
  };

  const handleEdit = (court) => {
    setEditCourtId(court._id);
    setValue('courtName', court.courtName);
    setValue('courtType', court.courtType);
    setValue('image', court.image);
    setValue('price', court.price);
    setValue('slots', court.slots.join(', '));
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Manage Courts</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-base-200 p-4 rounded-xl">
        <input {...register('courtName')} placeholder="Court Name" className="input input-bordered w-full" required />
        <input {...register('courtType')} placeholder="Court Type" className="input input-bordered w-full" required />
        <input {...register('image')} placeholder="Image URL" className="input input-bordered w-full" required />
        <input type="number" {...register('price')} placeholder="Price" className="input input-bordered w-full" required />
        <input {...register('slots')} placeholder="Slots (comma separated)" className="input input-bordered w-full" required />

        <button className="btn btn-primary w-full" type="submit">
          {editCourtId ? 'Update Court' : 'Add Court'}
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Price</th>
              <th>Slots</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courts.map(court => (
              <tr key={court._id}>
                <td>{court.courtName}</td>
                <td>{court.courtType}</td>
                <td>${court.price}</td>
                <td>{court.slots.join(', ')}</td>
                <td className="space-x-2">
                  <button className="btn btn-xs btn-warning" onClick={() => handleEdit(court)}>Edit</button>
                  <button className="btn btn-xs btn-error" onClick={() => deleteCourt(court._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCourts;
