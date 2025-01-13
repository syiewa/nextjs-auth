import AuthForm from '@/components/auth-form';

export default async function Home({searchParams}: {searchParams: Promise<{mode?: string}>}) {
  const formMode = (await searchParams).mode || 'login';
  return <AuthForm mode={formMode} />;
}
