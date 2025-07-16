import { FaHistory } from 'react-icons/fa';
import { BsBullseye } from 'react-icons/bs';
import { AiOutlineEye } from 'react-icons/ai';

const AboutClub = () => (
  <section className="bg-white py-12 px-4 md:px-8 lg:px-20">
    <div className="max-w-6xl mx-auto text-center itc">
      <h2 className="text-4xl text-secondary font-bold mb-6">About Our Club</h2>
      <p className="text-gray-600 mb-12">
        Welcome to <span className="font-semibold text-primary">PrimeFit Sports Club</span> — a modern and inclusive court-based fitness community
        offering tennis, squash, and badminton sessions for athletes of all levels.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        
        {/* History */}
        <div className="bg-white shadow-md p-6  rounded-lg">
          <div className="flex items-center gap-2 mb-3 text-secondary justify-center">
            <FaHistory className="text-2xl " />
            <h3 className="text-xl font-semibold">Our History</h3>
          </div>
          <p className="text-gray-700 text-center">
            Established in 2010, PrimeFit began with just some courts and a small team of passionate coaches.
            Over the years, we've grown into one of the city’s most respected sports clubs, serving 1,000+ members.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <div className="flex items-center gap-2 mb-3 text-secondary justify-center">
            <BsBullseye className="text-2xl" />
            <h3 className="text-xl font-semibold">Our Mission</h3>
          </div>
          <p className="text-gray-700 text-center">
            To promote a healthy and active lifestyle by providing a welcoming space where individuals can train,
            compete, and connect through court-based sports — all while receiving professional support and mentorship.
          </p>
        </div>

        {/* Vision */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <div className="flex items-center gap-2 mb-3 text-secondary justify-center">
            <AiOutlineEye className="text-2xl" />
            <h3 className="text-xl font-semibold">Our Vision</h3>
          </div>
          <p className="text-gray-700 text-center">
            We envision a vibrant fitness community that inspires excellence, nurtures talent, and
            fosters lifelong friendships through the spirit of sportsmanship and collaboration.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default AboutClub;

