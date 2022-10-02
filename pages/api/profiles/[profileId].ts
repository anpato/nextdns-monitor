import { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { ExtendedProfile } from '../../../shared/constants/models/profile.model';
import { NEXTDNS_HEADER } from '../../../shared/constants/nextdns-header.data';
import {
  IGetProfile,
  ProfileRequest
} from '../../../shared/constants/types/profile.type';
import { InternalUrls } from '../../../shared/datasources/api-urls';
import { NextDnsApi } from '../../../shared/datasources/base-api';
import { SS_UserApiKey } from '../../../shared/helpers/apikey.helper';

export default async function handler(
  req: ProfileRequest,
  res: NextApiResponse
) {
  const profile = await SS_UserApiKey(req, res);

  const profileData: AxiosResponse<IGetProfile> = await NextDnsApi.get(
    InternalUrls.getProfile(req.query.profileId),
    {
      headers: {
        [NEXTDNS_HEADER]: profile?.apiKey ?? ''
      }
    }
  );
  res.send(profileData.data.data);
}
