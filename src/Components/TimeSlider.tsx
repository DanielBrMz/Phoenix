import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faForward, faBackward } from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-input-slider';
import { Map } from 'mapbox-gl';

const Timeslider = ({map, scale}: {map: Map, scale: number}): JSX.Element => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [sliderValue, setSliderValue] = useState(0);
  const [locationData, setLocationData] = useState<any>(null);
  const [weatherData, setWeatherData] = useState<any>(null);
  let lat: number = 0, lng: number = 0;

  if(map)
     ({lat, lng} = map.getCenter());

  useEffect(() => {
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`)
      .then(response => response.json())
      .then(data => setLocationData(data));

    /* const username = 'molinagroup_barreras_daniel';
    const password = 'VfCzr02qA5';

    fetch(`https://api.meteomatics.com/${new Date().toISOString()}/t_2m:C/${lat},${lng}/json`, {
      headers: {
        'Authorization': 'Basic ' + btoa(username + ':' + password)
      }
    })
    .then(response => response.json())
    .then(data => setWeatherData(data)); */

    const intervalId = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', hour12: true }));
      setCurrentDate(now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));
      
    }, 1000);

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, [lat, lng]);



  return (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 w-4/5 h-[7rem] bg-[#222] flex flex-col justify-end items-center ">
      <div className="flex flex-row items-center space-x-8 justify-start w-full pl-[5rem] pr-[5rem] ">
        <div className='flex flex-row space-x-2'>
          <button><FontAwesomeIcon icon={faBackward} className='h-[1rem] w-[1rem] text-white'/></button>
          <button><FontAwesomeIcon icon={faPlay} className='h-[1rem] w-[1rem] text-white'/></button>
          <button><FontAwesomeIcon icon={faForward} className='h-[1rem] w-[1rem] text-white'/></button>
        </div>  
        <div className="flex flex-col">
          <div className="text-white">{currentTime}</div>
          <div className="text-[#5ec2fb]">{currentDate}</div>
        </div>
        <div className="flex flex-grow">
          <Slider
            axis="x"
            xstep={24}
            xmin={0}
            xmax={240}
            x={sliderValue}
            onChange={({ x }: {x: number}) => setSliderValue(x)}
            styles={{
              track: {
                backgroundColor: '#111',
                width: '100%',
              },
              active: {
                backgroundColor: `rgb(${sliderValue * 2.55}, 0, 0)`,
              },
              thumb: {
                width: 20,
                height: 20,
                opacity: 0.8,
                backgroundColor: '#fff',
                boxShadow: '0 2px 6px rgba(0,0,0,.3)',
              },
            }}
          />
        </div>
      </div>
      <div className="w-full h-[2rem] bg-[#111] z-1 mt-4">
        {locationData && weatherData && (
          <div className='flex flex-row justify-around'>
            <p className="text-white">Latitude: {map && lat.toFixed(3)}</p>
            <p className="text-white">Longitude: {map && lng.toFixed(3)}</p>
            <p className="text-white">Eye Level: {scale.toFixed(3)}</p>
            <p className="text-white">Temperature: {weatherData?.data[0]?.coordinates[0]?.dates[0]?.value}</p>
            <p className="text-white">Territory: {locationData.city}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Timeslider;
