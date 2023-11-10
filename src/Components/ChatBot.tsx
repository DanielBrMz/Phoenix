import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';

const ChatBot = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [messages, setMessages] = useState<string[]>([
    "Bienvenido al chatbot.",
    "¿Qué quieres consultar sobre el incendio?"
  ]); // Mensajes de bienvenida iniciales
  const [newMessage, setNewMessage] = useState('');

  // Esta función se ejecutará cuando el componente se monte
  useEffect(() => {
    // Si necesitas realizar alguna inicialización más compleja, puedes hacerla aquí
  }, []); // El array de dependencias vacío asegura que el efecto se ejecute sólo una vez

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setNewMessage('');
    }
  };

  const toggleChat = () => {
    setIsChatVisible(!isChatVisible);
  };

  return (
    <div className="fixed inset-y-0 right-0 flex flex-col items-end">
      <button 
        onClick={toggleChat}
        className="my-auto z-30 bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700 transition duration-200 focus:outline-none"
        aria-label="Chat with us"
      >
        <FontAwesomeIcon icon={faRobot} size="lg" />
      </button>

      <div className={`transform transition-transform duration-300 ${isChatVisible ? 'translate-x-0' : 'translate-x-full'} bg-white shadow-lg rounded-l-lg w-80`}>
        <div className="p-4 overflow-y-auto" style={{ maxHeight: '80vh' }}>
          {messages.map((message, index) => (
            <div key={index} className={`rounded-lg p-2 my-2 text-sm ${index % 2 === 0 ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-300 mr-auto'}`}>
              {message}
            </div>
          ))}
        </div>
        <div className="border-t-2 p-3 flex items-center bg-gray-50 rounded-b-lg">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="flex-1 outline-none border-none p-2 rounded-lg mr-2"
          />
          <button 
            onClick={handleSendMessage}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;


