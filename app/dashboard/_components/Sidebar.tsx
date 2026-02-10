import { YearDropdown } from "./YearDropdown";
import { CountryList } from "./CountryList";

interface SidebarProps {
  visible: boolean;
  years: number[];
  selectedYear: number;
  onYearChange: (year: number) => void;
  countries?: { country: string; code: string }[];
  isLoadingCountries: boolean;
  selectedCountry: string | null;
  onSelectCountry: (code: string) => void;
}

export function Sidebar({
  visible,
  years,
  selectedYear,
  onYearChange,
  countries,
  isLoadingCountries,
  selectedCountry,
  onSelectCountry,
}: SidebarProps) {
  if (!visible) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: "80px",
        left: "20px",
        width: "280px",
        maxHeight: "calc(100vh - 120px)",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        zIndex: 100,
        animation: "slideInLeft 0.8s ease-out 1.2s backwards",
      }}
    >
      <YearDropdown
        years={years}
        selectedYear={selectedYear}
        onSelect={onYearChange}
      />

      <CountryList
        countries={countries}
        isLoading={isLoadingCountries}
        selectedCountry={selectedCountry}
        selectedYear={selectedYear}
        onSelectCountry={onSelectCountry}
      />
    </div>
  );
}
