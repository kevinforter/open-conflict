import sql from './index';
import { CountryYear } from './definitions';

export type CountryStats = CountryYear;

export async function selectCountryStats(cca2: string, year: number): Promise<CountryStats | null> {
    try {
        const [data] = await sql<CountryStats[]>`
            SELECT *
            FROM country_year
            WHERE cca2 = ${cca2} AND year = ${year}
            LIMIT 1
        `;
        return data || null;
    } catch (error) {
        console.error('Error fetching country stats:', error);
        return null;
    }
}