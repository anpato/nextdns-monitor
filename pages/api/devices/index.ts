import { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { NEXTDNS_HEADER } from '../../../shared/constants/nextdns-header.data';
import { IGetDevices } from '../../../shared/constants/types/device-type';
import { ProfileRequest } from '../../../shared/constants/types/profile.type';
import { NextDnsUrls } from '../../../shared/datasources/api-urls';
import { NextDnsApi } from '../../../shared/datasources/base-api';
import { SS_UserApiKey } from '../../../shared/helpers/apikey.helper';

export default async function handler(
  req: ProfileRequest,
  res: NextApiResponse
) {
  const profile = await SS_UserApiKey(req, res);
  const response: AxiosResponse<IGetDevices> = await NextDnsApi.get(
    NextDnsUrls.getDevices(req.query.profileId),
    {
      headers: {
        [NEXTDNS_HEADER]: profile?.apiKey ?? ''
      }
    }
  );
  res.send(response.data.data);
}
