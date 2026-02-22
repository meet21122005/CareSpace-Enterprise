import { Helmet } from 'react-helmet-async';
import { FloatingBlobs } from '../components/login/FloatingBlobs';
import { LeftSection } from '../components/login/LeftSection';
import { MobileHeader } from '../components/login/MobileHeader';
import { MobileBanner } from '../components/login/MobileBanner';
import { LoginCard } from '../components/login/LoginCard';

export const LoginPage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-50 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900 pt-12 md:pt-14 lg:pt-16 xl:pt-20">
      <Helmet>
        <title>Login | Carespace India</title>
        <meta
          name="description"
          content="Sign in to your Carespace account to manage rentals, support, and patient care logistics."
        />
      </Helmet>

      <MobileHeader />
      <FloatingBlobs />

      <div className="relative z-10 min-h-screen grid lg:grid-cols-2">
        <LeftSection />

        <div className="flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
          <MobileBanner />
          <LoginCard />
        </div>
      </div>
    </div>
  );
};
