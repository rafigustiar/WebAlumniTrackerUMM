# 📋 Panduan Import Data Alumni ke Supabase - Step by Step

Panduan ini akan memandu kamu untuk import data alumni dari Excel ke Supabase dengan script.

---

## 🎯 STEP 1: Persiapkan File Excel

### 1.1 Buat/Siapkan File Excel
Pastikan file Excel sudah ada dengan nama misal: `alumni_data.xlsx`

### 1.2 Cek Header Kolom Excel
Buka file Excel dan pastikan ada kolom berikut (tidak perlu urutan sama):

**Kolom WAJIB:**
```
NIM (Nomor Induk Mahasiswa) - YANG PALING PENTING!
```

**Kolom yang Direkomendasikan:**
```
Nama Lulusan / Nama
Email
No HP / Phone
Tahun Masuk
Tanggal Lulus
Fakultas
Program Studi
Gender / Jenis Kelamin
Posisi
Tempat Bekerja
Alamat Bekerja
```

**Kolom Opsional (bisa kosong):**
```
LinkedIn
Instagram
Facebook
TikTok
Jenis Pekerjaan
Sosial Media Tempat Kerja
```

### 1.3 Contoh Data Excel yang Benar

Buka Excel dan pastikan data terlihat seperti ini:

```
NIM          | Nama Lulusan      | Email              | Tahun Masuk | Program Studi
-------------|-------------------|------------------|-------------|------------------
161810101    | Ahmad Rizki      | ahmad@email.com  | 2018       | Teknik Informatika
161810102    | Siti Nurhaliza   | siti@email.com   | 2018       | Sistem Informasi
161810103    | Budi Santoso     | budi@email.com   | 2019       | Teknik Informatika
```

### 1.4 Simpan File Excel
Pastikan file sudah disimpan dengan format `.xlsx` atau `.csv`

**Lokasi terbaik: Simpan di root folder project DailyProject3**
Contoh: `D:\Rekayasa Kebutuhan\DailyProject3\alumni_data.xlsx`

---

## 🔑 STEP 2: Verifikasi File .env

### 2.1 Buka File .env
Navigasi ke: `D:\Rekayasa Kebutuhan\DailyProject3\.env`

Pastikan isi file seperti ini:
```
VITE_SUPABASE_URL=https://plgyspkzwwsmpnsufwjz.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_gpAjeS_rQZOZCilmqItKLA_077MA23s
```

### 2.2 Jika .env Belum Ada atau Kosong
Buat file `.env` baru dan copy paste isi di atas dengan identyas Supabase kamu.

**Simpan file!**

---

## 💻 STEP 3: Buka Terminal

### 3.1 Buka Windows PowerShell atau Command Prompt
- Tekan `Win + R`
- Ketik `cmd` atau `powershell`
- Tekan Enter

### 3.2 Navigasi ke Folder Project
```bash
cd "D:\Rekayasa Kebutuhan\DailyProject3"
```

**Pastikan kamu sudah di folder project yang benar!**
- Jika berhasil, di terminal akan muncul: `D:\Rekayasa Kebutuhan\DailyProject3>`

---

## 📦 STEP 4: Install Dependencies (Jika Belum Ada)

### 4.1 Jalankan npm install
```bash
npm install
```

Tunggu sampai muncul pesan seperti:
```
added XX packages, audited XXX packages in XXs
```

---

## 🚀 STEP 5: Jalankan Script Import

### 5.1 Jalankan Script dengan Nama File
**PILIH SALAH SATU:**

**Opsi A: Menggunakan npm script (Lebih mudah)**
```bash
npm run import-alumni alumni_data.xlsx
```

**Opsi B: Menggunakan node langsung**
```bash
node import-alumni.js alumni_data.xlsx
```

### 5.2 Contoh Lengkap di Terminal
```
D:\Rekayasa Kebutuhan\DailyProject3> npm run import-alumni alumni_data.xlsx
```

Tekan **Enter** dan tunggu...

### 5.3 Output yang Akan Muncul

Jika berhasil, akan muncul:
```
📁 Membaca file: D:\Rekayasa Kebutuhan\DailyProject3\alumni_data.xlsx
✓ Ditemukan 500 baris data

📤 Mengimpor 500 data alumni ke Supabase...
⏳ Chunk 1/5 (100/500)
⏳ Chunk 2/5 (200/500)
⏳ Chunk 3/5 (300/500)
⏳ Chunk 4/5 (400/500)
⏳ Chunk 5/5 (500/500)

✅ Import selesai!

📊 Hasil Import:
   ✓ Ditambah/Diperbarui: 500
   ✗ Error: 0
```

