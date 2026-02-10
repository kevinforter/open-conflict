"use client";

import Link from "next/link";
import { useRef } from "react";
import BoldCornerButton from '@/components/BoldCornerButton';
import Noise from "@/components/Noise";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default function ImpressumPage() {
  const mainRef = useRef<HTMLElement>(null);

  return (
    <div className="flex h-screen flex-col overflow-hidden relative bg-black text-white">
      <Noise />
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-[#050510] to-black z-[-1]" />
      
      {/* Content Container */}
      <main ref={mainRef} className="flex-1 overflow-y-auto relative z-10 custom-scrollbar">
        <div className="w-full max-w-[1400px] mx-auto px-6 py-20 md:py-32">
          
          {/* Header Section */}
          <div className="mb-24">
            <h1 className="text-white/60 font-[n27] text-2xl md:text-4xl leading-[0.8] tracking-tighter mb-8 uppercase">
              [Impressum]
            </h1>
            <div className="w-full h-px bg-white/20" />
          </div>

          {/* Main Grid Content */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
            
            {/* Left Column: Context */}
            <div className="md:col-span-4 space-y-8">
              <h2 className="font-[n27] text-3xl md:text-4xl text-[#ff9a65]">
                Legal Disclosure
              </h2>
              <p className="font-light font-[family-name:var(--font-geist-mono)] text-white/60 text-base md:text-lg leading-relaxed">
                Information according to § 5 TMG. This website is a project demonstration and is not a commercially registered entity.
              </p>
              
              <div className="pt-12">
                 <Link href="/">
                    <BoldCornerButton className="h-12 text-sm">Return Home</BoldCornerButton>
                </Link>
              </div>
            </div>

            {/* Right Column: Details Grid */}
            <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
                {/* Operator */}
                <div className="bg-black p-8 md:p-12 space-y-2 group hover:bg-[#0a0a0a] transition-colors">
                    <span className="text-[#ff9a65] font-mono text-xs uppercase tracking-widest block mb-4">Project</span>
                    <p className="font-[n27] text-2xl">Open Data Analysis</p>
                    <p className="font-[family-name:var(--font-geist-mono)] text-white/50 text-sm">Student Initiative</p>
                </div>

                {/* Director */}
                <div className="bg-black p-8 md:p-12 space-y-2 group hover:bg-[#0a0a0a] transition-colors">
                     <span className="text-[#ff9a65] font-mono text-xs uppercase tracking-widest block mb-4">Developed By</span>
                    <p className="font-[n27] text-lg leading-relaxed">
                        Kevin Forter<br/>
                        Luca Bachmann<br/>
                        Xuan Ming Feng
                    </p>
                </div>

                {/* Contact */}
                <div className="bg-black p-8 md:p-12 space-y-2 group hover:bg-[#0a0a0a] transition-colors">
                     <span className="text-[#ff9a65] font-mono text-xs uppercase tracking-widest block mb-4">Contact</span>
                    <p className="font-[n27] text-xl">@technikum-wien.at</p>
                    <p className="font-[family-name:var(--font-geist-mono)] text-white/50 text-sm">Academic Inquiries Only</p>
                </div>

                {/* Address */}
                <div className="bg-black p-8 md:p-12 space-y-2 group hover:bg-[#0a0a0a] transition-colors">
                     <span className="text-[#ff9a65] font-mono text-xs uppercase tracking-widest block mb-4">Location</span>
                    <p className="font-[n27] text-xl leading-relaxed">
                        Vienna<br />
                        Austria
                    </p>
                </div>
            </div>

          </div>
        </div>
      </main>

      <ScrollToTopButton containerRef={mainRef} />
    </div>
  );
}
