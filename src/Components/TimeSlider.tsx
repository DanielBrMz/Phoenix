import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faForward, faBackward } from "@fortawesome/free-solid-svg-icons";
import Slider from "react-input-slider";
import { Map } from "mapbox-gl";
import SliderMarker from "./SliderMarker";

interface TimesliderProps {
  map: Map;
  scale: number;
}

interface LocationData {
  city: string;
}

interface WeatherData {
  data: Array<{
    coordinates: Array<{
      dates: Array<{
        value: number;
      }>;
    }>;
  }>;
}

const Timeslider = ({ map, scale }: TimesliderProps): JSX.Element => {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [sliderValue, setSliderValue] = useState(0);
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  let lat = 0, lng = 0;
  if (map) ({ lat, lng } = map.getCenter());

  useEffect(() => {
    fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`,
    )
      .then((response) => response.json() as Promise<LocationData>)
      .then((data) => setLocationData(data))
      .catch((error) => console.error(error));
  
    const username = 'molinagroup_barreras_daniel';
    const password = 'VfCzr02qA5';
  
    fetch(`https://api.meteomatics.com/${new Date().toISOString()}/t_2m:C/${lat},${lng}/json`, {
      headers: {
        'Authorization': 'Basic ' + btoa(username + ':' + password)
      }
    })
    .then(response => response.json() as Promise<WeatherData>)
    .then(data => setWeatherData(data))
    .catch((error) => console.error(error));
  
    const intervalId = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      );
      setCurrentDate(
        now.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
      );
    }, 1000);
  
    return () => clearInterval(intervalId); // Clear interval on unmount
  }, [lat, lng]);
  
  return (
    <div className="fixed bottom-5 left-1/2 flex h-[7rem] w-4/5 -translate-x-1/2 transform flex-col items-center justify-end bg-[#222] ">
      <div className="flex w-full flex-row items-center justify-start space-x-8 pl-[5rem] pr-[5rem] ">
        <div className="flex flex-row space-x-4">
          <button>
            <FontAwesomeIcon icon={faBackward} className="h-[1.2rem] w-[1.2rem] text-white" />
          </button>
          <button>
            <FontAwesomeIcon icon={faPlay} className="h-[1.2rem] w-[1.2rem] text-white" />
          </button>
          <button>
            <FontAwesomeIcon icon={faForward} className="h-[1.2rem] w-[1.2rem] text-white" />
          </button>
        </div>
        <div className="flex flex-col">
          <div className="text-white">{currentTime}</div>
          <div className="text-[#5ec2fb]">{currentDate}</div>
        </div>
        <div className="flex flex-grow flex-col">
          <Slider
            axis="x"
            xstep={24}
            xmin={-120}
            xmax={120}
            x={0}
            onChange={({ x }: { x: number }) => setSliderValue(x)}
            styles={{
              track: {
                backgroundColor: "#111",
                width: "100%",
              },
              active: {
                backgroundColor:
                  sliderValue < 0
                    ? `rgb(0, 0, ${Math.abs(sliderValue) * 2.55})`
                    : `rgb(${Math.abs(sliderValue) * 2.55}, 0, 0)`,
              },
              thumb: {
                width: 20,
                height: 20,
                opacity: 0.8,
                backgroundColor: "#fff",
                boxShadow: "0 2px 6px rgba(0,0,0,.3)",
              },
            }}
          />
          <SliderMarker min={0} max={240} step={24} />
        </div>
      </div>
      <div className="z-1 mt-4 h-[2rem] w-full bg-[#111]">
        {locationData && (
          <div className="flex flex-row justify-around">
            <p className="text-white">Latitude: {map && lat.toFixed(3)}</p>
            <p className="text-white">Longitude: {map && lng.toFixed(3)}</p>
            <p className="text-white">Eye Level: {scale.toFixed(3)}</p>
            <p className="text-white">
              {" "}
              Temperature:{" "}
              {weatherData?.data[0]?.coordinates[0]?.dates[0]?.value}{" "}
            </p>
            <p className="text-white">Territory: {locationData.city}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Timeslider;
