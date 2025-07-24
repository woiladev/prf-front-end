import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  FileText, 
  MessageCircle, 
  Building, 
  Eye, 
  TrendingUp,
  Home,
  Mail,
  Settings,
  Tag,
  Crown,
  Layers,
  Package,
  Star,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AdminHeader from '../components/AdminHeader';
import AdminOverview from './admin/AdminOverview';
import ContactManagement from './admin/ContactManagement';
import FormalisationManagement from './admin/FormalisationManagement';
import BlogManagement from './admin/BlogManagement';
import ProductManagement from './admin/ProductManagement';
import UserManagement from './admin/UserManagement';
import NewsletterManagement from './admin/NewsletterManagement';
import SettingsManagement from './admin/SettingsManagement';
import ExpertManagement from './admin/ExpertManagement';
import CategoryManagement from './admin/CategoryManagement';
import SuccessStoryManagement from './admin/SuccessStoryManagement';
import ProjectManagement from './admin/ProjectManagement';
import StepsManagement from './admin/StepsManagement';
import SubscriptionsManagement from './admin/SubscriptionsManagement';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Check if user is admin, if not redirect to home
  useEffect(() => {
    if (user && user.role !== 'admin') {
      navigate('/');
    } else if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Vérification des permissions...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', name: 'Vue d\'ensemble', icon: Home },
    { id: 'contacts', name: 'Contacts', icon: MessageCircle },
    { id: 'formalisations', name: 'Formalisations', icon: Building },
    { id: 'blogs', name: 'Blog', icon: Eye },
    { id: 'projects', name: 'Projets', icon: FileText },
    { id: 'products', name: 'Produits', icon: TrendingUp },
    { id: 'experts', name: 'Experts', icon: Users },
    { id: 'categories', name: 'Catégories', icon: Tag },
    { id: 'success-stories', name: 'Success Stories', icon: Star },
    { id: 'steps', name: 'Étapes', icon: Layers },
    { id: 'subscriptions', name: 'Abonnements', icon: Crown },
    { id: 'orders', name: 'Commandes', icon: Package },
    { id: 'users', name: 'Utilisateurs', icon: Users },
    { id: 'newsletter', name: 'Newsletter', icon: Mail }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-safe">
      <AdminHeader />
      
      <div className="flex flex-col lg:flex-row relative">
        {/* Mobile Menu Button */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 sticky top-16 z-40">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center justify-between w-full text-left p-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="flex items-center">
              <Menu className="h-5 w-5 mr-3 text-gray-600" />
              <span className="font-medium text-gray-900">
                {tabs.find(tab => tab.id === activeTab)?.name || 'Menu'}
              </span>
            </div>
            <div className="flex items-center">
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-gray-600" />
              ) : (
                <>
                  <span className="text-xs text-gray-500 mr-2 hidden sm:inline">Ouvrir menu</span>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                </>
              )}
            </div>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="fixed inset-y-0 left-0 w-80 max-w-[90vw] bg-white shadow-2xl transform transition-transform duration-300 ease-out">
              <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img 
                      src="https://i.imgur.com/igx1kpI.png" 
                      alt="PRF Logo" 
                      className="h-8 w-auto object-contain mr-3 rounded-md"
                    />
                    <h2 className="text-lg font-bold text-gray-900">Administration</h2>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  Connecté en tant que: <span className="font-medium">{user?.name || 'Admin'}</span>
                </div>
              </div>
              
              <div className="p-3 overflow-y-auto max-h-[calc(100vh-120px)] scrollbar-hide">
                <nav className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center px-3 py-3 text-left rounded-xl transition-all duration-200 hover:scale-105 ${
                          activeTab === tab.id
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg border-l-4 border-white'
                            : 'text-gray-600 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 hover:text-gray-900 hover:shadow-md'
                        }`}
                      >
                        <Icon className={`h-5 w-5 mr-3 flex-shrink-0 ${
                          activeTab === tab.id ? 'text-white' : 'text-gray-500'
                        }`} />
                        <span className="font-medium text-sm">{tab.name}</span>
                        {activeTab === tab.id && (
                          <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        )}
                      </button>
                    );
                  })}
                </nav>
                
                {/* Mobile Menu Footer */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="space-y-2">
                    <a
                      href="/"
                      className="w-full flex items-center px-3 py-2 text-left rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Home className="h-4 w-4 mr-3" />
                      Retour au site
                    </a>
                    <button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                        navigate('/');
                      }}
                      className="w-full flex items-center px-3 py-2 text-left rounded-lg text-red-600 hover:bg-red-50 transition-colors text-sm"
                    >
                      <span className="mr-3">🚪</span>
                      Se déconnecter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sidebar */}
        <div className="hidden lg:flex lg:flex-col w-64 xl:w-72 bg-white shadow-lg min-h-screen lg:sticky lg:top-16 z-30 border-r border-gray-200">
          <div className="p-4 xl:p-6">
            <div className="flex items-center mb-6">
              <img 
                src="https://i.imgur.com/igx1kpI.png" 
                alt="PRF Logo" 
                className="h-8 w-auto object-contain mr-3 rounded-md"
              />
              <h2 className="text-lg xl:text-xl font-bold text-gray-900">Administration</h2>
            </div>
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 xl:px-4 py-2.5 xl:py-3 text-left rounded-xl transition-all duration-200 hover:scale-105 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 hover:text-gray-900 hover:shadow-md'
                    }`}
                  >
                    <Icon className={`h-4 w-4 xl:h-5 xl:w-5 mr-2 xl:mr-3 flex-shrink-0 ${
                      activeTab === tab.id ? 'text-white' : 'text-gray-500'
                    }`} />
                    <span className="font-medium text-sm xl:text-base">{tab.name}</span>
                    {activeTab === tab.id && (
                      <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    )}
                  </button>
                );
              })}
            </nav>
            
            {/* Desktop Sidebar Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="space-y-2">
                <div className="text-xs text-gray-500 mb-2">Connecté en tant que:</div>
                <div className="text-sm font-medium text-gray-900 truncate">{user?.name || 'Admin'}</div>
                <div className="text-xs text-gray-500 truncate">{user?.email}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-h-screen bg-gray-50">
          <div className="p-3 sm:p-4 lg:p-6 max-w-full overflow-hidden">
            {activeTab === 'overview' && (
              <AdminOverview />
            )}

            {activeTab === 'contacts' && (
              <ContactManagement />
            )}

            {activeTab === 'formalisations' && (
              <FormalisationManagement />
            )}

            {activeTab === 'blogs' && (
              <BlogManagement />
            )}

            {activeTab === 'projects' && (
              <ProjectManagement />
            )}

            {activeTab === 'products' && (
              <ProductManagement />
            )}

            {activeTab === 'experts' && (
              <ExpertManagement />
            )}

            {activeTab === 'categories' && (
              <CategoryManagement />
            )}

            {activeTab === 'success-stories' && (
              <SuccessStoryManagement />
            )}

            {activeTab === 'steps' && (
              <StepsManagement />
            )}

            {activeTab === 'subscriptions' && (
              <SubscriptionsManagement />
            )}

            {activeTab === 'orders' && (
              <OrdersManagement />
            )}

            {activeTab === 'users' && (
              <UserManagement />
            )}

            {activeTab === 'newsletter' && (
              <NewsletterManagement />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}