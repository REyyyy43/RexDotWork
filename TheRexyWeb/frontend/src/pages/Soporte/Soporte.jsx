import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import {
  MessageCircle, FileText, CreditCard, Info, BadgeDollarSign
} from 'lucide-react';

export default function Soporte() {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Comentario enviado. ¡Gracias por tu opinión!');
    setFeedback('');
  };

  return (
    <div className="h-screen flex flex-col font-sans bg-gray-50 text-gray-900">
      <Navbar />
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold text-cyan-700 mb-6">Centro de Soporte</h1>

        {/* Comentarios */}
        <section className="bg-white p-6 rounded-xl shadow mb-6">
          <div className="flex items-center gap-2 mb-4">
            <MessageCircle size={20} className="text-cyan-600" />
            <h2 className="text-xl font-semibold">¿Tienes alguna sugerencia?</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full border rounded-md px-4 py-2 text-sm"
              rows="4"
              placeholder="Escribe tus comentarios, errores o sugerencias..."
            />
            <button
              type="submit"
              className="mt-3 bg-cyan-700 hover:bg-cyan-800 text-white px-4 py-2 rounded"
            >
              Enviar comentario
            </button>
          </form>
        </section>

        {/* Información general */}
        <section className="bg-white p-6 rounded-xl shadow mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Info size={20} className="text-cyan-600" />
            <h2 className="text-xl font-semibold">¿Qué es esta plataforma?</h2>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Esta es una plataforma todo-en-uno donde puedes ofrecer servicios, vender productos,
            publicar ideas o preguntas, formar parte de comunidades y encontrar ofertas laborales.
          </p>
        </section>

        {/* Métodos de pago */}
        <section className="bg-white p-6 rounded-xl shadow mb-6">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard size={20} className="text-cyan-600" />
            <h2 className="text-xl font-semibold">Métodos de pago aceptados</h2>
          </div>
          <ul className="list-disc ml-6 text-sm text-gray-600 space-y-1">
            <li>Tarjeta de crédito/débito (Visa, MasterCard, American Express)</li>
            <li>Pago móvil (solo Venezuela)</li>
            <li>Binance Pay / USDT</li>
            <li>Paypal (para compras internacionales)</li>
            <li>Transferencias bancarias (previa verificación)</li>
          </ul>
        </section>

        {/* Suscripciones */}
        <section className="bg-white p-6 rounded-xl shadow mb-6">
          <div className="flex items-center gap-2 mb-4">
            <BadgeDollarSign size={20} className="text-cyan-600" />
            <h2 className="text-xl font-semibold">Gestión de suscripciones</h2>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            En esta sección próximamente podrás ver tus suscripciones activas y su fecha de renovación.
          </p>
          <ul className="text-sm text-gray-600">
            <li>🧰 Plan de Freelance Pro – <em>No activa</em></li>
            <li>📈 Boost para Marketplace – <em>Disponible</em></li>
          </ul>
        </section>

        {/* Términos y condiciones */}
        <section className="bg-white p-6 rounded-xl shadow">
          <div className="flex items-center gap-2 mb-4">
            <FileText size={20} className="text-cyan-600" />
            <h2 className="text-xl font-semibold">Términos y Condiciones</h2>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Al usar esta plataforma, aceptas nuestras políticas de privacidad y términos de uso. Asegúrate de leerlos antes de continuar utilizando los servicios de la aplicación.
          </p>
          <button className="text-sm text-cyan-700 hover:underline">
            Ver documento completo
          </button>
        </section>
      </main>
    </div>
  );
}
