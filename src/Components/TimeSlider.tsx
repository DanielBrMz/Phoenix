import React, { useEffect, useState, useCallback } from "react";
import type { Map } from "mapbox-gl";
import RangeSlider from "./RangeSlider";
import useStore from "~/store/useStore";
import styles from "~/styles/SliderStyles/SliderStyles.module.css";

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

  const fetchLocationData = useCallback(() => {
    fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode?latitude=${lat}&longitude=${lng}&localityLanguage=en`,
    )
      .then((response) => response.json() as Promise<LocationData>)
      .then((data) => setLocationData(data))
      .catch((error) => console.error(error));
  }, [lat, lng]);

  const fetchWeatherData = useCallback(() => {
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
  }, [lat, lng]);

  useEffect(() => {
    if (map) {
      map.on("moveend", () => {
        setLat(map.getCenter().lat);
        setLng(map.getCenter().lng);
        fetchLocationData();
      });
    }
  }, [map, fetchLocationData]);

  useEffect(() => {
    const intervalId = setInterval(fetchWeatherData, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [fetchWeatherData]);

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
    <div className={styles.wholeSliderContainer}>
      <div className={styles.sliderContainer}>
        {inPredictionStep ? (
          <>
            <div className={styles.leftSlider}>
              <div className={styles.timeText}>{currentTime}</div>
              <div>{currentDate}</div>
            </div>
            <div className={styles.mediumSlider}>
              {locationData && (
                <>
                  <div className="flex flex-grow flex-col">
                    {inPredictionStep && <RangeSlider map={map} />}
                  </div>
                  <div className={styles.mediumSliderInfo}>
                    <p className={styles.sliderInfoLabels}>
                      Latitude: {lat.toFixed(3)}
                    </p>
                    <p className={styles.sliderInfoLabels}>
                      Longitude: {lng.toFixed(3)}
                    </p>
                    <p className={styles.sliderInfoLabels}>
                      Eye Level: {scale.toFixed(3)}
                    </p>
                    <p className={styles.sliderInfoLabels}>
                      Temperature:{" "}
                      {weatherData?.data[0]?.coordinates[0]?.dates[0]?.value}
                    </p>
                    <p className={styles.sliderInfoLabels}>
                      Territory: {locationData.city}
                    </p>
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <div className={styles.leftSlider}>
              <div className={styles.timeText}>{currentTime}</div>
              <div>{currentDate}</div>
            </div>
            <div className={styles.mediumSlider}>
              {locationData && (
                <div>
                  <h2 className={styles.sliderTitle}>
                    Location and Weather Data
                  </h2>
                  <div className={styles.mediumSliderInfo}>
                    <p className={styles.sliderInfoLabels}>
                      Latitude: {lat.toFixed(3)}
                    </p>
                    <p className={styles.sliderInfoLabels}>
                      Longitude: {lng.toFixed(3)}
                    </p>
                    <p className={styles.sliderInfoLabels}>
                      Eye Level: {scale.toFixed(3)}
                    </p>
                    <p className={styles.sliderInfoLabels}>
                      Temperature:{" "}
                      {weatherData?.data[0]?.coordinates[0]?.dates[0]?.value}
                    </p>
                    <p className={styles.sliderInfoLabels}>
                      Territory: {locationData.city}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
        <div className={styles.rightSlider}>
          <p>6 KM</p>
        </div>
      </div>
    </div>
  );
};

export default Timeslider;
