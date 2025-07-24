import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import AnnouncementBanner from './AnnouncementBanner';

export default function Layout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-gray-50">
      {!isAdminRoute && <AnnouncementBanner />}
      {!isAdminRoute && <Header />}
      <main>
        <Outlet />
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}