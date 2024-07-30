import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import mapboxgl, { type MapMouseEvent } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import addCustomLayers from "~/utils/mapUtils/addCustomLayers";
import addCustomSources from "~/utils/mapUtils/addCustomSources";
import Timeslider from "~/Components/TimeSlider";
import NavBar from "~/Components/NavBar";
import ServicesLayer from "~/Components/Layers/ServicesLayer";
import Image from "next/image";

const CENTER_COORDS: [number, number] = [-110.8968082457804, 31.25933620026809];
const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiaGVjdG9yZ3R6MjciLCJhIjoiY2xuZ3dmc215MDc2ZDJqbWFydmszaTVxZCJ9.VjBUl1K3sWQTxY5pce434A";
const INITIAL_ZOOM = 15;
const INITIAL_PITCH = 60;

export default function Home() {
  const [kilometersPerPixel, setKilometersPerPixel] = useState(0);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    const map = new mapboxgl.Map({
      container: "map",
      projection: { name: "globe" },
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: CENTER_COORDS,
      zoom: INITIAL_ZOOM,
    });

    setMap(map);

    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.FullscreenControl());

    map.on("style.load", () => {
      addCustomSources(map);
      addCustomLayers(map);

      map.setFog({
        color: "rgb(186, 210, 235)",
        "high-color": "rgb(36, 92, 223)",
        "horizon-blend": 0.02,
        "space-color": "rgb(11, 11, 25)",
        "star-intensity": 0.6,
      });

      map.setTerrain({ source: "mapbox-dem", exaggeration: 1.4 });
      map.setPitch(INITIAL_PITCH);

      map.on("zoom", () => {
        setKilometersPerPixel(
          (4007501.6686 *
            Math.abs(Math.cos((map.getCenter().lat * Math.PI) / 180))) /
            Math.pow(2, map.getZoom() + 8),
        );
      });

      return () => {
        map.remove();
      };
    });
  }, []);

  return (
    <>
      <Head>
        <title>Phoenix Eye</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#789]">
        <div id="map" style={{ width: "100%", height: "100vh" }}></div>
        <NavBar map={map} />
        <Timeslider map={map!} scale={kilometersPerPixel} />
        {map && <ServicesLayer map={map} />}
        <Image
          src="/Phoenix-eye.png"
          alt="Logo"
          width={128}
          height={128}
          className="z-1 absolute bottom-4 left-8"
        />
      </main>
    </>
  );
}
