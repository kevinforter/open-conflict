import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { createPortal } from "react-dom";
import { geistMono } from "@/app/fonts/fonts";

interface HorizontalBarChartProps {
  data: any[];
  keys: string[]; // Keys to stack (e.g., ['UCDP', 'ACLED', 'NGO'])
  labelKey: string;
  colors: Record<string, string>;
  className?: string;
  height?: number | string;
}

const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({
  data,
  keys,
  labelKey,
  colors,
  className,
  height = 200,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    data: any | null;
    key?: string;
    value?: number;
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
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!data || !svgRef.current || dimensions.width === 0) return;

    // Calculate total for sorting
    const sortedData = [...data]
      .map((d) => ({
        ...d,
        total: keys.reduce((sum, k) => sum + (Number(d[k]) || 0), 0),
      }))
      .sort((a, b) => b.total - a.total);

    const margin = { top: 10, right: 80, bottom: 20, left: 140 };
    const chartWidth = dimensions.width - margin.left - margin.right;
    const chartHeight =
      (typeof height === "number" ? height : dimensions.height) -
      margin.top -
      margin.bottom;

    // Calculate optimal content height to prevent overly thick bars
    const MAX_ROW_HEIGHT = 40;
    const contentHeight = sortedData.length * MAX_ROW_HEIGHT;
    const usedHeight = Math.min(contentHeight, chartHeight);
    const offsetY = Math.max(0, (chartHeight - usedHeight) / 2);

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg
      .attr("width", dimensions.width)
      .attr("height", typeof height === "number" ? height : dimensions.height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top + offsetY})`);

    // Y axis (Categories)
    const y = d3
      .scaleBand()
      .domain(sortedData.map((d) => String(d[labelKey])))
      .range([0, usedHeight])
      .paddingInner(0.3)
      .paddingOuter(0.15);

    const yAxis = g
      .append("g")
      .call(d3.axisLeft(y).tickSize(0))
      .call((g) => g.select(".domain").remove());

    yAxis
      .selectAll(".tick text")
      .attr("fill", "#ffffff99")
      .attr("class", geistMono.className)
      .attr("font-size", "10px")
      .attr("x", -(margin.left - 10))
      .style("text-anchor", "start")
      .each(function (d: any) {
        const text = d3.select(this);
        const width = margin.left - 20;
        const words = text.text().split(/\s+/).reverse();
        let word;
        let line: any[] = [];
        const lines: any[][] = [];

        let tempTspan = text
          .text(null)
          .append("tspan")
          .attr("x", -(margin.left - 10));
        while ((word = words.pop())) {
          line.push(word);
          tempTspan.text(line.join(" "));
          if (tempTspan.node()!.getComputedTextLength() > width) {
            line.pop();
            lines.push([...line]);
            line = [word];
            tempTspan.text(word);
          }
        }
        lines.push(line);
        tempTspan.remove();

        const lineHeight = 1.1;
        const y = text.attr("y");
        const initialDy = 0.32 - ((lines.length - 1) * lineHeight) / 2;

        lines.forEach((l, i) => {
          text
            .append("tspan")
            .attr("x", -(margin.left - 10))
            .attr("y", y)
            .attr("dy", (i === 0 ? initialDy : lineHeight) + "em")
            .text(l.join(" "));
        });
      });

    // X axis (Values)
    const maxVal = d3.max(sortedData, (d) => d.total) || 10;
    const x = d3.scaleLinear().domain([0, maxVal]).range([0, chartWidth]);

    // Stack Data
    const stack = d3.stack().keys(keys);
    const series = stack(sortedData);

    // Horizontal Lines
    g.selectAll(".h-line")
      .data(sortedData)
      .join("line")
      .attr("class", "h-line")
      .attr("x1", -margin.left)
      .attr("x2", chartWidth + margin.right)
      .attr("y1", (d, i) => y.step() * (i + 1))
      .attr("y2", (d, i) => y.step() * (i + 1))
      .attr("stroke", "#ffffff11")
      .attr("stroke-dasharray", "2,2");

    // Render Bars
    const r = 2; // Corner radius

    g.selectAll(".layer")
      .data(series)
      .join("g")
      .attr("class", "layer")
      .attr("fill", (d) => colors[d.key] || "#ccc")
      .selectAll("path")
      .data((d) => d)
      .join("path")
      .attr("d", (d) => {
        const xVal = x(d[0]);
        const wVal = x(d[1]) - x(d[0]);
        const yVal = y(String(d.data[labelKey])) || 0;
        const hVal = y.bandwidth();

        const isLeft = d[0] === 0;
        const isRight = d[1] >= d.data.total - 0.01; // Epsilon for float safety

        // Ensure radius doesn't exceed dimensions
        const effR = Math.min(r, wVal / 2, hVal / 2);

        // Build Path: Top-Left -> Top-Right -> Bottom-Right -> Bottom-Left
        let p = "";

        // Start Top-Left
        p += `M ${isLeft ? xVal + effR : xVal},${yVal}`;

        // Top Line
        p += `L ${isRight ? xVal + wVal - effR : xVal + wVal},${yVal}`;

        // Top-Right Corner
        if (isRight)
          p += `A ${effR} ${effR} 0 0 1 ${xVal + wVal} ${yVal + effR}`;

        // Right Line
        p += `L ${xVal + wVal},${yVal + hVal - (isRight ? effR : 0)}`;

        // Bottom-Right Corner
        if (isRight)
          p += `A ${effR} ${effR} 0 0 1 ${xVal + wVal - effR} ${yVal + hVal}`;

        // Bottom Line
        p += `L ${isLeft ? xVal + effR : xVal},${yVal + hVal}`;

        // Bottom-Left Corner
        if (isLeft)
          p += `A ${effR} ${effR} 0 0 1 ${xVal} ${yVal + hVal - effR}`;

        // Left Line
        p += `L ${xVal},${yVal + (isLeft ? effR : 0)}`;

        // Top-Left Corner
        if (isLeft) p += `A ${effR} ${effR} 0 0 1 ${xVal + effR} ${yVal}`;

        p += "Z";
        return p;
      })
      .on("mousemove", (event, d) => {
        // Identify which key this rect belongs to
        const parentNode = (event.target as HTMLElement).parentNode;
        const parentDatum = d3.select(parentNode as any).datum() as any;
        const key = parentDatum?.key;
        const value = d[1] - d[0];

        setTooltip({
          visible: true,
          x: event.clientX,
          y: event.clientY,
          data: d.data,
          key: key,
          value: value,
        });
      })
      .on("mouseleave", () => {
        setTooltip((prev) => ({ ...prev, visible: false }));
      });

    // Total Labels on the Right
    g.selectAll(".value-label")
      .data(sortedData)
      .join("text")
      .attr("class", "value-label")
      .attr("x", chartWidth + margin.right - 10)
      .attr("y", (d) => (y(String(d[labelKey])) || 0) + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .text((d) => d.total.toLocaleString())
      .attr("fill", "white")
      .attr("class", geistMono.className)
      .attr("font-size", "10px")
      .attr("text-anchor", "end");
  }, [data, keys, labelKey, dimensions, colors]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-full relative ${className}`}
      style={{ height }}
    >
      <svg ref={svgRef} className="block overflow-visible"></svg>

      {/* No Data Overlay */}
      {(!data || data.length === 0) && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className={`text-white/30 text-[10px] ${geistMono.className}`}>
            No data
          </span>
        </div>
      )}

      {/* HTML Tooltip Overlay via Portal */}
      {mounted &&
        tooltip.visible &&
        tooltip.data &&
        createPortal(
          <div
            className="fixed z-9999 pointer-events-none bg-black/40 backdrop-blur-md border border-white/10 p-2 rounded shadow-xl text-xs mt-[-8px]"
            style={{
              left: tooltip.x,
              top: tooltip.y,
              transform: "translate(-50%, -100%)",
            }}
          >
            <div
              className={`${geistMono.className} text-white/40 mb-1 border-b border-white/5 pb-1 tracking-wider`}
            >
              {tooltip.data[labelKey]}
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: colors[tooltip.key!] }}
              ></div>
              <span
                className={`text-white/70 ${geistMono.className} text-[10px] uppercase`}
              >
                {tooltip.key}:
              </span>
              <span className={`text-white ${geistMono.className}`}>
                {Number(tooltip.value).toLocaleString()}
              </span>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};

export default HorizontalBarChart;
