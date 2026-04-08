import React from 'react';
import { Home, Users, BarChart3, LogOut, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { isAdmin } from '../utils/helpers';

export const Sidebar = ({ activeTab, onTabChange, mobileMenuOpen, onMobileMenuClose }) => {
  const { user } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'alumni', label: 'Data Alumni', icon: Users },
    { id: 'tracking', label: 'Tracking Alumni', icon: BarChart3 }
  ];

  // Admin only menu
  if (isAdmin(user)) {
    // Admin bisa akses semua
  }

  const handleItemClick = (id) => {
    onTabChange(id);
    onMobileMenuClose();
  };

  return (
    <>
      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-20"
          onClick={onMobileMenuClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:relative left-0 top-16 lg:top-0 w-64 h-[calc(100vh-4rem)] lg:h-screen bg-white shadow-lg z-30 transition-transform duration-300`}
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-primary">Menu</h2>
        </div>

        <nav className="p-4">
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                  activeTab === item.id
                    ? 'bg-primary text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Close button for mobile */}
        <button
          onClick={onMobileMenuClose}
          className="absolute top-4 right-4 lg:hidden p-2 hover:bg-gray-200 rounded-lg"
        >
          <X size={20} />
        </button>
      </aside>
    </>
  );
};
