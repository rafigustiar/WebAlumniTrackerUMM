import React, { useState, useEffect } from 'react';
import { LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button, Input } from '../components/FormElements';
import { Alert } from '../components/Alert';

export const LoginPage = ({ onLoginSuccess }) => {
  const { login, error, clearError } = useAuth();
  const [username, setUsername] = useState('admin@umm.ac.id');
  const [password, setPassword] = useState('admin123');
  const [isLoading, setIsLoading] = useState(false);
  const [demoInfo, setDemoInfo] = useState(false);

  useEffect(() => {
    // Tampilkan info demo saat pertama kali
    setDemoInfo(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert('Username dan password harus diisi');
      return;
    }

    setIsLoading(true);
    const result = login(username, password);
    setIsLoading(false);

    if (result.success) {
      onLoginSuccess?.();
    }
  };

  const setDemoAdmin = () => {
    setUsername('admin@umm.ac.id');
    setPassword('admin123');
    clearError?.();
  };

  const setDemoOperator = () => {
    setUsername('operator@umm.ac.id');
    setPassword('operator123');
    clearError?.();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4">
            <LogIn className="text-primary" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Alumni Tracker</h1>
          <p className="text-blue-100">Universitas Muhammadiyah Malang</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-6">
          {/* Error Alert */}
          {error && (
            <Alert
              type="error"
              message={error}
              onClose={clearError}
            />
          )}

          {/* Demo Info */}
          {demoInfo && (
            <Alert
              type="info"
              message="Gunakan demo account untuk testing: admin@umm.ac.id atau operator@umm.ac.id"
              onClose={() => setDemoInfo(false)}
            />
          )}

          <form onSubmit={handleSubmit} className="mt-6">
            <Input
              label="Username / Email"
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin@umm.ac.id"
              required
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            <Button
              fullWidth
              type="submit"
              isLoading={isLoading}
              className="mt-6"
            >
              {isLoading ? 'Memproses...' : 'Login'}
            </Button>
          </form>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <p className="text-xs text-gray-600 text-center mb-4 font-semibold">
              Demo Accounts
            </p>
            <div className="space-y-2">
              <button
                onClick={setDemoAdmin}
                className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                <p className="font-medium text-gray-900">Admin</p>
                <p className="text-gray-500">admin@umm.ac.id</p>
              </button>
              <button
                onClick={setDemoOperator}
                className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                <p className="font-medium text-gray-900">Operator</p>
                <p className="text-gray-500">operator@umm.ac.id</p>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-blue-100 text-sm">
          © 2024 Alumni Tracker UMM. Membantu melacak alumni dengan lebih efisien.
        </p>
      </div>
    </div>
  );
};
