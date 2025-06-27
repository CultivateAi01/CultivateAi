import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  CreditCard, 
  Settings, 
  LogOut, 
  HelpCircle, 
  Zap, 
  Home, 
  FolderOpen, 
  ChevronDown 
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../ui/Button';
import { useLocation, Link } from 'react-router-dom';

const navigationItems = [
  { icon: Home, label: 'Home', path: '/home' },
  { icon: FolderOpen, label: 'Projects', path: '/projects' },
  { icon: Zap, label: 'AI Actions', path: '/actions' },
];

export const Header: React.FC = () => {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/home" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Cultivate.ai
            </span>
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-white'
                      : 'hover:bg-white/5 text-gray-300 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : ''}`} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Profile & Credits */}
          <div className="flex items-center gap-4">
            {/* Credits Display */}
            <div className="hidden sm:flex items-center gap-2 bg-white/[0.08] backdrop-blur-md border border-white/[0.12] px-4 py-2 rounded-xl">
              <CreditCard className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-white">{user?.credits || 0}</span>
              <span className="text-xs text-gray-400">credits</span>
            </div>
            
            {/* User Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 p-2 hover:bg-white/[0.08] rounded-xl transition-all duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-sm font-medium text-white">{user?.name}</div>
                  <div className="text-xs text-gray-400">{user?.email}</div>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="absolute right-0 top-full mt-2 w-64 bg-white/[0.08] backdrop-blur-md border border-white/[0.12] rounded-xl p-2 shadow-xl"
                  >
                    {/* User Info */}
                    <div className="px-3 py-3 border-b border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{user?.name}</div>
                          <div className="text-xs text-gray-400">{user?.email}</div>
                        </div>
                      </div>
                    </div>

                    {/* Credits (Mobile) */}
                    <div className="sm:hidden px-3 py-2 border-b border-white/10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm text-gray-300">Credits</span>
                        </div>
                        <span className="text-sm font-medium text-white">{user?.credits || 0}</span>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        to="/credits"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/[0.08] rounded-lg transition-colors duration-200"
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>Manage Credits</span>
                      </Link>
                      
                      <Link
                        to="/settings"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/[0.08] rounded-lg transition-colors duration-200"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </Link>
                      
                      <Link
                        to="/help"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/[0.08] rounded-lg transition-colors duration-200"
                      >
                        <HelpCircle className="w-4 h-4" />
                        <span>Help & Support</span>
                      </Link>
                    </div>

                    {/* Logout */}
                    <div className="border-t border-white/10 pt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors duration-200"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex items-center gap-1 mt-4 pt-4 border-t border-white/10">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 flex-1 justify-center ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-white'
                    : 'hover:bg-white/5 text-gray-300 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : ''}`} />
                <span className="font-medium text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </motion.header>
  );
};