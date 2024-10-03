export type AuthHeader = {
  headers: {
    Authorization: string;
    "Pragma": 'no-cache';
    "Cache-Control": 'no-cache' 
  };
};

export type PropositionDocument = {
  title: string;
  prop: string;
  date: string;
  articleCount: string;
  reason: string;
  proposedBy: string[];
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