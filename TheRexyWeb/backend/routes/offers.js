import express from 'express';
import JobOffer from '../models/JobOffer.js';
import { authenticateToken } from '../middleware/auth.js';
import JobApplication from '../models/JobApplication.js';
import axios from 'axios';
import Chat from '../models/Chat.js';
import User from '../models/User.js';

const router = express.Router();

// =========================
//  API DE OFERTAS DE EMPLEO
// =========================

// POST /api/offers
// Crea una nueva oferta de empleo. Requiere autenticación.
// Body: { title, company, description, requirements, skills, salary, workType, benefits, experience, education, preguntas }
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      title,
      company,
      description,
      requirements = [],
      skills = [],
      salary,
      workType,
      benefits = [],
      experience = 'sin_experiencia',
      education = 'sin_estudios',
      preguntas = []
    } = req.body;

    if (!title || !company || !description || !workType) {
      return res.status(400).json({ 
        success: false,
        error: 'Faltan campos obligatorios' 
      });
    }

    // Obtener ubicación del usuario
    const userLocation = {
      country: req.user.country,
      countryCode: req.user.countryCode,
      state: '',
      city: '',
      remote: true
    };

    const jobOffer = new JobOffer({
    title,
    company,
    description,
      requirements,
      skills,
      salary,
      workType,
      location: userLocation,
      employer: req.user._id,
      benefits,
      experience,
      education,
      preguntas
    });

    await jobOffer.save();

    const populatedOffer = await JobOffer.findById(jobOffer._id)
      .populate('employer', 'email phone country city');

    res.status(201).json({
      success: true,
      jobOffer: populatedOffer
    });

  } catch (error) {
    console.error('❌ Error en POST /api/offers:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

// GET /api/offers
// Obtiene todas las ofertas activas. Si se pasa countryCode, filtra por país; si no, muestra todas.
router.get('/', async (req, res) => {
  try {
    const { 
      countryCode, 
      state, 
      city, 
      workType, 
      experience,
      limit = 20, 
      offset = 0 
    } = req.query;

    // Construir filtros
    const filters = {
      status: 'activa'
    };
    if (countryCode && countryCode !== 'ALL') filters['location.countryCode'] = countryCode;
    if (state) filters['location.state'] = state;
    if (city) filters['location.city'] = city;
    if (workType) filters.workType = workType;
    if (experience) filters.experience = experience;

    const jobOffers = await JobOffer.find(filters)
      .populate('employer', 'email phone country city')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(offset));

    const total = await JobOffer.countDocuments(filters);

    res.json({
      success: true,
      jobOffers: jobOffers,
      pagination: {
        total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: offset + parseInt(limit) < total
      }
    });

  } catch (error) {
    console.error('❌ Error en GET /api/offers:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

// GET /api/offers/mine
// Devuelve las ofertas creadas por el usuario autenticado junto con el número de postulaciones recibidas.
// Requiere autenticación.
router.get('/mine', authenticateToken, async (req, res) => {
  try {
    console.log('🔎 [MINE] Usuario autenticado:', req.user && req.user._id);
    const myOffers = await JobOffer.find({ employer: req.user._id })
      .populate('employer', 'email phone country city')
      .sort({ createdAt: -1 });
    console.log('🔎 [MINE] Ofertas encontradas:', myOffers.length);
    // Contar postulaciones por oferta
    const offerIds = myOffers.map(o => o._id);
    console.log('🔎 [MINE] IDs de ofertas:', offerIds);
    const applications = await JobApplication.aggregate([
      { $match: { offer: { $in: offerIds } } },
      { $group: { _id: '$offer', count: { $sum: 1 } } }
    ]);
    console.log('🔎 [MINE] Conteo de postulaciones:', applications);
    const appMap = Object.fromEntries(applications.map(a => [a._id.toString(), a.count]));
    const offersWithCount = myOffers.map(o => ({
      ...o.toObject(),
      applicationsCount: appMap[o._id.toString()] || 0
    }));
    res.json({ success: true, offers: offersWithCount });
  } catch (error) {
    console.error('❌ Error en GET /api/offers/mine:', error);
    res.status(500).json({ success: false, error: 'Error interno del servidor', details: error.message });
  }
});

// GET /api/offers/my-applications
// Devuelve todas las postulaciones del usuario autenticado (como postulante)
router.get('/my-applications', authenticateToken, async (req, res) => {
  try {
    const applications = await JobApplication.find({ applicant: req.user._id })
      .populate('offer', 'title company');
    // Contar aceptadas y rechazadas
    const accepted = applications.filter(a => a.status === 'aceptada').length;
    const rejected = applications.filter(a => a.status === 'rechazada').length;
    res.json({ success: true, applications, accepted, rejected });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error obteniendo postulaciones' });
  }
});

// GET /api/offers/my-applications/today
// Devuelve el número de postulaciones hechas por el usuario en las últimas 24h
// Requiere autenticación
router.get('/my-applications/today', authenticateToken, async (req, res) => {
  try {
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const count = await JobApplication.countDocuments({
      applicant: req.user._id,
      createdAt: { $gte: since }
    });
    res.json({ success: true, count });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error obteniendo postulaciones de hoy' });
  }
});

// GET /api/offers/external
router.get('/external', async (req, res) => {
  try {
    // Arbeitnow
    const arbeitnowPromise = axios.get('https://www.arbeitnow.com/api/job-board-api');
    // RemoteOK
    const remoteokPromise = axios.get('https://remoteok.com/api');

    const [arbeitnowRes, remoteokRes] = await Promise.allSettled([
      arbeitnowPromise,
      remoteokPromise
    ]);

    let arbeitnowJobs = [];
    if (arbeitnowRes.status === 'fulfilled' && Array.isArray(arbeitnowRes.value.data.data)) {
      arbeitnowJobs = arbeitnowRes.value.data.data.map(job => ({
        id: `arbeitnow_${job.slug}`,
        title: job.title,
        company: job.company_name,
        location: job.location,
        url: job.url,
        description: job.description,
        source: 'Arbeitnow',
        tags: job.tags || [],
        job_types: job.job_types || [],
        created_at: job.created_at,
      }));
    }

    let remoteokJobs = [];
    if (remoteokRes.status === 'fulfilled' && Array.isArray(remoteokRes.value.data)) {
      // RemoteOK API returns an array, first element is metadata, skip it
      remoteokJobs = remoteokRes.value.data
        .filter(job => job.id && job.position)
        .map(job => ({
          id: `remoteok_${job.id}`,
          title: job.position,
          company: job.company,
          location: job.location,
          url: job.url,
          description: job.description,
          source: 'RemoteOK',
          tags: job.tags || [],
          job_types: job.tags || [],
          created_at: job.date,
        }));
    }

    const allJobs = [...arbeitnowJobs, ...remoteokJobs];

    res.json({ success: true, jobs: allJobs });
  } catch (error) {
    console.error('❌ Error en GET /api/offers/external:', error);
    res.status(500).json({ success: false, error: 'Error obteniendo ofertas externas' });
  }
});

// GET /api/offers/:id
// Obtiene una oferta específica por su ID.
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const jobOffer = await JobOffer.findById(id)
      .populate('employer', 'email phone country city');
    
    if (!jobOffer) {
      return res.status(404).json({
        success: false,
        error: 'Oferta no encontrada'
      });
    }

    res.json({
      success: true,
      jobOffer: jobOffer
    });

  } catch (error) {
    console.error('❌ Error en GET /api/offers/:id:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

// PUT /api/offers/:id
// Actualiza una oferta de empleo. Solo el empleador puede modificarla.
// Requiere autenticación.
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const jobOffer = await JobOffer.findById(id);
    
    if (!jobOffer) {
      return res.status(404).json({
        success: false,
        error: 'Oferta no encontrada'
      });
    }

    // Verificar que el usuario sea el empleador
    if (jobOffer.employer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: 'No tienes permisos para modificar esta oferta'
      });
    }

    // Actualizar la oferta
    Object.assign(jobOffer, updateData);
    await jobOffer.save();

    const updatedOffer = await JobOffer.findById(id)
      .populate('employer', 'email phone country city');

    res.json({
      success: true,
      jobOffer: updatedOffer
    });

  } catch (error) {
    console.error('❌ Error en PUT /api/offers/:id:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

// DELETE /api/offers/:id
// Elimina una oferta de empleo. Solo el empleador puede eliminarla.
// Requiere autenticación.
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const jobOffer = await JobOffer.findById(id);
    
    if (!jobOffer) {
      return res.status(404).json({
        success: false,
        error: 'Oferta no encontrada'
      });
    }

    // Verificar que el usuario sea el empleador
    if (jobOffer.employer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: 'No tienes permisos para eliminar esta oferta'
      });
    }

    await JobOffer.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Oferta eliminada correctamente'
    });

  } catch (error) {
    console.error('❌ Error en DELETE /api/offers/:id:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

// GET /api/offers/:id/applicants
// Devuelve la lista de postulantes a una oferta, incluyendo perfil, mensaje y archivo adjunto.
// Solo el empleador puede ver los postulantes de su oferta.
// Requiere autenticación.
router.get('/:id/applicants', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    // Verificar que la oferta existe y pertenece al usuario
    const offer = await JobOffer.findById(id);
    if (!offer) return res.status(404).json({ success: false, error: 'Oferta no encontrada' });
    if (offer.employer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, error: 'No autorizado' });
    }
    // Buscar postulaciones y poblar datos del usuario
    const applications = await JobApplication.find({ offer: id })
      .populate('applicant', 'email phone country countryCode state city createdAt');
    // Formatear respuesta
    const postulantes = applications.map(app => ({
      _id: app._id,
      userId: app.applicant._id,
      nombre: app.applicant.email.split('@')[0], // Mostrar solo nombre antes de aceptar
      email: (app.status === 'aceptada' || app.status === 'interesado') ? app.applicant.email : undefined,
      phone: (app.status === 'aceptada' || app.status === 'interesado') ? app.applicant.phone : undefined,
      country: app.applicant.country,
      countryCode: app.applicant.countryCode,
      state: app.applicant.state,
      city: app.applicant.city,
      createdAt: app.applicant.createdAt,
      message: app.message || '',
      appliedAt: app.createdAt,
      cvUrl: app.cvUrl,
      status: app.status
    }));
    res.json({ success: true, postulantes });
  } catch (error) {
    console.error('❌ Error en GET /api/offers/:id/applicants:', error);
    res.status(500).json({ success: false, error: 'Error interno del servidor' });
  }
});

