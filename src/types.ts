export type AuthHeader = {
    headers: {
        Authorization: string;
    };
};

export type Citizen = {
    name: string;
    roles: CitizenRole[];
    joinDate: string;
};

export type CitizenRole = {
  role: string,
  of: string
}

export type CitizensList = {
    citizens: Citizen[];
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