export interface GeoJsonFeature {
  type: string;
  geometry: {
    type: string;
    coordinates: any;
  };
  properties: Record<string, any>;
}

export interface GeoJson {
  type: string;
  features: GeoJsonFeature[];
}

export interface CountryCoordinates {
  lat: number;
  lon: number;
  bounds: {
    minLat: number;
    maxLat: number;
    minLon: number;
    maxLon: number;
  };
}

interface PolygonStats {
  area: number;
  centroid: { lat: number; lon: number };
  bounds: {
    minLat: number;
    maxLat: number;
    minLon: number;
    maxLon: number;
  };
}

const computeRingAreaCentroid = (ring: number[][]) => {
  if (!ring || ring.length < 3) return null;

  let areaSum = 0;
  let centroidX = 0;
  let centroidY = 0;

  for (let i = 0; i < ring.length; i++) {
    const [x1, y1] = ring[i];
    const [x2, y2] = ring[(i + 1) % ring.length];
    const cross = x1 * y2 - x2 * y1;
    areaSum += cross;
    centroidX += (x1 + x2) * cross;
    centroidY += (y1 + y2) * cross;
  }

  const area = areaSum * 0.5;
  if (Math.abs(area) < 1e-6) return null;

  const factor = 1 / (6 * area);
  return {
    area: Math.abs(area),
    centroid: {
      lon: centroidX * factor,
      lat: centroidY * factor,
    },
  };
};

const buildPolygonStats = (polygon: number[][][]): PolygonStats | null => {
  if (!polygon || polygon.length === 0) return null;

  const outerRing = polygon[0];
  const centroidData = computeRingAreaCentroid(outerRing);
  if (!centroidData) return null;

  let minLat = Infinity,
    maxLat = -Infinity;
  let minLon = Infinity,
    maxLon = -Infinity;

  outerRing.forEach(([lon, lat]) => {
    minLat = Math.min(minLat, lat);
    maxLat = Math.max(maxLat, lat);
    minLon = Math.min(minLon, lon);
    maxLon = Math.max(maxLon, lon);
  });

  return {
    area: centroidData.area,
    centroid: centroidData.centroid,
    bounds: { minLat, maxLat, minLon, maxLon },
  };
};

export const getCountryCoordinates = (
  countryName: string,
  geoJson: GeoJson
): CountryCoordinates | null => {
  const feature = geoJson.features.find((f) => {
    const props = f.properties;
    return (
      props?.iso_a2 === countryName ||
      props?.ISO_A2 === countryName ||
      props?.iso_a2_eh === countryName
    );
  });

  if (!feature) return null;

  const geometry = feature.geometry;
  const polygonStats: PolygonStats[] = [];

  if (geometry.type === "Polygon") {
    const stats = buildPolygonStats(geometry.coordinates as number[][][]);
    if (stats) polygonStats.push(stats);
  } else if (geometry.type === "MultiPolygon") {
    (geometry.coordinates as number[][][][]).forEach((polygon) => {
      const stats = buildPolygonStats(polygon);
      if (stats) polygonStats.push(stats);
    });
  }

  if (polygonStats.length === 0) return null;

  const largestPolygon = polygonStats.reduce((max, current) =>
    current.area > max.area ? current : max
  );

  return {
    lat: largestPolygon.centroid.lat,
    lon: largestPolygon.centroid.lon,
    bounds: largestPolygon.bounds,
  };
};
