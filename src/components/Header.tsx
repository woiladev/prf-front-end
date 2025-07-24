import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Crown, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useSubscription } from '../contexts/SubscriptionContext';
import { NAVIGATION } from '../config/routes';
import { APP_CONFIG } from '../config/constants';
import { MobileMenu, UserMenu } from './navigation';
import CartIcon from './CartIcon';
import { apiService, Category } from '../services/api';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const { user, logout, isAuthenticated } = useAuth();
  const { isVip } = useSubscription();
  const location = useLocation();
  
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await apiService.getCategories();
      if (response.success && response.data) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const isActivePath = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  // Static categories for fallback
  const staticCategories = [
    { id: 'agriculture', name: 'Agriculture et Rural', description: 'Projets agricoles et développement rural' },
    { id: 'jeunesse', name: 'Jeunesse et Formation', description: 'Programmes pour les jeunes entrepreneurs' },
    { id: 'pme', name: 'PME et Artisanat', description: 'Support aux petites entreprises' },
    { id: 'infrastructure', name: 'Infrastructure', description: 'Projets d\'équipement et infrastructure' },
    { id: 'financement', name: 'Financement', description: 'Accès au crédit et financement' },
    { id: 'cooperatives', name: 'Coopératives', description: 'Création et gestion de coopératives' },
  ];

  // Combine API categories with static categories
  const allCategories = [
    ...categories.map(cat => ({
      id: cat.name.toLowerCase().replace(/\s+/g, '-'),
      name: cat.name,
      description: cat.description || `Projets dans le domaine ${cat.name.toLowerCase()}`
    })),
    ...staticCategories.filter(staticCat => 
      !categories.some(apiCat => 
        apiCat.name.toLowerCase().includes(staticCat.name.toLowerCase().split(' ')[0])
      )
    )
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 lg:space-x-3">
              <img 
                src={APP_CONFIG.LOGO_URL} 
                alt={`${APP_CONFIG.NAME} Logo`} 
                className="h-10 lg:h-12 w-auto object-contain rounded-lg"
              />
              <div className="hidden sm:block">
                <div className="text-xs sm:text-sm lg:text-base font-bold text-gray-900 leading-tight">
                  <span className="lg:hidden">Promotion et Recherche</span>
                </div>
                <div className="text-xs lg:text-sm text-gray-600 leading-tight">
                  <span className="lg:hidden">de Financement</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1 xl:space-x-2">
            {NAVIGATION.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <div className="relative">
                    <button
                      onClick={() => setIsProjectsDropdownOpen(!isProjectsDropdownOpen)}
                      onMouseEnter={() => setIsProjectsDropdownOpen(true)}
                      className={`flex items-center px-3 xl:px-4 py-2 rounded-lg text-sm xl:text-base font-medium transition-all duration-200 relative group ${
                        isActivePath(item.href)
                          ? 'text-orange-600 bg-orange-50'
                          : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                      }`}
                    >
                      {item.name}
                      <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                        isProjectsDropdownOpen ? 'rotate-180' : ''
                      }`} />
                      <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 transform transition-transform duration-200 ${
                        isActivePath(item.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}></span>
                    </button>

                    {/* Dropdown Menu */}
                    {isProjectsDropdownOpen && (
                      <div 
                        className="absolute top-full left-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 max-h-96 overflow-y-auto"
                        onMouseLeave={() => setIsProjectsDropdownOpen(false)}
                      >
                        {/* All Projects Link */}
                        <Link
                          to="/projects"
                          className="block px-4 py-3 hover:bg-orange-50 transition-colors group border-b border-gray-100"
                          onClick={() => setIsProjectsDropdownOpen(false)}
                        >
                          <div className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                            📋 Toutes les initiatives
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            Voir toutes les initiatives disponibles
                          </div>
                        </Link>

                        {/* Categories Section */}
                        <div className="px-4 py-2">
                          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                            Par catégorie
                          </div>
                        </div>

                        {/* Dynamic Categories from API */}
                        {allCategories.map((category) => (
                          <Link
                            key={category.id}
                            to={`/projects?category=${category.id}`}
                            className="block px-4 py-3 hover:bg-orange-50 transition-colors group"
                            onClick={() => setIsProjectsDropdownOpen(false)}
                          >
                            <div className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                              🏷️ {category.name}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              {category.description}
                            </div>
                          </Link>
                        ))}

                        {/* Static Categories (fallback) */}
                        {item.dropdownItems?.map((projectType) => (
                          <Link
                            key={projectType.name}
                            to={projectType.href}
                            className="block px-4 py-3 hover:bg-orange-50 transition-colors group border-t border-gray-100"
                            onClick={() => setIsProjectsDropdownOpen(false)}
                          >
                            <div className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                              📁 {projectType.name}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              {projectType.description}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={`px-3 xl:px-4 py-2 rounded-lg text-sm xl:text-base font-medium transition-all duration-200 relative group ${
                      isActivePath(item.href)
                        ? 'text-orange-600 bg-orange-50'
                        : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                    }`}
                  >
                    {item.name}
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 transform transition-transform duration-200 ${
                      isActivePath(item.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}></span>
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Cart Icon */}
            <CartIcon />

            {/* VIP Badge */}
            {isVip && (
              <div className="hidden sm:flex items-center bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-semibold shadow-lg animate-pulse">
                <Crown className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                VIP
              </div>
            )}

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-1 lg:space-x-2 bg-gray-100 hover:bg-gray-200 px-2 lg:px-3 py-1 lg:py-2 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-md"
                >
                  <User className="h-4 w-4 lg:h-5 lg:w-5 text-gray-600" />
                  <span className="hidden sm:block text-sm lg:text-base text-gray-700 font-medium">
                    {user?.name?.split(' ')[0] || 'Utilisateur'}
                  </span>
                </button>

                {isUserMenuOpen && (
                  <UserMenu 
                    isOpen={isUserMenuOpen} 
                    onClose={() => setIsUserMenuOpen(false)} 
                  />
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-orange-600 px-2 lg:px-3 py-1 lg:py-2 rounded-lg text-sm lg:text-base font-medium transition-all duration-200 hover:scale-105"
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-3 lg:px-4 py-1 lg:py-2 rounded-lg text-sm lg:text-base font-medium transition-all duration-200 shadow-lg transform hover:scale-105 hover:shadow-xl"
                >
                  S'inscrire
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <MobileMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          isProjectsDropdownOpen={isProjectsDropdownOpen}
          setIsProjectsDropdownOpen={setIsProjectsDropdownOpen}
          isActivePath={isActivePath}
        />
      </div>

      {/* Click outside to close projects dropdown */}
      {isProjectsDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsProjectsDropdownOpen(false)}
        />
      )}
    </header>
  );
}