import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Table = ({ columns, data, onEdit, onDelete, isLoading }) => {
  if (isLoading) {
    return (
      <div className="card text-center py-12">
        <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-600 mt-4">Memuat data...</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="card text-center py-12">
        <p className="text-gray-600 text-lg">Tidak ada data</p>
      </div>
    );
  }

  return (
    <div className="card overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            {columns.map(col => (
              <th
                key={col.key}
                className="px-4 py-3 text-left text-sm font-semibold text-gray-700"
              >
                {col.label}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Aksi
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={row.id || idx}
              className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
            >
              {columns.map(col => (
                <td
                  key={col.key}
                  className="px-4 py-3 text-sm text-gray-800"
                >
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="px-4 py-3 text-sm">
                  <div className="flex gap-2">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(row.id)}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        Edit
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(row.id)}
                        className="text-red-600 hover:text-red-800 font-medium text-sm"
                      >
                        Hapus
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="p-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 rounded-lg"
      >
        <ChevronLeft size={20} />
      </button>

      <div className="flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-lg font-medium transition-colors ${
              currentPage === page
                ? 'bg-primary text-white'
                : 'hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="p-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 rounded-lg"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};
