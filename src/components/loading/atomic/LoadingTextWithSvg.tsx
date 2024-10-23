import LoadingSvg from './LoadingSvg';

interface IProps {
  className?: string;
}

function LoadingTextWithSvg({ className }: IProps) {
  return (
    <>
      <LoadingSvg className={className} />
      Loading...
    </>
  );
}

export default LoadingTextWithSvg;
