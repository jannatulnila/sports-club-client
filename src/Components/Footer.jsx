import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import PrimeFit from "./PrimeFit";

const Footer = () => {
  return (
    <footer className="footer bg-white footer-horizontal footer-center text-secondary p-10">
      <aside>
          <PrimeFit />
         <div >
          <h3 className="font-semibold text-lg mb-2">Contact Us</h3>
          <p>Email: info@primefitsports.com</p>
          <p>Phone: +880 1234-567890</p>
          <p>Location: Mirpur Road, Dhaka 1207, Bangladesh</p>
        </div>
      </aside>
      <nav>
        <div className="grid grid-flow-col gap-4">

          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-500">
            <FaFacebookF size={20}/>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-500">
            <FaInstagram size={20}/>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-sky-400">
            <FaTwitter size={20}/>
          </a>
        </div>
       <div className="text-center text-gray-400 mt-8 text-sm">
         © {new Date().getFullYear()} PrimeFit Sports Club. All rights reserved.
      </div>
      </nav>
    </footer>
  );
};

export default Footer;
