import React from 'react';
import { MapPin, Heart, ShoppingCart } from 'lucide-react';

const ProductCard = ({ product, onAddToCart, onAddToFavorites, onViewDetails, postulationsToday = 0, setShowPremiumModal }) => {
  const formatPrice = (price, currency) => {
    const formatter = new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    });
    return formatter.format(price);
  };

  const postulationLimitReached = postulationsToday >= 5;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group w-full max-w-2xl mx-auto min-w-[340px] sm:w-[420px]">
      {/* Imagen del producto */}
      <div className="relative overflow-hidden">
        {product.images && product.images.length > 0 && (
        <img
            src={`/api/products/image/${product.images[0]}`}
            alt={product.name}
            className="w-full h-56 sm:h-56 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        )}
        
        {/* Botones de acción eliminados */}

        {/* Badge de ubicación */}
        <div className="absolute bottom-3 left-3">
          <div className="flex items-center gap-1 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-full">
            <MapPin size={12} className="text-white" />
            <span className="text-xs text-white font-medium">
              {product.location?.city || product.location?.city}
            </span>
          </div>
        </div>

        {/* Badge de condición */}
        {product.condition && (
          <div className="absolute top-3 left-3">
            <div className="px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">
              {product.condition}
            </div>
          </div>
        )}
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
        {/* Categoría */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-cyan-600 bg-cyan-50 px-2 py-1 rounded-full">
            {product.category}
          </span>
          {product.external && (
            <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
              Externo
            </span>
          )}
        </div>

        {/* Nombre del producto */}
        <h3 className="font-bold text-gray-800 text-base sm:text-lg leading-tight line-clamp-2">
          {product.name}
        </h3>

        {/* Descripción */}
        <p className="text-gray-600 text-sm line-clamp-2">
          {product.description}
        </p>

        {/* Vendedor */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">
              {product.seller?.email?.charAt(0).toUpperCase() || product.vendor?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
          <span className="text-sm text-gray-700 font-medium truncate">
            {product.seller?.email || product.vendor || 'Usuario'}
          </span>
        </div>

        {/* Precio y botón de compra */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
          <div>
            <span className="text-xl sm:text-2xl font-bold text-gray-800">
              {formatPrice(product.price, product.currency || 'USD')}
            </span>
          </div>
          
          {/* Botón de compra o postulación */}
          {product.external ? (
            <button
              type="button"
              disabled={postulationLimitReached}
              onClick={() => {
                if (postulationLimitReached) {
                  setShowPremiumModal && setShowPremiumModal(true);
                } else {
                  window.open(product.url, '_blank');
                }
              }}
              className={`w-full sm:w-auto text-center px-6 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${postulationLimitReached ? 'opacity-60 cursor-not-allowed' : 'hover:from-orange-600 hover:to-yellow-600'}`}
              style={postulationLimitReached ? { cursor: 'not-allowed' } : {}}
            >
              Postular
            </button>
          ) : (
            <button
              onClick={() => {
                if (postulationLimitReached) {
                  setShowPremiumModal && setShowPremiumModal(true);
                } else {
                  onViewDetails ? onViewDetails(product) : onAddToCart(product);
                }
              }}
              disabled={postulationLimitReached}
              className={`w-full sm:w-auto text-center px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${postulationLimitReached ? 'opacity-60 cursor-not-allowed' : 'hover:from-cyan-600 hover:to-blue-600'}`}
              style={postulationLimitReached ? { cursor: 'not-allowed' } : {}}
            >
              {onViewDetails ? 'Ver Detalles' : 'Comprar'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 