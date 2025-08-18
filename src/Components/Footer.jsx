


import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import PrimeFit from "./PrimeFit";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-5">
        
        {/* Brand & About */}
        <div>
          <PrimeFit />
          <p className="mt-4 text-sm leading-6">
            PrimeFit Sports Club is where passion meets performance. 
            We provide world-class training facilities, expert coaching, 
            and a community that motivates you to reach your peak potential.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/about" className="hover:text-white transition">About Us</a></li>
            <li><a href="/courts" className="hover:text-white transition">Courts</a></li>
            <li><a href="/dashboard" className="hover:text-white transition">Dashboard</a></li>
          
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact Us</h3>
          <p className="text-sm">Email: info@primefitsports.com</p>
          <p className="text-sm">Phone: +880 1234-567890</p>
          <p className="text-sm mb-4">
            123 Sports Avenue, Athletic District, <br /> City 12345, United States
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-2">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-500">
              <FaFacebookF size={18} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-500">
              <FaInstagram size={18} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-sky-400">
              <FaTwitter size={18} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-red-500">
              <FaYoutube size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} PrimeFit Sports Club. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
