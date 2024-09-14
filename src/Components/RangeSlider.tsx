import * as React from "react";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { setHeatmapRadius } from "~/utils/mapUtils/addCustomLayers";
import styles from "~/styles/SliderStyles/RangeSlider.module.css";
import thumbIcon from "~/assets/thumbIcon.png";

interface RangeSliderProps {
  map: mapboxgl.Map;
  wildfireId: string; // Prop para identificar el incendio
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
  const [value, setValue] = React.useState(0);
  const sliderWidth = 720; // Ancho total del slider
  const min = 0;
  const max = 96;
  const thumbWidth = 24; // Ancho del thumb

  const calculateLeftPosition = () => {
    const position = ((value - min) / (max - min)) * sliderWidth;
    return position - thumbWidth / 2; // Ajusta la posición para centrar el popup sobre el thumb
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    const sliderValue = newValue as number;
    setValue(sliderValue);

    let newRadius = 0;
    if (sliderValue === 0) {
      newRadius = 10; // Valor fijo por defecto
    } else if (sliderValue === 24) {
      newRadius = 20;
    } else if (sliderValue === 48) {
      newRadius = 40;
    } else if (sliderValue === 72) {
      newRadius = 60;
    } else {
      newRadius = 80;
    }

    if (map) {
      setHeatmapRadius(map, newRadius, wildfireId); // Pasa el wildfireId para controlar el heatmap específico
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
          step={24} // Ajustado para cada 24 horas
          marks={new Array(5).fill(0).map((_, index) => ({
            value: index * 24,
          }))}
        />
      </div>
    </Box>
  );
}
