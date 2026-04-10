import { supabase, isSupabaseEnabled } from './supabase';

// Utility untuk localStorage management
const STORAGE_KEYS = {
  ALUMNI: 'alumni_data',
  TRACKING: 'tracking_data',
  USERS: 'users_data',
  CURRENT_USER: 'current_user',
};

const SUPABASE_ALUMNI_TABLE = 'alumni';

const mapSupabaseAlumniRow = (row) => ({
  id: row.id?.toString() || Date.now().toString(),
  nim: row.nim || '',
  name: row.name || '',
  email: row.email || '',
  phone: row.phone || '',
  graduationYear: row.graduationYear ?? row.graduation_year ?? null,
  department: row.department || '',
  gender: row.gender || '',
  currentPosition: row.currentPosition || row.current_position || '',
  company: row.company || '',
  createdAt: row.created_at || row.createdAt || new Date().toISOString(),
  updatedAt: row.updated_at || row.updatedAt || new Date().toISOString(),
  linkedin: row.linkedin || '',
  instagram: row.instagram || '',
  facebook: row.facebook || '',
  tiktok: row.tiktok || '',
  tempat_bekerja: row.tempat_bekerja || '',
  alamat_bekerja: row.alamat_bekerja || '',
  posisi: row.posisi || '',
  jenis_pekerjaan: row.jenis_pekerjaan || '',
  sosial_media_tempat_kerja: row.sosial_media_tempat_kerja || ''
});

const normalizeAlumniPayload = (alumniData) => ({
  ...alumniData,
  graduationYear: alumniData.graduationYear || alumniData.graduation_year || null,
  currentPosition: alumniData.currentPosition || alumniData.current_position || '',
  tempat_bekerja: alumniData.tempat_bekerja || '',
  alamat_bekerja: alumniData.alamat_bekerja || ''
});

