import React from 'react'
import {useCallback, useState} from "react";
import mapboxgl, {type MapMouseEvent} from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css"
//import Timeslider from "~/Components/TimeSlider";
import NavBar from "~/Components/NavBar";
import {type Receiver} from "~/utils/receivers";
import Image from "next/image";
import ChatBot from "~/Components/ChatBot";
import KeplerGl from "kepler.gl";

import keplerGlReducer from "kepler.gl/reducers";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider, useDispatch } from "react-redux";
import { taskMiddleware } from "react-palm/tasks";
// import { addDataToMap } from "kepler.gl/actions";


const CENTER_COORDS: [number, number] = [-110.8968082457804, 31.25933620026809];
const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoiaGVjdG9yZ3R6MjciLCJhIjoiY2xuZ3dmc215MDc2ZDJqbWFydmszaTVxZCJ9.VjBUl1K3sWQTxY5pce434A";
const INITIAL_ZOOM = 15;
const INITIAL_PITCH = 60;


function _MyMap() {
  const [kilometersPerPixel, setKilometersPerPixel] = useState(0);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [selectedReceiver, setSelectedReceiver] = useState<Receiver | null>(null)

  const handleReceiverClick = useCallback((e: MapMouseEvent, receiver: Receiver) => {
    setSelectedReceiver(receiver)
  }, [setSelectedReceiver])

  // useEffect(() => {
  //   mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
	//
  //   const map = new mapboxgl.Map({
  //     container: "map",
  //     projection: { name: "globe" },
  //     style: "mapbox://styles/mapbox/satellite-streets-v12",
  //     center: CENTER_COORDS,
  //     zoom: INITIAL_ZOOM,
  //   });
	//
  //   setMap(map);
	//
  //   map.addControl(new mapboxgl.NavigationControl());
  //   map.addControl(new mapboxgl.FullscreenControl());
	//
  //   map.on("style.load", () => {
	//
  //     addCustomSources(map);
  //     addCustomLayers(map);
	//
  //     // Add receivers to map
  //     // let receivers = getCachedReceivers()
  //     let receivers: Receiver[] = []
  //     if (receivers.length == 0) {
  //       receivers = generateMockReceivers(CENTER_COORDS, 20)
  //     }
  //     addReceiversToMap(map, receivers, handleReceiverClick);
  //     cacheReceivers(receivers)
	//
  //     map.setFog({
  //       color: "rgb(186, 210, 235)",
  //       "high-color": "rgb(36, 92, 223)",
  //       "horizon-blend": 0.02,
  //       "space-color": "rgb(11, 11, 25)",
  //       "star-intensity": 0.6,
  //     });
	//
  //     map.setTerrain({ source: "mapbox-dem", exaggeration: 1.4 });
  //     map.setPitch(INITIAL_PITCH);
	//
  //     map.on('zoom', () => {
  //       setKilometersPerPixel(4007501.6686 * Math.abs(Math.cos((map.getCenter().lat * Math.PI) / 180)) / Math.pow(2, map.getZoom() + 8));
  //     });
	//
  //    return () => {
  //     map.remove();
  //   };
  //   });
  // }, [handleReceiverClick]);

        // <div id="map" style={{ width: "100%", height: "100vh"}}></div>
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#789]">
        {/* <div className="w-full h-full bg-[#777]" /> */}
        <KeplerGl
          id="map"
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
          style={{ width: "100%", height: "100vh"}}
          width={window.innerWidth}
          height={window.innerHeight}
        />
        <NavBar selectedReceiver={selectedReceiver} />
       {/* <Timeslider map={map!} scale={kilometersPerPixel}/>*/}
       <Image src="/Phoenix-eye.png" alt="Logo" width={128} height={128} className="absolute bottom-4 left-8 z-1"/>
       <ChatBot />
      </main>
    </>
  );
}


const reducers = combineReducers({
  keplerGl: keplerGlReducer
});

const store = createStore(reducers, {}, applyMiddleware(taskMiddleware));

export default function MyMap() {

  return (
    <Provider store={store}>
    <_MyMap />
    </Provider>
  )
}
