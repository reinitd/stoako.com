export type AuthHeader = {
    headers: {
        Authorization: string;
    };
};

export type Member = {
    name: string;
    role: string;
    joinDate: string;
};

export type MembersList = {
    members: Member[];
};

export type WatchlistEntry = {
  name: string;
  aliases: string[];
  discordUserId: string;
  reason: string;
  relatedReportId: string | null;
};

export type Watchlist = {
  watchlist: WatchlistEntry[];
};