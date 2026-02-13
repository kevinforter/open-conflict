"use server";

import { selectCountriesList } from "@/lib/db/selectCountriesList";
import { selectCountryEventLocations } from "@/lib/db/selectCountryEventLocations";
import { selectGlobalStats } from "@/lib/db/selectGlobalStats";
import { selectCountryStats } from "@/lib/db/selectCountryStats";
import { selectCountryStatsMonth } from "@/lib/db/selectCountryStatsMonth";
import { selectCountrySources } from "@/lib/db/selectCountrySources";
import { selectGlobalStatsMonth } from "@/lib/db/selectGlobalStatsMonth";

export async function getCountriesList() {
  const data = await selectCountriesList();
  // Serialize BigInts if any (postgres.js returns BigInt for int8)
  return JSON.parse(JSON.stringify(data, (key, value) =>
    typeof value === 'bigint' ? Number(value) : value
  ));
}

export async function getCountryEventLocations(cca2: string, year: number) {
  const data = await selectCountryEventLocations(cca2, year);
   return JSON.parse(JSON.stringify(data, (key, value) =>
    typeof value === 'bigint' ? Number(value) : value
  ));
}

export async function getGlobalStats(year: number) {
  const data = await selectGlobalStats(year);
   return JSON.parse(JSON.stringify(data, (key, value) =>
    typeof value === 'bigint' ? Number(value) : value
  ));
}

export async function getCountryStats(cca2: string, year: number) {
  const data = await selectCountryStats(cca2, year);
   return JSON.parse(JSON.stringify(data, (key, value) =>
    typeof value === 'bigint' ? Number(value) : value
  ));
}

export async function getCountryStatsMonth(cca2: string, year: number) {
  const data = await selectCountryStatsMonth(cca2, year);
   return JSON.parse(JSON.stringify(data, (key, value) =>
    typeof value === 'bigint' ? Number(value) : value
  ));
}

export async function getCountrySources(cca2: string, year: number) {
  const data = await selectCountrySources(cca2, year);
   return JSON.parse(JSON.stringify(data, (key, value) =>
    typeof value === 'bigint' ? Number(value) : value
  ));
}

export async function getGlobalStatsMonth(year: number) {
  const data = await selectGlobalStatsMonth(year);
   return JSON.parse(JSON.stringify(data, (key, value) =>
    typeof value === 'bigint' ? Number(value) : value
  ));
}
