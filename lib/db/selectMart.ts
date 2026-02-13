import sql from './index';

export async function selectMart() {
    try {
        const data = await sql`
            SELECT year
            FROM country_year
        `;
        return data;
    } catch (error) {
        console.error('Error fetching countries list:', error);
        return [];
    }
}