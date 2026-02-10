"use client";

import Link from "next/link";
import { useRef } from "react";
import BoldCornerButton from "@/components/BoldCornerButton";
import Noise from "@/components/Noise";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default function AboutPage() {
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
              [about project]
            </h1>
            <div className="w-full h-px bg-white/20 mb-12" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
              <div className="lg:col-span-8">
                <h2 className="font-[n27] text-5xl md:text-8xl leading-[0.85] tracking-tighter mb-8">
                  VISUALIZING
                  <br />
                  THE INVISIBLE
                </h2>
                <p className="font-[family-name:var(--font-geist-mono)] text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl font-light">
                  The Open Data Analysis platform aggregates fragmented conflict
                  data into a unified, real-time operating picture for
                  humanitarian awareness.
                </p>
              </div>
              <div className="lg:col-span-4 flex justify-start lg:justify-end">
                <Link href="/">
                  <BoldCornerButton className="h-12 text-sm">
                    Return Home
                  </BoldCornerButton>
                </Link>
              </div>
            </div>

            <div className="mt-24 text-white/30 hidden md:block">
              <span className="font-mono text-[10px] uppercase tracking-widest">
                Scroll to Explore
              </span>
              <div className="h-12 w-px bg-white/20 mt-2 ml-4" />
            </div>
          </div>
        </section>

        {/* General Idea Section */}
        <section className="w-full min-h-screen flex items-center snap-start bg-black relative border-t border-white/10 overflow-hidden">
          <div className="w-full max-w-[1600px] mx-auto px-6 md:px-20 py-20 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
              <div className="lg:col-span-5">
                <span className="block text-[#ff9a65] font-mono text-xs uppercase tracking-widest mb-4">
                  The Vision
                </span>
                <h2 className="font-[n27] text-4xl md:text-6xl text-white mb-6">
                  GENERAL IDEA &<br />
                  GOAL OF THE PROJECT
                </h2>
              </div>

              <div className="lg:col-span-7 space-y-8">
                <p className="font-[family-name:var(--font-geist-mono)] text-white/70 leading-relaxed text-base md:text-lg">
                  The project aims to create a{" "}
                  <strong className="text-white">data-driven platform</strong>{" "}
                  for visualizing and analyzing global conflicts and
                  humanitarian incidents. By integrating datasets such as{" "}
                  <strong className="text-white">UCDP</strong>,{" "}
                  <strong className="text-white">ACLED</strong>, and{" "}
                  <strong className="text-white">AWSD</strong>, it combines
                  historical research data with real-time event streams to
                  provide a comprehensive view of global developments.
                </p>
                <p className="font-[family-name:var(--font-geist-mono)] text-white/70 leading-relaxed text-base md:text-lg">
                  The platform’s goal is to make complex conflict data
                  accessible and understandable through an interactive map and
                  dashboard. Users can explore events over time and space,
                  identify patterns, and filter by event types or regions.
                </p>
                <p className="font-[family-name:var(--font-geist-mono)] text-white/70 leading-relaxed text-base md:text-lg">
                  Ultimately, the project seeks to improve transparency, support
                  research, and bridge the gap between academic data and live
                  information. It also should bring more insights to the
                  previous and ongoing conflicts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Classifying Armed Conflicts Section */}
        <section className="w-full min-h-screen flex items-center snap-start bg-black relative border-t border-white/10 overflow-hidden">
          <div className="w-full max-w-[1600px] mx-auto px-6 md:px-20 py-20 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
              <div className="lg:col-span-5">
                <span className="block text-[#ff9a65] font-mono text-xs uppercase tracking-widest mb-4">
                  CLASSIFYING ARMED CONFLICTS
                </span>
                <h2 className="font-[n27] text-4xl md:text-6xl text-white mb-6">
                  WHAT IS AN
                  <br />
                  ARMED CONFLICT?
                </h2>
              </div>

              <div className="lg:col-span-7 space-y-8">
                <blockquote className="border-l-2 border-[#ff9a65] pl-6 py-2">
                  <p className="font-[family-name:var(--font-geist-mono)] text-white/70 leading-relaxed text-base md:text-lg italic">
                    "An armed conflict is said to exist when there is an armed
                    confrontation between the armed forces of States
                    (international armed conflict), or between governmental
                    authorities and organised armed groups or between such
                    groups within a State (non-international armed conflict).
                    Other situations of violence, such as internal disturbances
                    and tensions are not considered to be armed conflicts."
                  </p>
                  <footer className="mt-4 font-mono text-xs text-white/40 uppercase tracking-widest">
                    — International Committee of the Red Cross (ICRC)
                  </footer>
                </blockquote>

                <div>
                  <Link
                    href="https://www.europarl.europa.eu/RegData/etudes/ATAG/2023/757582/EPRS_ATA(2023)757582_EN.pdf"
                    target="_blank"
                    className="inline-flex items-center gap-2 font-mono text-xs text-white/40 hover:text-[#ff9a65] transition-colors group"
                  >
                    <span>Source: European Parliament</span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Temporal Scope Section */}
        <section className="w-full min-h-screen flex items-center snap-start bg-black relative border-t border-white/10 overflow-hidden">
          <div className="w-full max-w-[1600px] mx-auto px-6 md:px-20 py-20 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
              <div className="lg:col-span-5">
                <span className="block text-[#ff9a65] font-mono text-xs uppercase tracking-widest mb-4">
                  TEMPORAL SCOPE
                </span>
                <h2 className="font-[n27] text-4xl md:text-6xl text-white mb-6">
                  WHAT TIME PERIOD
                  <br />
                  DO WE COVER?
                </h2>
              </div>

              <div className="lg:col-span-7 space-y-8">
                <div className="flex flex-col gap-6">
                  <p className="font-[family-name:var(--font-geist-mono)] text-white/70 leading-relaxed text-base md:text-lg">
                    Our platform aggregates data spanning from{" "}
                    <strong className="text-white">
                      1997 to the present day
                    </strong>
                    . This starting point aligns all tracked datasets with the{" "}
                    <strong className="text-white">
                      Aid Worker Security Database (AWSD)
                    </strong>{" "}
                    availability to ensure consistent cross-referencing and
                    valid multi-source analysis.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <div className="border border-white/10 bg-white/5 p-6 rounded-lg">
                      <span className="block text-[#ff9a65] font-mono text-xs uppercase tracking-widest mb-2">
                        Historical Context
                      </span>
                      <div className="text-3xl font-[n27] text-white mb-1">
                        1997–Present
                      </div>
                      <p className="text-sm text-white/50 font-mono">
                        UCDP State-based, Non-state Conflict and One-Sided
                        Violence
                      </p>
                    </div>
                    <div className="border border-white/10 bg-white/5 p-6 rounded-lg">
                      <span className="block text-[#ff9a65] font-mono text-xs uppercase tracking-widest mb-2">
                        Real-time Analysis
                      </span>
                      <div className="text-3xl font-[n27] text-white mb-1">
                        Live Feed
                      </div>
                      <p className="text-sm text-white/50 font-mono">
                        ACLED & AWSD Weekly Updates
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Solution Section */}
        <section className="w-full min-h-screen flex items-center snap-start bg-black relative border-t border-white/10 overflow-hidden">
          <div className="w-full max-w-[1600px] mx-auto px-6 md:px-20 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
              <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-between h-full space-y-12">
                <div className="space-y-6">
                  <p className="font-[family-name:var(--font-geist-mono)] text-white/60 leading-relaxed text-lg">
                    Our platform leverages modern web technologies to process
                    thousands of event records in real-time. By combining the
                    academic rigor of UCDP with the comprehensive tracking of
                    ACLED, we provide a holistic view of global instability.
                  </p>
                  <ul className="space-y-4 font-mono text-sm text-white/80">
                    <li className="flex items-center gap-4">
                      <span className="w-1.5 h-1.5 bg-[#ff9a65]" />
                      <span>Real-time Geospatial Mapping</span>
                    </li>
                    <li className="flex items-center gap-4">
                      <span className="w-1.5 h-1.5 bg-[#ff9a65]" />
                      <span>Temporal Trend Analysis</span>
                    </li>
                    <li className="flex items-center gap-4">
                      <span className="w-1.5 h-1.5 bg-[#ff9a65]" />
                      <span>Multi-Source Corroboration</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-8">
                  <Link href="/dashboard">
                    <BoldCornerButton className="h-12">
                      Launch Dashboard
                    </BoldCornerButton>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7 order-1 lg:order-2 text-right">
                <span className="block text-[#ff9a65] font-mono text-xs uppercase tracking-widest mb-4">
                  The Solution
                </span>
                <h2 className="font-[n27] text-5xl md:text-8xl text-white mb-6 leading-[0.85]">
                  INTELLIGENT
                  <br />
                  INSIGHT
                </h2>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="w-full min-h-screen flex items-center snap-start bg-black relative border-t border-white/10 overflow-hidden">
          <div className="w-full max-w-[1600px] mx-auto px-6 md:px-20 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
              <div className="lg:col-span-5 flex flex-col justify-center space-y-8">
                <span className="block text-[#ff9a65] font-mono text-xs uppercase tracking-widest mb-1">
                  The Impact
                </span>
                <h2 className="font-[n27] text-5xl md:text-7xl text-white mb-6 leading-none">
                  VALUE FOR
                  <br />
                  SOCIETY &<br />
                  EXPERTS
                </h2>
              </div>

              <div className="lg:col-span-7 flex flex-col justify-center space-y-12">
                {/* Point 1 */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-[#ff9a65] font-mono text-xl">01</span>
                    <h3 className="font-[n27] text-2xl md:text-3xl text-white">
                      Transparency & Overview
                    </h3>
                  </div>
                  <ul className="space-y-4 pl-10 border-l border-white/10 ml-2">
                    <li className="font-[family-name:var(--font-geist-mono)] text-white/60 text-lg leading-relaxed">
                      Complex event data (violence, protests, humanitarian
                      incidents) is made{" "}
                      <strong className="text-white">
                        visually comprehensible
                      </strong>
                      .
                    </li>
                    <li className="font-[family-name:var(--font-geist-mono)] text-white/60 text-lg leading-relaxed">
                      Users can identify{" "}
                      <strong className="text-white">spatial patterns</strong>,
                      trends, and hotspots such as escalations, emerging
                      conflict zones, or stabilization areas and conflict
                      indexes.
                    </li>
                  </ul>
                </div>

                {/* Point 2 */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-[#ff9a65] font-mono text-xl">02</span>
                    <h3 className="font-[n27] text-2xl md:text-3xl text-white">
                      Bridging Research & Real-Time
                    </h3>
                  </div>
                  <ul className="space-y-4 pl-10 border-l border-white/10 ml-2">
                    <li className="font-[family-name:var(--font-geist-mono)] text-white/60 text-lg leading-relaxed">
                      Academic datasets (UCDP) provide{" "}
                      <strong className="text-white">
                        verified historical depth
                      </strong>
                      , while current data (ACLED) add{" "}
                      <strong className="text-white">
                        current developments
                      </strong>
                      .
                    </li>
                    <li className="font-[family-name:var(--font-geist-mono)] text-white/60 text-lg leading-relaxed">
                      This creates a{" "}
                      <strong className="text-white">
                        bridge between long-term research and real-time OSINT
                      </strong>
                      .
                    </li>
                  </ul>
                </div>

                {/* Point 3 */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-[#ff9a65] font-mono text-xl">03</span>
                    <h3 className="font-[n27] text-2xl md:text-3xl text-white">
                      Use Cases & Application
                    </h3>
                  </div>
                  <ul className="space-y-4 pl-10 border-l border-white/10 ml-2">
                    <li className="font-[family-name:var(--font-geist-mono)] text-white/60 text-lg leading-relaxed">
                      <strong className="text-white">
                        Humanitarian Operations:
                      </strong>{" "}
                      Planning safer aid corridors and risk assessment for field
                      teams.
                    </li>
                    <li className="font-[family-name:var(--font-geist-mono)] text-white/60 text-lg leading-relaxed">
                      <strong className="text-white">Policy Making:</strong>{" "}
                      Data-driven decision support for regional stability and
                      resource allocation.
                    </li>
                    <li className="font-[family-name:var(--font-geist-mono)] text-white/60 text-lg leading-relaxed">
                      <strong className="text-white">
                        Journalism & Research:
                      </strong>{" "}
                      Validating reports with cross-referenced multi-source
                      baselines.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <section className="w-full flex flex-col justify-center snap-start bg-black border-t border-white/10 px-6 py-20 relative">
          <div className="max-w-[1600px] mx-auto w-full text-center">
            <h2 className="font-[n27] text-4xl md:text-6xl text-white mb-8">
              READY TO EXPLORE?
            </h2>
            <div className="flex justify-center gap-6">
              <Link href="/">
                <BoldCornerButton className="h-12">
                  Return Home
                </BoldCornerButton>
              </Link>

              <Link href="/dashboard">
                <div className={`group relative inline-flex h-12`}>
                  {/* Bold Corners on Wrapper - Animate Position instead of Padding */}
                  <span className="absolute -top-0.25 -left-0.25 w-1.5 h-1.5 border-t border-l border-[#ff9a65] transition-all group-hover:top-0 group-hover:left-0 group-hover:border-[#ff9a65]/0" />
                  <span className="absolute -top-0.25 -right-0.25 w-1.5 h-1.5 border-t border-r border-[#ff9a65] transition-all group-hover:top-0 group-hover:right-0 group-hover:border-[#ff9a65]/0" />
                  <span className="absolute -bottom-0.25 -left-0.25 w-1.5 h-1.5 border-b border-l border-[#ff9a65] transition-all group-hover:bottom-0 group-hover:left-0 group-hover:border-[#ff9a65]/0" />
                  <span className="absolute -bottom-0.25 -right-0.25 w-1.5 h-1.5 border-b border-r border-[#ff9a65] transition-all group-hover:bottom-0 group-hover:right-0 group-hover:border-[#ff9a65]/0" />

                  <button className="relative px-8 py-2 border bg-[#ff9a65]/10 border-[#ff9a65] text-white text-sm font-[n27] uppercase tracking-[0.15em] hover:bg-[#ff9a65] transition-colors cursor-pointer z-10">
                    Open Dashboard
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
