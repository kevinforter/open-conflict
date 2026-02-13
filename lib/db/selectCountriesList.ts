import sql from './index';
import { CountryYear } from './definitions';

export async function selectCountriesList() {
  try {
    const data = await sql<CountryYear[]>`
      SELECT year, country_name_common, cca2, ccn3, conflict_index_rank
      FROM country_year
    `;
    return data;
  } catch (error) {
    console.error('Error fetching countries list:', error);
    return [];
  }
}