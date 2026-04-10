# Import Alumni to Supabase - Script Guide

Script ini memungkinkan kamu untuk import data alumni dalam jumlah besar langsung ke Supabase tanpa melalui web UI.

## Persiapan

### 1. Verifikasi File `.env`
Pastikan file `.env` di root project sudah berisi:
```
VITE_SUPABASE_URL=https://plgyspkzwwsmpnsufwjz.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_gpAjeS_rQZOZCilmqItKLA_077MA23s
```

### 2. Siapkan File Excel/CSV
File harus memiliki header yang sesuai. Contoh kolom:
- `Nama Lulusan` atau `Nama` atau `Name`
- `NIM` ⭐ (wajib, digunakan sebagai primary key)
- `Tahun Masuk` atau `Tahun Lulus`
- `Tanggal Lulus`
- `Fakultas`
- `Program Studi`
- `Email`
- `No HP` atau `Phone`
- `Gender` atau `Jenis Kelamin`
- `Posisi` (pekerjaan)
- `Tempat Bekerja`
- `Alamat Bekerja`
- `LinkedIn`
- `Instagram`
- `Facebook`
- `TikTok`
- `Jenis Pekerjaan`
- `Sosial Media Tempat Kerja`

## Cara Menggunakan

### Opsi 1: Menggunakan npm script
```bash
npm run import-alumni alumni_data.xlsx
```

### Opsi 2: Menggunakan node langsung
```bash
node import-alumni.js alumni_data.xlsx
```

### Contoh
```bash
node import-alumni.js ./data/alumni_2024.xlsx
node import-alumni.js alumni.csv
```

## Fitur

✅ **Baca Excel (.xlsx, .xls) dan CSV**
✅ **Mapping Kolom Otomatis** - Header kolom tidak perlu exact match
✅ **Deduplikasi berdasarkan NIM** - Jika NIM sudah ada, data akan di-update (bukan ditambah baru)
✅ **Import dalam Chunk** - Untuk data besar, dibagi ke chunk 100 baris agar tidak timeout
✅ **Progress Indicator** - Tampil status import real-time
✅ **Error Reporting** - Laporkan error per chunk jika ada

## Output Contoh

```
📁 Membaca file: D:\alumni_data.xlsx
✓ Ditemukan 5000 baris data

📤 Mengimpor 5000 data alumni ke Supabase...
⏳ Chunk 1/50 (100/5000)
⏳ Chunk 2/50 (200/5000)
...
⏳ Chunk 50/50 (5000/5000)

✅ Import selesai!

📊 Hasil Import:
   ✓ Ditambah/Diperbarui: 5000
   ✗ Error: 0
```

## Troubleshooting

### Error: VITE_SUPABASE_URL atau VITE_SUPABASE_PUBLISHABLE_KEY tidak ditemukan
- Pastikan file `.env` sudah ada di root project
- Pastikan sudah jalankan `npm install`

### Error: File tidak ditemukan
- Pastikan path file benar (gunakan path absolut atau relatif dari root project)
- Contoh: `node import-alumni.js ./data/alumni.xlsx`

### Error: Gagal membaca file Excel
- Pastikan file Excel tidak corrupt
- Coba konversi ke CSV dan impor lagi: `node import-alumni.js alumni.csv`

### Import lambat/timeout
Script sudah menggunakan chunk size 100. Jika tetap lambat:
- Pastikan internet connection stabil
- Reduce jumlah kolom di Excel (hapus kolom kosong yang tidak perlu)

## Tips

1. **Backup Data Lama** - Sebelum import massal, pastikan sudah backup data di Supabase
   - Login ke Supabase dashboard dan download existing data jika perlu

2. **Test dengan Sedikit Data Dulu** - Import 10-20 baris dulu untuk verifikasi mapping kolom

3. **NIM Harus Unique** - Setiap baris NIM harus unik. Jika ada duplikat di file, hanya baris terakhir yang akan disimpan

4. **Kolom Optional** - Kalau beberapa kolom tidak ada di file Excel, akan otomatis di-set kosong

## Contoh File Excel yang Benar

| NIM | Nama Lulusan | Email | Tahun Masuk | Tanggal Lulus | Fakultas | Program Studi | Posisi | Tempat Bekerja |
|------|---|---|---|---|---|---|---|---|
| 161810101 | Ahmad Rizki | ahmad@email.com | 2018 | 2021-06-01 | FT | Teknik Informatika | Software Dev | PT ABC |
| 161810102 | Siti Nur | siti@email.com | 2018 | 2021-06-01 | FMIPA | Sistem Informasi | Analyst | PT XYZ |

## Support

Jika ada pertanyaan atau error, cek:
- Supabase dashboard: https://app.supabase.com
- Status tabel `alumni` di Supabase
- Logs output dari script import
