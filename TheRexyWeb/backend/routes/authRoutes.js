import express from "express";
import { register, login, getMe, logout, getCountries, searchUsers } from "../controllers/userController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Rutas de autenticación
router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, getMe);
router.post("/logout", logout);

// Ruta para buscar usuarios por username
router.get("/users/search", auth, searchUsers);

// Ruta para obtener países y estados
router.get("/countries", getCountries);

export default router; 