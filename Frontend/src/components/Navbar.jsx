import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
          🍬 <span className="hidden sm:inline">Sweet Shop</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-600 hover:text-primary transition font-medium">
            Home
          </Link>

          {user ? (
            <>
              {/* Show Admin Dashboard link only if user is admin */}
              {user.role === 'admin' && (
                <Link to="/admin" className="text-secondary font-medium hover:text-purple-700">
                  Dashboard
                </Link>
              )}
              
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500 hidden md:block">
                  Hi, {user.username || 'User'}
                </span>
                <button
                  onClick={logout}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition text-sm font-semibold"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex gap-3">
              <Link
                to="/login"
                className="text-primary font-semibold px-4 py-2 hover:bg-pink-50 rounded-lg transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition shadow-sm"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;