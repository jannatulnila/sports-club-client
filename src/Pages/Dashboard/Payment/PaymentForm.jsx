import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    const [error, setError] = useState('');
    const [couponCode, setCouponCode] = useState('');
    const [discountAmount, setDiscountAmount] = useState(0);
    const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

    const { isLoading, data: bookingInfo = {} } = useQuery({
        queryKey: ['bookings', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings/${id}`);
            return res.data;
        }
    });

    if (isLoading) return <span className="loading loading-spinner text-success"></span>;

    const originalPrice = bookingInfo.price || 0;
    const discountedPrice = Math.max(0, originalPrice - discountAmount);
    const priceInCents = discountedPrice * 100;

    // Coupon apply handler
    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) return;
        setIsApplyingCoupon(true);
        try {
            const res = await axiosSecure.post('/coupons/validate', { couponCode });
            if (res.data.valid) {
                setDiscountAmount(res.data.discountAmount || 0);
                Swal.fire('Coupon Applied', `Discount of $${res.data.discountAmount} applied!`, 'success');
            } else {
                setDiscountAmount(0);
                Swal.fire('Invalid Coupon', 'The coupon code is not valid.', 'error');
            }
        } catch (err) {
            console.error(err);
            Swal.fire('Error', 'Failed to apply coupon.', 'error');
        }
        setIsApplyingCoupon(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (bookingInfo.payment_status === 'paid') {
            return Swal.fire('Already Paid', 'You have already paid for this booking.', 'info');
        }

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        const { error: cardError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (cardError) {
            setError(cardError.message);
            return;
        }
        setError('');

        const res = await axiosSecure.post('/create-payment-intent', {
            priceInCents,
            id,
        });
        const clientSecret = res.data.clientSecret;

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
                billing_details: {
                    name: user?.displayName,
                    email: user?.email,
                },
            },
        });

        if (result.error) {
            setError(result.error.message);
            return;
        }

        if (result.paymentIntent.status === 'succeeded') {
            const transactionId = result.paymentIntent.id;

            // Store payment info with coupon data
            const paymentData = {
                id,
                email: user.email,
                price: discountedPrice,
                transactionId,
                paymentMethod: result.paymentIntent.payment_method_types,
                couponCode: couponCode || null,
                discountAmount,
            };

            const paymentRes = await axiosSecure.post('/payments', paymentData);

            if (paymentRes.data.insertedId) {
                await Swal.fire({
                    title: 'Payment Successful!',
                    html: `Transaction ID: <b>${transactionId}</b>`,
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
                navigate('/dashboard/approved-bookings');
            }
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 rounded bg-gray-200">
            <h2 className="text-2xl font-semibold text-secondary text-center mb-4">Complete Payment</h2>

            {/* Coupon code */}
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Coupon Code"
                    className="input input-bordered flex-grow"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    disabled={isApplyingCoupon}
                />
                <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={isApplyingCoupon}
                >
                    {isApplyingCoupon ? 'Applying...' : 'Apply'}
                </button>
            </div>

            {/* Readonly fields */}
            <div className="space-y-3 mb-4">
                <div>
                    <label className="label font-semibold text-secondary">Email</label>
                    <input type="email" readOnly value={user.email} className="input input-bordered w-full" />
                </div>
                <div>
                    <label className="label font-semibold text-secondary">Court Type</label>
                    <input type="text" readOnly value={bookingInfo.courtType || 'N/A'} className="input input-bordered w-full" />
                </div>
                <div>
                    <label className="label font-semibold text-secondary">Slots</label>
                    <input type="text" readOnly value={bookingInfo.slots || 'N/A'} className="input input-bordered w-full" />
                </div>
                <div>
                    <label className="label font-semibold text-secondary">Date</label>
                    <input type="text" readOnly value={bookingInfo.date || 'N/A'} className="input input-bordered w-full" />
                </div>
                <div>
                    <label className="label font-semibold text-secondary">Price</label>
                    <input
                        type="text"
                        readOnly
                        value={`$${discountedPrice.toFixed(2)}${discountAmount > 0 ? ' (Discounted)' : ''}`}
                        className="input input-bordered w-full font-bold"
                    />
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="p-2 border rounded bg-white">
                    <CardElement />
                </div>

                <button type="submit" disabled={!stripe} className="btn btn-primary w-full text-black">
                    Pay ${discountedPrice.toFixed(2)}
                </button>
            </form>

            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
};

export default PaymentForm;
