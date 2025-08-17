
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User, Store, Users, Settings, Menu, X } from 'lucide-react';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    
    switch (user.role) {
      case 'admin':
        return '/admin/dashboard';
      case 'user':
        return '/user/dashboard';
      case 'store_owner':
        return '/store-owner/dashboard';
      default:
        return '/login';
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-blue-600 shadow-lg">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link 
              to={getDashboardLink()} 
              className="text-white text-xl font-bold hover:text-blue-200"
            >
              <span className="hidden sm:inline">Store Rating System</span>
              <span className="sm:hidden">SRS</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Navigation Links based on role */}
                {user?.role === 'admin' && (
                  <>
                    <Link 
                      to="/admin/dashboard" 
                      className="text-white hover:text-blue-200 flex items-center space-x-1"
                    >
                      <Settings size={16} />
                      <span>Dashboard</span>
                    </Link>
                    <Link 
                      to="/admin/users" 
                      className="text-white hover:text-blue-200 flex items-center space-x-1"
                    >
                      <Users size={16} />
                      <span>Users</span>
                    </Link>
                    <Link 
                      to="/admin/stores" 
                      className="text-white hover:text-blue-200 flex items-center space-x-1"
                    >
                      <Store size={16} />
                      <span>Stores</span>
                    </Link>
                  </>
                )}
                
                {user?.role === 'user' && (
                  <>
                    <Link 
                      to="/user/dashboard" 
                      className="text-white hover:text-blue-200 flex items-center space-x-1"
                    >
                      <Settings size={16} />
                      <span>Dashboard</span>
                    </Link>
                    <Link 
                      to="/user/stores" 
                      className="text-white hover:text-blue-200 flex items-center space-x-1"
                    >
                      <Store size={16} />
                      <span>Stores</span>
                    </Link>
                    <Link 
                      to="/user/profile" 
                      className="text-white hover:text-blue-200 flex items-center space-x-1"
                    >
                      <User size={16} />
                      <span>Profile</span>
                    </Link>
                  </>
                )}
                
                {user?.role === 'store_owner' && (
                  <>
                    <Link 
                      to="/store-owner/dashboard" 
                      className="text-white hover:text-blue-200 flex items-center space-x-1"
                    >
                      <Settings size={16} />
                      <span>Dashboard</span>
                    </Link>
                    <Link 
                      to="/store-owner/profile" 
                      className="text-white hover:text-blue-200 flex items-center space-x-1"
                    >
                      <User size={16} />
                      <span>Profile</span>
                    </Link>
                  </>
                )}

                {/* User Info and Logout */}
                <div className="flex items-center space-x-3 text-white">
                  <span className="text-sm hidden lg:inline">
                    Welcome, {user?.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 hover:text-blue-200 bg-blue-700 px-3 py-1 rounded"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="text-white hover:text-blue-200"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white hover:text-blue-200 p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-blue-700 border-t border-blue-500">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {isAuthenticated ? (
                <>
                  
                  <div className="text-white text-sm px-3 py-2 border-b border-blue-500">
                    Welcome, {user?.name}
                  </div>

                  {/* Navigation Links based on role */}
                  {user?.role === 'admin' && (
                    <>
                      <Link 
                        to="/admin/dashboard" 
                        className="text-white hover:bg-blue-600 flex items-center space-x-2 px-3 py-2 rounded"
                        onClick={closeMobileMenu}
                      >
                        <Settings size={16} />
                        <span>Dashboard</span>
                      </Link>
                      <Link 
                        to="/admin/users" 
                        className="text-white hover:bg-blue-600 flex items-center space-x-2 px-3 py-2 rounded"
                        onClick={closeMobileMenu}
                      >
                        <Users size={16} />
                        <span>Users</span>
                      </Link>
                      <Link 
                        to="/admin/stores" 
                        className="text-white hover:bg-blue-600 flex items-center space-x-2 px-3 py-2 rounded"
                        onClick={closeMobileMenu}
                      >
                        <Store size={16} />
                        <span>Stores</span>
                      </Link>
                    </>
                  )}
                  
                  {user?.role === 'user' && (
                    <>
                      <Link 
                        to="/user/dashboard" 
                        className="text-white hover:bg-blue-600 flex items-center space-x-2 px-3 py-2 rounded"
                        onClick={closeMobileMenu}
                      >
                        <Settings size={16} />
                        <span>Dashboard</span>
                      </Link>
                      <Link 
                        to="/user/stores" 
                        className="text-white hover:bg-blue-600 flex items-center space-x-2 px-3 py-2 rounded"
                        onClick={closeMobileMenu}
                      >
                        <Store size={16} />
                        <span>Stores</span>
                      </Link>
                      <Link 
                        to="/user/profile" 
                        className="text-white hover:bg-blue-600 flex items-center space-x-2 px-3 py-2 rounded"
                        onClick={closeMobileMenu}
                      >
                        <User size={16} />
                        <span>Profile</span>
                      </Link>
                    </>
                  )}
                  
                  {user?.role === 'store_owner' && (
                    <>
                      <Link 
                        to="/store-owner/dashboard" 
                        className="text-white hover:bg-blue-600 flex items-center space-x-2 px-3 py-2 rounded"
                        onClick={closeMobileMenu}
                      >
                        <Settings size={16} />
                        <span>Dashboard</span>
                      </Link>
                      <Link 
                        to="/store-owner/profile" 
                        className="text-white hover:bg-blue-600 flex items-center space-x-2 px-3 py-2 rounded"
                        onClick={closeMobileMenu}
                      >
                        <User size={16} />
                        <span>Profile</span>
                      </Link>
                    </>
                  )}

                  {/* Logout button */}
                  <button
                    onClick={() => {
                      handleLogout();
                      closeMobileMenu();
                    }}
                    className="w-full text-left text-white hover:bg-blue-600 flex items-center space-x-2 px-3 py-2 rounded"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="text-white hover:bg-blue-600 block px-3 py-2 rounded"
                    onClick={closeMobileMenu}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="text-white hover:bg-blue-600 block px-3 py-2 rounded"
                    onClick={closeMobileMenu}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;