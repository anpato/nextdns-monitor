import { Navbar, Tooltip, Badge, Text } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useProfiles } from '../shared/hooks/useProfile.hook';

const ProfileBar: FC = () => {
  const router = useRouter();
  const { getProfile } = useProfiles();
  const getToolTipContent = (logStatus: boolean = false): string => {
    if (logStatus) {
      return 'You currently have logs enabled for this profile.';
    }

    return 'Logs are currently disabled for this profile.';
  };
  const dashboardPath = `/profiles/${router.query.profileId}`;
  const logsPath = `/profiles/${router.query.profileId}/logs`;

  const profile = getProfile();
  return (
    <Navbar variant="static" isBordered>
      <Navbar.Brand>
        <Text h4>{profile?.name || 'Your Profile'}</Text>
      </Navbar.Brand>
      <Navbar.Content>
        <Navbar.Link
          variant="underline-rounded"
          isActive={
            router.pathname ===
            dashboardPath.replace(`${router.query.profileId}`, '[profileId]')
          }
          href={dashboardPath}
        >
          Dashboard
        </Navbar.Link>

        <Navbar.Link
          variant="underline-rounded"
          href={logsPath}
          isActive={
            router.pathname ===
            logsPath.replace(router.query.profileId as string, '[profileId]')
          }
        >
          Logs
        </Navbar.Link>
      </Navbar.Content>
      <Navbar.Content>
        <Tooltip
          placement="bottom"
          content={getToolTipContent(profile?.settings.logs.enabled)}
        >
          <Text>Logging Status</Text>
          <Badge
            variant="dot"
            color={profile?.settings.logs.enabled ? 'success' : 'error'}
          />
        </Tooltip>
      </Navbar.Content>
    </Navbar>
  );
};

export default ProfileBar;
