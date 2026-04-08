import React, { useState, useMemo } from 'react';
import { Plus, Search } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Button, Input, Select, TextArea } from '../components/FormElements';
import { Table } from '../components/Table';
import { Modal } from '../components/Modal';
import { Alert } from '../components/Alert';
import { Card } from '../components/Card';
import { formatDateTime, getStatusName, getStatusBadgeClass } from '../utils/helpers';
import { validators, validateForm } from '../utils/validators';
import { trackingService } from '../utils/storage';

export const TrackingAlumniPage = () => {
  const { alumni, tracking, addTracking, error, success, clearError, clearSuccess } = useData();
  const { user } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAlumniId, setSelectedAlumniId] = useState('');
  const [detailView, setDetailView] = useState(null);
  const [isLoadingForm, setIsLoadingForm] = useState(false);

  // Form state
  const [formValues, setFormValues] = useState({
    alumniId: '',
    status: 'belum-dihubungi',
    notes: ''
  });

  const [formErrors, setFormErrors] = useState({});

  // Filter alumni untuk dropdown
  const filteredAlumniOptions = useMemo(() => {
    const tracked = new Set(tracking.map(t => t.alumniId));
    return alumni
      .filter(a => {
        const matches = a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.nim.includes(searchQuery);
        // Untuk operator, tampilkan semua
        // Untuk admin, bisa filter jika diperlukan
        return matches;
      })
      .map(a => ({
        value: a.id,
        label: `${a.nim} - ${a.name}`,
        isTracked: tracked.has(a.id)
      }));
  }, [alumni, searchQuery, tracking]);

  // Get tracking history untuk alumni
  const getAlumniTracking = (alumniId) => {
    return tracking
      .filter(t => t.alumniId === alumniId)
      .sort((a, b) => new Date(b.trackedAt) - new Date(a.trackedAt));
  };

  // Handle form change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validation rules
  const validationRules = {
    alumniId: (val) => !val ? 'Alumni harus dipilih' : null,
    status: validators.status,
    notes: (val) => !val ? 'Catatan tidak boleh kosong' : null
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e?.preventDefault?.();

    const errors = validateForm(formValues, validationRules);
    if (errors) {
      setFormErrors(errors);
      return;
    }

    setIsLoadingForm(true);
    const result = addTracking(formValues, user);
    setIsLoadingForm(false);

    if (result.success) {
      setIsModalOpen(false);
      resetForm();
    }
  };

  // Reset form
  const resetForm = () => {
    setFormValues({
      alumniId: '',
      status: 'belum-dihubungi',
      notes: ''
    });
    setFormErrors({});
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    resetForm();
  };

  // Status options
  const statusOptions = [
    { value: 'belum-dihubungi', label: 'Belum Dihubungi' },
    { value: 'dihubungi', label: 'Dihubungi' },
    { value: 'aktif', label: 'Aktif' },
    { value: 'tidak-aktif', label: 'Tidak Aktif' },
    { value: 'tidak-ditemukan', label: 'Tidak Ditemukan' }
  ];

  // Columns untuk tracking table
  const trackingColumns = [
    {
      key: 'alumniId',
      label: 'Alumni',
      render: (row) => alumni.find(a => a.id === row.alumniId)?.name || 'Unknown'
    },
    { key: 'status', label: 'Status', render: (row) => <span className={getStatusBadgeClass(row.status)}>{getStatusName(row.status)}</span> },
    {
      key: 'trackedAt',
      label: 'Tanggal',
      render: (row) => formatDateTime(row.trackedAt)
    },
    {
      key: 'trackedBy',
      label: 'Ditrack oleh',
      render: (row) => row.trackedBy
    }
  ];

  const isOperator = user?.role === 'operator' || user?.role === 'admin';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tracking Alumni</h1>
        <p className="text-gray-600">Kelola status dan riwayat pelacakan alumni</p>
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
              placeholder="Cari alumni..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          {isOperator && (
            <Button onClick={() => setIsModalOpen(true)} className="lg:w-auto">
              <Plus size={18} />
              Input Tracking
            </Button>
          )}
        </div>
      </Card>

      {/* Tracking Records */}
      <Table
        columns={trackingColumns}
        data={tracking.sort((a, b) => new Date(b.trackedAt) - new Date(a.trackedAt))}
        onEdit={(id) => {
          const track = tracking.find(t => t.id === id);
          if (track) setDetailView(track.alumniId);
        }}
      />

      {/* Modal Form */}
      <Modal
        isOpen={isModalOpen}
        title="Input Hasil Pelacakan Alumni"
        onClose={handleModalClose}
        onSubmit={handleSubmit}
        submitText="Simpan Tracking"
        isLoading={isLoadingForm}
      >
        <div className="space-y-4">
          <Select
            label="Alumni"
            name="alumniId"
            value={formValues.alumniId}
            onChange={handleFormChange}
            options={[
              { value: '', label: 'Pilih Alumni' },
              ...filteredAlumniOptions
            ]}
            error={formErrors.alumniId}
            required
          />

          <Select
            label="Status Tracking"
            name="status"
            value={formValues.status}
            onChange={handleFormChange}
            options={statusOptions}
            error={formErrors.status}
            required
          />

          <TextArea
            label="Catatan"
            name="notes"
            value={formValues.notes}
            onChange={handleFormChange}
            placeholder="Masukkan catatan tracking alumni..."
            error={formErrors.notes}
            required
          />

          {formValues.alumniId && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <strong>Riwayat Tracking Sebelumnya:</strong>
              </p>
              <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
                {getAlumniTracking(formValues.alumniId).length === 0 ? (
                  <p className="text-sm text-blue-800">Belum ada riwayat tracking</p>
                ) : (
                  getAlumniTracking(formValues.alumniId).slice(0, 3).map((track) => (
                    <div key={track.id} className="text-sm text-blue-800 pb-2 border-b border-blue-200 last:border-0">
                      <div className="flex justify-between">
                        <span className="font-medium">{getStatusName(track.status)}</span>
                        <span className="text-xs">{formatDateTime(track.trackedAt)}</span>
                      </div>
                      <p className="text-xs mt-1">{track.notes}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* Detail View Modal */}
      {detailView && (
        <Modal
          isOpen={true}
          title={`Detail Alumni - ${alumni.find(a => a.id === detailView)?.name}`}
          onClose={() => setDetailView(null)}
        >
          <div className="space-y-6">
            {/* Alumni Info */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Data Alumni</h3>
              <div className="grid grid-cols-2 gap-4">
                {alumni.find(a => a.id === detailView) && (() => {
                  const alum = alumni.find(a => a.id === detailView);
                  return (
                    <>
                      <div>
                        <p className="text-sm text-gray-600">NIM</p>
                        <p className="font-medium text-gray-900">{alum.nim}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium text-gray-900">{alum.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Nomor Telepon</p>
                        <p className="font-medium text-gray-900">{alum.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Tahun Lulus</p>
                        <p className="font-medium text-gray-900">{alum.graduationYear}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Departemen</p>
                        <p className="font-medium text-gray-900">{alum.department}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Perusahaan</p>
                        <p className="font-medium text-gray-900">{alum.company}</p>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>

            {/* Tracking History */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Riwayat Tracking</h3>
              {getAlumniTracking(detailView).length === 0 ? (
                <p className="text-gray-600">Belum ada riwayat tracking</p>
              ) : (
                <div className="space-y-3">
                  {getAlumniTracking(detailView).map((track) => (
                    <div key={track.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <span className={`${getStatusBadgeClass(track.status)}`}>
                          {getStatusName(track.status)}
                        </span>
                        <span className="text-xs text-gray-500">{formatDateTime(track.trackedAt)}</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{track.notes}</p>
                      <p className="text-xs text-gray-500">Ditrack oleh: {track.trackedBy}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
