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
  
      // Verifica si el mensaje del usuario es "What do I do if this wildfire is 20 km away from me?"
      if (newMessage.trim() === "What do I do if this wildfire is 20 km away from me?") {
        setMessages(prevMessages => [
          ...prevMessages, 
          { 
            sender: 'bot', 
            text: "Stay informed through local news and alerts. Prepare for a possible evacuation by packing essentials. Protect your home by removing flammable materials. Wear smoke masks to keep pets safe. Your safety is the most important thing.",
            image: "https://www.redcross.org/content/dam/redcross/about-us/news/2022/wildfire419.png"
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
  
      // Verifica si el mensaje del usuario es "tell me the conditions of the wildfire"
      else if (newMessage.trim().toLowerCase() === "tell me the conditions of the wildfire") {
        setMessages(prevMessages => [
          ...prevMessages, 
          { 
            sender: 'bot', 
            text: "Wind Speed: 30 km/h. Wind Direction: Towards the east. Temperature: 35°C. Relative Humidity: 15%. Burned Area: 1,500 hectares." 
          }
        ]);
      }

        // Verifica si el mensaje del usuario es "Give me the prediction graphs"
        else if (newMessage.trim().toLowerCase() === "give me the prediction graphs") {
            setMessages(prevMessages => [
            ...prevMessages, 
            { 
                sender: 'bot', 
                text: "Of course, here you have them:",
                image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi9biVLzeKGgT06FQi8o3rbDZqlhsqdjZcYg_IrBqNjE1ZPw4H1KtOfaaljwYRfAkN-zYW4prBHZbJBULSCp0mvI-I5EojR7q3G7cWoei_BwfSjZhmF3LXTyBvWSMnfpiFhKSzUR3kZEFJHPrFzPsXgXJruA5fQ8XTRs8d-aMxwU8WenV66h1Y0VJiUcpI/w609-h288/MODELO.png" // URL de la imagen de los gráficos de predicción
            }
            ]);
        }

            // Verifica si el mensaje del usuario es "How much would it take to reforest again?"
        else if (newMessage.trim().toLowerCase() === "how much would it take to reforest again?") {
            setMessages(prevMessages => [
            ...prevMessages, 
            { 
                sender: 'bot', 
                text: "Reforestation of a 1,500 hectare area affected by fire under these conditions could take considerable time. Low humidity and high temperatures, along with strong winds, indicate that the fire is intense, causing significant damage to the soil and vegetation. Depending on the recovery and restoration measures implemented, and considering the natural factors of ecosystem regeneration, complete reforestation could take from several years to several decades. Nature and careful human intervention will play a crucial role in this recovery process.",
                image: "https://www.elsoldemexico.com.mx/republica/sociedad/nyt7az-incendio-arteaga-efe.jpg/ALTERNATES/LANDSCAPE_960/incendio%20arteaga%20EFE.jpg" // URL de la imagen sobre reforestación
            }
            ]);
        }

            // Verifica si el mensaje del usuario es "Give me the type of vegetation in the area"
        else if (newMessage.trim().toLowerCase() === "give me the type of vegetation in the area") {
            setMessages(prevMessages => [
            ...prevMessages, 
            { 
                sender: 'bot', 
                text: "The vegetation includes drought-resistant shrubs, cacti, succulents, dry grasses, and some desert-adapted trees such as palo verde and mesquite.",
                image: "https://smokecurtain.files.wordpress.com/2017/12/desierto-de-sonora-foto-de-anton-foltin2.jpg" // URL de la imagen de la vegetación
            }
            ]);
        }

            // Verifica si el mensaje del usuario es "What can I do to help?"
        else if (newMessage.trim().toLowerCase() === "what can i do to help?") {
            setMessages(prevMessages => [
            ...prevMessages, 
            { 
                sender: 'bot', 
                text: "The most important thing is to follow the instructions of authorities and evacuate if asked. You can help by staying informed and sharing reliable information. Avoid moving closer to the fire area so as not to obstruct emergency operations."
            }
            ]);
        }

            // Verifica si el mensaje del usuario es "Give me emergency numbers near the wildfire"
        else if (newMessage.trim().toLowerCase() === "give me emergency numbers near the wildfire") {
            setMessages(prevMessages => [
            ...prevMessages, 
            { 
                sender: 'bot', 
                text: "• Emergency Number (911): For immediate emergencies and reporting fires.\n• Local Fire Department: 555-1234 - For assistance and fire reports.\n• Regional Forest Ranger: 555-5678 - For inquiries about fires in forest areas.\n• Local Hospital: 555-9012 - For medical assistance and health-related emergencies.",
            }
            ]);
        }
  

  
      setNewMessage('');
    }
  };

  const toggleChat = () => {
    setIsChatVisible(!isChatVisible);
  };

  return (
    <div className="fixed inset-0 flex flex-col items-end z-30 w-2 h-2">
      {/* Botón de robot siempre visible */} 
      <button
        onClick={toggleChat}
        className="z-40 p-3 rounded-full transition duration-200 focus:outline-none bg-gray-800 text-white hover:bg-gray-700"
        style={{ position: 'fixed', top: '20%', right: '0.3rem', transform: 'translateY(-50%)' }}
        aria-label="Chat with us"
      >
        <FontAwesomeIcon icon={faRobot} className='w-8 h-8'/>
      </button>

      {/* Contenedor Draggable del chat */}
      {isChatVisible && (
        <Draggable>
          <div className="fixed bottom-0 right-0 mb-16 mr-1 w-80 transform transition-transform duration-300 z-30 bg-white shadow-lg rounded-l-lg">
            <div className="flex items-center justify-between p-4 bg-orange-500 text-white cursor-move">
              <h2 className="text-lg font-semibold">🔥FlameGuardian🔥</h2>
              <button onClick={toggleChat} className="text-lg rounded-full hover:bg-orange-700 p-2">
                <FontAwesomeIcon icon={faTimes}  className='w-8 h-8'/>
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