**SELESAI! Data sudah masuk ke Supabase! 🎉**

---

## 🔍 STEP 6: Verifikasi Data di Supabase

### 6.1 Buka Supabase Dashboard
Buka browser dan ke: https://app.supabase.com

### 6.2 Login dan Pilih Project
- Login dengan akun Supabase kamu
- Pilih project UMM Alumni Tracker

### 6.3 Cek Tabel alumni
- Di sebelah kiri, klik `Tables`
- Pilih `alumni`
- Scroll dan pastikan data sudah masuk

**Contoh tampilan:**
```
ID | NIM      | Name               | Email              | Created At
---|----------|-------------------|-------------------|------------------
1  | 161810101| Ahmad Rizki      | ahmad@email.com  | 2024-01-15...
2  | 161810102| Siti Nurhaliza   | siti@email.com   | 2024-01-15...
3  | 161810103| Budi Santoso     | budi@email.com   | 2024-01-15...
```

---

## ⚠️ TROUBLESHOOTING

### ❌ Error: "VITE_SUPABASE_URL tidak ditemukan"

**Solusi:**
1. Pastikan file `.env` sudah ada di root project
2. Pastikan sudah save file `.env`
3. Buka terminal baru dan coba lagi

```bash
npm run import-alumni alumni_data.xlsx
```

### ❌ Error: "File tidak ditemukan: alumni_data.xlsx"

**Solusi:**
1. Pastikan nama file benar
2. Pastikan file ada di folder project yang sama dengan script
3. Coba dengan path absolut:

```bash
npm run import-alumni "D:\Rekayasa Kebutuhan\DailyProject3\alumni_data.xlsx"
```

### ❌ Error: "Gagal membaca file Excel"

**Solusi:**
1. Pastikan file Excel tidak corrupt (coba buka di Excel, pastikan OK)
2. Coba simpan ulang file Excel
3. Jika tetap error, ubah format ke CSV:
   - Buka file Excel
   - Save As → Format: CSV (Comma Separated Values)
   - Jalankan script lagi dengan file .csv

```bash
npm run import-alumni alumni_data.csv
```

### ❌ Terminal Error Lainnya

**Cek 3 hal ini:**
1. Apakah sudah `npm install`? → Coba jalankan lagi
2. Apakah file `.env` ada? → Buat/verifikasi ulang
3. Apakah path folder benar? → Cek dengan `pwd` (PowerShell) atau `cd`

---

## ✅ CHECKLIST SEBELUM IMPORT

Sebelum jalankan script, pastikan:

- [ ] File Excel sudah siap dengan kolom NIM
- [ ] File Excel disimpan di folder project
- [ ] File `.env` ada dan berisi Supabase keys
- [ ] Sudah buka terminal/PowerShell
- [ ] Sudah navigasi ke folder project (`cd D:\Rekayasa Kebutuhan\DailyProject3`)
- [ ] Sudah jalankan `npm install` minimal sekali
- [ ] Internet connection aktif (untuk akses Supabase)

---

## 📱 Selesai!

Setelah import berhasil:

1. **Data sudah ada di Supabase** - Bisa diakses oleh semua user yang login ke aplikasi
2. **Tidak perlu import ulang** - Data sudah permanent di Supabase (kecuali manual delete)
3. **Buka aplikasi Alumni Tracker** - Data akan otomatis muncul di halaman "Data Alumni"

---

## 💡 Tips Tambahan

### Untuk Import Berikutnya
Jika ada data baru dan perlu import lagi:
1. Buat file Excel baru dengan format yang sama
2. Jalankan script yang sama, tapi dengan nama file berbeda
3. Script otomatis akan update data yang sudah ada (berdasarkan NIM)

### Backup Data
Sebelum import data besar, rekomendasikan untuk:
1. Export data existing dari Supabase (jika ada)
2. Simpan backup lokal
3. Baru jalankan import

### Performance
- Untuk data < 1000 baris: Selesai dalam hitungan beberapa detik
- Untuk data 1000-10000 baris: Hitungan menit
- Untuk data > 10000 baris: Bisa lebih lama, tapi script akan handle dengan chunk otomatis

---

**Pertanyaan? Hubungi tim support atau cek IMPORT_GUIDE.md untuk info lebih detail!**
