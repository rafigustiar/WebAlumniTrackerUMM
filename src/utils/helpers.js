// Format tanggal ke format lokal Indonesia
export const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    return dateString;
  }
};

// Format tanggal dan waktu
export const formatDateTime = (dateString) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    return dateString;
  }
};

// Dapatkan nama role dalam bahasa Indonesia
export const getRoleName = (role) => {
  const roleNames = {
    'admin': 'Admin',
    'operator': 'Operator'
  };
  return roleNames[role] || role;
};

// Dapatkan warna badge untuk status
export const getStatusBadgeClass = (status) => {
  const statusClasses = {
    'aktif': 'badge-success',
    'belum-dihubungi': 'badge-warning',
    'dihubungi': 'badge-info',
    'tidak-aktif': 'badge-danger',
    'tidak-ditemukan': 'badge-danger'
  };
  return statusClasses[status] || 'badge-info';
};

// Dapatkan nama status dalam bahasa Indonesia
export const getStatusName = (status) => {
  const statusNames = {
    'aktif': 'Aktif',
    'belum-dihubungi': 'Belum Dihubungi',
    'dihubungi': 'Dihubungi',
    'tidak-aktif': 'Tidak Aktif',
    'tidak-ditemukan': 'Tidak Ditemukan'
  };
  return statusNames[status] || status;
};

// Hitung statistik alumni
export const calculateAlumniStats = (alumni, tracking) => {
  const total = alumni.length;
  const tracked = new Set(tracking.map(t => t.alumniId)).size;
  const active = tracking.filter(t => t.status === 'aktif').length;
  const inactive = tracking.filter(t => t.status === 'tidak-aktif').length;
  const notFound = tracking.filter(t => t.status === 'tidak-ditemukan').length;

  return {
    total,
    tracked,
    notTracked: total - tracked,
    active,
    inactive,
    notFound
  };
};

// Validasi admin access
export const isAdmin = (user) => user && user.role === 'admin';

// Validasi operator access
export const isOperator = (user) => user && (user.role === 'operator' || user.role === 'admin');
