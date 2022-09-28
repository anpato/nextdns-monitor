import {
  Container,
  Divider,
  Grid,
  Input,
  Spacer,
  Tooltip
} from '@nextui-org/react';
import { NextPage, NextPageContext } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { getSession, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { GetUserByEmail } from '../../shared/services/internal-service';
import { authOptions } from '../api/auth/[...nextauth]';
const NewUser: NextPage<{ email: string }> = ({ email }) => {
  const navigation = useRouter();
  const { isLoading, data } = useQuery(
    'GET/EMAIL',
    async () => await GetUserByEmail(email)
  );

  useEffect(() => {
    if (!email) {
      navigation.push('/');
    }
  }, [email, navigation]);

  return (
    <Container>
      <Head>
        <title>NextDNS Monitor | Profile Setup</title>
      </Head>
      <Container>
        <div>
          <h2>Welcome {email}!</h2>
          <h4>
            We need a bit of information to get started with setting up your
            profile.
          </h4>
        </div>
        <form>
          <Grid.Container gap={2} direction="row">
            <Grid xs>
              <Input
                name="firstName"
                bordered
                size="lg"
                label="First Name"
                fullWidth
                required
              />
            </Grid>
            <Grid xs>
              <Input
                name="lastName"
                bordered
                size="lg"
                label="Last Name"
                fullWidth
              />
            </Grid>
          </Grid.Container>
          <Divider />
          <Spacer />

          <Input.Password
            name="apiKey"
            helperText={`Your api key is used to request profile information from NextDNS. We perform read only requests on your behalf. ${' '} All api keys are stored in a secure manner. You can revoke this key at any time in your profile settings.`}
            bordered
            size="lg"
            label="NextDNS Api Key"
            fullWidth
            type="password"
            required
          />
        </form>
      </Container>
    </Container>
  );
};

export default NewUser;

export async function getServerSideProps(ctx: any) {
  const session = await unstable_getServerSession(
    ctx?.req,
    ctx?.res,
    authOptions
  );
  return {
    props: {
      email: session?.user?.email || null
    }
  };
}
