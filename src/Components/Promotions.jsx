import React from 'react';

const coupons = [
  { code: 'FIT5', discount: '5%', desc: 'Get 5% off on your first court booking!' },
  { code: 'PRIME10', discount: '10%', desc: '10% discount for members on all sessions' },
  { code: 'SUMMER15', discount: '15%', desc: 'Enjoy summer with 15% off on squash courts' },
];

const Promotions = () => {
  return (
    <section className="bg-gradient-to-br from-blue-100 to-blue-200 py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-primary">🎉 Hot Promotions</h2>
        <p className="text-gray-700 mb-10">
          Use these exclusive <span className="font-semibold text-primary">coupon codes</span> at checkout to save on your next booking at PrimeFit Sports Club!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {coupons.map((coupon, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-primary hover:scale-[1.02] transition-transform"
            >
              <h3 className="text-xl font-bold text-primary mb-2">Code: {coupon.code}</h3>
              <p className="text-lg font-semibold text-gray-800 mb-1">Discount: {coupon.discount}</p>
              <p className="text-gray-600">{coupon.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Promotions;
