import React, { useState } from 'react';
import { LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button, Input } from '../components/FormElements';
import { Alert } from '../components/Alert';

export const LoginPage = ({ onLoginSuccess }) => {
  const { login, error, clearError } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

          <form onSubmit={handleSubmit} className="mt-6">
            <Input
              label="Username / Email"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
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
        </div>

        {/* Footer */}
        <p className="text-center text-blue-100 text-sm">
          © 2024 Alumni Tracker UMM. Membantu melacak alumni dengan lebih efisien.
        </p>
      </div>
    </div>
  );
};
