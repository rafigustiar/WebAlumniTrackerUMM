import React, { createContext, useReducer, useCallback } from 'react';
import { alumniService, trackingService } from '../utils/storage';

export const DataContext = createContext();

const initialState = {
  alumni: alumniService.getAll(),
  tracking: trackingService.getAll(),
  error: null,
  loading: false,
  success: null
};

const dataReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: true, error: null, success: null };
    case 'SET_ALUMNI':
      return { ...state, alumni: action.payload, loading: false };
    case 'SET_TRACKING':
      return { ...state, tracking: action.payload, loading: false };
    case 'ADD_ALUMNI':
      return {
        ...state,
        alumni: [...state.alumni, action.payload],
        loading: false,
        success: 'Alumni berhasil ditambahkan'
      };
    case 'UPDATE_ALUMNI':
      return {
        ...state,
        alumni: state.alumni.map(a => a.id === action.payload.id ? action.payload : a),
        loading: false,
        success: 'Alumni berhasil diperbarui'
      };
    case 'DELETE_ALUMNI':
      return {
        ...state,
        alumni: state.alumni.filter(a => a.id !== action.payload),
        loading: false,
        success: 'Alumni berhasil dihapus'
      };
    case 'ADD_TRACKING':
      return {
        ...state,
        tracking: [...state.tracking, action.payload],
        loading: false,
        success: 'Tracking berhasil ditambahkan'
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    case 'CLEAR_SUCCESS':
      return { ...state, success: null };
    default:
      return state;
  }
};

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const addAlumni = useCallback((alumniData) => {
    dispatch({ type: 'SET_LOADING' });
    const result = alumniService.add(alumniData);
    if (result.success) {
      dispatch({ type: 'ADD_ALUMNI', payload: result.data });
      return { success: true };
    } else {
      dispatch({ type: 'SET_ERROR', payload: result.error });
      return { success: false, error: result.error };
    }
  }, []);

  const updateAlumni = useCallback((id, alumniData) => {
    dispatch({ type: 'SET_LOADING' });
    const result = alumniService.update(id, alumniData);
    if (result.success) {
      dispatch({ type: 'UPDATE_ALUMNI', payload: result.data });
      return { success: true };
    } else {
      dispatch({ type: 'SET_ERROR', payload: result.error });
      return { success: false, error: result.error };
    }
  }, []);

  const deleteAlumni = useCallback((id) => {
    dispatch({ type: 'SET_LOADING' });
    const result = alumniService.delete(id);
    if (result.success) {
      dispatch({ type: 'DELETE_ALUMNI', payload: id });
      return { success: true };
    } else {
      dispatch({ type: 'SET_ERROR', payload: result.error });
      return { success: false, error: result.error };
    }
  }, []);

  const addTracking = useCallback((trackingData, currentUser) => {
    dispatch({ type: 'SET_LOADING' });
    const result = trackingService.add(trackingData, currentUser);
    if (result.success) {
      dispatch({ type: 'ADD_TRACKING', payload: result.data });
      return { success: true };
    } else {
      dispatch({ type: 'SET_ERROR', payload: result.error });
      return { success: false, error: result.error };
    }
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  const clearSuccess = useCallback(() => {
    dispatch({ type: 'CLEAR_SUCCESS' });
  }, []);

  const refreshData = useCallback(() => {
    dispatch({ type: 'SET_ALUMNI', payload: alumniService.getAll() });
    dispatch({ type: 'SET_TRACKING', payload: trackingService.getAll() });
  }, []);

  const value = {
    ...state,
    addAlumni,
    updateAlumni,
    deleteAlumni,
    addTracking,
    clearError,
    clearSuccess,
    refreshData
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook untuk menggunakan data context
export const useData = () => {
  const context = React.useContext(DataContext);
  if (!context) {
    throw new Error('useData harus digunakan dalam DataProvider');
  }
  return context;
};
