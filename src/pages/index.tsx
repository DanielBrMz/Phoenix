import React from 'react'
import Head from "next/head";
import "mapbox-gl/dist/mapbox-gl.css"
//import Timeslider from "~/Components/TimeSlider";
import dynamic from "next/dynamic";

const CENTER_COORDS: [number, number] = [-110.8968082457804, 31.25933620026809];
const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoiaGVjdG9yZ3R6MjciLCJhIjoiY2xuZ3dmc215MDc2ZDJqbWFydmszaTVxZCJ9.VjBUl1K3sWQTxY5pce434A";
const INITIAL_ZOOM = 15;
const INITIAL_PITCH = 60;

const MyMap = dynamic(() => import("~/Components/MyMap"), { ssr: false })

export default function Home() {
  return (
    <>
      <Head>
        <title>Phoenix Eye</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MyMap />
    </>
  );
}
