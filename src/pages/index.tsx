import React from "react";
import dynamic from "next/dynamic";
import axios, { AxiosResponse } from "axios";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

const DynamicMapComponent = dynamic(() => import("../Components/MyMap"), {
  ssr: false,
});

// Define una interfaz para los props de tu componente
interface AppProps {
  data: number[][];
}

export default function App(props: AppProps) {
  return (
    <>
      <DynamicMapComponent {...props} />
    </>
  );
}

// Define una interfaz para los datos de las filas
interface RowData {
  longitude: string;
  latitude: string;
}

export async function getServerSideProps() {
  // Define la ruta al archivo CSV local
  const DATA_PATH = path.join(
    process.cwd(),
    "public",
    "data",
    "NogalesFire.csv",
  );

  function readAndParseCSV(filePath: string): Promise<number[][]> {
    return new Promise((resolve, reject) => {
      const points: number[][] = [];

      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (row: RowData) => {
          // Sólo guarda las columnas de latitud y longitud
          points.push([Number(row.longitude), Number(row.latitude)]);
        })
        .on("end", () => {
          resolve(points);
        })
        .on("error", (err: string) => {
          reject(err);
        });
    });
  }

  const points = await readAndParseCSV(DATA_PATH);

  return {
    props: {
      data: points,
    },
  };
}
