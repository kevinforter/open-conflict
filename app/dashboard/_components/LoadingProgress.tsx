import React, { useEffect, useState } from "react";
import { geistMono } from "@/app/fonts/fonts";

const LoadingProgress = () => {
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  // Simulated progressive loading effect
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 10;
      });
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#000112]">
      <div className="flex flex-col items-center gap-4">
        <span
          className={`text-[#ff9a65] text-sm tracking-widest uppercase animate-pulse ${geistMono.className}`}
        >
          Initializing Globe... {Math.round(progress)}%
        </span>
        {/* Customized Progress Bar using standard HTML/CSS to avoid dependency issues */}
        <div
          className="relative overflow-hidden bg-white/10 rounded-full w-[300px] h-[2px]"
          style={{ translate: "translateZ(0)" }}
        >
          <div
            className="bg-[#ff9a65] w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
            style={{ transform: `translateX(-${100 - progress}%)` }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingProgress;
