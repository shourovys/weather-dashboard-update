import GitHubLoginButton from '@/components/pages/login/GitHubLogin';
import GoogleLoginButton from '@/components/pages/login/GoogleLogIn';

const AuthCard: React.FC = () => {
  return (
    <div>
      <div className='flex flex-col items-center'>
        <img
          src='/images/logo.png'
          loading='lazy'
          className='w-28 h-28'
          alt='logo'
        />
        <h2 className='text-2xl text-textPrimary font-bold text-center leading-10'>
          Bringing Sunshine to <br />
          Your Screen.
        </h2>
      </div>
      <div className='mt-10 grid space-y-4'>
        <GoogleLoginButton />
        <GitHubLoginButton />
      </div>
      <div className='mt-10 space-y-4 py-3 text-textSecondary text-center'>
        <p className='text-xs'>
          By proceeding, you agree to our{' '}
          <a href='/privacy-policy/' className='underline'>
            Terms of Use
          </a>{' '}
          and confirm you have read our{' '}
          <a href='/privacy-policy/' className='underline'>
            Privacy and Cookie Statement
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default AuthCard;
