import * as React from "react";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { setHeatmapRadius } from "~/utils/mapUtils/addCustomLayers";

interface RangeSliderProps {
  map: mapboxgl.Map;
}

export default function RangeSlider({ map }: RangeSliderProps) {
  const [value, setValue] = React.useState(0);
  const sliderWidth = 720; // Ancho total del slider
  const min = 0;
  const max = 48;
  const thumbWidth = 24; // Ancho del thumb

  const AirbnbSlider = styled(Slider)(({ theme }) => ({
    color: "#57c5f7",
    height: 4,
    "& .MuiSlider-thumb": {
      height: thumbWidth,
      width: thumbWidth,
      backgroundColor: "#fff",
      border: "2px solid #000",
      "&:hover": {
        boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)",
      },
    },
    "& .MuiSlider-track": {
      height: 4,
    },
    "& .MuiSlider-rail": {
      height: 4,
      backgroundColor: "#d8d8d8",
    },
    "& .MuiSlider-mark": {
      backgroundColor: "#000",
      height: 10,
      width: 2,
      "&.MuiSlider-markActive": {
        backgroundColor: "transparent",
      },
    },
  }));

  const calculateLeftPosition = () => {
    const position = ((value - min) / (max - min)) * sliderWidth;
    return position - thumbWidth / 2; // Ajusta la posición para centrar el popup sobre el thumb
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    const sliderValue = newValue as number;
    setValue(sliderValue);

    let newRadius = 0;
    if (sliderValue === 0) {
      newRadius = -1; // Indica que se debe usar el valor predeterminado
    } else if (sliderValue === 12) {
      newRadius = 20;
    } else if (sliderValue === 24) {
      newRadius = 40;
    } else if (sliderValue === 36) {
      newRadius = 60;
    } else {
      newRadius = 80;
    }

    if (map) {
      if (newRadius === -1) {
        map.setPaintProperty("polygon", "heatmap-radius", {
          base: 1,
          stops: [
            [1, 10],
            [3, 5],
            [22, 10],
          ],
        });
      } else {
        setHeatmapRadius(map, newRadius);
      }
    }
  };

  let popUpText = "";
  let transformNumber = 0;
  if (value === 0) {
    popUpText = "0 HOUR PREDICTION";
    transformNumber = -35;
  } else if (value === 12) {
    popUpText = "12 HOUR PREDICTION";
    transformNumber = 130;
  } else if (value === 24) {
    popUpText = "24 HOUR PREDICTION";
    transformNumber = 295;
  } else if (value === 36) {
    popUpText = "36 HOUR PREDICTION";
    transformNumber = 460;
  } else {
    popUpText = "48 HOUR PREDICTION";
    transformNumber = 630;
  }

  return (
    <>
      <style>
        {`
          .prediction-popup {
            position: absolute;
            left: ${calculateLeftPosition()}px;
            transform: translateX(${transformNumber}%); // Centra el popup sobre el thumb
            width: 140px;
            bottom: 40px;
            background-color: orange;
            padding: 4px;
            text-align: center;
            border-radius: 8px;
            color: white;
            font-size: 12px;
            font-weight: bold;
          }

          .popUpContainer {
          display: flex;
          flex-direction: column;
          }
        `}
      </style>
      <Box className="relative mx-4">
        <div className="popUpContainer">
          <div className="prediction-popup">
            <p>{popUpText}</p>
          </div>
          <AirbnbSlider
            value={value}
            onChange={handleSliderChange}
            defaultValue={0}
            min={0}
            max={48}
            step={12}
            marks={new Array(5).fill(0).map((_, index) => ({
              value: index * 12,
            }))}
          />
        </div>
      </Box>
    </>
  );
}
