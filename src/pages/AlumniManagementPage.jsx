import React, { useState, useMemo } from 'react';
import { Plus, Search } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Button, Input, Select } from '../components/FormElements';
import { Table } from '../components/Table';
import { Modal, ConfirmDialog } from '../components/Modal';
import { Alert } from '../components/Alert';
import { Card } from '../components/Card';
import { formatDate } from '../utils/helpers';
import { validators, validateForm } from '../utils/validators';
import { alumniService } from '../utils/storage';

export const AlumniManagementPage = () => {
  const { alumni, addAlumni, updateAlumni, deleteAlumni, error, success, clearError, clearSuccess } = useData();
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
      result = updateAlumni(editingId, formValues);
    } else {
      result = addAlumni(formValues);
    }

    setIsLoadingForm(false);

    if (result.success) {
      setIsModalOpen(false);
      resetForm();
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

  const confirmDelete = () => {
    if (deleteId) {
      deleteAlumni(deleteId);
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
            <Button
              onClick={() => setIsModalOpen(true)}
              className="lg:w-auto"
            >
              <Plus size={18} />
              Tambah Alumni
            </Button>
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
