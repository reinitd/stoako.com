import type { AuthHeader, Citizen } from "../types";
import type { CitizensList } from "../types";

export async function fetchCitizens(headers?: AuthHeader | {}): Promise<CitizensList> {
    const response = await fetch('https://github.com/reinitd/stoako-data/blob/main/citizens.json?raw=true', headers);

    if (!response.ok) {
        throw new Error("Couldn't get citizens from GitHub.");
    }

    const data = await response.json() as CitizensList;
    return data;
}

// Filter for Dukes
export async function getDukes(headers?: AuthHeader | {}): Promise<CitizensList> {
    const data = await fetchCitizens(headers);
    
    const dukes: CitizensList = {
        citizens: data.citizens.filter(citizen =>
            citizen.roles.some(role => role.role === "Duke")
        )
    };

    return dukes;
}

// Filter for the King
export async function getKing(headers?: AuthHeader | {}): Promise<CitizensList> {
    const data = await fetchCitizens(headers);
    
    const kings: CitizensList = {
        citizens: data.citizens.filter(citizen =>
            citizen.roles.some(role => role.role === "King")
        )
    };

    return kings;
}

// Filter for Ministers
export async function getMinisters(headers?: AuthHeader | {}): Promise<CitizensList> {
    const data = await fetchCitizens(headers);
    
    const ministers: CitizensList = {
        citizens: data.citizens.filter(citizen =>
            citizen.roles.some(role => role.role === "Minister")
        )
    };

    return ministers;
}

// Filter for all Citizens
export async function getCitizens(headers?: AuthHeader | {}): Promise<CitizensList> {
    const data = await fetchCitizens(headers);
    
    return data;
}
