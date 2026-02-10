import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "http://localhost:8000";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE";

// Use public schema (default) which is definitely exposed
const supabase = createClient(supabaseUrl, supabaseKey, {
  db: { schema: 'mart' },
});

export async function selectCountriesList() {
  // Query the wrapper view in public schema
  const { data, error } = await supabase
    .from('country_year')
    .select('year, country_name_common, cca2, ccn3, conflict_index_rank');

  if (error) {
    console.error('Error fetching countries list:', error);
    return [];
  }

  return data;
}