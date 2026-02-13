import sql from './index';
import { CountryEventLocation } from './definitions';

export async function selectCountryEventLocations(cca2: string, year: number): Promise<CountryEventLocation[]> {
    try {
        const data = await sql<CountryEventLocation[]>`
            SELECT *
            FROM country_event_locations
            WHERE cca2 = ${cca2} AND year = ${year}
        `;
        return data;
    } catch (error) {
        console.error("Error fetching country event locations:", error);
        return [];
    }
}
