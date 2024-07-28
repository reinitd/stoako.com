import type { AuthHeader, Member } from "../types";
import type { MembersList } from "../types";

export async function all(headers?: AuthHeader | {}): Promise<MembersList> {
    const generalMembersResponse = await fetch('https://github.com/reinitd/stoako-data/blob/main/members/general.json?raw=true', headers);

    if (!generalMembersResponse.ok) {
        throw new Error("Couldn't get general members data from GitHub.");
    }

    const generalMembersdata = await generalMembersResponse.json();

    const dukesResponse = await fetch('https://github.com/reinitd/stoako-data/blob/main/members/dukes.json?raw=true', headers);

    if (!dukesResponse.ok) {
        throw new Error("Couldn't get duke members data from GitHub.");
    }

    const dukesData = await dukesResponse.json();

    const royaltyResponse = await fetch('https://github.com/reinitd/stoako-data/blob/main/members/royalty.json?raw=true', headers);

    if (!royaltyResponse.ok) {
        throw new Error("Couldn't get royalty members data from GitHub.");
    }

    const royaltyData = await royaltyResponse.json();

    let result = [royaltyData, dukesData, generalMembersdata];
    // https://stackoverflow.com/a/47924059/14363702 - Thanks
    const data = result.reduce(function (r, e) {
        return Object.keys(e).forEach(function (k) {
            if (!r[k]) r[k] = [].concat(e[k])
            else r[k] = r[k].concat(e[k])
        }), r
    }, {})

    return data;
}

export async function royalty(headers?: AuthHeader | {}): Promise<MembersList> {
    const response = await fetch('https://github.com/reinitd/stoako-data/blob/main/members/royalty.json?raw=true', headers);

    if (!response.ok) {
        throw new Error("Couldn't get royalty members data from GitHub.");
    }

    const data = await response.json();
    return data;
}

export async function dukes(headers?: AuthHeader | {}): Promise<MembersList> {
    const response = await fetch('https://github.com/reinitd/stoako-data/blob/main/members/dukes.json?raw=true', headers);

    if (!response.ok) {
        throw new Error("Couldn't get dukes from GitHub.");
    }

    const data = await response.json();
    return data;
}

export async function general(headers?: AuthHeader | {}): Promise<MembersList> {
    const response = await fetch('https://github.com/reinitd/stoako-data/blob/main/members/general.json?raw=true', headers);

    if (!response.ok) {
        throw new Error("Couldn't get general members data from GitHub.");
    }

    const data = await response.json();
    return data;
}