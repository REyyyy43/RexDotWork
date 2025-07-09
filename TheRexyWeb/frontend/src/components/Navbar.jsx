import React, { useState } from "react";
import {
  ShoppingBag, Info, MessageCircle, User, Home as HomeIcon, Menu
} from "lucide-react";
import RexyLogo from '../assets/Rexy.png';
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="w-full bg-cyan-700 shadow flex flex-col px-4 py-2 z-20">
      <div className="flex items-center justify-between w-full mb-2">
        {/* Logo Rexy a la izquierda */}
        <div className="flex items-center gap-3">
          <img src={RexyLogo} alt="Rexy Logo" className="w-24 object-contain" />
        </div>
        {/* Mobile menu icon */}
        <button className="md:hidden text-gray-200" onClick={() => setShowMobileMenu(true)}>
          <Menu size={32} />
        </button>
      </div>

      {/* Desktop subnavbar */}
      <div className="hidden md:flex justify-center space-x-12 text-sm text-gray-200 font-medium">
        <div
          className={`flex items-center gap-2 cursor-pointer pb-1 transition-all duration-300 ${
            isActive('/user') ? 'border-b-2 border-white' : 'hover:border-b-2 hover:border-white'
          }`}
          onClick={() => navigate('/user')}
        >
          <HomeIcon size={18} /> <span>Inicio</span>
        </div>
        <div
          className={`flex items-center gap-2 cursor-pointer pb-1 transition-all duration-300 ${
            isActive('/marketplace') ? 'border-b-2 border-white' : 'hover:border-b-2 hover:border-white'
          }`}
          onClick={() => navigate('/marketplace')}
        >
          <ShoppingBag size={18} /> <span>Marketplace</span>
        </div>
        <div
          className={`flex items-center gap-2 cursor-pointer pb-1 transition-all duration-300 ${
            isActive('/colecciones') ? 'border-b-2 border-white' : 'hover:border-b-2 hover:border-white'
          }`}
          onClick={() => navigate('/colecciones')}
        >
          <Info size={18} /> <span>Colecciones</span>
        </div>
        <div
          className={`flex items-center gap-2 cursor-pointer pb-1 transition-all duration-300 ${
            isActive('/chats') ? 'border-b-2 border-white' : 'hover:border-b-2 hover:border-white'
          }`}
          onClick={() => navigate('/chats')}
        >
          <MessageCircle size={18} /> <span>Chats</span>
        </div>
        <div
          className={`flex items-center gap-2 cursor-pointer pb-1 transition-all duration-300 ${
            isActive('/perfil') ? 'border-b-2 border-white' : 'hover:border-b-2 hover:border-white'
          }`}
          onClick={() => navigate('/perfil')}
        >
          <User size={18} /> <span>Perfil</span>
        </div>
      </div>

      {/* Mobile full-screen menu (igual que antes) */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-50 bg-cyan-900 bg-opacity-95 flex flex-col items-center justify-center animate-fade-in">
          <button className="absolute top-4 right-6 text-white text-4xl font-bold" onClick={() => setShowMobileMenu(false)} aria-label="Cerrar">&times;</button>
          <div className="flex flex-col gap-8 items-center text-2xl text-white font-semibold">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => { navigate('/user'); setShowMobileMenu(false); }}>
              <HomeIcon size={28} /> Inicio
            </div>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => { navigate('/marketplace'); setShowMobileMenu(false); }}>
              <ShoppingBag size={28} /> Marketplace
            </div>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => { navigate('/colecciones'); setShowMobileMenu(false); }}>
              <Info size={28} /> Colecciones
            </div>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => { navigate('/chats'); setShowMobileMenu(false); }}>
              <MessageCircle size={28} /> Chats
            </div>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => { navigate('/perfil'); setShowMobileMenu(false); }}>
              <User size={28} /> Perfil
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
