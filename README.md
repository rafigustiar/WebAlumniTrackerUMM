# 📊 Alumni Tracker UMM

Sistem tracking alumni untuk Universitas Muhammadiyah Malang yang membantu admin dan operator melacak alumni dari sumber publik secara terstruktur melalui satu dashboard terpadu.

![React](https://img.shields.io/badge/React-18.2-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-4.3-purple?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

## 🎯 Tujuan Sistem

- Membantu admin kampus melacak alumni dari sumber publik secara lebih terstruktur
- Memudahkan pengelolaan data alumni dan hasil pelacakan dalam satu dashboard
- Membantu proses pencarian dan verifikasi informasi alumni secara efisien
- Mempercepat proses tracer alumni agar data alumni lebih mudah diperbarui
- Membantu operator mengelola informasi alumni agar proses tracer lebih cepat dan rapi

## ✨ Fitur Utama

### 🔐 **Authentication & Authorization**
- ✅ Login dengan role berbeda (Admin & Operator)
- ✅ Session management menggunakan Context API
- ✅ Proteksi halaman sesuai role pengguna

### 📊 **Dashboard**
- ✅ Statistik alumni (total, tracked, active status)
- ✅ Riwayat tracking terbaru
- ✅ Persentase pelacakan alumni
- ✅ Informasi cepat dan ringkasan

### 👥 **Data Alumni Management**
- ✅ CRUD lengkap (Create, Read, Update, Delete)
- ✅ Pencarian alumni (nama, NIM, email)
- ✅ Filter berdasarkan tahun kelulusan
- ✅ Validasi form real-time
- ✅ Responsive table dengan sorting

### 📱 **Tracking Alumni**
- ✅ Input status pelacakan alumni
- ✅ Riwayat tracking dengan timestamp
- ✅ Status tracking: Belum Dihubungi, Dihubungi, Aktif, Tidak Aktif, Tidak Ditemukan
- ✅ Detail profil alumni dengan riwayat tracking
- ✅ Catatan tracking untuk setiap update

### 🎨 **User Interface**
- ✅ Responsive design (Mobile, Tablet, Desktop)
- ✅ Modern dan clean UI dengan Tailwind CSS
- ✅ Interactive components dengan smooth animations
- ✅ Navigasi intuitif
- ✅ Dark-friendly color scheme

### 🛡️ **Data & Error Handling**
- ✅ Validasi form dengan pesan error yang jelas
- ✅ Alert notifications (success, error, info)
- ✅ localStorage untuk persistent data
- ✅ Error handling graceful
- ✅ Loading states untuk UX yang lebih baik

## 🛠️ Teknologi

### Frontend Stack
- **React 18.2** - UI Library
- **Vite 4.3** - Build Tool & Dev Server
- **Tailwind CSS 3.3** - Styling & Responsive Design
- **Lucide React** - Icon Library
- **Context API + useReducer** - State Management

### Features
- Local Storage untuk data persistence
- Responsive Mobile-First Design
- Modern ES6+ JavaScript
- Component-based Architecture
- Custom Hooks untuk reusability

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📁 Struktur Folder

```
alumni-tracker-umm/
├── src/
│   ├── components/           # Reusable components
│   │   ├── Navbar.jsx       # Top navigation bar
│   │   ├── Sidebar.jsx      # Sidebar menu
│   │   ├── FormElements.jsx # Button, Input, Select, TextArea
│   │   ├── Table.jsx        # Table & Pagination
│   │   ├── Modal.jsx        # Modal & Confirm Dialog
│   │   ├── Card.jsx         # Card & StatCard components
│   │   └── Alert.jsx        # Alert notifications
│   │
│   ├── pages/               # Page components
│   │   ├── LoginPage.jsx    # Authentication page
│   │   ├── DashboardPage.jsx # Dashboard overview
│   │   ├── AlumniManagementPage.jsx # Alumni CRUD
│   │   └── TrackingAlumniPage.jsx # Tracking management
│   │
│   ├── context/             # React Context
│   │   ├── AuthContext.jsx  # Authentication state
│   │   └── DataContext.jsx  # Data management state
│   │
│   ├── utils/               # Utility functions
│   │   ├── storage.js       # localStorage management
│   │   ├── validators.js    # Form validation
│   │   └── helpers.js       # Helper functions
│   │
│   ├── styles/              # Styles
│   │   └── globals.css      # Global CSS with Tailwind
│   │
│   ├── App.jsx              # Main app component
│   └── main.jsx             # Entry point
│
├── public/                  # Static files
├── index.html               # HTML template
├── package.json             # Dependencies
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
├── postcss.config.js        # PostCSS configuration
├── .eslintrc.json           # ESLint configuration
├── .gitignore               # Git ignore rules
└── README.md                # This file
```

## 🚀 Cara Menjalankan Project

### Prerequisites
- Node.js v14+ dan npm/yarn
- Text Editor (VSCode recommended)

### Installation & Setup

1. **Clone atau Download Project**
   ```bash
   git clone https://github.com/yourusername/alumni-tracker-umm.git
   cd alumni-tracker-umm
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Browser akan otomatis membuka pada `http://localhost:3000`

4. **Build untuk Production**
   ```bash
   npm run build
   # or
   yarn build
   ```

5. **Preview Production Build**
   ```bash
   npm run preview
   # or
   yarn preview
   ```

## 🔐 Demo Accounts

Gunakan account berikut untuk testing:

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@umm.ac.id` | `admin123` |
| Operator | `operator@umm.ac.id` | `operator123` |

## 📚 Penggunaan

### Fitur Utama:

1. **Login**
   - Masukkan email dan password
   - Klik tombol "Login"
   - Aplikasi akan menyimpan session dalam localStorage

2. **Dashboard**
   - Lihat statistik alumni
   - Monitor progress tracking
   - Lihat riwayat tracking terbaru

3. **Data Alumni**
   - Klik "Tambah Alumni" untuk menambah data baru
   - Gunakan fitur pencarian untuk menemukan alumni
   - Filter berdasarkan tahun kelulusan
   - Edit atau hapus data dengan tombol aksi

4. **Tracking Alumni**
   - Input tracking baru dengan klik "Input Tracking"
   - Pilih alumni dan status tracking
   - Tambahkan catatan untuk setiap tracking
   - Lihat riwayat tracking lengkap

## 🧪 Pengujian Kualitas

### Tabel Hasil Pengujian

| No | Fitur/Aspek yang diuji | Skenario Pengujian | Hasil yang Diharapkan | Hasil Aktual | Status |
|----|------------------------|--------------------|-----------------------|--------------|--------|
| 1 | **Login - Admin** | Masukkan admin@umm.ac.id dan admin123 | Login berhasil, dashboard terbuka | Login berhasil, dashboard terbuka | ✅ PASS |
| 2 | **Login - Operator** | Masukkan operator@umm.ac.id dan operator123 | Login berhasil, dashboard terbuka | Login berhasil, dashboard terbuka | ✅ PASS |
| 3 | **Login - Invalid** | Masukkan email/password salah | Tampil pesan error | Pesan error ditampilkan | ✅ PASS |
| 4 | **Dashboard - Load Data** | Buka halaman dashboard | Statistik dan data tampil dengan benar | Data statistik tampil lengkap | ✅ PASS |
| 5 | **Alumni - Tambah Data** | Klik "Tambah Alumni" dan isi form | Modal terbuka, form dapat diisi dan disimpan | Data alumni baru tersimpan di table | ✅ PASS |
| 6 | **Alumni - Validasi Form** | Isi form dengan data invalid (NIM bukan 9 digit) | Pesan validasi error tampil | Error validation ditampilkan | ✅ PASS |
| 7 | **Alumni - Edit Data** | Klik edit pada data alumni | Modal terbuka dengan data terisi | Data dapat diedit dan diupdate | ✅ PASS |
| 8 | **Alumni - Hapus Data** | Klik hapus pada data alumni | Confirm dialog tampil | Data alumni terhapus setelah konfirmasi | ✅ PASS |
| 9 | **Alumni - Pencarian** | Ketik nama alumni di search box | Data alumni yang sesuai ditampilkan | Pencarian berfungsi real-time | ✅ PASS |
| 10 | **Alumni - Filter Tahun** | Pilih tahun dari dropdown | Data alumni difilter sesuai tahun | Filter berfungsi dengan baik | ✅ PASS |
| 11 | **Tracking - Input Data** | Klik "Input Tracking" dan isi form | Modal terbuka, tracking dapat disimpan | Tracking baru tersimpan dengan benar | ✅ PASS |
| 12 | **Tracking - Validasi Status** | Submit form tanpa pilih status | Error message tampil | Validasi status berfungsi | ✅ PASS |
| 13 | **Tracking - Riwayat** | Klik detail tracking alumni | Detail profil dan riwayat tracking tampil | Semua riwayat tracking ditampilkan chronologically | ✅ PASS |
| 14 | **Tracking - Status Badge** | Lihat berbagai status tracking | Badge dengan warna berbeda sesuai status | Warna badge sesuai status (green, yellow, red) | ✅ PASS |
| 15 | **UI - Responsive Mobile** | Buka aplikasi di device mobile | Layout responsive, menu sidebar collapse | Layout sempurna di mobile (hamburger menu) | ✅ PASS |
| 16 | **UI - Responsive Tablet** | Buka aplikasi di tablet | Layout responsive untuk tablet | Layout berfungsi baik di tablet | ✅ PASS |
| 17 | **UI - Responsive Desktop** | Buka aplikasi di desktop | Sidebar sidebar terbuka, main content penuh | Desktop layout sempurna | ✅ PASS |
| 18 | **Navigation - Menu Sidebar** | Klik menu di sidebar | Halaman sesuai menu terbuka | Navigasi antar halaman berfungsi | ✅ PASS |
| 19 | **Navigation - Mobile Menu** | Klik hamburger menu di mobile | Mobile menu terbuka/tertutup | Mobile menu toggle berfungsi | ✅ PASS |
| 20 | **Logout** | Klik tombol logout | User logout, kembali ke login page | Session cleared, login page terbuka | ✅ PASS |
| 21 | **Data Persistence** | Refresh halaman setelah tambah data | Data tetap tersimpan | Data Alumni dan Tracking persisten | ✅ PASS |
| 22 | **Alert Notifications** | Lakukan aksi (tambah/edit/hapus) | Alert success/error ditampilkan | Notifikasi muncul dengan pesan tepat | ✅ PASS |
| 23 | **Table Pagination** | Lihat table dengan banyak data | Pagination controls muncul | Pagination berfungsi (if needed) | ✅ PASS |
| 24 | **Form Validation - Email** | Masukkan email format invalid | Error validation email | Validasi email format berfungsi | ✅ PASS |
| 25 | **Form Validation - Phone** | Masukkan nomor telepon invalid | Error validation phone | Validasi phone format berfungsi | ✅ PASS |
| 26 | **Modal - Open/Close** | Buka dan tutup modal | Modal terbuka/tertutup dengan smooth | Modal transition smooth, overlay berfungsi | ✅ PASS |
| 27 | **Confirm Dialog** | Klik tombol delete | Confirm dialog muncul | Dialog konfirmasi tampil sebelum delete | ✅ PASS |
| 28 | **Role-based Access** | Login sebagai operator, akses fitur | Operator hanya akses fitur yang sesuai | Access control berfungsi | ✅ PASS |
| 29 | **Loading State** | Tunggu proses submit form | Loading spinner/indicator tampil | Loading state berfungsi dengan baik | ✅ PASS |
| 30 | **Performance** | Buka aplikasi dan navigasi | Aplikasi responsif dan cepat | Loading time <2 detik | ✅ PASS |

### Kesimpulan Testing
- **Total Test Cases**: 30
- **Passed**: 30 ✅
- **Failed**: 0
- **Success Rate**: 100%
- **Status**: READY FOR PRODUCTION

## 📊 Dashboard Screenshots

### Login Page
- Email dan password input fields
- Demo account shortcuts
- Responsive design

### Dashboard
- Statistik alumni dengan card bergambar
- Riwayat tracking terbaru
- Persentase pelacakan alumni
- Status breakdown

### Alumni Management
- Tabel data alumni dengan sorting
- Search dan filter functionality
- Modal form untuk tambah/edit
- Action buttons untuk edit/hapus

### Tracking Alumni
- Input tracking form
- Riwayat tracking dengan status badge
- Detail profil alumni
- Chronological tracking history

## 🔒 Security Considerations

- Password disimpan di localStorage (for demo only, tidak aman untuk production)
- Session management dengan Context API
- Input validation sebelum submit
- XSS protection dari React
- CSRF protection dapat ditambahkan saat integrasi backend

**Untuk production, gunakan:**
- Backend authentication (JWT tokens)
- Encrypted passwords
- HTTPS
- Secure session management
- CORS configuration

## 🚀 Deployment

### Deploy ke Vercel (Recommended)

1. Push project ke GitHub
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/alumni-tracker-umm.git
   git push -u origin main
   ```

2. Buka [vercel.com](https://vercel.com)
   - Klik "New Project"
   - Import repository GitHub
   - Klik "Deploy"

3. Aplikasi akan live di `https://alumni-tracker-umm.vercel.app`

### Deploy ke Netlify

1. Push project ke GitHub
2. Buka [netlify.com](https://netlify.com)
3. Klik "New site from Git"
4. Pilih repository
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Deploy!

### Deploy ke Server Sendiri

1. Build aplikasi
   ```bash
   npm run build
   ```

2. Upload folder `dist` ke server
3. Konfigurasi web server untuk SPA routing
4. Setup HTTPS dan domain

## 📈 Fitur Tambahan (Future)

- [ ] Export data alumni ke Excel/PDF
- [ ] Integration dengan Google Sheets untuk data source
- [ ] Email notification untuk tracking reminder
- [ ] QR Code generator untuk alumni cards
- [ ] Analytics dan reporting dashboard
- [ ] Multi-language support (English, Indonesia)
- [ ] Dark mode
- [ ] Advanced filtering dan search
- [ ] Backup dan restore data

## 🤝 Kontribusi

Untuk kontribusi, silakan:

1. Fork project
2. Buat branch baru (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 Lisensi

Project ini di-license di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detailnya.

## 📞 Kontak & Support

- **Email**: alumni-tracker@umm.ac.id
- **Issues**: [GitHub Issues](https://github.com/yourusername/alumni-tracker-umm/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/alumni-tracker-umm/discussions)

## 📌 Links

- **GitHub Repository**: https://github.com/yourusername/alumni-tracker-umm
- **Live Demo**: https://alumni-tracker-umm.vercel.app
- **Documentation**: [Docs](./docs)

---

**Made with ❤️ for Universitas Muhammadiyah Malang**

Terakhir diupdate: April 2024 | v1.0.0
