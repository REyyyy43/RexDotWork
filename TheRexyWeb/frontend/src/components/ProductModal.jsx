import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, ShoppingCart, Heart } from 'lucide-react';
import api from '../api/axios';

const ProductModal = ({ product, isOpen, onClose, onAddToCart, onAddToFavorites, postulationsToday = 0, setShowPremiumModal }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [showPostulationModal, setShowPostulationModal] = useState(false);

  if (!isOpen || !product) return null;

  const formatPrice = (price, currency) => {
    const formatter = new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency || 'USD',
      minimumFractionDigits: 2
    });
    return formatter.format(price);
  };

  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  // Función para enviar mensaje
  const handleSendMessage = async () => {
    if (!message.trim()) {
      setError('El mensaje no puede estar vacío');
      return;
    }
    setSending(true);
    setError('');
    try {
      await api.post(`/products/${product._id}/message`, { text: message });
      setSent(true);
      setMessage('');
    } catch (err) {
      setError('Error enviando mensaje');
    } finally {
      setSending(false);
    }
  };

  // Lógica para abrir el modal de postulación
  const handleOpenPostulationModal = () => {
    if (postulationsToday >= 5) {
      setShowPremiumModal && setShowPremiumModal(true);
      return;
    }
    setShowPostulationModal(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 truncate pr-4">{product.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
          >
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
            {/* Galería de imágenes */}
            <div className="space-y-4">
              {/* Imagen principal */}
              <div className="relative">
                <img
                  src={`/api/products/image/${images[currentImageIndex]}`}
                  alt={`${product.name} - Imagen ${currentImageIndex + 1}`}
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg"
                />
                
                {/* Controles de navegación */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
                    >
                      <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
                    >
                      <ChevronRight size={16} className="sm:w-5 sm:h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Miniaturas */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex
                          ? 'border-blue-500'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={`/api/products/image/${image}`}
                        alt={`Miniatura ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Información del producto */}
            <div className="space-y-4 lg:space-y-6">
              {/* Precio */}
              <div>
                <span className="text-2xl sm:text-3xl font-bold text-gray-800">
                  {formatPrice(product.price, product.currency)}
                </span>
              </div>

              {/* Categoría y condición */}
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm font-medium">
                  {product.category}
                </span>
                {product.condition && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {product.condition}
                  </span>
                )}
              </div>

              {/* Descripción */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Descripción</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Ubicación */}
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin size={14} className="sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="text-sm sm:text-base">
                  {product.location?.city}, {product.location?.state}, {product.location?.country}
                </span>
              </div>

              {/* Vendedor */}
              <div className="flex items-center gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm sm:text-base">
                    {product.seller?.email?.charAt(0).toUpperCase() || product.vendor?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-800 text-sm sm:text-base truncate">
                    {product.seller?.email || product.vendor || 'Usuario'}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">Vendedor</p>
                </div>
              </div>

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Etiquetas</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Botones de acción eliminados */}

              {/* Enviar mensaje al vendedor */}
              {product && (
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Enviar mensaje al vendedor</h3>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg p-2 mb-2 text-sm sm:text-base"
                    rows={3}
                    placeholder="Escribe tu mensaje..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    disabled={sending || sent}
                  />
                  {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
                  {sent ? (
                    <div className="text-green-600 font-semibold mb-2 text-sm sm:text-base">¡Mensaje enviado!</div>
                  ) : (
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm sm:text-base"
                      onClick={handleSendMessage}
                      disabled={sending}
                    >
                      {sending ? 'Enviando...' : 'Enviar mensaje'}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de postulación */}
      {showPostulationModal && (
        <PostulationModal onClose={() => setShowPostulationModal(false)} />
      )}
    </div>
  );
};

export default ProductModal; 