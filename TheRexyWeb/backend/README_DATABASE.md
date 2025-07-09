# Configuración de Base de Datos

## Opción 1: MongoDB Local (Recomendado para desarrollo)

### 1. Instalar MongoDB
- **Windows**: Descarga desde https://www.mongodb.com/try/download/community
- **macOS**: `brew install mongodb-community`
- **Linux**: `sudo apt install mongodb`

### 2. Iniciar MongoDB
```bash
# Windows (desde el directorio de instalación)
mongod

# macOS/Linux
sudo systemctl start mongod
# o
mongod
```

### 3. Crear archivo .env
Crea un archivo `.env` en la carpeta `backend` con:

```env
MONGO_URI_DEV=mongodb://localhost:27017/rexy_dev
JWT_SECRET=tu_secret_super_seguro_aqui
NODE_ENV=development
PORT=3000
```

## Opción 2: MongoDB Atlas (Para producción)

### 1. Crear cuenta en MongoDB Atlas
- Ve a https://www.mongodb.com/atlas
- Crea una cuenta gratuita
- Crea un cluster

### 2. Obtener la URL de conexión
- En tu cluster, haz clic en "Connect"
- Selecciona "Connect your application"
- Copia la URL de conexión

### 3. Configurar .env
```env
MONGO_URI_DEV=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/rexy_dev?retryWrites=true&w=majority
MONGO_URI_PROD=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/rexy_prod?retryWrites=true&w=majority
JWT_SECRET=tu_secret_super_seguro_aqui
NODE_ENV=development
PORT=3000
```

## Verificar la conexión

1. Asegúrate de que MongoDB esté ejecutándose
2. Ejecuta el servidor:
```bash
cd backend
npm start
```

3. Deberías ver:
```
🔗 Intentando conectar a MongoDB: mongodb://localhost:27017/rexy_dev
✅ MongoDB conectado exitosamente: localhost
```

## Solución de problemas

### Error: ECONNREFUSED
- MongoDB no está ejecutándose
- Ejecuta `mongod` en una terminal separada

### Error: Authentication failed
- Verifica las credenciales en la URL de MongoDB Atlas
- Asegúrate de que el usuario tenga permisos de lectura/escritura

### Error: Network is unreachable
- Verifica tu conexión a internet
- Si usas MongoDB Atlas, verifica que tu IP esté en la whitelist 