import * as React from "react";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import styles from "~/styles/SliderStyles/RangeSlider.module.css";
import thumbIcon from "~/assets/thumbIcon.png";
import { createPredictionGeoJSON } from "~/utils/mapUtils/addHotspotsPrediction";
import { useSliderStore } from "~/store/useSliderStore"; // Import Zustand store

interface RangeSliderProps {
  map: mapboxgl.Map;
  wildfireId: string;
}

const AirbnbSlider = styled(Slider)(() => ({
  color: "#f57f61",
  height: 4,
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#f57f61",
    borderRadius: "3px",
    borderColor: "white",
    borderStyle: "solid",
    borderWidth: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)",
    },
    "&::before": {
      content: '""',
      display: "block",
      width: "16px",
      height: "16px",
      backgroundImage: `url(${thumbIcon.src})`,
      backgroundSize: "cover",
    },
  },
  "& .MuiSlider-track": {
    height: 4,
  },
  "& .MuiSlider-rail": {
    height: 6,
    backgroundColor: "white",
    color: "white",
  },
  "& .MuiSlider-mark": {
    backgroundColor: "white",
    height: 12,
    width: 12,
    borderRadius: "50%",
    "&.MuiSlider-markActive": {
      backgroundColor: "#f57f61",
    },
  },
}));

export default function RangeSlider({ map, wildfireId }: RangeSliderProps) {
  const { sliderValue, setSliderValue } = useSliderStore();
  const [value, setValue] = React.useState(0);
  const [error, setError] = React.useState<string | null>(null);
  const sliderWidth = 720;
  const min = 0;
  const max = 96;
  const thumbWidth = 24;

  const calculateLeftPosition = () => {
    const position = ((value - min) / (max - min)) * sliderWidth;
    return position - thumbWidth / 2;
  };

  const handleSliderChange = async (
    event: Event,
    newValue: number | number[],
  ) => {
    const sliderValue = newValue as number;
    setValue(sliderValue);

    if (sliderValue === 0) {
      console.log("0 Hour Prediction - No prediction request made");
      return;
    }

    try {
      const requestData = await loadRequestData(sliderValue);
      if (requestData) {
        const predictionData = await fetchPredictionData(requestData);
        if (predictionData) {
          updateMapWithPredictionData(predictionData);
        }
      }
    } catch (error) {
      setError("Error al obtener los datos de predicción");
      console.error("Error fetching prediction data:", error);
    }
  };

  const loadRequestData = async (sliderValue: number) => {
    const fileName = `/request_data${sliderValue / 24}.json`;
    try {
      const response = await fetch(fileName);
      if (!response.ok) throw new Error("Error al cargar el archivo JSON");
      return await response.json();
    } catch (error) {
      setError(`Error al cargar ${fileName}`);
      console.error("Error loading request data:", error);
      return null;
    }
  };

  const fetchPredictionData = async (requestData: any) => {
    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error fetching prediction data:", errorText);
        throw new Error(`Failed to fetch prediction: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching prediction data:", error);
      throw error;
    }
  };

  // Actualizar el mapa con los datos de predicción recibidos
  const updateMapWithPredictionData = (predictionData: any) => {
    const geoJSONData = createPredictionGeoJSON(predictionData);

    if (map.getSource("prediction-heatmap-source")) {
      const source = map.getSource(
        "prediction-heatmap-source",
      ) as mapboxgl.GeoJSONSource;
      source.setData(geoJSONData);
    } else {
      map.addSource("prediction-heatmap-source", {
        type: "geojson",
        data: geoJSONData,
      });

      map.addLayer({
        id: "prediction-heatmap-layer",
        type: "heatmap",
        source: "prediction-heatmap-source",
        paint: {
          "heatmap-weight": [
            "interpolate",
            ["linear"],
            ["get", "value"],
            0.000000001,
            0,
            1,
            1,
          ],
          "heatmap-intensity": 1,
          "heatmap-radius": 70,
          "heatmap-opacity": 0.7,
          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0,
            "rgba(33,102,172,0)",
            0.2,
            "rgb(103,169,207)",
            0.4,
            "rgb(209,229,240)",
            0.6,
            "rgb(253,219,199)",
            0.8,
            "rgb(239,138,98)",
            1,
            "rgb(178,24,43)",
          ],
        },
      });
    }
  };

  const getPopupTextAndTransform = () => {
    switch (value) {
      case 0:
        return { text: "0 HOUR PREDICTION", transform: -40 };
      case 24:
        return { text: "24 HOUR PREDICTION", transform: 100 };
      case 48:
        return { text: "48 HOUR PREDICTION", transform: 240 };
      case 72:
        return { text: "72 HOUR PREDICTION", transform: 385 };
      case 96:
        return { text: "96 HOUR PREDICTION", transform: 530 };
      default:
        return { text: "", transform: 0 };
    }
  };

  const { text: popUpText, transform: transformNumber } =
    getPopupTextAndTransform();

  return (
    <Box className="relative mx-4">
      <div className="popUpContainer">
        <div
          className={styles.predictionPopup}
          style={{
            left: `${calculateLeftPosition()}px`,
            transform: `translateX(${transformNumber}%)`,
          }}
        >
          <p>{popUpText}</p>
        </div>
        <AirbnbSlider
          value={value}
          onChange={handleSliderChange}
          defaultValue={0}
          min={0}
          max={96}
          step={24}
          marks={new Array(5).fill(0).map((_, index) => ({
            value: index * 24,
          }))}
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </Box>
  );
}
