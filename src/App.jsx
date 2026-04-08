import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { AlumniManagementPage } from './pages/AlumniManagementPage';
import { TrackingAlumniPage } from './pages/TrackingAlumniPage';
import './styles/globals.css';

function App() {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Reset mobile menu saat resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={() => setActiveTab('dashboard')} />;
  }

  const renderPage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage />;
      case 'alumni':
        return <AlumniManagementPage />;
      case 'tracking':
        return <TrackingAlumniPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <DataProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar
          onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          mobileMenuOpen={mobileMenuOpen}
        />

        <div className="flex">
          <Sidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            mobileMenuOpen={mobileMenuOpen}
            onMobileMenuClose={() => setMobileMenuOpen(false)}
          />

          <main className="flex-1 p-4 lg:p-8 overflow-auto">
            <div className="max-w-7xl mx-auto">
              {renderPage()}
            </div>
          </main>
        </div>
      </div>
    </DataProvider>
  );
}

export default App;
