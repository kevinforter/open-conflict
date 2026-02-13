import sql from './index';
import { CountryMonth } from './definitions';

export type CountryMonthStats = CountryMonth;

export async function selectCountryStatsMonth(cca2: string, year: number): Promise<CountryMonthStats[]> {
    try {
        const data = await sql<CountryMonthStats[]>`
            SELECT *
            FROM country_month
            WHERE cca2 = ${cca2} AND year = ${year}
            ORDER BY month ASC
        `;
        return data;
    } catch (error) {
        console.error('Error fetching monthly stats:', error);
        return [];
    }
}