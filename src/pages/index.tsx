import React from 'react'
import dynamic from 'next/dynamic';
import axios, { AxiosResponse } from 'axios'
import csv from 'csv-parser'

const DynamicMapComponent = dynamic(() => import('../Components/MyMap'), { ssr: false });

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
  lng: string;
  lat: string;
}

export async function getServerSideProps() {
  const DATA_URL =
    "https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv";

  async function fetchAndParseCSV(url: string): Promise<number[][]> {
    const response: AxiosResponse<NodeJS.ReadableStream> = await axios.get(url, {responseType: 'stream'});

    return new Promise((resolve, reject) => {
      const points: number[][] = [];

      response.data
        .pipe(csv())
        .on('data', (row: RowData) => {
          points.push([Number(row.lng), Number(row.lat)]);
        })
        .on('end', () => {
          resolve(points);
        })
        .on('error', (err: string) => {
          reject(err);
        });
    });
  }

  const points = await fetchAndParseCSV(DATA_URL)

  return {
    props: {
      data: points,
    },
  };
}
