import { Card } from '@/components/common/CardElements';
import LoadingSvg from '@/components/loading/atomic/LoadingSvg';
import { useWeather } from '@/hooks/useWeather';
import LocationCard from './LocationCard';

const SavedLocations = () => {
  const { savedLocationsData, savedLocationsLoading } = useWeather();

  if (savedLocationsLoading && !savedLocationsData) {
    return (
      <Card className='w-full min-h-60 md:min-h-64 flex items-center justify-center blur-bg'>
        <LoadingSvg className='w-10 h-10' />
      </Card>
    );
  }

  if (!savedLocationsData) {
    return (
      <Card className='w-full min-h-60 md:min-h-64 h-full flex items-center justify-center blur-bg'>
        <h1 className='text-textSecondary text-3xl'>No Data Available!</h1>
      </Card>
    );
  }
  return (
    <section className='space-y-3 md:space-y-5'>
      {savedLocationsData?.map((location) => (
        <LocationCard key={location.id} location={location} />
      ))}
    </section>
  );
};

export default SavedLocations;
