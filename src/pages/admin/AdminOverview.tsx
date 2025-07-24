import React, { useState, useEffect } from 'react';
import { Users, FileText, MessageCircle, Building, TrendingUp, Calendar, DollarSign, Eye, Star } from 'lucide-react';
import { apiService } from '../../services/api';

export default function AdminOverview() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProjects: 0,
    totalContacts: 0,
    totalFormalisations: 0,
    totalBlogs: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setIsLoading(true);
    try {
      // Load various statistics
      const [
        usersRes,
        projectsRes,
        contactsRes,
        formalisationsRes,
        blogsRes,
        productsRes,
        successStoriesRes
      ] = await Promise.all([
        apiService.getAllUsers().catch((error) => {
          console.error('Failed to load users in overview:', error);
          return { success: false, data: { users: [] } };
        }),
        apiService.getProjects().catch(() => ({ success: false, data: { projects: [] } })),
        apiService.getContacts().catch(() => ({ success: false, data: { contacts: [] } })),
        apiService.getFormalisations().catch(() => ({ success: false, data: { formalisations: [] } })),
        apiService.getBlogs().catch(() => ({ success: false, data: { blogs: [] } })),
        apiService.getProducts().catch(() => ({ success: false, data: { products: [] } })),
        apiService.getSuccessStories().catch(() => ({ success: false, data: { data: [] } }))
      ]);

      setStats({
        totalUsers: usersRes.success ? usersRes.data?.users?.length || 0 : 0,
        totalProjects: projectsRes.success ? projectsRes.data?.projects?.length || 0 : 0,
        totalContacts: contactsRes.success ? contactsRes.data?.contacts?.length || 0 : 0,
        totalFormalisations: formalisationsRes.success ? formalisationsRes.data?.formalisations?.length || 0 : 0,
        totalBlogs: blogsRes.success ? blogsRes.data?.blogs?.length || 0 : 0,
        totalProducts: productsRes.success ? productsRes.data?.products?.length || 0 : 0,
        totalSuccessStories: successStoriesRes.success ? (successStoriesRes.data?.data?.length || 0) : 0,
        totalOrders: 0, // Will be updated when orders API is available
        totalRevenue: 0 // Will be calculated from orders
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Utilisateurs',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Projets',
      value: stats.totalProjects,
      icon: FileText,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Contacts',
      value: stats.totalContacts,
      icon: MessageCircle,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
    {
      title: 'Formalisations',
      value: stats.totalFormalisations,
      icon: Building,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'Articles Blog',
      value: stats.totalBlogs,
      icon: Eye,
      color: 'bg-indigo-500',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600'
    },
    {
      title: 'Success Stories',
      value: stats.totalSuccessStories,
      icon: Star,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Produits',
      value: stats.totalProducts,
      icon: TrendingUp,
      color: 'bg-pink-500',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600'
    },
    {
      title: 'Commandes',
      value: stats.totalOrders,
      icon: Calendar,
      color: 'bg-teal-500',
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-600'
    },
    {
      title: 'Revenus',
      value: `${stats.totalRevenue.toLocaleString()} FCFA`,
      icon: DollarSign,
      color: 'bg-emerald-500',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600'
    }
  ];

  const quickActions = [
    {
      title: 'Créer un projet',
      description: 'Ajouter un nouveau projet',
      icon: FileText,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      title: 'Créer un article',
      description: 'Publier un nouvel article',
      icon: Eye,
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      title: 'Créer une success story',
      description: 'Publier une nouvelle success story',
      icon: Star,
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      title: 'Ajouter un produit',
      description: 'Nouveau produit marketplace',
      icon: TrendingUp,
      color: 'bg-orange-600 hover:bg-orange-700'
    },
    {
      title: 'Gérer les utilisateurs',
      description: 'Administration des comptes',
      icon: Users,
      color: 'bg-purple-600 hover:bg-purple-700'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Tableau de bord administrateur</h1>
        <p className="text-blue-100">
          Gérez votre plateforme PRF depuis cette interface centralisée
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className={`${stat.bgColor} rounded-lg p-4 lg:p-6 border border-gray-200`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">{stat.title}</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-900">
                  {isLoading ? (
                    <div className="animate-pulse bg-gray-300 h-6 lg:h-8 w-12 lg:w-16 rounded"></div>
                  ) : (
                    stat.value
                  )}
                </p>
              </div>
              <div className={`${stat.bgColor} p-2 lg:p-3 rounded-full`}>
                <stat.icon className={`h-5 w-5 lg:h-6 lg:w-6 ${stat.textColor}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-lg lg:text-xl font-bold text-gray-900 mb-4 lg:mb-6">Actions rapides</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className={`${action.color} text-white p-4 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg`}
            >
              <action.icon className="h-6 w-6 mb-2 mx-auto" />
              <h3 className="font-semibold text-sm lg:text-base text-center">{action.title}</h3>
              <p className="text-xs opacity-90 hidden lg:block text-center mt-1">{action.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg lg:text-xl font-bold text-gray-900 mb-4">Activité récente</h2>
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
              <Users className="h-5 w-5 text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Nouvel utilisateur inscrit</p>
                <p className="text-xs text-gray-600">Il y a 2 heures</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-green-50 rounded-lg">
              <FileText className="h-5 w-5 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Nouveau projet créé</p>
                <p className="text-xs text-gray-600">Il y a 4 heures</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-orange-50 rounded-lg">
              <MessageCircle className="h-5 w-5 text-orange-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Nouveau message de contact</p>
                <p className="text-xs text-gray-600">Il y a 6 heures</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg lg:text-xl font-bold text-gray-900 mb-4">Statistiques du mois</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Nouveaux utilisateurs</span>
              <span className="font-bold text-blue-600">+{Math.floor(stats.totalUsers * 0.3)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Demandes de contact</span>
              <span className="font-bold text-orange-600">+{Math.floor(stats.totalContacts * 0.8)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Formalisations</span>
              <span className="font-bold text-purple-600">+{Math.floor(stats.totalFormalisations * 0.9)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Articles publiés</span>
              <span className="font-bold text-green-600">+{Math.floor(stats.totalBlogs * 0.4)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}