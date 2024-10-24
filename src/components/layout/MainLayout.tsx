import React from 'react';
import UserAvatar from '../atomic/UserAvatar';
import SearchLocation from './SearchLocation';
import { Sidebar } from './Sidebar';

interface IMainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => {
  return (
    <section
      className='relative bg-cover bg-center'
      // style={{ backgroundImage: "url('/images/bg/clear_day.jpg')" }}
      style={{ backgroundImage: "url('/images/bg/rain_day.jpg')" }}
    >
      {/* Sidebar and content */}
      <div className='container h-screen mx-auto md:p-6 2xl:p-10 overflow-x-hidden relative z-10 flex flex-col md:flex-row max-md:flex-col-reverse gap-3 md:gap-5'>
        <Sidebar />
        <main className='w-full space-y-3 md:space-y-5'>
          <div className='grid grid-cols-3 gap-3 md:gap-5'>
            <div className='col-span-2 space-y-3 md:space-y-5'>
              <div className='flex items-center'>
                <SearchLocation />
              </div>
            </div>
            <div className='col-span-1 ml-auto'>
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
