import type { AuthHeader, Citizen } from "../types";
import type { CitizensList } from "../types";

export async function all(headers?: AuthHeader | {}): Promise<CitizensList> {
    const generalCitizensResponse = await fetch('https://github.com/reinitd/stoako-data/blob/main/citizens/general.json?raw=true', headers);

    if (!generalCitizensResponse.ok) {
        throw new Error("Couldn't get general citizens data from GitHub.");
    }

    const generalCitizensdata = await generalCitizensResponse.json();

    const dukesResponse = await fetch('https://github.com/reinitd/stoako-data/blob/main/citizens/dukes.json?raw=true', headers);

    if (!dukesResponse.ok) {
        throw new Error("Couldn't get duke citizens data from GitHub.");
    }

    const dukesData = await dukesResponse.json();

    const royaltyResponse = await fetch('https://github.com/reinitd/stoako-data/blob/main/citizens/royalty.json?raw=true', headers);

    if (!royaltyResponse.ok) {
        throw new Error("Couldn't get royalty citizens data from GitHub.");
    }

    const royaltyData = await royaltyResponse.json();

    let result = [royaltyData, dukesData, generalCitizensdata];
    // https://stackoverflow.com/a/47924059/14363702 - Thanks
    const data = result.reduce(function (r, e) {
        return Object.keys(e).forEach(function (k) {
            if (!r[k]) r[k] = [].concat(e[k])
            else r[k] = r[k].concat(e[k])
        }), r
    }, {})

    return data;
}

export async function royalty(headers?: AuthHeader | {}): Promise<CitizensList> {
    const response = await fetch('https://github.com/reinitd/stoako-data/blob/main/citizens/royalty.json?raw=true', headers);

    if (!response.ok) {
        throw new Error("Couldn't get royalty citizens data from GitHub.");
    }

    const data = await response.json();
    return data;
}

export async function dukes(headers?: AuthHeader | {}): Promise<CitizensList> {
    const response = await fetch('https://github.com/reinitd/stoako-data/blob/main/citizens/dukes.json?raw=true', headers);

    if (!response.ok) {
        throw new Error("Couldn't get dukes from GitHub.");
    }

    const data = await response.json();
    return data;
}

export async function general(headers?: AuthHeader | {}): Promise<CitizensList> {
    const response = await fetch('https://github.com/reinitd/stoako-data/blob/main/citizens/general.json?raw=true', headers);

    if (!response.ok) {
        throw new Error("Couldn't get general citizens data from GitHub.");
    }

    const data = await response.json();
    return data;
}