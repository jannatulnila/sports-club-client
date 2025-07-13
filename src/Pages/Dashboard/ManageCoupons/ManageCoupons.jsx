import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageCoupons = () => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset, setValue } = useForm();
  const [editingCoupon, setEditingCoupon] = useState(null);

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
      const localDate = new Date(data.expireDate);
  const utcDate = localDate.toISOString(); // Converts to "2025-07-12T10:30:00.000Z"

  const formattedData = {
    ...data,
    expireDate: utcDate,
  };
    addMutation.mutate(formattedData);
  };

  const handleEdit = (coupon) => {
    setEditingCoupon(coupon);
    setValue("code", coupon.code);
    setValue("discountPercent", coupon.discountPercent);
    setValue("expireDate", coupon.expireDate);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl text-secondary text-center font-bold mb-4">{editingCoupon ? "Update Coupon" : "Add Coupon"}</h2>

      {/* Coupon Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mb-6">
        <input {...register("code", { required: true })} placeholder="Coupon Code" className="input input-bordered w-full" />
        <input
          type="number"
          {...register("discountPercent", { required: true })}
          placeholder="Discount %"
          className="input input-bordered w-full"
        />
        <input type="date" {...register("expireDate", { required: true })} className="input input-bordered w-full" />
        <button className="btn btn-primary">{editingCoupon ? "Update" : "Add"} Coupon</button>
      </form>

      {/* Coupon Table */}
      <h2 className="text-xl font-semibold mb-2 text-secondary text-center">All Coupons</h2>
      <div className="overflow-x-auto bg-black">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Code</th>
              <th>Discount %</th>
              <th>Expire Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon._id}>
                <td>{coupon.code}</td>
                <td>{coupon.discountPercent}%</td>
                <td>{coupon.expireDate}</td>
                <td className="space-x-2">
                  <button className="btn btn-sm btn-info" onClick={() => handleEdit(coupon)}>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-error" onClick={() => deleteMutation.mutate(coupon._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCoupons;
