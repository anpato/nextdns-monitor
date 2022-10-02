import { Container, Grid } from '@nextui-org/react';
import { GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { useQueries } from 'react-query';
import AnalyticsStatus from '../../../components/analytics-status';
import DeviceGrid from '../../../components/device-grid';
import DomainModal from '../../../components/domain-modal';
import ProfileBar from '../../../components/profile-bar';
import { ExtendedProfile } from '../../../shared/constants/models/profile.model';
import {
  GetAnalyticsStatus,
  GetProfile,
  GetProfileDevices
} from '../../../shared/services/internal-service';
import { useProfiles } from '../../../shared/hooks/useProfile.hook';
import { useRouter } from 'next/router';

type IProps = {
  profileId: string;
};

const Profile: NextPage<IProps> = ({ profileId }) => {
  const [domainDrawerOpen, toggleDomainDrawer] = useState<boolean>(false);
  const { setActiveUserProfile } = useProfiles();
  const router = useRouter();
  profileId = profileId ?? router.query.profileId;

  const [
    { data: profileData },
    { data: devices = [], isLoading: devicesLoading },
    { data: analytics = [], isLoading: analyticsLoading }
  ] = useQueries([
    {
      queryKey: '[ProfileId]',
      queryFn: async () => await GetProfile(profileId),
      onSuccess: (data: ExtendedProfile) => {
        setActiveUserProfile(data);
      },
      enabled: !!profileId
    },
    {
      queryKey: 'Devices',
      queryFn: async () => await GetProfileDevices(profileId),
      enabled: !!profileId
    },
    {
      queryKey: 'AnaltyticsStatus',
      queryFn: async () => await GetAnalyticsStatus(profileId),
      enabled: !!profileId
    }
  ]);

  return (
    <div>
      <Head>
        <title>Dashboard | {profileData?.name ?? 'Your Profile'}</title>
      </Head>
      <ProfileBar />
      <DomainModal
        blockList={profileData?.privacy.blocklists || []}
        isOpen={domainDrawerOpen}
        toggleOpen={toggleDomainDrawer}
      />
      <Container>
        <Grid.Container gap={2}>
          <Grid xs={8}>
            <DeviceGrid devices={devices} isLoading={devicesLoading} />
          </Grid>
          <Grid xs={4}>
            <AnalyticsStatus
              isLoading={analyticsLoading}
              analytics={analytics}
              toggleOpen={toggleDomainDrawer}
            />
          </Grid>
        </Grid.Container>
      </Container>
    </div>
  );
};

export default Profile;

export async function getStaticPaths(ctx: GetServerSidePropsContext) {
  return {
    paths: [],
    fallback: true
  };
}

export async function getStaticProps({
  params
}: {
  params: { profileId: string };
}) {
  console.log(params);
  return { props: { profileId: params.profileId } };
}
