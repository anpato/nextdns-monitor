import { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { IGetProfiles } from '../../../shared/constants/types/profile.type';
import { InternalUrls } from '../../../shared/datasources/api-urls';
import { NextDnsApi } from '../../../shared/datasources/base-api';

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
