import { User } from '@prisma/client';
import { AxiosResponse } from 'axios';
import { AnalyticsStatus } from '../constants/models/analytics.model';
import { Device } from '../constants/models/device.model';
import { Log } from '../constants/models/logs.model';
import { ExtendedProfile, Profile } from '../constants/models/profile.model';
import { IGetProfile, IGetProfiles } from '../constants/types/profile.type';
import { InternalUrls } from '../datasources/api-urls';
import { ClientApi } from '../datasources/base-api';

export const GetProfiles = async (): Promise<Profile[]> => {
  const res: AxiosResponse<Profile[]> = await ClientApi.get(
    InternalUrls.getProfiles()
  );
  return res.data;
};

export const GetProfile = async (
  profileId: string
): Promise<ExtendedProfile> => {
  const res: AxiosResponse<ExtendedProfile> = await ClientApi.get(
    InternalUrls.getProfile(profileId)
  );
  return res.data;
};

export const GetProfileDevices = async (
  profileId: string
): Promise<Device[]> => {
  const res: AxiosResponse<Device[]> = await ClientApi.get(
    InternalUrls.getDevices(profileId)
  );

  return res.data.filter((device) => device.name);
};

export const GetAnalyticsStatus = async (
  profileId: string
): Promise<AnalyticsStatus[]> => {
  const res: AxiosResponse<AnalyticsStatus[]> = await ClientApi.get(
    InternalUrls.getAnalyticsStatus(profileId)
  );
  return res.data;
};

export const GetLogs = async (profileId: string): Promise<Log[]> => {
  const res: AxiosResponse<Log[]> = await ClientApi.get(
    InternalUrls.getLogs(profileId)
  );
  return res.data;
};

export const SignInWithEmail = async (
  email: string,
  csrfToken: string
): Promise<boolean> => {
  await ClientApi.post(InternalUrls.signIn(csrfToken), {
    email,
    csrfToken
  });

  return true;
};

export const GetUserByEmail = async (email: string): Promise<User> => {
  const res: AxiosResponse<User> = await ClientApi.get(
    InternalUrls.getUserByEmail(email)
  );
  return res.data;
};
