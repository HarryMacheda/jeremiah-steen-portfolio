import { Outlet } from 'react-router-dom';
import { Navigation } from './navigation';

export function Layout() {
  return (
    <>
      <Navigation />
      <main style={{ marginTop: '200px' }}>
        <Outlet />
      </main>
    </>
  );
}