// POST /api/offers/:id/apply
// Permite a un usuario postularse a una oferta. Guarda el mensaje de postulación, respuestas y currículum.
// Body: { message, respuestas, cvUrl }
// Requiere autenticación.
router.post('/:id/apply', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { message, respuestas = [], cvUrl = '' } = req.body; // Recibir mensaje, respuestas y currículum
    // Verificar que la oferta existe
    const offer = await JobOffer.findById(id);
    if (!offer) return res.status(404).json({ success: false, error: 'Oferta no encontrada' });
    // Verificar que el usuario no se haya postulado ya
    const exists = await JobApplication.findOne({ offer: id, applicant: req.user._id });
    if (exists) return res.status(400).json({ success: false, error: 'Ya te has postulado a esta oferta' });
    // Crear la postulación
    const application = new JobApplication({ offer: id, applicant: req.user._id, message, respuestas, cvUrl });
    await application.save();

    // --- NUEVO: Crear o actualizar chat y guardar mensaje ---
    const postulanteId = req.user._id;
    const ofertanteId = offer.employer;
    // Buscar chat existente entre ambos para esta oferta
    let chat = await Chat.findOne({
      participants: { $all: [postulanteId, ofertanteId] },
      offer: offer._id,
      type: 'postulacion'
    });
    if (!chat) {
      chat = new Chat({
        participants: [postulanteId, ofertanteId],
        offer: offer._id,
        type: 'postulacion',
        messages: []
      });
    }
    // Obtener datos del postulante
    const postulante = await User.findById(postulanteId);
    // Construir mensaje especial
    let chatText = `El usuario ${postulante.username || postulante.email} se postuló a la oferta "${offer.title}"`;
    if (message && message.trim()) {
      chatText += `\n\nMensaje de postulación:\n${message.trim()}`;
    }
    if (cvUrl) {
      chatText += `\nCurrículum: ${cvUrl}`;
    }
    chat.messages.push({ sender: postulanteId, text: chatText, createdAt: new Date(), read: false });
    chat.updatedAt = new Date();
    await chat.save();
    // --- FIN NUEVO ---

    res.json({ success: true, application });
  } catch (error) {
    console.error('❌ Error en POST /api/offers/:id/apply:', error);
    res.status(500).json({ success: false, error: 'Error interno del servidor' });
  }
});

// PUT /api/offers/applications/:applicationId/status
// Permite al ofertante cambiar el estado de una postulación (aceptada, rechazada)
// Solo el empleador de la oferta puede cambiar el estado
router.put('/applications/:applicationId/status', authenticateToken, async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;
    // Buscar la postulación y poblar la oferta y el postulante
    const application = await JobApplication.findById(applicationId).populate('offer').populate('applicant');
    if (!application) return res.status(404).json({ success: false, error: 'Postulación no encontrada' });
    // Solo el empleador puede cambiar el estado
    if (application.offer.employer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, error: 'No autorizado' });
    }
    // Validar nuevo estado
    const allowed = ['pendiente', 'aceptada', 'rechazada'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, error: 'Estado no válido' });
    }
    application.status = status;
    await application.save();
    res.json({ success: true, application });
  } catch (error) {
    console.error('❌ Error detallado en PUT /api/offers/applications/:applicationId/status:', error);
    res.status(500).json({ success: false, error: 'Error actualizando estado de postulación' });
  }
});

export default router;
