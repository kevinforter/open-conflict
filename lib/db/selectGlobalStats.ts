import sql from './index';
import { GlobalYear } from './definitions';

export type GlobalStats = GlobalYear;

export async function selectGlobalStats(year: number): Promise<GlobalStats | null> {
    try {
        const [data] = await sql<GlobalStats[]>`
            SELECT *
            FROM global_year
            WHERE year = ${year}
            LIMIT 1
        `;
        return data || null;
    } catch (error) {
        console.error("Error fetching global stats:", error);
        return null;
    }
}
