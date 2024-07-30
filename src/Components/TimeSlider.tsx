import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faForward,
  faBackward,
} from "@fortawesome/free-solid-svg-icons";
import { type Map } from "mapbox-gl";
import RangeSlider from "./RangeSlider";
import useStore from "~/store/useStore";

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
  const { inPredictionStep } = useStore((state) => ({
    inPredictionStep: state.inPredictionStep,
  }));
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    if (map) {
      map.on("moveend", () => {
        setLat(map.getCenter().lat);
        setLng(map.getCenter().lng);
        fetchLocationData();
      });
    }
  }, [map]);

  const fetchLocationData = () => {
    fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode?latitude=${lat}&longitude=${lng}&localityLanguage=en`,
    )
      .then((response) => response.json() as Promise<LocationData>)
      .then((data) => setLocationData(data))
      .catch((error) => console.error(error));
  };

  const fetchWeatherData = () => {
    const username = "molinagroup_barreras_daniel";
    const password = "VfCzr02qA5";
    fetch(
      `https://api.meteomatics.com/${new Date().toISOString()}/t_2m:C/${lat},${lng}/json`,
      {
        headers: {
          Authorization: "Basic " + btoa(username + ":" + password),
        },
      },
    )
      .then((response) => response.json() as Promise<WeatherData>)
      .then((data) => setWeatherData(data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    const intervalId = setInterval(fetchWeatherData, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
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

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="fixed bottom-5 left-1/2 flex h-[7rem] w-4/5 -translate-x-1/2 transform flex-col items-center justify-end bg-[#222] ">
      <div className="flex w-full flex-row items-center justify-start space-x-8 pl-[5rem] pr-[5rem] ">
        <div className="flex flex-col">
          <div className="text-white">{currentTime}</div>
          <div className="text-[#5ec2fb]">{currentDate}</div>
        </div>
        <div className="flex flex-grow flex-col">
          {inPredictionStep && <RangeSlider map={map} />}
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
