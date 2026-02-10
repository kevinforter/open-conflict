import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "http://localhost:8000";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE";

const supabase = createClient(supabaseUrl, supabaseKey, {
    db: { schema: 'mart' },
});

export interface GlobalStats {
    year: number;
    ucdp_deaths: number;
    ucdp_active_conflicts: number;
    acled_events: number;
    acled_fatalities: number;
    acled_population_exposure: number;
    ngo_incidents: number;
    is_forecast: boolean;
}

export async function selectGlobalStats(year: number): Promise<GlobalStats | null> {
    const { data, error } = await supabase
        .from('global_year')
        .select()
        .eq('year', year)
        .single(); // Expecting one row per year

    if (error) {
        console.error("Error fetching global stats:", error);
        return null;
    }

    return data as GlobalStats;
}
