import { dukes } from "../../../../lib/fetchCitizens";

export async function GET(): Promise<Response> {
    try {
        const data = await dukes();

        return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error: any) {
        console.error('Error fetching board citizens data:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}