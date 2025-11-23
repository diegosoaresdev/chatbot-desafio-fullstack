import React, { useState, useEffect } from 'react';
import axios from 'axios';

// --- CONFIGURAÇÃO & CONSTANTES ---
const API_BASE_URL = 'http://127.0.0.1:8000/api';
const USERS = {
  A: { id: 'A', label: 'Usuário A (VIP)', color: 'blue' },
  B: { id: 'B', label: 'Usuário B (Padrão)', color: 'green' }
};

const api = axios.create({ baseURL: API_BASE_URL });

// --- SUB-COMPONENTES (UI) ---

/**
 * Tela de Login: Foca apenas em permitir a seleção do usuário.
 */
const LoginScreen = ({ onLogin }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div className="max-w-md w-full bg-white shadow-lg rounded-xl overflow-hidden">
      <div className="bg-indigo-600 p-8 text-center">
        <h1 className="text-3xl font-bold text-white">Bem-vindo</h1>
        <p className="text-indigo-100 mt-2">Sistema de Atendimento Inteligente</p>
      </div>
      <div className="p-8 space-y-4">
        {Object.values(USERS).map((user) => (
          <button
            key={user.id}
            onClick={() => onLogin(user.id)}
            className={`w-full py-4 px-6 border border-gray-200 hover:border-${user.color}-500 
              bg-white hover:bg-${user.color}-50 text-left rounded-lg transition-all 
              flex items-center justify-between group shadow-sm hover:shadow-md`}
          >
            <span className="font-semibold text-gray-700 group-hover:text-gray-900">{user.label}</span>
            <span className="text-gray-400">➜</span>
          </button>
        ))}
      </div>
    </div>
  </div>
);

/**
 * Mensagem Individual: Responsável por renderizar o balão de fala.
 */
const MessageItem = ({ content, response, date }) => (
  <div className="mb-6 animate-fade-in">
    {/* Mensagem do Usuário (Direita) */}
    <div className="flex justify-end mb-2">
      <div className="bg-indigo-600 text-white py-2 px-4 rounded-tr-none rounded-2xl max-w-[85%] shadow-sm">
        <p className="text-sm">{content}</p>
      </div>
    </div>
    
    {/* Resposta do Bot (Esquerda) */}
    <div className="flex justify-start">
      <div className="bg-white border border-gray-200 text-gray-800 py-3 px-5 rounded-tl-none rounded-2xl max-w-[90%] shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold text-indigo-600 uppercase">Atendente Virtual</span>
          <span className="text-xs text-gray-400">{new Date(date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        </div>
        <p className="text-sm leading-relaxed">{response}</p>
      </div>
    </div>
  </div>
);

// --- COMPONENTE PRINCIPAL (LÓGICA) ---

function App() {
  // Estado Global da Tela
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('chat');
  const [isOffline, setIsOffline] = useState(false);

  // Estado de Dados
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputMessage, setInputMessage] = useState('');

  // --- SERVIÇOS (Funções de API) ---
  
  const fetchHistory = async (userId) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/chat/?user_identifier=${userId}`);
      setHistory(data);
      setIsOffline(false);
    } catch (error) {
      console.warn("API Error:", error);
      handleOfflineMode(userId);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const msg = inputMessage;
    setInputMessage(''); // Otimistic UI update

    try {
      const { data } = await api.post('/chat/', {
        user_identifier: currentUser,
        content: msg
      });
      // Adiciona a nova mensagem ao final da lista atual
      setHistory(prev => [...prev, data]);
      setIsOffline(false);
    } catch (error) {
      handleOfflineMode(currentUser, msg);
    }
  };

  // Fallback para quando o backend não estiver rodando
  const handleOfflineMode = (userId, newMsgContent = null) => {
    setIsOffline(true);
    if (newMsgContent) {
      const mockResponse = userId === 'A' 
        ? "Resposta VIP (Modo Offline)" 
        : "Resposta Padrão (Modo Offline)";
      
      const mockMsg = {
        id: Date.now(),
        content: newMsgContent,
        response: mockResponse,
        created_at: new Date().toISOString()
      };
      setHistory(prev => [...prev, mockMsg]);
    } else if (history.length === 0) {
      setHistory([{ 
        id: 0, 
        content: "Teste Offline", 
        response: "Sistema offline. Dados simulados.", 
        created_at: new Date().toISOString() 
      }]);
    }
  };

  // --- EFEITOS ---
  
  useEffect(() => {
    if (currentUser) {
      fetchHistory(currentUser);
    } else {
      setHistory([]);
    }
  }, [currentUser, activeTab]);

  // --- RENDERIZAÇÃO ---

  if (!currentUser) return <LoginScreen onLogin={setCurrentUser} />;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm z-10 sticky top-0">
        <div className="max-w-3xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-${USERS[currentUser].color}-100 text-${USERS[currentUser].color}-600 font-bold`}>
              {currentUser}
            </div>
            <div>
              <h1 className="font-bold text-gray-800 text-sm md:text-base">{USERS[currentUser].label}</h1>
              <p className="text-xs text-green-500 flex items-center gap-1">
                ● {isOffline ? 'Modo Offline' : 'Online'}
              </p>
            </div>
          </div>
          <button 
            onClick={() => setCurrentUser(null)}
            className="text-sm text-gray-500 hover:text-red-500 transition-colors font-medium"
          >
            Sair
          </button>
        </div>
        
        {/* Tabs */}
        <div className="flex max-w-3xl mx-auto px-4 mt-2 gap-6">
          {['chat', 'historico'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors capitalize
                ${activeTab === tab 
                  ? 'border-indigo-600 text-indigo-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      {/* Área Principal */}
      <main className="flex-1 max-w-3xl w-full mx-auto p-4 flex flex-col">
        {activeTab === 'chat' && (
          <>
            <div className="flex-1 overflow-y-auto mb-4 space-y-4 min-h-[300px]">
              {history.length === 0 && !loading && (
                <div className="text-center text-gray-400 mt-10">
                  <p>Inicie a conversa enviando uma mensagem.</p>
                </div>
              )}
              {history.map((msg, idx) => (
                <MessageItem 
                  key={msg.id || idx} 
                  content={msg.content} 
                  response={msg.response} 
                  date={msg.created_at} 
                />
              ))}
            </div>

            <form onSubmit={sendMessage} className="relative mt-auto">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="w-full pl-4 pr-14 py-4 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              />
              <button 
                type="submit"
                disabled={!inputMessage.trim()}
                className="absolute right-2 top-2 bottom-2 bg-indigo-600 text-white rounded-lg px-4 font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Enviar
              </button>
            </form>
          </>
        )}

        {activeTab === 'historico' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-50 bg-gray-50">
              <h3 className="font-semibold text-gray-700">Histórico Completo</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {loading ? (
                <p className="p-4 text-center text-gray-500">Carregando...</p>
              ) : history.length === 0 ? (
                <p className="p-8 text-center text-gray-400">Nenhum registro encontrado.</p>
              ) : (
                history.map((msg, idx) => (
                  <div key={msg.id || idx} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>{new Date(msg.created_at).toLocaleDateString()}</span>
                      <span>{new Date(msg.created_at).toLocaleTimeString()}</span>
                    </div>
                    <p className="font-medium text-gray-800">{msg.content}</p>
                    <p className="text-sm text-gray-600 mt-1 pl-2 border-l-2 border-indigo-200">
                      {msg.response}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;