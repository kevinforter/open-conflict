import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "http://localhost:8000";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE";

// Use public schema (default) which is definitely exposed
const supabase = createClient(supabaseUrl, supabaseKey, {
    db: { schema: 'mart' },
});

export interface CountryMonthStats {
    year: number;
    month: number;
    month_start: string;
    acled_events: number;
    acled_fatalities: number;
    acled_population_exposure: number;
    // include other columns if needed
}

export async function selectCountryStatsMonth(cca2: string, year: number): Promise<CountryMonthStats[]> {
    // Query the monthly mart
    const { data, error } = await supabase
        .from('country_month')
        .select('*')
        .eq('cca2', cca2)
        .eq('year', year)
        .order('month', { ascending: true });

    if (error) {
        console.error('Error fetching monthly stats:', error);
        return [];
    }

    return data as CountryMonthStats[];
}