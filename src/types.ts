export type AuthHeader = {
  headers: {
    Authorization: string;
  };
};

export type PropositionDocument = {
  title: string;
  prop: string;
  data: string;
  articleCount: string;
  reason: string;
  proposedBy: string[];
  ministryOf: string | null;
  billOrResolution: string;
  approvedStatus: string;
  resources: {
    identifier: string;
    docLink: string;
  }[];
  votes: {
    yes: string[];
    no: string[];
  };
  docLink: string;
};


export type Citizen = {
  name: string;
  roles: {
    role: string,
    of: string
  }[];
  joinDate: string;
};

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