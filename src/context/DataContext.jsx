import React, { createContext, useReducer, useCallback, useEffect } from 'react';
import { alumniService, trackingService } from '../utils/storage';
import { isSupabaseEnabled } from '../utils/supabase';

export const DataContext = createContext();

const initialState = {
  alumni: [],
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

  const addAlumni = useCallback(async (alumniData) => {
    dispatch({ type: 'SET_LOADING' });
    const result = isSupabaseEnabled ? await alumniService.addRemote(alumniData) : alumniService.add(alumniData);
    if (result.success) {
      dispatch({ type: 'ADD_ALUMNI', payload: result.data });
      return { success: true };
    } else {
      dispatch({ type: 'SET_ERROR', payload: result.error });
      return { success: false, error: result.error };
    }
  }, []);

  const updateAlumni = useCallback(async (id, alumniData) => {
    dispatch({ type: 'SET_LOADING' });
    const result = isSupabaseEnabled ? await alumniService.updateRemote(id, alumniData) : alumniService.update(id, alumniData);
    if (result.success) {
      dispatch({ type: 'UPDATE_ALUMNI', payload: result.data });
      return { success: true };
    } else {
      dispatch({ type: 'SET_ERROR', payload: result.error });
      return { success: false, error: result.error };
    }
  }, []);

  const deleteAlumni = useCallback(async (id) => {
    dispatch({ type: 'SET_LOADING' });
    const result = isSupabaseEnabled ? await alumniService.deleteRemote(id) : alumniService.delete(id);
    if (result.success) {
      dispatch({ type: 'DELETE_ALUMNI', payload: id });
      return { success: true };
    } else {
      dispatch({ type: 'SET_ERROR', payload: result.error });
      return { success: false, error: result.error };
    }
  }, []);

  const importAlumni = useCallback(async (records) => {
    dispatch({ type: 'SET_LOADING' });
    const result = isSupabaseEnabled ? await alumniService.importBatchRemote(records) : alumniService.importBatch(records);
    if (result.success) {
      const alumniData = isSupabaseEnabled
        ? (await alumniService.getAllRemote()).data
        : alumniService.getAll();
      dispatch({ type: 'SET_ALUMNI', payload: alumniData });
      return { success: true, summary: result.summary };
    } else {
      dispatch({ type: 'SET_ERROR', payload: result.error });
      return { success: false, error: result.error };
    }
  }, []);

  const syncLocalToSupabase = useCallback(async () => {
    if (!isSupabaseEnabled) {
      return { success: false, error: 'Supabase belum dikonfigurasi' };
    }

    dispatch({ type: 'SET_LOADING' });
    const localData = alumniService.getAll();
    const result = await alumniService.importBatchRemote(localData);
    if (result.success) {
      const alumniData = (await alumniService.getAllRemote()).data;
      dispatch({ type: 'SET_ALUMNI', payload: alumniData });
      return { success: true, summary: result.summary };
    }

    dispatch({ type: 'SET_ERROR', payload: result.error });
    return { success: false, error: result.error };
  }, []);

  const syncRemoteToLocal = useCallback(async () => {
    if (!isSupabaseEnabled) {
      return { success: false, error: 'Supabase belum dikonfigurasi' };
    }

    dispatch({ type: 'SET_LOADING' });
    const result = await alumniService.getAllRemote();
    if (result.success) {
      dispatch({ type: 'SET_ALUMNI', payload: result.data });
      return { success: true, data: result.data };
    }

    dispatch({ type: 'SET_ERROR', payload: result.error });
    return { success: false, error: result.error };
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

  const refreshData = useCallback(async () => {
    dispatch({ type: 'SET_LOADING' });

    const alumniResult = isSupabaseEnabled
      ? await alumniService.getAllRemote()
      : { success: true, data: alumniService.getAll() };

    if (alumniResult.success) {
      dispatch({ type: 'SET_ALUMNI', payload: alumniResult.data });
    } else {
      dispatch({ type: 'SET_ALUMNI', payload: alumniService.getAll() });
      dispatch({ type: 'SET_ERROR', payload: alumniResult.error });
    }

    dispatch({ type: 'SET_TRACKING', payload: trackingService.getAll() });
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const value = {
    ...state,
    addAlumni,
    updateAlumni,
    deleteAlumni,
    importAlumni,
    syncLocalToSupabase,
    syncRemoteToLocal,
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
