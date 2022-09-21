import { AxiosResponse } from 'axios';
import { NextApiResponse } from 'next';
import { IGetLogs } from '../../../constants/types/logs-type';
import { ProfileRequest } from '../../../constants/types/profile.type';
import { NextDnsUrls } from '../../../datasources/api-urls';
import { NextDnsApi } from '../../../datasources/base-api';

export default async function handler(
  req: ProfileRequest,
  res: NextApiResponse
) {
  const response: AxiosResponse<IGetLogs> = await NextDnsApi.get(
    NextDnsUrls.getLogs(req.query.profileId)
  );
  res.send(response.data.data);
}
