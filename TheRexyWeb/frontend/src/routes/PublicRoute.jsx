import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function PublicRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/me")
      .then(() => {
        // Si está autenticado, redirige al dashboard y reemplaza el historial
        navigate("/user", { replace: true });
      })
      .catch(() => {
        setLoading(false);
      });
  }, [navigate]);

  if (loading) return <div className="text-center p-8">Cargando...</div>;
  return children;
}
