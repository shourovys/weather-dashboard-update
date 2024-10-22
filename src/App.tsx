import MainLayout from '@/components/layout/MainLayout';
import SearchLocation from '@/components/layout/SearchLocation';
import Weather from '@/pages/Weather';
import { SWRConfig } from 'swr';
import { swrConfig } from './api/swrConfig';
import { WeatherProvider } from './context/weatherContext';

function App() {
  return (
    <SWRConfig value={swrConfig}>
      <WeatherProvider>
        <MainLayout>
          <div className='grid grid-cols-3'>
            <div className='col-span-2 space-y-3 md:space-y-5'>
              <SearchLocation />
              <Weather />
            </div>
          </div>
        </MainLayout>
      </WeatherProvider>
    </SWRConfig>
  );
}

export default App;
