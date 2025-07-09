import React from 'react';

export default function PremiumModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-cyan-900 bg-opacity-80">
      <div className="w-full max-w-md p-8 bg-white border-2 border-cyan-600 rounded-2xl shadow-2xl relative flex flex-col items-center">
        <button
          className="absolute top-2 right-2 text-cyan-400 hover:text-cyan-700 text-2xl font-bold"
          onClick={onClose}
          aria-label="Cerrar"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-cyan-700 mb-4 text-center">Límite de postulaciones alcanzado</h2>
        <div className="flex items-baseline justify-center text-cyan-900 mb-4">
          <span className="text-3xl font-semibold">$</span>
          <span className="text-5xl font-extrabold tracking-tight">3</span>
          <span className="ms-1 text-xl font-normal text-cyan-500">/mes</span>
        </div>
        <p className="text-gray-700 text-center mb-2">Has alcanzado el límite de 5 postulaciones en 24 horas.</p>
        <p className="text-gray-700 text-center mb-2">Para seguir postulando, suscríbete al plan premium o espera 24 horas.</p>
        <p className="text-gray-700 text-center mb-2">Paga con USDT (TRC20) a la siguiente dirección:</p>
        <div className="bg-cyan-100 border border-cyan-300 rounded-lg px-4 py-2 mb-2 text-center select-all text-cyan-900 font-mono text-lg">
          TMEkE4J2FhUhvQdDDMTranBpYN5FkgscVQ
        </div>
        <p className="text-gray-700 text-center mb-2">O envía el comprobante al correo:</p>
        <div className="bg-cyan-50 border border-cyan-300 rounded-lg px-4 py-2 mb-4 text-center select-all text-cyan-800 font-mono text-base">
          landaetareinaldo143@gmail.com
        </div>
        <button
          className="w-full py-3 mt-2 bg-cyan-700 hover:bg-cyan-800 text-white font-bold rounded-lg text-lg transition"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
} 