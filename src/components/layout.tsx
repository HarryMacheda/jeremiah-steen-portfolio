import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navigation } from './navigation';

export function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Navigation />
      <main style={{ marginTop: '200px' }}>
        <Outlet />
      </main>
    </>
  );
}
