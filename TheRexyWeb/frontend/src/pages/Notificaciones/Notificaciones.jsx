import React, { useEffect, useState } from 'react';
import api from '../../api/axios';

export default function Notificaciones() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    const res = await api.get('/offers/notifications');
    setNotifications(res.data.notifications);
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4 text-cyan-700">Notificaciones</h1>
      {loading ? (
        <div>Cargando...</div>
      ) : notifications.length === 0 ? (
        <div>No tienes notificaciones recientes.</div>
      ) : (
        <ul className="space-y-4">
          {notifications.map(n => (
            <li key={n.id} className="border rounded-lg p-4 bg-white flex flex-col gap-1">
              <div className="font-semibold text-cyan-700">{n.offerTitle}</div>
              <div className={
                n.status === 'aceptada' ? 'text-green-700' : n.status === 'rechazada' ? 'text-red-700' : 'text-gray-700'
              }>
                Estado: {n.status}
              </div>
              <div className="text-xs text-gray-500">{new Date(n.date).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 