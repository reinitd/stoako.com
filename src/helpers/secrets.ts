import { promises as fs } from 'fs';
import type { AuthHeader } from '../types';

export async function githubAuthHeader() {
    try {
        const pat = await fs.readFile("./secrets/gh_pat.key", "utf-8");
        const authHeader: AuthHeader = {
            headers: {
                Authorization: `Bearer ${pat.trim()}`,
            },
        };
        return authHeader;
    } catch (error) {
        console.error("Error reading GH PAT file, using no headers.");
        return null;
    }
}
