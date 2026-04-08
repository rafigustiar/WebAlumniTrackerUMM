# 📖 Dokumentasi Lengkap Alumni Tracker UMM

## Table of Contents
1. [Instalasi & Setup](#instalasi--setup)
2. [Struktur Project](#struktur-project)
3. [Panduan Penggunaan](#panduan-penggunaan)
4. [API & Fungsi Utama](#api--fungsi-utama)
5. [Troubleshooting](#troubleshooting)

## Instalasi & Setup

### Requirements
- Node.js v14 atau lebih tinggi
- npm atau yarn

### Step-by-step Installation

```bash
# 1. Clone repository
git clone https://github.com/yourusername/alumni-tracker-umm.git
cd alumni-tracker-umm

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Buka browser dan akses http://localhost:3000
```

## Struktur Project

### Folder Organization

```
src/
├── components/       # Komponen reusable
├── pages/           # Halaman utama
├── context/         # State management
├── utils/           # Utility functions
├── styles/          # CSS files
├── App.jsx          # Root component
└── main.jsx         # Entry point
```

### Component Hierarchy

```
App
├── LoginPage
└── (setelah login)
    ├── Navbar
    ├── Sidebar
    └── Main Content
        ├── DashboardPage
        ├── AlumniManagementPage
        └── TrackingAlumniPage
```

## Panduan Penggunaan

### 1. Login

**Endpoint**: `/login`

**Demo Credentials**:
- Admin: `admin@umm.ac.id` / `admin123`
- Operator: `operator@umm.ac.id` / `operator123`

### 2. Dashboard

**Features**:
- Statistik alumni keseluruhan
- Progress tracking alumni
- Riwayat tracking terbaru
- Breakdown status alumni

### 3. Alumni Management

#### Tambah Alumni
```javascript
POST /api/alumni
{
  nim: "161810101",
  name: "Ahmad Rizki Pratama",
  email: "ahmad@email.com",
  phone: "081234567890",
  graduationYear: 2021,
  department: "Teknik Informatika",
  gender: "Laki-laki",
  currentPosition: "Software Developer",
  company: "PT Teknologi Maju"
}
```

#### Edit Alumni
```javascript
PUT /api/alumni/{id}
// Same structure as POST
```

#### Hapus Alumni
```javascript
DELETE /api/alumni/{id}
```

#### Cari Alumni
```javascript
GET /api/alumni?search=nama&year=2021
```

### 4. Tracking Alumni

#### Input Tracking
```javascript
POST /api/tracking
{
  alumniId: "1",
  status: "aktif",
  notes: "Alumni sudah dihubungi"
}
```

#### Status Types
- `belum-dihubungi` - Belum Dihubungi
- `dihubungi` - Dihubungi
- `aktif` - Aktif
- `tidak-aktif` - Tidak Aktif
- `tidak-ditemukan` - Tidak Ditemukan

#### Lihat Tracking History
```javascript
GET /api/tracking/{alumniId}
```

## API & Fungsi Utama

### Auth Service

```javascript
import { authService } from './utils/storage';

// Login
const result = authService.login('email@example.com', 'password');
// Returns: { success: true/false, data: userData, error: errorMessage }

// Logout
authService.logout();

// Get current user
const user = authService.getCurrentUser();

// Check if authenticated
const isAuth = authService.isAuthenticated();
```

### Alumni Service

```javascript
import { alumniService } from './utils/storage';

// Get all alumni
const allAlumni = alumniService.getAll();

// Get alumni by ID
const alumni = alumniService.getById('1');

// Add new alumni
const result = alumniService.add(alumniData);

// Update alumni
const result = alumniService.update('1', updatedData);

// Delete alumni
const result = alumniService.delete('1');

// Search alumni
const results = alumniService.search('nama');

// Filter alumni
const results = alumniService.filter({ year: 2021, department: 'TI' });
```

### Tracking Service

```javascript
import { trackingService } from './utils/storage';

// Get all tracking records
const allTracking = trackingService.getAll();

// Get tracking by alumni ID
const trackings = trackingService.getByAlumniId('1');

// Add tracking record
const result = trackingService.add(trackingData, currentUser);

// Get latest tracking
const latest = trackingService.getLatest('1');
```

### Validators

```javascript
import { validators, validateForm } from './utils/validators';

// Validate email
const error = validators.email('test@example.com');

// Validate NIM (9 digits)
const error = validators.nim('161810101');

// Validate all form fields
const errors = validateForm(formData, {
  nim: validators.nim,
  name: validators.name,
  email: validators.email
});
```

### Helpers

```javascript
import { 
  formatDate, 
  formatDateTime, 
  getRoleName,
  getStatusName,
  getStatusBadgeClass,
  calculateAlumniStats 
} from './utils/helpers';

// Format tanggal
const formatted = formatDate('2024-01-15'); // "15 Januari 2024"

// Format tanggal dan waktu
const formatted = formatDateTime('2024-01-15T10:30:00');

// Get role name
const roleName = getRoleName('admin'); // "Admin"

// Get status name
const statusName = getStatusName('aktif'); // "Aktif"

// Get CSS class untuk status badge
const cssClass = getStatusBadgeClass('aktif'); // "badge-success"

// Calculate statistics
const stats = calculateAlumniStats(alumni, tracking);
// Returns: { total, tracked, notTracked, active, inactive, notFound }
```

## Components

### Form Elements

```jsx
import { Button, Input, Select, TextArea } from './components/FormElements';

// Button
<Button variant="primary" size="md" fullWidth disabled isLoading>
  Submit
</Button>

// Input
<Input 
  label="Nama" 
  name="name"
  value={value}
  onChange={handleChange}
  error={error}
  required
/>

// Select
<Select
  label="Status"
  options={[{ value: 'aktif', label: 'Aktif' }]}
  error={error}
/>

// TextArea
<TextArea 
  label="Catatan"
  name="notes"
  value={value}
  onChange={handleChange}
/>
```

### Table

```jsx
import { Table, Pagination } from './components/Table';

const columns = [
  { key: 'name', label: 'Nama' },
  { key: 'email', label: 'Email', render: (row) => row.email.toLowerCase() }
];

<Table
  columns={columns}
  data={alumni}
  onEdit={(id) => handleEdit(id)}
  onDelete={(id) => handleDelete(id)}
  isLoading={loading}
/>
```

### Modal & Dialogs

```jsx
import { Modal, ConfirmDialog } from './components/Modal';

// Modal
<Modal
  isOpen={isOpen}
  title="Edit Alumni"
  onClose={handleClose}
  onSubmit={handleSubmit}
  submitText="Simpan"
>
  {/* Content */}
</Modal>

// Confirm Dialog
<ConfirmDialog
  isOpen={isOpen}
  title="Hapus Alumni?"
  message="Apakah Anda yakin?"
  onConfirm={handleConfirm}
  onCancel={handleCancel}
  isDangerous
/>
```

### Cards

```jsx
import { Card, StatCard, LoadingSpinner, EmptyState } from './components/Card';

<StatCard label="Total Alumni" value={100} color="blue" />

<Card title="Recent Tracking">
  {/* Content */}
</Card>

<LoadingSpinner message="Loading..." />

<EmptyState message="Tidak ada data" icon="📭" />
```

## Troubleshooting

### Aplikasi tidak berjalan

**Problem**: Port 3000 sudah terpakai
```bash
# Solution: Gunakan port berbeda
npm run dev -- --port 3001
```

### Data tidak tersimpan

**Problem**: localStorage tidak berfungsi di browser
```javascript
// Check if localStorage available
console.log(typeof(Storage));
```

### Form validation tidak bekerja

**Problem**: Pastikan validator imported dengan benar
```javascript
import { validateForm } from './utils/validators';
```

### Login tidak berhasil

**Problem**: Cek database default user
```javascript
// Reset localStorage
localStorage.clear();
// Reload aplikasi
```

## Best Practices

1. **Naming Convention**
   - Components: PascalCase (`AlumniCard.jsx`)
   - Functions: camelCase (`handleSubmit`)
   - Constants: UPPER_SNAKE_CASE (`API_URL`)
   - Files: PascalCase untuk component

2. **State Management**
   - Gunakan Context API untuk global state
   - Gunakan useState untuk local component state
   - Gunakan useReducer untuk complex state logic

3. **Performance**
   - Gunakan useMemo untuk expensive calculations
   - Gunakan useCallback untuk event handlers
   - Lazy load pages jika diperlukan

4. **Error Handling**
   - Always validate user input
   - Provide meaningful error messages
   - Handle network errors gracefully
   - Log errors untuk debugging

5. **Code Style**
   - Use eslint untuk code quality
   - Format code dengan prettier
   - Write meaningful comments
   - Keep functions small and focused

## Development Tips

### Debug aplikasi
```javascript
// Enable debug mode di console
console.log('Debug info:', state);

// Check localStorage
console.log(localStorage.getItem('alumni_data'));
```

### Testing di berbagai device
```bash
# Build dan preview production
npm run build
npm run preview
```

## FAQ

**Q: Bagaimana cara export data?**
A: Saat ini belum tersedia, tetapi dapat ditambahkan di future release dengan fitur export ke Excel/PDF.

**Q: Apakah data aman di localStorage?**
A: Untuk demo yes, tetapi untuk production sebaiknya gunakan backend dengan database yang aman.

**Q: Bagaimana cara menambah role pengguna baru?**
A: Edit file `src/utils/storage.js` di bagian `initializeStorage()` untuk menambah user baru.

---

Last updated: April 2024