// Initialize default data
const initializeStorage = () => {
  // Inisialisasi users - selalu reset dengan credentials terbaru
  const defaultUsers = [
    {
      id: '1',
      username: 'admin28',
      password: 'admin28',
      role: 'admin',
      name: 'Admin',
      email: 'admin@umm.ac.id'
    }
  ];
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(defaultUsers));

  // Inisialisasi alumni data
  if (!localStorage.getItem(STORAGE_KEYS.ALUMNI)) {
    const sampleAlumni = [
      {
        id: '1',
        nim: '161810101',
        name: 'Ahmad Rizki Pratama',
        email: 'ahmad.rizki@email.com',
        phone: '081234567890',
        graduationYear: 2021,
        department: 'Teknik Informatika',
        gender: 'Laki-laki',
        currentPosition: 'Software Developer',
        company: 'PT Teknologi Maju',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        nim: '161810102',
        name: 'Siti Nurhaliza',
        email: 'siti.nur@email.com',
        phone: '082345678901',
        graduationYear: 2021,
        department: 'Sistem Informasi',
        gender: 'Perempuan',
        currentPosition: 'Business Analyst',
        company: 'PT Digital Solutions',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '3',
        nim: '161810103',
        name: 'Budi Santoso',
        email: 'budi.santo@email.com',
        phone: '083456789012',
        graduationYear: 2020,
        department: 'Teknik Informatika',
        gender: 'Laki-laki',
        currentPosition: 'Product Manager',
        company: 'PT Inovasi Digital',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '4',
        nim: '161810104',
        name: 'Muhammad Iqbal',
        email: 'muh.iqbal@email.com',
        phone: '084567890123',
        graduationYear: 2022,
        department: 'Teknik Informatika',
        gender: 'Laki-laki',
        currentPosition: 'Frontend Developer',
        company: 'PT Web Solutions',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '5',
        nim: '161810105',
        name: 'Nur Aini',
        email: 'nur.aini@email.com',
        phone: '085678901234',
        graduationYear: 2021,
        department: 'Sistem Informasi',
        gender: 'Perempuan',
        currentPosition: 'Data Analyst',
        company: 'PT Data Corp',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '6',
        nim: '161810106',
        name: 'Rizky Ramadhan',
        email: 'rizky.ram@email.com',
        phone: '086789012345',
        graduationYear: 2020,
        department: 'Teknik Elektro',
        gender: 'Laki-laki',
        currentPosition: 'Electrical Engineer',
        company: 'PT Energi Listrik',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '7',
        nim: '161810107',
        name: 'Sari Dewi',
        email: 'sari.dewi@email.com',
        phone: '087890123456',
        graduationYear: 2023,
        department: 'Manajemen',
        gender: 'Perempuan',
        currentPosition: 'Project Manager',
        company: 'PT Manajemen Pro',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '8',
        nim: '161810108',
        name: 'Agus Setiawan',
        email: 'agus.setia@email.com',
        phone: '088901234567',
        graduationYear: 2019,
        department: 'Teknik Informatika',
        gender: 'Laki-laki',
        currentPosition: 'DevOps Engineer',
        company: 'PT Cloud Tech',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '9',
        nim: '161810109',
        name: 'Maya Sari',
        email: 'maya.sari@email.com',
        phone: '089012345678',
        graduationYear: 2022,
        department: 'Sistem Informasi',
        gender: 'Perempuan',
        currentPosition: 'UI/UX Designer',
        company: 'PT Design Studio',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '10',
        nim: '161810110',
        name: 'Hendra Gunawan',
        email: 'hendra.gun@email.com',
        phone: '081123456789',
        graduationYear: 2021,
        department: 'Teknik Elektro',
        gender: 'Laki-laki',
        currentPosition: 'Network Engineer',
        company: 'PT Telekom Indonesia',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '11',
        nim: '161810111',
        name: 'Lina Marlina',
        email: 'lina.marlina@email.com',
        phone: '082234567890',
        graduationYear: 2020,
        department: 'Manajemen',
        gender: 'Perempuan',
        currentPosition: 'HR Manager',
        company: 'PT Human Resources',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '12',
        nim: '161810112',
        name: 'Fajar Nugroho',
        email: 'fajar.nug@email.com',
        phone: '083345678901',
        graduationYear: 2023,
        department: 'Teknik Informatika',
        gender: 'Laki-laki',
        currentPosition: 'Mobile Developer',
        company: 'PT App Development',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '13',
        nim: '161810113',
        name: 'Rina Kartika',
        email: 'rina.kartika@email.com',
        phone: '084456789012',
        graduationYear: 2019,
        department: 'Sistem Informasi',
        gender: 'Perempuan',
        currentPosition: 'Database Administrator',
        company: 'PT Database Solutions',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '14',
        nim: '161810114',
        name: 'Dedi Kurniawan',
        email: 'dedi.kurnia@email.com',
        phone: '085567890123',
        graduationYear: 2022,
        department: 'Teknik Elektro',
        gender: 'Laki-laki',
        currentPosition: 'Automation Engineer',
        company: 'PT Automation Tech',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '15',
        nim: '161810115',
        name: 'Siska Amelia',
        email: 'siska.amelia@email.com',
        phone: '086678901234',
        graduationYear: 2021,
        department: 'Manajemen',
        gender: 'Perempuan',
        currentPosition: 'Marketing Manager',
        company: 'PT Marketing Pro',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '16',
        nim: '161810116',
        name: 'Yudi Prasetyo',
        email: 'yudi.pras@email.com',
        phone: '087789012345',
        graduationYear: 2020,
        department: 'Teknik Informatika',
        gender: 'Laki-laki',
        currentPosition: 'Security Analyst',
        company: 'PT Cyber Security',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '17',
        nim: '161810117',
        name: 'Tuti Handayani',
        email: 'tuti.handayani@email.com',
        phone: '088890123456',
        graduationYear: 2023,
        department: 'Sistem Informasi',
        gender: 'Perempuan',
        currentPosition: 'System Analyst',
        company: 'PT System Integrator',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '18',
        nim: '161810118',
        name: 'Bambang Sutejo',
        email: 'bambang.sut@email.com',
        phone: '089901234567',
        graduationYear: 2019,
        department: 'Teknik Elektro',
        gender: 'Laki-laki',
        currentPosition: 'Maintenance Engineer',
        company: 'PT Maintenance Corp',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '19',
        nim: '161810119',
        name: 'Wulan Sari',
        email: 'wulan.sari@email.com',
        phone: '081012345678',
        graduationYear: 2022,
        department: 'Manajemen',
        gender: 'Perempuan',
        currentPosition: 'Finance Manager',
        company: 'PT Finance Solutions',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '20',
        nim: '161810120',
        name: 'Eko Widodo',
        email: 'eko.widodo@email.com',
        phone: '082123456789',
        graduationYear: 2021,
        department: 'Teknik Informatika',
        gender: 'Laki-laki',
        currentPosition: 'AI Engineer',
        company: 'PT AI Innovations',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '21',
        nim: '161810121',
        name: 'Ani Susanti',
        email: 'ani.susanti@email.com',
        phone: '083234567890',
        graduationYear: 2020,
        department: 'Sistem Informasi',
        gender: 'Perempuan',
        currentPosition: 'Quality Assurance',
        company: 'PT QA Testing',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '22',
        nim: '161810122',
        name: 'Joko Santoso',
        email: 'joko.santoso@email.com',
        phone: '084345678901',
        graduationYear: 2023,
        department: 'Teknik Elektro',
        gender: 'Laki-laki',
        currentPosition: 'IoT Developer',
        company: 'PT IoT Solutions',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '23',
        nim: '161810123',
        name: 'Mega Putri',
        email: 'mega.putri@email.com',
        phone: '085456789012',
        graduationYear: 2019,
        department: 'Manajemen',
        gender: 'Perempuan',
        currentPosition: 'Operations Manager',
        company: 'PT Operations Excellence',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    localStorage.setItem(STORAGE_KEYS.ALUMNI, JSON.stringify(sampleAlumni));
  }

  // Inisialisasi tracking data
  if (!localStorage.getItem(STORAGE_KEYS.TRACKING)) {
    const sampleTracking = [
      {
        id: '1',
        alumniId: '1',
        status: 'aktif',
        notes: 'Alumni sudah dihubungi, bekerja di PT Teknologi Maju',
        trackedBy: 'operator@umm.ac.id',
        trackedAt: new Date().toISOString(),
      },
      {
        id: '2',
        alumniId: '2',
        status: 'aktif',
        notes: 'Alumni merespon dan memberikan informasi terbaru',
        trackedBy: 'operator@umm.ac.id',
        trackedAt: new Date().toISOString(),
      }
    ];
    localStorage.setItem(STORAGE_KEYS.TRACKING, JSON.stringify(sampleTracking));
  }
};

// Initialize on load
initializeStorage();

// ===== ALUMNI OPERATIONS =====
export const alumniService = {
  // Get all alumni
  getAll: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ALUMNI);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting alumni:', error);
      return [];
    }
  },

  // Get alumni by ID
  getById: (id) => {
    const alumni = alumniService.getAll();
    return alumni.find(item => item.id === id);
  },

  // Get alumni by NIM
  getByNim: (nim) => {
    const alumni = alumniService.getAll();
    return alumni.find(item => item.nim === nim);
  },

  // Remote Supabase: get all alumni
  getAllRemote: async () => {
    if (!isSupabaseEnabled || !supabase) {
      return { success: false, error: 'Supabase tidak dikonfigurasi' };
    }

    const { data, error } = await supabase.from(SUPABASE_ALUMNI_TABLE).select('*');
    if (error) {
      return { success: false, error: error.message };
    }

    return {
      success: true,
      data: data.map(mapSupabaseAlumniRow)
    };
  },

  // Remote Supabase: add alumni
  addRemote: async (alumniData) => {
    if (!isSupabaseEnabled || !supabase) {
      return { success: false, error: 'Supabase tidak dikonfigurasi' };
    }

    const payload = normalizeAlumniPayload(alumniData);
    const { data, error } = await supabase
      .from(SUPABASE_ALUMNI_TABLE)
      .insert(payload)
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: mapSupabaseAlumniRow(data) };
  },

  // Remote Supabase: update alumni
  updateRemote: async (id, alumniData) => {
    if (!isSupabaseEnabled || !supabase) {
      return { success: false, error: 'Supabase tidak dikonfigurasi' };
    }

    const payload = normalizeAlumniPayload(alumniData);
    const { data, error } = await supabase
      .from(SUPABASE_ALUMNI_TABLE)
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: mapSupabaseAlumniRow(data) };
  },

  // Remote Supabase: delete alumni
  deleteRemote: async (id) => {
    if (!isSupabaseEnabled || !supabase) {
      return { success: false, error: 'Supabase tidak dikonfigurasi' };
    }

    const { error } = await supabase
      .from(SUPABASE_ALUMNI_TABLE)
      .delete()
      .eq('id', id);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  },

  // Remote Supabase: import batch alumni data
  importBatchRemote: async (records) => {
    if (!isSupabaseEnabled || !supabase) {
      return { success: false, error: 'Supabase tidak dikonfigurasi' };
    }

    const payloads = records.map((record) => ({
      ...normalizeAlumniPayload(record),
      nim: String(record.nim || '').trim()
    })).filter((record) => record.nim);

    if (!payloads.length) {
      return { success: true, summary: { added: 0, updated: 0, skipped: records.length } };
    }

    const { data, error } = await supabase
      .from(SUPABASE_ALUMNI_TABLE)
      .upsert(payloads, { onConflict: 'nim', returning: 'representation' });

    if (error) {
      return { success: false, error: error.message };
    }

    return {
      success: true,
      summary: {
        added: data.length,
        updated: 0,
        skipped: records.length - data.length
      }
    };
  },

  // Import batch alumni data
  importBatch: (records) => {
    try {
      const alumni = alumniService.getAll();
      const summary = { added: 0, updated: 0, skipped: 0 };

      records.forEach((record) => {
        const nim = String(record.nim || '').trim();
        if (!nim) {
          summary.skipped += 1;
          return;
        }

        const mappedRecord = {
          name: String(record.name || '').trim(),
          nim,
          email: String(record.email || '').trim(),
          phone: String(record.no_hp || record.phone || '').trim(),
          graduationYear: record.tanggal_lulus ? Number(new Date(record.tanggal_lulus).getFullYear()) : record.tahun_masuk ? Number(record.tahun_masuk) : null,
          yearEntry: String(record.tahun_masuk || '').trim(),
          graduationDate: String(record.tanggal_lulus || '').trim(),
          faculty: String(record.fakultas || '').trim(),
          studyProgram: String(record.program_studi || '').trim(),
          department: String(record.program_studi || record.fakultas || '').trim(),
          currentPosition: String(record.posisi || '').trim(),
          company: String(record.tempat_bekerja || '').trim(),
          linkedin: String(record.linkedin || '').trim(),
          instagram: String(record.instagram || '').trim(),
          facebook: String(record.facebook || '').trim(),
          tiktok: String(record.tiktok || '').trim(),
          tempat_bekerja: String(record.tempat_bekerja || '').trim(),
          alamat_bekerja: String(record.alamat_bekerja || '').trim(),
          posisi: String(record.posisi || '').trim(),
          jenis_pekerjaan: String(record.jenis_pekerjaan || '').trim(),
          sosial_media_tempat_kerja: String(record.sosial_media_tempat_kerja || '').trim()
        };

        const existingIndex = alumni.findIndex(item => item.nim === nim);
        if (existingIndex !== -1) {
          alumni[existingIndex] = {
            ...alumni[existingIndex],
            ...mappedRecord,
            updatedAt: new Date().toISOString()
          };
          summary.updated += 1;
        } else {
          alumni.push({
            ...mappedRecord,
            id: Date.now().toString() + Math.random().toString(16).slice(2),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          });
          summary.added += 1;
        }
      });

      localStorage.setItem(STORAGE_KEYS.ALUMNI, JSON.stringify(alumni));
      return { success: true, summary };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Add new alumni
  add: (alumniData) => {
    try {
      const alumni = alumniService.getAll();
      const newAlumni = {
        ...alumniData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      alumni.push(newAlumni);
      localStorage.setItem(STORAGE_KEYS.ALUMNI, JSON.stringify(alumni));
      return { success: true, data: newAlumni };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Update alumni
  update: (id, alumniData) => {
    try {
      const alumni = alumniService.getAll();
      const index = alumni.findIndex(item => item.id === id);
      if (index === -1) return { success: false, error: 'Alumni tidak ditemukan' };
      
      alumni[index] = {
        ...alumni[index],
        ...alumniData,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEYS.ALUMNI, JSON.stringify(alumni));
      return { success: true, data: alumni[index] };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Delete alumni
  delete: (id) => {
    try {
      const alumni = alumniService.getAll();
      const filtered = alumni.filter(item => item.id !== id);
      localStorage.setItem(STORAGE_KEYS.ALUMNI, JSON.stringify(filtered));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Search alumni
  search: (query) => {
    const alumni = alumniService.getAll();
    if (!query) return alumni;
    const lower = query.toLowerCase();
    return alumni.filter(item =>
      item.name.toLowerCase().includes(lower) ||
      item.nim.includes(query) ||
      item.email.toLowerCase().includes(lower)
    );
  },

  // Filter alumni
  filter: (filters) => {
    let alumni = alumniService.getAll();
    if (filters.year) alumni = alumni.filter(a => a.graduationYear === parseInt(filters.year));
    if (filters.department) alumni = alumni.filter(a => a.department === filters.department);
    return alumni;
  }
};

// ===== TRACKING OPERATIONS =====
export const trackingService = {
  // Get all tracking records
  getAll: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TRACKING);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting tracking:', error);
      return [];
    }
  },

  // Get tracking by alumni ID
  getByAlumniId: (alumniId) => {
    const tracking = trackingService.getAll();
    return tracking.filter(item => item.alumniId === alumniId).sort((a, b) => 
      new Date(b.trackedAt) - new Date(a.trackedAt)
    );
  },

  // Add tracking record
  add: (trackingData, currentUser) => {
    try {
      const tracking = trackingService.getAll();
      const newTracking = {
        ...trackingData,
        id: Date.now().toString(),
        trackedBy: currentUser.email,
        trackedAt: new Date().toISOString(),
      };
      tracking.push(newTracking);
      localStorage.setItem(STORAGE_KEYS.TRACKING, JSON.stringify(tracking));
      return { success: true, data: newTracking };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get latest tracking for alumni
  getLatest: (alumniId) => {
    const tracking = trackingService.getByAlumniId(alumniId);
    return tracking[0] || null;
  }
};

// ===== AUTH OPERATIONS =====
export const authService = {
  // Login
  login: (username, password) => {
    try {
      // Only admin with admin28 credentials can login
      if (username !== 'admin28' || password !== 'admin28') {
        return { success: false, error: 'Hanya admin yang dapat login. Silakan gunakan username dan password: admin28' };
      }
      
      const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
      const user = users.find(u => u.username === username && u.password === password);
      
      if (!user) return { success: false, error: 'Username atau password salah' };
      
      const userData = { ...user };
      delete userData.password; // Don't store password
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userData));
      return { success: true, data: userData };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    return { success: true };
  },

  // Get current user
  getCurrentUser: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      return null;
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return authService.getCurrentUser() !== null;
  }
};
