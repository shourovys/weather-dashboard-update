import { Button } from '@/components/atomic/Button';
import { Link, useNavigate } from 'react-router-dom';

interface IProps {
  statusCode?: string;
  title?: string;
  message?: string;
  buttonText?: string;
  buttonLink?: string;
}

function HelperPages({
  statusCode = '404',
  title = "Sorry, we couldn't find this page.",
  message = "But don't worry, you can find plenty of other things on our home page.",
  buttonText = 'Go Back',
  buttonLink,
}: IProps) {
  const navigate = useNavigate();

  return (
    <section className='flex items-center p-16 md:py-36 bg-coolGray-900 text-coolGray-100'>
      <div className='container flex flex-col items-center justify-center px-5 mx-auto my-8'>
        <div className='max-w-md text-center'>
          <h2 className='mb-8 font-extrabold text-9xl text-coolGray-600'>
            <span className='sr-only'>Error</span>
            {statusCode}
          </h2>
          <p className='text-2xl font-semibold md:text-3xl'>{title}</p>
          <p className='mt-4 mb-8 text-coolGray-400'>{message}</p>
          {buttonLink ? (
            <Button asChild>
              <Link to={buttonLink}>{buttonText}</Link>
            </Button>
          ) : (
            <Button onClick={() => navigate(-1)}>{buttonText}</Button>
          )}
        </div>
      </div>
    </section>
  );
}

export default HelperPages;
