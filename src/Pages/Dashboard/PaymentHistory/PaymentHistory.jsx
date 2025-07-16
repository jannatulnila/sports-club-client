import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useState } from "react";
import { FaThList, FaThLarge } from "react-icons/fa";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ['payments', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    }
  });

  if (isLoading) {
    return <p className="text-center">Loading payment history...</p>;
  }

  const toggleView = () => {
    setViewMode(prev => (prev === 'table' ? 'card' : 'table'));
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-secondary text-center">My Payment History</h2>
        <button
          onClick={toggleView}
          className="btn btn-outline bg-black btn-sm"
        >
          {viewMode === 'table' ? (
            <>
              <FaThLarge className="mr-2" /> Card View
            </>
          ) : (
            <>
              <FaThList className="mr-2" /> Table View
            </>
          )}
        </button>
      </div>

      {viewMode === 'table' ? (
        <div className="overflow-x-auto rounded shadow">
          <table className="table bg-black w-full">
            <thead>
              <tr className="bg-base-200 text-sm">
                <th>#</th>
                <th>Transaction ID</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Coupon</th>
                <th>Discount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p, index) => (
                <tr key={p._id} className="hover">
                  <td>{index + 1}</td>
                  <td className="text-xs break-all">{p.transactionId}</td>
                  <td>${p.price.toFixed(2)}</td>
                  <td>{p.paymentMethod?.[0] || "Card"}</td>
                  <td>{p.couponCode || "-"}</td>
                  <td>
                    {p.discountAmount
                      ? `$${parseFloat(p.discountAmount).toFixed(2)}`
                      : '-'}
                  </td>
                  <td>{new Date(p.paid_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {payments.map((p, index) => (
            <div key={p._id} className="bg-black text-center shadow p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-lg text-primary mb-2">Payment #{index + 1}</h3>
              <p><span className="font-medium">Transaction ID:</span> <span className="text-sm break-all">{p.transactionId}</span></p>
              <p><span className="font-medium">Amount:</span> ${p.price.toFixed(2)}</p>
              <p><span className="font-medium">Method:</span> {p.paymentMethod?.[0] || "Card"}</p>
              <p><span className="font-medium">Coupon:</span> {p.couponCode || '-'}</p>
              <p><span className="font-medium">Discount:</span> {p.discountAmount ? `$${parseFloat(p.discountAmount).toFixed(2)}` : '-'}</p>
              <p><span className="font-medium">Date:</span> {new Date(p.paid_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
