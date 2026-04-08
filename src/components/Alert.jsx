import React from 'react';
import { AlertCircle, CheckCircle, XCircle, Info } from 'lucide-react';

export const Alert = ({ type = 'info', message, onClose }) => {
  if (!message) return null;

  const config = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: CheckCircle
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: XCircle
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: AlertCircle
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: Info
    }
  };

  const c = config[type] || config.info;
  const Icon = c.icon;

  return (
    <div className={`${c.bg} ${c.border} ${c.text} border rounded-lg p-4 flex items-start gap-3 animate-slide-in`}>
      <Icon size={20} className="flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="font-medium text-sm">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className={`flex-shrink-0 ${c.text} hover:opacity-70`}
        >
          ✕
        </button>
      )}
    </div>
  );
};
