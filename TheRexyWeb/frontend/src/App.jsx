import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/signUp/Register";
import Home from "./pages/Home/Home";
import User from "./pages/User/user";
import Marketplace from "./pages/Marketplace/Marketplace";
import Colecciones from "./pages/Colecciones/Colecciones";
import Chats from "./pages/Chats/Chats";
import Soporte from "./pages/Soporte/Soporte";
import Perfil from "./pages/Perfil/Perfil";
import Services from "./pages/Services/Services";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import MisPostulaciones from './pages/MisPostulaciones/MisPostulaciones';
import Notificaciones from './pages/Notificaciones/Notificaciones';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/user" element={<PrivateRoute><User /></PrivateRoute>} />
        <Route path="/marketplace" element={<PrivateRoute><Marketplace /></PrivateRoute>} />
        <Route path="/colecciones" element={<PrivateRoute><Colecciones /></PrivateRoute>} />
        <Route path="/chats" element={<PrivateRoute><Chats /></PrivateRoute>} />
        <Route path="/soporte" element={<PrivateRoute><Soporte /></PrivateRoute>} />
        <Route path="/perfil" element={<PrivateRoute><Perfil /></PrivateRoute>} />
        <Route path="/services" element={<PrivateRoute><Services /></PrivateRoute>} />
        <Route path="/mis-postulaciones" element={<PrivateRoute><MisPostulaciones /></PrivateRoute>} />
        <Route path="/notificaciones" element={<PrivateRoute><Notificaciones /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}
