// APIs de productos con filtrado por ubicación
import axios from 'axios';

// Configuración de APIs
const API_CONFIGS = {
  // API de productos locales (simulada)
  localProducts: {
    baseURL: 'https://api.example.com/products',
    requiresAuth: false,
    locationField: 'location'
  },
  
  // API de productos por región
  regionalProducts: {
    baseURL: 'https://fakestoreapi.com/products',
    requiresAuth: false,
    locationField: 'category'
  },
  
  // API de productos de comercio electrónico
  ecommerceProducts: {
    baseURL: 'https://dummyjson.com/products',
    requiresAuth: false,
    locationField: 'brand'
  }
};

// Datos simulados de productos por ubicación
const PRODUCTS_BY_LOCATION = {
  // México
  '52': {
    'Jalisco': {
      'Guadalajara': [
        {
          id: 'mx_jal_gdl_1',
          name: 'Tacos al Pastor',
          description: 'Tacos tradicionales de cerdo con piña',
          price: 25.00,
          currency: 'MXN',
          category: 'Comida',
          location: {
            country: 'México',
            state: 'Jalisco',
            city: 'Guadalajara'
          },
          image: 'https://images.unsplash.com/photo-1565299585323-2d6f76ec2132?w=300',
          rating: 4.8,
          vendor: 'Taquería El Güero'
        },
        {
          id: 'mx_jal_gdl_2',
          name: 'Tejidos Artesanales',
          description: 'Mantas y tapetes tejidos a mano',
          price: 450.00,
          currency: 'MXN',
          category: 'Artesanías',
          location: {
            country: 'México',
            state: 'Jalisco',
            city: 'Guadalajara'
          },
          image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300',
          rating: 4.6,
          vendor: 'Artesanías Tlaquepaque'
        }
      ],
      'Tlaquepaque': [
        {
          id: 'mx_jal_tlaq_1',
          name: 'Cerámica Tlaquepaque',
          description: 'Vasijas y platos de cerámica tradicional',
          price: 320.00,
          currency: 'MXN',
          category: 'Artesanías',
          location: {
            country: 'México',
            state: 'Jalisco',
            city: 'Tlaquepaque'
          },
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300',
          rating: 4.9,
          vendor: 'Cerámica Tradicional'
        }
      ]
    },
    'Nuevo León': {
      'Monterrey': [
        {
          id: 'mx_nl_mty_1',
          name: 'Carne Asada Norteña',
          description: 'Carne asada estilo norteño con tortillas',
          price: 180.00,
          currency: 'MXN',
          category: 'Comida',
          location: {
            country: 'México',
            state: 'Nuevo León',
            city: 'Monterrey'
          },
          image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300',
          rating: 4.7,
          vendor: 'Restaurante Norteño'
        }
      ]
    }
  },
  
  // Estados Unidos
  '1': {
    'California': {
      'Los Angeles': [
        {
          id: 'us_ca_la_1',
          name: 'Avocado Toast',
          description: 'Toast con aguacate y semillas',
          price: 12.50,
          currency: 'USD',
          category: 'Comida',
          location: {
            country: 'Estados Unidos',
            state: 'California',
            city: 'Los Angeles'
          },
          image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=300',
          rating: 4.5,
          vendor: 'Café Health'
        },
        {
          id: 'us_ca_la_2',
          name: 'Tech Gadgets',
          description: 'Dispositivos tecnológicos innovadores',
          price: 299.99,
          currency: 'USD',
          category: 'Tecnología',
          location: {
            country: 'Estados Unidos',
            state: 'California',
            city: 'Los Angeles'
          },
          image: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=300',
          rating: 4.3,
          vendor: 'Tech Store LA'
        }
      ],
      'San Francisco': [
        {
          id: 'us_ca_sf_1',
          name: 'Sourdough Bread',
          description: 'Pan de masa madre tradicional',
          price: 8.50,
          currency: 'USD',
          category: 'Comida',
          location: {
            country: 'Estados Unidos',
            state: 'California',
            city: 'San Francisco'
          },
          image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300',
          rating: 4.8,
          vendor: 'Boudin Bakery'
        }
      ]
    },
    'New York': {
      'New York City': [
        {
          id: 'us_ny_nyc_1',
          name: 'New York Pizza',
          description: 'Pizza estilo Nueva York',
          price: 18.00,
          currency: 'USD',
          category: 'Comida',
          location: {
            country: 'Estados Unidos',
            state: 'New York',
            city: 'New York City'
          },
          image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300',
          rating: 4.6,
          vendor: 'NY Pizza Joint'
        }
      ]
    }
  },
  
  // España
  '34': {
    'Madrid': {
      'Madrid': [
        {
          id: 'es_mad_mad_1',
          name: 'Jamón Ibérico',
          description: 'Jamón ibérico de bellota premium',
          price: 45.00,
          currency: 'EUR',
          category: 'Comida',
          location: {
            country: 'España',
            state: 'Madrid',
            city: 'Madrid'
          },
          image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=300',
          rating: 4.9,
          vendor: 'Jamones Ibéricos'
        }
      ]
    },
    'Barcelona': {
      'Barcelona': [
        {
          id: 'es_cat_bar_1',
          name: 'Paella Valenciana',
          description: 'Paella tradicional valenciana',
          price: 22.00,
          currency: 'EUR',
          category: 'Comida',
          location: {
            country: 'España',
            state: 'Barcelona',
            city: 'Barcelona'
          },
          image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300',
          rating: 4.7,
          vendor: 'Restaurante Mediterráneo'
        }
      ]
    }
  },
  
  // Colombia
  '57': {
    'Antioquia': {
      'Medellín': [
        {
          id: 'co_ant_med_1',
          name: 'Bandeja Paisa',
          description: 'Plato típico antioqueño',
          price: 25000,
          currency: 'COP',
          category: 'Comida',
          location: {
            country: 'Colombia',
            state: 'Antioquia',
            city: 'Medellín'
          },
          image: 'https://images.unsplash.com/photo-1565299585323-2d6f76ec2132?w=300',
          rating: 4.8,
          vendor: 'Restaurante Paisa'
        }
      ]
    }
  },
  
  // Argentina
  '54': {
    'Buenos Aires': {
      'Buenos Aires': [
        {
          id: 'ar_ba_ba_1',
          name: 'Asado Argentino',
          description: 'Asado tradicional argentino',
          price: 3500,
          currency: 'ARS',
          category: 'Comida',
          location: {
            country: 'Argentina',
            state: 'Buenos Aires',
            city: 'Buenos Aires'
          },
          image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300',
          rating: 4.9,
          vendor: 'Parrilla Argentina'
        }
      ]
    }
  },
  
  // Georgia
  '995': {
    'Tbilisi': {
      'Tbilisi': [
        {
          id: 'ge_tbi_tbi_1',
          name: 'Khachapuri',
          description: 'Pan relleno con queso georgiano',
          price: 15.00,
          currency: 'GEL',
          category: 'Comida',
          location: {
            country: 'Georgia',
            state: 'Tbilisi',
            city: 'Tbilisi'
          },
          image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300',
          rating: 4.7,
          vendor: 'Georgian Bakery'
        },
        {
          id: 'ge_tbi_tbi_2',
          name: 'Wine Saperavi',
          description: 'Vino tinto georgiano tradicional',
          price: 45.00,
          currency: 'GEL',
          category: 'Bebidas',
          location: {
            country: 'Georgia',
            state: 'Tbilisi',
            city: 'Tbilisi'
          },
          image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=300',
          rating: 4.8,
          vendor: 'Georgian Wines'
        }
      ]
    }
  }
};

