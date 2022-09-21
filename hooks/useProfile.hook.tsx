import { useEffect, useState } from 'react';
import { ExtendedProfile, Profile } from '../constants/models/profile.model';

export const useProfiles = () => {
  const [userProfiles, setProfiles] = useState<Profile[]>([]);
  const [activeProfile, setActiveProfile] = useState<ExtendedProfile | null>(
    null
  );

  const getProfile = (): ExtendedProfile | null => {
    return activeProfile;
  };

  const setUserProfiles = (profiles: Profile[]) => {
    localStorage.setItem('profiles', JSON.stringify(profiles));
    setProfiles(profiles);
  };
  const getProfilesFromStorage = () => {
    const storedProfiles = JSON.parse(
      localStorage.getItem('profiles') as string
    );
    const activeStoredProfile = JSON.parse(
      localStorage.getItem('activeProfile') as string
    );
    setActiveProfile(activeStoredProfile);
    setProfiles(storedProfiles);
  };

  const setActiveUserProfile = (profile: ExtendedProfile) => {
    localStorage.setItem('activeProfile', JSON.stringify(profile));
    setActiveProfile(profile);
  };

  useEffect(() => {
    getProfilesFromStorage();
  }, []);

  return {
    activeProfile,
    userProfiles,
    setUserProfiles,
    getProfile,
    setActiveUserProfile
  };
};
