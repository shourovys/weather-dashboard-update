import MainLayout from '@/components/layout/MainLayout';
import SearchLocation from '@/components/layout/SearchLocation';
import Weather from '@/pages/Weather';
import { SWRConfig } from 'swr';
import { swrConfig } from './api/swrConfig';
import AuthProvider from './context/authContext';
import { WeatherProvider } from './context/weatherContext';
import { RenderRoutes } from './routes/RenderRoutes';
import { ReactRoutes } from './routes/routes';

function App() {
  return (
    <SWRConfig value={swrConfig}>
      <AuthProvider>
        <WeatherProvider>
          <MainLayout>
            <div className='grid grid-cols-3'>
              <div className='col-span-2 space-y-3 md:space-y-5'>
                <SearchLocation />
                <Weather />
                <RenderRoutes routes={ReactRoutes} />
              </div>
            </div>
          </MainLayout>
        </WeatherProvider>
      </AuthProvider>
    </SWRConfig>
  );
}

export default App;
