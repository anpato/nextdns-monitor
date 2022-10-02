import { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { NEXTDNS_HEADER } from '../../../shared/constants/nextdns-header.data';
import { IGetProfiles } from '../../../shared/constants/types/profile.type';
import { InternalUrls } from '../../../shared/datasources/api-urls';
import { NextDnsApi } from '../../../shared/datasources/base-api';
import { SS_UserApiKey } from '../../../shared/helpers/apikey.helper';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const profile = await SS_UserApiKey(req, res);
    const response: AxiosResponse<IGetProfiles> = await NextDnsApi.get(
      InternalUrls.getProfiles(),
      {
        headers: {
          [NEXTDNS_HEADER]: profile?.apiKey ?? ''
        }
      }
    );
    res.send(response.data.data);
  } catch (error) {
    throw error;
  }
}
