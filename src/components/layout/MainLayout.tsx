import React from 'react';
import { Sidebar } from './Sidebar';

interface IMainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => {
  return (
    <main
      className='relative bg-cover bg-center'
      // style={{ backgroundImage: "url('/images/bg/clear_day.jpg')" }}
      style={{ backgroundImage: "url('/images/bg/rain_day.jpg')" }}
    >
      {/* Sidebar and content */}
      <div className='container h-screen mx-auto md:px-6 md:py-6 2xl:py-10 overflow-x-hidden relative z-10 flex flex-col md:flex-row max-md:flex-col-reverse gap-3 md:gap-5'>
        <Sidebar />
        {children}
      </div>
    </main>
  );
};

export default MainLayout;
