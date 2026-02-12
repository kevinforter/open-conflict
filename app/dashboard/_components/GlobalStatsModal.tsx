import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Noise from "@/components/Noise";
import { GlobalStats } from "@/lib/db/selectGlobalStats";
import {
  selectGlobalStatsMonth,
  type GlobalMonthStats,
} from "@/lib/db/selectGlobalStatsMonth";
import TimelineChart from "./charts/TimelineChart";
import { n27, geistMono } from "@/app/fonts/fonts";

interface GlobalStatsModalProps {
  visible: boolean;
  onClose: () => void;
  stats: GlobalStats | null;
  year: number;
}

export function GlobalStatsModal({
  visible,
  onClose,
  stats,
  year,
}: GlobalStatsModalProps) {
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [monthlyStats, setMonthlyStats] = useState<GlobalMonthStats[]>([]);

  useEffect(() => {
    if (visible && year) {
      selectGlobalStatsMonth(year).then(setMonthlyStats);
    }
  }, [visible, year]);

  useEffect(() => {
    if (visible) {
      setIsRendered(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsVisible(true));
      });
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setIsRendered(false), 500);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!isRendered) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-all duration-500 ${
        isVisible
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Modal Content */}
      <div
        className={`relative z-10 w-[95vw] md:w-[80vw] max-w-4xl max-h-[85vh] flex flex-col gap-6 bg-[rgba(5,20,50,0.95)] p-6 md:p-8 text-white shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <Noise
          patternSize={250}
          patternScaleX={1}
          patternScaleY={1}
          patternRefreshInterval={2}
          patternAlpha={15}
        />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h3
            className={`text-2xl xl:text-3xl uppercase tracking-[0.1em] text-white ${n27.className}`}
          >
            Global Statistics [{year}]
          </h3>
          <button
            type="button"
            onClick={onClose}
            className={`cursor-pointer h-8 w-8 shrink-0 flex items-center justify-center p-0 text-xs uppercase tracking-[0.1em] text-white transition bg-white/10 hover:bg-white hover:text-black border border-white/10 ${geistMono.className}`}
          >
            &#x2715;
          </button>
        </div>

        {/* Body */}
        <div
          className={`flex-1 overflow-y-auto custom-scrollbar pr-2 text-white/80 ${geistMono.className} flex flex-col`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Active Conflicts */}
            <div className="bg-white/5 p-6 border border-white/5 relative overflow-hidden">
              <h4
                className={`text-[#ff9a65] text-sm uppercase mb-3 ${geistMono.className}`}
              >
                Total Active Conflicts
              </h4>
              <div className={`text-4xl text-white ${n27.className}`}>
                {stats?.ucdp_active_conflicts?.toLocaleString() ?? "-"}
              </div>
              {stats?.is_forecast && (
                <div
                  className={`absolute top-1 right-1 px-1 py-px bg-[#ff9a65]/20 text-[#ff9a65] text-[9px] ${geistMono.className} border border-[#ff9a65]/30`}
                >
                  PREDICTED
                </div>
              )}
              <div
                className={`text-xs text-white/40 mt-2 ${geistMono.className}`}
              >
                UCDP Recorded
              </div>
            </div>

            {/* Fatalities / Deaths */}
            <div className="bg-white/5 p-6 border border-white/5 relative overflow-hidden">
              <h4
                className={`text-[#ff9a65] text-sm uppercase mb-3 text-red-400 ${geistMono.className}`}
              >
                Conflict Fatalities
              </h4>
              <div className={`text-4xl text-white ${n27.className}`}>
                {stats?.ucdp_deaths?.toLocaleString() ?? "-"}
              </div>
              {stats?.is_forecast && (
                <div
                  className={`absolute top-1 right-1 px-1 py-px bg-[#ff9a65]/20 text-[#ff9a65] text-[9px] ${geistMono.className} border border-[#ff9a65]/30`}
                >
                  PREDICTED
                </div>
              )}
              <div
                className={`text-xs text-white/40 mt-2 ${geistMono.className}`}
              >
                UCDP Best Estimate
              </div>
            </div>

            {/* NGO Incidents */}
            <div className="bg-white/5 p-6 border border-white/5">
              <h4
                className={`text-[#ff9a65] text-sm uppercase mb-3 ${geistMono.className}`}
              >
                NGO Incidents
              </h4>
              <div className={`text-4xl text-white ${n27.className}`}>
                {stats?.ngo_incidents?.toLocaleString() ?? "-"}
              </div>
              <div
                className={`text-xs text-white/40 mt-2 ${geistMono.className}`}
              >
                Reported events
              </div>
            </div>

            {/* ACLED Events */}
            <div className="bg-white/5 p-6 border border-white/5">
              <h4
                className={`text-[#ff9a65] text-sm uppercase mb-3 ${geistMono.className}`}
              >
                Total ACLED Events
              </h4>
              <div className={`text-4xl text-white ${n27.className}`}>
                {stats?.acled_events?.toLocaleString() ?? "-"}
              </div>
              <div
                className={`text-xs text-white/40 mt-2 ${geistMono.className}`}
              >
                Verified incidents
              </div>
            </div>

            {/* Population Exposure */}
            <div className="bg-white/5 p-6 border border-white/5 md:col-span-2">
              <h4
                className={`text-[#ff9a65] text-sm uppercase mb-3 ${geistMono.className}`}
              >
                Population Exposed
              </h4>
              <div className={`text-4xl text-white ${n27.className}`}>
                {stats?.acled_population_exposure
                  ? stats.acled_population_exposure > 1000000
                    ? (stats.acled_population_exposure / 1000000).toFixed(1) +
                      "M"
                    : stats.acled_population_exposure.toLocaleString()
                  : "-"}
              </div>
              <div
                className={`text-xs text-white/40 mt-2 ${geistMono.className}`}
              >
                Direct proximity to conflict events
              </div>
            </div>
          </div>

          {monthlyStats.length > 0 && (
            <div className="w-full bg-white/5 p-6 border border-white/5 order-first md:order-none mb-6 md:mb-0 shrink-0">
              <h4
                className={`text-[#ff9a65] text-sm uppercase mb-4 ${geistMono.className}`}
              >
                Global Event Trend
              </h4>
              <div className="w-full h-[200px]">
                <TimelineChart data={monthlyStats} height={200} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
