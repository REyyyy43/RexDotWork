import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
  PlusCircle, Search, User, Briefcase, Tag, DollarSign, MessageCircle, Users, Loader2, AlertCircle, Menu
} from "lucide-react";
import RexyLogo from '../../assets/Rexy.png';
import "@fontsource/mulish/400.css";
import "@fontsource/mulish/700.css";
import Navbar from '../../components/Navbar';
import PostulationModal from '../../components/PostulationModal';
import api from '../../api/axios';
import PremiumCard from '../../components/PremiumCard';

export default function FreelancerDashboard() {
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroMin, setFiltroMin] = useState("");
  const [filtroMax, setFiltroMax] = useState("");
  const [ofertasPorCategoria, setOfertasPorCategoria] = useState({});
  const [paginaActual, setPaginaActual] = useState(1);
  const [paginaOfertasInternas, setPaginaOfertasInternas] = useState(1);
  const [loadingCategorias, setLoadingCategorias] = useState(false);
  const [loadingOfertas, setLoadingOfertas] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [nuevaOferta, setNuevaOferta] = useState({
    title: '',
    company: '',
    description: '',
    skills: '',
    salary: '',
    hours: '',
    categoria: '',
    workType: '',
    city: '',
  });
  const [preguntas, setPreguntas] = useState(['']);
  const [publicando, setPublicando] = useState(false);
  const [errorPublicar, setErrorPublicar] = useState("");
  const [mostrarMisOfertas, setMostrarMisOfertas] = useState(false);
  const [misOfertas, setMisOfertas] = useState([]);
  const [loadingMisOfertas, setLoadingMisOfertas] = useState(false);
  const [showApplicantsModal, setShowApplicantsModal] = useState(false);
  const [applicants, setApplicants] = useState([]);
  const [loadingApplicants, setLoadingApplicants] = useState(false);
  const [selectedOfferForApplicants, setSelectedOfferForApplicants] = useState(null);
  const [errorApplicants, setErrorApplicants] = useState('');
  const applicantsModalRef = useRef(null);
  const [todasLasOfertas, setTodasLasOfertas] = useState([]);
  const [loadingTodasLasOfertas, setLoadingTodasLasOfertas] = useState(true);
  const [errorTodasLasOfertas, setErrorTodasLasOfertas] = useState('');

  const [currentUser, setCurrentUser] = useState(null);
  
  // Estados para límite de postulaciones
  const [showPaymentCard, setShowPaymentCard] = useState(false);
  const [applicationCount, setApplicationCount] = useState(0);

  // 1. Agrega un nuevo estado para mostrar el modal de comprobante:
  const [showComprobanteModal, setShowComprobanteModal] = useState(false);
  const [comprobanteFile, setComprobanteFile] = useState(null);

  // Sidebar responsive y limpio:
  const [showSidebarMobile, setShowSidebarMobile] = useState(false);

  // Estados para búsqueda
  const [searchQuery, setSearchQuery] = useState('');

  // Obtener datos del usuario al cargar
  useEffect(() => {
    getUserData();
    checkApplicationLimit();
  }, []);

  // Función para obtener datos del usuario autenticado
  const getUserData = async () => {
    try {
      const response = await api.get('/me');
      setCurrentUser(response.data);
      console.log('✅ Usuario autenticado:', {
        email: response.data.email,
        id: response.data.id,
        country: response.data.country
      });
    } catch (error) {
      console.error('❌ Error obteniendo datos del usuario:', error);
    }
  };

  // Función para verificar límite de postulaciones
  const checkApplicationLimit = () => {
    const applications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
    const now = Date.now();
    const twentyFourHoursAgo = now - (24 * 60 * 60 * 1000);
    
    // Filtrar aplicaciones de las últimas 24 horas
    const recentApplications = applications.filter(app => app.timestamp > twentyFourHoursAgo);
    
    setApplicationCount(recentApplications.length);
    
    if (recentApplications.length >= 5) {
      setShowPaymentCard(true);
    } else {
      setShowPaymentCard(false);
    }
  };

  // Función para registrar una postulación
  const registerApplication = () => {
    const applications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
    const newApplication = {
      timestamp: Date.now(),
      userId: currentUser?.id
    };
    
    applications.push(newApplication);
    localStorage.setItem('jobApplications', JSON.stringify(applications));
    
    checkApplicationLimit();
  };

  // 1. ENVOLVER categoriasSidebar Y remotiveCategoryMap EN useMemo
  const categoriasSidebar = useMemo(() => [
    "Desarrollo Web", "Diseño Gráfico", "Marketing Digital", "Redes Sociales", "Escritura Creativa", "Fotografía", "Videografía", "Música y Audio", "Programación", "Soporte Técnico"
  ], []);
  // Eliminar const categorias = categoriasSidebar; // No se usa

  const remotiveCategoryMap = useMemo(() => ({
    "Desarrollo Web": "Software Development",
    "Diseño Gráfico": "Design",
    "Marketing Digital": "Marketing",
    "Redes Sociales": "Marketing",
    "Escritura Creativa": "Writing",
    "Fotografía": "Design",
    "Videografía": "Design",
    "Música y Audio": "Design",
    "Programación": "Software Development",
    "Soporte Técnico": "Customer Service"
  }), []);

  // Constante para paginación
  const OFERTAS_POR_PAGINA = 15;

  // Detectar idioma del usuario (por defecto español)
  const idiomaUsuario = navigator.language ? navigator.language.split('-')[0] : 'es';

  // Función para traducir texto usando el proxy backend
  // Si el endpoint no existe, devuelve el texto original (sin fetch)
  const traducir = useCallback(async (texto) => texto, []);

  // Fetch unificado de ofertas externas desde el backend
  useEffect(() => {
    async function fetchOfertasCategoria(cat) {
      let ofertas = [];
      const remotiveCat = remotiveCategoryMap[cat] || cat;
      
      try {
        // Usar el endpoint unificado del backend
        const response = await api.get('/offers/external');
        const externalJobs = response.data.jobs || [];
        
        // Filtrar por categoría si es necesario
        const filteredJobs = externalJobs.filter(job => {
          const jobCategory = job.category || job.type || '';
          return jobCategory.toLowerCase().includes(remotiveCat.toLowerCase());
        });
        
        // Transformar al formato esperado por el frontend
        const transformedJobs = filteredJobs.map((job, i) => ({
          id: `${job.source.toLowerCase()}-${cat}-${i}`,
          title: job.title,
          company: job.company,
          hours: null,
          hourlyRate: job.salary,
          price: job.salary,
          description: job.description ? job.description.slice(0, 120) + (job.description.length > 120 ? "..." : "") : "",
          descriptionFull: job.description || "",
          skills: (job.tags && job.tags.length ? job.tags : (job.skills && job.skills.length ? job.skills : [])).length > 0 ?
            (job.tags && job.tags.length ? job.tags : job.skills) : ["Sin requerimientos técnicos"],
              url: job.url,
              apiOffer: true,
          categoria: cat,
          source: job.source
        }));
        
        ofertas = transformedJobs;
      } catch (error) {
        console.error('❌ Error obteniendo ofertas externas:', error);
      }
      
      setOfertasPorCategoria(prev => ({ ...prev, [cat]: ofertas }));
    }
    if (filtroCategoria && !ofertasPorCategoria[filtroCategoria]) {
      fetchOfertasCategoria(filtroCategoria);
    }
  }, [filtroCategoria, traducir, idiomaUsuario, ofertasPorCategoria, remotiveCategoryMap]);

  // Loader moderno
  const Loader = () => (
    <div className="flex justify-center items-center py-10">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-700 border-t-transparent"></div>
    </div>
  );

  // Al iniciar, cargar 100 ofertas de cada categoría
  useEffect(() => {
    async function fetchAllCategorias() {
      setLoadingCategorias(true);
      let nuevasOfertas = {};
      for (const cat of categoriasSidebar) {
        let ofertas = [];
        const remotiveCat = remotiveCategoryMap[cat] || cat;
        try {
          const remotiveRes = await fetch(`https://remotive.com/api/remote-jobs?category=${encodeURIComponent(remotiveCat)}&limit=100`);
          const remotiveData = await remotiveRes.json();
          if (remotiveData.jobs && remotiveData.jobs.length) {
            const jobs = await Promise.all(remotiveData.jobs.slice(0, 100).map(async (job, i) => {
              let monto = null;
              let horas = null;
              if (job.salary) {
                const match = job.salary.match(/([\d,.]+)/g);
                if (match) monto = match[0].replace(/,/g, '');
              }
              const categoria = job.category ? await traducir(job.category) : cat;
              const title = await traducir(job.title);
              const company = await traducir(job.company_name);
              const descriptionFull = await traducir(job.description.replace(/<[^>]+>/g, ""));
              const description = descriptionFull.slice(0, 120) + (descriptionFull.length > 120 ? "..." : "");
              const skills = (job.tags && job.tags.length ? job.tags : (job.skills && job.skills.length ? job.skills : [])).length > 0 ?
                (job.tags && job.tags.length ? job.tags : job.skills) : ["Sin requerimientos técnicos"];
              return {
                id: `remotive-${cat}-${i}`,
                title,
                company,
                hours: horas,
                hourlyRate: monto,
                price: monto,
                description,
                descriptionFull,
                skills,
                url: job.url,
                apiOffer: true,
                categoria
              };
            }));
            ofertas = jobs;
          }
        } catch { /* ignore */ }
        nuevasOfertas[cat] = ofertas;
      }
      setOfertasPorCategoria(nuevasOfertas);
      setLoadingCategorias(false);
    }
    fetchAllCategorias();
  }, [traducir, categoriasSidebar, remotiveCategoryMap]);

  // Cuando selecciona una categoría, mostrar loader hasta que se cargue
  useEffect(() => {
    if (filtroCategoria) {
      setLoadingOfertas(true);
      const checkLoaded = setInterval(() => {
        if (ofertasPorCategoria[filtroCategoria]) {
          setLoadingOfertas(false);
          clearInterval(checkLoaded);
        }
      }, 200);
      return () => clearInterval(checkLoaded);
    }
  }, [filtroCategoria, ofertasPorCategoria]);

  // Paginación y filtrado
  // Sin filtro, mezclar 2 de cada categoría hasta 20
  let todas = [];
  for (let i = 0; i < 10; i++) {
    for (let cat of categoriasSidebar) {
      if (ofertasPorCategoria[cat] && ofertasPorCategoria[cat][i]) {
        todas.push(ofertasPorCategoria[cat][i]);
      }
      if (todas.length === 20) break;
    }
    if (todas.length === 20) break;
  }
  const totalPaginas = Math.ceil(todas.length / OFERTAS_POR_PAGINA);
  const ofertasPaginadas = todas.slice((paginaActual - 1) * OFERTAS_POR_PAGINA, paginaActual * OFERTAS_POR_PAGINA);

  // Cuando cambia la categoría, reiniciar la página
  useEffect(() => {
    setPaginaActual(1);
  }, [filtroCategoria]);

  // Carousel de paginación
  const Carousel = () => (
    <div className="flex justify-center gap-2 mt-6">
      {Array.from({ length: Math.min(totalPaginas, 10) }, (_, i) => (
        <button
          key={i}
          className={`px-3 py-1 rounded-full border ${paginaActual === i + 1 ? 'bg-cyan-700 text-white' : 'bg-white text-cyan-700 border-cyan-700'} font-bold`}
          onClick={() => setPaginaActual(i + 1)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );

  // Modal y handlers
  const handleNuevaOfertaChange = e => {
    setNuevaOferta({ ...nuevaOferta, [e.target.name]: e.target.value });
  };
  const handlePreguntaChange = (i, val) => {
    const arr = [...preguntas];
    arr[i] = val;
    setPreguntas(arr);
  };
  const agregarPregunta = () => setPreguntas([...preguntas, '']);
  const quitarPregunta = i => setPreguntas(preguntas.filter((_, idx) => idx !== i));
  const handleSubmitOferta = async e => {
    e.preventDefault();
    setPublicando(true);
    setErrorPublicar("");
    try {
      const body = {
        ...nuevaOferta,
        skills: nuevaOferta.skills.split(",").map(s => s.trim()),
        preguntas
      };
      const res = await fetch("/api/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      if (!res.ok) {
        let msg = "Error al publicar la oferta";
        try {
          const data = await res.json();
          if (data && data.error) msg = data.error;
          if (data && data.msg) msg = data.msg;
        } catch { /* ignore */ }
        throw new Error(msg);
      }
      setShowModal(false);
      setNuevaOferta({
        title: '',
        company: '',
        description: '',
        skills: '',
        salary: '',
        hours: '',
        categoria: '',
        workType: '',
        city: '',
      });
      setPreguntas(['']);
      // Opcional: podrías recargar las ofertas locales aquí
    } catch (err) {
      setErrorPublicar(err.message || "Error desconocido");
    } finally {
      setPublicando(false);
    }
  };

  const handleVerMisOfertas = async () => {
    setMostrarMisOfertas(true);
    setLoadingMisOfertas(true);
    try {
      const res = await fetch('/api/offers/mine', { credentials: 'include' });
      const data = await res.json();
      if (data.success) setMisOfertas(data.offers);
    } catch {
      // Error ignorado intencionalmente
    }
    setLoadingMisOfertas(false);
  };

  const handleShowApplicants = async (oferta) => {
    setSelectedOfferForApplicants(oferta);
    setShowApplicantsModal(true);
    setApplicants([]);
    setErrorApplicants('');
    setLoadingApplicants(true);
    try {
      const res = await api.get(`/offers/${oferta._id}/applicants`);
      setApplicants(res.data.postulantes);
    } catch (err) {
      setErrorApplicants('Error al cargar postulantes');
    }
    setLoadingApplicants(false);
  };

  const handleApplicantsModalClick = (e) => {
    if (e.target.classList.contains('modal-bg')) setShowApplicantsModal(false);
  };

  useEffect(() => {
    if (showApplicantsModal && applicantsModalRef.current) {
      applicantsModalRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (showApplicantsModal) {
      const handleEsc = (e) => {
        if (e.key === 'Escape') setShowApplicantsModal(false);
      };
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }
  }, [showApplicantsModal]);

  useEffect(() => {
    async function fetchTodasLasOfertas() {
      setLoadingTodasLasOfertas(true);
      setErrorTodasLasOfertas('');
      try {
        // 1. Obtener ofertas internas
        const internasRes = await api.get('/offers', { params: { countryCode: 'ALL', limit: 100 } });
        const ofertasInternas = internasRes.data.jobOffers || [];
        
        // 2. Obtener ofertas externas
        const externasRes = await api.get('/offers/external');
        const ofertasExternas = externasRes.data.jobs || [];
        
        // 3. Transformar ofertas externas al formato esperado
        const ofertasExternasFormateadas = ofertasExternas.map((job, index) => ({
          _id: `external_${job.source}_${index}`,
          title: job.title,
          company: job.company,
          description: job.description ? job.description.slice(0, 120) + (job.description.length > 120 ? "..." : "") : "",
          descriptionFull: job.description || "",
          skills: ["Sin requerimientos técnicos"], // Se puede mejorar extrayendo skills del description
          url: job.url,
          apiOffer: true,
          source: job.source,
          salary: job.salary,
          type: job.type,
          logo: job.logo
        }));
        
        // 4. Unir ambas listas
        const todasLasOfertas = [...ofertasInternas, ...ofertasExternasFormateadas];
        setTodasLasOfertas(todasLasOfertas);
      } catch (err) {
        console.error('❌ Error cargando ofertas:', err);
        setErrorTodasLasOfertas('Error al cargar las ofertas');
      }
      setLoadingTodasLasOfertas(false);
    }
    fetchTodasLasOfertas();
  }, []);

  const handleOpenApplyModal = (offer) => {
    setSelectedOffer(offer);
  };

  // Actualizar handleUpdateStatus para enviar el mensaje
  const handleUpdateStatus = async (applicationId, newStatus) => {
    try {
      await api.put(`/offers/applications/${applicationId}/status`, { status: newStatus });
      // Refrescar la lista de postulantes tras actualizar
      if (selectedOfferForApplicants) {
        await handleShowApplicants(selectedOfferForApplicants);
      }
    } catch (err) {
      alert('Error al actualizar el estado de la postulación');
    }
  };

  const [todasOfertasExternas, setTodasOfertasExternas] = useState([]);
  const [paginaOfertasExternas, setPaginaOfertasExternas] = useState(1);
  

  // Traer todas las ofertas externas al cargar la página
  useEffect(() => {
    async function fetchTodasExternas() {
      try {
        const response = await api.get('/offers/external');
        setTodasOfertasExternas(response.data.jobs || []);
      } catch (error) {
        console.error('❌ Error obteniendo todas las ofertas externas:', error);
      }
    }
    fetchTodasExternas();
  }, []);

  // Filtrar ofertas externas por categoría seleccionada en el sidebar
  const ofertasFiltradasSidebar = useMemo(() => {
    let filtered = todasOfertasExternas;
    
    // Filtrar por búsqueda
    if (searchQuery) {
      filtered = filtered.filter(job => 
        job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filtrar por categoría
    if (filtroCategoria) {
      const remotiveCat = remotiveCategoryMap[filtroCategoria]?.toLowerCase() || filtroCategoria.toLowerCase();
      filtered = filtered.filter(job => {
        const jobCategory = (job.category || job.type || '').toLowerCase();
        return jobCategory.includes(remotiveCat) || remotiveCat.includes(jobCategory);
      });
    }
    
    return filtered;
  }, [filtroCategoria, todasOfertasExternas, remotiveCategoryMap, searchQuery]);

  // 2. Calcula el total de páginas:
  const totalPaginasOfertasExternas = Math.ceil(ofertasFiltradasSidebar.length / OFERTAS_POR_PAGINA);
  const ofertasPaginadasOfertasExternas = ofertasFiltradasSidebar.slice(
    (paginaOfertasExternas - 1) * OFERTAS_POR_PAGINA,
    paginaOfertasExternas * OFERTAS_POR_PAGINA
  );

  // Unificar el filtrado de ofertas internas y externas por categoría
  const categoriaSeleccionada = filtroCategoria ? filtroCategoria.toLowerCase() : '';

  const ofertasInternasFiltradas = useMemo(() => {
    let filtered = todasLasOfertas.filter(o => !o.apiOffer && !o.source);
    if (searchQuery) {
      filtered = filtered.filter(o => 
        o.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (categoriaSeleccionada) {
      filtered = filtered.filter(o => (o.categoria || '').toLowerCase() === categoriaSeleccionada);
    }
    return filtered;
  }, [filtroCategoria, todasLasOfertas, searchQuery]);

  const ofertasExternasFiltradas = useMemo(() => {
    let filtered = ofertasPaginadasOfertasExternas;
    if (categoriaSeleccionada) {
      filtered = filtered.filter(o => (o.categoria || '').toLowerCase() === categoriaSeleccionada);
    }
    if (searchQuery) {
      filtered = filtered.filter(o => 
        o.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filtered;
  }, [filtroCategoria, ofertasPaginadasOfertasExternas, searchQuery]);

  // Paginación para ofertas internas (después de que ofertasInternasFiltradas esté definido)
  const totalPaginasOfertasInternas = Math.ceil(ofertasInternasFiltradas.length / OFERTAS_POR_PAGINA);
  const ofertasPaginadasInternas = ofertasInternasFiltradas.slice(
    (paginaOfertasInternas - 1) * OFERTAS_POR_PAGINA,
    paginaOfertasInternas * OFERTAS_POR_PAGINA
  );

  // En el render principal, justo antes de mostrar la lista de ofertas:
  if (showPaymentCard) {
    return (
      <>
        <Navbar />
        <main className="flex-1 flex items-center justify-center mt-12 bg-gray-100">
          <PremiumCard />
        </main>
      </>
    );
  }
  // El resto del render (ofertas, filtros, etc) va después de este if

  return (
    <>
      <Navbar />
      <div className="flex flex-1 min-h-0">
        {/* Sidebar escritorio */}
        <aside className="hidden md:flex w-72 bg-white pt-10 p-4 shadow-xl flex-col min-h-0 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6 text-cyan-700">Mi Panel</h2>
          <nav className="space-y-4 mb-8">
            {/* Eliminados: Ofertas, Publicar servicio, Mi perfil */}
            <button className="w-full flex items-center gap-2 bg-cyan-700 text-white px-4 py-2 rounded font-semibold hover:bg-cyan-800 transition" onClick={handleVerMisOfertas}>
              <Briefcase size={18}/> Mis ofertas creadas
            </button>
          </nav>
          <div className="mb-4">
            <h3 className="text-md font-semibold text-gray-700 mb-2">Categorías</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              {categoriasSidebar.map((cat, idx) => (
                <li key={idx} className={`hover:text-cyan-700 cursor-pointer flex items-center gap-2 ${filtroCategoria === cat ? 'font-bold text-cyan-700' : ''}`}
                  onClick={() => setFiltroCategoria(cat === filtroCategoria ? '' : cat)}>
                  <Tag size={16} /> {cat}
                </li>
              ))}
            </ul>
          </div>
        </aside>
        {/* Botón menú sidebar móvil */}
        <button className="md:hidden fixed bottom-4 left-4 z-40 bg-cyan-700 text-white p-3 rounded-full shadow-lg" onClick={() => setShowSidebarMobile(true)}>
          <Menu size={32} />
        </button>
        {/* Sidebar móvil overlay */}
        {showSidebarMobile && (
          <div className="fixed inset-0 z-50 bg-cyan-900 bg-opacity-95 flex flex-col items-center justify-start pt-10 animate-fade-in">
            <button className="absolute top-4 right-6 text-white text-4xl font-bold" onClick={() => setShowSidebarMobile(false)} aria-label="Cerrar">&times;</button>
            <h2 className="text-2xl font-bold mb-6 text-cyan-100 mt-8">Mi Panel</h2>
            <div className="w-full flex flex-col items-center">
              <div className="mb-8 w-full px-8">
                <h3 className="text-md font-semibold text-cyan-100 mb-2">Categorías</h3>
                <ul className="text-sm text-cyan-100 space-y-3">
                  {categoriasSidebar.map((cat, idx) => (
                    <li key={idx} className={`hover:text-cyan-300 cursor-pointer flex items-center gap-2 ${filtroCategoria === cat ? 'font-bold text-cyan-300' : ''}`}
                      onClick={() => { setFiltroCategoria(cat === filtroCategoria ? '' : cat); setShowSidebarMobile(false); }}>
                      <Tag size={18} /> {cat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
        {/* Main content */}
        <main className="flex-1 p-6 bg-gray-100 min-h-0 overflow-y-auto">
          <div className="flex flex-col items-start gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-cyan-700 rounded-full text-white font-bold flex items-center justify-center text-xl">
                {currentUser?.username?.charAt(0).toUpperCase() || 'F'}
              </div>
              <h1 className="text-3xl font-bold text-cyan-700">Hola, {currentUser?.username || 'Usuario'} 👋</h1>
            </div>
            <div className="w-full max-w-xl flex flex-col justify-start relative mt-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Buscar servicios, clientes, mensajes..."
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border border-cyan-200 shadow focus:outline-none focus:ring-2 focus:ring-cyan-700 placeholder-gray-400 bg-white transition-all duration-200 text-base"
                  style={{ boxShadow: '0 2px 8px 0 rgba(0, 180, 216, 0.08)' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-cyan-400 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:from-cyan-700 hover:to-cyan-500 transition-all duration-200 text-base focus:outline-none focus:ring-2 focus:ring-cyan-700 whitespace-nowrap"
                  onClick={() => setShowModal(true)}
                  type="button"
                  style={{ minWidth: 'fit-content' }}
                >
                  <PlusCircle size={20} className="inline-block align-middle" />
                  <span className="inline-block align-middle">Crear oferta</span>
                </button>
              </div>
              <Search className="absolute left-4 top-3 text-cyan-400" size={22} />
            </div>
          </div>
          
          {/* Card de pago Binance cuando se alcanza el límite */}
          {showPaymentCard && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-cyan-900 bg-opacity-70">
              <div className="w-full max-w-sm p-6 bg-white border-2 border-cyan-600 rounded-2xl shadow-2xl relative">
                <button
                  className="absolute top-2 right-2 text-cyan-400 hover:text-cyan-700 text-2xl font-bold"
                  onClick={() => setShowPaymentCard(false)}
                  aria-label="Cerrar"
                >
                  &times;
                </button>
                <h5 className="mb-4 text-2xl font-bold text-cyan-700 text-center">Plan Premium</h5>
                <div className="flex items-baseline justify-center text-cyan-900 mb-4">
                  <span className="text-3xl font-semibold">$</span>
                  <span className="text-5xl font-extrabold tracking-tight">5</span>
                  <span className="ms-1 text-xl font-normal text-cyan-500">/mes</span>
                </div>
                <ul className="space-y-4 my-6">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-cyan-700 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/></svg>
                    <span className="text-base text-cyan-700">Sin comisiones por proyectos</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-cyan-700 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/></svg>
                    <span className="text-base text-cyan-700">Pagos a través de Binance</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-cyan-700 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/></svg>
                    <span className="text-base text-cyan-700">Postulaciones ilimitadas por 24h</span>
                  </li>
                </ul>
                <button
                  className="w-full py-3 mt-2 bg-cyan-700 hover:bg-cyan-800 text-white font-bold rounded-lg text-lg transition"
                  onClick={() => setShowComprobanteModal(true)}
                >
                  Pagar con Binance
                </button>
                <p className="text-xs text-cyan-600 mt-4 text-center font-semibold">
                  * El plan premium te permite postularte sin límites durante 24 horas. Los pagos se procesan a través de Binance. No cobramos comisiones por tus proyectos.
                </p>
              </div>
            </div>
          )}
          
          {loadingTodasLasOfertas ? (
            <Loader />
          ) : errorTodasLasOfertas ? (
            <div className="text-center text-red-500 py-10">{errorTodasLasOfertas}</div>
          ) : (
            <>
              {/* Todas las ofertas juntas */}
              {(ofertasInternasFiltradas.length > 0 || ofertasExternasFiltradas.length > 0) && (
                <div className="bg-white p-4 rounded-2xl shadow mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                      {filtroCategoria ? `Ofertas de ${filtroCategoria}` : 'Todas las ofertas'}
                    </h2>
                  </div>
                  
                  {/* Todas las ofertas en estilo lista unificado */}
                  <ul className="divide-y divide-gray-200">
                    {/* Ofertas internas */}
                    {ofertasInternasFiltradas.map((offer) => (
                      <li
                        key={offer._id}
                        className="py-3 px-2 rounded relative hover:bg-gray-50 flex flex-col min-h-[140px] justify-between cursor-pointer"
                      >
                        <div onClick={() => setSelectedOffer(offer)}>
                          <p className="font-medium">{offer.title}</p>
                          <p className="text-sm text-gray-500">{offer.company}</p>
                          <p className="text-sm text-gray-500 mt-1 italic line-clamp-2">{offer.description}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {(offer.skills && offer.skills.length > 0)
                              ? offer.skills.map((skill, idx) => (
                                  <span key={idx} className="bg-cyan-100 text-cyan-700 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                                    {skill}
                                  </span>
                                ))
                              : <span className="text-xs text-gray-400 italic">Sin requerimientos técnicos</span>
                            }
                          </div>
                        </div>
                        <button
                          className="mt-2 self-end bg-cyan-700 text-white px-4 py-1 rounded hover:bg-cyan-800 text-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (showPaymentCard) return; // No abrir modal si está bloqueado
                            handleOpenApplyModal(offer);
                          }}
                        >
                          Postularse
                        </button>
                      </li>
                    ))}
                    
                    {/* Ofertas externas */}
                    {ofertasPaginadasOfertasExternas.map((oferta, i) => (
                      <li
                        key={oferta.id || i}
                        className="py-3 px-2 rounded relative hover:bg-gray-50 flex flex-col min-h-[140px] justify-between cursor-pointer"
                      >
                        <div>
                          <p className="font-medium">{oferta.title}</p>
                          <p className="text-sm text-gray-500">{oferta.company}</p>
                          <p className="text-sm text-gray-500 mt-1 italic line-clamp-2">{oferta.description}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {(oferta.skills && oferta.skills.length > 0)
                              ? oferta.skills.map((skill, idx) => (
                                  <span key={idx} className="bg-cyan-100 text-cyan-700 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                                    {skill}
                                  </span>
                                ))
                              : <span className="text-xs text-gray-400 italic">Sin requerimientos técnicos</span>
                            }
                          </div>
                        </div>
                        <a
                          href={oferta.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 self-end bg-cyan-700 text-white px-4 py-1 rounded hover:bg-cyan-800 text-sm"
                          onClick={(e) => {
                            if (showPaymentCard) {
                              e.preventDefault();
                              return;
                            }
                            registerApplication();
                          }}
                        >
                          Postular
                        </a>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Paginación para ofertas externas */}
                  {totalPaginasOfertasExternas > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-6">
                      <button
                        onClick={() => setPaginaOfertasExternas(p => Math.max(1, p - 1))}
                        disabled={paginaOfertasExternas === 1}
                        className="px-3 py-2 rounded-full border font-bold bg-white text-cyan-700 border-cyan-700 disabled:opacity-50"
                      >
                        &#8592;
                      </button>
                      {Array.from({ length: Math.min(totalPaginasOfertasExternas, 8) }, (_, i) => (
                        <button
                          key={i}
                          onClick={() => setPaginaOfertasExternas(i + 1)}
                          className={`px-3 py-2 rounded-full border font-bold mx-1 ${paginaOfertasExternas === i + 1 ? 'bg-cyan-700 text-white border-cyan-700' : 'bg-white text-cyan-700 border-cyan-700'}`}
                        >
                          {i + 1}
                        </button>
                      ))}
                      <button
                        onClick={() => setPaginaOfertasExternas(p => Math.min(totalPaginasOfertasExternas, p + 1))}
                        disabled={paginaOfertasExternas === totalPaginasOfertasExternas}
                        className="px-3 py-2 rounded-full border font-bold bg-white text-cyan-700 border-cyan-700 disabled:opacity-50"
                      >
                        &#8594;
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Mensaje cuando no hay ofertas */}
              {ofertasInternasFiltradas.length === 0 && ofertasExternasFiltradas.length === 0 && (
                <div className="text-center text-gray-500 py-10">
                  {searchQuery ? `No se encontraron ofertas que coincidan con "${searchQuery}"` : 'No hay ofertas disponibles.'}
                </div>
              )}
            </>
          )}

      {/* Modal para crear oferta propia */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl flex overflow-hidden">
            <form className="w-1/2 p-6 flex flex-col gap-3 border-r border-gray-200 bg-gray-50" onSubmit={handleSubmitOferta}>
              <h3 className="text-xl font-bold mb-2 text-cyan-700">Crear oferta</h3>
              {errorPublicar && <div className="text-red-600 text-sm mb-2">{errorPublicar}</div>}
              {publicando && <div className="text-cyan-700 text-sm mb-2">Publicando...</div>}
              <input name="title" value={nuevaOferta.title} onChange={handleNuevaOfertaChange} className="border rounded px-2 py-1" placeholder="Título" required />
              <input name="company" value={nuevaOferta.company} onChange={handleNuevaOfertaChange} className="border rounded px-2 py-1" placeholder="Empresa" required />
              <textarea name="description" value={nuevaOferta.description} onChange={handleNuevaOfertaChange} className="border rounded px-2 py-1" placeholder="Descripción" required />
              <input name="skills" value={nuevaOferta.skills} onChange={handleNuevaOfertaChange} className="border rounded px-2 py-1" placeholder="Habilidades (separadas por coma)" required />
              <input name="salary" value={nuevaOferta.salary} onChange={handleNuevaOfertaChange} className="border rounded px-2 py-1" placeholder="Salario" />
              <input name="hours" value={nuevaOferta.hours} onChange={handleNuevaOfertaChange} className="border rounded px-2 py-1" placeholder="Horas" />
              <select name="categoria" value={nuevaOferta.categoria} onChange={handleNuevaOfertaChange} className="border rounded px-2 py-1" required>
                <option value="">Selecciona categoría</option>
                {categoriasSidebar.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <select name="workType" value={nuevaOferta.workType} onChange={handleNuevaOfertaChange} className="border rounded px-2 py-1" required>
                <option value="">Selecciona tipo de trabajo</option>
                <option value="tiempo_completo">Tiempo Completo</option>
                <option value="tiempo_parcial">Tiempo Parcial</option>
                <option value="freelance">Freelance</option>
                <option value="contrato">Contrato</option>
                <option value="pasantía">Pasantía</option>
              </select>
              <div className="flex gap-2 mt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cerrar</button>
                <button type="submit" className="bg-cyan-700 text-white px-4 py-2 rounded hover:bg-cyan-800" disabled={publicando}>Publicar</button>
              </div>
            </form>
            <div className="w-1/2 p-6 flex flex-col gap-3 justify-between">
              <h4 className="text-lg font-bold text-cyan-700 mb-2">Preguntas para el postulante</h4>
              {preguntas.map((preg, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input value={preg} onChange={e => handlePreguntaChange(i, e.target.value)} className="border rounded px-2 py-1 w-full" placeholder={`Pregunta ${i + 1}`} />
                  {preguntas.length > 1 && <button type="button" onClick={() => quitarPregunta(i)} className="text-red-500 font-bold">X</button>}
                </div>
              ))}
              <button type="button" onClick={agregarPregunta} className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full mt-2">Agregar pregunta</button>
            </div>
          </div>
        </div>
      )}
      {mostrarMisOfertas && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
            <button onClick={() => setMostrarMisOfertas(false)} className="absolute top-2 right-2 text-gray-500 hover:text-cyan-700 text-xl">×</button>
            <h2 className="text-2xl font-bold mb-4 text-cyan-700">Mis ofertas creadas</h2>
            {loadingMisOfertas ? (
              <div className="text-center py-8">Cargando...</div>
            ) : misOfertas.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No has creado ofertas aún.</div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {misOfertas.map(oferta => (
                  <li key={oferta._id} className="py-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-lg text-cyan-700">{oferta.title}</div>
                        <div className="text-gray-600 text-sm">{oferta.company}</div>
                        <div className="text-gray-500 text-xs">{new Date(oferta.createdAt).toLocaleString()}</div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="text-sm text-gray-700">Postulaciones: <span className="font-bold">{oferta.applicationsCount}</span></div>
                        <button
                          className="flex items-center gap-1 text-cyan-700 hover:underline text-sm mt-1"
                          onClick={() => handleShowApplicants(oferta)}
                          title="Ver postulantes"
                        >
                          <Users size={16}/> Ver postulantes
                        </button>
                      </div>
                    </div>
                    <div className="text-gray-700 mt-2 line-clamp-2">{oferta.description}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Modal de postulantes */}
          {showApplicantsModal && (
            <div className="modal-bg fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" onClick={handleApplicantsModalClick}>
              <div ref={applicantsModalRef} className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <h2 className="text-xl font-bold mb-4 text-cyan-700">Postulantes a "{selectedOfferForApplicants?.title}"</h2>
                {errorApplicants && <p className="text-red-500 italic mb-2">{errorApplicants}</p>}
                {loadingApplicants ? (
                  <div className="flex items-center gap-2 text-cyan-700"><Loader2 className="animate-spin" /> Cargando postulantes...</div>
                ) : applicants.length === 0 ? (
                  <p className="text-gray-500 italic">No hay postulantes aún.</p>
                ) : (
                  <ul className="divide-y">
                    {applicants.map(app => (
                      <li key={app._id} className="py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700 font-bold text-lg">
                            {app.email?.charAt(0).toUpperCase() || '?'}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800">{app.email}</div>
                            <div className="text-sm text-gray-500">{app.country} {app.city && `- ${app.city}`}</div>
                            <div className="text-sm text-gray-700 mt-1">Mensaje: <span className="italic">{app.message || 'Sin mensaje'}</span></div>
                            {app.cvUrl && (
                              <div className="mt-1">
                                <a href={app.cvUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-700 underline font-semibold">Ver PDF adjunto</a>
                              </div>
                            )}
                            {/* Mostrar contacto solo si status es aceptada */}
                            {app.status === 'aceptada' && (
                              <div className="mt-1 text-sm text-green-700">
                                {app.email && <div>Email: {app.email}</div>}
                                {app.phone && <div>Teléfono: {app.phone}</div>}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 mt-2 md:mt-0">
                          {/* Textarea para mensaje al aceptar/rechazar */}
                          {app.status === 'pendiente' && (
                            <textarea
                              className="border rounded px-2 py-1 text-sm"
                              placeholder="Mensaje para el postulante (requerido al aceptar/rechazar)"
                              value={app._mensajeCambioEstado || ''}
                              onChange={e => setApplicants(prev => prev.map(a => a._id === app._id ? { ...a, _mensajeCambioEstado: e.target.value } : a))}
                            />
                          )}
                          <div className="flex gap-2">
                            {app.status !== 'aceptada' && (
                              <button onClick={() => handleUpdateStatus(app._id, 'aceptada')} className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs">Aceptar</button>
                            )}
                            {app.status !== 'rechazada' && (
                              <button onClick={() => handleUpdateStatus(app._id, 'rechazada')} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs">Rechazar</button>
                            )}
                            {app.email && (
                              <button 
                                onClick={() => {
                                  const subject = encodeURIComponent(`Postulación a "${selectedOfferForApplicants?.title}"`);
                                  const mailtoLink = `mailto:${app.email}?subject=${subject}`;
                                  console.log('📧 Abriendo cliente de correo:', {
                                    from: currentUser?.email,
                                    to: app.email,
                                    subject: `Postulación a "${selectedOfferForApplicants?.title}"`
                                  });
                                  
                                  // Método más confiable: crear enlace temporal y hacer clic
                                  const tempLink = document.createElement('a');
                                  tempLink.href = mailtoLink;
                                  tempLink.style.display = 'none';
                                  document.body.appendChild(tempLink);
                                  tempLink.click();
                                  document.body.removeChild(tempLink);
                                  
                                  // Fallback a Gmail web después de un breve delay
                                  setTimeout(() => {
                                    console.log('⚠️ Abriendo Gmail web como alternativa');
                                    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${app.email}&su=${subject}`;
                                    window.open(gmailLink, '_blank');
                                  }, 1000);
                                }} 
                                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
                              >
                                Contactar
                              </button>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => setShowApplicantsModal(false)}
                    className="px-4 py-2 border rounded hover:bg-gray-100"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {/* Modal de postulación unificado */}
      {selectedOffer && (
        <PostulationModal
          isOpen={!!selectedOffer}
          onClose={() => setSelectedOffer(null)}
          offer={selectedOffer}
          onSuccess={() => {
            setSelectedOffer(null);
            // Refrescar las ofertas si es necesario
          }}
          onError={(error) => {
            console.error('Error en postulación:', error);
          }}
          registerApplication={registerApplication}
        />
      )}
      {showComprobanteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-cyan-900 bg-opacity-80">
          <div className="w-full max-w-md p-8 bg-white border-2 border-cyan-600 rounded-2xl shadow-2xl relative flex flex-col items-center">
            <button
              className="absolute top-2 right-2 text-cyan-400 hover:text-cyan-700 text-2xl font-bold"
              onClick={() => setShowComprobanteModal(false)}
              aria-label="Cerrar"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-cyan-700 mb-4 text-center">Paga con USDT (TRC20)</h2>
            <p className="text-gray-700 text-center mb-2">Envíalo a la siguiente dirección:</p>
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
        </main>
      </div>
    </>
  );
}
