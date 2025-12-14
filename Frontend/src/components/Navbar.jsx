import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, User, LayoutDashboard, Menu, X } from "lucide-react"; // Added Menu & X icons

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // State to toggle mobile menu
  const [isOpen, setIsOpen] = useState(false);

  // Close menu when navigating
  const handleLinkClick = (path) => {
    setIsOpen(false);
    if (path) navigate(path);
  };

  const handleLogout = () => {
    setIsOpen(false);
    logout();
  };

  return (
    <nav className="bg-orange-50/90 backdrop-blur-md shadow-sm border-b border-orange-100 sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 py-4">
        
        {/* TOP BAR: Logo & Toggle Button */}
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="text-2xl font-extrabold text-primary flex items-center gap-2 hover:scale-105 transition-transform"
          >
            🍬 <span className="tracking-tight">Sweet Shop</span>
          </Link>

          {/* DESKTOP MENU (Hidden on Mobile) */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-600 hover:text-primary transition font-medium">
              Home
            </Link>

            {user ? (
              <>
                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-1 text-secondary font-medium hover:text-orange-700 transition"
                  >
                    <LayoutDashboard size={18} />
                    <span>Dashboard</span>
                  </Link>
                )}

                <div className="flex items-center gap-4 pl-4 border-l border-orange-200">
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-primary">
                      <User size={18} />
                    </div>
                    <span className="text-sm font-semibold">{user.username}</span>
                  </div>
                  
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 bg-white border border-orange-100 text-gray-700 px-4 py-2 rounded-full hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all text-sm font-bold shadow-sm"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex gap-3">
                <Link
                  to="/login"
                  className="text-primary font-bold px-5 py-2 hover:bg-orange-100 rounded-full transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary text-white font-bold px-6 py-2 rounded-full hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/30 transition-all transform hover:-translate-y-0.5"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* MOBILE TOGGLE BUTTON (Visible only on small screens) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-600 hover:text-primary transition focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {isOpen && (
          <div className="md:hidden pt-4 pb-2 mt-2 border-t border-orange-100 animate-fadeIn">
            <div className="flex flex-col space-y-3">
              <button 
                onClick={() => handleLinkClick("/")}
                className="text-gray-700 hover:text-primary font-medium py-2 px-2 hover:bg-orange-50 rounded-lg text-left"
              >
                Home
              </button>

              {user ? (
                <>
                  {user.role === "admin" && (
                    <button
                      onClick={() => handleLinkClick("/admin")}
                      className="text-secondary font-medium py-2 px-2 hover:bg-orange-50 rounded-lg text-left flex items-center gap-2"
                    >
                      <LayoutDashboard size={18} />
                      Dashboard
                    </button>
                  )}
                  
                  <div className="border-t border-orange-100 my-2 pt-2">
                    <div className="flex items-center gap-2 px-2 py-2 text-gray-500">
                      <User size={18} />
                      <span className="font-semibold">{user.username}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left text-red-500 font-bold py-2 px-2 hover:bg-red-50 rounded-lg flex items-center gap-2"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-3 mt-2 border-t border-orange-100 pt-3">
                  <button
                    onClick={() => handleLinkClick("/login")}
                    className="text-center w-full text-primary font-bold px-5 py-2 hover:bg-orange-100 rounded-xl transition border border-orange-200"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleLinkClick("/register")}
                    className="text-center w-full bg-primary text-white font-bold px-6 py-2 rounded-xl hover:bg-orange-600 shadow-md"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;