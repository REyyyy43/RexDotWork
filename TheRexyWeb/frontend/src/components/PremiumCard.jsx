import React from 'react';

export default function PremiumCard() {
  return (
    <div className="w-full max-w-xs mx-auto p-4 bg-white border-2 border-cyan-600 rounded-xl shadow-xl flex flex-col items-center">
      <h2 className="text-lg font-bold text-cyan-700 mb-2 text-center">Límite de postulaciones alcanzado</h2>
      <div className="flex items-baseline justify-center text-cyan-900 mb-2">
        <span className="text-xl font-semibold">$</span>
        <span className="text-3xl font-extrabold tracking-tight">3</span>
        <span className="ms-1 text-base font-normal text-cyan-500">/mes</span>
      </div>
      <p className="text-gray-700 text-center mb-1 text-sm">Has alcanzado el límite de 5 postulaciones en 24 horas.</p>
      <p className="text-gray-700 text-center mb-1 text-sm">Para seguir postulando, suscríbete al plan premium o espera 24 horas.</p>
      <p className="text-gray-700 text-center mb-1 text-sm">Paga con USDT (TRC20) a la siguiente dirección:</p>
      <div className="bg-cyan-100 border border-cyan-300 rounded-lg px-2 py-1 mb-1 text-center select-all text-cyan-900 font-mono text-xs">
        TMEkE4J2FhUhvQdDDMTranBpYN5FkgscVQ
      </div>
      <p className="text-gray-700 text-center mb-1 text-sm">O envía el comprobante al correo:</p>
      <div className="bg-cyan-50 border border-cyan-300 rounded-lg px-2 py-1 mb-2 text-center select-all text-cyan-800 font-mono text-xs">
        landaetareinaldo143@gmail.com
      </div>
    </div>
  );
} 