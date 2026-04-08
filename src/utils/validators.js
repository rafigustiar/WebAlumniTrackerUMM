// Validators untuk form validation
export const validators = {
  // Validasi email
  email: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email tidak boleh kosong';
    if (!emailRegex.test(email)) return 'Format email tidak valid';
    return null;
  },

  // Validasi nama
  name: (name) => {
    if (!name || name.trim().length === 0) return 'Nama tidak boleh kosong';
    if (name.trim().length < 3) return 'Nama minimal 3 karakter';
    return null;
  },

  // Validasi nomor induk mahasiswa
  nim: (nim) => {
    if (!nim) return 'NIM tidak boleh kosong';
    if (!/^\d{9}$/.test(nim)) return 'NIM harus 9 digit angka';
    return null;
  },

  // Validasi nomor telepon
  phone: (phone) => {
    if (!phone) return 'Nomor telepon tidak boleh kosong';
    if (!/^(0|62)\d{9,12}$/.test(phone)) return 'Format nomor telepon tidak valid';
    return null;
  },

  // Validasi password
  password: (password) => {
    if (!password) return 'Password tidak boleh kosong';
    if (password.length < 6) return 'Password minimal 6 karakter';
    return null;
  },

  // Validasi tahun kelulusan
  graduationYear: (year) => {
    const currentYear = new Date().getFullYear();
    const numYear = parseInt(year);
    if (!year) return 'Tahun kelulusan tidak boleh kosong';
    if (numYear < 1990 || numYear > currentYear) 
      return `Tahun harus antara 1990 dan ${currentYear}`;
    return null;
  },

  // Validasi status
  status: (status) => {
    const validStatuses = ['belum-dihubungi', 'dihubungi', 'tidak-aktif', 'aktif', 'tidak-ditemukan'];
    if (!status) return 'Status tidak boleh kosong';
    if (!validStatuses.includes(status)) return 'Status tidak valid';
    return null;
  },
};

// Validasi multiple fields
export const validateForm = (data, rules) => {
  const errors = {};
  for (const [field, validator] of Object.entries(rules)) {
    const error = validator(data[field]);
    if (error) errors[field] = error;
  }
  return Object.keys(errors).length === 0 ? null : errors;
};
