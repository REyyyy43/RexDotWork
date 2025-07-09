// src/pages/Home/Home.jsx
import { useNavigate } from "react-router-dom";
import { Briefcase, MessageCircle, ShoppingBag, Send, Users, Globe, Shield, Zap } from "lucide-react";
import RexyLogo from '../../assets/Rexy.png';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4 md:px-12 pb-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            Conecta. Trabaja. Crece. Bienvenido a <span className="text-blue-600">Rexy</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            Rexy es la plataforma donde puedes conseguir empleo rápidamente, postularte con un clic, chatear directo con ofertantes y ofrecer servicios en nuestro marketplace. Todo en un solo lugar.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
            <button
              onClick={() => navigate("/user")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition"
            >
              Buscar Empleos
            </button>
            <button
              onClick={() => navigate("/marketplace")}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-medium transition"
            >
              Explorar Marketplace
            </button>
          </div>
        </div>

        {/* Image or Illustration */}
        <div className="flex-1 flex justify-center">
          <div className="bg-gradient-to-br from-cyan-800 to-sky-600 rounded-full p-8 shadow-2xl">
            <img
              src={RexyLogo}
              alt="Rexy Logo"
              className="w-48 h-48 object-contain"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-20 max-w-6xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">¿Qué puedes hacer en Rexy?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Briefcase size={32} className="text-blue-600 mb-2" />}
            title="Conseguir Empleo"
            desc="Postúlate con facilidad y comienza a trabajar rápido."
          />
          <FeatureCard
            icon={<Send size={32} className="text-green-500 mb-2" />}
            title="Enviar tu CV"
            desc="Adjunta tu portafolio o propuesta al postularte."
          />
          <FeatureCard
            icon={<MessageCircle size={32} className="text-yellow-500 mb-2" />}
            title="Chatea Directo"
            desc="Comunicación inmediata entre ofertantes y postulantes."
          />
          <FeatureCard
            icon={<ShoppingBag size={32} className="text-purple-500 mb-2" />}
            title="Ofrecer Servicios"
            desc="Publica tus habilidades en el marketplace y gana dinero."
          />
        </div>
      </section>

      {/* About Section */}
      <section className="mt-20 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">¿Por qué elegir Rexy?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Somos más que una plataforma de empleo. Rexy conecta talento con oportunidades de manera inteligente y eficiente.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AboutCard
            icon={<Users size={24} className="text-cyan-600" />}
            title="Comunidad Global"
            description="Conectamos talento de todo el mundo con empresas que buscan profesionales excepcionales."
          />
          <AboutCard
            icon={<Zap size={24} className="text-yellow-500" />}
            title="Proceso Rápido"
            description="Postúlate con un clic y recibe respuestas en tiempo real. Sin procesos largos ni burocracia."
          />
          <AboutCard
            icon={<Shield size={24} className="text-green-600" />}
            title="Seguridad Garantizada"
            description="Tus datos están protegidos y las transacciones son seguras. Tu privacidad es nuestra prioridad."
          />
          <AboutCard
            icon={<Globe size={24} className="text-blue-600" />}
            title="Oportunidades Diversas"
            description="Desde trabajos remotos hasta proyectos freelance, encuentra la oportunidad perfecta para ti."
          />
          <AboutCard
            icon={<MessageCircle size={24} className="text-purple-600" />}
            title="Comunicación Directa"
            description="Chatea directamente con empleadores y clientes sin intermediarios."
          />
          <AboutCard
            icon={<ShoppingBag size={24} className="text-orange-500" />}
            title="Marketplace Integrado"
            description="Vende tus servicios y productos en nuestro marketplace integrado."
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="mt-20 bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Rexy en números</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <StatCard number="1000+" label="Usuarios activos" />
            <StatCard number="500+" label="Ofertas de empleo" />
            <StatCard number="200+" label="Servicios en marketplace" />
            <StatCard number="50+" label="Países conectados" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-20">
        <div className="max-w-6xl mx-auto py-12 px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-cyan-700 to-blue-600 rounded-full p-2 mr-3">
                  <img src={RexyLogo} alt="Rexy" className="w-8 h-8 object-contain" />
                </div>
                <h3 className="text-xl font-bold">Rexy</h3>
              </div>
              <p className="text-gray-300 text-sm">
                La plataforma que conecta talento con oportunidades. Trabaja, crece y alcanza tus metas.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Empleos</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="/user" className="hover:text-white transition">Buscar empleos</a></li>
                <li><a href="/user" className="hover:text-white transition">Publicar ofertas</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Marketplace</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="/marketplace" className="hover:text-white transition">Explorar productos</a></li>
                <li><a href="/user" className="hover:text-white transition">Vender servicios</a></li>
                <li><a href="/marketplace" className="hover:text-white transition">Mis productos</a></li>
                <li><a href="/chats" className="hover:text-white transition">Chats</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Soporte</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition">Centro de ayuda</a></li>
                <li><a href="#" className="hover:text-white transition">Contacto</a></li>
                <li><a href="#" className="hover:text-white transition">Términos de uso</a></li>
                <li><a href="#" className="hover:text-white transition">Privacidad</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Rexy. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Subcomponente para cada feature
function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition duration-300">
      <div className="flex flex-col items-center text-center">
        {icon}
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm mt-1">{desc}</p>
      </div>
    </div>
  );
}

// Subcomponente para las tarjetas de información
function AboutCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}

// Subcomponente para las estadísticas
function StatCard({ number, label }) {
  return (
    <div className="text-center">
      <div className="text-4xl font-bold mb-2">{number}</div>
      <div className="text-cyan-100 text-sm">{label}</div>
    </div>
  );
}
