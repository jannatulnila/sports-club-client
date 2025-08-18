const Achievements = () => {
  return (
    <section className="bg-gray-900 py-6 md:py-10 px-4 md:px-8 lg:px-20 text-center text-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Achievements</h2>
        <p className="text-lg mb-12 text-blue-100">
          Numbers that speak for our excellence and community impact
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-3xl md:text-4xl font-extrabold">1,000+</h3>
            <p className="text-sm mt-2">Active Members</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-extrabold">15</h3>
            <p className="text-sm mt-2">Professional Courts</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-extrabold">50+</h3>
            <p className="text-sm mt-2">Expert Trainers</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-extrabold">35</h3>
            <p className="text-sm mt-2">Years of Excellence</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
