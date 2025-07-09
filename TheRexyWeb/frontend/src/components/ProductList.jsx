import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, Loader2, Package } from 'lucide-react';
import axios from '../api/axios';
import ProductCard from './ProductCard';
import PremiumModal from './PremiumModal';
import PremiumCard from './PremiumCard';

const ProductList = ({ 
  userCountryCode, 
  selectedLocation, 
  onViewDetails, 
  onAddToCart, 
  onAddToFavorites, 
  setPostulationsToday,
  postulationsToday = 0,
  setShowPremiumModal
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [categories, setCategories] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedVendor, setSelectedVendor] = useState('');
  const [pagination, setPagination] = useState({
    total: 0,
    limit: 20,
    offset: 0,
    hasMore: false
  });

  // Cargar productos cuando cambia la ubicación
  useEffect(() => {
    if (userCountryCode) {
      loadProducts();
    }
  }, [userCountryCode, selectedLocation]);

  // Cargar categorías y vendedores
  useEffect(() => {
    if (userCountryCode) {
      loadCategories();
      loadVendors();
    }
  }, [userCountryCode, selectedLocation]);

  useEffect(() => {
    // Consultar el límite de postulaciones al cargar
    axios.get('/offers/my-applications/today').then(res => {
      setPostulationsToday(res.data.count || 0);
    });
  }, []);

  const loadProducts = async (isSearch = false) => {
    if (!userCountryCode) return;

    try {
      setLoading(true);
      setError('');

      const params = {
        countryCode: userCountryCode,
        limit: pagination.limit,
        offset: pagination.offset
      };

      // Solo agregar state/city si el usuario los seleccionó explícitamente
      if (selectedLocation && selectedLocation.state && selectedLocation.state !== '') {
        params.state = selectedLocation.state;
      }
      if (selectedLocation && selectedLocation.city && selectedLocation.city !== '') {
        params.city = selectedLocation.city;
      }
      if (selectedCategory) {
        params.category = selectedCategory;
      }
      if (selectedVendor) {
        params.vendor = selectedVendor;
      }

      const url = isSearch ? '/products/search' : '/products';
      if (isSearch) {
        params.q = searchQuery;
      }

      // Cargar productos internos
      const response = await axios.get(url, { params });
      let internalProducts = [];
      let paginationData = pagination;
      if (response.data.success) {
        internalProducts = response.data.products;
        paginationData = response.data.pagination;
      } else {
        setError(response.data.error || 'Error cargando productos');
      }

      // Solo deja:
      setProducts(internalProducts);
      setPagination(paginationData);
    } catch (err) {
      console.error('❌ Error cargando productos:', err);
      setError('No se pudieron cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const params = {
        countryCode: userCountryCode
      };
      if (selectedLocation?.state) params.state = selectedLocation.state;
      if (selectedLocation?.city) params.city = selectedLocation.city;

      const response = await axios.get('/products/categories', { params });
      if (response.data.success) {
        setCategories(response.data.categories);
      }
    } catch (err) {
      console.error('Error cargando categorías:', err);
    }
  };

  const loadVendors = async () => {
    try {
      const params = {
        countryCode: userCountryCode
      };
      if (selectedLocation?.state) params.state = selectedLocation.state;
      if (selectedLocation?.city) params.city = selectedLocation.city;

      const response = await axios.get('/products/vendors', { params });
      if (response.data.success) {
        setVendors(response.data.vendors);
      }
    } catch (err) {
      console.error('Error cargando vendedores:', err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, offset: 0 }));
    loadProducts(true);
  };

  const handleFilterChange = (filterType, value) => {
    setPagination(prev => ({ ...prev, offset: 0 }));
    
    if (filterType === 'category') {
      setSelectedCategory(value);
    } else if (filterType === 'vendor') {
      setSelectedVendor(value);
    }
    
    // Recargar productos con nuevos filtros
    setTimeout(() => loadProducts(), 100);
  };

  const loadMore = () => {
    setPagination(prev => ({ ...prev, offset: prev.offset + prev.limit }));
    setTimeout(() => loadProducts(), 100);
  };

  const handleAddToCart = (product) => {
    if (onAddToCart) {
      onAddToCart(product);
    } else {
    console.log('🛒 Agregando al carrito:', product);
    }
  };

  const handleAddToFavorites = (product) => {
    if (onAddToFavorites) {
      onAddToFavorites(product);
    } else {
    console.log('❤️ Agregando a favoritos:', product);
    }
  };

  const handleViewDetails = (product) => {
    if (onViewDetails) {
      onViewDetails(product);
    }
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedVendor('');
    setSearchQuery('');
    setPagination(prev => ({ ...prev, offset: 0 }));
    setTimeout(() => loadProducts(), 100);
  };

  if (postulationsToday >= 5) {
    return (
      <div className="flex justify-center items-center min-h-screen w-full bg-white mt-32">
        <PremiumCard />
      </div>
    );
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header con búsqueda y filtros */}
      <div className="bg-white rounded-xl p-4 lg:p-6 shadow-lg">
        <div className="flex flex-col gap-4">
          {/* Búsqueda */}
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>
          </form>

          {/* Filtros */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="relative w-full sm:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full sm:w-auto px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 appearance-none pr-10"
              >
                <option value="">Todas las categorías</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="relative w-full sm:w-auto">
              <select
                value={selectedVendor}
                onChange={(e) => handleFilterChange('vendor', e.target.value)}
                className="w-full sm:w-auto px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 appearance-none pr-10"
              >
                <option value="">Todos los vendedores</option>
                {vendors.map(vendor => (
                  <option key={vendor} value={vendor}>{vendor}</option>
                ))}
              </select>
            </div>

            {/* Botones de vista */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-white shadow-sm' 
                    : 'hover:bg-gray-200'
                }`}
              >
                <Grid size={18} />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-white shadow-sm' 
                    : 'hover:bg-gray-200'
                }`}
              >
                <List size={18} />
              </button>
            </div>

            {/* Botón limpiar filtros */}
            {(selectedCategory || selectedVendor || searchQuery) && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Estado de carga */}
      {loading && pagination.offset === 0 && (
        <div className="flex items-center justify-center py-12">
          <Loader2 size={32} className="animate-spin text-cyan-500" />
          <span className="ml-3 text-gray-600">Cargando productos...</span>
        </div>
      )}

      {/* Estado de error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <Package size={48} className="mx-auto text-red-400 mb-4" />
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error al cargar productos</h3>
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => loadProducts()}
            className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Intentar de nuevo
          </button>
        </div>
      )}

      {/* Lista de productos */}
      {!loading && !error && products.length > 0 && (
        <>
          <div className={`grid gap-4 lg:gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' 
              : 'grid-cols-1'
          }`}>
            {products.map((product) => (
              <ProductCard
                key={product._id || product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onAddToFavorites={handleAddToFavorites}
                onViewDetails={handleViewDetails}
                postulationsToday={postulationsToday}
                setShowPremiumModal={setShowPremiumModal}
              />
            ))}
          </div>

          {/* Botón cargar más */}
          {pagination.hasMore && (
            <div className="text-center pt-6">
              <button
                onClick={loadMore}
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="inline animate-spin mr-2" />
                    Cargando...
                  </>
                ) : (
                  'Cargar más productos'
                )}
              </button>
            </div>
          )}
        </>
      )}

      {/* Estado vacío */}
      {!loading && !error && products.length === 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 lg:p-12 text-center">
          <Package size={48} className="mx-auto text-gray-400 mb-4 lg:hidden" />
          <Package size={64} className="mx-auto text-gray-400 mb-4 hidden lg:block" />
          <h3 className="text-lg lg:text-xl font-semibold text-gray-800 mb-2">No se encontraron productos</h3>
          <p className="text-sm lg:text-base text-gray-600 mb-4">
            {searchQuery 
              ? `No hay productos que coincidan con "${searchQuery}"`
              : 'No hay productos disponibles en esta ubicación'
            }
          </p>
          {(selectedCategory || selectedVendor || searchQuery) && (
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList; 