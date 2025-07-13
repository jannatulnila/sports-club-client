import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSecure';


const PromoCoupons = () => {
  const axiosSecure = useAxiosSecure();

  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ['coupons'],
    queryFn: async () => {
      const res = await axiosSecure.get('/coupons');
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center">Loading coupons...</div>;

  return (
    <section className="py-10 bg-gradient-to-r from-rose-100 via-pink-200 to-rose-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-primary mb-8">🎉 Exclusive Promo Codes</h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {coupons.map((coupon) => (
            <div
              key={coupon._id}
              className="bg-white shadow-xl rounded-2xl p-6 border-l-4 border-pink-500 hover:scale-105 transition"
            >
              <h3 className="text-xl font-semibold text-pink-700 mb-2">
                Use Code: <span className="bg-pink-100 px-2 py-1 rounded">{coupon.code}</span>
              </h3>
              <p className="text-lg font-medium text-gray-700">
                Get <span className="text-pink-600 font-bold">{coupon.discountPercent}% OFF</span> your booking!
              </p>
              <p className="text-sm mt-2 text-gray-500">
                Expires on: {new Date(coupon.expireDate).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoCoupons;
