import type { AuthHeader } from "../types";

export type TreeItem = {
    path: string;
    mode: string;
    type: string;
    sha: string;
    url: string;
};

export type GitTree = {
    sha: string;
    url: string;
    tree: TreeItem[];
    truncated: boolean;
};

export async function fromTree(repo: "stoako-data" | "stoako-bnr-data" | "stoako-bnr-data-images", toFindInTree: string, authHeader?: AuthHeader | {}): Promise<TreeItem[]> {
    let response = await fetch(
        `https://api.github.com/repos/reinitd/${repo}/git/trees/main`,
        authHeader
    );
    if (!response.ok) {
        throw new Error(`Error fetching tree from GitHub (${response.status}).`);
    }
    let data = await response.json();
    response = await fetch(
        data.tree.find((item: { path: string }) => item.path === toFindInTree).url,
        authHeader
    );
    if (!response.ok) {
        throw new Error(`Error fetching tree from GitHub (${response.status}).`);
    }
    data = await response.json();
    data = data.tree;
    return data;
}