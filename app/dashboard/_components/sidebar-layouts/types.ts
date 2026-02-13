
import { CountryStats } from "@/lib/db/selectCountryStats";
import { CountryMonthStats } from "@/lib/db/selectCountryStatsMonth";
import { UCDPSource } from "@/lib/db/selectCountrySources";
import { CountryEventLocation } from "@/lib/db/selectCountryEventLocations";

export interface ChartDataItem {
  name: string;
  value: number;
  color: string;
  UCDP?: number;
  ACLED?: number;
  NGO?: number;
  lat?: number;
  lon?: number;
  breakdown?: {
    type: string;
    count: number;
    color: string;
  }[];
}

export interface SidebarLayoutProps {
  data: CountryStats;
  monthlyData: CountryMonthStats[];
  sources: UCDPSource[];
  visible: boolean;
  expanded: boolean;
  loading: boolean;
  
  // State
  isSourcesOpen: boolean;
  setIsSourcesOpen: (open: boolean) => void;
  isFiltersOpen: boolean;
  setIsFiltersOpen: (open: boolean) => void;
  
  // Filters
  selectedSources: Set<string>;
  toggleSource: (source: string) => void;
  selectedEventTypes: Set<string>;
  setSelectedEventTypes: (types: Set<string>) => void;
  toggleEventType: (type: string) => void;
  availableEventTypes: string[];
  visibleSources: string[];
  
  // Derived Data
  combinedDonutData: any[]; // Typing as any[] for flexibility with Recharts or specific interface
  admin1Data: any[];
  filteredLocations: CountryEventLocation[];
  hasRiskProfile: boolean;
  
  // Refs for scroll detection (Optional, may not be needed in split layouts but good to have)
  mainContentRef?: React.RefObject<HTMLDivElement>;
  mainHasScroll?: boolean;
}
