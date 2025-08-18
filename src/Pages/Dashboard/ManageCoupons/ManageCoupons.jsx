import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageCoupons = () => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset, setValue } = useForm();
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const { data: coupons = [], refetch } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coupons");
      return res.data;
    },
  });

  const addMutation = useMutation({
    mutationFn: async (data) => {
      return editingCoupon
        ? axiosSecure.patch(`/coupons/${editingCoupon._id}`, data)
        : axiosSecure.post("/coupons", data);
    },
    onSuccess: () => {
      Swal.fire("Success", editingCoupon ? "Coupon Updated" : "Coupon Added", "success");
      refetch();
      reset();
      setEditingCoupon(null);
      setShowForm(false);
    },
    onError: () => {
      Swal.fire("Error", "Failed to save coupon", "error");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => await axiosSecure.delete(`/coupons/${id}`),
    onSuccess: () => {
      Swal.fire("Deleted", "Coupon has been deleted", "success");
      refetch();
    },
    onError: () => {
      Swal.fire("Error", "Failed to delete", "error");
    },
  });

  const onSubmit = (data) => {
    const utcDate = new Date(data.expireDate).toISOString();
    addMutation.mutate({ ...data, expireDate: utcDate });
  };

  const handleEdit = (coupon) => {
    setEditingCoupon(coupon);
    setValue("code", coupon.code);
    setValue("discountPercent", coupon.discountPercent);
    setValue("expireDate", coupon.expireDate.split("T")[0]);
    setShowForm(true);
  };

  // Calculate summary stats
  const totalCoupons = coupons.length;
  const activeCoupons = coupons.filter(
    (c) => new Date(c.expireDate) > new Date()
  ).length;
  const totalUsage = coupons.reduce((sum, c) => sum + (c.usage || 0), 0);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-secondary mb-4">Manage Coupons</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg shadow">
          <p className="text-lg font-semibold">Total Coupons</p>
          <p className="text-3xl">{totalCoupons}</p>
        </div>
        <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg shadow">
          <p className="text-lg font-semibold">Active Coupons</p>
          <p className="text-3xl">{activeCoupons}</p>
        </div>
        <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg shadow">
          <p className="text-lg font-semibold">Total Usage</p>
          <p className="text-3xl">{totalUsage}</p>
        </div>
      </div>

      {/* Add New Coupon Button */}
      <button
        onClick={() => {
          reset();
          setEditingCoupon(null);
          setShowForm(true);
        }}
        className="btn btn-primary mb-6"
      >
        + Add New Coupon
      </button>

      {/* Add/Edit Form */}
      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mb-6 bg-base-200 p-4 rounded-lg">
          <input {...register("code", { required: true })} placeholder="Coupon Code" className="input input-bordered w-full" />
          <input type="number" {...register("discountPercent", { required: true })} placeholder="Discount %" className="input input-bordered w-full" />
          <input type="date" {...register("expireDate", { required: true })} className="input input-bordered w-full" />
          <button className="btn btn-success">{editingCoupon ? "Update" : "Add"} Coupon</button>
        </form>
      )}

      {/* Coupons Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coupons.map((coupon) => {
          const isActive = new Date(coupon.expireDate) > new Date();
          return (
            <div key={coupon._id} className="border rounded-lg p-4 shadow bg-white dark:bg-gray-800">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg">{coupon.code}</h3>
                <span className={`px-2 py-1 text-xs rounded ${isActive ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                  {isActive ? "active" : "expired"}
                </span>
              </div>
              <p className="text-sm">Discount: {coupon.discountPercent}%</p>
              <p className="text-sm">Expired: {new Date(coupon.expireDate).toLocaleDateString()}</p>
              <div className="flex gap-2 mt-4">
                <button onClick={() => handleEdit(coupon)} className="btn btn-sm btn-info">Edit</button>
                <button onClick={() => deleteMutation.mutate(coupon._id)} className="btn btn-sm btn-error">Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ManageCoupons;
