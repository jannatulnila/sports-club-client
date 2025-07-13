import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()
    const { id } = useParams();
    const navigate = useNavigate();



    const { isPanding, data: bookingInfo = {} } = useQuery({
        queryKey: ['parcels', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings/${id}`);
            return res.data
        }
    })

    if (isPanding) {
        return <span className="loading loading-spinner text-success"></span>
    }

    const price = bookingInfo.price;
    const priceInCents = price * 100;



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (bookingInfo.payment_status === 'paid') {
            return Swal.fire("Already Paid", "You have already paid for this booking.", "info");
        }

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (!card) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            setError(error.message)
        }
        else {
            setError('')
            console.log('payment method', paymentMethod)

            const res = await axiosSecure.post('/create-payment-intent', {
                priceInCents,
                id
            })

            const clientSecret = res.data.clientSecret;


            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user?.displayName,
                        email: user?.email
                    },
                },
            });
            if (result.error) {
                setError(result.error.message);

            }
            else {
                if (result.paymentIntent.status === 'succeeded') {
                    console.log('paymet succeeded')
                     const transactionId = result.paymentIntent.id;

                    // create paymenthistory

                    const paymentData = {
                        id,
                        email: user.email,
                        price,
                        transactionId: transactionId,
                        paymentMethod: result.paymentIntent.payment_method_types
                    }
                    const paymentRes = await axiosSecure.post('/payments', paymentData)

                    if (paymentRes.data.insertedId) {
                        Swal.fire({
                            title: "Payment Successful!",
                            html: `Transaction ID: <b>${transactionId}</b>`,
                            icon: "success",
                            confirmButtonText: "OK",
                        })
                         navigate("/dashboard/approved-bookings");
                    }
                }
            }
        }

    }

    return (

        <div className="max-w-lg mx-auto p-6  rounded">
            <h2 className="text-2xl font-semibold text-secondary text-center mb-4">Complete Payment</h2>
            <form onSubmit={handleSubmit} className='space-y-4 bg-gray-200 p-6 rounded-2xl shadow-md w-full text-white max-w-md mx-auto'>
                <CardElement className='p-2 border rounded'></CardElement>
                <button type='submit'
                    disabled={!stripe}
                    className='btn btn-primary w-full text-black'>
                    Pay  ${price}
                </button>
                {
                    error && <p className='text-red-500'>{error}</p>
                }
            </form>
        </div>
    );
};

export default PaymentForm;