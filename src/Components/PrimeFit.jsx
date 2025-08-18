
import logo from "../assets/PrimeFit__Logo.png"
import { Link } from 'react-router';

const PrimeFit = () => {
     return (
        <Link to="/">
            <div className='flex items-center'>
                <img className='mb-2 w-10 h-10' src={logo} alt="count-mate-logo" />
                <p className='text-xl text-secondary font-bold'>PrimeFit</p>
            </div>
        </Link>
    );
};

export default PrimeFit;