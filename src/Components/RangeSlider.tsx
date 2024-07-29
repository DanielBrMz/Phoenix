import * as React from "react";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

export default function RangeSlider() {
  const [value, setValue] = React.useState(0); // Valor inicial ajustado a la mitad del rango para visualización

  const AirbnbSlider = styled(Slider)(({ theme }) => ({
    color: "#57c5f7", // Color del track cuando está activo
    height: 4,
    "& .MuiSlider-thumb": {
      height: 24,
      width: 24,
      backgroundColor: "#fff",
      border: "2px solid #000", // Borde del thumb
      "&:hover": {
        boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)",
      },
    },
    "& .MuiSlider-track": {
      height: 4,
    },
    "& .MuiSlider-rail": {
      height: 4,
      backgroundColor: "#d8d8d8", // Color del rail
    },
    "& .MuiSlider-mark": {
      backgroundColor: "#000", // Color de las marcas
      height: 10,
      width: 2,
      "&.MuiSlider-markActive": {
        backgroundColor: "transparent",
      },
    },
  }));

  return (
    <Box className="mx-4">
      <AirbnbSlider
        value={value}
        onChange={(event, newValue) => setValue(newValue as number)}
        defaultValue={24}
        min={0}
        max={48}
        step={12}
        marks={new Array(5).fill(0).map((_, index) => ({
          value: index * 12,
        }))}
      />
    </Box>
  );
}
