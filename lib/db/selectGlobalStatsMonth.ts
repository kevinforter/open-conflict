import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "http://localhost:8000";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE";

const supabase = createClient(supabaseUrl, supabaseKey, {
    db: { schema: 'mart' },
});

export interface GlobalMonthStats {
    year: number;
    month: number;
    month_start: string;
    deaths: number;
    acled_events: number;
    population_exposure: number;
    // include other columns if needed
}

export async function selectGlobalStatsMonth(year: number): Promise<GlobalMonthStats[]> {
    const { data, error } = await supabase
        .from('global_month')
        .select('*')
        .eq('year', year)
        .order('month', { ascending: true });

    if (error) {
        console.error("Error fetching global monthly stats:", error);
        return [];
    }

    return data as GlobalMonthStats[];
}
