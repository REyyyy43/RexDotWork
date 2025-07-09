import React, { useState, useEffect } from 'react';
import { X, Upload, Trash2 } from 'lucide-react';
import StateSelect from './StateSelect';
import axios from '../api/axios';

const AddProductModal = ({ isOpen, onClose, onSubmit, userCountryCode, userCountryName }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    currency: 'USD',
    category: '',
    condition: 'nuevo',
    tags: []
  });
  const [images, setImages] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [cities, setCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [errorCities, setErrorCities] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 5) {
      alert('Máximo 5 imágenes permitidas');
      return;
    }

    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages(prev => {
      const newImages = prev.filter((_, i) => i !== index);
      return newImages;
    });
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.price || !formData.category) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    if (images.length === 0) {
      alert('Debes subir al menos una imagen');
      return;
    }

    if (!selectedCity) {
      alert('Por favor selecciona una ciudad');
      return;
    }

    if (!userCountryCode || !userCountryName) {
      alert('No se detectó país del usuario. Intenta recargar la página.');
      return;
    }

    // Subir imágenes al backend y obtener IDs
    const imageIds = [];
    for (const img of images) {
      if (img.file) {
        const formData = new FormData();
        formData.append('file', img.file);
        const response = await fetch('/api/products/upload-image', {
          method: 'POST',
          body: formData
        });
        const data = await response.json();
        if (data.success && data.imageId) {
          imageIds.push(data.imageId);
        } else {
          alert('Error subiendo una imagen');
          return;
        }
      }
    }

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      images: imageIds,
      location: {
        country: userCountryName,
        countryCode: userCountryCode,
        state: selectedState,
        city: selectedCity
      },
      tags: formData.tags
    };

    await onSubmit(productData);
    
    // Limpiar formulario
    setFormData({
      name: '',
      description: '',
      price: '',
      currency: 'USD',
      category: '',
      condition: 'nuevo',
      tags: []
    });
    setImages([]);
    setTagInput('');
    setSelectedState('');
    setSelectedCity('');
    setCities([]);
    setErrorCities('');
    onClose();
  };

  useEffect(() => {
    console.log('selectedState cambió:', selectedState);
  }, [selectedState]);

  useEffect(() => {
    setSelectedCity('');
    setCities([]);
    setErrorCities('');
    if (!userCountryCode || !selectedState) return;
    const fetchCities = async () => {
      setLoadingCities(true);
      try {
        const cleanCountryCode = typeof userCountryCode === 'string' ? userCountryCode.replace('+', '') : userCountryCode;
        const response = await axios.get(`/country/${cleanCountryCode}/state/${encodeURIComponent(selectedState)}/cities`);
        setCities(response.data.cities);
      } catch (err) {
        setErrorCities('No se pudieron cargar las ciudades');
        setCities([]);
      } finally {
        setLoadingCities(false);
      }
    };
    fetchCities();
  }, [userCountryCode, selectedState]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">Agregar Producto</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
          >
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Información básica */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del producto *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej: iPhone 13 Pro"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoría *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Seleccionar categoría</option>
                <option value="Electrónicos">Electrónicos</option>
                <option value="Ropa">Ropa</option>
                <option value="Hogar">Hogar</option>
                <option value="Deportes">Deportes</option>
                <option value="Libros">Libros</option>
                <option value="Juguetes">Juguetes</option>
                <option value="Automóviles">Automóviles</option>
                <option value="Otros">Otros</option>
              </select>
            </div>
          </div>

          {/* Precio y condición */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Precio *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Moneda
              </label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="MXN">MXN</option>
                <option value="COP">COP</option>
                <option value="ARS">ARS</option>
                <option value="CLP">CLP</option>
                <option value="PEN">PEN</option>
                <option value="BRL">BRL</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Condición
              </label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="nuevo">Nuevo</option>
                <option value="usado">Usado</option>
                <option value="reacondicionado">Reacondicionado</option>
              </select>
            </div>
          </div>

          {/* Ubicación */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado
              </label>
              <StateSelect
                countryCode={userCountryCode}
                selectedState={selectedState}
                onStateChange={setSelectedState}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ciudad *
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedCity}
                onChange={e => setSelectedCity(e.target.value)}
                required
                disabled={!selectedState || loadingCities}
              >
                {!selectedState && <option value="">Selecciona un estado primero</option>}
                {loadingCities && <option value="">Cargando ciudades...</option>}
                {errorCities && <option value="">{errorCities}</option>}
                {selectedState && !loadingCities && !errorCities && cities.length === 0 && (
                  <option value="">No hay ciudades disponibles</option>
                )}
                {cities.length > 0 && [<option key="" value="">Selecciona una ciudad</option>,
                  ...cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))]
                }
              </select>
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe tu producto..."
              required
            />
          </div>

          {/* Imágenes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imágenes * (máximo 5)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload size={32} className="mx-auto text-gray-400 mb-2 sm:w-12 sm:h-12" />
                <p className="text-sm sm:text-base text-gray-600">Haz clic para subir imágenes</p>
                <p className="text-xs sm:text-sm text-gray-500">PNG, JPG hasta 5MB cada una</p>
              </label>
            </div>

            {/* Vista previa de imágenes */}
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image.preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 sm:h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 sm:top-2 sm:right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <Trash2 size={12} className="sm:w-4 sm:h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Etiquetas
            </label>
            <div className="flex flex-col sm:flex-row gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Agregar etiqueta..."
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm sm:text-base"
              >
                Agregar
              </button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center gap-2"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm sm:text-base"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-600 text-sm sm:text-base"
            >
              Publicar Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal; 