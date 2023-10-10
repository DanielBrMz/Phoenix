const createGeoJSONCircles = (center: [number, number], radiusInKm: number, variation = 0.2): mapboxgl.GeoJSONSourceRaw => {
  const points = 64;
  const circles = 10; // Número de círculos concéntricos

  let coords = {
      latitude: center[1],
      longitude: center[0]
  };

  let features: any[] = [];

  for(let j=0; j<circles; j++) {
    let km = radiusInKm * ((j + 1) / circles); // Radio del círculo concéntrico

    let ret: any = [];
    let distanceX = km/(111.320*Math.cos(coords.latitude*Math.PI/180));
    let distanceY = km/110.574;

    let theta, x, y;
    for(let i=0; i<points; i++) {
        // Introduce some variation in the radius
        let radiusVariation = 1 + Math.random() * variation - variation / 2;
        let variedDistanceX = distanceX * radiusVariation;
        let variedDistanceY = distanceY * radiusVariation;

        // Introduce some variation in theta
        let thetaVariation = (Math.random() - 0.5) * (2 * Math.PI / points);
        theta = ((i / points) * (2 * Math.PI)) + thetaVariation;

        x = variedDistanceX*Math.cos(theta);
        y = variedDistanceY*Math.sin(theta);

        ret.push([coords.longitude+x, coords.latitude+y]);
    }
    ret.push(ret[0]);

    features.push({
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [ret]
      },
      "properties": {}
    });
  }

  return {
    "type": "geojson",
    "data": {
      "type": "FeatureCollection",
      "features": features
    }
  };
};

export default createGeoJSONCircles;
