import { Link } from "react-router";
import { FaLock } from "react-icons/fa";

const Forbidden = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-100 via-red-200 to-red-100 px-4 text-center">
            <FaLock className="text-red-500 text-6xl mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-2">403 - Forbidden</h1>
            <p className="text-gray-700 text-lg md:text-xl mb-6">
                Sorry, you don't have permission to access this page.
            </p>
            <Link to="/" className="btn btn-outline btn-error">
                Back to Home
            </Link>
        </div>
    );
};

export default Forbidden;
