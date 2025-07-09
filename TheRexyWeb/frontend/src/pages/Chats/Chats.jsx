import React, { useEffect, useState, useRef } from 'react';
import api from '../../api/axios';
import { io } from 'socket.io-client';
import Navbar from '../../components/Navbar';
import { Send, UserCircle, Menu, Search, Users } from 'lucide-react';

const socket = io(import.meta.env.VITE_API_URL, { withCredentials: true });

export default function Chats() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const [selectedChatId, setSelectedChatId] = useState(1);
  const [messageInput, setMessageInput] = useState('');
  const chatRef = useRef(null);
  const [showSidebarMobile, setShowSidebarMobile] = useState(false);
  
  // Estados para búsqueda
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchingUsers, setSearchingUsers] = useState(false);
  const [showUserSearch, setShowUserSearch] = useState(false);

  useEffect(() => {
    // Obtener usuario actual y sus chats
    const fetchChats = async () => {
      setLoading(true);
      const meRes = await api.get('/me');
      setUserId(meRes.data.id);
      const res = await api.get('/products/chats');
      setChats(res.data.chats);
      setLoading(false);
    };
    fetchChats();
  }, []);

  useEffect(() => {
    if (userId) {
      socket.emit('join', userId);
    }
  }, [userId]);

  useEffect(() => {
    socket.on('receive_message', ({ message, chatId }) => {
      setChats(prevChats => prevChats.map(chat => {
        if (chat._id !== chatId) return chat;
        // Evitar duplicados por createdAt y texto
        const exists = chat.messages.some(m => m.createdAt === message.createdAt && m.text === message.text);
        if (exists) return chat;
        return { ...chat, messages: [...chat.messages, message], updatedAt: new Date() };
      }));
      setSelectedChat(prev => {
        if (!prev || prev._id !== chatId) return prev;
        const exists = prev.messages.some(m => m.createdAt === message.createdAt && m.text === message.text);
        if (exists) return prev;
        return { ...prev, messages: [...prev.messages, message], updatedAt: new Date() };
      });
    });
    return () => {
      socket.off('receive_message');
    };
  }, []);

  // Función para buscar usuarios autenticados
  const searchUsers = async (query) => {
    if (!query.trim() || query.length < 2) {
      setSearchResults([]);
      return;
    }
    
    setSearchingUsers(true);
    try {
      const response = await api.get(`/users/search?q=${encodeURIComponent(query)}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error buscando usuarios:', error);
      setSearchResults([]);
    } finally {
      setSearchingUsers(false);
    }
  };

  // Función para iniciar chat con usuario
  const startChatWithUser = async (user) => {
    try {
      const response = await api.post('/products/chats', {
        participantId: user._id,
        type: 'direct'
      });
      
      // Agregar el nuevo chat a la lista
      setChats(prev => [...prev, response.data.chat]);
      setSelectedChat(response.data.chat);
      setShowUserSearch(false);
      setSearchQuery('');
      setSearchResults([]);
      
      if (showSidebarMobile) {
        setShowSidebarMobile(false);
      }
    } catch (error) {
      console.error('Error iniciando chat:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedChat) return;
    // Solo enviar mensaje por socket
    const msgObj = { sender: userId, text: message, createdAt: new Date(), read: false };
    socket.emit('send_message', {
      toUserId: selectedChat.participants.find(p => p._id !== userId)._id,
      fromUserId: userId,
      message: msgObj,
      chatId: selectedChat._id
    });
    setMessage('');
    scrollToBottom();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [selectedChat, selectedChat?.messages?.length]);

  // Filtrar chats por búsqueda
  const filteredChats = chats.filter(chat => {
    if (!searchQuery) return true;
    const other = chat.participants.find(p => p._id !== userId);
    return other?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
           chat.offer?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
           chat.messages[chat.messages.length-1]?.text?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (loading) return <div className="p-8">Cargando chats...</div>;

  const otherUser = selectedChat?.participants?.find(p => p._id !== userId);

  return (
    <div className="h-screen overflow-hidden flex flex-col font-sans">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar de chats escritorio */}
        <aside className="w-80 bg-white border-r flex flex-col overflow-hidden hidden md:flex">
          <div className="p-4 border-b">
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Buscar chats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-3 py-2 text-sm border rounded-lg focus:outline-cyan-600"
              />
              <button
                onClick={() => setShowUserSearch(!showUserSearch)}
                className="px-3 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 text-sm"
                title="Buscar usuarios"
              >
                <Users size={16} />
              </button>
            </div>
            {showUserSearch && (
              <div className="mb-2">
                <input
                  type="text"
                  placeholder="Buscar usuarios..."
                  onChange={(e) => searchUsers(e.target.value)}
                  className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-cyan-600"
                />
                {searchingUsers && <div className="text-xs text-gray-500 mt-1">Buscando...</div>}
                {searchResults.length > 0 && (
                  <div className="mt-2 max-h-32 overflow-y-auto">
                    {searchResults.map(user => (
                      <div
                        key={user._id}
                        onClick={() => startChatWithUser(user)}
                        className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer text-sm"
                      >
                        <UserCircle size={20} className="text-cyan-600" />
                        <span className="font-semibold">{user.username}</span>
                        <span className="text-gray-500 ml-2">{user.email}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex-1 overflow-y-auto custom-scroll">
            {filteredChats
              .filter(chat => chat.participants.some(p => p._id !== userId))
              .map(chat => {
                const other = chat.participants.find(p => p._id !== userId);
                return (
                  <div
                    key={chat._id}
                    className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-100 ${
                      selectedChat?._id === chat._id ? 'bg-cyan-50' : ''
                    }`}
                    onClick={() => setSelectedChat(chat)}
                  >
                    <UserCircle className="text-cyan-600" size={36} />
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-800">{other?.email || 'Usuario'}</span>
                      {chat.offer?.title && (
                        <span className="text-xs text-cyan-700 font-semibold">{chat.offer.title}</span>
                      )}
                      <span className="text-sm text-gray-500 truncate w-48">{chat.messages[chat.messages.length-1]?.text}</span>
                    </div>
                  </div>
                );
              })}
          </div>
        </aside>
        
        {/* Botón menú sidebar móvil */}
        <button className="md:hidden fixed bottom-4 left-4 z-40 bg-cyan-700 text-white p-3 rounded-full shadow-lg" onClick={() => setShowSidebarMobile(true)}>
          <Menu size={24} />
        </button>
        
        {/* Sidebar móvil overlay */}
        {showSidebarMobile && (
          <div className="fixed inset-0 z-50 bg-cyan-900 bg-opacity-95 flex flex-col items-center justify-start pt-10 animate-fade-in">
            <button className="absolute top-4 right-6 text-white text-4xl font-bold" onClick={() => setShowSidebarMobile(false)} aria-label="Cerrar">&times;</button>
            
            <div className="w-full max-w-md mx-auto px-4">
              <div className="bg-white rounded-lg p-4 mb-4">
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Buscar chats..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 px-3 py-2 text-sm border rounded-lg focus:outline-cyan-600 bg-white"
                  />
                  <button
                    onClick={() => setShowUserSearch(!showUserSearch)}
                    className="px-3 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 text-sm"
                    title="Buscar usuarios"
                  >
                    <Users size={16} />
                  </button>
                </div>
                {showUserSearch && (
                  <div className="mb-2">
                    <input
                      type="text"
                      placeholder="Buscar usuarios..."
                      onChange={(e) => searchUsers(e.target.value)}
                      className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-cyan-600 bg-white"
                    />
                    {searchingUsers && <div className="text-xs text-gray-500 mt-1">Buscando...</div>}
                    {searchResults.length > 0 && (
                      <div className="mt-2 max-h-32 overflow-y-auto">
                        {searchResults.map(user => (
                          <div
                            key={user._id}
                            onClick={() => startChatWithUser(user)}
                            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer text-sm"
                          >
                            <UserCircle size={20} className="text-cyan-600" />
                            <span className="text-gray-800">{user.email}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scroll w-full max-w-md mx-auto px-4">
              {filteredChats
                .filter(chat => chat.participants.some(p => p._id !== userId))
                .map(chat => {
                  const other = chat.participants.find(p => p._id !== userId);
                  return (
                    <div
                      key={chat._id}
                      className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-100 bg-white rounded-lg mb-2 ${
                        selectedChat?._id === chat._id ? 'bg-cyan-50' : ''
                      }`}
                      onClick={() => { setSelectedChat(chat); setShowSidebarMobile(false); }}
                    >
                      <UserCircle className="text-cyan-600" size={36} />
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-800">{other?.email || 'Usuario'}</span>
                        {chat.offer?.title && (
                          <span className="text-xs text-cyan-700 font-semibold">{chat.offer.title}</span>
                        )}
                        <span className="text-sm text-gray-500 truncate w-48">{chat.messages[chat.messages.length-1]?.text}</span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* Panel de mensajes */}
        <main className="flex-1 flex flex-col overflow-hidden bg-white">
          {/* Header del chat */}
          <div className="flex items-center gap-3 px-6 py-4 bg-white border-b shadow-sm">
            <UserCircle className="text-cyan-700" size={40} />
            <div className="flex flex-col">
              <span className="font-bold text-lg">
                {otherUser?.username || otherUser?.email || 'Chat'}
              </span>
              {selectedChat?.offer?.title && (
                <span className="text-xs text-cyan-700 font-semibold">{selectedChat.offer.title}</span>
              )}
            </div>
          </div>

          {/* Área de mensajes */}
          <div
            ref={messagesEndRef}
            className="flex-1 overflow-y-auto px-6 py-4 bg-gray-50 space-y-3 custom-scroll"
          >
            {selectedChat?.messages.map((msg, idx) => {
              // Detectar si el mensaje contiene un enlace de currículum
              const lines = msg.text.split(/\n|\r/);
              return (
              <div
                  key={idx}
                className={`max-w-[75%] px-4 py-2 rounded-xl text-sm shadow-sm relative ${
                    msg.sender === userId
                    ? 'ml-auto bg-cyan-600 text-white'
                    : 'bg-white text-gray-800 border'
                }`}
              >
                  {lines.map((line, i) => {
                    // Buscar línea de currículum
                    if (line.trim().startsWith('Currículum:')) {
                      const url = line.replace('Currículum:', '').trim();
                      return (
                        <div key={i} className="mt-2">
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-2 bg-cyan-600 text-white rounded-lg font-semibold shadow hover:bg-cyan-700 transition text-xs sm:text-sm"
                            download
                          >
                            Descargar currículum
                          </a>
                        </div>
                      );
                    }
                    // Renderizar otras líneas normalmente
                    return <div key={i}>{line}</div>;
                  })}
                <span className="absolute text-[10px] bottom-1 right-2 text-gray-300">
                    {new Date(msg.createdAt).toLocaleString()}
                </span>
              </div>
              );
            })}
          </div>

          {/* Input para enviar mensaje */}
          <div className="p-3 border-t flex gap-3 items-center bg-white">
            <input
              type="text"
              placeholder="Escribe un mensaje..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 px-4 py-2 border rounded-full focus:outline-cyan-600 text-sm"
            />
            <button
              onClick={handleSendMessage}
              className="bg-cyan-700 text-white p-2 rounded-full hover:bg-cyan-800"
            >
              <Send size={18} />
            </button>
          </div>
        </main>
      </div>

      {/* Scroll personalizado */}
      <style>{`
        .custom-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background-color: rgba(0,0,0,0.2);
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}
