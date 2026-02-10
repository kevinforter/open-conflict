import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface BarChartProps {
  data: any[];
  dataKey: string;
  color?: string;
  className?: string;
  height?: number | string;
  tickCount?: number;
}

const BarChart: React.FC<BarChartProps> = ({ 
  data, 
  dataKey,
  color = "#ff9a65", 
  className,
  height = 150,
  tickCount = 4
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [tooltip, setTooltip] = useState<{ visible: boolean; x: number; y: number; data: any | null }>({
    visible: false,
    x: 0,
    y: 0,
    data: null
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

    // Ensure data is sorted by month
    const sortedData = [...data].sort((a, b) => a.month - b.month);

    const margin = { top: 10, right: 10, bottom: 20, left: 30 };
    const chartWidth = dimensions.width - margin.left - margin.right;
    const chartHeight = dimensions.height - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X axis (Months) - Band Scale for Bars
    // Assuming months are 1-12. If data is sparse, we might want to force domain 1-12.
    // For safety, let's map the existing months or force 1-12 if we want a full calendar view.
    // Let's stick to the data present for now, but usually timeline implies 1-12.
    // Let's create an array 1..12 to ensure spacing? Or just map data.
    // Using mapping 1-12 for consistent timeline look.
    const allMonths = Array.from({length: 12}, (_, i) => i + 1);
    
    const x = d3.scaleBand<number>()
      .domain(allMonths)
      .range([0, chartWidth])
      .padding(0.3);

    g.append("g")
      .attr("transform", `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x).tickFormat(d => d.toString())) 
      .call(g => g.select(".domain").attr("stroke", "#ffffff33"))
      .call(g => g.selectAll(".tick line").remove()) // Remove tick lines for cleaner bar chart
      .call(g => g.selectAll(".tick text").attr("fill", "#ffffff66").attr("font-family", "monospace").attr("font-size", "10px"));

    // Y axis
    const maxVal = d3.max(sortedData, d => Number(d[dataKey]) || 0) || 10;
    const y = d3.scaleLinear()
      .domain([0, maxVal])
      .range([chartHeight, 0]);

    g.append("g")
      .call(d3.axisLeft(y)
        .ticks(tickCount)
        .tickSize(-chartWidth)
        .tickFormat((d) => {
            const val = Number(d);
            if (val >= 1000000) return (val / 1000000).toFixed(1).replace(/\.0$/, '') + "M";
            if (val >= 1000) return (val / 1000).toFixed(1).replace(/\.0$/, '') + "T";
            return val.toString();
        })
      ) // Grid lines
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").attr("stroke", "#ffffff11")) 
      .call(g => g.selectAll(".tick text").attr("fill", "#ffffff66").attr("font-family", "monospace").attr("font-size", "10px"));

    // Bars
    g.selectAll(".bar")
      .data(sortedData)
      .join("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.month) || 0)
      .attr("y", d => y(Number(d[dataKey]) || 0))
      .attr("width", x.bandwidth())
      .attr("height", d => chartHeight - y(Number(d[dataKey]) || 0))
      .attr("fill", color)
      .attr("rx", 2) // Rounded corners top
      .on("mousemove", (event, d) => {
          const [mouseX, mouseY] = d3.pointer(event, svgRef.current); // relative to svg
          setTooltip({
              visible: true,
              x: mouseX,
              y: mouseY, // Tooltip follows mouse roughly? Or snaps to bar top?
              data: d
          });
      })
      .on("mouseleave", () => {
          setTooltip(prev => ({ ...prev, visible: false }));
      });
      
    // Optional: Hover effect (opacity or brightness handled via CSS or D3 events)
    // Could add a transparent overlay for better hit testing if bars are thin, but padding 0.3 is fine.

  }, [data, dataKey, dimensions, color]);

  // Month names helper
  const getMonthName = (m: number) => {
      const date = new Date();
      date.setMonth(m - 1);
      return date.toLocaleString('default', { month: 'short' });
  };

  return (
    <div ref={containerRef} className={`w-full relative ${className}`} style={{ height }}>
      <svg ref={svgRef} className="block overflow-visible"></svg>
      {/* HTML Tooltip Overlay */}
      {tooltip.visible && tooltip.data && (
          <div 
            className="absolute z-10 pointer-events-none bg-black/40 backdrop-blur-md border border-white/10 p-2 rounded shadow-xl text-xs transform -translate-x-1/2 -translate-y-full mt-[-8px]"
            style={{ left: tooltip.x, top: tooltip.y }}
          >
              <div className="font-mono text-white/50 mb-1 border-b border-white/10 pb-1">
                  {getMonthName(tooltip.data.month)}
              </div>
              <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></div>
                  <span className="text-white font-mono">{Number(tooltip.data[dataKey]).toLocaleString()}</span>
              </div>
          </div>
      )}
    </div>
  );
};

export default BarChart;
