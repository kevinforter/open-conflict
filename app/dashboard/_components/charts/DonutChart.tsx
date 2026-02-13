import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { createPortal } from "react-dom";
import { geistMono } from "@/app/fonts/fonts";

interface DonutChartProps {
  data: { name: string; value: number; color?: string }[];
  className?: string;
  height?: number;
  innerRadius?: number; // 0 for pie, >0 for donut (e.g., 0.6 = 60%)
  showLabels?: boolean;
}

const DonutChart: React.FC<DonutChartProps> = ({
  data,
  className,
  height = 200,
  innerRadius = 0.6,
  showLabels = false,
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
      const { width, height: observedHeight } = entries[0].contentRect;
      setDimensions({ width, height: observedHeight || height });
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [height]);

  useEffect(() => {
    if (!data || !svgRef.current || dimensions.width === 0) return;

    const margin = { top: 10, right: 10, bottom: 10, left: 10 };
    const chartWidth = dimensions.width - margin.left - margin.right;
    const chartHeight = dimensions.height - margin.top - margin.bottom;
    // Adjust radius to make room for labels if needed
    const radius =
      (Math.min(chartWidth, chartHeight) / 2) * (showLabels ? 0.65 : 1);

    // Create groups for layers
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
      .append("g")
      .attr(
        "transform",
        `translate(${dimensions.width / 2},${dimensions.height / 2})`,
      );

    // Standard color scale if not provided in data
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3
      .pie<any>()
      .value((d) => d.value)
      .sort(null);

    const arc = d3
      .arc<any>()
      .innerRadius(radius * innerRadius)
      .outerRadius(radius);

    // Arcs for label positioning
    const outerArc = d3
      .arc<any>()
      .innerRadius(radius * 1.1)
      .outerRadius(radius * 1.1);

    // --- DRAW SLICES ---
    const slice = g
      .selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    slice
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => d.data.color || colorScale(d.data.name))
      .attr("stroke", "rgba(0,0,0,0.5)")
      .style("stroke-width", "1px");

    // --- DRAW LABELS & LINES ---
    if (showLabels) {
      // Filter out very small slices to avoid clutter
      const labelData = pie(data).filter(
        (d) => d.endAngle - d.startAngle > 0.1,
      );

      // Pre-calculate and relax positions
      const labels = labelData.map((d) => {
        const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        const isRight = midAngle < Math.PI;

        // Initial positions
        const posA = arc.centroid(d);
        const posB = outerArc.centroid(d);
        const posC = [...outerArc.centroid(d)];

        // Pin X
        posC[0] = radius * 1.35 * (isRight ? 1 : -1);

        // Estimate Height based on wrapping logic
        let lineCount = 1;
        if (
          d.data.name === "Explosions/Remote violence" ||
          d.data.name === "Violence against civilians"
        ) {
          lineCount = 3;
        } else if (d.data.name.includes("/")) {
          lineCount = 2;
        } else if (d.data.name.length > 15 && d.data.name.includes(" ")) {
          lineCount = 2;
        }
        const height = lineCount * 14; // Approx height per label block

        return {
          d,
          isRight,
          posA,
          posB,
          posC,
          y: posC[1],
          height,
        };
      });

      // Relax separation function
      const relax = (group: typeof labels) => {
        group.sort((a, b) => a.y - b.y);

        for (let i = 0; i < 8; i++) {
          // More iterations
          for (let j = 0; j < group.length - 1; j++) {
            const a = group[j];
            const b = group[j + 1];
            const delta = b.y - a.y;
            const requiredSpacing = a.height / 2 + b.height / 2 + 4; // Dynamic spacing + padding

            if (delta < requiredSpacing) {
              const overlap = requiredSpacing - delta;
              a.y -= overlap / 2;
              b.y += overlap / 2;
            }
          }
        }
      };

      relax(labels.filter((l) => l.isRight));
      relax(labels.filter((l) => !l.isRight));

      // Draw Lines
      g.selectAll("polyline")
        .data(labels)
        .enter()
        .append("polyline")
        .attr("stroke", "rgba(255,255,255,0.4)")
        .style("fill", "none")
        .attr("stroke-width", 1)
        .attr("points", (l) => {
          // Update posC Y from relaxation
          const finalC = [l.posC[0], l.y];
          return [l.posA, l.posB, finalC] as any;
        });

      // Draw Text
      g.selectAll("text")
        .data(labels)
        .enter()
        .append("text")
        .attr("transform", (l) => {
          return `translate(${l.posC[0] + (l.isRight ? 5 : -5)}, ${l.y})`;
        })
        .style("text-anchor", (l) => (l.isRight ? "start" : "end"))
        .style("font-size", "9px")
        .style("fill", "rgba(255,255,255,0.7)")
        .style("font-family", geistMono.style.fontFamily)
        .each(function (l) {
          const el = d3.select(this);
          const d = l.d;

          let lines = [d.data.name];
          // Explicit multi-line wrapping
          if (d.data.name === "Explosions/Remote violence") {
            lines = ["Explosions/", "Remote", "violence"];
          } else if (d.data.name === "Violence against civilians") {
            lines = ["Violence", "against", "civilians"];
          } else if (d.data.name.includes("/")) {
            lines = d.data.name.split("/");
            if (lines.length > 1) lines[0] += "/";
          } else if (d.data.name.length > 15 && d.data.name.includes(" ")) {
            const words = d.data.name.split(" ");
            const mid = Math.ceil(words.length / 2);
            lines = [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
          }

          lines.forEach((line, i) => {
            el.append("tspan")
              .attr("x", 0)
              .attr(
                "dy",
                i === 0
                  ? lines.length > 2
                    ? "-0.8em"
                    : lines.length > 1
                      ? "-0.3em"
                      : "0.3em"
                  : "1.1em",
              )
              .text(line);
          });
        });
    }

    // Interaction
    slice
      .selectAll("path")
      .on("mousemove", (event, d: any) => {
        setTooltip({
          visible: true,
          x: event.clientX,
          y: event.clientY,
          data: d.data,
        });
      })
      .on("mouseleave", (event, d) => {
        setTooltip((prev) => ({ ...prev, visible: false }));
      });
  }, [data, dimensions, innerRadius, showLabels]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div ref={containerRef} className={`w-full relative ${className}`}>
      <svg ref={svgRef} className="block overflow-visible"></svg>

      {/* No Data Overlay */}
      {(!data || data.length === 0 || data.every((d) => d.value === 0)) && (
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
            className="fixed z-9999 pointer-events-none bg-black/40 backdrop-blur-md border border-white/10 px-2 py-1.5 rounded-sm shadow-xl text-xs mt-[-8px]"
            style={{
              left: tooltip.x,
              top: tooltip.y,
              transform: "translate(-50%, -100%)",
            }}
          >
            <div
              className={`${geistMono.className} text-white/40 mb-1 border-b border-white/5 pb-1 tracking-wider`}
            >
              {tooltip.data.name}
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: tooltip.data.color || "#fff" }}
              ></div>
              <span className={`text-white ${geistMono.className}`}>
                {Number(tooltip.data.value).toLocaleString()}
              </span>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};

export default DonutChart;
