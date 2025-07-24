import React from 'react';
import { Link } from 'react-router-dom';
import { Home, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function AdminHeader() {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo and Admin Title */}
          <div className="flex items-center space-x-2 lg:space-x-4 min-w-0">
            <img 
              src="https://i.imgur.com/igx1kpI.png" 
              alt="PRF Logo" 
              className="h-6 sm:h-7 lg:h-8 w-auto object-contain rounded-md flex-shrink-0"
            />
            <div className="min-w-0">
              <h1 className="text-sm sm:text-base lg:text-xl font-bold text-gray-900 truncate">
                <span className="hidden lg:inline">Administration </span>PRF
              </h1>
              <p className="text-xs text-gray-600 hidden sm:block lg:block">
                <span className="hidden lg:inline">Tableau de bord </span>administrateur
              </p>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3 flex-shrink-0">
            {/* Return to Site Button */}
            <Link
              to="/"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 text-xs sm:text-sm"
            >
              <Home className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="ml-1 sm:ml-2 hidden xs:inline">Retour</span>
              <span className="hidden sm:inline"> au site</span>
            </Link>

            {/* Admin User Info */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
              </div>
              <div className="hidden sm:block min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-900 truncate max-w-20 lg:max-w-32 xl:max-w-none">
                  {user?.name || 'Administrateur'}
                </p>
                <p className="text-xs text-gray-600 hidden lg:block">Admin</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}