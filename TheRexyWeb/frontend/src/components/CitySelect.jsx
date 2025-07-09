import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

const CitySelect = ({ countryCode, selectedState, selectedCity, onCityChange, className = '' }) => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!countryCode || !selectedState) {
      setCities([]);
      return;
    }

    const fetchCities = async () => {
      setLoading(true);
      setError('');
      try {
        const cleanCountryCode = typeof countryCode === 'string' ? countryCode.replace('+', '') : countryCode;
        const response = await axios.get(`/country/${cleanCountryCode}/state/${encodeURIComponent(selectedState)}/cities`);
        setCities(response.data.cities);
        console.log('Ciudades recibidas:', response.data.cities, 'para el estado:', selectedState);
      } catch (err) {
        console.error('Error fetching cities:', err);
        setError('No se pudieron cargar las ciudades');
        setCities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, [countryCode, selectedState]);

  // Siempre mostrar el select, pero con opciones según el estado
  let options = [];
  if (!selectedState) {
    options = [<option key="no-state">Selecciona un estado primero</option>];
  } else if (loading) {
    options = [<option key="loading">Cargando ciudades...</option>];
  } else if (error) {
    options = [<option key="error">Error al cargar ciudades</option>];
  } else if (cities.length === 0) {
    options = [<option key="no-cities">No hay ciudades disponibles</option>];
  } else {
    options = [<option value="">Selecciona una ciudad</option>, ...cities.map(city => (
      <option key={city} value={city}>{city}</option>
    ))];
  }

  return (
    <select
      className={`form-select ${className}`}
      value={selectedCity || ''}
      onChange={(e) => onCityChange(e.target.value)}
    >
      {options}
    </select>
  );
};

export default CitySelect; 