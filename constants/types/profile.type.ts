import { NextApiRequest } from 'next';
import { ExtendedProfile, Profile } from '../models/profile.model';

export interface ProfileRequest extends NextApiRequest {
  query: {
    profileId: string;
  };
}

export interface IGetProfiles {
  data: Profile[];
}

export interface IGetProfile {
  data: ExtendedProfile;
}
