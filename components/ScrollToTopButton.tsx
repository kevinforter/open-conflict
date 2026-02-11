"use client";

import { useState, useEffect, RefObject } from "react";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { geistMono } from "@/app/fonts/fonts";

interface ScrollToTopButtonProps {
  containerRef: RefObject<HTMLElement | null>;
  threshold?: number;
}

export default function ScrollToTopButton({
  containerRef,
  threshold = 500,
}: ScrollToTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setIsVisible(containerRef.current.scrollTop > threshold);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [containerRef, threshold]);

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div
      className={`fixed bottom-8 right-8 z-50 transition-all duration-500 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}
    >
      <button
        onClick={scrollToTop}
        className="group relative w-12 h-12 flex items-center justify-center bg-black/50 backdrop-blur-md border border-white/20 hover:border-[#ff9a65] hover:bg-[#ff9a65]/10 rounded-full transition-all duration-300"
        aria-label="Scroll to top"
      >
        <ArrowUpIcon className="w-5 h-5 text-white/60 group-hover:text-[#ff9a65] transition-colors" />

        {/* Tooltip on hover */}
        <span
          className={`absolute right-full mr-4 bg-black/80 backdrop-blur border border-white/10 px-3 py-1.5 text-xs ${geistMono.className} text-white/70 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none`}
        >
          RETURN TO TOP
        </span>
      </button>
    </div>
  );
}
