#!/usr/bin/env node

/**
 * Script Import Alumni ke Supabase
 * Usage: node import-alumni.js <path-to-excel-file>
 * Example: node import-alumni.js alumni_data.xlsx
 */

import xlsx from 'xlsx';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Error: VITE_SUPABASE_URL atau VITE_SUPABASE_PUBLISHABLE_KEY tidak ditemukan di .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const normalizeImportRow = (raw) => {
  const normalized = {};
  Object.entries(raw).forEach(([key, value]) => {
    const normalizedKey = key.trim().toLowerCase().replace(/\s+/g, '_');
    normalized[normalizedKey] = value;
  });

  const nim = String(normalized.nim || '').trim();
  const id = `alumni_${nim}_${Date.now()}_${Math.random().toString(16).slice(2)}`;

  return {
    id, // ← Tambah ID yang unique
    nim,
    name: String(normalized.nama_lulusan || normalized.nama || normalized.name || '').trim(),
    email: String(normalized.email || '').trim(),
    phone: String(normalized.no_hp || normalized.phone || '').trim(),
    graduation_year: normalized.tanggal_lulus
      ? new Date(normalized.tanggal_lulus).getFullYear()
      : normalized.tahun_masuk ? Number(normalized.tahun_masuk) : null,
    department: String(normalized.program_studi || normalized.fakultas || '').trim(),
    gender: String(normalized.gender || normalized.jenis_kelamin || '').trim(),
    current_position: String(normalized.posisi || '').trim(),
    company: String(normalized.tempat_bekerja || '').trim(),
    linkedin: String(normalized.linkedin || '').trim(),
    instagram: String(normalized.instagram || '').trim(),
    facebook: String(normalized.facebook || '').trim(),
    tiktok: String(normalized.tiktok || '').trim(),
    tempat_bekerja: String(normalized.tempat_bekerja || '').trim(),
    alamat_bekerja: String(normalized.alamat_bekerja || '').trim(),
    posisi: String(normalized.posisi || '').trim(),
    jenis_pekerjaan: String(normalized.jenis_pekerjaan || '').trim(),
    sosial_media_tempat_kerja: String(normalized.sosial_media_tempat_kerja || '').trim()
  };
};

const readExcelFile = (filePath) => {
  try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const rawData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: '' });
    return rawData.map(normalizeImportRow).filter((row) => row.nim);
  } catch (error) {
    throw new Error(`Gagal membaca file Excel: ${error.message}`);
  }
};

const importToSupabase = async (records) => {
  try {
    console.log(`\n📤 Mengimpor ${records.length} data alumni ke Supabase...`);

    const summary = {
      added: 0,
      updated: 0,
      skipped: 0,
      errors: []
    };

    // Split into chunks untuk avoid timeout pada data besar
    const chunkSize = 100;
    for (let i = 0; i < records.length; i += chunkSize) {
      const chunk = records.slice(i, i + chunkSize);
      const chunkNum = Math.floor(i / chunkSize) + 1;
      const totalChunks = Math.ceil(records.length / chunkSize);

      process.stdout.write(`\r⏳ Chunk ${chunkNum}/${totalChunks} (${Math.min(i + chunkSize, records.length)}/${records.length})`);

      // Insert/upsert dengan conflict handling berdasarkan NIM
      const { data, error } = await supabase
        .from('alumni')
        .upsert(chunk, { onConflict: 'nim', returning: 'representation' });

      if (error) {
        summary.errors.push(`Chunk ${chunkNum}: ${error.message}`);
      } else if (data) {
        summary.added += data.length;
      }
    }

    console.log(`\n✅ Import selesai!\n`);
    console.log(`📊 Hasil Import:`);
    console.log(`   ✓ Ditambah/Diperbarui: ${summary.added}`);
    console.log(`   ✗ Error: ${summary.errors.length}`);

    if (summary.errors.length > 0) {
      console.log(`\n⚠️  Error Details:`);
      summary.errors.forEach((err) => console.log(`   - ${err}`));
    }

    return summary;
  } catch (error) {
    throw new Error(`Gagal import ke Supabase: ${error.message}`);
  }
};

const main = async () => {
  const filePath = process.argv[2];

  if (!filePath) {
    console.error('❌ Usage: node import-alumni.js <path-to-excel-file>');
    console.error('   Example: node import-alumni.js alumni_data.xlsx');
    process.exit(1);
  }

  if (!fs.existsSync(filePath)) {
    console.error(`❌ File tidak ditemukan: ${filePath}`);
    process.exit(1);
  }

  try {
    console.log(`📁 Membaca file: ${path.resolve(filePath)}`);
    const records = readExcelFile(filePath);

    if (records.length === 0) {
      console.error('❌ Tidak ada data yang ditemukan di file Excel');
      process.exit(1);
    }

    console.log(`✓ Ditemukan ${records.length} baris data`);
    await importToSupabase(records);
  } catch (error) {
    console.error(`\n❌ Error: ${error.message}`);
    process.exit(1);
  }
};

main();
