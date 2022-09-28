import { AxiosResponse } from 'axios';
import { NextApiResponse } from 'next';
import { IGetAnalyticsStatus } from '../../../../shared/constants/types/analytics-type';
import { ProfileRequest } from '../../../../shared/constants/types/profile.type';
import { NextDnsUrls } from '../../../../shared/datasources/api-urls';
import { NextDnsApi } from '../../../../shared/datasources/base-api';

export default async function handler(
  req: ProfileRequest,
  res: NextApiResponse
) {
  const response: AxiosResponse<IGetAnalyticsStatus> = await NextDnsApi.get(
    NextDnsUrls.getAnalyticsStatus(req.query.profileId)
  );
  res.send(response.data.data);
}
