export class InternalUrls {
  static getProfiles(): string {
    return '/profiles';
  }

  static getProfile(profileId: string): string {
    return `/profiles/${profileId}`;
  }

  static getDevices(profileId: string): string {
    return `/devices?profileId=${profileId}`;
  }

  static getAnalyticsStatus(profileId: string): string {
    return `/analytics/status?profileId=${profileId}`;
  }

  static getLogs(profileId: string): string {
    return `/logs?profileId=${profileId}`;
  }

  static signIn(csrfToken: string): string {
    return `/auth/signin/email?csrf=${csrfToken}`;
  }

  static getUserByEmail(email: string): string {
    return `/users?email=${encodeURIComponent(email)}`;
  }
}

export class NextDnsUrls {
  static getDevices(profileId: string): string {
    return `/profiles/${profileId}/analytics/devices`;
  }

  static getAnalyticsStatus(profileId: string): string {
    return `/profiles/${profileId}/analytics/status`;
  }

  static getLogs(profileId: string): string {
    return `/profiles/${profileId}/logs`;
  }
}
