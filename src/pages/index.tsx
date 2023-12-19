import React from 'react'
import dynamic from 'next/dynamic';
import axios from 'axios'
import csv from 'csv-parser'

const DynamicMapComponent = dynamic(() => import('../Components/MyMap'), { ssr: false });

export default function App(props: any) {
  return (
      <>
        <DynamicMapComponent {...props} />
      </>

  );
}

export async function getServerSideProps() {
  // Source data CSV

  const DATA_URL =
      "https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv"; // eslint-disable-line


async function fetchAndParseCSV(url: string) {
  const response = await axios.get(url, {responseType: 'stream'});

  return new Promise((resolve, reject) => {
    const points: any[] = [];

    response.data
        .pipe(csv())
        .on('data', (row: any) => {
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