/* definitions.ts
   TypeScript definitions generated from your Postgres table schemas.
   Notes:
   - `date` columns are typed as `string` (ISO date, e.g. "2026-02-13") or `Date` depending on your app. Adjust if you prefer `Date`.
   - PostGIS `geography(Point,4326)` is represented as GeoJSON `Point` (lon/lat).
   - `numeric` is represented as `string` to avoid precision loss (common for pg drivers). Change to `number` if you’re OK with float precision.
*/

// ---------- Shared helpers ----------
export type ISODateString = string; // e.g. "2026-02-13"

export type GeoJSONPoint = {
  type: "Point";
  /** GeoJSON order is [longitude, latitude] */
  coordinates: [number, number];
};

// ---------- Tables ----------

/** public.country_event_locations */
export interface CountryEventLocation {
  date: ISODateString;
  year: number;
  country_name_common: string;
  cca2: string;

  latitude: number;
  longitude: number;

  /** PostGIS geography(Point,4326) */
  geom: GeoJSONPoint;

  fatalities: number;
  source: string;
  event_type: string;
  sub_event_type: string;
  admin1: string;
}

/** public.country_month */
export interface CountryMonth {
  month_start: ISODateString;
  year: number;
  month: number;

  country_name_common: string;
  cca2: string;

  ucdp_deaths: bigint;
  ucdp_state_based_violence: bigint;
  ucdp_non_state_violence: bigint;
  ucdp_one_sided_violence: bigint;

  acled_events: bigint;
  acled_fatalities: bigint;

  /** Postgres numeric */
  acled_population_exposure: string;
}

/** public.country_year */
export interface CountryYear {
  year: number;
  geometry?: any; // GeoJSON or similar

  country_name_common: string;
  cca2: string;
  ccn3: string;

  ucdp_deaths_best: bigint;

  acled_fatalities: bigint;
  acled_fatalities_prev: bigint;

  /** Postgres numeric */
  acled_population_exposure: string;

  acled_events: bigint;
  ngo_incident_count: bigint;

  conflict_index_level: string;
  conflict_index_rank: number;

  deadliness_rank: number;
  diffusion_rank: number;
  danger_rank: number;
  fragmentation_rank: number;

  change_category: string;
}

/** public.global_month */
export interface GlobalMonth {
  month_start: ISODateString;
  year: number;
  month: number;

  deaths: bigint;
  active_conflicts: bigint;

  state_based_violence: bigint;
  non_state_violence: bigint;
  one_sided_violence: bigint;

  acled_events: bigint;
  acled_fatalities: bigint;

  /** Postgres numeric */
  population_exposure: string;
}

/** public.global_year */
export interface GlobalYear {
  year: number;

  ucdp_deaths: bigint;
  ucdp_active_conflicts: bigint;

  acled_events: bigint;
  acled_fatalities: bigint;

  /** Postgres numeric */
  acled_population_exposure: string;

  ngo_incidents: bigint;

  is_forecast: boolean;
}

/** public.ngo_incidents */
export interface NgoIncident {
  incident_date: ISODateString;
  year: number;
  
  country_name_common: string;
  cca2: string;

  region: string;
  district: string;
  city: string;

  total_affected: number;
  total_killed: number;
  total_wounded: number;
  total_kidnapped: number;
  total_detained: number;

  latitude: number;
  longitude: number;

  /** PostGIS geography(Point,4326) */
  geom: GeoJSONPoint;
}

/** public.ucdp_sources */
export interface UcdpSource {
  source_id: number;
  event_id: number;

  date_start: ISODateString;
  year: number;

  country_name_common: string;
  cca2: string;

  source_article: string;
  source_headline: string;
  source_office: string;
  source_date: string;
  source_original: string;

  type_of_violence: string;
  fatalities: number;

  region: string;
  conflict_name: string;
  side_a: string;
  side_b: string;
}

// Optional: a DB map you can use in code
export type DbTables = {
  country_event_locations: CountryEventLocation;
  country_month: CountryMonth;
  country_year: CountryYear;
  global_month: GlobalMonth;
  global_year: GlobalYear;
  ngo_incidents: NgoIncident;
  ucdp_sources: UcdpSource;
};

// Aliases for compatibility with legacy Supabase types
export type CountryStats = CountryYear;
export type GlobalStats = GlobalYear;
export type CountryMonthStats = CountryMonth;
export type GlobalMonthStats = GlobalMonth;
