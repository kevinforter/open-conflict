"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useRef } from "react";
import globeImage from "../../public/map/globe-map.jpg";
const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  {
    ssr: false,
  },
);
import { Database, ShieldCheck } from "lucide-react";
import BoldCornerButton from "@/components/BoldCornerButton";
import Noise from "@/components/Noise";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default function MethodologyPage() {
  const mainRef = useRef<HTMLElement>(null);

  return (
    <div className="flex h-screen flex-col overflow-hidden relative bg-black text-white">
      {/* Global Fixed Noise - Optimized single instance */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-50">
        <Noise />
      </div>

      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-[#050510] to-black z-[-1]" />

      <main
        ref={mainRef}
        className="flex-1 overflow-y-auto relative z-10 custom-scrollbar snap-y snap-mandatory scroll-smooth"
      >
        {/* Intro Section */}
        <section className="w-full min-h-screen flex flex-col pt-40 pb-20 snap-start px-6 md:px-16 max-w-[1600px] mx-auto relative">
          <div className="w-full">
            <h1 className="text-white/60 font-[n27] text-2xl md:text-4xl leading-[0.8] tracking-tighter mb-8 uppercase">
              [methodology]
            </h1>
            <div className="w-full h-px bg-white/20 mb-12" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
              <div className="lg:col-span-8">
                <h2 className="font-[n27] text-5xl md:text-8xl leading-[0.85] tracking-tighter mb-8">
                  TECHNICAL
                  <br />
                  DEEP DIVE
                </h2>
                <p className="font-[geistMono] text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl font-light">
                  How we transform fragmented global conflict data into
                  actionable intelligence through autonomous collection,
                  normalization, and aggregation.
                </p>
              </div>
              <div className="lg:col-span-4 flex justify-start lg:justify-end items-center">
                <Link href="/">
                  <BoldCornerButton className="h-12 text-sm">
                    Return to Home
                  </BoldCornerButton>
                </Link>
              </div>
            </div>

            <div className="mt-24 text-white/30 hidden md:block">
              <span className="font-[geistMono] text-[10px] uppercase tracking-widest">
                Scroll to Explore
              </span>
              <div className="h-12 w-px bg-white/20 mt-2 ml-4" />
            </div>
          </div>
        </section>

        {/* The Challenge Section */}
        <section className="w-full min-h-screen flex items-center snap-start bg-black relative border-t border-white/10 overflow-hidden">
          <div className="absolute top-0 right-0 w-2/3 h-full pointer-events-none" />

          <div className="w-full max-w-[1600px] mx-auto px-6 md:px-20 py-20 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
              <div className="lg:col-span-4 self-end">
                <span className="block text-[#ff9a65] font-[geistMono] text-xs uppercase tracking-widest mb-4">
                  The Challenge
                </span>
                <h2 className="font-[n27] text-5xl md:text-7xl text-white mb-6 leading-none">
                  DATA
                  <br />
                  SILOS
                </h2>
              </div>

              <div className="lg:col-span-8 flex flex-col justify-center space-y-8">
                <p className="font-light font-[geistMono] text-white/60 leading-relaxed text-base md:text-lg max-w-4xl">
                  Global conflict data is often fragmented across disparate
                  sources—academic studies, NGO field reports, and news
                  aggregators. This fragmentation creates blind spots.
                </p>
                <p className="font-light font-[geistMono] text-white/60 leading-relaxed text-base md:text-lg max-w-4xl">
                  Without a unified view, humanitarian response is reactive
                  rather than proactive. We bridge these gaps by normalizing and
                  visualizing multi-source data in a single accessible
                  interface.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 opacity-50 hover:opacity-100 transition-opacity duration-500">
                  <Link
                    href="#collect"
                    className="border border-white/20 p-4 hover:bg-white/10 hover:border-white/40 transition-all cursor-pointer group"
                  >
                    <span className="block font-[geistMono] text-xs text-white/50 mb-1 group-hover:text-[#ff9a65] transition-colors">
                      Standard 01
                    </span>
                    <span className="block font-[n27] text-lg">Collect</span>
                  </Link>
                  <Link
                    href="#normalize"
                    className="border border-white/20 p-4 hover:bg-white/10 hover:border-white/40 transition-all cursor-pointer group"
                  >
                    <span className="block font-[geistMono] text-xs text-white/50 mb-1 group-hover:text-[#ff9a65] transition-colors">
                      Standard 02
                    </span>
                    <span className="block font-[n27] text-lg">Normalize</span>
                  </Link>
                  <Link
                    href="#aggregate"
                    className="border border-white/20 p-4 hover:bg-white/10 hover:border-white/40 transition-all cursor-pointer group"
                  >
                    <span className="block font-[geistMono] text-xs text-white/50 mb-1 group-hover:text-[#ff9a65] transition-colors">
                      Standard 03
                    </span>
                    <span className="block font-[n27] text-lg">Aggregate</span>
                  </Link>
                  <Link
                    href="#visualize"
                    className="border border-white/20 p-4 hover:bg-white/10 hover:border-white/40 transition-all cursor-pointer group"
                  >
                    <span className="block font-[geistMono] text-xs text-white/50 mb-1 group-hover:text-[#ff9a65] transition-colors">
                      Standard 04
                    </span>
                    <span className="block font-[n27] text-lg">Visualize</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="w-full min-h-screen flex items-center snap-start bg-black relative border-t border-white/10 overflow-hidden">
          <div className="w-full max-w-[1600px] mx-auto px-6 md:px-20 py-20 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
              <div className="lg:col-span-4">
                <span className="block text-[#ff9a65] font-[geistMono] text-xs uppercase tracking-widest mb-4">
                  Architecture
                </span>
                <h2 className="font-[n27] text-4xl md:text-6xl text-white mb-6">
                  TECH
                  <br />
                  STACK
                </h2>
                <p className="font-[geistMono] text-white/60 text-base md:text-lg leading-relaxed mb-8">
                  A modern, scalable architecture designed for real-time data
                  ingestion, processing, and high-performance visualization.
                </p>
              </div>

              <div className="lg:col-span-8">
                <div className="border border-white/10 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-12 bg-white/5 border-b border-white/10 p-4 font-[geistMono] text-xs text-white/40 uppercase tracking-wider">
                    <div className="col-span-4 md:col-span-3">Layer</div>
                    <div className="col-span-8 md:col-span-9">
                      Technology / Tools
                    </div>
                  </div>

                  <div className="divide-y divide-white/5">
                    {[
                      {
                        layer: "Data ETL (Data Pipeline)",
                        tools: "Prefect + Python",
                      },
                      { layer: "Web Crawling", tools: "Python" },
                      {
                        layer: "Data Persistence",
                        tools:
                          "PostgreSQL + PostGIS (for relational, geospatial & time series data & flexible document structures)",
                      },
                      { layer: "API Layer / Backend", tools: "Supabase" },
                      {
                        layer: "Frontend / Visualization",
                        tools: "React (Next.js)",
                      },
                      {
                        layer: "Geodata / Maps",
                        tools: "Leaflet / GeoJson / ThreeJs / D3.js",
                      },
                      {
                        layer: "Container / Orchestration",
                        tools: "Docker, Kubernetes",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-12 p-4 md:p-6 hover:bg-white/5 transition-colors group"
                      >
                        <div className="col-span-4 md:col-span-3 font-[n27] text-white text-sm md:text-base group-hover:text-[#ff9a65] transition-colors">
                          {item.layer}
                        </div>
                        <div className="col-span-8 md:col-span-9 font-[geistMono] text-white/70 text-xs md:text-sm leading-relaxed">
                          {item.tools}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Standard 01: Collect */}
        <section
          id="collect"
          className="w-full min-h-screen flex items-center snap-start bg-black relative border-t border-white/10 overflow-hidden"
        >
          <div className="w-full max-w-[1600px] mx-auto px-6 md:px-20 py-20 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
              <div className="lg:col-span-5 flex flex-col justify-center space-y-8">
                <span className="block text-[#ff9a65] font-[geistMono] text-xs uppercase tracking-widest mb-1">
                  Standard 01
                </span>
                <h2 className="font-[n27] text-5xl md:text-7xl text-white mb-6 leading-none">
                  COLLECT
                </h2>

                <p className="font-[geistMono] text-white/60 leading-relaxed text-base md:text-lg max-w-xl">
                  Before analysis begins, we must gather intelligence. We
                  autonomously scrape, fetch, and ingest raw reports from
                  verified global conflict databases like UCDP, ACLED, AWSD and
                  REST Countries.
                </p>
              </div>

              <div className="lg:col-span-7">
                {/* Collection Visualization */}
                <div className="w-full aspect-[16/9] border border-white/10 bg-[#050505] relative flex items-center justify-center overflow-hidden p-6 group">
                  {/* Background Grid */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />

                  {/* Sources to Ingestion Animation */}
                  <div className="relative w-full max-w-lg h-60 flex items-center justify-between">
                    {/* Sources */}
                    <div className="flex flex-col gap-6">
                      {["UCDP", "ACLED", "AWSD"].map((source, i) => (
                        <div key={source} className="relative group/source">
                          <div
                            className={`w-24 h-10 border rounded flex items-center justify-center text-xs font-[geistMono] backdrop-blur-sm z-10 relative
                                                ${i === 0 ? "border-purple-500/60 text-purple-400 bg-purple-500/10" : ""}
                                                ${i === 1 ? "border-blue-500/60 text-blue-400 bg-blue-500/10" : ""}
                                                ${i === 2 ? "border-yellow-500/60 text-yellow-400 bg-yellow-500/10" : ""}
                                            `}
                          >
                            {source}
                          </div>
                          {/* Emission Particle */}
                          <div
                            className="absolute top-1/2 right-0 w-2 h-2 rounded-full translate-x-1/2 -translate-y-1/2 opacity-0 animate-[ping_2s_infinite]"
                            style={{
                              animationDelay: `${i * 0.5}s`,
                              backgroundColor:
                                i === 0
                                  ? "#a855f7"
                                  : i === 1
                                    ? "#3b82f6"
                                    : "#eab308",
                            }}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Flow Lines */}
                    <div className="flex-1 px-4 relative h-full">
                      <svg
                        className="w-full h-full overflow-visible"
                        viewBox="0 0 100 240"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M 0 56 C 50 56, 50 120, 100 120"
                          fill="none"
                          stroke="#a855f7"
                          strokeWidth="1"
                          strokeDasharray="4 4"
                          className="opacity-30"
                        />
                        <path
                          d="M 0 120 C 50 120, 50 120, 100 120"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="1"
                          strokeDasharray="4 4"
                          className="opacity-30"
                        />
                        <path
                          d="M 0 184 C 50 184, 50 120, 100 120"
                          fill="none"
                          stroke="#eab308"
                          strokeWidth="1"
                          strokeDasharray="4 4"
                          className="opacity-30"
                        />

                        {/* Particles */}
                        <circle r="2" fill="#a855f7">
                          <animateMotion
                            dur="3s"
                            repeatCount="indefinite"
                            path="M 0 56 C 50 56, 50 120, 100 120"
                          />
                        </circle>
                        <circle r="2" fill="#3b82f6">
                          <animateMotion
                            dur="3s"
                            begin="0.5s"
                            repeatCount="indefinite"
                            path="M 0 120 C 50 120, 50 120, 100 120"
                          />
                        </circle>
                        <circle r="2" fill="#eab308">
                          <animateMotion
                            dur="3s"
                            begin="1s"
                            repeatCount="indefinite"
                            path="M 0 184 C 50 184, 50 120, 100 120"
                          />
                        </circle>
                      </svg>
                    </div>

                    {/* Ingestion Node */}
                    <div className="w-32 h-32 rounded-full border border-white/10 bg-white/5 backdrop-blur flex items-center justify-center relative shadow-[0_0_50px_rgba(255,255,255,0.05)]">
                      <div className="absolute inset-0 rounded-full border border-white/5 animate-[spin_10s_linear_infinite]" />
                      <div className="absolute inset-2 rounded-full border border-white/5 animate-[spin_15s_linear_infinite_reverse]" />
                      <div className="text-center">
                        <div className="text-[10px] font-[geistMono] text-white/40 mb-1">
                          DATABASE
                        </div>
                        <Database className="w-8 h-8 text-white/80 mx-auto" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Standard 02: Normalize */}
        <section
          id="normalize"
          className="w-full min-h-screen flex items-center snap-start bg-black relative border-t border-white/10 overflow-hidden"
        >
          <div className="w-full max-w-[1600px] mx-auto px-6 md:px-20 py-20 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
              <div className="lg:col-span-5 flex flex-col justify-center space-y-8">
                <span className="block text-[#ff9a65] font-[geistMono] text-xs uppercase tracking-widest mb-1">
                  Standard 02
                </span>
                <h2 className="font-[n27] text-5xl md:text-7xl text-white mb-6 leading-none">
                  NORMALIZE
                </h2>

                <p className="font-[geistMono] text-white/60 leading-relaxed text-base md:text-lg max-w-xl">
                  Raw data varies wildly—timestamps, coordinates, and event
                  types are inconsistent across sources. We ingest disparate
                  formats and map them to a unified schema through a rigorous
                  Silver Layer ETL process:
                </p>
                <ul className="space-y-4 font-[geistMono] text-sm text-white/80 mt-6">
                  <li className="flex gap-4">
                    <span className="text-[#ff9a65]">01.</span>
                    <span>
                      <strong className="text-white block mb-1">
                        Dimension Table Creation
                      </strong>
                      Created{" "}
                      <span className="bg-white/10 px-1 rounded">
                        dim_country
                      </span>{" "}
                      based on the REST Countries API reference data,
                      establishing the canonical{" "}
                      <span className="text-green-400">
                        country_name_common
                      </span>{" "}
                      and{" "}
                      <span className="text-green-400">
                        country_name_official
                      </span>{" "}
                      keys.
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-[#ff9a65]">02.</span>
                    <span>
                      <strong className="text-white block mb-1">
                        Fact Table Standardization
                      </strong>
                      Transformed raw event logs into normalized fact tables (
                      <span className="bg-white/10 px-1 rounded">
                        fact_acled_events
                      </span>
                      ,{" "}
                      <span className="bg-white/10 px-1 rounded">
                        fact_ucdp_gedevents
                      </span>
                      ,{" "}
                      <span className="bg-white/10 px-1 rounded">
                        fact_ngo_incidents
                      </span>
                      ) and converted raw coordinates into PostGIS{" "}
                      <span className="text-green-400">GEOGRAPHY</span> types.
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-[#ff9a65]">03.</span>
                    <span>
                      <strong className="text-white block mb-1">
                        Geospatial Linking
                      </strong>
                      Joined all event fact tables with{" "}
                      <span className="bg-white/10 px-1 rounded">
                        dim_country
                      </span>{" "}
                      using the{" "}
                      <span className="text-green-400">
                        country_name_common
                      </span>{" "}
                      key to enforce referential integrity and spatial
                      consistency.
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-[#ff9a65]">04.</span>
                    <span>
                      <strong className="text-white block mb-1">
                        Enrichment
                      </strong>
                      Integrated auxiliary datasets including{" "}
                      <span className="bg-white/10 px-1 rounded">
                        fact_acled_conflict_index
                      </span>{" "}
                      for volatility metrics and{" "}
                      <span className="bg-white/10 px-1 rounded">
                        fact_ucdp_sources
                      </span>{" "}
                      for citation metadata.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-7">
                {/* Placeholder for Normalization Graph */}
                {/* Normalization Visualization - Detailed */}
                <div className="w-full aspect-[16/9] border border-white/10 bg-[#050505] relative overflow-hidden group">
                  {/* Background Grid */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />

                  {/* Input Scripts (Bronze) */}
                  <div className="absolute top-1/2 left-8 -translate-y-1/2 flex flex-col gap-3 z-10">
                    <div className="flex items-center gap-2 group/item">
                      <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                      <div className="bg-white/5 border border-white/10 px-2 py-1 rounded text-[10px] font-[geistMono] text-purple-300 w-48 truncate">
                        ucdp_gedevents_etl.py
                      </div>
                    </div>
                    <div className="flex items-center gap-2 group/item">
                      <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse delay-75" />
                      <div className="bg-white/5 border border-white/10 px-2 py-1 rounded text-[10px] font-[geistMono] text-blue-300 w-48 truncate">
                        acled_events_etl.py
                      </div>
                    </div>
                    <div className="flex items-center gap-2 group/item">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse delay-150" />
                      <div className="bg-white/5 border border-white/10 px-2 py-1 rounded text-[10px] font-[geistMono] text-yellow-300 w-48 truncate">
                        ngo_security_incidents_etl.py
                      </div>
                    </div>
                  </div>

                  {/* Schema Mapping Visualization */}
                  <div className="absolute top-1/2 left-[45%] -translate-y-1/2 -translate-x-1/2 flex flex-col gap-4 z-0">
                    {/* Mapping Lines (SVG) */}
                    <svg className="w-32 h-32 overflow-visible">
                      <path
                        d="M 0 20 C 50 20, 50 64, 120 64"
                        fill="none"
                        stroke="#a855f7"
                        strokeWidth="1"
                        strokeDasharray="2 2"
                        className="opacity-50"
                      />
                      <path
                        d="M 0 64 C 50 64, 50 64, 120 64"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="1"
                        strokeDasharray="2 2"
                        className="opacity-50"
                      />
                      <path
                        d="M 0 108 C 50 108, 50 64, 120 64"
                        fill="none"
                        stroke="#eab308"
                        strokeWidth="1"
                        strokeDasharray="2 2"
                        className="opacity-50"
                      />

                      {/* Transformation Node */}
                      <circle
                        cx="128"
                        cy="64"
                        r="16"
                        fill="#111"
                        stroke="white"
                        strokeWidth="1"
                        className="opacity-20"
                      />
                    </svg>
                  </div>

                  {/* Silver Layer Script */}
                  <div className="absolute top-1/2 right-1/3 -translate-y-1/2 transform translate-x-4 z-10 flex flex-col items-center gap-2">
                    <div className="w-24 h-24 border border-white/20 bg-black/80 backdrop-blur rounded-lg flex flex-col items-center justify-center relative shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                      <div className="absolute -top-3 bg-[#ff9a65] text-black text-[8px] font-bold px-1.5 py-0.5 rounded font-[geistMono]">
                        SILVER
                      </div>
                      <div className="font-[geistMono] text-[10px] text-white/80 mb-1">
                        silver_etl.py
                      </div>
                      <div className="w-16 h-px bg-white/10 my-1" />
                      <div className="flex flex-col gap-0.5 text-[8px] font-[geistMono] text-white/40">
                        <span>.normalize()</span>
                        <span>.clean_geom()</span>
                        <span>.dedup()</span>
                      </div>
                    </div>
                  </div>

                  {/* Output Tables (Silver Schemas) */}
                  <div className="absolute top-1/2 right-4 -translate-y-1/2 flex flex-col gap-3 z-10 w-48">
                    {/* UCDP Schema */}
                    <div className="bg-[#1e1e1e] border border-white/10 rounded overflow-hidden shadow-lg">
                      <div className="bg-white/5 px-2 py-1 text-[8px] font-[geistMono] text-white/40 border-b border-white/5 flex justify-between items-center">
                        <span>dw.fact_ucdp_gedevents</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      </div>
                      <div className="p-2 space-y-1">
                        <div className="flex justify-between text-[7px] font-[geistMono] hover:bg-white/5 px-1 rounded">
                          <span className="text-purple-300">id</span>
                          <span className="text-white/30">INT PK</span>
                        </div>
                        <div className="flex justify-between text-[7px] font-[geistMono] hover:bg-white/5 px-1 rounded">
                          <span className="text-white/70">date_start</span>
                          <span className="text-white/30">DATE</span>
                        </div>
                        <div className="flex justify-between text-[7px] font-[geistMono] hover:bg-white/5 px-1 rounded">
                          <span className="text-white/70">fatalities</span>
                          <span className="text-white/30">INT</span>
                        </div>
                        <div className="flex justify-between text-[7px] font-[geistMono] hover:bg-white/5 px-1 rounded">
                          <span className="text-green-400">geom</span>
                          <span className="text-white/30">POINT</span>
                        </div>
                      </div>
                    </div>

                    {/* ACLED Schema */}
                    <div className="bg-[#1e1e1e] border border-white/10 rounded overflow-hidden shadow-lg">
                      <div className="bg-white/5 px-2 py-1 text-[8px] font-[geistMono] text-white/40 border-b border-white/5 flex justify-between items-center">
                        <span>dw.fact_acled_events</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      </div>
                      <div className="p-2 space-y-1">
                        <div className="flex justify-between text-[7px] font-[geistMono] hover:bg-white/5 px-1 rounded">
                          <span className="text-blue-300">event_code</span>
                          <span className="text-white/30">TEXT PK</span>
                        </div>
                        <div className="flex justify-between text-[7px] font-[geistMono] hover:bg-white/5 px-1 rounded">
                          <span className="text-white/70">event_type</span>
                          <span className="text-white/30">TEXT</span>
                        </div>
                        <div className="flex justify-between text-[7px] font-[geistMono] hover:bg-white/5 px-1 rounded">
                          <span className="text-white/70">fatalities</span>
                          <span className="text-white/30">INT</span>
                        </div>
                        <div className="flex justify-between text-[7px] font-[geistMono] hover:bg-white/5 px-1 rounded">
                          <span className="text-green-400">geom</span>
                          <span className="text-white/30">POINT</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Standard 03: Aggregate */}
        <section
          id="aggregate"
          className="w-full min-h-screen flex items-center snap-start bg-black relative border-t border-white/10 overflow-hidden"
        >
          <div className="w-full max-w-[1600px] mx-auto px-6 md:px-20 py-20 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
              <div className="lg:col-span-7 order-2 lg:order-1">
                {/* Flowchart Visualization */}
                <div className="w-full aspect-[16/9] border border-white/10 bg-[#050505] relative flex items-center justify-center overflow-hidden p-6 group">
                  {/* Background Grid */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />

                  <div className="flex justify-between items-center w-full max-w-2xl relative z-10 gap-4">
                    {/* 1. Ingestion Subgraph */}
                    <div className="flex flex-col gap-2 p-3 border border-white/5 rounded-lg bg-white/5 backdrop-blur-sm relative">
                      <div className="absolute -top-2 left-2 text-[8px] font-[geistMono] text-white/40 bg-[#050505] px-1">
                        INGESTION (PREFECT)
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                          <span className="text-[9px] font-[geistMono] text-white/60">
                            InvokeHttp (UCDP)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                          <span className="text-[9px] font-[geistMono] text-white/60">
                            CSVReader (AWSD)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          <span className="text-[9px] font-[geistMono] text-white/60">
                            ExcelReader (ACLED)
                          </span>
                        </div>
                      </div>
                      {/* Outputs */}
                      <div className="absolute top-1/2 -right-1 w-1 h-1 bg-white/20 rounded-full" />
                    </div>

                    {/* Connector 1 */}
                    <div className="w-8 h-px bg-white/10 relative">
                      <div className="absolute top-1/2 left-0 w-1.5 h-1.5 bg-white/40 rounded-full -translate-y-1/2 animate-[packet_2s_infinite]" />
                    </div>

                    {/* 2. Python Scripts Subgraph */}
                    <div className="flex flex-col gap-2 p-3 border border-white/5 rounded-lg bg-white/5 backdrop-blur-sm relative">
                      <div className="absolute -top-2 left-2 text-[8px] font-[geistMono] text-white/40 bg-[#050505] px-1">
                        PYTHON PROCESS
                      </div>
                      <div className="text-[9px] font-[geistMono] text-white/80 text-center py-1">
                        Merge & Normalize
                      </div>
                      <div className="h-px w-full bg-white/10" />
                      <div className="text-[8px] font-[geistMono] text-[#336791] text-center">
                        Transform &rarr; Schema
                      </div>
                      {/* Outputs */}
                      <div className="absolute top-1/2 -left-1 w-1 h-1 bg-white/20 rounded-full" />
                      <div className="absolute top-1/2 -right-1 w-1 h-1 bg-white/20 rounded-full" />
                    </div>

                    {/* Connector 2 */}
                    <div className="w-8 h-px bg-white/10 relative">
                      <div className="absolute top-1/2 left-0 w-1.5 h-1.5 bg-white/40 rounded-full -translate-y-1/2 animate-[packet_2s_infinite_0.5s]" />
                    </div>

                    {/* 3. Database Layers (Silver -> Gold) */}
                    <div className="flex items-center gap-2">
                      {/* Silver Layer */}
                      <div className="flex flex-col gap-2 items-center">
                        <div className="w-16 h-20 border border-[#336791]/30 bg-[#336791]/10 rounded-lg flex flex-col items-center justify-center relative group-hover:bg-[#336791]/20 transition-colors">
                          <div className="text-[8px] font-[geistMono] text-[#336791] mb-1">
                            SILVER
                          </div>
                          <div className="w-8 h-8 rounded border border-[#336791]/50 flex flex-col items-center justify-center gap-0.5">
                            <div className="w-6 h-1 bg-[#336791] rounded-sm" />
                            <div className="w-6 h-1 bg-[#336791] rounded-sm" />
                            <div className="w-6 h-1 bg-[#336791] rounded-sm" />
                          </div>
                          <div className="absolute -bottom-2 px-1 bg-[#050505] text-[8px] font-[geistMono] text-white/40 border border-white/10 rounded">
                            Facts
                          </div>
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="w-4 h-px bg-white/10 relative">
                        <div className="absolute top-1/2 left-0 w-1.5 h-1.5 bg-white/40 rounded-full -translate-y-1/2 animate-[packet_2s_infinite]" />
                      </div>

                      {/* Gold Layer */}
                      <div className="flex flex-col gap-2 items-center">
                        <div className="w-16 h-20 border border-[#ff9a65]/30 bg-[#ff9a65]/10 rounded-lg flex flex-col items-center justify-center relative group-hover:bg-[#ff9a65]/20 transition-colors">
                          <div className="text-[8px] font-[geistMono] text-[#ff9a65] mb-1">
                            GOLD
                          </div>
                          <div className="w-8 h-8 rounded-full border border-[#ff9a65] flex items-center justify-center">
                            <div className="w-4 h-4 bg-[#ff9a65] rounded-full shadow-[0_0_10px_#ff9a65] animate-pulse" />
                          </div>
                          <div className="absolute -bottom-2 px-1 bg-[#050505] text-[8px] font-[geistMono] text-white/40 border border-white/10 rounded">
                            Marts
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Connector 3 */}
                    <div className="w-8 h-px bg-white/10 relative">
                      <div className="absolute top-1/2 left-0 w-1.5 h-1.5 bg-white/40 rounded-full -translate-y-1/2 animate-[packet_2s_infinite_1s]" />
                    </div>

                    {/* 4. API & Frontend */}
                    <div className="flex flex-col gap-2">
                      <div className="px-3 py-1.5 border border-green-500/30 bg-green-900/10 rounded text-[9px] font-[geistMono] text-green-400 text-center">
                        Supabase API
                      </div>
                      <div className="h-4 w-px bg-white/10 mx-auto" />
                      <div className="px-3 py-1.5 border border-[#ff9a65]/30 bg-[#ff9a65]/10 rounded text-[9px] font-[geistMono] text-[#ff9a65] text-center">
                        Frontend UI
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col justify-center space-y-8 lg:text-right">
                <span className="block text-[#ff9a65] font-[geistMono] text-xs uppercase tracking-widest mb-1">
                  Standard 03
                </span>
                <h2 className="font-[n27] text-5xl md:text-7xl text-white mb-6 leading-none">
                  AGGREGATE
                </h2>

                <div className="space-y-6 text-right">
                  <div className="space-y-2">
                    <h3 className="text-white font-[n27] text-lg">
                      Structured & Geospatial Data
                    </h3>
                    <p className="font-[geistMono] text-white/60 text-sm leading-relaxed">
                      <span className="text-[#ff9a65] font-[geistMono] text-xs uppercase tracking-wider block mb-1">
                        PostgreSQL + PostGIS
                      </span>
                      Stores strict relational data, conflict statistics, and
                      time series. PostGIS powers all geospatial logic, from
                      boundaries to point clustering.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-white font-[n27] text-lg">
                      Aggregated Data Marts
                    </h3>
                    <p className="font-[geistMono] text-white/60 text-sm leading-relaxed">
                      <span className="text-[#ff9a65] font-[geistMono] text-xs uppercase tracking-wider block mb-1">
                        Gold Layer (Materialized Views)
                      </span>
                      Pre-calculated statistical views (e.g., country_year,
                      global_month) stored as materialized views. Optimized for
                      instant dashboard performance.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-white font-[n27] text-lg">
                      Real-time API Layer
                    </h3>
                    <p className="font-[geistMono] text-white/60 text-sm leading-relaxed">
                      <span className="text-[#ff9a65] font-[geistMono] text-xs uppercase tracking-wider block mb-1">
                        Supabase
                      </span>
                      Bridges the database and frontend. Generates consolidated,
                      performant views that feed the interactive dashboard in
                      real-time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Standard 04: Visualize */}
        <section
          id="visualize"
          className="w-full min-h-screen flex items-center snap-start bg-black relative border-t border-white/10 overflow-hidden"
        >
          <div className="w-full max-w-[1600px] mx-auto px-6 md:px-20 py-20 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
              <div className="lg:col-span-5 flex flex-col justify-center space-y-8">
                <span className="block text-[#ff9a65] font-[geistMono] text-xs uppercase tracking-widest mb-1">
                  Standard 04
                </span>
                <h2 className="font-[n27] text-5xl md:text-7xl text-white mb-6 leading-none">
                  VISUALIZE
                </h2>

                <p className="font-[geistMono] text-white/60 leading-relaxed text-base md:text-lg max-w-xl">
                  Data is useless if it's not actionable. We transform millions
                  of data points into interactive heatmaps, temporal timelines,
                  and cluster analyses for immediate insight.
                </p>
                <p className="font-[geistMono] text-white/50 leading-relaxed text-sm md:text-base max-w-xl mt-6 border-l border-white/20 pl-4">
                  Events are precisely located on the map using a robust
                  geocoding hierarchy: prioritizing standard ISO codes (
                  <span className="text-emerald-400">cca2</span>,{" "}
                  <span className="text-emerald-400">ccn3</span>,{" "}
                  <span className="text-emerald-400">cioc</span>) and falling
                  back to{" "}
                  <span className="text-[#ff9a65]">country_name_common</span>{" "}
                  only as a last resort.
                </p>
              </div>

              <div className="lg:col-span-7">
                {/* Placeholder for Dashboard Mockup */}
                {/* Dashboard Visualization - Detailed Flow */}
                <div className="w-full aspect-[16/9] border border-white/10 bg-[#050505] relative p-6 flex items-center justify-center overflow-hidden group">
                  {/* Background Map Effect */}
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-[#050505] to-[#050505]" />

                  {/* Abstract Map Container */}
                  <div className="w-full h-full relative border border-white/5 rounded-lg bg-white/[0.02] backdrop-blur-sm overflow-hidden">
                    {/* Grid Lines */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

                    {/* Map Shapes (Globe) */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <World
                        globeConfig={{
                          pointSize: 1,
                          globeColor: "#050505",
                          showAtmosphere: true,
                          atmosphereColor: "#ffffff",
                          atmosphereAltitude: 0.1,
                          emissive: "#050505",
                          emissiveIntensity: 0.1,
                          shininess: 0.9,
                          polygonColor: "rgba(255,255,255,0.0)",
                          polygonStrokeColor: "rgba(255, 255, 255, 0.4)",
                          highlightedCountries: [
                            "United States of America",
                            "China",
                            "Russia",
                            "Germany",
                            "Ukraine",
                            "France",
                            "United Kingdom",
                          ],
                          highlightColor: "rgba(255, 0, 0, 0.1)",
                          ambientLight: "#38bdf8",
                          directionalLeftLight: "#ffffff",
                          directionalTopLight: "#ffffff",
                          pointLight: "#ffffff",
                          arcTime: 2000,
                          arcLength: 0.9,
                          rings: 1,
                          maxRings: 3,
                          initialPosition: { lat: 22.3193, lng: 114.1694 },
                          autoRotate: true,
                          autoRotateSpeed: 1,
                          globeImageUrl: globeImage.src,
                        }}
                        data={[
                          {
                            order: 1,
                            startLat: 37.7749,
                            startLng: -122.4194,
                            endLat: 51.5072,
                            endLng: -0.1276,
                            arcAlt: 0.3,
                            color: "#ff9a65",
                          },
                          {
                            order: 2,
                            startLat: 51.5072,
                            startLng: -127.4194,
                            endLat: 39.9042,
                            endLng: 116.4074,
                            arcAlt: 0.5,
                            color: "#ff9a65",
                          },
                          {
                            order: 3,
                            startLat: -1.2921,
                            startLng: 36.8219,
                            endLat: 51.5072,
                            endLng: -0.1276,
                            arcAlt: 0.3,
                            color: "#ff9a65",
                          },
                          {
                            order: 4,
                            startLat: 51.5072,
                            startLng: -0.1276,
                            endLat: 48.8566,
                            endLng: 2.3522,
                            arcAlt: 0.1,
                            color: "#ff9a65",
                          },
                          {
                            order: 5,
                            startLat: 48.8566,
                            startLng: 2.3522,
                            endLat: 52.52,
                            endLng: 13.405,
                            arcAlt: 0.1,
                            color: "#ff9a65",
                          },
                          {
                            order: 6,
                            startLat: 52.52,
                            startLng: 13.405,
                            endLat: 34.0522,
                            endLng: -118.2437,
                            arcAlt: 0.2,
                            color: "#ff9a65",
                          },
                          {
                            order: 7,
                            startLat: -8.843287,
                            startLng: 116.785305,
                            endLat: 22.3193,
                            endLng: 114.1694,
                            arcAlt: 0.3,
                            color: "#ff9a65",
                          },
                          {
                            order: 8,
                            startLat: 49.2827,
                            startLng: -123.1207,
                            endLat: 52.3676,
                            endLng: 4.9041,
                            arcAlt: 0.2,
                            color: "#ff9a65",
                          },
                        ]}
                      />
                    </div>

                    {/* UI Overlay: Sidebar (Filters) */}
                    <div className="absolute left-4 top-4 bottom-12 w-16 border border-white/10 bg-[#050505]/80 backdrop-blur rounded flex flex-col gap-2 p-2">
                      <div className="w-full aspect-square rounded bg-white/10" />
                      <div className="w-full aspect-square rounded bg-white/5" />
                      <div className="w-full aspect-square rounded bg-white/5" />
                      <div className="mt-auto w-full aspect-square rounded bg-[#ff9a65]/20 border border-[#ff9a65]/30" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="w-full flex flex-col justify-center snap-start bg-black border-t border-white/10 px-6 py-20 relative">
          <div className="max-w-[1600px] mx-auto w-full text-center">
            <h2 className="font-[n27] text-4xl md:text-6xl text-white mb-8">
              EXPLORE THE CODE
            </h2>
            <div className="flex justify-center gap-6">
              <Link href="/">
                <BoldCornerButton className="h-12">
                  Return Home
                </BoldCornerButton>
              </Link>

              <Link
                href="https://github.com/kevinforter/oda-project"
                target="_blank"
              >
                <div className={`group relative inline-flex h-12`}>
                  {/* Bold Corners on Wrapper */}
                  <span className="absolute -top-0.25 -left-0.25 w-1.5 h-1.5 border-t border-l border-[#ff9a65] transition-all group-hover:top-0 group-hover:left-0 group-hover:border-[#ff9a65]/0" />
                  <span className="absolute -top-0.25 -right-0.25 w-1.5 h-1.5 border-t border-r border-[#ff9a65] transition-all group-hover:top-0 group-hover:right-0 group-hover:border-[#ff9a65]/0" />
                  <span className="absolute -bottom-0.25 -left-0.25 w-1.5 h-1.5 border-b border-l border-[#ff9a65] transition-all group-hover:bottom-0 group-hover:left-0 group-hover:border-[#ff9a65]/0" />
                  <span className="absolute -bottom-0.25 -right-0.25 w-1.5 h-1.5 border-b border-r border-[#ff9a65] transition-all group-hover:bottom-0 group-hover:right-0 group-hover:border-[#ff9a65]/0" />

                  <button className="relative px-8 py-2 border bg-[#ff9a65]/10 border-[#ff9a65] text-white text-sm font-[n27] uppercase tracking-[0.15em] hover:bg-[#ff9a65] transition-colors cursor-pointer z-10">
                    View on GitHub
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <ScrollToTopButton containerRef={mainRef} />
    </div>
  );
}
