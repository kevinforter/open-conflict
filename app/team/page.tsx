"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import BoldCornerButton from "@/components/BoldCornerButton";
import Noise from "@/components/Noise";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import Ming from "@/public/team/Ming.jpeg";
import Kevin from "@/public/team/Kevin.jpeg";
import Luca from "@/public/team/Luca.jpeg";
import { n27, geistMono } from "@/app/fonts/fonts";

export default function TeamPage() {
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
              [the team]
            </h1>
            <div className="w-full h-px bg-white/20 mb-12" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-24 items-center">
              <div className="lg:col-span-8">
                <h2
                  className={`${n27.className} text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.85] tracking-tighter mb-8`}
                >
                  ACADEMIC
                  <br />
                  PROJECT
                </h2>
                <p
                  className={`${geistMono.className} text-lg md:text-xl lg:text-2xl text-white/80 leading-relaxed max-w-2xl font-light`}
                >
                  A collaborative effort by three students leveraging Open Data
                  to visualize and decode the complexity of global conflict.
                  Built as a term project to demonstrate the power of public
                  information.
                </p>
              </div>
              <div className="lg:col-span-4 flex justify-start lg:justify-end w-full">
                <Link href="/" className="w-full sm:w-auto">
                  <BoldCornerButton className="h-12 text-sm w-full sm:w-auto max-w-full">
                    Return Home
                  </BoldCornerButton>
                </Link>
              </div>
            </div>

            <div className="mt-24 text-white/30 hidden md:block">
              <span
                className={`${geistMono.className} text-[10px] uppercase tracking-widest`}
              >
                Meet the Students
              </span>
              <div className="h-12 w-px bg-white/20 mt-2 ml-4" />
            </div>
          </div>
        </section>

        {/* Team Grid Section */}
        <section className="w-full min-h-screen flex items-center snap-start bg-black relative border-t border-white/10 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-blue-900/5 to-transparent pointer-events-none" />

          <div className="w-full max-w-[1600px] mx-auto px-6 md:px-20 py-20 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Kevin Forter */}
              <div className="group relative border border-white/10 bg-white/5 p-6 md:p-8 transition-colors duration-500">
                <div className="aspect-square bg-white/5 mb-6 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-500">
                  <Image
                    src={Kevin}
                    alt="Kevin Forter"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3
                  className={`${n27.className} text-2xl mb-1 transition-colors`}
                >
                  Kevin Forter
                </h3>
                <p
                  className={`${geistMono.className} text-xs uppercase tracking-widest text-white/50 mb-4`}
                >
                  Informatik / Computer Science
                </p>
              </div>

              {/* Luca Bachmann */}
              <div className="group relative border border-white/10 bg-white/5 p-6 md:p-8 transition-colors duration-500">
                <div className="aspect-square bg-white/5 mb-6 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-500">
                  <Image
                    src={Luca}
                    alt="Luca Bachmann"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3
                  className={`${n27.className} text-2xl mb-1 transition-colors`}
                >
                  Luca Bachmann
                </h3>
                <p
                  className={`${geistMono.className} text-xs uppercase tracking-widest text-white/50 mb-4 break-all`}
                >
                  Wirtschaftsinformatik
                </p>
              </div>

              {/* Xuan Ming Feng */}
              <div className="group relative border border-white/10 bg-white/5 p-6 md:p-8 transition-colors duration-500">
                <div className="aspect-square bg-white/5 mb-6 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-500">
                  <Image
                    src={Ming}
                    alt="Xuan Ming Feng"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3
                  className={`${n27.className} text-2xl mb-1 transition-colors`}
                >
                  Xuan Ming Feng
                </h3>
                <p
                  className={`${geistMono.className} text-xs uppercase tracking-widest text-white/50 mb-4`}
                >
                  Biomedical Engineering
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Join Us / Footer Section */}
        <section className="w-full min-h-screen flex flex-col justify-center snap-start bg-black border-t border-white/10 relative overflow-hidden">
          <div className="w-full max-w-[1600px] mx-auto px-6 md:px-20 py-20 relative z-10 text-center">
            <span
              className={`${geistMono.className} block text-white/40 text-xs uppercase tracking-widest mb-6`}
            >
              Course Project
            </span>
            <h2
              className={`${n27.className} text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-white mb-12 leading-[0.85]`}
            >
              UNIVERSITY
              <br />
              INITIATIVE
            </h2>

            <p
              className={`${geistMono.className} text-white/60 text-base md:text-lg max-w-2xl mx-auto mb-16`}
            >
              This dashboard was developed as a semester project for the Open
              Data Application course, transforming raw public data into
              interactive insights.
            </p>

            <div className="flex flex-col md:flex-row justify-center gap-6">
              <Link href="/">
                <BoldCornerButton className="h-12 w-fit md:w-auto">
                  Return Home
                </BoldCornerButton>
              </Link>

              <Link href="/dashboard">
                <div
                  className={`group relative inline-flex h-12 w-fit md:w-auto justify-center`}
                >
                  {/* Bold Corners on Wrapper */}
                  <span className="absolute -top-0.25 -left-0.25 w-1.5 h-1.5 border-t border-l border-[#ff9a65] transition-all group-hover:top-0 group-hover:left-0 group-hover:border-[#ff9a65]/0" />
                  <span className="absolute -top-0.25 -right-0.25 w-1.5 h-1.5 border-t border-r border-[#ff9a65] transition-all group-hover:top-0 group-hover:right-0 group-hover:border-[#ff9a65]/0" />
                  <span className="absolute -bottom-0.25 -left-0.25 w-1.5 h-1.5 border-b border-l border-[#ff9a65] transition-all group-hover:bottom-0 group-hover:left-0 group-hover:border-[#ff9a65]/0" />
                  <span className="absolute -bottom-0.25 -right-0.25 w-1.5 h-1.5 border-b border-r border-[#ff9a65] transition-all group-hover:bottom-0 group-hover:right-0 group-hover:border-[#ff9a65]/0" />

                  <button
                    className={`relative px-8 py-2 border bg-[#ff9a65]/10 border-[#ff9a65] text-white text-sm ${n27.className} uppercase tracking-[0.15em] hover:bg-[#ff9a65] transition-colors cursor-pointer z-10 w-full md:w-auto`}
                  >
                    Open Dashboard
                  </button>
                </div>
              </Link>
            </div>
          </div>

          {/* Marquee Quote - Running along the bottom */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden py-10 pointer-events-none opacity-100 z-0">
            <style jsx>{`
              @keyframes marquee {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-50%);
                }
              }
              .animate-marquee {
                animation: marquee 30s linear infinite;
              }
            `}</style>
            <div className="flex whitespace-nowrap animate-marquee w-fit">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex items-center text-xs leading-none ${n27.className} text-white/50 uppercase tracking-tighter mr-5`}
                >
                  <span>INFORMATION IS THE RESOLUTION OF UNCERTAINTY</span>
                  <span className="ml-5">&#x258B;</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <ScrollToTopButton containerRef={mainRef} />
    </div>
  );
}
