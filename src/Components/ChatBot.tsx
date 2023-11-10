import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faTimes } from '@fortawesome/free-solid-svg-icons';
import Draggable from 'react-draggable';

const ChatBot = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string; image?: string }>>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Mensajes de bienvenida iniciales del bot
    setMessages([
      { sender: 'bot', text: "Welcome to FlameGuardian chatbot." },
      { sender: 'bot', text: "What do you want to ask about the wildfire in the Nogales, Sonora area?" }
    ]);
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Agrega el nuevo mensaje como enviado por el usuario
      setMessages(prevMessages => [...prevMessages, { sender: 'user', text: newMessage }]);

      // Verifica si el mensaje del usuario es una pregunta específica y responde
      if (newMessage.trim() === "What do I do if this wildfire is 20 km away from me?") {
        setMessages(prevMessages => [
          ...prevMessages, 
          { 
            sender: 'bot', 
            text: "Stay informed through local news and alerts. Prepare for a possible evacuation by packing essentials. Protect your home by removing flammable materials. Wear smoke masks to keep pets safe. Your safety is the most important thing.",
            image: "https://www.redcross.org/content/dam/redcross/about-us/news/2022/wildfire419.png" // URL de la imagen
          }
        ]);
      }

      // Verifica si el mensaje del usuario es "Thank You"
      else if (newMessage.trim().toLowerCase() === "thank you") {
        setMessages(prevMessages => [
          ...prevMessages, 
          { sender: 'bot', text: "You're welcome, I'm here to help you! If you have more questions, don't hesitate to ask." }
        ]);
      }

      setNewMessage('');
    }
  };

  const toggleChat = () => {
    setIsChatVisible(!isChatVisible);
  };

  return (
    <div className="fixed inset-0 flex flex-col items-end z-30">
      {/* Botón de robot siempre visible */}
      <button
        onClick={toggleChat}
        className="z-40 p-3 rounded-full transition duration-200 focus:outline-none bg-gray-800 text-white hover:bg-gray-700"
        style={{ position: 'fixed', top: '20%', right: '0.3rem', transform: 'translateY(-50%)' }}
        aria-label="Chat with us"
      >
        <FontAwesomeIcon icon={faRobot} size="lg" />
      </button>

      {/* Contenedor Draggable del chat */}
      {isChatVisible && (
        <Draggable>
          <div className="fixed bottom-0 right-0 mb-16 mr-1 w-80 transform transition-transform duration-300 z-30 bg-white shadow-lg rounded-l-lg">
            <div className="flex items-center justify-between p-4 bg-orange-500 text-white cursor-move">
              <h2 className="text-lg font-semibold">🔥FlameGuardian🔥</h2>
              <button onClick={toggleChat} className="text-lg rounded-full hover:bg-orange-700 p-2">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="overflow-y-auto p-4" style={{ maxHeight: '70vh' }}>
              {messages.map((message, index) => (
                <div key={index} className={`flex flex-col items-start rounded-lg p-2 my-2 text-sm ${message.sender === 'bot' ? 'bg-orange-200' : 'bg-gray-300'}`}>
                  <div className="flex items-center">
                    {message.sender === 'bot' && <FontAwesomeIcon icon={faRobot} className="mr-2" size="sm" />}
                    <span>{message.text}</span>
                  </div>
                  {message.image && <img src={message.image} alt="Chatbot Message" className="mt-2 max-w-full h-auto rounded" />}
                </div>
              ))}
            </div>
            <div className="p-3 flex border-t-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Write a message..."
                className="flex-1 p-2 mr-2 outline-none rounded-md border-2 border-gray-300"
              />
              <button 
                onClick={handleSendMessage}
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none"
              >
                Send
              </button>
            </div>
          </div>
        </Draggable>
      )}
    </div>
  );
};

export default ChatBot;