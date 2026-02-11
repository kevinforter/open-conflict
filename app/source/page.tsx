"use client";

import Link from "next/link";
import { useRef } from "react";
import BoldCornerButton from "@/components/BoldCornerButton";
import Noise from "@/components/Noise";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default function SourcesPage() {
  const mainRef = useRef<HTMLElement>(null);

  return (
    <div className="flex h-screen flex-col overflow-hidden relative bg-black text-white">
      {/* Global Fixed Noise - Optimized single instance */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-50">
        <Noise />
      </div>

      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-black via-[#050510] to-black z-[-1]" />

      <main
        ref={mainRef}
        className="flex-1 overflow-y-auto relative z-10 custom-scrollbar snap-y snap-mandatory scroll-smooth"
      >
        {/* Header Section - 100vh */}
        <section className="w-full min-h-screen flex flex-col justify-center snap-start px-6 md:px-12 lg:px-20 pt-24 pb-12 md:py-16 lg:py-20 xl:py-24 max-w-[1600px] mx-auto relative">
          <div className="w-full">
            <h1 className="text-white/60 font-[n27] text-3xl md:text-4xl lg:text-5xl leading-[0.8] tracking-tighter mb-8 uppercase">
              [data sources]
            </h1>
            <div className="w-full h-px bg-white/20 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-6">
                <p className="font-light font-[geistMono] text-lg md:text-xl lg:text-2xl text-white/80 leading-relaxed">
                  Precision data aggregated from world-leading conflict
                  monitoring organizations to provide granular situational
                  awareness.
                </p>
                <div className="mt-12 text-white/30 hidden md:block">
                  <span className="font-[geistMono] text-[10px] uppercase tracking-widest">
                    Scroll to Explore
                  </span>
                  <div className="h-12 w-px bg-white/20 mt-2 mx-auto md:mx-0 ml-4" />
                </div>
              </div>
              <div className="md:col-span-6 flex justify-end items-end h-full">
                <Link href="/">
                  <BoldCornerButton className="h-12 text-sm">
                    Return to Home
                  </BoldCornerButton>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* UCDP SECTION - 100vh */}
        <section className="w-full min-h-screen flex flex-col justify-start pt-24 lg:justify-center lg:pt-0 lg:items-center snap-start bg-black relative border-t border-white/10 group overflow-hidden">
          <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 pb-12 pt-4 md:py-16 lg:py-20 xl:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-24">
              {/* Left: Identity */}
              <div className="lg:col-span-4 flex flex-col justify-center lg:justify-between lg:h-[60vh]">
                <div>
                  <h2 className="font-[n27] text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-purple-400 mb-6 leading-none">
                    UCDP
                  </h2>
                  <span className="font-[geistMono] text-[10px] uppercase border border-white/20 px-3 py-1.5 text-white/50 tracking-wider">
                    Academic / Research
                  </span>
                </div>
                <div className="hidden lg:block mt-auto">
                  <div className="w-12 h-1 bg-purple-500/50 mb-4" />
                  <span className="font-[geistMono] text-xs text-purple-400 uppercase tracking-widest">
                    Global Standard
                  </span>
                </div>
              </div>

              {/* Right: Content */}
              <div className="lg:col-span-8 space-y-12 flex flex-col justify-center">
                <div className="space-y-8">
                  <h3 className="text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-[n27] text-white font-light">
                    Uppsala Conflict Data Program
                  </h3>
                  <p className="font-[geistMono] text-white/60 leading-relaxed text-sm md:text-base lg:text-lg max-w-4xl">
                    The UCDP is the world’s main provider of data on organized
                    violence and the oldest ongoing data collection project for
                    civil war, with a history of almost 40 years. Its definition
                    of armed conflict has become the global standard of how
                    conflicts are systematically defined and studied.
                  </p>
                  <p className="font-[geistMono] text-white/60 leading-relaxed text-sm md:text-base lg:text-lg max-w-4xl">
                    Data is collected continuously and updated annually,
                    covering state-based armed conflict, non-state conflict, and
                    one-sided violence.
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-white/10 pt-12">
                  <div>
                    <span className="block text-[#ff9a65] font-[geistMono] text-[10px] uppercase mb-2 tracking-widest">
                      Coverage
                    </span>
                    <span className="font-[geistMono] text-lg md:text-xl lg:text-2xl">
                      Global
                    </span>
                    <span className="block text-white/30 text-xs mt-1">
                      1997-Present
                    </span>
                  </div>
                  <div>
                    <span className="block text-[#ff9a65] font-[geistMono] text-[10px] uppercase mb-2 tracking-widest">
                      Update Cycle
                    </span>
                    <span className="font-[geistMono] text-lg md:text-xl lg:text-2xl">
                      Annual
                    </span>
                    <span className="block text-white/30 text-xs mt-1">
                      Monthly Prelim
                    </span>
                  </div>
                  <div>
                    <span className="block text-[#ff9a65] font-[geistMono] text-[10px] uppercase mb-2 tracking-widest">
                      Type
                    </span>
                    <span className="font-[geistMono] text-lg md:text-xl lg:text-2xl">
                      Casualty
                    </span>
                    <span className="block text-white/30 text-xs mt-1">
                      Verified Counts
                    </span>
                  </div>
                  <div>
                    <span className="block text-[#ff9a65] font-[geistMono] text-[10px] uppercase mb-2 tracking-widest">
                      Methodology
                    </span>
                    <span className="font-[geistMono] text-lg md:text-xl lg:text-2xl">
                      Academic
                    </span>
                    <span className="block text-white/30 text-xs mt-1">
                      Peer Reviewed
                    </span>
                  </div>
                </div>

                <div className="pt-8">
                  <Link
                    href="https://ucdp.uu.se/"
                    target="_blank"
                    className="inline-flex items-center gap-3 text-base md:text-lg lg:text-xl font-[geistMono] uppercase tracking-widest hover:text-[#ff9a65] transition-colors group/link"
                  >
                    Access Database{" "}
                    <span className="group-hover/link:translate-x-2 transition-transform duration-300">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ACLED SECTION - 100vh */}
        <section className="w-full min-h-screen flex items-center snap-start bg-black relative border-t border-white/10 group overflow-hidden">
          <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 lg:py-20 xl:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-24">
              {/* Left: Identity */}
              <div className="lg:col-span-4 flex flex-col justify-center lg:justify-between lg:h-[60vh]">
                <div>
                  <h2 className="font-[n27] text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-blue-400 mb-6 leading-none">
                    ACLED
                  </h2>
                  <span className="font-[geistMono] text-[10px] uppercase border border-white/20 px-3 py-1.5 text-white/50 tracking-wider">
                    Non-Profit / NGO
                  </span>
                </div>
                <div className="hidden lg:block mt-auto">
                  <div className="w-12 h-1 bg-blue-500/50 mb-4" />
                  <span className="font-[geistMono] text-xs text-blue-400 uppercase tracking-widest">
                    Real-time Mapping
                  </span>
                </div>
              </div>

              {/* Right: Content */}
              <div className="lg:col-span-8 space-y-12 flex flex-col justify-center">
                <div className="space-y-8">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-[n27] text-white font-light">
                    Armed Conflict Location & Event Data
                  </h3>
                  <p className="font-[geistMono] text-white/60 leading-relaxed text-sm md:text-base lg:text-lg max-w-4xl">
                    ACLED is a disaggregated data collection, analysis, and
                    crisis mapping project. It collects information on the
                    dates, actors, locations, fatalities, and types of all
                    reported political violence and protest events around the
                    world.
                  </p>
                  <p className="font-[geistMono] text-white/60 leading-relaxed text-sm md:text-base lg:text-lg max-w-4xl">
                    The project focuses on granular, event-level data, allowing
                    for deeper analysis of conflict dynamics, pattern
                    recognition, and trend forecasting than aggregated
                    statistics allow.
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-white/10 pt-12">
                  <div>
                    <span className="block text-[#ff9a65] font-[geistMono] text-[10px] uppercase mb-2 tracking-widest">
                      Focus
                    </span>
                    <span className="font-[geistMono] text-lg md:text-xl lg:text-2xl">
                      Granularity
                    </span>
                    <span className="block text-white/30 text-xs mt-1">
                      Event-Level
                    </span>
                  </div>
                  <div>
                    <span className="block text-[#ff9a65] font-[geistMono] text-[10px] uppercase mb-2 tracking-widest">
                      Update Cycle
                    </span>
                    <span className="font-[geistMono] text-lg md:text-xl lg:text-2xl">
                      Weekly
                    </span>
                    <span className="block text-white/30 text-xs mt-1">
                      Real-time
                    </span>
                  </div>
                  <div>
                    <span className="block text-[#ff9a65] font-[geistMono] text-[10px] uppercase mb-2 tracking-widest">
                      Scope
                    </span>
                    <span className="font-[geistMono] text-lg md:text-xl lg:text-2xl">
                      Global
                    </span>
                    <span className="block text-white/30 text-xs mt-1">
                      All Regions
                    </span>
                  </div>
                  <div>
                    <span className="block text-[#ff9a65] font-[geistMono] text-[10px] uppercase mb-2 tracking-widest">
                      Access
                    </span>
                    <span className="font-[geistMono] text-lg md:text-xl lg:text-2xl">
                      Open Source
                    </span>
                    <span className="block text-white/30 text-xs mt-1">
                      Public API
                    </span>
                  </div>
                </div>

                <div className="pt-8">
                  <Link
                    href="https://acleddata.com/"
                    target="_blank"
                    className="inline-flex items-center gap-3 text-base md:text-lg lg:text-xl font-[geistMono] uppercase tracking-widest hover:text-[#ff9a65] transition-colors group/link"
                  >
                    Access ACLED Data{" "}
                    <span className="group-hover/link:translate-x-2 transition-transform duration-300">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AWSD SECTION - 100vh */}
        <section className="w-full min-h-screen flex items-center snap-start bg-black relative border-t border-white/10 group overflow-hidden">
          <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 lg:py-20 xl:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-24">
              {/* Left: Identity */}
              <div className="lg:col-span-4 flex flex-col justify-center lg:justify-between lg:h-[60vh]">
                <div>
                  <h2 className="font-[n27] text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-yellow-500 mb-6 leading-none">
                    AWSD
                  </h2>
                  <span className="font-[geistMono] text-[10px] uppercase border border-white/20 px-3 py-1.5 text-white/50 tracking-wider">
                    Aid Worker Security Database
                  </span>
                </div>
                <div className="hidden lg:block mt-auto">
                  <div className="w-12 h-1 bg-yellow-500/50 mb-4" />
                  <span className="font-[geistMono] text-xs text-yellow-500 uppercase tracking-widest">
                    Ground Truth
                  </span>
                </div>
              </div>

              {/* Right: Content */}
              <div className="lg:col-span-8 space-y-12 flex flex-col justify-center">
                <div className="space-y-8">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-[n27] text-white font-light">
                    Global Security Incident Tracking
                  </h3>
                  <p className="font-[geistMono] text-white/60 leading-relaxed text-sm md:text-base lg:text-lg max-w-4xl">
                    The AWSD is the authoritative global source for data on
                    major security incidents affecting aid workers. It records
                    deliberate acts of violence, including killings,
                    kidnappings, and serious injuries, providing a critical
                    evidence base for the humanitarian community.
                  </p>
                  <p className="font-[geistMono] text-white/60 leading-relaxed text-sm md:text-base lg:text-lg max-w-4xl">
                    By tracking these incidents, AWSD enables organizations to
                    analyze the evolving security landscape, identify trends in
                    violence, and develop better strategies to protect aid
                    workers in conflict zones.
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-white/10 pt-12">
                  <div>
                    <span className="block text-[#ff9a65] font-[geistMono] text-[10px] uppercase mb-2 tracking-widest">
                      Coverage
                    </span>
                    <span className="font-[geistMono] text-lg md:text-xl lg:text-2xl">
                      Global
                    </span>
                    <span className="block text-white/30 text-xs mt-1">
                      Order of Operations
                    </span>
                  </div>
                  <div>
                    <span className="block text-[#ff9a65] font-[geistMono] text-[10px] uppercase mb-2 tracking-widest">
                      Focus
                    </span>
                    <span className="font-[geistMono] text-lg md:text-xl lg:text-2xl">
                      Major Violence
                    </span>
                    <span className="block text-white/30 text-xs mt-1">
                      Lethal & Kidnapping
                    </span>
                  </div>
                  <div>
                    <span className="block text-[#ff9a65] font-[geistMono] text-[10px] uppercase mb-2 tracking-widest">
                      Latency
                    </span>
                    <span className="font-[geistMono] text-lg md:text-xl lg:text-2xl">
                      Continuous
                    </span>
                    <span className="block text-white/30 text-xs mt-1">
                      Ongoing Updates
                    </span>
                  </div>
                  <div>
                    <span className="block text-[#ff9a65] font-[geistMono] text-[10px] uppercase mb-2 tracking-widest">
                      Status
                    </span>
                    <span className="font-[geistMono] text-lg md:text-xl lg:text-2xl">
                      Public
                    </span>
                    <span className="block text-white/30 text-xs mt-1">
                      Open Access
                    </span>
                  </div>
                </div>

                <div className="pt-8">
                  <Link
                    href="https://aidworkersecurity.org/"
                    target="_blank"
                    className="inline-flex items-center gap-3 text-base md:text-lg lg:text-xl font-[geistMono] uppercase tracking-widest hover:text-[#ff9a65] transition-colors group/link"
                  >
                    Access AWSD Data{" "}
                    <span className="group-hover/link:translate-x-2 transition-transform duration-300">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* REST COUNTRIES SECTION - 100vh */}
        <section className="w-full min-h-screen flex items-center snap-start bg-black relative border-t border-white/10 group overflow-hidden">
          <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 lg:py-20 xl:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-24">
              {/* Left: Identity */}
              <div className="lg:col-span-4 flex flex-col justify-center lg:justify-between lg:h-[60vh]">
                <div>
                  <h2 className="font-[n27] text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-emerald-400 mb-6 leading-none wrap-break-word">
                    REST
                    <br />
                    COUNTRIES
                  </h2>
                  <span className="font-[geistMono] text-[10px] uppercase border border-white/20 px-3 py-1.5 text-white/50 tracking-wider">
                    JSON API / Open Source
                  </span>
                </div>
                <div className="hidden lg:block mt-auto">
                  <div className="w-12 h-1 bg-emerald-500/50 mb-4" />
                  <span className="font-[geistMono] text-xs text-emerald-400 uppercase tracking-widest">
                    Geospatial Reference
                  </span>
                </div>
              </div>

              {/* Right: Content */}
              <div className="lg:col-span-8 space-y-12 flex flex-col justify-center">
                <div className="space-y-8">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-[n27] text-white font-light">
                    Rest Countries API
                  </h3>
                  <p className="font-[geistMono] text-white/60 leading-relaxed text-sm md:text-base lg:text-lg max-w-4xl">
                    Rest Countries provides a comprehensive JSON API for
                    currency, language, calling code, and capital city data for
                    all countries. We use this as a foundational reference layer
                    to enrich conflict data with standardized geopolitical
                    metadata.
                  </p>
                  <p className="font-[geistMono] text-white/60 leading-relaxed text-sm md:text-base lg:text-lg max-w-4xl">
                    By integrating this static reference data, we ensure
                    consistent normalization of country names, codes, and
                    regional classifications across all incoming data streams.
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-white/10 pt-12">
                  <div>
                    <span className="block text-[#ff9a65] font-[geistMono] text-[10px] uppercase mb-2 tracking-widest">
                      Focus
                    </span>
                    <span className="font-[geistMono] text-lg md:text-xl lg:text-2xl">
                      Metadata
                    </span>
                    <span className="block text-white/30 text-xs mt-1">
                      Geopolitical
                    </span>
                  </div>
                  <div>
                    <span className="block text-[#ff9a65] font-[geistMono] text-[10px] uppercase mb-2 tracking-widest">
                      Update Cycle
                    </span>
                    <span className="font-[geistMono] text-lg md:text-xl lg:text-2xl">
                      Stable
                    </span>
                    <span className="block text-white/30 text-xs mt-1">
                      Reference Data
                    </span>
                  </div>
                  <div>
                    <span className="block text-[#ff9a65] font-[geistMono] text-[10px] uppercase mb-2 tracking-widest">
                      Scope
                    </span>
                    <span className="font-[geistMono] text-lg md:text-xl lg:text-2xl">
                      Global
                    </span>
                    <span className="block text-white/30 text-xs mt-1">
                      All Nations
                    </span>
                  </div>
                  <div>
                    <span className="block text-[#ff9a65] font-[geistMono] text-[10px] uppercase mb-2 tracking-widest">
                      Access
                    </span>
                    <span className="font-[geistMono] text-lg md:text-xl lg:text-2xl">
                      Public API
                    </span>
                    <span className="block text-white/30 text-xs mt-1">
                      Open Source
                    </span>
                  </div>
                </div>

                <div className="pt-8">
                  <Link
                    href="https://restcountries.com/"
                    target="_blank"
                    className="inline-flex items-center gap-3 text-base md:text-lg lg:text-xl font-[geistMono] uppercase tracking-widest hover:text-[#ff9a65] transition-colors group/link"
                  >
                    Access API Docs{" "}
                    <span className="group-hover/link:translate-x-2 transition-transform duration-300">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Credits Footer */}
        <section className="w-full bg-black border-t border-white/10 px-6 py-12 relative snap-start">
          <div className="max-w-[1600px] mx-auto w-full text-center">
            <p className="font-[geistMono] text-[10px] text-white/30 uppercase tracking-widest mb-4">
              Video Credits (Pexels)
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-2 text-left max-w-4xl mx-auto">
              <a
                href="https://www.pexels.com/de-de/video/frau-manner-polizei-sprechen-10464571/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-[geistMono] text-[9px] text-white/20 hover:text-white/50 transition-colors block truncate"
              >
                cottonbro studio: Police Speaking
              </a>
              <a
                href="https://www.pexels.com/de-de/video/4k-luftaufnahme-einer-stadtischen-zerstorungsstatte-33421811/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-[geistMono] text-[9px] text-white/20 hover:text-white/50 transition-colors block truncate"
              >
                Keysi Estrada: Urban Destruction
              </a>
              <a
                href="https://www.pexels.com/de-de/video/hande-festhalten-bewaffnung-uniformen-13625853/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-[geistMono] text-[9px] text-white/20 hover:text-white/50 transition-colors block truncate"
              >
                Артем Ковальчук: Armed Uniforms
              </a>
              <a
                href="https://www.pexels.com/de-de/video/18549846/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-[geistMono] text-[9px] text-white/20 hover:text-white/50 transition-colors block truncate"
              >
                utopia 36: Scene 18549846
              </a>
              <a
                href="https://www.pexels.com/de-de/video/mann-dreckig-gebaude-essen-4882639/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-[geistMono] text-[9px] text-white/20 hover:text-white/50 transition-colors block truncate"
              >
                cottonbro studio: Man in Ruins
              </a>
              <a
                href="https://www.pexels.com/de-de/video/menschen-strasse-gebaude-schild-5286279/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-[geistMono] text-[9px] text-white/20 hover:text-white/50 transition-colors block truncate"
              >
                Joseph Eulo: People Street
              </a>
              <a
                href="https://www.pexels.com/de-de/video/soldaten-die-live-munitionstraining-machen-854281/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-[geistMono] text-[9px] text-white/20 hover:text-white/50 transition-colors block truncate"
              >
                Pixabay: Ammo Training
              </a>
              <a
                href="https://www.pexels.com/de-de/video/soldaten-patrouillieren-mit-gewehren-im-wald-34634811/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-[geistMono] text-[9px] text-white/20 hover:text-white/50 transition-colors block truncate"
              >
                Matias Luge: Forest Patrol
              </a>
            </div>
          </div>
        </section>
      </main>

      <ScrollToTopButton containerRef={mainRef} />
    </div>
  );
}
