import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const CountrySelect = ({ value, onChange, countries, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

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

  const handleSelect = (countryCode) => {
    onChange(countryCode);
    setIsOpen(false);
    setSearchTerm('');
  };

  const filteredCountries = Object.entries(countries).filter(([code, country]) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    code.includes(searchTerm)
  );

  const selectedCountry = countries[value];

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Botón del select */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-3 py-3 border border-gray-300 border-r-0 rounded-l-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-cyan-600 transition-colors min-h-[48px] text-base"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedCountry ? (
          <span className="flex items-center gap-2 text-gray-700 font-medium">
            <span className="hidden sm:inline truncate">{selectedCountry.name}</span>
            <span className="text-gray-500 font-semibold ml-2">{selectedCountry.code}</span>
          </span>
        ) : (
          <span className="text-gray-400">Selecciona país</span>
        )}
        <ChevronDown 
          size={16} 
          className="text-gray-500 transition-transform duration-200" 
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} 
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 z-50 w-80 max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg">
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
              filteredCountries.map(([code, country]) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => handleSelect(code)}
                  className={`w-full px-3 py-2 text-left text-base hover:bg-gray-100 flex items-center gap-2 transition-colors ${
                    value === code ? 'bg-cyan-50 text-cyan-700' : 'text-gray-700'
                  }`}
                >
                  <span className="truncate">{country.name}</span>
                  <span className="text-gray-500 font-semibold ml-auto">{country.code}</span>
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
  );
};

export default CountrySelect;