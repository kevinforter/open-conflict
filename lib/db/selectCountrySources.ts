import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "http://localhost:8000";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE";

const supabase = createClient(supabaseUrl, supabaseKey, {
    db: { schema: 'mart' },
});

export interface UCDPSource {
    source_id: number;
    event_id: number;
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
    conflict_name: string;
}

export async function selectCountrySources(cca2: string, year: number): Promise<UCDPSource[]> {
    const { data, error } = await supabase
        .from('ucdp_sources')
        .select('*')
        .eq('cca2', cca2)
        .eq('year', year)
        .order('fatalities', { ascending: false }) // Show most deadly events first? Or date?
        .limit(50); // Limit to prevent overwhelming the UI

    if (error) {
        console.error("Error fetching country sources:", error);
        return [];
    }

    return data as UCDPSource[];
}
