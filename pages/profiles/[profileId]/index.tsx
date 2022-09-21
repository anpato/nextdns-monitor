import { Container, Grid } from '@nextui-org/react';
import { AxiosResponse } from 'axios';
import { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { useQueries } from 'react-query';
import AnalyticsStatus from '../../../components/analytics-status';
import DeviceGrid from '../../../components/device-grid';
import DomainModal from '../../../components/domain-modal';
import ProfileBar from '../../../components/profile-bar';
import { ExtendedProfile } from '../../../constants/models/profile.model';
import { IGetProfiles } from '../../../constants/types/profile.type';
import { InternalUrls } from '../../../datasources/api-urls';
import { NextDnsApi } from '../../../datasources/base-api';
import {
  GetAnalyticsStatus,
  GetProfile,
  GetProfileDevices
} from '../../../shared/services/internal-service';
import { useProfiles } from '../../../hooks/useProfile.hook';

type IProps = {
  profileId: string;
};

const Profile: NextPage<IProps> = ({ profileId }) => {
  const [domainDrawerOpen, toggleDomainDrawer] = useState<boolean>(false);
  const { setActiveUserProfile } = useProfiles();
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
      }
    },
    {
      queryKey: 'Devices',
      queryFn: async () => await GetProfileDevices(profileId)
    },
    {
      queryKey: 'AnaltyticsStatus',
      queryFn: async () => await GetAnalyticsStatus(profileId)
    }
  ]);

  return (
    <div>
      <Head>
        <title>Dashboard | {profileData?.name}</title>
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

export async function getStaticPaths() {
  const profiles: AxiosResponse<IGetProfiles> = await NextDnsApi.get(
    InternalUrls.getProfiles()
  );

  return {
    paths: profiles.data.data.map((p) => ({ params: { profileId: p.id } })),
    fallback: false
  };
}

export async function getStaticProps({
  params
}: {
  params: { profileId: string };
}) {
  return { props: { profileId: params.profileId } };
}
