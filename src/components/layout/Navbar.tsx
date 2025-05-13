import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, User, LogOut, BookOpen, Home } from 'lucide-react';
import Button from '../ui/Button';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  
  const handleNavigation = (page: string) => {
    onNavigate(page);
    closeMenu();
  };

  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div 
              className="flex-shrink-0 flex items-center cursor-pointer"
              onClick={() => handleNavigation('home')}
            >
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">LearnHub</span>
            </div>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <div className="flex space-x-4">
              <NavLink 
                label="Home" 
                active={currentPage === 'home'} 
                onClick={() => handleNavigation('home')} 
                icon={<Home className="h-5 w-5" />}
              />
              <NavLink 
                label="Courses" 
                active={currentPage === 'courses'} 
                onClick={() => handleNavigation('courses')} 
                icon={<BookOpen className="h-5 w-5" />}
              />
              {isAuthenticated && (
                <NavLink 
                  label="Dashboard" 
                  active={currentPage === 'dashboard'} 
                  onClick={() => handleNavigation('dashboard')} 
                  icon={<User className="h-5 w-5" />}
                />
              )}
            </div>
            
            <div className="flex items-center space-x-4 border-l pl-6 border-gray-200">
              {isAuthenticated ? (
                <div className="flex items-center">
                  <div className="relative group">
                    <div className="flex items-center cursor-pointer">
                      <img 
                        src={currentUser?.avatar} 
                        alt={currentUser?.name} 
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700">{currentUser?.name}</span>
                    </div>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleNavigation('profile')}
                      >
                        Profile
                      </div>
                      <div
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={logout}
                      >
                        <div className="flex items-center">
                          <LogOut className="h-4 w-4 mr-2" />
                          <span>Logout</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleNavigation('login')}
                  >
                    Login
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleNavigation('signup')}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute w-full">
          <div className="p-4 space-y-4">
            <MobileNavLink 
              label="Home" 
              active={currentPage === 'home'} 
              onClick={() => handleNavigation('home')} 
              icon={<Home className="h-5 w-5" />}
            />
            <MobileNavLink 
              label="Courses" 
              active={currentPage === 'courses'} 
              onClick={() => handleNavigation('courses')} 
              icon={<BookOpen className="h-5 w-5" />}
            />
            {isAuthenticated && (
              <MobileNavLink 
                label="Dashboard" 
                active={currentPage === 'dashboard'} 
                onClick={() => handleNavigation('dashboard')} 
                icon={<User className="h-5 w-5" />}
              />
            )}
            
            <div className="pt-4 border-t border-gray-200">
              {isAuthenticated ? (
                <div className="space-y-4">
                  <div className="flex items-center">
                    <img 
                      src={currentUser?.avatar} 
                      alt={currentUser?.name} 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">{currentUser?.name}</span>
                  </div>
                  <div
                    className="flex items-center py-2 text-base font-medium text-gray-700 hover:text-blue-600 cursor-pointer"
                    onClick={() => handleNavigation('profile')}
                  >
                    <User className="h-5 w-5 mr-2" />
                    <span>Profile</span>
                  </div>
                  <div
                    className="flex items-center py-2 text-base font-medium text-gray-700 hover:text-blue-600 cursor-pointer"
                    onClick={logout}
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    <span>Logout</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => handleNavigation('login')}
                  >
                    Login
                  </Button>
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={() => handleNavigation('signup')}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

interface NavLinkProps {
  label: string;
  active: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ label, active, onClick, icon }) => {
  return (
    <div
      className={`flex items-center px-3 py-2 text-sm font-medium rounded-md cursor-pointer transition-colors
        ${active 
          ? 'text-blue-600 bg-blue-50' 
          : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
        }`}
      onClick={onClick}
    >
      {icon && <span className="mr-1.5">{icon}</span>}
      {label}
    </div>
  );
};

const MobileNavLink: React.FC<NavLinkProps> = ({ label, active, onClick, icon }) => {
  return (
    <div
      className={`flex items-center py-2 text-base font-medium cursor-pointer
        ${active 
          ? 'text-blue-600' 
          : 'text-gray-700 hover:text-blue-600'
        }`}
      onClick={onClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </div>
  );
};

export default Navbar;