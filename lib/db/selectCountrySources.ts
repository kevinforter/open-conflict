import sql from './index';
import { UcdpSource } from './definitions';

export async function selectCountrySources(cca2: string, year: number): Promise<UcdpSource[]> {
    try {
        const data = await sql<UcdpSource[]>`
            SELECT *
            FROM ucdp_sources
            WHERE cca2 = ${cca2} AND year = ${year}
            ORDER BY fatalities DESC
            LIMIT 50
        `;
        return data;
    } catch (error) {
        console.error("Error fetching country sources:", error);
        return [];
    }
}
