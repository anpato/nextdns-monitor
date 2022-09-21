import { AxiosResponse } from 'axios';
import { NextApiResponse } from 'next';
import { IGetAnalyticsStatus } from '../../../../constants/types/analytics-type';
import { ProfileRequest } from '../../../../constants/types/profile.type';
import { NextDnsUrls } from '../../../../datasources/api-urls';
import { NextDnsApi } from '../../../../datasources/base-api';

export default async function handler(
  req: ProfileRequest,
  res: NextApiResponse
) {
  const response: AxiosResponse<IGetAnalyticsStatus> = await NextDnsApi.get(
    NextDnsUrls.getAnalyticsStatus(req.query.profileId)
  );
  res.send(response.data.data);
}
