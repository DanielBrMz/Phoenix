import type { Feature, GeoJsonProperties, Geometry, Point } from "geojson";

interface Coords {
  latitude: number;
  longitude: number;
}

const createGeoJSONCircles = (
  center: [number, number],
  radiusInKm: number,
  variation = 0.2,
): mapboxgl.GeoJSONSourceRaw => {
  const points = 64;
  const circles = 10; // Número de círculos concéntricosss

  const coords: Coords = {
    latitude: center[1],
    longitude: center[0],
  };

  const features: Feature<Geometry, GeoJsonProperties>[] = [];

  for (let j = 0; j < circles; j++) {
    const km = radiusInKm * ((j + 1) / circles); // Radio del círculo concéntrico

    const ret: Point[] = [];
    const distanceX =
      km / (111.32 * Math.cos((coords.latitude * Math.PI) / 180));
    const distanceY = km / 110.574;

    let theta, x, y;
    for (let i = 0; i < points; i++) {
      // Introduce some variation in the radius
      const radiusVariation = 1 + Math.random() * variation - variation / 2;
      const variedDistanceX = distanceX * radiusVariation;
      const variedDistanceY = distanceY * radiusVariation;

      // Introduce some variation in theta
      const thetaVariation = (Math.random() - 0.5) * ((2 * Math.PI) / points);
      theta = (i / points) * (2 * Math.PI) + thetaVariation;

      x = variedDistanceX * Math.cos(theta);
      y = variedDistanceY * Math.sin(theta);

      ret.push({
        type: "Point",
        coordinates: [coords.longitude + x, coords.latitude + y],
      });
    }
    if (ret[0]) ret.push(ret[0]);

    features.push({
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [ret.map((point) => point.coordinates)],
      },
      properties: {},
    });
  }

  return {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: features,
    },
  };
};

export default createGeoJSONCircles;
