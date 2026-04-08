import React from 'react';

export const Card = ({ title, children, className = '' }) => {
  return (
    <div className={`card ${className}`}>
      {title && <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>}
      {children}
    </div>
  );
};

export const StatCard = ({ label, value, color = 'blue' }) => {
  const colors = {
    blue: 'bg-blue-50 text-blue-900',
    green: 'bg-green-50 text-green-900',
    red: 'bg-red-50 text-red-900',
    yellow: 'bg-yellow-50 text-yellow-900',
    purple: 'bg-purple-50 text-purple-900'
  };

  return (
    <div className={`${colors[color]} rounded-lg p-6`}>
      <p className="text-sm font-medium opacity-75">{label}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
};

export const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="text-gray-600 mt-4">{message}</p>
    </div>
  );
};

export const EmptyState = ({ message = 'Tidak ada data', icon = '📭' }) => {
  return (
    <div className="text-center py-12">
      <p className="text-4xl mb-4">{icon}</p>
      <p className="text-gray-600 text-lg">{message}</p>
    </div>
  );
};
