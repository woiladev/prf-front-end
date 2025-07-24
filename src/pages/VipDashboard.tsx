import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Crown, Users, ShoppingBag, BookOpen, Award, Calendar, TrendingUp, Banknote } from 'lucide-react';
import { useSubscription } from '../contexts/SubscriptionContext';
import { apiService, Project, Order } from '../services/api';

export default function VipDashboard() {
  const { subscription, subscriptions, renewSubscription, loadSubscriptions } = useSubscription();
  const [projects, setProjects] = useState<Project[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [projectsRes] = await Promise.all([
        apiService.getProjects(),
        // apiService.getOrders() // Temporarily disabled
      ]);
      
      if (projectsRes.success && projectsRes.data) {
        setProjects(projectsRes.data.projects);
      }
      // if (ordersRes.success && ordersRes.data) {
      //   setOrders(ordersRes.data.orders);
      // }
      
      // await loadSubscriptions(); // Temporarily disabled
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const stats = [
    { icon: BookOpen, label: 'Projets disponibles', value: projects.length.toString() },
    { icon: ShoppingBag, label: 'Commandes', value: orders.length.toString() },
    { icon: Award, label: 'Abonnements', value: subscriptions.length.toString() },
    { icon: Users, label: 'Statut VIP', value: subscription?.status === 'active' ? 'Actif' : 'Inactif' }
  ];

  const quickActions = [
    { icon: BookOpen, title: 'Parcourir les projets VIP', description: 'Accédez à tous les projets premium', link: '/projects' },
    { icon: ShoppingBag, title: 'Marketplace premium', description: 'Vendez vos produits et services', link: '/marketplace' },
    { icon: Users, title: 'Consulter un expert', description: 'Échangez avec nos experts sectoriels', link: '/experts' },
    { icon: Award, title: 'Formalisation', description: 'Structurez votre entreprise', link: '/formalization' },
    { icon: Calendar, title: 'Blog & Ressources', description: 'Accédez aux guides et conseils', link: '/blog' },
    { icon: TrendingUp, title: 'Success Stories', description: 'Inspirez-vous des réussites', link: '/success-stories' }
  ];

  const recentProjects = projects.slice(0, 3).map((project, index) => ({
    id: project.id,
    title: project.name,
    category: project.is_free ? 'Gratuit' : 'Premium',
    progress: 50 + (index * 20), // Mock progress
    image: project.image_url ? `https://ghvtest.ghvcameroon.com${project.image_url}` : 'https://static.vecteezy.com/system/resources/previews/048/238/573/non_2x/abstract-futuristic-technology-blank-wallpaper-free-vector.jpg'
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="relative bg-gradient-to-r from-blue-600 to-green-600 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-black/70"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop')`
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-blue-900/30 to-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/25 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-green-500/20 rounded-full blur-2xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-4">
                <Crown className="h-8 w-8 text-orange-300 mr-3" />
                <h1 className="text-4xl font-bold drop-shadow-2xl text-shadow-glow">Tableau de bord</h1>
              </div>
              <p className="text-xl text-white drop-shadow-xl text-shadow-glow">
                Bienvenue dans votre espace privilégié, accédez à tous nos contenus premium
              </p>
            </div>
            </div>
          </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Chargement des données...</p>
            </div>
          ) : (
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full mb-4">
                  <stat.icon className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
          )}
        </div>
      </section>


      {/* Recent Projects */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Projets récents</h2>
            <Link
              to="/projects"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Voir tous les projets
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {recentProjects.map((project) => (
              <div key={project.id} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-12 h-12 rounded-lg object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{project.title}</h3>
                    <p className="text-sm text-gray-600">{project.category}</p>
                  </div>
                </div>
                
                <Link
                  to={`/projects/${project.id}`}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Voir les détails
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* My Subscriptions */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Mes abonnements</h2>
          
          {subscriptions.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subscriptions.map((sub) => (
                <div key={sub.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Plan {sub.subscription_level}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      sub.payment_status === 'success' ? 'bg-green-100 text-green-800' :
                      sub.payment_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {sub.payment_status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Opérateur: {sub.operator.toUpperCase()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Date: {sub.created_at ? new Date(sub.created_at).toLocaleDateString('fr-FR') : 'N/A'}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">Aucun abonnement trouvé</p>
              <Link
                to="/projects"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Explorer les projets
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Subscription Status */}
      <section className="py-12 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Votre abonnement VIP
                </h2>
                <p className="text-gray-600 mb-4">
                  Profitez de tous les avantages de votre abonnement premium
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">
                      Expire le: {subscription?.expiryDate ? new Date(subscription.expiryDate).toLocaleDateString('fr-FR') : 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-sm text-green-600">
                      Statut: {subscription?.status === 'active' ? 'Actif' : 'Inactif'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <button
                  onClick={renewSubscription}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Renouveler
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}