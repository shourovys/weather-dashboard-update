import { useWeather } from '@/hooks/useWeather';
import getWeatherBG from '@/utils/getWeatherBG';
import React from 'react';
import UserAvatar from '../atomic/UserAvatar';
import SearchLocation from './SearchLocation';
import { Sidebar } from './Sidebar';

interface IMainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => {
  const { weatherData } = useWeather();

  const image = getWeatherBG(weatherData?.weather[0].main || '');
  return (
    <section
      className='relative bg-cover bg-center bg-no-repeat bg-fixed min-h-screen bg-gray-800'
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      {/* Sidebar and content */}
      <div className='container h-full mx-auto md:p-6 2xl:p-10 relative z-10 flex flex-col md:flex-row gap-3 md:gap-5'>
        <Sidebar />
        <main className='w-full space-y-3 md:space-y-5 p-2 md:p-0'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5'>
            <div className='col-span-2 space-y-3 md:space-y-5'>
              <SearchLocation />
            </div>
            <div className='col-span-1 ml-auto hidden md:block'>
              <UserAvatar />
            </div>
          </div>
          {children}
        </main>
      </div>
    </section>
  );
};

export default MainLayout;
