import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { Briefcase, MessageCircle, Package } from 'lucide-react';

export default function Perfil() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    postulations: 0,
    activeChats: 0,
    products: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await api.get('/me');
        setUser(response.data);
        // Cargar estadísticas después de obtener los datos del usuario
        await loadUserStats(response.data);
      } catch (err) {
        console.error('Error:', err);
        setError('Error al cargar los datos del usuario.');
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  const loadUserStats = async (userData) => {
    try {
      // Obtener postulaciones del usuario (todas las aplicaciones)
      const postulationsRes = await api.get('/offers/my-applications');
      const postulationsCount = postulationsRes.data.applications?.length || 0;
      setStats(prev => ({ ...prev, postulations: postulationsCount }));

      // Obtener chats activos del usuario
      const chatsRes = await api.get('/products/chats');
      const chatsCount = chatsRes.data.chats?.length || 0;
      setStats(prev => ({ ...prev, activeChats: chatsCount }));

      // Obtener productos subidos por el usuario (filtrar por seller)
      const productsRes = await api.get('/products', { 
        params: { 
          seller: userData._id,
          limit: 1000 
        } 
      });
      const productsCount = productsRes.data.products?.length || 0;
      setStats(prev => ({ ...prev, products: productsCount }));

      console.log('Estadísticas cargadas:', {
        postulations: postulationsCount,
        chats: chatsCount,
        products: productsCount,
        userId: userData._id
      });
    } catch (err) {
      console.error('Error cargando estadísticas:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post('/logout');
      localStorage.removeItem('token');
      navigate('/');
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    }
  };

  if (loading) {
    return (
      <div className="max-w-xl mx-auto p-6 text-center text-gray-600">
        <span className="animate-pulse">Cargando tu perfil...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto p-6">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg shadow text-center">
          {error}
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-white shadow-xl rounded-xl overflow-hidden">
          {/* Encabezado */}
          <div className="bg-gradient-to-r from-cyan-700 to-cyan-800 p-6 md:p-8 flex flex-col md:flex-row justify-between items-center text-white">
            <div className="flex items-center gap-6">
              <img
                src={`https://ui-avatars.com/api/?name=${user?.username || 'Usuario'}&background=0D8ABC&color=fff`}
                alt="Avatar"
                className="w-24 h-24 rounded-full border-4 border-white shadow-md"
              />
              <div>
                <h2 className="text-2xl font-bold">{user?.username}</h2>
                <p className="text-sm text-cyan-100">{user?.email}</p>
                {user?.role && (
                  <span className="inline-block mt-1 bg-cyan-600 text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                    {user.role}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="mt-4 md:mt-0 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md shadow-md transition"
            >
              Cerrar sesión
            </button>
          </div>

          {/* Contenido del perfil */}
          <div className="p-6 md:p-10 bg-gray-50">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Detalles del perfil</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
              <div>
                <label className="text-sm font-medium text-gray-500">Correo electrónico</label>
                <p className="mt-1 text-base">{user?.email || 'No disponible'}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Número de teléfono</label>
                <p className="mt-1 text-base">{user?.phone || 'No disponible'}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">País</label>
                <p className="mt-1 text-base">{user?.country || 'No disponible'}</p>
              </div>

              {user?.state && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Estado / Provincia</label>
                  <p className="mt-1 text-base">{user.state}</p>
                </div>
              )}

              {user?.city && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Ciudad</label>
                  <p className="mt-1 text-base">{user.city}</p>
                </div>
              )}
            </div>

            {/* Estadísticas */}
            <div className="mt-10">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Estadísticas</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Briefcase size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Postulaciones</p>
                      <p className="text-2xl font-bold text-gray-800">{stats.postulations}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <MessageCircle size={20} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Chats activos</p>
                      <p className="text-2xl font-bold text-gray-800">{stats.activeChats}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Package size={20} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Productos subidos</p>
                      <p className="text-2xl font-bold text-gray-800">{stats.products}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 flex justify-end">
              <button
                className="bg-cyan-700 hover:bg-cyan-800 text-white px-6 py-2 rounded-md shadow transition"
                onClick={() => window.history.back()}
              >
                Volver atrás
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
