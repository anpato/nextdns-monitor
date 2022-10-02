import {
  Button,
  Container,
  Divider,
  FormElement,
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
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { ClientApi } from '../../shared/datasources/base-api';
import {
  GetUserByEmail,
  UpdateUserAccount
} from '../../shared/services/internal-service';
import { authOptions } from '../api/auth/[...nextauth]';
import { UserInfo } from '../../shared/constants/models/user-profile.model';

const NewUser: NextPage<{ email: string }> = ({ email }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: '',
    lastName: '',
    apiKey: ''
  });
  const navigation = useRouter();

  const mutation = useMutation(
    'PUT/Account',
    async (data: UserInfo) => await UpdateUserAccount(email, data),
    {
      onSuccess: (data) => {
        localStorage.setItem('apiKey', data.apiKey);
        navigation.push('/profiles');
      }
    }
  );

  const handleChange = (e: ChangeEvent<FormElement>) => {
    setUserInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await mutation.mutateAsync(userInfo);
  };

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
        <form onSubmit={handleSubmit}>
          <Grid.Container gap={2} direction="row">
            <Grid xs>
              <Input
                onChange={handleChange}
                name="firstName"
                bordered
                size="lg"
                label="First Name"
                fullWidth
                required
                value={userInfo.firstName}
              />
            </Grid>
            <Grid xs>
              <Input
                onChange={handleChange}
                name="lastName"
                bordered
                size="lg"
                label="Last Name"
                fullWidth
                value={userInfo.lastName}
              />
            </Grid>
          </Grid.Container>
          <Divider />
          <Spacer />

          <Input.Password
            name="apiKey"
            helperText={`Your api key is used to request profile information from NextDNS. We perform read only requests on your behalf. ${' '} All api keys are stored in a secure manner. You can revoke this key at any time in your profile settings.`}
            bordered
            onChange={handleChange}
            size="lg"
            label="NextDNS Api Key"
            fullWidth
            type="password"
            required
            value={userInfo.apiKey}
          />
          <Spacer />
          <Button type="submit">Update Account</Button>
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
