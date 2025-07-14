import React, { useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';

const AddCourt = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [imageUploading, setImageUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    image: '', // will store uploaded image URL here
    pricePerSession: '',
    slots: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const imageFile = e.target.files[0];
    if (!imageFile) return;

    setImageUploading(true);

    const formDataImg = new FormData();
    formDataImg.append('image', imageFile);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`, {
        method: 'POST',
        body: formDataImg,
      });

      const data = await res.json();
      if (data.success) {
        setFormData(prev => ({ ...prev, image: data.data.url }));
        Swal.fire('Success', 'Image uploaded successfully!', 'success');
      } else {
        throw new Error('Image upload failed');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Image upload failed', 'error');
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      return Swal.fire('Error', 'Please upload an image first!', 'error');
    }

    const payload = {
      name: formData.name,
      type: formData.type,
      image: formData.image,
      pricePerSession: parseFloat(formData.pricePerSession),
      slots: formData.slots.split(',').map(slot => slot.trim()),
    };

    try {
      const res = await axiosSecure.post('/courts', payload);  //
      if (res.data.success) {
        Swal.fire('Success', 'Court created successfully!', 'success');
        setFormData({ name: '', type: '', image: '', pricePerSession: '', slots: '' });
      }
    } catch (error) {
      Swal.fire('Error', error.response?.data?.message || 'Something went wrong!', 'error');
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-secondary">Add New Court</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Court Name" value={formData.name} onChange={handleChange} className="input input-bordered w-full" required />

        <select name="type" value={formData.type} onChange={handleChange} className="select select-bordered w-full" required>
          <option value="">Select Court Type</option>
          <option value="Tennis">Tennis</option>
          <option value="Badminton">Badminton</option>
          <option value="Squash">Squash</option>
          <option value="Football">Football</option>
        </select>

        <input type="file" accept="image/*" onChange={handleImageUpload} className="file-input file-input-bordered w-full" required />
        {imageUploading && <p className="text-sm text-blue-500">Uploading image...</p>}
        {formData.image && <img src={formData.image} alt="Preview" className="w-32 h-20 object-cover mt-2" />}

        <input type="number" name="pricePerSession" placeholder="Price per session" value={formData.pricePerSession} onChange={handleChange} className="input input-bordered w-full" required />

        <textarea name="slots" placeholder="Available Slots (e.g., 8:00 AM, 9:00 AM)" value={formData.slots} onChange={handleChange} className="textarea textarea-bordered w-full" required></textarea>

        <button type="submit" className="btn btn-primary w-full" disabled={imageUploading}>Add Court</button>
      </form>
    </div>
  );
};

export default AddCourt;
