import React, { useEffect, useState } from 'react';
import api from '../../api/axios';

export default function MisPostulaciones() {
  const [applications, setApplications] = useState([]);
  const [accepted, setAccepted] = useState(0);
  const [rejected, setRejected] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    const res = await api.get('/offers/my-applications');
    setApplications(res.data.applications);
    setAccepted(res.data.accepted);
    setRejected(res.data.rejected);
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4 text-cyan-700">Mis postulaciones</h1>
      <div className="mb-4 flex gap-6">
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded">Aceptadas: {accepted}</div>
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded">Rechazadas: {rejected}</div>
      </div>
      {loading ? (
        <div>Cargando...</div>
      ) : applications.length === 0 ? (
        <div>No tienes postulaciones aún.</div>
      ) : (
        <ul className="space-y-6">
          {applications.map(app => (
            <li key={app._id} className="border rounded-lg p-4 shadow bg-white">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                <div>
                  <div className="font-semibold text-lg text-cyan-700">{app.offer?.title}</div>
                  <div className="text-gray-600 text-sm">{app.offer?.company}</div>
                  <div className={`text-sm font-semibold ${
                    app.status === 'aceptada' ? 'text-green-700' : app.status === 'rechazada' ? 'text-red-700' : 'text-gray-700'
                  }`}>
                    {app.status === 'aceptada' ? '✅ Aceptada' : app.status === 'rechazada' ? '❌ Rechazada' : '⏳ Pendiente'}
                  </div>
                </div>
                {app.cvUrl && (
                  <a href={app.cvUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-700 underline font-semibold">Ver PDF adjunto</a>
                )}
              </div>
              <div className="mb-2 text-gray-700">{app.message}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 