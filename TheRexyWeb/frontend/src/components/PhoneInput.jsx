import React, { useState, useEffect, useRef } from 'react';
import { getCountries, getCountryCallingCode } from 'libphonenumber-js';
import { ChevronDown } from 'lucide-react';

const PhoneInput = ({ value, onChange, onCountryChange, className = "" }) => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('VE');
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Obtener todos los países con sus códigos
    const allCountries = getCountries().map(countryCode => ({
      code: countryCode,
      callingCode: getCountryCallingCode(countryCode),
      name: getCountryName(countryCode)
    })).sort((a, b) => a.name.localeCompare(b.name));
    
    setCountries(allCountries);
  }, []);

  // Cerrar dropdown cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const getCountryName = (countryCode) => {
    const countryNames = {
      'VE': 'Venezuela',
      'CO': 'Colombia',
      'MX': 'México',
      'AR': 'Argentina',
      'PE': 'Perú',
      'CL': 'Chile',
      'BR': 'Brasil',
      'EC': 'Ecuador',
      'PY': 'Paraguay',
      'UY': 'Uruguay',
      'BO': 'Bolivia',
      'PA': 'Panamá',
      'CR': 'Costa Rica',
      'GT': 'Guatemala',
      'SV': 'El Salvador',
      'HN': 'Honduras',
      'NI': 'Nicaragua',
      'BZ': 'Belice',
      'US': 'Estados Unidos',
      'CA': 'Canadá',
      'ES': 'España',
      'FR': 'Francia',
      'DE': 'Alemania',
      'IT': 'Italia',
      'GB': 'Reino Unido',
      'CN': 'China',
      'JP': 'Japón',
      'IN': 'India',
      'KR': 'Corea del Sur',
      'AU': 'Australia',
      'NZ': 'Nueva Zelanda',
      // Agregar más países según necesites
    };
    return countryNames[countryCode] || countryCode;
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country.code);
    setIsOpen(false);
    setSearchTerm('');
    
    // Actualizar el valor del teléfono con el nuevo código
    const phoneNumber = value.replace(/^\+\d+/, '');
    const newValue = `+${country.callingCode} ${phoneNumber}`.trim();
    onChange(newValue);
    
    if (onCountryChange) {
      onCountryChange(country);
    }
  };

  const handlePhoneChange = (e) => {
    const phoneValue = e.target.value;
    onChange(phoneValue);
    
    // Detectar país automáticamente si el usuario escribe un código
    const countryCode = extractCountryCode(phoneValue);
    if (countryCode) {
      const country = countries.find(c => c.callingCode === countryCode.replace('+', ''));
      if (country) {
        setSelectedCountry(country.code);
        if (onCountryChange) {
          onCountryChange(country);
        }
      }
    }
  };

  const extractCountryCode = (phone) => {
    const match = phone.match(/^\+(\d{1,3})/);
    return match ? `+${match[1]}` : null;
  };

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.callingCode.includes(searchTerm)
  );

  const currentCountry = countries.find(c => c.code === selectedCountry);

  return (
    <div className={`flex ${className}`} ref={dropdownRef}>
      {/* Select de código de país */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center gap-2 px-3 py-2.5 border border-r-0 rounded-l-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-cyan-600 transition-colors min-h-[42px]"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className="text-sm font-medium text-gray-700">
            +{currentCountry?.callingCode || '58'}
          </span>
          <ChevronDown size={16} className="text-gray-500 transition-transform duration-200" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
        </button>

        {/* Dropdown de países */}
        {isOpen && (
          <div className="absolute top-full left-0 z-50 w-64 max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg">
            {/* Buscador */}
            <div className="p-2 border-b border-gray-200">
              <input
                type="text"
                placeholder="Buscar país..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-cyan-600 focus:border-cyan-600"
                autoFocus
              />
            </div>

            {/* Lista de países */}
            <div className="max-h-48 overflow-y-auto">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => handleCountrySelect(country)}
                    className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center justify-between transition-colors ${
                      selectedCountry === country.code ? 'bg-cyan-50 text-cyan-700' : 'text-gray-700'
                    }`}
                  >
                    <span className="truncate">{country.name}</span>
                    <span className="text-gray-500 font-medium">+{country.callingCode}</span>
                  </button>
                ))
              ) : (
                <div className="px-3 py-2 text-sm text-gray-500">
                  No se encontraron países
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Input de número de teléfono */}
      <input
        type="tel"
        value={value.replace(/^\+\d+\s?/, '')}
        onChange={handlePhoneChange}
        placeholder="Número de teléfono"
        className="flex-1 px-3 py-2.5 border border-l-0 rounded-r-md focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-cyan-600 transition-colors min-h-[42px]"
      />
    </div>
  );
};

export default PhoneInput; 