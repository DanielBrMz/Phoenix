import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Draggable from "react-draggable";
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';



// Definición de los tipos para las coordenadas y las igniciones
type Coordinates = {
  lat: number;
  lng: number;
};

type Ignition = Coordinates;

type PredictionModalProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const PredictionModal: React.FC<PredictionModalProps> = ({
  isOpen,
  setIsOpen
}) => {
  const [formData, setFormData] = useState({
    simulationName: 'ICP Julian 10-15',
    user: 'HECTOR GUTIERREZ',
    startTime: '10/15/18 09:00',
    endTime: '10/15/18 15:00',
    fuel: '',
    wind: '10.6',
    windDirection: '80',
    slope: '32',
    airTemp: '100',
    aspect: '',
    deadMoist: '',
    liveMoist: '',
  });


  const handleMapClick = (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
    if (isAddingIgnition) {
      const newIgnition = { lat: e.lngLat.lat, lng: e.lngLat.lng };
      setIgnitions([...ignitions, newIgnition]);
      // Aquí también puedes agregar lógica para mostrar visualmente la ignición en el mapa
    }
  };

  // Estados y manejadores para la longitud y la latitud
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');
  const [ignitions, setIgnitions] = useState<Ignition[]>([]);

  // Estado para saber si se está agregando igniciones o no
  const [isAddingIgnition, setIsAddingIgnition] = useState(false);

  // Estado para saber si la temperatura del aire es válida o no
  const [isCrownEnabled, setIsCrownEnabled] = useState(false);
  const [isAirTempValid, setIsAirTempValid] = useState(true);
  const [isSpottingEnabled, setIsSpottingEnabled] = useState(false);

  // Manejador para el cambio de latitud
 const handleLatitudeChange = (e: ChangeEvent<HTMLInputElement>) => {
  setLatitude(e.target.value);
  };

  // Manejador para el cambio de longitud
  const handleLongitudeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLongitude(e.target.value);
  };

  // Manejador para el botón de limpiar
  const handleClear = () => {
    setLatitude('');
    setLongitude('');
  };

  // Manejador para el botón 'Add Ignition(s)' / 'Stop Drawing'
  const handleAddIgnitionClick = () => {
    setIsAddingIgnition(!isAddingIgnition);
    // Aquí también podrías manejar la lógica para habilitar/deshabilitar el modo de dibujo en el mapa
  };


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    if (name === 'airTemp') {
      const tempValue = parseInt(value, 10);
      setIsAirTempValid(!isNaN(tempValue) && tempValue >= 32 && tempValue <= 131);
    }
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  // Función para manejar el clic en el botón 'Add Ignition(s)'
  const toggleAddIgnitionMode = () => {
    setIsAddingIgnition(!isAddingIgnition);
  };


  const handleCrownToggle = (enabled: boolean) => {
    setIsCrownEnabled(enabled);
  };

  const handleSpottingToggle = (enabled: boolean) => {
    setIsSpottingEnabled(enabled);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formData);
  };



  // Función para manejar el clic en el botón de añadir igniciones
  const handleAddIgnition = () => {
    setIsAddingIgnition(!isAddingIgnition);
    // Aquí también manejarías la lógica para añadir la ignición
  };



  const airTempInputClass = `bg-transparent text-center w-full ${isAirTempValid ? '' : 'bg-red-500'}`;

  // Clase para el botón que depende de si se está agregando igniciones o no
  const ignitionButtonClass = isAddingIgnition ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-500';


  if (!isOpen) return null;

  const handleClose = () => setIsOpen(false);



  

  return (
    <Draggable>
       <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white w-96 max-h-[40rem] p-4 rounded-lg overflow-y-auto custom-scrollbar">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white mb-4">Create & View Simulation</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-200">
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Secciones del formulario (Simulation Name, User, etc.) */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold" htmlFor="simulationName">
              Simulation Name
            </label>
            <input
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:shadow-outline"
              type="text"
              id="simulationName"
              name="simulationName"
              value={formData.simulationName}
              onChange={handleInputChange}
            />
          </div>


          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold" htmlFor="user">
              User
            </label>
            <input
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:shadow-outline"
              type="text"
              id="user"
              name="user"
              value={formData.user}
              onChange={handleInputChange}
            />
          </div>


          {/* Sección Start Time y End Time */}
        <div className="flex justify-between space-x-2 mb-4">
          <div className="flex flex-col w-1/2">
            <label htmlFor="startTime" className="text-sm text-gray-400">
              Start Time
            </label>
            <input
              id="startTime"
              name="startTime"
              type="text"
              value={formData.startTime}
              onChange={handleInputChange}
              className="bg-gray-700 text-white rounded p-2 text-center w-full"
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label htmlFor="endTime" className="text-sm text-gray-400">
              End Time
            </label>
            <input
              id="endTime"
              name="endTime"
              type="text"
              value={formData.endTime}
              onChange={handleInputChange}
              className="bg-gray-700 text-white rounded p-2 text-center w-full"
            />
          </div>
        </div>

            {/* Secciones Fuel Y Wind */}
            <div className="flex justify-between mb-4">
              {/* Sección Fuel */}
            <div className="flex flex-col w-1/2 mr-2">
              <label htmlFor="fuel" className="block mb-2 text-sm font-bold">
                Fuel
              </label>
              <select
                id="fuel"
                name="fuel"
                value={formData.fuel}
                onChange={handleInputChange}
                className="bg-gray-700 text-white rounded p-2 text-center w-full"
              >
                {/* ... Opciones de Fuel ... */}
              <option value="1(GR)">1(GR)</option>
              <option value="2(GR)">2(GR)</option>
              <option value="3(GR)">3(GR)</option>
              <option value="4(SH)">4(SH)</option>
              <option value="5(SH)">5(SH)</option>
              <option value="6(SH)">6(SH)</option>
              <option value="7(SH4)">7(SH4)</option>
              <option value="8(TL)">8(TL)</option>
              <option value="9(TL)">9(TL)</option>
              <option value="10(TL)">10(TL)</option>
              <option value="11(SL)">11(SL)</option>
              <option value="12(SL)">12(SL)</option>
              <option value="13(SL)">13(SL)</option>
            </select>
          </div>


          {/* Sección Wind */}
          <div className="flex flex-col w-1/2 ml-2">
            <label htmlFor="wind" className="block mb-2 text-sm font-bold">
              Wind (mi/h)
          </label>
          <input
            id="wind"
            name="wind"
            type="text"
            value={formData.wind}
            onChange={handleInputChange}
            className="bg-gray-700 text-white rounded p-2 text-center w-full"
          />
        </div>
      </div>


      {/* Secciones Wind Direction y Slope en la misma línea */}
      <div className="flex justify-between mb-4">
        {/* Sección Wind Direction */}
        <div className="flex flex-col w-1/2 mr-2">
          <label htmlFor="windDirection" className="block mb-2 text-sm font-bold">
            Wind Direction
          </label>
          <input
            id="windDirection"
            name="windDirection"
            type="text"
            value={formData.windDirection}
            onChange={handleInputChange}
            className="bg-gray-700 text-white rounded p-2 text-center w-full"
          />
        </div>


        {/* Sección Slope */}
        <div className="flex flex-col w-1/2 ml-2">
          <label htmlFor="slope" className="block mb-2 text-sm font-bold">
            Slope 
          </label>
          <input
            id="slope"
            name="slope"
            type="text"
            value={formData.slope}
            onChange={handleInputChange}
            className="bg-gray-700 text-white rounded p-2 text-center w-full"
          />
        </div>
       </div>

      {/* Secciones Aspect y Air Temp en la misma línea */}
      <div className="flex justify-between mb-4">
        {/* Sección Aspect */}
        <div className="flex flex-col w-1/2 mr-2">
          <label htmlFor="aspect" className="block mb-2 text-sm font-bold">
            Aspect
          </label>
          <select
            id="aspect"
            name="aspect"
            value={formData.aspect}
            onChange={handleInputChange}
            className="bg-gray-700 text-white rounded p-2 text-center w-full"
          >
            {/* Opciones del menú Aspect */}
            <option value="north">North</option>
            <option value="north east">North East</option>
            <option value="north west">North West</option>
            <option value="south">South</option>
            <option value="south east">South East</option>
            <option value="south west">South West</option>
            <option value="east">East</option>
            <option value="west">West</option>
            {/* Puedes agregar más opciones según sea necesario */}
          </select>
        </div>


        {/* Sección Air Temp */}
            <div className="flex flex-col w-1/2 ml-2">
              <label htmlFor="airTemp" className="block mb-2 text-sm font-bold">
                Air Temp (°F)
              </label>
              <div className="flex items-center bg-gray-700 rounded p-2">
                <input
                  id="airTemp"
                  name="airTemp"
                  type="text"
                  value={formData.airTemp}
                  onChange={handleInputChange}
                  className={airTempInputClass}
                />
              </div>
            </div>
          </div>


         {/* Secciones Dead Moist y Live Moist en su propia línea */}
         <div className="flex justify-between mb-4">
            {/* Sección Dead Moist */}
            <div className="flex flex-col w-1/2 mr-2">
              <label htmlFor="deadMoist" className="block mb-2 text-sm font-bold">
                Dead Moist
              </label>
              <select
                id="deadMoist"
                name="deadMoist"
                value={formData.deadMoist}
                onChange={handleInputChange}
                className="bg-gray-700 text-white rounded p-2 text-center w-full"
              >
                <option value="veryLow">Very Low</option>
                <option value="low">Low</option>
                <option value="average">Average</option>
                <option value="moderate">Moderate</option>
                <option value="high">High</option>
              </select>
            </div>

          {/* Sección Live Moist */}
          <div className="flex flex-col w-1/2 ml-2">
              <label htmlFor="liveMoist" className="block mb-2 text-sm font-bold">
                Live Moist
              </label>
              <select
                id="liveMoist"
                name="liveMoist"
                value={formData.liveMoist}
                onChange={handleInputChange}
                className="bg-gray-700 text-white rounded p-2 text-center w-full"
              >
                <option value="fullyCured">Fully Cured</option>
                <option value="twoThirdsCured">2/3 Cured</option>
                <option value="oneThirdCured">1/3 Cured</option>
                <option value="fullyGreen">Fully Green</option>
              </select>
            </div>
          </div>


          {/* Separador y título para la sección de configuraciones avanzadas */}
          <hr className="my-4" />  {/* Línea separadora */}
          <h3 className="text-lg">Advance Settings</h3>

          {/* Sección Crown */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold">Crown</label>
            <div>
              <button 
                type="button" 
                onClick={() => handleCrownToggle(true)}
                className={`px-4 py-2 mr-2 ${isCrownEnabled ? 'bg-blue-500' : 'bg-gray-500'} text-white rounded`}
              >
                ENABLE
              </button>
              <button 
                type="button" 
                onClick={() => handleCrownToggle(false)}
                className={`px-4 py-2 ${!isCrownEnabled ? 'bg-blue-500' : 'bg-gray-500'} text-white rounded`}
              >
                DISABLE
              </button>
            </div>
          </div>


          {/* Sección Spotting */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold">Spotting</label>
          <div>
            <button 
              type="button" 
              onClick={() => handleSpottingToggle(true)}
              className={`px-4 py-2 mr-2 ${isSpottingEnabled ? 'bg-blue-500' : 'bg-gray-500'} text-white rounded`}
            >
              ENABLE
            </button>
            <button 
              type="button" 
              onClick={() => handleSpottingToggle(false)}
              className={`px-4 py-2 ${!isSpottingEnabled ? 'bg-blue-500' : 'bg-gray-500'} text-white rounded`}
            >
              DISABLE
            </button>
          </div>
        </div>

        {/* Separador para la sección de configuraciones avanzadas */}
        <hr className="my-4" />  {/* Línea separadora */}

        {/* Identify Ignition Location */}
      <div className="mb-4">
          <h3 className="text-lg mb-2 text-white">Identify Ignition Location(s)</h3>
          <div className="flex space-x-2">
            <input
              className="bg-gray-700 text-white rounded p-2 w-1/2"
              type="text"
              placeholder="Latitude"
              value={latitude}
              onChange={handleLatitudeChange}
            />
            <input
              className="bg-gray-700 text-white rounded p-2 w-1/2"
              type="text"
              placeholder="Longitude"
              value={longitude}
              onChange={handleLongitudeChange}
            />
          </div>
          <div className="flex space-x-2 mt-2">
            <button
              className="bg-gray-500 text-white rounded p-2 w-1/2"
              type="button"
              onClick={handleClear}
            >
              Clear
            </button>
            <button
              className={`${isAddingIgnition ? 'bg-blue-500' : 'bg-gray-500'} hover:bg-blue-700 text-white rounded p-2 w-1/2`}
              type="button"
              onClick={handleAddIgnitionClick}
            >
              {isAddingIgnition ? 'Stop Drawing' : 'Add Ignition(s)'}
            </button>
          </div>
        </div>


        {/* Separador para la sección de Identify Ignition Location(s) */}
        <hr className="my-4" />  {/* Línea separadora */}



       {/* Botón de Envío */}
       <div className="flex justify-end mt-4">
         <button type="submit" className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded text-white focus:outline-none focus:shadow-outline">
           Run Simulation
          </button>
         </div>
        </form>
      </div>
    </Draggable>
  );
};

export default PredictionModal;
