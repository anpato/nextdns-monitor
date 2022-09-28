import { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { IGetDevices } from '../../../shared/constants/types/device-type';
import { ProfileRequest } from '../../../shared/constants/types/profile.type';
import { NextDnsUrls } from '../../../shared/datasources/api-urls';
import { NextDnsApi } from '../../../shared/datasources/base-api';

export default async function handler(
  req: ProfileRequest,
  res: NextApiResponse
) {
  const response: AxiosResponse<IGetDevices> = await NextDnsApi.get(
    NextDnsUrls.getDevices(req.query.profileId)
  );
  res.send(response.data.data);
}
