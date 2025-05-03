import type { AuthHeader } from "../types";
import type { Watchlist } from "../types";

export async function watchlist(authHeader?: AuthHeader | {}): Promise<Watchlist> {
    let response = await fetch(
        "https://raw.githubusercontent.com/reinitd/stoako-data/main/watchlist.json",
        authHeader
    );
    if (!response.ok) {
        throw new Error(`Error fetching tree from GitHub (${response.status}).`);
    }
    
    const data = await response.json();
    return data;
}
