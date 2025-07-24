import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Crown } from 'lucide-react';
import { NAVIGATION } from '../../config/routes';
import { useAuth } from '../../contexts/AuthContext';
import { useSubscription } from '../../contexts/SubscriptionContext';
import { apiService, Category } from '../../services/api';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isProjectsDropdownOpen: boolean;
  setIsProjectsDropdownOpen: (open: boolean) => void;
  isActivePath: (path: string) => boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  isProjectsDropdownOpen,
  setIsProjectsDropdownOpen,
  isActivePath,
}) => {
  const { user, isAuthenticated } = useAuth();
  const { isVip } = useSubscription();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (isOpen) {
      loadCategories();
    }
  }, [isOpen]);

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

  // Combine API categories with static fallback
  const allCategories = [
    ...categories.map(cat => ({
      id: cat.name.toLowerCase().replace(/\s+/g, '-'),
      name: cat.name,
      description: cat.description || `Projets ${cat.name.toLowerCase()}`
    }))
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Menu */}
      <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-200 z-50 max-h-[80vh] overflow-y-auto">
        <div className="px-4 py-6 space-y-1">
          {NAVIGATION.map((item) => (
            <div key={item.name}>
              {item.hasDropdown ? (
                <div>
                  <button
                    onClick={() => setIsProjectsDropdownOpen(!isProjectsDropdownOpen)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                      isActivePath(item.href)
                        ? 'text-orange-600 bg-gradient-to-r from-orange-50 to-red-50 shadow-md'
                        : 'text-gray-700 hover:text-orange-600 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="h-5 w-5 mr-3">📁</span>
                      {item.name}
                    </div>
                    <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${
                      isProjectsDropdownOpen ? 'rotate-180' : ''
                    }`} />
                  </button>
                  
                  {isProjectsDropdownOpen && item.dropdownItems && (
                    <div className="ml-8 mt-2 space-y-1 bg-gray-50 rounded-lg p-2">
                      {/* All Projects Link */}
                      <Link
                        to="/projects"
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-orange-600 hover:bg-white rounded-lg transition-all duration-200 hover:shadow-sm"
                        onClick={() => {
                          onClose();
                          setIsProjectsDropdownOpen(false);
                        }}
                      >
                        <div>
                          <div className="font-medium">📋 Toutes les initiatives</div>
                          <div className="text-xs text-gray-500 mt-1">Voir toutes les initiatives</div>
                        </div>
                      </Link>

                      {/* Categories from API */}
                      {allCategories.map((category) => (
                        <Link
                          key={category.id}
                          to={`/projects?category=${category.id}`}
                          className="block px-3 py-2 text-sm text-gray-600 hover:text-orange-600 hover:bg-white rounded-lg transition-all duration-200 hover:shadow-sm"
                          onClick={() => {
                            onClose();
                            setIsProjectsDropdownOpen(false);
                          }}
                        >
                          <div>
                            <div className="font-medium">🏷️ {category.name}</div>
                            <div className="text-xs text-gray-500 mt-1">{category.description}</div>
                          </div>
                        </Link>
                      ))}

                      {/* Static dropdown items */}
                      {item.dropdownItems.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          to={dropdownItem.href}
                          className="block px-3 py-2 text-sm text-gray-600 hover:text-orange-600 hover:bg-white rounded-lg transition-all duration-200 hover:shadow-sm"
                          onClick={() => {
                            onClose();
                            setIsProjectsDropdownOpen(false);
                          }}
                        >
                          <div>
                            <div className="font-medium">📁 {dropdownItem.name}</div>
                            <div className="text-xs text-gray-500 mt-1">{dropdownItem.description}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.href}
                  className={`flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                    isActivePath(item.href)
                      ? 'text-orange-600 bg-gradient-to-r from-orange-50 to-red-50 shadow-md'
                      : 'text-gray-700 hover:text-orange-600 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:shadow-md'
                  }`}
                  onClick={onClose}
                >
                  <span className="h-5 w-5 mr-3">
                    {item.icon === 'Home' && '🏠'}
                    {item.icon === 'Users' && '👥'}
                    {item.icon === 'ShoppingBag' && '🛍️'}
                    {item.icon === 'Building' && '🏢'}
                    {item.icon === 'Star' && '⭐'}
                    {item.icon === 'BookOpen' && '📚'}
                    {item.icon === 'HelpCircle' && '❓'}
                    {item.icon === 'MessageCircle' && '💬'}
                  </span>
                  <span>{item.name}</span>
                  {isActivePath(item.href) && (
                    <div className="ml-auto w-2 h-2 bg-orange-500 rounded-full"></div>
                  )}
                </Link>
              )}
            </div>
          ))}
          
          {/* Mobile VIP Badge */}
          {isVip && (
            <div className="px-4 py-3 border-t border-gray-200 mt-4">
              <div className="flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg">
                <Crown className="h-4 w-4 mr-1" />
                <span>Membre VIP Actif</span>
                <div className="ml-2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
          )}
          
          {/* Mobile User Actions */}
          {isAuthenticated && (
            <div className="px-4 py-3 border-t border-gray-200 mt-4">
              <div className="bg-gray-50 rounded-xl p-3">
                <div className="text-sm text-gray-600 mb-2">Connecté en tant que:</div>
                <div className="font-semibold text-gray-900">{user?.name || 'Utilisateur'}</div>
                <div className="text-xs text-gray-500">{user?.email}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
        onClick={() => {
          onClose();
          setIsProjectsDropdownOpen(false);
        }}
      />
    </>
  );
};

export default MobileMenu;