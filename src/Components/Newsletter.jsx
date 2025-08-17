const Newsletter = () => {
  return (
    <section className=" bg-gray-900 py-16 text-center text-white">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Connected</h2>
        <p className="text-lg mb-8 text-gray-300">
          Subscribe to our newsletter for the latest updates on events, training tips, 
          member spotlights, and exclusive offers.
        </p>

        {/* Input + Button */}
        <form className="flex flex-col md:flex-row items-center justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full md:w-2/3 px-4 py-3 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md font-semibold transition"
          >
            Subscribe Now
          </button>
        </form>

        {/* Privacy Note */}
        <p className="text-sm text-gray-400 mt-6">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