// Función para obtener productos por ubicación
const getProductsByLocation = async (countryCode, state = null, city = null) => {
  try {
    // Limpiar el código de país (remover + si existe)
    const cleanCountryCode = countryCode.replace('+', '');
    
    // Buscar productos en la base de datos local
    let products = [];
    
    if (PRODUCTS_BY_LOCATION[cleanCountryCode]) {
      const countryProducts = PRODUCTS_BY_LOCATION[cleanCountryCode];
      
      if (state && city) {
        // Filtrar por estado y ciudad específicos
        if (countryProducts[state] && countryProducts[state][city]) {
          products = countryProducts[state][city];
        }
      } else if (state) {
        // Filtrar por estado (todas las ciudades)
        if (countryProducts[state]) {
          Object.values(countryProducts[state]).forEach(cityProducts => {
            products = products.concat(cityProducts);
          });
        }
      } else {
        // Todos los productos del país
        Object.values(countryProducts).forEach(stateProducts => {
          Object.values(stateProducts).forEach(cityProducts => {
            products = products.concat(cityProducts);
          });
        });
      }
    }
    
    // Si no hay productos locales, intentar con APIs externas
    if (products.length === 0) {
      products = await fetchExternalProducts(countryCode, state, city);
    }
    
    return {
      success: true,
      products: products,
      total: products.length,
      filters: {
        countryCode: cleanCountryCode,
        state: state,
        city: city
      }
    };
    
  } catch (error) {
    console.error('Error obteniendo productos por ubicación:', error);
    return {
      success: false,
      error: 'Error obteniendo productos',
      products: [],
      total: 0
    };
  }
};

// Función para obtener productos de APIs externas
const fetchExternalProducts = async (countryCode, state, city) => {
  const products = [];
  
  try {
    // API de productos de ejemplo (FakeStoreAPI)
    const response = await axios.get('https://fakestoreapi.com/products?limit=10');
    const externalProducts = response.data;
    
    // Mapear productos externos con información de ubicación
    externalProducts.forEach((product, index) => {
      products.push({
        id: `ext_${index}`,
        name: product.title,
        description: product.description,
        price: product.price,
        currency: 'USD',
        category: product.category,
        location: {
          country: getCountryName(countryCode),
          state: state || 'N/A',
          city: city || 'N/A'
        },
        image: product.image,
        rating: product.rating?.rate || 4.0,
        vendor: 'External Vendor',
        external: true
      });
    });
    
  } catch (error) {
    console.error('Error obteniendo productos externos:', error);
  }
  
  return products;
};

// Función para obtener nombre del país por código
const getCountryName = (countryCode) => {
  const countryNames = {
    '52': 'México',
    '1': 'Estados Unidos',
    '34': 'España',
    '57': 'Colombia',
    '54': 'Argentina',
    '995': 'Georgia'
  };
  
  return countryNames[countryCode.replace('+', '')] || 'Unknown';
};

// Función para buscar productos por texto
const searchProducts = async (query, countryCode, state = null, city = null) => {
  try {
    const allProducts = await getProductsByLocation(countryCode, state, city);
    
    if (!allProducts.success) {
      return allProducts;
    }
    
    const filteredProducts = allProducts.products.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.vendor.toLowerCase().includes(query.toLowerCase())
    );
    
    return {
      success: true,
      products: filteredProducts,
      total: filteredProducts.length,
      query: query,
      filters: {
        countryCode: countryCode.replace('+', ''),
        state: state,
        city: city
      }
    };
    
  } catch (error) {
    console.error('Error buscando productos:', error);
    return {
      success: false,
      error: 'Error en la búsqueda',
      products: [],
      total: 0
    };
  }
};

export {
  getProductsByLocation,
  searchProducts,
  PRODUCTS_BY_LOCATION
}; 