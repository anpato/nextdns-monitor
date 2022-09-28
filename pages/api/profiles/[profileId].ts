import { AxiosResponse } from 'axios';
import { NextApiResponse } from 'next';
import { ExtendedProfile } from '../../../shared/constants/models/profile.model';
import {
  IGetProfile,
  ProfileRequest
} from '../../../shared/constants/types/profile.type';
import { InternalUrls } from '../../../shared/datasources/api-urls';
import { NextDnsApi } from '../../../shared/datasources/base-api';

export default async function handler(
  req: ProfileRequest,
  res: NextApiResponse
) {
  const profileData: AxiosResponse<IGetProfile> = await NextDnsApi.get(
    InternalUrls.getProfile(req.query.profileId)
  );
  res.send(profileData.data.data);
}
