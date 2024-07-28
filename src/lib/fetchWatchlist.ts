import type { AuthHeader } from "../types";
import type { Watchlist } from "../types";

export async function watchlist(authHeader?: AuthHeader | {}): Promise<Watchlist> {
    let response = await fetch(
        "https://github.com/reinitd/stoako-data/blob/main/watchlist.json?raw=true",
        authHeader
    );
    if (!response.ok) {
        throw new Error(`Error fetching tree from GitHub (${response.status}).`);
    }
    
    const data = await response.json();
    return data;
}
