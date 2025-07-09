import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

const StateSelect = ({ countryCode, selectedState, onStateChange, className = '' }) => {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!countryCode) {
      setStates([]);
      return;
    }

    const fetchStates = async () => {
      setLoading(true);
      setError('');
      
      try {
        console.log('Fetching states for country code:', countryCode);
        const cleanCountryCode = typeof countryCode === 'string' ? countryCode.replace('+', '') : countryCode;
        const response = await axios.get(`/country/${cleanCountryCode}/states`);
        console.log('States response:', response.data);
        setStates(response.data.states);
      } catch (err) {
        console.error('Error fetching states:', err);
        console.error('Error response:', err.response?.data);
        setError('No se pudieron cargar los estados');
        setStates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStates();
  }, [countryCode]);

  if (!countryCode) {
    return null;
  }

  if (loading) {
    return (
      <select className={`form-select ${className}`} disabled>
        <option>Cargando estados...</option>
      </select>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-sm mb-2">
        {error}
      </div>
    );
  }

  return (
    <select
      className={`form-select ${className}`}
      value={selectedState || ''}
      onChange={(e) => onStateChange(e.target.value)}
      disabled={states.length === 0}
    >
      <option value="">Selecciona un estado</option>
      {states.map((state) => (
        <option key={state} value={state}>
          {state}
        </option>
      ))}
    </select>
  );
};

export default StateSelect; 