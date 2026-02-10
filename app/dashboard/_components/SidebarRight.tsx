import { useState, useEffect, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import Noise from "@/components/Noise";
import SpiderChart from "./charts/SpiderChart";
import BarChart from "./charts/BarChart";
import DonutChart from "./charts/DonutChart";
import HorizontalBarChart from "./charts/HorizontalBarChart";
// Dynamically import Admin1Map to avoid window is not defined error in Next.js SSR
const Admin1Map = dynamic(() => import("./charts/Admin1Map"), { ssr: false });
import BeeswarmChart from "./charts/BeeswarmChart";
import {
  selectCountryStats,
  type CountryStats,
} from "@/lib/db/selectCountryStats";
import {
  selectCountryStatsMonth,
  type CountryMonthStats,
} from "@/lib/db/selectCountryStatsMonth";
import { type CountryEventLocation } from "@/lib/db/selectCountryEventLocations";
import {
  selectCountrySources,
  type UCDPSource,
} from "@/lib/db/selectCountrySources";
import { ChevronDownIcon, CheckIcon } from "@radix-ui/react-icons";

interface SidebarRightProps {
  visible: boolean;
  countryName?: string | null;
  countryCode?: string | null;
  year: number;
  onClose: () => void;
  eventLocations?: CountryEventLocation[];
  onExpandChange?: (expanded: boolean) => void;
  expanded?: boolean;
}

export function SidebarRight({
  visible,
  countryName,
  countryCode,
  year,
  onClose,
  eventLocations = [],
  onExpandChange,
  expanded = false,
}: SidebarRightProps) {
  // const [isExpanded, setIsExpanded] = useState(false); // Removed in favor of controlled prop
  const [data, setData] = useState<CountryStats | null>(null);
  const [monthlyData, setMonthlyData] = useState<CountryMonthStats[]>([]);
  const [sources, setSources] = useState<UCDPSource[]>([]);
  const [isSourcesOpen, setIsSourcesOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Filter State
  const [selectedSources, setSelectedSources] = useState<Set<string>>(
    new Set(["UCDP", "ACLED", "NGO"]),
  );
  const [selectedEventTypes, setSelectedEventTypes] = useState<Set<string>>(
    new Set(),
  );
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Derive unique event types from data
  const allEventTypes = useMemo(() => {
    const types = new Set<string>();
    eventLocations.forEach((e) => types.add(e.event_type));
    return Array.from(types).sort();
  }, [eventLocations]);

  // Derive event types based on selected sources
  const availableEventTypes = useMemo(() => {
    const types = new Set<string>();
    eventLocations.forEach((evt) => {
      if (selectedSources.has(evt.source)) {
        types.add(evt.event_type);
      }
    });
    return Array.from(types).sort();
  }, [eventLocations, selectedSources]);

  // Derive available sources based on current year's data
  const visibleSources = useMemo(() => {
    return ["UCDP", "ACLED", "NGO"].filter((s) =>
      eventLocations.some((e) => e.source === s && e.year === year),
    );
  }, [eventLocations, year]);

  // Initialize event types when data loads
  useEffect(() => {
    // If we just loaded data, select all available
    if (allEventTypes.length > 0 && selectedEventTypes.size === 0) {
      setSelectedEventTypes(new Set(allEventTypes));
    }
  }, [allEventTypes]);

  const toggleSource = (source: string) => {
    const nextSources = new Set(selectedSources);
    if (nextSources.has(source)) {
      nextSources.delete(source);
    } else {
      nextSources.add(source);
      // Auto-select event types for this source
      const typesToAdd = new Set<string>();
      eventLocations.forEach((evt) => {
        if (evt.source === source) {
          typesToAdd.add(evt.event_type);
        }
      });
      setSelectedEventTypes((prev) => {
        const nextTypes = new Set(prev);
        typesToAdd.forEach((t) => nextTypes.add(t));
        return nextTypes;
      });
    }
    setSelectedSources(nextSources);
  };

  const toggleEventType = (type: string) => {
    const next = new Set(selectedEventTypes);
    if (next.has(type)) next.delete(type);
    else next.add(type);
    setSelectedEventTypes(next);
  };

  const filteredLocations = useMemo(() => {
    return eventLocations.filter((evt) => {
      const sourceMatch = selectedSources.has(evt.source);
      const typeMatch = selectedEventTypes.has(evt.event_type);
      return sourceMatch && typeMatch;
    });
  }, [eventLocations, selectedSources, selectedEventTypes]);

  // Reset expansion when sidebar closes or country changes
  // Handled by parent via prop now, or we trigger change?
  // If not visible, parent probably sets expanded=false.
  // But let's keep the data resetting side effect.
  useEffect(() => {
    if (!visible) {
      // setIsExpanded(false); // Parent should handle this if they control it
      setData(null);
      setMonthlyData([]);

      // Reset Filters
      setSelectedSources(new Set(["UCDP", "ACLED", "NGO"]));
      setSelectedEventTypes(new Set());
      setIsFiltersOpen(false);
    }
  }, [visible, countryCode]);

  // Fetch data when country/year changes
  useEffect(() => {
    if (visible && countryCode && year) {
      setLoading(true);
      // Parallel fetching
      Promise.all([
        selectCountryStats(countryCode, year),
        selectCountryStatsMonth(countryCode, year),
        selectCountrySources(countryCode, year),
      ])
        .then(([stats, monthly, fetchedSources]) => {
          setData(stats);
          setMonthlyData(monthly);
          setSources(fetchedSources);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [visible, countryCode, year]);

  // Aggregate Chart Data
  const { combinedDonutData, admin1Data } = useMemo(() => {
    // ... (no changes to aggregation logic) ...
    const ucdpMap = new Map<string, number>();
    const acledMap = new Map<string, number>();
    const ngoMap = new Map<string, number>();
    const admin1Map = new Map<
      string,
      {
        count: number;
        latSum: number;
        lonSum: number;
        breakdown: Map<string, number>;
        UCDP: number;
        ACLED: number;
        NGO: number;
      }
    >();

    filteredLocations.forEach((evt) => {
      if (evt.source === "UCDP") {
        ucdpMap.set(evt.event_type, (ucdpMap.get(evt.event_type) || 0) + 1);
      } else if (evt.source === "ACLED") {
        acledMap.set(evt.event_type, (acledMap.get(evt.event_type) || 0) + 1);
      } else if (evt.source === "NGO") {
        ngoMap.set(evt.event_type, (ngoMap.get(evt.event_type) || 0) + 1);
      }

      if (evt.admin1) {
        const current = admin1Map.get(evt.admin1) || {
          count: 0,
          latSum: 0,
          lonSum: 0,
          breakdown: new Map(),
          UCDP: 0,
          ACLED: 0,
          NGO: 0,
        };

        current.count += 1;
        current.latSum += Number(evt.latitude);
        current.lonSum += Number(evt.longitude);

        if (evt.source === "UCDP") current.UCDP += 1;
        if (evt.source === "ACLED") current.ACLED += 1;
        if (evt.source === "NGO") current.NGO += 1;

        const typeCount = current.breakdown.get(evt.event_type) || 0;
        current.breakdown.set(evt.event_type, typeCount + 1);

        admin1Map.set(evt.admin1, current);
      }
    });

    const ucdpColors = [
      "#a855f7",
      "#d946ef",
      "#c084fc",
      "#e879f9",
      "#7e22ce",
      "#a21caf",
    ];
    const acledColors = [
      "#3b82f6",
      "#06b6d4",
      "#60a5fa",
      "#22d3ee",
      "#1d4ed8",
      "#0e7490",
    ];
    const ngoColors = ["#facc15", "#eab308", "#ca8a04", "#a16207", "#854d0e"];

    const toChartData = (map: Map<string, number>, colors: string[]) =>
      Array.from(map.entries())
        .map(([name, value], index) => ({
          name,
          value,
          color: colors[index % colors.length],
        }))
        .sort((a, b) => b.value - a.value);

    const ucdpChartData = toChartData(ucdpMap, ucdpColors);
    const acledChartData = toChartData(acledMap, acledColors);
    const ngoChartData = toChartData(ngoMap, ngoColors);

    const colorLookup = new Map<string, string>();
    ucdpChartData.forEach((d) => colorLookup.set(d.name, d.color));
    acledChartData.forEach((d) => colorLookup.set(d.name, d.color));
    ngoChartData.forEach((d) => colorLookup.set(d.name, d.color));

    const combinedDonutData = [
      ...ucdpChartData,
      ...acledChartData,
      ...ngoChartData,
    ].sort((a, b) => b.value - a.value);

    const admin1Data = Array.from(admin1Map.entries())
      .map(([name, stats]) => {
        const breakdownArray = Array.from(stats.breakdown.entries())
          .map(([type, count]) => ({
            type,
            count,
            color: colorLookup.get(type) || "#cccccc",
          }))
          .sort((a, b) => b.count - a.count);

        return {
          name,
          value: stats.count,
          UCDP: stats.UCDP,
          ACLED: stats.ACLED,
          NGO: stats.NGO,
          lat: stats.latSum / stats.count,
          lon: stats.lonSum / stats.count,
          breakdown: breakdownArray,
        };
      })
      .sort((a, b) => b.value - a.value);

    return { combinedDonutData, admin1Data };
  }, [filteredLocations]);

  const handleClose = () => {
    // setIsExpanded(false); // Controlled
    onExpandChange?.(false);
    onClose();
  };

  // Helper for toggle
  const toggleExpanded = () => {
    onExpandChange?.(!expanded);
  };

  // Use `expanded` prop instead of `isExpanded` state
  const isExpanded = expanded;

  // Scroll detection for dynamic padding
  const mainContentRef = useRef<HTMLDivElement>(null);
  const sourcesContentRef = useRef<HTMLDivElement>(null);
  const [mainHasScroll, setMainHasScroll] = useState(false);
  const [sourcesHasScroll, setSourcesHasScroll] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (mainContentRef.current) {
        setMainHasScroll(
          mainContentRef.current.scrollHeight >
            mainContentRef.current.clientHeight,
        );
      }
      if (sourcesContentRef.current) {
        setSourcesHasScroll(
          sourcesContentRef.current.scrollHeight >
            sourcesContentRef.current.clientHeight,
        );
      }
    };

    // Check initially and on updates
    checkScroll();

    // Observer for robust resizing
    const observer = new ResizeObserver(checkScroll);
    if (mainContentRef.current) observer.observe(mainContentRef.current);
    if (sourcesContentRef.current) observer.observe(sourcesContentRef.current);

    window.addEventListener("resize", checkScroll);
    return () => {
      window.removeEventListener("resize", checkScroll);
      observer.disconnect();
    };
  }, [data, sources, isSourcesOpen, visible, isExpanded]);

  return (
    <div
      className={`z-120 overflow-hidden absolute bottom-5 right-5 top-5 flex flex-col gap-4 bg-[rgba(5,20,50,0.95)] p-6 text-white shadow-[-10px_0_30px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
        visible
          ? "translate-x-0 opacity-100 pointer-events-auto"
          : "translate-x-[120%] opacity-0 pointer-events-none"
      } ${
        isExpanded
          ? "w-[calc(100vw-40px)] max-w-none h-[calc(100vh-40px)]"
          : "w-[25vw] min-w-[280px] max-w-[420px]"
      }`}
    >
      <Noise
        patternSize={250}
        patternScaleX={1}
        patternScaleY={1}
        patternRefreshInterval={2}
        patternAlpha={15}
      />
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-2">
        <h3 className="font-[n27] text-lg uppercase tracking-[0.1em] text-white">
          {countryName ?? "Details"}
        </h3>
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={toggleExpanded}
            className="cursor-pointer h-6 px-3 flex items-center text-[10px] font-[geistMono] uppercase tracking-[0.1em] text-white/70 transition hover:text-white hover:bg-white/10 border border-white/10 hover:border-white/30 whitespace-nowrap"
          >
            {isExpanded ? "Less Detail" : "More Detail"}
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="cursor-pointer h-6 w-6 flex items-center justify-center p-0 text-[10px] font-[geistMono] uppercase tracking-[0.1em] text-white transition bg-white/10 hover:bg-white hover:text-black"
          >
            &#x2715;
          </button>
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden">
        {loading ? (
          <div className="absolute inset-0 p-1">
            <p className="animate-pulse text-white/50">Loading data...</p>
          </div>
        ) : !data ? (
          <div className="absolute inset-0 p-1">
            <p className="text-white/50">
              No data available for this selection.
            </p>
          </div>
        ) : (
          <>
            {/* =========================================================================================
                    COLLAPSED VIEW LAYER
                   ========================================================================================= */}
            <div
              className={`absolute inset-0 w-full h-full flex flex-col overflow-hidden transition-all duration-500 ease-in-out ${
                !isExpanded
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0 pointer-events-none translate-x-4"
              }`}
            >
              {/* MAIN FLEX CONTENT */}
              <div
                ref={mainContentRef}
                className={`flex-1 flex flex-col min-h-0 overflow-y-auto custom-scrollbar ${mainHasScroll ? "pr-3" : ""}`}
              >
                {/* KPI Grid (Top) */}
                <div
                  className={`shrink-0 grid ${data["conflict_index_rank"] ? "grid-cols-2" : "grid-cols-1"} gap-4 mb-6`}
                >
                  {data["conflict_index_rank"] && (
                    <div className="bg-white/5 p-4 border border-white/5 whitespace-nowrap">
                      <h4 className="text-[#ff9a65] text-xs font-[geistMono] uppercase mb-2">
                        Conflict Index
                      </h4>
                      <div className="text-2xl font-[n27] flex items-baseline gap-2">
                        {data["conflict_index_rank"] || "N/A"}
                        {data["conflict_index_level"] && (
                          <span className="text-sm font-[geistMono] text-white/40 uppercase tracking-widest truncate">
                            {String(data["conflict_index_level"])}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="bg-white/5 p-4 border border-white/5 whitespace-nowrap">
                    <h4 className="text-[#ff9a65] text-xs font-[geistMono] uppercase mb-2">
                      Events
                    </h4>
                    <div className="text-2xl font-[n27]">
                      {data["acled_events"]?.toLocaleString() || "0"}
                    </div>
                  </div>
                </div>

                {/* Stats List (Middle - Always Visible) */}
                <div className="shrink-0 space-y-4 mb-6">
                  {[
                    "ngo_incident_count",
                    "acled_fatalities",
                    "acled_fatalities_prev",
                    "acled_population_exposure",
                  ].map((key) => {
                    const val = data[key as keyof CountryStats];
                    if (val === undefined || val === null) return null;

                    let displayName = key.replace(/_/g, " ");
                    let displayValue = String(val);

                    if (key === "ngo_incident_count")
                      displayName = "NGO Incidents";
                    if (key === "acled_fatalities") displayName = "Fatalities";
                    if (key === "acled_fatalities_prev")
                      displayName = "Fatalities Prev";
                    if (key === "acled_population_exposure") {
                      displayName = "Population Exposure";
                      displayValue = Number(val).toLocaleString();
                    }

                    return (
                      <div
                        key={key}
                        className="flex justify-between border-b border-white/5 py-0"
                      >
                        <span className="text-xs uppercase font-[geistMono] text-white/50">
                          {displayName}
                        </span>
                        <span className="text-white font-[geistMono]">
                          {displayValue}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Trends (Charts) - Always Visible */}
                <div className="shrink-0 grid grid-cols-1 gap-3 mb-6">
                  {/* Events Trend */}
                  <div className="h-[100px] w-full bg-white/5 border border-white/5 relative">
                    <h4 className="absolute top-1 left-2 text-[#ff9a65] text-[9px] font-[geistMono] uppercase pointer-events-none">
                      Events Trend
                    </h4>
                    <div className="w-full h-full pt-4 pb-1 px-1">
                      <BarChart
                        data={monthlyData}
                        dataKey="acled_events"
                        color="#ff9a65"
                        height="100%"
                        tickCount={1}
                      />
                    </div>
                  </div>

                  {/* Population Exposure */}
                  <div className="h-[100px] w-full bg-white/5 border border-white/5 relative">
                    <h4 className="absolute top-1 left-2 text-[#ff9a65] text-[9px] font-[geistMono] uppercase pointer-events-none">
                      Pop. Exposure
                    </h4>
                    <div className="w-full h-full pt-4 pb-1 px-1">
                      <BarChart
                        data={monthlyData}
                        dataKey="acled_population_exposure"
                        color="#ff9a65"
                        height="100%"
                        tickCount={2}
                      />
                    </div>
                  </div>

                  {/* Fatalities */}
                  <div className="h-[100px] w-full bg-white/5 border border-white/5 relative">
                    <h4 className="absolute top-1 left-2 text-[#ef4444] text-[9px] font-[geistMono] uppercase pointer-events-none">
                      Fatalities
                    </h4>
                    <div className="w-full h-full pt-4 pb-1 px-1">
                      <BarChart
                        data={monthlyData}
                        dataKey="acled_fatalities"
                        color="#ef4444"
                        height="100%"
                        tickCount={2}
                      />
                    </div>
                  </div>
                </div>

                {/* Sources (Bottom - Expandable) */}
                {sources.length > 0 && (
                  <div
                    className={`flex flex-col min-h-0 rounded-xs overflow-hidden transition-[height] duration-500 ease-in-out shrink-0 ${
                      isSourcesOpen ? "h-[400px]" : "h-[48px]"
                    }`}
                  >
                    <button
                      onClick={() => setIsSourcesOpen(!isSourcesOpen)}
                      className="w-full shrink-0 border-b border-white/5 flex items-center justify-between p-3 transition text-left hover:bg-white/5 bg-transparent h-[48px]"
                    >
                      <span className="text-[#ff9a65] text-xs font-[geistMono] uppercase">
                        Top Sources ({sources.length})
                      </span>
                      <span
                        className={`text-white/50 transition-transform duration-300 ${isSourcesOpen ? "rotate-180" : ""}`}
                      >
                        <ChevronDownIcon />
                      </span>
                    </button>

                    <div
                      ref={sourcesContentRef}
                      className={`flex-1 min-h-0 overflow-y-auto bg-white/5 custom-scrollbar transition-opacity duration-300 ${sourcesHasScroll ? "pr-3" : ""} ${
                        isSourcesOpen
                          ? "opacity-100"
                          : "opacity-0 pointer-events-none"
                      }`}
                    >
                      <div className="p-3 space-y-3">
                        {sources.map((source, i) => (
                          <div
                            key={source.source_id || i}
                            className="border-b border-white/5 last:border-0 pb-2 last:pb-0"
                          >
                            <div className="flex justify-between items-start gap-2 mb-1">
                              <span
                                className="text-[10px] text-white/40 font-[geistMono] uppercase truncate max-w-[100px]"
                                title={source.source_office || "Unknown"}
                              >
                                {source.source_office || "Unknown Source"}
                              </span>
                              <span className="text-[10px] text-white/30 font-[geistMono] whitespace-nowrap">
                                {source.source_date}
                              </span>
                            </div>
                            <div className="text-white/90 text-[11px] leading-tight font-sans">
                              "
                              {source.source_headline ||
                                source.source_article ||
                                "No headline available"}
                              "
                            </div>
                            {source.fatalities > 0 && (
                              <div className="mt-1 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500/70 block"></span>
                                <span className="text-[9px] text-red-400 font-[geistMono]">
                                  {source.fatalities} fatalities
                                </span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* =========================================================================================
                    EXPANDED VIEW LAYER
                   ========================================================================================= */}
            <div
              className={`absolute inset-0 w-full h-full min-w-[calc(100vw-200px)] transition-all duration-500 ease-in-out flex flex-col gap-4 ${
                isExpanded
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {/* TOP ROW: MAP & REGIONS */}
              <div className="grid grid-cols-[3fr_2fr] gap-4 h-[65%] min-h-0">
                {/* MAP CONTAINER */}
                <div className="relative w-full h-full bg-white/5 border border-white/10 rounded-sm overflow-hidden group">
                  <Admin1Map
                    data={admin1Data}
                    geometry={data["geometry"]}
                    height="100%"
                    className="w-full h-full absolute inset-0"
                  />
                  {/* KPI CARDS OVERLAY */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2 z-[1000]">
                    {data["conflict_index_rank"] && (
                      <div className="relative">
                        <span className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 border-t border-l border-white/10 z-10" />
                        <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 border-t border-r border-white/10 z-10" />
                        <span className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 border-b border-l border-white/10 z-10" />
                        <span className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 border-b border-r border-white/10 z-10" />

                        <div className="bg-[rgba(20,20,20,0.6)] p-3 border border-white/10 shadow-xl min-w-[140px]">
                          <h4 className="text-[#ff9a65] text-[10px] font-[geistMono] uppercase mb-1">
                            Conflict Index
                          </h4>
                          <div className="text-xl font-[n27] flex items-baseline gap-2">
                            {data["conflict_index_rank"] || "N/A"}
                            {data["conflict_index_level"] && (
                              <span className="text-[10px] font-[geistMono] text-white/40 uppercase tracking-widest truncate">
                                {String(data["conflict_index_level"])}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="relative">
                      <span className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 border-t border-l border-white/10 z-10" />
                      <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 border-t border-r border-white/10 z-10" />
                      <span className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 border-b border-l border-white/10 z-10" />
                      <span className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 border-b border-r border-white/10 z-10" />

                      <div className="bg-[rgba(20,20,20,0.6)] p-3 border border-white/10 shadow-xl min-w-[140px]">
                        <h4 className="text-[#ff9a65] text-[10px] font-[geistMono] uppercase mb-1">
                          Total Events
                        </h4>
                        <div className="text-xl font-[n27]">
                          {data["acled_events"]?.toLocaleString() || "0"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN: REGIONS (Full Height) */}
                <div className="flex flex-col h-full min-h-0">
                  <div className="flex-1 w-full bg-white/5 border border-white/10 rounded-sm p-4 flex flex-col min-h-0 overflow-hidden">
                    {/* Filter Section (Collapsible) */}
                    <div className="shrink-0 mb-4 border-b border-white/5 pb-4">
                      <button
                        onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                        className="flex items-center justify-between w-full text-left mb-2 group"
                      >
                        <h4 className="text-[#ff9a65] text-xs font-[geistMono] uppercase group-hover:text-white transition-colors">
                          Filters{" "}
                          {!isFiltersOpen && (
                            <span className="text-white/40 ml-2">
                              (
                              {
                                Array.from(selectedSources).filter((s) =>
                                  visibleSources.includes(s),
                                ).length
                              }{" "}
                              Sources, {selectedEventTypes.size} Types)
                            </span>
                          )}
                        </h4>
                        <ChevronDownIcon
                          className={`text-white/50 transition-transform ${isFiltersOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      {isFiltersOpen && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                          {/* Source Toggles */}
                          <div>
                            <div className="text-[10px] uppercase text-white/40 mb-2 font-[geistMono]">
                              Data Sources
                            </div>
                            <div className="flex gap-2">
                              {visibleSources.map((source) => {
                                const isActive = selectedSources.has(source);
                                let activeColor =
                                  "bg-white/20 text-white border-white/30";
                                if (isActive) {
                                  if (source === "UCDP")
                                    activeColor =
                                      "bg-purple-500/20 text-purple-200 border-purple-500/50";
                                  if (source === "ACLED")
                                    activeColor =
                                      "bg-blue-500/20 text-blue-200 border-blue-500/50";
                                  if (source === "NGO")
                                    activeColor =
                                      "bg-yellow-500/20 text-yellow-200 border-yellow-500/50";
                                }

                                return (
                                  <button
                                    key={source}
                                    onClick={() => toggleSource(source)}
                                    className={`px-3 py-1.5 text-[10px] font-[geistMono] border rounded-xs transition-all ${
                                      isActive
                                        ? activeColor
                                        : "bg-transparent text-white/30 border-white/10 hover:border-white/20"
                                    }`}
                                  >
                                    {source}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Event Types */}
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <div className="text-[10px] uppercase text-white/40 font-[geistMono]">
                                Event Types
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() =>
                                    setSelectedEventTypes(
                                      new Set(availableEventTypes),
                                    )
                                  }
                                  className="text-[9px] uppercase text-white/40 hover:text-white transition-colors"
                                >
                                  All
                                </button>
                                <button
                                  onClick={() =>
                                    setSelectedEventTypes(new Set())
                                  }
                                  className="text-[9px] uppercase text-white/40 hover:text-white transition-colors"
                                >
                                  None
                                </button>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-1.5 max-h-[120px] overflow-y-auto custom-scrollbar p-1">
                              {availableEventTypes.map((type) => (
                                <label
                                  key={type}
                                  onClick={() => toggleEventType(type)}
                                  className="flex items-center gap-2 cursor-pointer group"
                                >
                                  <div
                                    className={`w-3 h-3 border transition-colors flex items-center justify-center rounded-xs ${
                                      selectedEventTypes.has(type)
                                        ? "bg-[#ff9a65] border-[#ff9a65]"
                                        : "border-white/20 group-hover:border-white/40"
                                    }`}
                                  >
                                    {selectedEventTypes.has(type) && (
                                      <CheckIcon className="text-black w-2.5 h-2.5" />
                                    )}
                                  </div>
                                  <span
                                    className={`text-[10px] font-[geistMono] truncate transition-colors ${
                                      selectedEventTypes.has(type)
                                        ? "text-white"
                                        : "text-white/50 group-hover:text-white/70"
                                    }`}
                                  >
                                    {type}
                                  </span>
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <h4 className="text-[#ff9a65] text-xs font-[geistMono] uppercase mb-2 shrink-0">
                      Events by Region
                    </h4>
                    <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar">
                      <HorizontalBarChart
                        data={admin1Data}
                        keys={["ACLED", "UCDP", "NGO"]}
                        labelKey="name"
                        colors={{
                          ACLED: "#3b82f6", // Blue
                          UCDP: "#a855f7", // Purple
                          NGO: "#eab308", // Yellow
                        }}
                        height={
                          admin1Data.length > 0
                            ? admin1Data.length * 40 + 40
                            : "100%"
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* BOTTOM ROW: Spider Chart + Beeswarm + Combined Donut */}
              {(() => {
                const hasRiskProfile =
                  data.deadliness_rank ||
                  data.diffusion_rank ||
                  data.danger_rank ||
                  data.fragmentation_rank;

                return (
                  <div className="grid grid-cols-4 gap-4 h-[35%] min-h-0">
                    {/* Risk Profile (Spider Chart) - 1 Col (conditional) */}
                    {hasRiskProfile ? (
                      <div className="relative w-full h-full bg-white/5 border border-white/10 rounded-sm">
                        <h4 className="absolute top-2 left-3 z-10 text-[#ff9a65] text-[10px] font-[geistMono] uppercase pointer-events-none">
                          Risk Profile
                        </h4>
                        <div className="w-full h-full pt-4 pb-3">
                          <SpiderChart
                            data={data}
                            width="100%"
                            height="100%"
                            maxValue={50}
                          />
                        </div>
                      </div>
                    ) : null}

                    {/* Beeswarm Timeline - Takes extra space if Risk Profile is missing */}
                    <div
                      className={`${hasRiskProfile ? "col-span-2" : "col-span-3"} relative w-full h-full bg-white/5 border border-white/10 rounded-sm overflow-hidden`}
                    >
                      <h4 className="absolute top-2 left-3 z-10 text-[#ff9a65] text-[10px] font-[geistMono] uppercase pointer-events-none">
                        Incident Timeline
                      </h4>
                      <div className="w-full h-full pt-6 pb-2 pl-2 pr-0">
                        <BeeswarmChart
                          data={filteredLocations}
                          height="100%"
                          className="w-full h-full"
                        />
                      </div>
                    </div>

                    {/* Combined Donut - 1 Col */}
                    <div className="relative w-full h-full bg-white/5 border border-white/10 rounded-sm flex flex-col">
                      <h4 className="absolute top-2 left-2 text-[#ff9a65] text-[10px] font-[geistMono] uppercase pointer-events-none">
                        Event Types
                      </h4>
                      <div className="flex-1 min-h-0 flex items-center justify-center p-2">
                        <DonutChart
                          data={combinedDonutData}
                          height={225}
                          innerRadius={0.6}
                          showLabels={true}
                        />
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
