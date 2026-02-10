"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface SpiderChartProps {
  data: any; // Relaxed type to accept formatted data
  className?: string;
  width?: number | string;
  height?: number | string;
  maxValue?: number;
}

const SpiderChart: React.FC<SpiderChartProps> = ({ 
  data, 
  className, 
  width = "100%", 
  height = "100%",
  maxValue = 200 
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [tooltip, setTooltip] = useState<{ x: number; y: number; content: string } | null>(null);

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
    if (!data || !svgRef.current || dimensions.width === 0 || dimensions.height === 0) return;

    // Normalize data structure
    const chartData = [
      { name: "Deadliness", value: data.deadliness_rank || 0 },
      { name: "Diffusion", value: data.diffusion_rank || 0 },
      { name: "Danger", value: data.danger_rank || 0 },
      { name: "Fragmentation", value: data.fragmentation_rank || 0 },
    ];

    const margin = { top: 30, right: 30, bottom: 30, left: 30 }; 
    const chartWidth = dimensions.width - margin.left - margin.right;
    const chartHeight = dimensions.height - margin.top - margin.bottom;
    const radius = Math.min(chartWidth, chartHeight) / 2;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
      .append("g")
      .attr("transform", `translate(${dimensions.width / 2},${dimensions.height / 2})`);

    const angleSlice = (Math.PI * 2) / chartData.length;

    // Scale for radius
    const rScale = d3.scaleLinear().domain([0, maxValue]).range([0, radius]);

    // Draw Grid
    const levels = 5;
    for (let i = 0; i < levels; i++) {
        const levelData = chartData.map((d, index) => ({
            x: radius * ((i + 1) / levels) * Math.cos(angleSlice * index - Math.PI / 2),
            y: radius * ((i + 1) / levels) * Math.sin(angleSlice * index - Math.PI / 2)
        }));
        
        // Use polygon for grid lines to match spider shape (diamond/square for 4 axes)
        const gridLine = d3.line<{x:number, y:number}>()
            .x(d => d.x)
            .y(d => d.y)
            .curve(d3.curveLinearClosed);

        g.append("path")
            .datum(levelData)
            .attr("d", gridLine)
            .style("fill", "transparent")
            .style("stroke", "rgba(255, 255, 255, 0.1)")
            .style("stroke-width", "0.5px");
    }

    // Draw Axes
    const axis = g.selectAll(".axis")
        .data(chartData)
        .enter()
        .append("g")
        .attr("class", "axis");

    axis.append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", (d, i) => rScale(maxValue) * Math.cos(angleSlice * i - Math.PI / 2))
        .attr("y2", (d, i) => rScale(maxValue) * Math.sin(angleSlice * i - Math.PI / 2))
        .attr("class", "line")
        .style("stroke", "rgba(255, 255, 255, 0.2)")
        .style("stroke-width", "1px");

    // Add Labels with dynamic anchor
    axis.append("text")
        .attr("class", "legend")
        .style("font-size", "10px") // Smaller font
        .style("font-family", "monospace")
        .style("fill", "#ccc")
        .attr("text-anchor", (d, i) => {
             const angle = angleSlice * i;
             if (angle === 0 || Math.abs(angle - Math.PI) < 0.1) return "middle";
             if (angle > 0 && angle < Math.PI) return "start";
             return "end";
        })
        .attr("dy", (d, i) => {
             const angle = angleSlice * i;
             if (angle === 0) return "-0.5em"; 
             if (Math.abs(angle - Math.PI) < 0.1) return "1.2em";   
             return "0.35em";
        })
        .each(function(d, i) {
             const el = d3.select(this);
             let lines = [d.name];
             
             // Wrap logic for specific long labels
             if (d.name === "Fragmentation") {
                 lines = ["Fragmen-", "tation"];
             } else if (d.name.length > 10 && d.name.includes(' ')) {
                 lines = d.name.split(' ');
             }
             
             // Calculate position
             const x = rScale(maxValue * 1.15) * Math.cos(angleSlice * i - Math.PI / 2);
             const y = rScale(maxValue * 1.15) * Math.sin(angleSlice * i - Math.PI / 2);
             
             // Update parent position
             d3.select(this).attr("x", x).attr("y", y);
             
             // Clear existing text content from previous steps or defaults
             el.text(null);

             lines.forEach((line, j) => {
                 el.append("tspan")
                   .attr("x", x) 
                   .attr("dy", j === 0 ? (lines.length > 1 ? "-0.2em" : "0.3em") : "1.0em")
                   .style("text-anchor", () => {
                        const angle = angleSlice * i;
                        if (angle === 0 || Math.abs(angle - Math.PI) < 0.1) return "middle";
                        if (angle > 0 && angle < Math.PI) return "start";
                        return "end";
                   })
                   .text(line);
             });
        });


    // Draw the Radar Path
    const radarLine = d3.lineRadial<{ name: string; value: number }>()
        .radius(d => rScale(d.value))
        .angle((d, i) => i * angleSlice)
        .curve(d3.curveLinearClosed);

    g.append("path")
        .datum(chartData)
        .attr("class", "radarArea")
        .attr("d", radarLine)
        .style("fill", "#ff9a65")
        .style("fill-opacity", 0.3)
        .style("stroke", "#ff9a65")
        .style("stroke-width", 2);

    // Draw Circle Points with Interaction
    g.selectAll(".radarCircle")
        .data(chartData)
        .enter()
        .append("circle")
        .attr("class", "radarCircle")
        .attr("r", 3)
        .attr("cx", (d, i) => rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
        .attr("cy", (d, i) => rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2))
        .style("fill", "#ff9a65")
        .style("fill-opacity", 1)
        .style("cursor", "crosshair")
        .on("mouseenter", (event, d) => {
             const [x, y] = d3.pointer(event, svgRef.current);
             setTooltip({
                 x: x, 
                 y: y - 10, 
                 content: `${d.name}: ${d.value}`
             });
             d3.select(event.currentTarget).attr("r", 5).style("fill", "#fff");
        })
        .on("mouseleave", (event) => {
             setTooltip(null);
             d3.select(event.currentTarget).attr("r", 3).style("fill", "#ff9a65");
        });

  }, [data, dimensions, maxValue]);

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ width, height }}>
        <svg ref={svgRef} className="overflow-visible" />
        {tooltip && (
            <div 
                className="absolute z-50 pointer-events-none px-2 py-1 bg-black/40 border border-white/10 text-white text-xs font-mono rounded backdrop-blur-md transform -translate-x-1/2 -translate-y-full"
                style={{
                    left: tooltip.x,
                    top: tooltip.y
                }}
            >
                {tooltip.content}
            </div>
        )}
    </div>
  );
};

export default SpiderChart;
