import React from "react";
import dynamic from "next/dynamic";
import { n27, geistMono } from "@/app/fonts/fonts";
import { ChevronDownIcon, CheckIcon } from "@radix-ui/react-icons";
import { SidebarLayoutProps } from "./types";
import { UCDPSource } from "@/lib/db/selectCountrySources";

// Charts
import SpiderChart from "../charts/SpiderChart";
import DonutChart from "../charts/DonutChart";
import HorizontalBarChart from "../charts/HorizontalBarChart";
import BeeswarmChart from "../charts/BeeswarmChart";

// Map must be dynamic
const Admin1Map = dynamic(() => import("../charts/Admin1Map"), { ssr: false });

export function SidebarLayoutMobile({
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
  // Constants for colors (duplicated for now to avoid large refactor)
  const colors = {
    ACLED: "#3b82f6",
    UCDP: "#a855f7",
    NGO: "#eab308",
  };

  return (
    <div className="flex flex-col gap-4 pb-4 pr-2">
      {/* MAP CONTAINER - Mobile */}
      <div className="relative w-full overflow-hidden group aspect-square flex flex-col">
        {/* KPI CARDS - MOBILE (Above Map, Compact) */}
        <div className="flex flex-row gap-2 p-3 shrink-0">
          {data["conflict_index_rank"] && (
            <div className="flex flex-col">
              <h4
                className={`text-[#ff9a65] text-[10px] uppercase mb-0.5 ${geistMono.className}`}
              >
                Conflict Index
              </h4>
              <div
                className={`text-sm flex items-baseline gap-1.5 ${n27.className}`}
              >
                {data["conflict_index_rank"] || "N/A"}
                {data["conflict_index_level"] && (
                  <span
                    className={`text-[9px] text-white/40 uppercase tracking-widest truncate ${geistMono.className}`}
                  >
                    {String(data["conflict_index_level"]).split(" ")[0] ||
                      String(data["conflict_index_level"])}
                  </span>
                )}
              </div>
            </div>
          )}
          <div className="w-px bg-white/10 mx-1" />
          <div className="flex flex-col">
            <h4
              className={`text-[#ff9a65] text-[10px] uppercase mb-0.5 ${geistMono.className}`}
            >
              Total Events
            </h4>
            <div className={`text-sm ${n27.className}`}>
              {data["acled_events"]?.toLocaleString() || "0"}
            </div>
          </div>
        </div>

        {/* Map Area */}
        <div className="relative flex-1 w-full">
          <Admin1Map
            data={admin1Data}
            geometry={data["geometry"]}
            height="100%"
            className="w-full h-full absolute inset-0"
          />
        </div>
      </div>

      {/* REGIONS */}
      <div className="flex flex-col min-h-0 aspect-square">
        <div className="flex-1 w-full bg-white/5 border border-white/10 rounded-sm p-4 flex flex-col min-h-0 overflow-hidden">
          {/* Filter Section (Collapsible) */}
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
                {/* Source Toggles */}
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
          <div className="flex-1 w-full max-w-full min-h-0 overflow-y-auto overflow-x-hidden custom-scrollbar">
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

      {/* EVENT TYPES (Donut) */}
      <div className="relative w-full bg-white/5 border border-white/10 rounded-sm flex flex-col aspect-square">
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

      {/* RISK PROFILE (Spider Chart) */}
      {hasRiskProfile ? (
        <div className="relative w-full bg-white/5 border border-white/10 rounded-sm aspect-square">
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

      {/* INCIDENT TIMELINE (Beeswarm) */}
      <div className="relative w-full bg-white/5 border border-white/10 rounded-sm overflow-hidden aspect-square">
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
