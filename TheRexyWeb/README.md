# TheRexyWeb

Una plataforma web para conectar desarrolladores y emprendedores.

## 🚀 Características

- **Marketplace**: Encuentra y ofrece servicios
- **Colecciones**: Contenido organizado por temas
- **Chats**: Comunicación en tiempo real
- **Perfil**: Gestiona tu información personal

## 📋 Requisitos

- Node.js (v16 o superior)
- MongoDB
- npm

## 🛠️ Instalación

### 1. Configurar el backend
```bash
cd backend
npm install
```

Crear archivo `.env` en la carpeta `backend`:
```env
MONGO_URI_DEV=mongodb://localhost:27017/rexy_dev
MONGO_URI_PROD=mongodb://localhost:27017/rexy_prod
JWT_SECRET=tu_secreto_jwt_super_seguro_aqui
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### 2. Configurar el frontend
```bash
cd ../frontend
npm install
```

### 3. Iniciar MongoDB
Asegúrate de que MongoDB esté corriendo en tu sistema.

## 🚀 Ejecución

### Backend
```bash
cd backend
npm start
```
El servidor estará disponible en `http://localhost:3000`

### Frontend
```bash
cd frontend
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`

## 📚 API Endpoints

### Autenticación
- `POST /api/register` - Registro
- `POST /api/login` - Login
- `POST /api/logout` - Logout
- `GET /api/me` - Obtener usuario actual

### Marketplace
- `GET /api/offers` - Obtener ofertas
- `POST /api/offers` - Crear oferta

## 🎨 Tecnologías

### Backend
- Node.js
- Express
- MongoDB
- JWT

### Frontend
- React
- Vite
- Tailwind CSS
- React Router

## 📱 Responsive Design

La aplicación está optimizada para:
- 📱 Móviles
- 📱 Tablets
- 💻 Desktop

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. 