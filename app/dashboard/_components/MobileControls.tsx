import { YearDropdown } from "./YearDropdown";
import { CountryList } from "./CountryList";

interface MobileControlsProps {
  years: number[];
  selectedYear: number;
  onYearChange: (year: number) => void;
  countries?: { country: string; code: string }[];
  isLoadingCountries: boolean;
  selectedCountry: string | null;
  onSelectCountry: (code: string) => void;
}

export function MobileControls({
  years,
  selectedYear,
  onYearChange,
  countries,
  isLoadingCountries,
  selectedCountry,
  onSelectCountry,
}: MobileControlsProps) {
  return (
    <div className="absolute bottom-6 left-0 right-0 z-20 w-full px-4 flex flex-col gap-2 pointer-events-auto lg:hidden">
      {/* Year Dropdown - Floats above list */}
      <div className="self-start mb-2">
        <YearDropdown
          years={years}
          selectedYear={selectedYear}
          onSelect={onYearChange}
          direction="up"
        />
      </div>

      {/* Horizontal Country List */}
      <div className="w-full bg-transparent backdrop-blur-md border border-none p-1">
        <CountryList
          countries={countries}
          isLoading={isLoadingCountries}
          selectedCountry={selectedCountry}
          selectedYear={selectedYear}
          onSelectCountry={onSelectCountry}
          orientation="horizontal"
        />
      </div>
    </div>
  );
}
