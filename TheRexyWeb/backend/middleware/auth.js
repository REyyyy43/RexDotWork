import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const auth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ msg: "No autorizado" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    return res.status(401).json({ msg: "Token inválido" });
  }
};

export const authenticateToken = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        error: "Token de acceso requerido" 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Obtener información completa del usuario
    const user = await User.findById(decoded.id).select('-passwordHash');
    
    if (!user) {
      return res.status(401).json({ 
        success: false,
        error: "Usuario no encontrado" 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Error en autenticación:', error);
    return res.status(401).json({ 
      success: false,
      error: "Token inválido o expirado" 
    });
  }
}; 