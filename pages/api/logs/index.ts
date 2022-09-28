import { AxiosResponse } from 'axios';
import { NextApiResponse } from 'next';
import { IGetLogs } from '../../../shared/constants/types/logs-type';
import { ProfileRequest } from '../../../shared/constants/types/profile.type';
import { NextDnsUrls } from '../../../shared/datasources/api-urls';
import { NextDnsApi } from '../../../shared/datasources/base-api';

export default async function handler(
  req: ProfileRequest,
  res: NextApiResponse
) {
  const response: AxiosResponse<IGetLogs> = await NextDnsApi.get(
    NextDnsUrls.getLogs(req.query.profileId)
  );
  res.send(response.data.data);
}
