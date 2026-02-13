"use client";

import { useState, useMemo, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { majorMono, jetbrainsMono } from "@/app/fonts/fonts";
import { BoldCornerButton } from "@/components/BoldCornerButton";
import dynamic from "next/dynamic";
import { useSearchParams, useRouter, usePathname } from "next/navigation"; // Import routing hooks
import {
  getCountriesList,
  getGlobalStats,
  getCountryEventLocations,
} from "@/app/dashboard/actions";
import { type GlobalStats } from "@/lib/db/definitions";
import { type CountryEventLocation } from "@/lib/db/definitions";
// Dynamic import for Globe to avoid window is not defined error in Next.js SSR
const Globe = dynamic(() => import("@/app/dashboard/_components/globe/globe"), {
  ssr: false,
});
import worldGeoJson from "@/public/map/world.geo.json";
import ScrambledText from "@/components/ScrambledText";
import packageJson from "@/package.json";
import LoadingProgress from "@/app/dashboard/_components/LoadingProgress";
import Noise from "@/components/Noise";
import { Sidebar } from "@/app/dashboard/_components/Sidebar";
import { SidebarRight } from "@/app/dashboard/_components/SidebarRight";
import { CommandMenu } from "@/app/dashboard/_components/CommandMenu";
import { DashboardNavbar } from "@/app/dashboard/_components/DashboardNavbar";
import { MobileControls } from "@/app/dashboard/_components/MobileControls";
import { GlobalStatsModal } from "@/app/dashboard/_components/GlobalStatsModal";

function DashboardContent() {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [rightSidebarVisible, setRightSidebarVisible] = useState(false);
  const [showGlobalStats, setShowGlobalStats] = useState(false);
  const [allData, setAllData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGlobeReady, setIsGlobeReady] = useState(false);
  const [globalStats, setGlobalStats] = useState<GlobalStats | null>(null);
  const [isDetailView, setIsDetailView] = useState(false);

  // Fetch Global Stats when year changes
  useEffect(() => {
    async function fetchStats() {
      const stats = await getGlobalStats(selectedYear);
      setGlobalStats(stats);
    }
    fetchStats();
  }, [selectedYear]);

  const [eventLocations, setEventLocations] = useState<CountryEventLocation[]>(
    [],
  );
  // Fetch event locations whenever country is selected (so donuts/map work in collapsed view)
  useEffect(() => {
    if (selectedCountry && selectedYear) {
      getCountryEventLocations(selectedCountry, selectedYear).then(
        setEventLocations,
      );
    } else {
      setEventLocations([]);
    }
  }, [selectedCountry, selectedYear]);

  // Routing hooks
  const searchParams = useSearchParams();

  const router = useRouter();
  const pathname = usePathname();

  // Sync URL query param to state
  useEffect(() => {
    const countryParam = searchParams.get("country");
    const yearParam = searchParams.get("year");
    const detailParam = searchParams.has("moredetail");

    if (countryParam) {
      setSelectedCountry(countryParam);
      setRightSidebarVisible(true);
    } else {
      setSelectedCountry(null);
      setRightSidebarVisible(false);
    }

    if (yearParam) {
      setSelectedYear(parseInt(yearParam, 10));
    }

    setIsDetailView(detailParam);
  }, [searchParams]);

  const handleExpandChange = (expanded: boolean) => {
    setIsDetailView(expanded);
    const params = new URLSearchParams(searchParams);
    if (expanded) {
      params.set("moredetail", "true");
    } else {
      params.delete("moredetail");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  // Fetch data on mount

  // Fetch data on mount
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      // Wait for at least 2000ms effectively showing the loading screen
      const [data] = await Promise.all([
        getCountriesList(),
        new Promise((resolve) => setTimeout(resolve, 2000)),
      ]);

      if (data) {
        setAllData(data);
        // Set initial year to url param or latest year if available
        const years = Array.from(new Set(data.map((d: any) => d.year))).sort(
          (a: any, b: any) => b - a,
        );

        // If no year in URL, default to latest
        if (!searchParams.get("year") && years.length > 0) {
          setSelectedYear(years[0] as number);
        }
      }
      setIsLoading(false);
    }
    fetchData();
  }, []); // Only run on mount, let the other effect handle URL updates

  // Extract unique years from data
  const uniqueYears = useMemo(() => {
    const years = Array.from(new Set(allData.map((d) => d.year)));
    return years.sort((a, b) => b - a);
  }, [allData]);

  // Extract countries for selected year
  const countries = useMemo(() => {
    const filtered = allData.filter((d) => d.year === selectedYear);
    // Sort alphabetically
    return filtered
      .map((d) => ({
        country: d.country_name_common,
        code: d.cca2,
        rank: d.conflict_index_rank,
      }))
      .sort((a, b) => a.country.localeCompare(b.country));
  }, [allData, selectedYear]);

  const handleCountrySelect = (code: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (code) {
      params.set("country", code);
    } else {
      params.delete("country");
    }
    // Maintain year if present
    if (selectedYear) {
      params.set("year", selectedYear.toString());
    }
    router.replace(`${pathname}?${params.toString()}`);
    setShowGlobalStats(false);
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    const params = new URLSearchParams(searchParams);
    params.set("year", year.toString());

    // Clear selected country when changing year if needed, or keep it.
    // User logic: "if selectedCountry handleCountrySelect(null)" in previous logic.
    // Let's decide: Usually keep country if available in new year, but logic was reset.
    // Preserving previous logic:
    if (selectedCountry) {
      params.delete("country"); // Clear country in URL
      setSelectedCountry(null); // Clear local state immediately for responsiveness
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  // Helper to get country name from code
  const selectedCountryName = useMemo(() => {
    if (!selectedCountry) return null;
    return (
      allData.find((d) => d.cca2 === selectedCountry)?.country_name_common ||
      selectedCountry
    );
  }, [selectedCountry, allData]);

  // Render loading state as an overlay (removed early return)
  const showLoading = isLoading || !isGlobeReady;

  const handleSceneReady = useCallback(() => {
    setIsGlobeReady(true);
  }, []);

  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden bg-[#000112] overscroll-none">
      {showLoading && <LoadingProgress />}

      {/* Header - Absolute Overlay (Desktop only) */}
      <header className="absolute top-0 left-0 z-10 w-full px-8 py-4 pointer-events-none hidden lg:block">
        <div className="relative z-20 flex items-center gap-4 pointer-events-auto w-full justify-center md:justify-start">
          <Link href="/" className="group relative z-50">
            <Image
              src="/oc_logo.svg"
              alt="Open Conflict Logo"
              width={40}
              height={40}
              className="w-8 h-8 md:w-10 md:h-10 group-hover:opacity-80 transition-opacity"
            />
          </Link>
          <span
            className={`text-sm text-white/60 hidden md:inline ${jetbrainsMono.className}`}
          >
            / GLOBE_VIEW / {selectedYear}{" "}
            {selectedCountryName && `/ ${selectedCountryName.toUpperCase()}`}
          </span>
        </div>

        {/* Center Command Menu */}
        <div className="absolute left-1/2 top-5 -translate-x-1/2 z-30 pointer-events-auto">
          <CommandMenu
            countries={countries}
            onSelectCountry={handleCountrySelect}
          />
        </div>
      </header>

      {/* Mobile/Tablet Navbar */}
      <DashboardNavbar
        countries={countries}
        onSelectCountry={handleCountrySelect}
        onGlobalStatsClick={() => setShowGlobalStats(true)}
      />

      {/* Sidebars */}
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          visible={true}
          years={uniqueYears}
          selectedYear={selectedYear}
          onYearChange={handleYearChange}
          countries={countries}
          isLoadingCountries={isLoading}
          selectedCountry={selectedCountry}
          onSelectCountry={handleCountrySelect}
        />
      </div>

      {/* Mobile Controls (Bottom) */}
      <MobileControls
        years={uniqueYears}
        selectedYear={selectedYear}
        onYearChange={handleYearChange}
        countries={countries}
        isLoadingCountries={isLoading}
        selectedCountry={selectedCountry}
        onSelectCountry={handleCountrySelect}
      />

      <SidebarRight
        visible={rightSidebarVisible}
        countryCode={selectedCountry}
        year={selectedYear}
        countryName={selectedCountryName}
        onClose={() => {
          router.replace(pathname);
        }}
        eventLocations={eventLocations}
        onExpandChange={handleExpandChange}
        expanded={isDetailView}
      />

      <GlobalStatsModal
        visible={showGlobalStats}
        onClose={() => setShowGlobalStats(false)}
        stats={globalStats}
        year={selectedYear}
      />

      {/* Description Overlay - Hides when Right Sidebar is open */}
      <div
        className={`absolute top-4 right-2 z-10 w-[200px] xl:w-[400px] max-w-sm text-left transition-opacity duration-500 hidden lg:block ${
          rightSidebarVisible
            ? "opacity-0 pointer-events-none"
            : "opacity-100 pointer-events-auto"
        }`}
      >
        <h1
          className={`text-2xl xl:text-3xl font-bold text-white mb-6 tracking-wide ${majorMono.className}`}
        >
          open conflict
        </h1>
        <p className="text-white/80 leading-relaxed whitespace-normal text-xs xl:text-sm font-light">
          By integrating datasets like UCDP, ACLED, and AWSD, it combines
          historical data with real-time events for a comprehensive view of
          global developments.
        </p>

        <BoldCornerButton
          onClick={() => setShowGlobalStats(true)}
          className="mt-8"
        >
          Global Stats
        </BoldCornerButton>
      </div>

      <main className="absolute inset-0 z-0 w-full h-full">
        <Globe
          geoJson={worldGeoJson as any}
          activeCountries={countries.map((c) => c.code)}
          selectedCountry={selectedCountry}
          onSceneReady={handleSceneReady}
        />
        <Noise />
      </main>

      <footer className="absolute bottom-0 left-0 z-10 w-full py-6 md:px-8 md:py-0 bg-transparent pointer-events-none hidden lg:block">
        <div className="w-full flex flex-col md:flex-row items-center justify-between md:h-12">
          {/* Left Spacer to balance the flex layout so center item is truly centered */}
          <div className="flex-1 hidden md:block" />

          {/* Center Footer Links */}
          <div className="pointer-events-auto hidden md:block">
            <span
              className={`text-[12px] tracking-[0.15em] text-white/60 ${jetbrainsMono.className}`}
            >
              <Link
                href="/impressum"
                className="hover:text-white transition-colors"
              >
                IMPRESSUM
              </Link>
              <span className="mx-2">|</span>
              <Link
                href="/source"
                className="hover:text-white transition-colors"
              >
                SOURCE
              </Link>
              <span className="mx-2">|</span>
              <Link
                href="/about"
                className="hover:text-white transition-colors"
              >
                ABOUT
              </Link>
              <span className="mx-2">|</span>
              <Link href="/team" className="hover:text-white transition-colors">
                TEAM
              </Link>
            </span>
          </div>

          {/* Right Version */}
          <div className="flex-1 flex justify-center md:justify-end pointer-events-auto w-full md:w-auto mt-4 md:mt-0 px-4 md:px-0">
            <ScrambledText
              radius={80}
              duration={0.9}
              speed={0.6}
              scrambleChars=".:-"
              className={jetbrainsMono.className}
              style={{
                color: "white",
                fontSize: "12px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                pointerEvents: "auto",
                opacity: 0.7,
              }}
            >
              VERSION {packageJson.version}
            </ScrambledText>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<LoadingProgress />}>
      <DashboardContent />
    </Suspense>
  );
}
