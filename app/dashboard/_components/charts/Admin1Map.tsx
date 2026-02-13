import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  ZoomControl,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import * as d3 from "d3";
import { geistMono } from "@/app/fonts/fonts";

// Fix Leaflet's default icon path issues in Next.js/Webpack
const DefaultIcon = L.icon({
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface Admin1MapProps {
  data: {
    name: string;
    value: number;
    lat: number;
    lon: number;
    breakdown?: { type: string; count: number; color: string }[];
    UCDP?: number;
    ACLED?: number;
    NGO?: number;
  }[];
  geometry?: any;
  className?: string;
  height?: number | string;
}

// Component to handle auto-fitting bounds based on data
const BoundsFitter = ({ data }: { data: Admin1MapProps["data"] }) => {
  const map = useMap();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const bounds = L.latLngBounds(data.map((d) => [d.lat, d.lon]));
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 7 });
    }
  }, [data, map]);

  return null;
};

// Component to handle map resize invalidation
const MapResizer = () => {
  const map = useMap();

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      map.invalidateSize();
    });

    const container = map.getContainer();
    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [map]);

  return null;
};

const Admin1Map: React.FC<Admin1MapProps> = ({
  data,
  className,
  height = 300,
}) => {
  const [tooltip, setTooltip] = useState<{
    name: string;
    value: number;
    breakdown?: any[];
    x: number;
    y: number;
  } | null>(null);

  // Determine max value for scaling radius
  const maxVal = Math.max(...data.map((d) => d.value), 0);

  // Radius scale function (pixels)
  const getRadius = (val: number) => {
    if (maxVal === 0) return 3;
    return 4 + (val / maxVal) * 20;
  };

  // Legend values (Max, ~Half, ~Quarter)
  const legendValues =
    maxVal > 0
      ? [maxVal, Math.floor(maxVal / 2), Math.floor(maxVal / 5)].filter(
          (v) => v > 0,
        )
      : [];
  // Deduplicate
  const uniqueLegendValues = Array.from(new Set(legendValues)).sort(
    (a, b) => b - a,
  );

  // Legend layout constants
  const legendWidth = 100;
  const legendHeight = 80;
  const legendXCircle = 30; // Center X of circles
  const legendYBase = legendHeight - 10; // Bottom Y base
  const legendXLabel = 60; // X position of text

  // Generate icons for markers
  const markers = useMemo(() => {
    return data.map((d, index) => {
      // Get values for each source
      const valUCDP = d.UCDP || 0;
      const valACLED = d.ACLED || 0;
      const valNGO = d.NGO || 0;

      // Calculate radii
      const rUCDP = getRadius(valUCDP);
      const rACLED = getRadius(valACLED);
      const rNGO = getRadius(valNGO);

      // Determine max radius for the container size
      const maxR = Math.max(rUCDP, rACLED, rNGO);
      const diameter = maxR * 2;

      // Prepare data for circles - render largest first (bottom)
      const circles = [
        { source: "UCDP", r: rUCDP, val: valUCDP, color: "#a855f7" },
        { source: "ACLED", r: rACLED, val: valACLED, color: "#3b82f6" },
        { source: "NGO", r: rNGO, val: valNGO, color: "#eab308" },
      ]
        .filter((c) => c.val > 0)
        .sort((a, b) => b.r - a.r);

      // Build SVG string
      const svgCircles = circles
        .map(
          (c) =>
            `<circle cx="${maxR}" cy="${maxR}" r="${c.r}" fill="${c.color}" fill-opacity="0.25" stroke="${c.color}" stroke-width="0.5" stroke-opacity="1" />`,
        )
        .join("");

      const svgString = `<svg width="${diameter}" height="${diameter}" style="overflow: visible;">${svgCircles}</svg>`;

      const icon = L.divIcon({
        className: "custom-bubble-marker",
        html: svgString,
        iconSize: [diameter, diameter],
        iconAnchor: [maxR, maxR], // Center anchor
      });

      return { ...d, icon };
    });
  }, [data]);

  return (
    <div className={`w-full relative ${className}`} style={{ height }}>
      <MapContainer
        center={[20, 0]}
        zoom={3}
        scrollWheelZoom={true}
        className="w-full h-full rounded-sm bg-[#1a1a1a]"
        attributionControl={false}
        zoomControl={false}
      >
        <ZoomControl position="bottomleft" />
        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          minZoom={0}
          maxZoom={20}
        />

        <BoundsFitter data={data} />
        <MapResizer />

        {markers.map((d, i) => (
          <Marker
            key={i}
            position={[d.lat, d.lon]}
            icon={d.icon}
            eventHandlers={{
              mouseover: (e) => {
                const originalEvent = e.originalEvent;
                // For divIcon, the target might be the svg or circle
                // We use the mouse event client coordinates for the tooltip
                setTooltip({
                  name: d.name,
                  value: d.value,
                  breakdown: d.breakdown,
                  x: originalEvent.clientX,
                  y: originalEvent.clientY,
                });
              },
              mouseout: () => {
                setTooltip(null);
              },
              mousemove: (e) => {
                const originalEvent = e.originalEvent;
                setTooltip((prev) =>
                  prev
                    ? {
                        ...prev,
                        x: originalEvent.clientX,
                        y: originalEvent.clientY,
                      }
                    : null,
                );
              },
            }}
          />
        ))}
      </MapContainer>

      {/* Legend Overlay */}
      {uniqueLegendValues.length > 0 && (
        <div className="absolute bottom-2 right-2 z-[1000] pointer-events-none">
          <span className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 border-t border-l border-white/10" />
          <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 border-t border-r border-white/10" />
          <span className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 border-b border-l border-white/10" />
          <span className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 border-b border-r border-white/10" />

          <div className="bg-[rgba(20,20,20,0.6)] border border-white/10 p-2">
            <div
              className={`text-[9px] text-[#ff9a65] uppercase ${geistMono.className} mb-1 text-center`}
            >
              Events
            </div>
            <svg width={legendWidth} height={legendHeight}>
              {uniqueLegendValues.map((val, i) => {
                const r = getRadius(val);
                return (
                  <g key={val}>
                    {/* Circle */}
                    <circle
                      cx={legendXCircle}
                      cy={legendYBase - r}
                      r={r}
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.6)"
                      strokeWidth="1"
                    />
                    {/* Dotted Line */}
                    <line
                      x1={legendXCircle}
                      y1={legendYBase - 2 * r}
                      x2={legendXLabel}
                      y2={legendYBase - 2 * r}
                      stroke="rgba(255, 255, 255, 0.4)"
                      strokeWidth="1"
                      strokeDasharray="2,2"
                    />
                    {/* Label */}
                    <text
                      x={legendXLabel + 5}
                      y={legendYBase - 2 * r}
                      fill="rgba(255, 255, 255, 0.8)"
                      fontSize="9"
                      className={geistMono.className}
                      alignmentBaseline="middle"
                    >
                      {val.toLocaleString()}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      )}

      {/* React Portal Tooltip */}
      {tooltip &&
        createPortal(
          <div
            className="fixed z-[9999] pointer-events-none transform -translate-x-1/2 -translate-y-full pb-1"
            style={{ left: tooltip.x, top: tooltip.y }}
          >
            <div className="absolute z-10 pointer-events-none bg-black/40 backdrop-blur-md border border-white/10 p-2 rounded shadow-xl text-xs transform -translate-x-1/2 -translate-y-full mt-[-8px]">
              <div
                className={`text-white ${geistMono.className} text-[11px] leading-tight mb-2 border-b border-white/10 pb-1 flex justify-between gap-4`}
              >
                <span className="font-bold text-[#ff9a65] max-w-[120px] truncate">
                  {tooltip.name}
                </span>
                <span className="text-white/70">
                  {tooltip.value.toLocaleString()}
                </span>
              </div>
              {tooltip.breakdown && (
                <div className="space-y-1">
                  {tooltip.breakdown.slice(0, 5).map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center gap-3 text-[10px]"
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-white/60 truncate max-w-[100px]">
                          {item.type}
                        </span>
                      </div>
                      <span className={`text-white ${geistMono.className}`}>
                        {item.count}
                      </span>
                    </div>
                  ))}
                  {tooltip.breakdown.length > 5 && (
                    <div className="text-[9px] text-white/30 italic pt-0.5">
                      + {tooltip.breakdown.length - 5} more...
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};

export default Admin1Map;
