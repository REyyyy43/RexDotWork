import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import LocationSearch from '../../components/LocationSearch';
import { Search, Filter, Wrench, Plus, MapPin, DollarSign, Star } from 'lucide-react';
import api from '../../api/axios';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userCountry, setUserCountry] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    if (userCountry?.countryCode) {
      loadServices();
    }
  }, [userCountry, selectedLocation]);

  const getUserLocation = async () => {
    try {
      const response = await api.get("/me");
      if (response.data) {
        setUserCountry({
          name: response.data.country,
          countryCode: response.data.countryCode
        });
      }
    } catch (err) {
      console.error("Error obteniendo ubicación del usuario:", err);
    }
  };

  const loadServices = async () => {
    if (!userCountry?.countryCode) return;

    try {
      setLoading(true);
      const params = {
        countryCode: userCountry.countryCode
      };

      if (selectedLocation?.state) params.state = selectedLocation.state;
      if (selectedLocation?.city) params.city = selectedLocation.city;
      if (selectedCategory) params.category = selectedCategory;
      if (selectedExperience) params.experience = selectedExperience;

      const response = await api.get('/services', { params });
      if (response.data.success) {
        setServices(response.data.services);
      }
    } catch (error) {
      console.error('Error cargando servicios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implementar búsqueda
  };

  const formatPrice = (price) => {
    if (!price) return 'A convenir';
    
    const { amount, currency, type } = price;
    const formatter = new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency || 'USD'
    });

    const typeLabels = {
      'fijo': 'precio fijo',
      'por_hora': '/hora',
      'por_día': '/día',
      'por_proyecto': '/proyecto'
    };

    return `${formatter.format(amount)} ${typeLabels[type] || ''}`;
  };

  const getExperienceLabel = (experience) => {
    const labels = {
      'principiante': 'Principiante',
      'intermedio': 'Intermedio',
      'avanzado': 'Avanzado',
      'experto': 'Experto'
    };
    return labels[experience] || experience;
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-72 bg-white shadow-lg p-6 hidden md:block">
          <h2 className="text-xl font-bold mb-4 text-cyan-700 flex items-center gap-2">
            <Filter size={20} /> Filtros
          </h2>

          {/* Búsqueda por ubicación */}
          <div className="mb-6">
            <LocationSearch 
              userCountryCode={userCountry?.countryCode}
              onLocationChange={setSelectedLocation}
            />
          </div>

          {/* Filtros */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoría
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todas las categorías</option>
                <option value="tecnología">Tecnología</option>
                <option value="diseño">Diseño</option>
                <option value="marketing">Marketing</option>
                <option value="consultoría">Consultoría</option>
                <option value="educación">Educación</option>
                <option value="salud">Salud</option>
                <option value="legal">Legal</option>
                <option value="otros">Otros</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nivel de experiencia
              </label>
              <select
                value={selectedExperience}
                onChange={(e) => setSelectedExperience(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Cualquier nivel</option>
                <option value="principiante">Principiante</option>
                <option value="intermedio">Intermedio</option>
                <option value="avanzado">Avanzado</option>
                <option value="experto">Experto</option>
              </select>
            </div>
          </div>

          {/* Botón crear servicio */}
          <div className="mt-6">
            <button
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-3 rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 shadow-lg"
              onClick={() => {/* Implementar modal de crear servicio */}}
            >
              <Plus size={18} /> Ofrecer servicio
            </button>
          </div>
        </aside>

        {/* Contenido principal */}
        <main className="flex-1 p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Servicios</h1>
            {userCountry && (
              <p className="text-gray-600">
                Encuentra profesionales expertos en {userCountry.name}
                {selectedLocation && (
                  <span className="text-cyan-600 font-medium">
                    {' '}• {selectedLocation.state}
                    {selectedLocation.city && ` > ${selectedLocation.city}`}
                  </span>
                )}
              </p>
            )}
          </div>

          {/* Búsqueda */}
          <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
            <form onSubmit={handleSearch} className="flex gap-4">
              <div className="flex-1 relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar servicios..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-200"
              >
                Buscar
              </button>
            </form>
          </div>

          {/* Lista de servicios */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
              <span className="ml-3 text-gray-600">Cargando servicios...</span>
            </div>
          ) : services.length > 0 ? (
            <div className="grid gap-6">
              {services.map((service) => (
                <div key={service._id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
                      <p className="text-gray-600 mb-2">{service.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm font-medium">
                        {service.category}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <DollarSign size={16} />
                      <span>{formatPrice(service.price)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin size={16} />
                      <span>
                        {service.location.city}, {service.location.state}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Star size={16} />
                      <span>{getExperienceLabel(service.experience)}</span>
                    </div>
                  </div>

                  {service.skills && service.skills.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Habilidades:</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">
                          {service.provider?.email?.charAt(0).toUpperCase() || 'P'}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {service.provider?.email || 'Profesional'}
                      </span>
                    </div>
                    <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-200">
                      Ver Detalles
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-12 text-center">
              <Wrench size={64} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No se encontraron servicios</h3>
              <p className="text-gray-600">
                No hay servicios disponibles en esta ubicación.
              </p>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Services; 