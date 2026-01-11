import { Menu, LogOut, User as UserIcon } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-gray-700 hover:text-blue-600 transition-colors ${
      isActive ? "text-blue-600 font-semibold" : ""
    }`;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">

          {/* Logo */}
          <div className="flex items-center gap-4">
            <img 
              src="/Ag-logo.svg" 
              alt="AeroGuide Logo" 
              className="h-16 w-16 md:h-20 md:w-20"
            />
            <div>
              <h1 className="text-[#1076D1] text-xl md:text-2xl font-bold">AeroGuide</h1>
              <p className="text-gray-500 text-sm">
                Your Aviation Journey Starts Here
              </p>
            </div>
          </div>

          {/* Mobile menu icon */}
          <button className="md:hidden">
            <Menu className="w-6 h-6 text-gray-600" />
          </button>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>

            {/* <NavLink to="/schools" className={linkClass}>
              Schools
            </NavLink> */}

            {/* About section is currently disabled */}
            {/* <NavLink to="/about" className={linkClass}>
              About
            </NavLink> */}

            <NavLink to="/contact" className={linkClass}>
              Contact
            </NavLink>

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {user?.picture ? (
                    <img 
                      src={user.picture} 
                      alt={user.name} 
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <UserIcon className="w-5 h-5 text-blue-600" />
                    </div>
                  )}
                  <span className="text-gray-700 font-medium">{user?.name?.split(' ')[0]}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sign In
              </NavLink>
            )}
          </nav>

        </div>
      </div>
    </header>
  );
}

export default Navbar;
