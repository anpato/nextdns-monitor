import { NextPage, NextPageContext } from 'next';
import { BuiltInProviders, Provider } from 'next-auth/providers';
import { getCsrfToken, getProviders } from 'next-auth/react';
import Auth from '../../components/auth';

const SignIn: NextPage<AuthCtx['props']> = ({ csrfToken }) => {
  console.log(csrfToken);
  return <Auth csrfToken={csrfToken} />;
};

export default SignIn;

interface AuthCtx {
  props: {
    csrfToken: string;
  };
}

export async function getServerSideProps(ctx: NextPageContext) {
  const csrf = await getCsrfToken(ctx);

  return {
    props: {
      csrfToken: csrf
    }
  };
}
