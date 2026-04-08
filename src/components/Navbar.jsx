import React from 'react';
import { LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getRoleName } from '../utils/helpers';

export const Navbar = ({ onMenuClick, mobileMenuOpen }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <nav className="bg-primary text-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-blue-700 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-xl font-bold">Alumni Tracker</h1>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-4">
          <div className="text-sm text-right hidden sm:block">
            <p className="font-semibold">{user?.name}</p>
            <p className="text-blue-100 text-xs">{getRoleName(user?.role)}</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            title="Logout"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
