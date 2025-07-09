import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import LocationSearch from '../../components/LocationSearch';
import ProductList from '../../components/ProductList';
import ProductModal from '../../components/ProductModal';
import AddProductModal from '../../components/AddProductModal';
import PremiumModal from '../../components/PremiumModal';
import { Search, Filter, Tag, Globe, DollarSign, Upload, Menu } from 'lucide-react';
import api from '../../api/axios';

export default function Marketplace() {
  const [userLocation, setUserLocation] = useState(null);
  const [userCountry, setUserCountry] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [showSidebarMobile, setShowSidebarMobile] = useState(false);
  const [postulationsToday, setPostulationsToday] = useState(0);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  // Obtener ubicación del usuario al cargar
  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = async () => {
    try {
      console.log("Obteniendo datos del usuario...");
      const response = await api.get("/me");
      console.log("Datos del usuario:", response.data);
      
      if (response.data) {
        setUserLocation({
          country: response.data.country,
          state: response.data.state,
          city: response.data.city
        });
        setUserCountry({
          name: response.data.country,
          countryCode: response.data.countryCode
        });
        console.log("País del usuario establecido:", response.data.country, response.data.countryCode);
      }
    } catch (err) {
      console.error("Error obteniendo ubicación del usuario:", err);
    }
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
    console.log("Ubicación seleccionada:", location);
  };

  const handleViewProductDetails = (product) => {
    if (product.external) {
      // No abrir modal para productos externos
      return;
    }
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleAddToCart = (product) => {
    // Implementar lógica del carrito
    console.log('Agregando al carrito:', product);
    // Aquí puedes mostrar una notificación o actualizar el estado del carrito
  };

  const handleAddToFavorites = (product) => {
    // Implementar lógica de favoritos
    console.log('Agregando a favoritos:', product);
    // Aquí puedes mostrar una notificación o actualizar el estado de favoritos
  };

  const handleSubmitProduct = async (productData) => {
    try {
      const response = await api.post('/products', productData);
      console.log('Producto creado:', response.data);
      // Aquí puedes mostrar una notificación de éxito
      // y actualizar la lista de productos
    } catch (error) {
      console.error('Error creando producto:', error);
      // Aquí puedes mostrar una notificación de error
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar de filtros escritorio */}
        <aside className="w-72 bg-white shadow-lg p-6 hidden lg:block">
          <h2 className="text-xl font-bold mb-4 text-cyan-700 flex items-center gap-2">
            <Filter size={20} /> Filtros
          </h2>

          {/* Búsqueda por ubicación */}
          <div className="mb-6">
            <LocationSearch 
              userCountryCode={userCountry?.countryCode}
              onLocationChange={handleLocationChange}
              className="mb-4"
            />
          </div>

          {/* Botón subir producto */}
          <div className="mb-6">
            <button
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-3 rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 shadow-lg"
              onClick={() => setIsAddProductModalOpen(true)}
            >
              <Upload size={18} /> Subir mi producto
            </button>
          </div>
        </aside>

        {/* Botón menú sidebar móvil */}
        <button 
          className="lg:hidden fixed bottom-4 left-4 z-40 bg-cyan-700 text-white p-3 rounded-full shadow-lg hover:bg-cyan-800 transition-colors" 
          onClick={() => setShowSidebarMobile(true)}
        >
          <Menu size={24} />
        </button>

        {/* Sidebar móvil overlay */}
        {showSidebarMobile && (
          <div className="fixed inset-0 z-50 bg-cyan-900 bg-opacity-95 flex flex-col items-center justify-start pt-10 animate-fade-in">
            <button 
              className="absolute top-4 right-6 text-white text-4xl font-bold hover:text-cyan-200 transition-colors" 
              onClick={() => setShowSidebarMobile(false)} 
              aria-label="Cerrar"
            >
              &times;
            </button>
            
            <h2 className="text-xl font-bold mb-6 text-cyan-100 mt-8 flex items-center gap-2">
              <Filter size={24} /> Filtros
            </h2>
            
            <div className="mb-6 w-full px-8">
              <LocationSearch 
                userCountryCode={userCountry?.countryCode}
                onLocationChange={handleLocationChange}
                className="mb-4"
              />
            </div>
            
            <div className="mb-6 w-full px-8">
              <button
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-3 rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 shadow-lg"
                onClick={() => { 
                  setIsAddProductModalOpen(true); 
                  setShowSidebarMobile(false); 
                }}
              >
                <Upload size={18} /> Subir mi producto
              </button>
            </div>
          </div>
        )}

        {/* Contenido principal */}
        <main className="flex-1 p-4 lg:p-6">
          {/* Encabezado */}
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">Marketplace</h1>
            {userCountry && (
              <p className="text-sm lg:text-base text-gray-600">
                Descubre productos increíbles en {userCountry.name}
                {selectedLocation && (
                  <span className="text-cyan-600 font-medium">
                    {' '}• {selectedLocation.state}
                    {selectedLocation.city && ` > ${selectedLocation.city}`}
                  </span>
                )}
              </p>
            )}
          </div>

          {/* Lista de productos */}
          <ProductList 
            userCountryCode={userCountry?.countryCode}
            selectedLocation={selectedLocation}
            onViewDetails={handleViewProductDetails}
            onAddToCart={handleAddToCart}
            onAddToFavorites={handleAddToFavorites}
            setPostulationsToday={setPostulationsToday}
            postulationsToday={postulationsToday}
            setShowPremiumModal={setShowPremiumModal}
          />
        </main>
      </div>

      {/* Modal de detalles del producto */}
      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onAddToCart={handleAddToCart}
        onAddToFavorites={handleAddToFavorites}
        postulationsToday={postulationsToday}
        setShowPremiumModal={setShowPremiumModal}
      />

      {/* Modal para agregar producto */}
      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        onSubmit={handleSubmitProduct}
        userCountryCode={userCountry?.countryCode}
        userCountryName={userCountry?.name}
      />
      {showPremiumModal && <PremiumModal onClose={() => setShowPremiumModal(false)} />}
    </>
  );
}
