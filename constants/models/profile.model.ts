export interface Profile {
  id: string;
  fingerprint: string;
  role: string;
  name: string;
}

export interface ProfileSettings {
  logs: {
    enabled: boolean;
    drop: {
      ip: boolean;
      domain: boolean;
    };
    retention: number;
    location: string;
  };
  blockPage: {
    enabled: boolean;
  };
  performance: {
    ecs: boolean;
    cacheBoost: boolean;
    cnameFlattening: boolean;
  };
}

export interface ProfileSecurity {
  threatIntelligenceFeeds: boolean;
  aiThreatDetection: boolean;
  googleSafeBrowsing: boolean;
  cryptojacking: boolean;
  dnsRebinding: boolean;
  idnHomographs: boolean;
  typosquatting: boolean;
  dga: boolean;
  nrd: boolean;
  ddns: boolean;
  parking: boolean;
  csam: boolean;
  tlds: {
    id: string;
  }[];
}

export interface ParentalControlList {
  id: string;
  active: boolean;
}

export interface ExtendedProfile {
  name: string;
  security: ProfileSecurity;
  setup: {
    linkedIp: {
      servers: string[];
    };
  };
  privacy: {
    blocklists: {
      id: string;
      name: string;
      website: string;
      description: string;
      entries: number;
      updatedOn: Date;
    }[];
    natives: { id: string }[];
    disguisedTrackers: boolean;
    allowAffiliate: boolean;
  };
  parentalControl: {
    services: ParentalControlList[];
    categories: ParentalControlList[];
    safeSearch: boolean;
    youtubeRestrictedMode: boolean;
    blockBypass: boolean;
  };
  denylist: ParentalControlList[];
  allowlist: ParentalControlList[];
  settings: ProfileSettings;
  web3: boolean;
}
