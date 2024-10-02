import type { AuthHeader, PropositionDocument } from "../types";
import { fromTree, type GitTree } from "./fetchData";

type Status = "awaiting"
    | "approved"
    | "declined";

export async function getAllBnRs(authHeader?: AuthHeader | {}): Promise<string[]> {
    const awaitingResp = await getBnRs("awaiting", authHeader);
    const approvedResp = await getBnRs("approved", authHeader);
    const declinedResp = await getBnRs("declined", authHeader);

    const mergedResponses: string[] = [
        ...awaitingResp,
        ...approvedResp,
        ...declinedResp
    ];

    return mergedResponses;
}

export async function getBnRs(status: Status, authHeader?: AuthHeader | {}): Promise<string[]> {
    let response = await fetch(
        `https://github.com/reinitd/stoako-data/blob/main/bills-and-resolutions/${status}.json?raw=true`,
        authHeader
    );

    if (!response.ok) {
        throw new Error(`Error fetching BnR ${status} json (${response.status}).`);
    }

    let data: { bnrs: string[] } = await response.json();
    return data.bnrs;
}

export async function getBnRsYears(status: Status, authHeader?: AuthHeader | {}): Promise<string[]> {
    const data = await fromTree("stoako-bnr-data", "data", authHeader);

    let bnrs = [];
    for (let i = 0; i < data.length; i++) {
        const bnr = data[i];
        bnrs.push(bnr.path);
    }

    return bnrs;
}

export async function getAllBnRsData(year: string, authHeader?: AuthHeader | {}): Promise<PropositionDocument[] | null> {
    const awaitingResp = await getBnRsData("awaiting", year, authHeader);
    const approvedResp = await getBnRsData("approved", year, authHeader);
    const declinedResp = await getBnRsData("declined", year, authHeader);

    const mergedResponses: PropositionDocument[] = [
        ...(awaitingResp || []),
        ...(approvedResp || []),
        ...(declinedResp || [])
    ];

    return mergedResponses.length > 0 ? mergedResponses : null;
}

export async function getBnRsData(status: Status, year: string, authHeader?: AuthHeader | {}): Promise<PropositionDocument[] | null> {
    const years = await getBnRsYears(status, authHeader);
    if (!years.includes(year)) {
        return null;
    }

    const root = await fromTree("stoako-bnr-data", "data", authHeader);
    const wantedDir = root.find(yr => yr.path === year);

    if (!wantedDir) {
        return null;
    }

    let response = await fetch(
        wantedDir.url,
        authHeader
    );
    if (!response.ok) {
        throw new Error(`Error fetching BnR data from Github (${response.status}).`);
    }

    let data: GitTree = await response.json();

    let bnrs = [];
    for (let i = 0; i < data.tree.length; i++) {
        const bnr = data.tree[i];

        const bnrFileResp = await fetch(
            bnr.url,
            authHeader
        );
        if (!bnrFileResp.ok) {
            throw new Error(`Error fetching BnR File data from GitHub (${bnrFileResp.status}).`);
        }
        const bnrFile = await bnrFileResp.json();
        const content: PropositionDocument = JSON.parse(
            Buffer.from(bnrFile.content, "base64").toString("binary")
        );

        bnrs.push(content);
    }

    return bnrs; // TODO: Test it out!!
}
