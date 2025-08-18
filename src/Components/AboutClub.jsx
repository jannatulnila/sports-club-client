import { FaHistory } from 'react-icons/fa';
import { BsBullseye } from 'react-icons/bs';
import { AiOutlineEye } from 'react-icons/ai';
import aboutimg1 from "../assets/aboutimg1.jpg"
import aboutimg2 from "../assets/aboutimg2.jpg"
import aboutimg3 from "../assets/aboutimg3.jpg"
import aboutimg4 from "../assets/aboutimg4.jpg"
import { LocationEdit } from 'lucide-react';

const AboutClub = () => (
  <section className="bg-gray-200 py-6 md:py-10 px-4 md:px-8 lg:px-20">
    <h2 className="text-3xl text-secondary text-center font-bold mb-8">About Our Club</h2>
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      {/* Left Content */}
      <div>
        {/* History */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2 text-secondary">
            <FaHistory className="text-2xl" />
            <h3 className="text-xl font-semibold">Our History</h3>
          </div>
          <p className="text-gray-700">
            Established in 2010, PrimeFit began with just a few courts and a small team of passionate coaches. Over the years, we've grown into one of the city's most respected sports clubs, serving over 1,000 members.
          </p>
        </div>

        {/* Mission */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2 text-secondary">
            <BsBullseye className="text-2xl" />
            <h3 className="text-xl font-semibold">Our Mission</h3>
          </div>
          <p className="text-gray-700">
            To provide exceptional sports facilities and programs that inspire athletes of all ages 
            and skill levels to achieve their personal best while fostering a sense of community, 
            sportsmanship, and lifelong wellness.
          </p>
        </div>

        {/* Vision */}
        <div>
          <div className="flex items-center gap-2 mb-2 text-secondary">
            <AiOutlineEye className="text-2xl" />
            <h3 className="text-xl font-semibold">Our Vision</h3>
          </div>
          <p className="text-gray-700">
            To be the premier sports destination that cultivates excellence, promotes healthy living, 
            and builds lasting connections through the power of sport and community engagement.
          </p>
        </div>
      </div>

      {/* Right Images */}
      <div className="grid grid-cols-2 gap-6">
        <img
          src={aboutimg1}
          alt="Trophies"
          className="rounded-lg shadow-md"
        />
        <img
          src={aboutimg2}
          alt="Team"
          className="rounded-lg shadow-md"
        />
        <img
          src={aboutimg3}
          alt="Coaching"
          className="rounded-lg shadow-md"
        />
        <img
          src={aboutimg4}
          alt="Gym"
          className="rounded-lg shadow-md"
        />
      </div>
    </div>
  </section>
);

export default AboutClub;
