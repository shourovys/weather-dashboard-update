import MainLayout from '@/components/layout/MainLayout';
import { SWRConfig } from 'swr';
import { swrConfig } from './api/swrConfig';
import { Toaster } from './components/common/Toasters';
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
            <RenderRoutes routes={ReactRoutes} />
          </MainLayout>
          <Toaster />
        </WeatherProvider>
      </AuthProvider>
    </SWRConfig>
  );
}

export default App;
