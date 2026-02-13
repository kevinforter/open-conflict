import React from "react";
import dynamic from "next/dynamic";
import { n27, geistMono } from "@/app/fonts/fonts";
import { ChevronDownIcon, CheckIcon } from "@radix-ui/react-icons";
import { SidebarLayoutProps } from "./types";

// Charts
import SpiderChart from "../charts/SpiderChart";
import DonutChart from "../charts/DonutChart";
import HorizontalBarChart from "../charts/HorizontalBarChart";
import BeeswarmChart from "../charts/BeeswarmChart";

// Map must be dynamic
const Admin1Map = dynamic(() => import("../charts/Admin1Map"), { ssr: false });

export function SidebarLayoutDesktop({
  data,
  monthlyData,
  visible,
  expanded,
  loading,
  isSourcesOpen,
  setIsSourcesOpen,
  isFiltersOpen,
  setIsFiltersOpen,
  selectedSources,
  toggleSource,
  selectedEventTypes,
  setSelectedEventTypes,
  toggleEventType,
  availableEventTypes,
  visibleSources,
  combinedDonutData,
  admin1Data,
  filteredLocations,
  hasRiskProfile,
}: SidebarLayoutProps) {
  const colors = {
    ACLED: "#3b82f6",
    UCDP: "#a855f7",
    NGO: "#eab308",
  };

  return (
    <div className="w-full h-full grid grid-cols-12 grid-rows-[6.5fr_3.5fr] gap-4">
      {/* MAP CONTAINER - Desktop: Top Left (Col 1-7) */}
      <div className="relative w-full bg-white/5 border border-white/10 rounded-sm overflow-hidden group col-span-7 row-span-1 h-full block">
        <div className="relative flex-1 w-full h-full">
          <Admin1Map
            data={admin1Data}
            geometry={data["geometry"]}
            height="100%"
            className="w-full h-full absolute inset-0"
          />

          {/* KPI CARDS - DESKTOP (Overlay) */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-[1000]">
            {data["conflict_index_rank"] && (
              <div className="relative">
                <span className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 border-t border-l border-white/10 z-10" />
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 border-t border-r border-white/10 z-10" />
                <span className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 border-b border-l border-white/10 z-10" />
                <span className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 border-b border-r border-white/10 z-10" />

                <div className="bg-[rgba(20,20,20,0.6)] p-3 border border-white/10 shadow-xl min-w-[140px]">
                  <h4
                    className={`text-[#ff9a65] text-[10px] uppercase mb-1 ${geistMono.className}`}
                  >
                    Conflict Index
                  </h4>
                  <div
                    className={`text-xl flex items-baseline gap-2 ${n27.className}`}
                  >
                    {data["conflict_index_rank"] || "N/A"}
                    {data["conflict_index_level"] && (
                      <span
                        className={`text-[10px] text-white/40 uppercase tracking-widest truncate ${geistMono.className}`}
                      >
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
                <h4
                  className={`text-[#ff9a65] text-[10px] uppercase mb-1 ${geistMono.className}`}
                >
                  Total Events
                </h4>
                <div className={`text-xl ${n27.className}`}>
                  {data["acled_events"]?.toLocaleString() || "0"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* REGIONS - Desktop: Top Right (Col 8-12) */}
      <div className="col-span-5 row-span-1 flex flex-col min-h-0 h-full">
        <div className="flex-1 w-full bg-white/5 border border-white/10 rounded-sm p-4 flex flex-col min-h-0 overflow-hidden">
          {/* Filter Section */}
          <div className="shrink-0 mb-2 border-b border-white/5 pb-1">
            <button
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="flex items-center justify-between w-full text-left mb-2 group"
            >
              <h4
                className={`text-[#ff9a65] text-[10px] uppercase group-hover:text-white transition-colors ${geistMono.className}`}
              >
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
                className={`text-white/50 transition-transform ${
                  isFiltersOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isFiltersOpen && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                {/* Sources */}
                <div>
                  <div
                    className={`text-[10px] uppercase text-white/40 mb-2 ${geistMono.className}`}
                  >
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
                          className={`px-3 py-1.5 text-[10px] border rounded-xs transition-all ${
                            geistMono.className
                          } ${
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
                    <div
                      className={`text-[10px] uppercase text-white/40 ${geistMono.className}`}
                    >
                      Event Types
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          setSelectedEventTypes(new Set(availableEventTypes))
                        }
                        className="text-[9px] uppercase text-white/40 hover:text-white transition-colors"
                      >
                        All
                      </button>
                      <button
                        onClick={() => setSelectedEventTypes(new Set())}
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
                          className={`text-[10px] truncate transition-colors ${
                            geistMono.className
                          } ${
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
          <h4
            className={`text-[#ff9a65] text-[10px] ${geistMono.className} uppercase mb-2 shrink-0`}
          >
            Events by Region
          </h4>
          <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar">
            <HorizontalBarChart
              data={admin1Data}
              keys={["ACLED", "UCDP", "NGO"]}
              labelKey="name"
              colors={colors}
              height={
                admin1Data.length > 0 ? admin1Data.length * 40 + 40 : "100%"
              }
            />
          </div>
        </div>
      </div>

      {/* EVENT TYPES (Donut) - Desktop: Row 2, Right (Col 10-12) */}
      <div className="relative w-full bg-white/5 border border-white/10 rounded-sm flex flex-col col-span-3 col-start-10 row-start-2 h-full">
        <h4
          className={`absolute top-2 left-2 text-[#ff9a65] text-[10px] uppercase pointer-events-none ${geistMono.className}`}
        >
          Event Types
        </h4>
        <div className="flex-1 min-h-0 flex items-center justify-center p-2">
          <DonutChart
            data={combinedDonutData}
            height={225}
            innerRadius={0.6}
            showLabels={true}
            className="w-full h-full"
          />
        </div>
      </div>

      {/* RISK PROFILE (Spider Chart) - Desktop: Row 2, Left (Col 1-3) */}
      {hasRiskProfile ? (
        <div className="relative w-full bg-white/5 border border-white/10 rounded-sm col-span-3 col-start-1 row-start-2 h-full">
          <h4
            className={`absolute top-2 left-3 z-10 text-[#ff9a65] text-[10px] uppercase pointer-events-none ${geistMono.className}`}
          >
            Risk Profile
          </h4>
          <div className="w-full h-full pt-4 pb-3">
            <SpiderChart data={data} width="100%" height="100%" maxValue={50} />
          </div>
        </div>
      ) : null}

      {/* INCIDENT TIMELINE (Beeswarm) - Desktop: Row 2, Mid (Col 4-9 OR 1-9) */}
      <div
        className={`${
          hasRiskProfile ? "col-span-6 col-start-4" : "col-span-9 col-start-1"
        } row-start-2 relative w-full bg-white/5 border border-white/10 rounded-sm overflow-hidden h-full`}
      >
        <h4
          className={`absolute top-2 left-3 z-10 text-[#ff9a65] text-[10px] uppercase pointer-events-none ${geistMono.className}`}
        >
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
    </div>
  );
}
