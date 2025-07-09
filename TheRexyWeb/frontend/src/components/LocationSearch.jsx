import React, { useState, useEffect } from 'react';
import { MapPin, X, ChevronDown, Loader2 } from 'lucide-react';
import axios from '../api/axios';

const LocationSearch = ({ userCountryCode, onLocationChange, className = '' }) => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Log cuando cambia el estado de states
  useEffect(() => {
    console.log('🔄 Estados actualizados:', states);
  }, [states]);

  // Cargar estados cuando cambia el país del usuario
  useEffect(() => {
    if (userCountryCode) {
      loadStates();
    }
  }, [userCountryCode]);

  const loadStates = async () => {
    if (!userCountryCode) return;

    try {
      setLoading(true);
      setError('');
      console.log('🔄 Iniciando carga de estados para:', userCountryCode);
      
      const url = `/country/${userCountryCode.replace('+', '')}/states`;
      console.log('📡 URL de la petición:', url);
      
      const response = await axios.get(url);
      console.log('✅ Respuesta completa:', response);
      console.log('✅ Datos de la respuesta:', response.data);
      console.log('✅ Estados en response.data.states:', response.data.states);
      
      if (response.data && response.data.states) {
        setStates(response.data.states);
        console.log('📋 Estados establecidos en el estado:', response.data.states);
      } else {
        console.error('❌ No se encontraron estados en la respuesta');
        setError('No se pudieron cargar los estados');
      }
    } catch (err) {
      console.error('❌ Error cargando estados:', err);
      console.error('❌ Detalles del error:', err.response?.data || err.message);
      console.error('❌ Status del error:', err.response?.status);
      setError('No se pudieron cargar los estados');
    } finally {
      setLoading(false);
    }
  };

  const handleStateChange = async (state) => {
    setSelectedState(state);
    setSelectedCity('');
    setCities([]);
    
    if (!state || !userCountryCode) return;

    try {
      setLoading(true);
      const response = await axios.get(`/country/${userCountryCode.replace('+', '')}/state/${encodeURIComponent(state)}/cities`);
      setCities(response.data.cities);
    } catch (err) {
      console.error('Error cargando ciudades:', err);
      setError('No se pudieron cargar las ciudades');
    } finally {
      setLoading(false);
    }
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
    
    // Notificar al componente padre sobre el cambio de ubicación
    const location = {
      state: selectedState,
      city: city
    };
    
    onLocationChange(location);
  };

  const clearLocation = () => {
    setSelectedState('');
    setSelectedCity('');
    setCities([]);
    setError('');
    onLocationChange(null);
  };

  // Si no hay código de país del usuario, no mostrar nada
  if (!userCountryCode) {
    return null;
  }

  return (
    <div className={`space-y-5 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
            <MapPin size={20} className="text-white" />
          </div>
          <h3 className="font-bold text-white lg:text-gray-800 text-lg">Ubicación</h3>
        </div>
        {(selectedState || selectedCity) && (
          <button
            onClick={clearLocation}
            className="p-2 hover:bg-red-50 hover:text-red-600 rounded-full transition-all duration-200 group"
            title="Limpiar filtros"
          >
            <X size={18} className="text-gray-400 group-hover:text-red-600 transition-colors" />
          </button>
        )}
      </div>

      {/* Estado */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
          Estado/Provincia
        </label>
        {loading ? (
          <div className="relative">
            <div className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 flex items-center justify-between">
              <span className="text-gray-500">Cargando estados...</span>
              <Loader2 size={18} className="text-gray-400 animate-spin" />
            </div>
          </div>
        ) : (
          <div className="relative">
            <select
              value={selectedState}
              onChange={(e) => handleStateChange(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-gray-700 font-medium appearance-none cursor-pointer hover:border-gray-300 transition-all duration-200 bg-white"
            >
              <option value="">Selecciona un estado</option>
              {states.map((state) => (
                <option key={state} value={state} className="py-2">
                  {state}
                </option>
              ))}
            </select>
            <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        )}
      </div>

      {/* Ciudad */}
      {selectedState && (
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Ciudad
          </label>
          {loading ? (
            <div className="relative">
              <div className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 flex items-center justify-between">
                <span className="text-gray-500">Cargando ciudades...</span>
                <Loader2 size={18} className="text-gray-400 animate-spin" />
              </div>
            </div>
          ) : (
            <div className="relative">
              <select
                value={selectedCity}
                onChange={(e) => handleCityChange(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-gray-700 font-medium appearance-none cursor-pointer hover:border-gray-300 transition-all duration-200 bg-white"
              >
                <option value="">Selecciona una ciudad</option>
                {cities.map((city) => (
                  <option key={city} value={city} className="py-2">
                    {city}
                  </option>
                ))}
              </select>
              <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          )}
        </div>
      )}

      {/* Mostrar ubicación seleccionada */}
      {(selectedState || selectedCity) && (
        <div className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl border border-cyan-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-cyan-500 rounded-full">
              <MapPin size={14} className="text-white" />
            </div>
            <span className="text-sm font-bold text-cyan-700">Ubicación seleccionada</span>
          </div>
          <div className="text-sm text-gray-700 font-medium">
            {selectedState}
            {selectedCity && (
              <span className="text-cyan-600">
                {' > '}{selectedCity}
              </span>
            )}
          </div>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-red-600 text-sm font-medium">{error}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSearch; 