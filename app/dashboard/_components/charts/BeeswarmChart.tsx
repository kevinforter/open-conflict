import React, { useEffect, useRef, useState, useMemo } from "react";
import * as d3 from "d3";
import { createPortal } from "react-dom";
import { CountryEventLocation } from "@/lib/db/selectCountryEventLocations";
import { geistMono } from "@/app/fonts/fonts";

interface BeeswarmChartProps {
  data: CountryEventLocation[];
  height?: number | string;
  className?: string;
  width?: number | string; // Optional direct width control
}

const BeeswarmChart: React.FC<BeeswarmChartProps> = ({
  data,
  height = 300,
  className,
  width: propWidth,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltip, setTooltip] = useState<{
    content: React.ReactNode;
    x: number;
    y: number;
  } | null>(null);

  // Track dimensions for responsiveness
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Color Scales (Keep consistent with other components)
  const ucdpScale = d3
    .scaleOrdinal()
    .range(["#a855f7", "#d946ef", "#c084fc", "#e879f9", "#7e22ce", "#a21caf"]);
  const acledScale = d3
    .scaleOrdinal()
    .range(["#3b82f6", "#06b6d4", "#60a5fa", "#22d3ee", "#1d4ed8", "#0e7490"]);
  // NGO Scale - Yellows/Oranges
  const ngoScale = d3
    .scaleOrdinal()
    .range(["#facc15", "#eab308", "#fbbf24", "#d97706"]);

  // Limit nodes for performance
  const MAX_NODES = 400;

  // Process Data for Simulation
  const processedData = useMemo(() => {
    // Filter out invalid dates/coords, Sort by Fatalities, slice top N
    return data
      .filter((d) => d.date && d.latitude && d.longitude)
      .sort((a, b) => (b.fatalities || 0) - (a.fatalities || 0))
      .slice(0, MAX_NODES)
      .map((d) => ({
        ...d,
        dateObj: new Date(d.date),
        // Reduced radius scaling to prevent overcrowding
        // Standard sqrt scaling, capped at 14px (down from 20px * 2)
        radius: Math.max(2, Math.min(14, Math.sqrt(d.fatalities || 1))),
      }));
  }, [data]);

  // Handle Resizing
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
    });

    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!containerRef.current || !svgRef.current || dimensions.width === 0)
      return;

    const svg = d3.select(svgRef.current);

    // Clear previous content immediately
    svg.selectAll("*").remove();

    // If no data, stop here
    if (!processedData.length) return;

    const container = containerRef.current;

    // Use observed dimensions or props
    const width = propWidth ? Number(propWidth) : dimensions.width;
    // Use prop height if fixed number, else observed height
    const chartHeight = typeof height === "number" ? height : dimensions.height;

    const margin = { top: 20, right: 20, bottom: 40, left: 20 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = chartHeight - margin.top - margin.bottom;

    // X Scale (Time)
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(processedData, (d) => d.dateObj) as [Date, Date])
      .range([0, innerWidth])
      .nice();

    // Main Group
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Axis
    const xAxis = d3
      .axisBottom(xScale)
      .tickSize(-innerHeight) // Grid lines
      .tickFormat(d3.timeFormat("%b") as any)
      .ticks(width > 600 ? 12 : 4);

    g.append("g")
      .attr("class", "grid-axis")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(xAxis)
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .selectAll(".tick line")
          .attr("stroke-opacity", 0.1)
          .attr("stroke", "#fff"),
      )
      .call((g) =>
        g.selectAll(".tick text").attr("fill", "#fff").attr("opacity", 0.5),
      );

    // Nodes for simulation
    const nodes = processedData.map((d) => ({
      ...d,
      x: xScale(d.dateObj),
      y: innerHeight / 2, // Start in middle
    }));

    // Simulation
    const simulation = d3
      .forceSimulation(nodes as any)
      .force("x", d3.forceX((d: any) => xScale(d.dateObj)).strength(1)) // Strong pull to time date
      .force("y", d3.forceY(innerHeight / 2).strength(0.3)) // Stronger pull to center line to keep it tighter
      .force("collide", d3.forceCollide((d: any) => d.radius + 1).strength(0.8)) // Prevent overlap
      .stop();

    // Run simulation manually to avoid animation jank
    for (let i = 0; i < 80; ++i) simulation.tick();

    // Draw Circles
    g.selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("cx", (d) => d.x)
      // Clamp Y to prevent overflow
      .attr("cy", (d) =>
        Math.max(d.radius, Math.min(innerHeight - d.radius, d.y)),
      )
      .attr("r", (d) => d.radius)
      .attr("fill", (d) => {
        if (d.source === "UCDP") return ucdpScale(d.event_type) as string;
        if (d.source === "ACLED") return acledScale(d.event_type) as string;
        if (d.source === "NGO") return ngoScale(d.event_type) as string;
        return "#ccc";
      })
      .attr("stroke", "rgba(0,0,0,0.3)")
      .attr("stroke-width", 1)
      .attr("opacity", 0.8)
      .style("cursor", "crosshair")
      .on("mouseenter", (event, d) => {
        setTooltip({
          x: event.clientX,
          y: event.clientY,
          content: (
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 border-b border-white/10 pb-1 mb-1">
                <span
                  className={`text-[10px] uppercase ${geistMono.className} px-1.5 py-0.5 rounded-sm ${
                    d.source === "UCDP"
                      ? "bg-purple-500/20 text-purple-300"
                      : d.source === "ACLED"
                        ? "bg-blue-500/20 text-blue-300"
                        : "bg-yellow-500/20 text-yellow-300"
                  }`}
                >
                  {d.source}
                </span>
                <span className="text-white/50 text-[10px]">{d.date}</span>
              </div>
              <div className="font-bold text-white text-xs">{d.event_type}</div>
              {d.sub_event_type && d.sub_event_type !== d.event_type && (
                <div className="text-white/60 text-[10px] italic">
                  {d.sub_event_type}
                </div>
              )}
              <div className="flex justify-between items-center mt-1">
                <span className="text-white/40 text-[10px]">Fatalities</span>
                <span className={`text-red-400 ${geistMono.className} text-xs`}>
                  {d.fatalities}
                </span>
              </div>
              {d.admin1 && (
                <div className="text-white/30 text-[9px] uppercase tracking-wide mt-1">
                  {d.admin1}
                </div>
              )}
            </div>
          ),
        });
      })
      .on("mousemove", (event) => {
        setTooltip((prev) =>
          prev ? { ...prev, x: event.clientX, y: event.clientY } : null,
        );
      })
      .on("mouseleave", () => setTooltip(null));
  }, [processedData, height, propWidth, dimensions]);

  return (
    <div
      ref={containerRef}
      className={`w-full relative ${className}`}
      style={{ height }}
    >
      <svg ref={svgRef} className="w-full h-full block overflow-visible" />

      {/* No Data Overlay */}
      {processedData.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className={`text-white/30 text-[10px] ${geistMono.className}`}>
            No data
          </span>
        </div>
      )}

      {/* Tooltip Portal */}
      {tooltip &&
        createPortal(
          <div
            className="fixed z-[99999] pointer-events-none transform -translate-x-1/2 -translate-y-[100%] pb-2"
            style={{ left: tooltip.x, top: tooltip.y }}
          >
            <div className="bg-black/40 border border-white/10 shadow-xl rounded-sm p-3 backdrop-blur-md min-w-[150px]">
              {tooltip.content}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};

export default BeeswarmChart;
