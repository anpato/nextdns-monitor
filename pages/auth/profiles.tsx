import { Button, Container, Grid, Loading } from '@nextui-org/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useQuery } from 'react-query';
import ProfileCard from '../../components/profile-card';
import { GetProfiles } from '../../shared/services/internal-service';
import { useProfiles } from '../../shared/hooks/useProfile.hook';
import { signOut } from 'next-auth/react';

const Profiles: NextPage = () => {
  const { setUserProfiles } = useProfiles();
  const { isLoading, data } = useQuery(
    'Profiles',
    async () => await GetProfiles(),
    {
      onSuccess: (data) => {
        setUserProfiles(data);
      }
    }
  );

  return (
    <div>
      <Head>
        <title>Profiles</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container css={{ height: '100%' }}>
        <Grid.Container
          css={{ height: 'stretch' }}
          gap={2}
          justify="center"
          alignItems="center"
        >
          {isLoading ? (
            <Loading size="lg" />
          ) : (
            data &&
            data.map((profile) => (
              <Grid xs={4} key={profile.id}>
                <ProfileCard {...profile} />
              </Grid>
            ))
          )}

          <Button onClick={() => signOut({ redirect: true, callbackUrl: '/' })}>
            Sign Out
          </Button>
        </Grid.Container>
      </Container>
    </div>
  );
};

export default Profiles;