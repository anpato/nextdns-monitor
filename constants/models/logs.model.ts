import { Status } from '../enums/status.enum';

export interface Log {
  timestamp: Date;
  domain: string;
  root: string;
  tracker: string;
  encrypted: boolean;
  protocol: string;
  clientIp: string;
  client: string;
  device: {
    id: string;
    name: string;
    localIp: string;
  };
  status: Status;
  reasons: { id: string; name: string }[];
}
