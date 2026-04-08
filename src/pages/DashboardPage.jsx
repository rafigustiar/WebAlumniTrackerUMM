import React from 'react';
import { Users, Activity, Target, TrendingUp } from 'lucide-react';
import { useData } from '../context/DataContext';
import { StatCard, Card } from '../components/Card';
import { calculateAlumniStats } from '../utils/helpers';
import { trackingService } from '../utils/storage';

export const DashboardPage = () => {
  const { alumni, tracking } = useData();

  const stats = calculateAlumniStats(alumni, tracking);

  // Data untuk recent tracking
  const recentTracking = tracking
    .sort((a, b) => new Date(b.trackedAt) - new Date(a.trackedAt))
    .slice(0, 5);

  const getAlumniName = (alumniId) => {
    const alum = alumni.find(a => a.id === alumniId);
    return alum?.name || 'Unknown';
  };

  const getStatusBadge = (status) => {
    const badges = {
      'aktif': 'badge-success',
      'belum-dihubungi': 'badge-warning',
      'dihubungi': 'badge-info',
      'tidak-aktif': 'badge-danger'
    };
    return badges[status] || 'badge-info';
  };

  const getStatusName = (status) => {
    const names = {
      'aktif': 'Aktif',
      'belum-dihubungi': 'Belum Dihubungi',
      'dihubungi': 'Dihubungi',
      'tidak-aktif': 'Tidak Aktif',
      'tidak-ditemukan': 'Tidak Ditemukan'
    };
    return names[status] || status;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Selamat datang di Alumni Tracker UMM</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Alumni"
          value={stats.total}
          color="blue"
        />
        <StatCard
          label="Sudah Dilacak"
          value={stats.tracked}
          color="green"
        />
        <StatCard
          label="Belum Dilacak"
          value={stats.notTracked}
          color="yellow"
        />
        <StatCard
          label="Alumni Aktif"
          value={stats.active}
          color="purple"
        />
      </div>

      {/* Recent Tracking */}
      <Card title="Riwayat Tracking Terbaru">
        {recentTracking.length === 0 ? (
          <div className="text-center py-8">
            <Activity size={32} className="mx-auto text-gray-400 mb-2" />
            <p className="text-gray-600">Belum ada riwayat tracking</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentTracking.map(track => (
              <div
                key={track.id}
                className="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">
                    {getAlumniName(track.alumniId)}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{track.notes}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Ditrack oleh: {track.trackedBy}
                  </p>
                </div>
                <div className={`${getStatusBadge(track.status)} flex-shrink-0`}>
                  {getStatusName(track.status)}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Statistics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Persentase Pelacakan">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">
              {stats.total > 0 ? Math.round((stats.tracked / stats.total) * 100) : 0}%
            </div>
            <p className="text-gray-600">
              {stats.tracked} dari {stats.total} alumni sudah dilacak
            </p>
          </div>
        </Card>

        <Card title="Status Alumni">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Aktif</span>
              <span className="font-semibold text-gray-900">{stats.active}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tidak Aktif</span>
              <span className="font-semibold text-gray-900">{stats.inactive}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tidak Ditemukan</span>
              <span className="font-semibold text-gray-900">{stats.notFound}</span>
            </div>
          </div>
        </Card>

        <Card title="Informasi Cepat">
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Tahun Lulus Terbanyak</p>
              <p className="text-2xl font-bold text-primary">
                {alumni.length > 0
                  ? alumni.reduce((acc, curr) => {
                      acc[curr.graduationYear] = (acc[curr.graduationYear] || 0) + 1;
                      return acc;
                    }, {}) &&
                    Object.keys(
                      alumni.reduce((acc, curr) => {
                        acc[curr.graduationYear] = (acc[curr.graduationYear] || 0) + 1;
                        return acc;
                      }, {})
                    ).reduce((a, b, arr) => {
                      const counts = alumni.reduce((acc, curr) => {
                        acc[curr.graduationYear] = (acc[curr.graduationYear] || 0) + 1;
                        return acc;
                      }, {});
                      return counts[a] > counts[b] ? a : b;
                    })
                  : '-'}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
