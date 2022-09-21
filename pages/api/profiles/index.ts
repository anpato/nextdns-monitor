import { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { IGetProfiles } from '../../../constants/types/profile.type';
import { InternalUrls } from '../../../datasources/api-urls';
import { NextDnsApi } from '../../../datasources/base-api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response: AxiosResponse<IGetProfiles> = await NextDnsApi.get(
      InternalUrls.getProfiles()
    );
    res.send(response.data.data);
  } catch (error) {
    throw error;
  }
}
