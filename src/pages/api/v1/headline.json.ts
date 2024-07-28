export async function GET(): Promise<Response> {
    try {
        const response = await fetch('https://github.com/reinitd/stoako-data/blob/main/header.json?raw=true');
        
        if (!response.ok) {
            throw new Error("Couldn't get headline data from GitHub.");
        }
        
        const data = await response.json();

        return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error: any) {
        console.error('Error fetching headline data:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}