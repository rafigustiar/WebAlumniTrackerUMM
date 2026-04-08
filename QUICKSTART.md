# 🎓 QUICK START GUIDE

Panduan cepat untuk memulai mengembangkan Alumni Tracker UMM.

## 1️⃣ Setup (5 menit)

```bash
# Clone repository
git clone https://github.com/yourusername/alumni-tracker-umm.git
cd alumni-tracker-umm

# Install dependencies
npm install

# Start development server
npm run dev
```

Browser akan otomatis terbuka di `http://localhost:3000`

## 2️⃣ Login (1 menit)

Gunakan demo account:
- **Admin**: `admin@umm.ac.id` / `admin123`
- **Operator**: `operator@umm.ac.id` / `operator123`

## 3️⃣ Explore Features (5 menit)

### Dashboard
Lihat statistik alumni dan riwayat tracking terbaru

### Alumni Management
- ✅ Cari alumni
- ✅ Filter berdasarkan tahun
- ✅ Tambah alumni baru
- ✅ Edit data alumni
- ✅ Hapus alumni

### Tracking Alumni
- ✅ Input status tracking
- ✅ Lihat riwayat tracking
- ✅ Detail profil alumni

## 4️⃣ Understanding the Code

### Key Files to Know

**Authentication**
- `src/context/AuthContext.jsx` - Login logic
- `src/pages/LoginPage.jsx` - Login UI
- `src/utils/storage.js` - Auth service

**Data Management**
- `src/context/DataContext.jsx` - Data state & actions
- `src/utils/storage.js` - CRUD services
- `src/utils/validators.js` - Form validation

**Pages**
- `src/pages/DashboardPage.jsx` - Dashboard
- `src/pages/AlumniManagementPage.jsx` - Alumni CRUD
- `src/pages/TrackingAlumniPage.jsx` - Tracking

**Components**
- `src/components/` - Reusable UI components
- `src/styles/globals.css` - Global styles

## 5️⃣ Adding a New Feature (Example)

### Add a search feature untuk tracking

**Step 1**: Update `TrackingAlumniPage.jsx`
```jsx
const [searchQuery, setSearchQuery] = useState('');

// Filter tracking saat render
const filteredTracking = tracking.filter(t => 
  t.notes.toLowerCase().includes(searchQuery.toLowerCase())
);
```

**Step 2**: Add search input
```jsx
<Input
  placeholder="Cari tracking notes..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>
```

**Step 3**: Pass ke table
```jsx
<Table data={filteredTracking} columns={columns} />
```

## 6️⃣ Common Tasks

### Debug Mode
```javascript
// Di console browser
localStorage.getItem('alumni_data')
localStorage.getItem('tracking_data')
localStorage.getItem('current_user')
```

### Reset Data
```bash
# Di console browser
localStorage.clear()
location.reload()
```

### Check Validation
```javascript
import { validators } from './src/utils/validators'
validators.email('test@example.com') // Returns error message or null
```

### Format Data
```javascript
import { formatDate, getStatusName } from './src/utils/helpers'
formatDate('2024-01-15') // "15 Januari 2024"
getStatusName('aktif') // "Aktif"
```

## 7️⃣ Useful Commands

```bash
# Development
npm run dev              # Start dev server

# Production
npm run build            # Build untuk production
npm run preview          # Preview production build

# Code Quality
npm run lint            # Check code style

# Deployment
npm run build           # Prepare untuk deployment
```

## 8️⃣ Project Structure at a Glance

```
src/
├── components/    # Button, Input, Table, Modal, etc
├── pages/         # Login, Dashboard, Alumni, Tracking
├── context/       # Auth & Data state management
├── utils/         # Services, validators, helpers
└── styles/        # Global CSS & Tailwind
```

## 9️⃣ Important Concepts

### Context API (State Management)
- `AuthContext` - Current user & auth state
- `DataContext` - Alumni & tracking data

### localStorage (Data Persistence)
- `alumni_data` - Alumni records
- `tracking_data` - Tracking history
- `current_user` - Logged in user

### Validation
- Form validators di `utils/validators.js`
- Real-time error handling
- User-friendly messages

### Components Pattern
- Functional components with hooks
- Props-driven
- Self-contained & reusable

## 🔟 Next Steps

1. **Run aplikasi**: `npm run dev`
2. **Explore codebase**: Baca component files
3. **Test features**: Coba semua functionality
4. **Modify data**: Tambah/edit/hapus alumni
5. **Deploy**: Follow [DEPLOYMENT.md](DEPLOYMENT.md)

## 📚 Documentation

- [README.md](README.md) - Overview & features
- [DOKUMENTASI.md](DOKUMENTASI.md) - Detailed docs
- [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) - Folder organization
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contributing guide

## 💡 Tips

✅ Use React DevTools browser extension untuk debug
✅ Use localStorage tab di DevTools untuk lihat data
✅ Use Network tab untuk monitor API calls (future)
✅ Read comments di code untuk understanding
✅ Test di mobile dengan Chrome DevTools device emulation

## ❓ FAQ

**Q: Data tidak tersimpan?**
A: Cek console untuk errors, atau coba `localStorage.clear()` dan reload

**Q: Bagaimana cara membuat role baru?**
A: Edit `initializeStorage()` di `src/utils/storage.js`

**Q: Bagaimana cara menambah menu baru?**
A: Edit `Sidebar.jsx` dan tambahkan page baru

**Q: Bagaimana cara deploy?**
A: Lihat [DEPLOYMENT.md](DEPLOYMENT.md) untuk step-by-step

## 🚀 Ready to Code?

```bash
npm run dev
# Happy coding! 🎉
```

---

**Need help?** Check the documentation files atau buat issue di GitHub.
