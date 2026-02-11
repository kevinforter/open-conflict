import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { geistMono } from "@/app/fonts/fonts";

interface TimelineChartProps {
  data: any[]; // Expecting CountryMonthStats[]
  className?: string;
  width?: number; // Optional initial width
  height?: number;
}

const TimelineChart: React.FC<TimelineChartProps> = ({
  data,
  className,
  height = 150,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: height });
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    data: any | null;
  }>({
    visible: false,
    x: 0,
    y: 0,
    data: null,
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width } = entries[0].contentRect;
      setDimensions({ width, height });
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [height]);

  useEffect(() => {
    if (!data || !svgRef.current || dimensions.width === 0) return;

    // Use monthly data directly. Ensure it's sorted by month/date.
    const sortedData = [...data].sort((a, b) => a.month - b.month);

    const margin = { top: 10, right: 10, bottom: 20, left: 30 };
    const chartWidth = dimensions.width - margin.left - margin.right;
    const chartHeight = dimensions.height - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Define gradients
    const defs = svg.append("defs");
    const gradient = defs
      .append("linearGradient")
      .attr("id", "area-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    gradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#ff9a65") // Theme Orange
      .attr("stop-opacity", 0.6);

    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#ff9a65")
      .attr("stop-opacity", 0.05);

    const g = svg
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X axis (Months)
    const x = d3
      .scaleLinear()
      .domain([1, 12]) // Jan - Dec
      .range([0, chartWidth]);

    g.append("g")
      .attr("transform", `translate(0,${chartHeight})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(6)
          .tickFormat((d) => d.toString()),
      )
      .call((g) => g.select(".domain").attr("stroke", "#ffffff33"))
      .call((g) => g.selectAll(".tick line").attr("stroke", "#ffffff33"))
      .call((g) =>
        g
          .selectAll(".tick text")
          .attr("fill", "#ffffff66")
          .attr("class", geistMono.className)
          .attr("font-size", "10px"),
      );

    // Y axis
    const maxVal = d3.max(sortedData, (d) => d.acled_events || 0) || 10;
    const y = d3.scaleLinear().domain([0, maxVal]).range([chartHeight, 0]);

    g.append("g")
      .call(d3.axisLeft(y).ticks(4).tickSize(-chartWidth)) // Grid lines
      .call((g) => g.select(".domain").remove())
      .call((g) => g.selectAll(".tick line").attr("stroke", "#ffffff11")) // Faint grid
      .call((g) =>
        g
          .selectAll(".tick text")
          .attr("fill", "#ffffff66")
          .attr("class", geistMono.className)
          .attr("font-size", "10px"),
      );

    // Area Generator
    const area = d3
      .area<any>()
      .defined((d) => d.acled_events !== undefined)
      .x((d) => x(d.month))
      .y0(chartHeight)
      .y1((d) => y(d.acled_events || 0))
      .curve(d3.curveMonotoneX);

    // Line Generator (for the top stroke)
    const lineEvents = d3
      .line<any>()
      .defined((d) => d.acled_events !== undefined)
      .x((d) => x(d.month))
      .y((d) => y(d.acled_events || 0))
      .curve(d3.curveMonotoneX);

    // Render Area
    g.append("path")
      .datum(sortedData)
      .attr("fill", "url(#area-gradient)")
      .attr("d", area);

    // Render Line
    g.append("path")
      .datum(sortedData)
      .attr("fill", "none")
      .attr("stroke", "#ff9a65") // Theme Orange (Events)
      .attr("stroke-width", 2)
      .attr("d", lineEvents);

    // Tooltip Interactions
    const bisect = d3.bisector((d: any) => d.month).center;

    // Overlay to capture mouse events - attached to 'g' but needs proper size
    g.append("rect")
      .attr("width", chartWidth)
      .attr("height", chartHeight)
      .attr("fill", "transparent")
      .on("mousemove", (event) => {
        const [mouseX] = d3.pointer(event);
        const x0 = x.invert(mouseX);
        const i = bisect(sortedData, x0, 1);
        const d0 = sortedData[i - 1];
        const d1 = sortedData[i];
        let d = d0;
        if (d1 && d0) {
          d = x0 - d0.month > d1.month - x0 ? d1 : d0;
        } else if (d1) {
          d = d1;
        }

        if (d) {
          setTooltip({
            visible: true,
            x: x(d.month) + margin.left,
            y: y(d.acled_events || 0) + margin.top, // Option: Position at data point
            data: d,
          });
        }
      })
      .on("mouseleave", () => {
        setTooltip((prev) => ({ ...prev, visible: false }));
      });

    // Optional: Draw a circle for the active point if tooltip is visible
    if (tooltip.visible && tooltip.data) {
      g.append("circle")
        .attr("cx", x(tooltip.data.month))
        .attr("cy", y(tooltip.data.acled_events || 0))
        .attr("r", 4)
        .attr("fill", "#ff9a65")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .style("pointer-events", "none"); // Ignore events so mousemove on rect works
    }
  }, [data, dimensions, tooltip.visible, tooltip.data]); // Re-render when tooltip state changes (for the circle)

  // Month names helper
  const getMonthName = (m: number) => {
    const date = new Date();
    date.setMonth(m - 1);
    return date.toLocaleString("default", { month: "short" });
  };

  return (
    <div ref={containerRef} className={`w-full relative ${className}`}>
      <svg ref={svgRef} className="block overflow-visible"></svg>

      {/* HTML Tooltip Overlay */}
      {tooltip.visible && tooltip.data && (
        <div
          className="absolute z-10 pointer-events-none bg-black/40 backdrop-blur-md border border-white/10 p-2 rounded shadow-xl text-xs transform -translate-x-1/2 -translate-y-full mt-[-8px]"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <div
            className={`${geistMono.className} text-white/50 mb-1 border-b border-white/10 pb-1`}
          >
            {getMonthName(tooltip.data.month)}
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#ff9a65]"></div>
            <span className={`text-white ${geistMono.className}`}>
              {tooltip.data.acled_events} Events
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimelineChart;
