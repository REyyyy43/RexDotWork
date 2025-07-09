import React, { useState, useEffect } from 'react';
import { X, Upload, FileText, Send } from 'lucide-react';
import api from '../api/axios';

const PostulationModal = ({ 
  isOpen, 
  onClose, 
  offer, 
  onSuccess, 
  onError,
  registerApplication 
}) => {
  const [applyAnswers, setApplyAnswers] = useState([]);
  const [applyMessage, setApplyMessage] = useState('');
  const [applyCV, setApplyCV] = useState(null);
  const [applyLoading, setApplyLoading] = useState(false);
  const [applySuccess, setApplySuccess] = useState('');
  const [applyError, setApplyError] = useState('');
  const [cvUploading, setCvUploading] = useState(false);
  const [cvUrl, setCvUrl] = useState('');

  // Resetear estado cuando se abre el modal
  useEffect(() => {
    if (isOpen && offer) {
      setApplyAnswers(offer.preguntas ? offer.preguntas.map(() => '') : []);
      setApplyMessage('');
      setApplyCV(null);
      setCvUrl('');
      setApplySuccess('');
      setApplyError('');
    }
  }, [isOpen, offer]);

  const handleApplyAnswerChange = (i, val) => {
    const arr = [...applyAnswers];
    arr[i] = val;
    setApplyAnswers(arr);
  };

  const handleApplyCVChange = async (e) => {
    const file = e.target.files[0];
    setApplyCV(file);
    setCvUrl('');
    setApplyError('');
    if (file) {
      // Validar tipo de archivo
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setApplyError('Solo se permiten archivos PDF, DOC o DOCX');
        return;
      }
      setCvUploading(true);
      try {
        const formData = new FormData();
        formData.append('file', file);
        const res = await api.post('/products/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setCvUrl(res.data.url);
      } catch (err) {
        setApplyError('Error al subir el currículum');
      }
      setCvUploading(false);
    }
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    setApplyLoading(true);
    setApplySuccess('');
    setApplyError('');
    
    if (applyCV && !cvUrl) {
      setApplyError('Espera a que el currículum termine de subir');
      setApplyLoading(false);
      return;
    }
    
    try {
      await api.post(`/offers/${offer._id}/apply`, {
        message: applyMessage,
        respuestas: applyAnswers,
        cvUrl: cvUrl || ''
      });
      
      // Registrar la postulación para el límite
      if (registerApplication) {
        registerApplication();
      }
      
      setApplySuccess('¡Postulación enviada con éxito!');
      if (onSuccess) {
        onSuccess();
      }
      
      setTimeout(() => {
        onClose();
        setApplySuccess('');
      }, 1500);
    } catch (error) {
      let msg = 'Error al enviar la postulación';
      if (error && error.response && error.response.data && error.response.data.error) {
        msg = error.response.data.error;
      }
      setApplyError(msg);
      if (onError) {
        onError(error);
      }
    }
    setApplyLoading(false);
  };

  if (!isOpen || !offer) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-cyan-700 truncate pr-4">Postularse a "{offer.title}"</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
          >
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row h-full">
          {/* Información de la oferta */}
          <div className="lg:w-1/2 p-4 sm:p-6 bg-gray-50 border-b lg:border-b-0 lg:border-r">
            <h3 className="text-xl font-bold mb-4 text-gray-800">{offer.title}</h3>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Empresa:</span> {offer.company}
            </p>
            
            {offer.hours && (
              <div className="space-y-1 mb-4">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Horas estimadas:</span> {offer.hours}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Pago por hora:</span> ${offer.hourlyRate}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Cotización total:</span> ${offer.price}
                </p>
              </div>
            )}
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2 font-semibold">Descripción:</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                {offer.descriptionFull || offer.description}
              </p>
            </div>
            
            {offer.skills && offer.skills.length > 0 && (
              <div>
                <p className="text-sm text-gray-600 mb-2 font-semibold">Habilidades requeridas:</p>
                <div className="flex flex-wrap gap-2">
                  {offer.skills.map((skill, idx) => (
                    <span key={idx} className="bg-cyan-100 text-cyan-700 text-xs font-semibold px-3 py-1 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Formulario de postulación */}
          <div className="lg:w-1/2 p-4 sm:p-6 flex flex-col">
            <form onSubmit={handleApplySubmit} className="flex flex-col gap-4 h-full">
              {/* Preguntas del ofertante */}
              {offer.apiOffer && offer.preguntas && offer.preguntas.length > 0 && (
                <div>
                  <h4 className="font-semibold text-cyan-700 mb-3 flex items-center gap-2">
                    <FileText size={18} />
                    Responde las preguntas del ofertante:
                  </h4>
                  <div className="space-y-3">
                    {offer.preguntas.map((preg, i) => (
                      <div key={i}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {preg}
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                          value={applyAnswers[i]}
                          onChange={e => handleApplyAnswerChange(i, e.target.value)}
                          required
                          placeholder="Tu respuesta..."
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Subida de currículum */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Upload size={16} />
                  Currículum (PDF, DOCX, etc.)
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleApplyCVChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                />
                {cvUploading && (
                  <div className="text-cyan-700 text-sm mt-1">Subiendo currículum...</div>
                )}
                {cvUrl && (
                  <div className="text-green-700 text-sm mt-1">✓ Currículum subido correctamente</div>
                )}
              </div>

              {/* Mensaje para el ofertante */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Send size={16} />
                  Mensaje para el ofertante
                </label>
                <textarea
                  className="w-full h-full min-h-[120px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 resize-none"
                  value={applyMessage}
                  onChange={e => setApplyMessage(e.target.value)}
                  required
                  placeholder="Explica por qué eres ideal para este trabajo..."
                />
              </div>

              {/* Estados de error y éxito */}
              {applyError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="text-red-600 text-sm">{applyError}</div>
                </div>
              )}
              {applySuccess && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="text-green-600 text-sm">{applySuccess}</div>
                </div>
              )}

              {/* Botones de acción */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={applyLoading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {applyLoading ? 'Enviando...' : 'Enviar postulación'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostulationModal; 