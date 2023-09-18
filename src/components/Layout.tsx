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
        <div className='h-[10vh] '>
          <Navbar />
        </div>
      )}
      <main>{children}</main>
    </>
  );
};

export default Layout;
