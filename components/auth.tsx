import { Button, Card, Grid, Input } from '@nextui-org/react';
import { signIn } from 'next-auth/react';
import { FC, FormEvent, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { SignInWithEmail } from '../shared/services/internal-service';

type IProps = {
  csrfToken: string;
};

const Auth: FC<IProps> = ({ csrfToken }) => {
  const [email, setEmail] = useState<string>('');
  const [redirectUri, setUri] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log(window.location.host);
      setUri(`${window.location.protocol}//${window.location.host}/profiles`);
    }
  }, [redirectUri]);
  const emailMutation = useMutation(
    'SIGNIN',
    async ({ email, csrf }: { email: string; csrf: string }) =>
      await SignInWithEmail(email, csrf),
    {
      onSuccess(data) {
        console.log(data);
      }
    }
  );
  const handleEmailRequest = async (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      signIn('email', { email, callbackUrl: redirectUri });
    }
  };

  return (
    <Card>
      <Card.Body>
        <form onSubmit={handleEmailRequest}>
          <Grid.Container gap={2} alignItems="center" justify="center">
            <Grid>
              <Input type="hidden" name="csrfToken" defaultValue={csrfToken} />
              <Input
                labelLeft="Email"
                bordered
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid>
              <Button type="submit" disabled={!email}>
                Sign In With Email
              </Button>
            </Grid>
          </Grid.Container>
        </form>
      </Card.Body>
    </Card>
  );
};

export default Auth;
