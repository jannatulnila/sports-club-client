import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { BsStars } from 'react-icons/bs';
import { RxCopy } from "react-icons/rx";

const PromoCoupons = () => {
  const axiosSecure = useAxiosSecure();

  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ['coupons'],
    queryFn: async () => {
      const res = await axiosSecure.get('/coupons');
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex bg-gray-200 justify-center items-center min-h-[200px]">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    // Optional: toast notification
  };

  // ✅ Filter active coupons (expireDate > now)
  const activeCoupons = coupons.filter(
    (coupon) => new Date(coupon.expireDate) > new Date()
  );

  return (
    <section className="py-10 bg-gray-200 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-20">
        <div className="text-center mb-2">
          <h2 className="text-xl md:text-3xl font-bold text-[var(--color-secondary)] mb-2">
             Exclusive Promo Codes
          </h2>
          <p className="text-xl mb-4 text-gray-600">
            Save big on your next booking with these amazing deals!
          </p>
        </div>

        <div className="grid gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {activeCoupons.map((coupon) => (
            <div
              key={coupon._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden relative"
            >
              <div className="h-3 bg-[var(--color-primary)]"></div>
              
              <div className="p-6 relative">
                <div className="absolute -top-2 right-1">
                  <div className="bg-[var(--color-primary)] text-white font-bold text-lg px-4 py-2 rounded-full shadow-lg">
                    {coupon.discountPercent}% OFF
                  </div>
                </div>

                <div className="flex justify-center mb-2">
                  <div className="w-12 h-12 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center shadow-inner">
                    <BsStars size={25} className="text-[var(--color-primary)]" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-center text-gray-800 mb-2">
                  Special Offer
                </h3>

                <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-dashed border-[var(--color-primary)] rounded-xl p-4 mb-2 relative">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-2 font-medium">PROMO CODE</p>
                      <p className="text-xl font-bold text-[var(--color-primary)] font-mono tracking-widest">
                        {coupon.code}
                      </p>
                    </div>
                    <button
                      className="bg-white border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-colors duration-200 rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:shadow-lg"
                      onClick={() => copyToClipboard(coupon.code)}
                      title="Copy code"
                    >
                      <RxCopy size={20} />
                    </button>
                  </div>

                  <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gray-50 rounded-full border-2 border-[var(--color-primary)]/30"></div>
                  <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gray-50 rounded-full border-2 border-[var(--color-primary)]/30"></div>
                </div>

                <div className="text-center mb-2">
                  <p className="text-lg text-gray-700 mb-1">
                    Get <span className="text-[var(--color-primary)] font-bold text-2xl">{coupon.discountPercent}% OFF</span>
                  </p>
                  <p className="text-gray-500">on your next booking!</p>
                </div>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Valid until: {new Date(coupon.expireDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {activeCoupons.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-2 shadow-inner">
              <span className="text-4xl">🎫</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-3">
              No Active Coupons
            </h3>
            <p className="text-gray-600 text-lg">
              Check back later for exciting deals and offers!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PromoCoupons;
