import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import CountrySelect from "../../components/CountrySelect";
import RexyLogo from '../../assets/Rexy.png';

export default function Registro() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    countryCode: "+58" // Valor predeterminado: Venezuela
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [countries, setCountries] = useState({});
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Cargar países al montar el componente
    loadCountries();
  }, []);

  const loadCountries = async () => {
    try {
      const response = await api.get("/api/countries");
      setCountries(response.data);
      // Establecer Venezuela como país predeterminado
      if (response.data["+58"]) {
        setSelectedCountry(response.data["+58"]);
        // Asegurar que el form tenga el código de país predeterminado
        setForm(prev => ({ ...prev, countryCode: "+58" }));
      }
    } catch (err) {
      console.error("Error cargando países:", err);
    }
  };

  const handlePhoneChange = (phoneValue) => {
    setForm({ ...form, phone: phoneValue });
  };

  const handleCountryChange = (countryCode) => {
    setForm({ ...form, countryCode: countryCode });
    setSelectedCountry(countries[countryCode]);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!form.username || !form.email || !form.password || !form.confirmPassword || !form.phone || !form.countryCode) {
      setError("Todos los campos son obligatorios");
      setLoading(false);
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }
    if (form.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      setLoading(false);
      return;
    }
    if (!selectedCountry && !form.countryCode) {
      setError("Por favor, selecciona un país");
      setLoading(false);
      return;
    }

    // Limpiar el input de teléfono (solo dígitos)
    const cleanPhone = form.phone.replace(/\D/g, '');
    // Formatear a '+XX XXXX XXX XXX'
    let formattedPhone = '';
    if (cleanPhone.length === 10) {
      // Ejemplo: 4121234567 => +58 412 123 4567
      formattedPhone = `${form.countryCode} ${cleanPhone.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')}`;
    } else if (cleanPhone.length === 11) {
      // Ejemplo: 04121234567 => +58 0412 123 4567
      formattedPhone = `${form.countryCode} ${cleanPhone.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3')}`;
    } else {
      // Si no coincide, solo concatena el código y el número limpio
      formattedPhone = `${form.countryCode} ${cleanPhone}`;
    }

    try {
      await api.post("/register", {
        username: form.username,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
        phone: formattedPhone,
        countryCode: form.countryCode,
      });
      setSuccess("Usuario registrado exitosamente. Redirigiendo al login...");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.msg || "Error en el registro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-4xl lg:max-w-6xl">
        {/* Logo y título */}
        <div className="text-center mb-8 lg:mb-12">
          <img src={RexyLogo} alt="Rexy Logo" className="w-32 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Crear cuenta</h2>
          <p className="text-gray-600">Únete a Rexy y encuentra las mejores oportunidades</p>
        </div>

        {/* Mensajes de estado */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-600 text-sm">{success}</p>
          </div>
        )}
      
        <form onSubmit={handleSubmit} className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de usuario
            </label>
            <input
              type="text"
              name="username"
              placeholder="Ingresa tu nombre de usuario"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
              value={form.username}
              onChange={handleChange}
              required
              autoComplete="username"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              placeholder="tu@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>

          {/* Selector de país y teléfono arriba de contraseñas */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              País y número de teléfono
            </label>
            <div className="flex w-full">
              <div className="w-1/3">
                <CountrySelect
                  value={form.countryCode}
                  onChange={handleCountryChange}
                  countries={countries}
                  className="w-full h-full px-3 py-3 border border-gray-300 border-r-0 rounded-l-lg rounded-r-none focus:z-10 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white text-gray-700"
                />
              </div>
              <div className="w-2/3">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Número de teléfono"
                  className="w-full h-full px-4 py-3 border border-gray-300 border-l-0 rounded-r-lg rounded-l-none focus:z-10 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white text-gray-700"
                  value={form.phone}
                  onChange={handleChange}
                  maxLength={10}
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              placeholder="Mínimo 6 caracteres"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirmar contraseña
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Repite tu contraseña"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
          </div>

        <button
          type="submit"
            disabled={loading}
            className="w-full lg:col-span-2 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white py-3 rounded-lg font-semibold hover:from-cyan-700 hover:to-cyan-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Creando cuenta...
              </div>
            ) : (
              "Crear cuenta"
            )}
        </button>
      </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <a href="/login" className="text-cyan-600 hover:text-cyan-700 font-semibold">
              Inicia sesión
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
