import Navbar from '../../components/Navbar';
import { Layers, ShoppingBag, UserCheck } from 'lucide-react';
import { useState } from 'react';

const colecciones = [
  {
    id: 1,
    title: 'Lanza tu negocio digital',
    description: 'Todo lo que necesitas para arrancar tu marca en internet.',
    items: [
      { type: 'Servicio', icon: UserCheck, label: 'Diseño de logo' },
      { type: 'Producto', icon: ShoppingBag, label: 'Kit de Branding' },
    ]
  },
  {
    id: 2,
    title: 'Aprende a programar',
    description: 'Recursos para empezar desde cero como desarrollador web.',
    items: [
      { type: 'Servicio', icon: UserCheck, label: 'Asesoría 1:1 de código' },
      { type: 'Producto', icon: ShoppingBag, label: 'Plantilla de portfolio' },
    ]
  }
];

export default function Colecciones() {
  const [showPagoModal, setShowPagoModal] = useState(false);
  const [comprobanteFile, setComprobanteFile] = useState(null);

  return (
    <div className="h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold text-cyan-700 mb-6">Colecciones destacadas</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {colecciones.map((col) => (
            <div key={col.id} className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-4">
                <Layers className="text-cyan-700" />
                <h2 className="text-xl font-semibold text-gray-800">{col.title}</h2>
              </div>
              <p className="text-sm text-gray-600 mb-4">{col.description}</p>
              <ul className="space-y-2">
                {col.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-700">
                    <item.icon size={16} className="text-cyan-600" /> {item.label} <span className="ml-auto text-xs text-gray-400">({item.type})</span>
                  </li>
                ))}
              </ul>
              <button
                className="mt-4 w-full text-sm bg-cyan-700 text-white py-2 rounded hover:bg-cyan-800"
                onClick={() => setShowPagoModal(true)}
              >
                Ver colección
              </button>
            </div>
          ))}
        </div>
      </main>
      {showPagoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-cyan-900 bg-opacity-80">
          <div className="w-full max-w-md p-8 bg-white border-2 border-cyan-600 rounded-2xl shadow-2xl relative flex flex-col items-center">
            <button
              className="absolute top-2 right-2 text-cyan-400 hover:text-cyan-700 text-2xl font-bold"
              onClick={() => setShowPagoModal(false)}
              aria-label="Cerrar"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-cyan-700 mb-4 text-center">Suscripción Colecciones</h2>
            <div className="flex items-baseline justify-center text-cyan-900 mb-4">
              <span className="text-3xl font-semibold">$</span>
              <span className="text-5xl font-extrabold tracking-tight">3</span>
              <span className="ms-1 text-xl font-normal text-cyan-500">/mes</span>
            </div>
            <p className="text-gray-700 text-center mb-2">Para ver tus beneficios debes pagar 3$ al mes.</p>
            <p className="text-gray-700 text-center mb-2">Paga con USDT (TRC20) a la siguiente dirección:</p>
            <div className="bg-cyan-100 border border-cyan-300 rounded-lg px-4 py-2 mb-2 text-center select-all text-cyan-900 font-mono text-lg">
              TMEkE4J2FhUhvQdDDMTranBpYN5FkgscVQ
            </div>
            <p className="text-gray-700 text-center mb-2">O envía el comprobante al correo:</p>
            <div className="bg-cyan-50 border border-cyan-300 rounded-lg px-4 py-2 mb-4 text-center select-all text-cyan-800 font-mono text-base">
              landaetareinaldo143@gmail.com
            </div>
            <div className="w-full mb-4">
              <label className="block text-cyan-700 font-semibold mb-2 text-center">Sube tu comprobante de pago:</label>
              <input
                type="file"
                name="comprobante"
                accept="image/*,application/pdf"
                className="block w-full text-sm text-gray-700 border border-cyan-300 rounded-lg cursor-pointer bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-600"
                onChange={e => setComprobanteFile(e.target.files[0])}
              />
            </div>
            <button
              className="w-full py-3 mt-2 bg-cyan-700 hover:bg-cyan-800 text-white font-bold rounded-lg text-lg transition"
              onClick={() => {/* lógica de subida de comprobante aquí */}}
              disabled={!comprobanteFile}
            >
              Subir comprobante
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
