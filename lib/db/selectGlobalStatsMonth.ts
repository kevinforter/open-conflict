import sql from './index';
import { GlobalMonth } from './definitions';

export type GlobalMonthStats = GlobalMonth;

export async function selectGlobalStatsMonth(year: number): Promise<GlobalMonthStats[]> {
    try {
        const data = await sql<GlobalMonthStats[]>`
            SELECT *
            FROM global_month
            WHERE year = ${year}
            ORDER BY month ASC
        `;
        return data;
    } catch (error) {
        console.error("Error fetching global monthly stats:", error);
        return [];
    }
}
