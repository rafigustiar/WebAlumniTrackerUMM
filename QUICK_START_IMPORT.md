# 🚀 QUICK START - Import Data Alumni

## Command Cepat (Copy-Paste)

### 1️⃣ Navigasi ke Folder Project
```bash
cd "D:\Rekayasa Kebutuhan\DailyProject3"
```

### 2️⃣ Install Dependencies (Jalankan Sekali Saja)
```bash
npm install
```

### 3️⃣ Jalankan Import ⭐
**Ganti `alumni_data.xlsx` dengan nama file kamu:**

```bash
npm run import-alumni alumni_data.xlsx
```

---

## 📝 Persiapan File Excel (Checklist)

✅ File Excel siap di folder: `D:\Rekayasa Kebutuhan\DailyProject3\`
✅ Ada kolom `NIM` (paling penting!)
✅ Ada kolom `Nama Lulusan` / `Nama`
✅ Sudah di-save sebagai `.xlsx` atau `.csv`

---

## ✅ Hasil Sukses

Jika melihat output:
```
✅ Import selesai!
📊 Hasil Import:
   ✓ Ditambah/Diperbarui: XXX
```

**Data kamu sudah ada di Supabase! 🎉**

---

## ❌ Ada Error?

Jika ada error, cek:
1. Apakah file `.env` ada di root project?
2. Apakah sudah jalankan `npm install`?
3. Apakah nama file Excel benar?

---

## 📚 Dokumentasi Lengkap

Baca file berikut untuk info lebih detail:
- `PANDUAN_IMPORT_STEP_BY_STEP.md` - Panduan lengkap dengan detail
- `IMPORT_GUIDE.md` - Tips dan troubleshooting

---

**Selesai! Tinggal jalankan command di atas.** ✨
