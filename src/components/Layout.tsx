import BottomBar from 'components/BottomBar'; // Asegúrate de importar tu nuevo BottomBar
import Navbar from 'components/Navbar';
import { useRouter } from 'next/router';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const { asPath } = router;
  const noNav = ['/login'];

  return (
    <>
      {noNav.includes(asPath) ? null : (
        <div>
          <div className=' md:hidden'>
            <BottomBar /> {/* Muestra BottomBar en pantallas pequeñas */}
          </div>
          <div className='hidden md:block md:h-[10vh]'>
            <Navbar /> {/* Muestra Navbar en pantallas medianas y mayores */}
          </div>
        </div>
      )}
      <main>{children}</main>
    </>
  );
};

export default Layout;
