import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";


const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

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

    return (
        <div className="overflow-x-auto  p-4 rounded shadow max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-secondary mb-4 text-center">My Payment History</h2>
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
    );
};

export default PaymentHistory;
