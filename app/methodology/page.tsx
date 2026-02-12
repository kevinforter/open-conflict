"use client";

import Link from "next/link";
import Image from "next/image";
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
import { n27, geistMono } from "@/app/fonts/fonts";
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
            <h1
              className={`text-white/60 ${n27.className} text-2xl md:text-4xl leading-[0.8] tracking-tighter mb-8 uppercase`}
            >
              [methodology]
            </h1>
            <div className="w-full h-px bg-white/20 mb-12" />

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-24 items-center">
              <div className="xl:col-span-8">
                <h2
                  className={`${n27.className} text-5xl md:text-8xl leading-[0.85] tracking-tighter mb-8`}
                >
                  TECHNICAL
                  <br />
                  DEEP DIVE
                </h2>
                <p
                  className={`${geistMono.className} text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl font-light`}
                >
                  How we transform fragmented global conflict data into
                  actionable intelligence through autonomous collection,
                  normalization, and aggregation.
                </p>
              </div>
              <div className="xl:col-span-4 flex justify-start xl:justify-end items-center">
                <Link href="/">
                  <BoldCornerButton className="h-12 text-sm">
                    Return to Home
                  </BoldCornerButton>
                </Link>
              </div>
            </div>

            <div className="mt-24 text-white/30 hidden md:block">
              <span
                className={`${geistMono.className} text-[10px] uppercase tracking-widest`}
              >
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
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-24">
              <div className="xl:col-span-4 self-end">
                <span
                  className={`block text-[#ff9a65] ${geistMono.className} text-xs uppercase tracking-widest mb-4`}
                >
                  The Challenge
                </span>
                <h2
                  className={`${n27.className} text-5xl md:text-7xl text-white mb-6 leading-none`}
                >
                  DATA
                  <br />
                  SILOS
                </h2>
              </div>

              <div className="xl:col-span-8 flex flex-col justify-center space-y-8">
                <p
                  className={`font-light ${geistMono.className} text-white/60 leading-relaxed text-base md:text-lg max-w-4xl`}
                >
                  Global conflict data is often fragmented across disparate
                  sources—academic studies, NGO field reports, and news
                  aggregators. This fragmentation creates blind spots.
                </p>
                <p
                  className={`font-light ${geistMono.className} text-white/60 leading-relaxed text-base md:text-lg max-w-4xl`}
                >
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
                    <span
                      className={`block ${geistMono.className} text-xs text-white/50 mb-1 group-hover:text-[#ff9a65] transition-colors`}
                    >
                      Standard 01
                    </span>
                    <span className={`block ${n27.className} text-lg`}>
                      Collect
                    </span>
                  </Link>
                  <Link
                    href="#normalize"
                    className="border border-white/20 p-4 hover:bg-white/10 hover:border-white/40 transition-all cursor-pointer group"
                  >
                    <span
                      className={`block ${geistMono.className} text-xs text-white/50 mb-1 group-hover:text-[#ff9a65] transition-colors`}
                    >
                      Standard 02
                    </span>
                    <span className={`block ${n27.className} text-lg`}>
                      Normalize
                    </span>
                  </Link>
                  <Link
                    href="#aggregate"
                    className="border border-white/20 p-4 hover:bg-white/10 hover:border-white/40 transition-all cursor-pointer group"
                  >
                    <span
                      className={`block ${geistMono.className} text-xs text-white/50 mb-1 group-hover:text-[#ff9a65] transition-colors`}
                    >
                      Standard 03
                    </span>
                    <span className={`block ${n27.className} text-lg`}>
                      Aggregate
                    </span>
                  </Link>
                  <Link
                    href="#visualize"
                    className="border border-white/20 p-4 hover:bg-white/10 hover:border-white/40 transition-all cursor-pointer group"
                  >
                    <span
                      className={`block ${geistMono.className} text-xs text-white/50 mb-1 group-hover:text-[#ff9a65] transition-colors`}
                    >
                      Standard 04
                    </span>
                    <span className={`block ${n27.className} text-lg`}>
                      Visualize
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="w-full min-h-screen flex items-center snap-start bg-black relative border-t border-white/10 overflow-hidden">
          <div className="w-full max-w-[1600px] mx-auto px-6 md:px-20 py-20 relative z-10">
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-24 items-start">
              <div className="xl:col-span-4">
                <span
                  className={`block text-[#ff9a65] ${geistMono.className} text-xs uppercase tracking-widest mb-4`}
                >
                  Architecture
                </span>
                <h2
                  className={`${n27.className} text-4xl md:text-6xl text-white mb-6`}
                >
                  TECH
                  <br />
                  STACK
                </h2>
                <p
                  className={`${geistMono.className} text-white/60 text-base md:text-lg leading-relaxed mb-8`}
                >
                  A modern, scalable architecture designed for real-time data
                  ingestion, processing, and high-performance visualization.
                </p>
              </div>

              <div className="xl:col-span-8">
                <div className="border border-white/10 rounded-lg overflow-hidden">
                  <div
                    className={`grid grid-cols-12 bg-white/5 border-b border-white/10 p-4 ${geistMono.className} text-xs text-white/40 uppercase tracking-wider`}
                  >
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
                        <div
                          className={`col-span-4 md:col-span-3 ${n27.className} text-white text-sm md:text-base group-hover:text-[#ff9a65] transition-colors`}
                        >
                          {item.layer}
                        </div>
                        <div
                          className={`col-span-8 md:col-span-9 ${geistMono.className} text-white/70 text-xs md:text-sm leading-relaxed`}
                        >
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
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-24 items-center">
              <div className="xl:col-span-5 flex flex-col justify-center space-y-8">
                <span
                  className={`block text-[#ff9a65] ${geistMono.className} text-xs uppercase tracking-widest mb-1`}
                >
                  Standard 01
                </span>
                <h2
                  className={`${n27.className} text-5xl md:text-7xl text-white mb-6 leading-none`}
                >
                  COLLECT
                </h2>

                <p
                  className={`${geistMono.className} text-white/60 leading-relaxed text-base md:text-lg max-w-xl`}
                >
                  Before analysis begins, we must gather intelligence. We
                  autonomously scrape, fetch, and ingest raw reports from
                  verified global conflict databases like UCDP, ACLED, AWSD and
                  REST Countries.
                </p>
              </div>

              <div className="xl:col-span-7">
                {/* Collection Visualization */}
                <div className="w-full aspect-[16/9] border border-white/10 bg-[#050505] relative flex items-center justify-center overflow-hidden p-6 group">
                  {/* Background Grid */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />

                  <Image
                    src="/methodology/collect.svg"
                    alt="Collection Visualization"
                    width={800}
                    height={450}
                    className="w-full h-full object-contain"
                  />
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
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-24 items-center">
              <div className="xl:col-span-5 flex flex-col justify-center space-y-8">
                <span
                  className={`block text-[#ff9a65] ${geistMono.className} text-xs uppercase tracking-widest mb-1`}
                >
                  Standard 02
                </span>
                <h2
                  className={`${n27.className} text-5xl md:text-7xl text-white mb-6 leading-none`}
                >
                  NORMALIZE
                </h2>

                <p
                  className={`${geistMono.className} text-white/60 leading-relaxed text-base md:text-lg max-w-xl`}
                >
                  Raw data varies wildly—timestamps, coordinates, and event
                  types are inconsistent across sources. We ingest disparate
                  formats and map them to a unified schema through a rigorous
                  Silver Layer ETL process:
                </p>
                <ul
                  className={`space-y-4 ${geistMono.className} text-sm text-white/80 mt-6`}
                >
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

              <div className="xl:col-span-7">
                {/* Collection Visualization */}
                <div className="w-full aspect-[16/9] border border-white/10 bg-[#050505] relative flex items-center justify-center overflow-hidden p-6 group">
                  {/* Background Grid */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />

                  <Image
                    src="/methodology/normalize.svg"
                    alt="Collection Visualization"
                    width={800}
                    height={450}
                    className="w-full h-full object-contain"
                  />
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
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-24 items-center">
              <div className="xl:col-span-7 order-2 xl:order-1">
                {/* Collection Visualization */}
                <div className="w-full aspect-[16/9] border border-white/10 bg-[#050505] relative flex items-center justify-center overflow-hidden p-6 group">
                  {/* Background Grid */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />

                  <Image
                    src="/methodology/aggregate.svg"
                    alt="Collection Visualization"
                    width={800}
                    height={450}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <div className="xl:col-span-5 order-1 xl:order-2 flex flex-col justify-center space-y-8 xl:text-right">
                <span
                  className={`block text-[#ff9a65] ${geistMono.className} text-xs uppercase tracking-widest mb-1`}
                >
                  Standard 03
                </span>
                <h2
                  className={`${n27.className} text-5xl md:text-7xl text-white mb-6 leading-none`}
                >
                  AGGREGATE
                </h2>

                <div className="space-y-6 text-right">
                  <div className="space-y-2">
                    <h3 className={`text-white ${n27.className} text-lg`}>
                      Structured & Geospatial Data
                    </h3>
                    <p
                      className={`${geistMono.className} text-white/60 text-sm leading-relaxed`}
                    >
                      <span
                        className={`text-[#ff9a65] ${geistMono.className} text-xs uppercase tracking-wider block mb-1`}
                      >
                        PostgreSQL + PostGIS
                      </span>
                      Stores strict relational data, conflict statistics, and
                      time series. PostGIS powers all geospatial logic, from
                      boundaries to point clustering.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className={`text-white ${n27.className} text-lg`}>
                      Aggregated Data Marts
                    </h3>
                    <p
                      className={`${geistMono.className} text-white/60 text-sm leading-relaxed`}
                    >
                      <span
                        className={`text-[#ff9a65] ${geistMono.className} text-xs uppercase tracking-wider block mb-1`}
                      >
                        Gold Layer (Materialized Views)
                      </span>
                      Pre-calculated statistical views (e.g., country_year,
                      global_month) stored as materialized views. Optimized for
                      instant dashboard performance.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className={`text-white ${n27.className} text-lg`}>
                      Real-time API Layer
                    </h3>
                    <p
                      className={`${geistMono.className} text-white/60 text-sm leading-relaxed`}
                    >
                      <span
                        className={`text-[#ff9a65] ${geistMono.className} text-xs uppercase tracking-wider block mb-1`}
                      >
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
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-24 items-center">
              <div className="xl:col-span-5 flex flex-col justify-center space-y-8">
                <span
                  className={`block text-[#ff9a65] ${geistMono.className} text-xs uppercase tracking-widest mb-1`}
                >
                  Standard 04
                </span>
                <h2
                  className={`${n27.className} text-5xl md:text-7xl text-white mb-6 leading-none`}
                >
                  VISUALIZE
                </h2>

                <p
                  className={`${geistMono.className} text-white/60 leading-relaxed text-base md:text-lg max-w-xl`}
                >
                  Data is useless if it's not actionable. We transform millions
                  of data points into interactive heatmaps, temporal timelines,
                  and cluster analyses for immediate insight.
                </p>
                <p
                  className={`${geistMono.className} text-white/50 leading-relaxed text-sm md:text-base max-w-xl mt-6 border-l border-white/20 pl-4`}
                >
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

              <div className="xl:col-span-7">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="w-full flex flex-col justify-center snap-start bg-black border-t border-white/10 px-6 py-20 relative">
          <div className="max-w-[1600px] mx-auto w-full text-center">
            <h2
              className={`${n27.className} text-4xl md:text-6xl text-white mb-8`}
            >
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

                  <button
                    className={`relative px-8 py-2 border bg-[#ff9a65]/10 border-[#ff9a65] text-white text-sm ${n27.className} uppercase tracking-[0.15em] hover:bg-[#ff9a65] transition-colors cursor-pointer z-10`}
                  >
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
