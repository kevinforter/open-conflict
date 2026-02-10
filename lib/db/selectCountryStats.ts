import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "http://localhost:8000";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE";

// Use public schema (default) which is definitely exposed
const supabase = createClient(supabaseUrl, supabaseKey, {
    db: { schema: 'mart' },
});

export interface CountryStats {
    country_name_common: string;
    cca2: string;
    year: number;
    acled_events?: number;
    deadliness_rank?: number;
    danger_rank?: number;
    fragmentation_rank?: number;
    diffusion_rank?: number;
    conflict_index_rank?: number;
    [key: string]: any; // Allow other fields for now
}

export async function selectCountryStats(cca2: string, year: number): Promise<CountryStats | null> {
    // Query the wrapper view in public schema
    const { data, error } = await supabase
        .from('country_year')
        .select()
        .eq('year', year)
        .eq('cca2', cca2)
        .maybeSingle();

    if (error) {
        console.error('Error fetching country stats:', error);
        return null;
    }

    return data;
}