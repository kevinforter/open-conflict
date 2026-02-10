import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "http://localhost:8000";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE";

const supabase = createClient(supabaseUrl, supabaseKey, {
    db: { schema: 'mart' },
});

export interface CountryEventLocation {
    date: string;
    year: number;
    country_name_common: string;
    cca2: string;
    latitude: number;
    longitude: number;
    geom: any; // GeoJSON or WKB string depending on query
    fatalities: number;
    source: 'UCDP' | 'ACLED' | 'NGO';
    event_type: string;
    sub_event_type: string | null;
    admin1: string | null;
}

export async function selectCountryEventLocations(cca2: string, year: number): Promise<CountryEventLocation[]> {
    const { data, error } = await supabase
        .from('country_event_locations')
        .select('*')
        .eq('cca2', cca2)
        .eq('year', year);

    if (error) {
        console.error("Error fetching country event locations:", error);
        return [];
    }

    return data as CountryEventLocation[];
}
