import React, { useState, useMemo } from 'react';
import { Plus, Cloud, RefreshCcw } from 'lucide-react';
import * as XLSX from 'xlsx';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { isSupabaseEnabled } from '../utils/supabase';
import { Button, Input, Select } from '../components/FormElements';
import { Table } from '../components/Table';
import { Modal, ConfirmDialog } from '../components/Modal';
import { Alert } from '../components/Alert';
import { Card } from '../components/Card';
import { formatDate } from '../utils/helpers';
import { validators, validateForm } from '../utils/validators';

export const AlumniManagementPage = () => {
  const { alumni, addAlumni, updateAlumni, deleteAlumni, importAlumni, syncLocalToSupabase, syncRemoteToLocal, error, success, clearError, clearSuccess } = useData();
  const { user } = useAuth();

  // State untuk form
  const [searchQuery, setSearchQuery] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [isLoadingForm, setIsLoadingForm] = useState(false);

  // Initial form values
  const initialFormValues = {
    nim: '',
    name: '',
    email: '',
    phone: '',
    graduationYear: new Date().getFullYear(),
    department: '',
    gender: 'Laki-laki',
    currentPosition: '',
    company: ''
  };

  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState({});
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [importFile, setImportFile] = useState(null);
  const [importError, setImportError] = useState('');
  const [importSummary, setImportSummary] = useState(null);
  const [isImportLoading, setIsImportLoading] = useState(false);
  const [syncError, setSyncError] = useState('');
  const [syncSummary, setSyncSummary] = useState(null);
  const [isSyncLoading, setIsSyncLoading] = useState(false);

  // Filter dan search alumni
  const filteredAlumni = useMemo(() => {
    let result = alumni;

    if (searchQuery) {
      const lower = searchQuery.toLowerCase();
      result = result.filter(a =>
        a.name.toLowerCase().includes(lower) ||
        a.nim.includes(searchQuery) ||
        a.email.toLowerCase().includes(lower)
      );
    }

    if (filterYear) {
      result = result.filter(a => a.graduationYear === parseInt(filterYear));
    }

    return result;
  }, [alumni, searchQuery, filterYear]);

  // Handle form change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error untuk field ini
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validation rules
  const validationRules = {
    nim: validators.nim,
    name: validators.name,
    email: validators.email,
    phone: validators.phone,
    graduationYear: validators.graduationYear,
    department: (val) => !val ? 'Departemen tidak boleh kosong' : null,
    currentPosition: (val) => !val ? 'Posisi saat ini tidak boleh kosong' : null,
    company: (val) => !val ? 'Perusahaan tidak boleh kosong' : null
  };

  // Handle submit form
  const handleSubmitForm = async (e) => {
    e?.preventDefault?.();

    // Validate
    const errors = validateForm(formValues, validationRules);
    if (errors) {
      setFormErrors(errors);
      return;
    }

    setIsLoadingForm(true);
    let result;

    if (editingId) {
      result = await updateAlumni(editingId, formValues);
    } else {
      result = await addAlumni(formValues);
    }

    setIsLoadingForm(false);

    if (result.success) {
      setIsModalOpen(false);
      resetForm();
    }
  };

  const normalizeImportRow = (raw) => {
    const normalized = {};
    Object.entries(raw).forEach(([key, value]) => {
      const normalizedKey = key.trim().toLowerCase().replace(/\s+/g, '_');
      normalized[normalizedKey] = value;
    });

    return {
      name: normalized.nama_lulusan || normalized.nama || normalized.name || '',
      nim: normalized.nim || '',
      tahun_masuk: normalized.tahun_masuk || normalized.tahun_masuk || '',
      tanggal_lulus: normalized.tanggal_lulus || normalized.tanggal_lulus || '',
      fakultas: normalized.fakultas || '',
      program_studi: normalized.program_studi || normalized.program_studi || '',
      linkedin: normalized.linkedin || '',
      instagram: normalized.instagram || '',
      facebook: normalized.facebook || '',
      tiktok: normalized.tiktok || '',
      email: normalized.email || '',
      no_hp: normalized.no_hp || normalized['no hp'] || '',
      tempat_bekerja: normalized.tempat_bekerja || normalized['tempat bekerja'] || '',
      alamat_bekerja: normalized.alamat_bekerja || normalized['alamat bekerja'] || '',
      posisi: normalized.posisi || '',
      jenis_pekerjaan: normalized.jenis_pekerjaan || normalized['jenis pekerjaan'] || '',
      sosial_media_tempat_kerja: normalized.sosial_media_tempat_kerja || normalized['sosial media tempat kerja'] || ''
    };
  };

  const parseCsvRow = (row) => {
    const values = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < row.length; i += 1) {
      const char = row[i];
      if (char === '"') {
        if (inQuotes && row[i + 1] === '"') {
          current += '"';
          i += 1;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        values.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current);
    return values;
  };

  const parseCsvText = (text) => {
    const rows = text.split(/\r\n|\n/).filter((line) => line.trim() !== '');
    if (rows.length === 0) return [];

    const headers = parseCsvRow(rows[0]).map((header) => header.trim().toLowerCase().replace(/\s+/g, '_'));
    return rows.slice(1).map((row) => {
      const values = parseCsvRow(row);
      const raw = {};
      headers.forEach((header, index) => {
        raw[header] = values[index] ? values[index].trim() : '';
      });
      return normalizeImportRow(raw);
    });
  };

  const readFileAsText = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file, 'UTF-8');
  });

  const readFileAsArrayBuffer = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });

  const handleImportFileChange = (e) => {
    setImportError('');
    setImportSummary(null);
    const file = e.target.files?.[0];
    if (!file) {
      setImportFile(null);
      return;
    }

    const extension = file.name.split('.').pop().toLowerCase();
    if (!['csv', 'xlsx', 'xls'].includes(extension)) {
      setImportError('File harus berformat CSV atau Excel (.csv, .xlsx, .xls)');
      setImportFile(null);
      return;
    }

    setImportFile(file);
  };

  const handleImportSubmit = async () => {
    if (!importFile) {
      setImportError('Silakan pilih file CSV atau Excel terlebih dahulu.');
      return;
    }

    setIsImportLoading(true);
    setImportError('');
    setImportSummary(null);

    try {
      let records = [];
      const extension = importFile.name.split('.').pop().toLowerCase();

      if (extension === 'csv') {
        const text = await readFileAsText(importFile);
        records = parseCsvText(text);
      } else {
        const arrayBuffer = await readFileAsArrayBuffer(importFile);
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const rawData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: '' });
        records = rawData.map(normalizeImportRow);
      }

      if (records.length === 0) {
        setImportError('Tidak ada baris data yang ditemukan di file. Pastikan file memiliki header dan data.');
        return;
      }

      const result = await importAlumni(records);
      if (result.success) {
        setImportSummary(result.summary);
        setIsImportOpen(false);
        setImportFile(null);
      } else {
        setImportError(result.error || 'Gagal mengimpor data alumni.');
      }
    } catch (error) {
      setImportError(error.message || 'Terjadi kesalahan saat memproses file import.');
    } finally {
      setIsImportLoading(false);
    }
  };

  const handleSyncSupabase = async () => {
    if (!isSupabaseEnabled) {
      setSyncError('Supabase belum dikonfigurasi. Periksa file .env dan ulangi.');
      return;
    }

    setIsSyncLoading(true);
    setSyncError('');
    setSyncSummary(null);

    try {
      const result = await syncLocalToSupabase();
      if (result.success) {
        setSyncSummary(`Sinkron berhasil: ${result.summary.added} baru, ${result.summary.updated} diperbarui, ${result.summary.skipped} dilewati.`);
      } else {
        setSyncError(result.error || 'Gagal sinkronisasi Supabase.');
      }
    } catch (error) {
      setSyncError(error.message || 'Terjadi kesalahan saat sinkronisasi Supabase.');
    } finally {
      setIsSyncLoading(false);
    }
  };

  // Handle edit
  const handleEdit = (id) => {
    const alum = alumni.find(a => a.id === id);
    if (alum) {
      setFormValues({
        nim: alum.nim,
        name: alum.name,
        email: alum.email,
        phone: alum.phone,
        graduationYear: alum.graduationYear,
        department: alum.department,
        gender: alum.gender,
        currentPosition: alum.currentPosition,
        company: alum.company
      });
      setEditingId(id);
      setIsModalOpen(true);
    }
  };

  // Handle delete
  const handleDelete = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (deleteId) {
      await deleteAlumni(deleteId);
      setDeleteId(null);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormValues(initialFormValues);
    setFormErrors({});
    setEditingId(null);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    resetForm();
  };

  // Columns untuk table
  const columns = [
    { key: 'nim', label: 'NIM' },
    { key: 'name', label: 'Nama' },
    { key: 'email', label: 'Email' },
    { key: 'graduationYear', label: 'Tahun Lulus' },
    { key: 'department', label: 'Departemen' },
    {
      key: 'currentPosition',
      label: 'Posisi Saat Ini'
    }
  ];

  // Get available years
  const years = Array.from({ length: 10 }, (_, i) => {
    const year = new Date().getFullYear() - i;
    return { value: year, label: year };
  });

  const canEdit = user?.role === 'admin' || user?.role === 'operator';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Data Alumni</h1>
        <p className="text-gray-600">Kelola data alumni kampus</p>
      </div>

      {/* Alerts */}
      {error && <Alert type="error" message={error} onClose={clearError} />}
      {success && <Alert type="success" message={success} onClose={clearSuccess} />}
      {importSummary && (
        <Alert
          type="success"
          message={`Import selesai: ${importSummary.added} ditambah, ${importSummary.updated} diperbarui, ${importSummary.skipped} dilewati.`}
          onClose={() => setImportSummary(null)}
        />
      )}
      {syncSummary && (
        <Alert
          type="success"
          message={syncSummary}
          onClose={() => setSyncSummary(null)}
        />
      )}
      {syncError && (
        <Alert
          type="error"
          message={syncError}
          onClose={() => setSyncError('')}
        />
      )}

      {/* Toolbar */}
      <Card>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Cari nama, NIM, atau email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <Select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            options={[
              { value: '', label: 'Semua Tahun' },
              ...years
            ]}
            className="lg:w-48"
          />
          {canEdit && (
            <div className="flex flex-wrap gap-2">
              {isSupabaseEnabled && (
                <Button
                  variant="ghost"
                  onClick={handleSyncSupabase}
                  className="lg:w-auto"
                  isLoading={isSyncLoading}
                >
                  <RefreshCcw size={18} />
                  Sinkron Supabase
                </Button>
              )}
              <Button
                variant="secondary"
                onClick={() => setIsImportOpen(true)}
                className="lg:w-auto"
              >
                <Cloud size={18} />
                Import CSV/Excel
              </Button>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="lg:w-auto"
              >
                <Plus size={18} />
                Tambah Alumni
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Table */}
      <Table
        columns={columns}
        data={filteredAlumni}
        onEdit={canEdit ? handleEdit : null}
        onDelete={canEdit ? handleDelete : null}
      />

      {/* Modal Form */}
      <Modal
        isOpen={isModalOpen}
        title={editingId ? 'Edit Data Alumni' : 'Tambah Data Alumni'}
        onClose={handleModalClose}
        onSubmit={handleSubmitForm}
        submitText={editingId ? 'Update' : 'Tambah'}
        isLoading={isLoadingForm}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="NIM"
            name="nim"
            value={formValues.nim}
            onChange={handleFormChange}
            placeholder="161810101"
            error={formErrors.nim}
            required
          />
          <Input
            label="Nama"
            name="name"
            value={formValues.name}
            onChange={handleFormChange}
            placeholder="Ahmad Rizki Pratama"
            error={formErrors.name}
            required
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={formValues.email}
            onChange={handleFormChange}
            placeholder="alumni@email.com"
            error={formErrors.email}
            required
          />
          <Input
            label="Nomor Telepon"
            name="phone"
            value={formValues.phone}
            onChange={handleFormChange}
            placeholder="081234567890"
            error={formErrors.phone}
            required
          />
          <Select
            label="Tahun Kelulusan"
            name="graduationYear"
            value={formValues.graduationYear}
            onChange={handleFormChange}
            options={years}
            error={formErrors.graduationYear}
            required
          />
          <Input
            label="Departemen"
            name="department"
            value={formValues.department}
            onChange={handleFormChange}
            placeholder="Teknik Informatika"
            error={formErrors.department}
            required
          />
          <Select
            label="Jenis Kelamin"
            name="gender"
            value={formValues.gender}
            onChange={handleFormChange}
            options={[
              { value: 'Laki-laki', label: 'Laki-laki' },
              { value: 'Perempuan', label: 'Perempuan' }
            ]}
          />
          <Input
            label="Posisi Saat Ini"
            name="currentPosition"
            value={formValues.currentPosition}
            onChange={handleFormChange}
            placeholder="Software Developer"
            error={formErrors.currentPosition}
            required
          />
          <div className="md:col-span-2">
            <Input
              label="Perusahaan"
              name="company"
              value={formValues.company}
              onChange={handleFormChange}
              placeholder="PT Teknologi Maju"
              error={formErrors.company}
              required
            />
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isImportOpen}
        title="Import Data Alumni"
        onClose={() => setIsImportOpen(false)}
        onSubmit={handleImportSubmit}
        submitText="Import"
        isLoading={isImportLoading}
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Unggah file CSV atau Excel. Header yang dibaca:
            <strong className="block">Nama Lulusan, NIM, Tahun Masuk, Tanggal Lulus, Fakultas, Program Studi</strong>
          </p>
          <Input
            label="Pilih file"
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleImportFileChange}
            error={importError}
          />
          {importFile && (
            <p className="text-sm text-slate-600">File terpilih: {importFile.name}</p>
          )}
          <div className="rounded-lg bg-blue-50 border border-blue-100 p-4 text-sm text-slate-700">
            <p className="font-semibold mb-2">Catatan import:</p>
            <ul className="list-disc ml-5 space-y-1">
              <li>Jika NIM sudah ada, data akan diperbarui secara aman.</li>
              <li>Data tambahan seperti linkedin, instagram, facebook, tiktok, email, no_hp, tempat_bekerja, alamat_bekerja, posisi, jenis_pekerjaan, sosial_media_tempat_kerja akan disimpan sebagai string kosong jika tidak tersedia.</li>
              <li>Duplikat berdasarkan NIM ditangani otomatis.</li>
            </ul>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteId}
        title="Hapus Alumni"
        message="Apakah Anda yakin ingin menghapus data alumni ini? Tindakan ini tidak dapat dibatalkan."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
        confirmText="Hapus"
        isDangerous
      />
    </div>
  );
};
