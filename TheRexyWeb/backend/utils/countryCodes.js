// Importar el countryMap para usar los mismos datos
import { countryMap } from './countryMap.js';

// Convertir countryMap a countryCodes para mantener compatibilidad
export const countryCodes = Object.keys(countryMap).reduce((acc, code) => {
  const country = countryMap[code];
  acc[`+${code}`] = {
    name: country.name,
    code: `+${code}`,
    states: Object.keys(country.states) // emoji eliminado, solo nombre y código
  };
  return acc;
}, {});

// Funciones auxiliares para mantener compatibilidad
export const getCountryFromCode = (phoneCode) => {
  return countryCodes[phoneCode] || null;
};

export const validatePhoneNumber = (phone) => {
  // Validación que acepta formato con espacios: +XX XXXX XXX XXX
  const phoneRegex = /^\+[1-9]\d{1,3}\s\d{3,4}\s\d{3}\s\d{3,4}$/;
  return phoneRegex.test(phone);
};

export const extractCountryCode = (phone) => {
  // Extraer código de país del número de teléfono
  const match = phone.match(/^\+(\d+)/);
  return match ? `+${match[1]}` : null;
};