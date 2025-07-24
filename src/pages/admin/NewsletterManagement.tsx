import React, { useState, useEffect } from 'react';
import { Plus, Search, Send, Eye, Trash2, Calendar, Users, Mail, Edit, AlertCircle, CheckCircle } from 'lucide-react';
import { apiService, Newsletter, SubscribedUsersResponse } from '../../services/api';


export default function NewsletterManagement() {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [subscribedUsers, setSubscribedUsers] = useState<SubscribedUsersResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('newsletters');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedNewsletter, setSelectedNewsletter] = useState<Newsletter | null>(null);
  const [formData, setFormData] = useState({
    subject: '',
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    loadNewsletters();
    loadSubscribedUsers();
  }, []);

  const loadNewsletters = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.getNewsletters();
      if (response.success && response.data) {
        setNewsletters(response.data.newsletters);
      }
    } catch (error) {
      console.error('Error loading newsletters:', error);
      showToast('Erreur lors du chargement des newsletters', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const loadSubscribedUsers = async () => {
    try {
      const response = await apiService.getSubscribedUsers();
      if (response.success && response.data) {
        setSubscribedUsers(response.data);
      }
    } catch (error) {
      console.error('Error loading subscribed users:', error);
      showToast('Erreur lors du chargement des abonnés', 'error');
    }
  };
  const handleSendNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.subject.trim() || !formData.content.trim()) {
      showToast('Le sujet et le contenu sont requis', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await apiService.sendNewsletter({
        subject: formData.subject.trim(),
        content: formData.content.trim()
      });
      
      if (response.success) {
        showToast('Newsletter envoyée avec succès', 'success');
        setShowCreateModal(false);
        resetForm();
        await loadNewsletters();
      } else {
        showToast(response.error || 'Erreur lors de l\'envoi', 'error');
      }
    } catch (error) {
      console.error('Error sending newsletter:', error);
      showToast('Erreur lors de l\'envoi de la newsletter', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${
      type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    }`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
    }, 3000);
  };

  const resetForm = () => {
    setFormData({
      subject: '',
      content: ''
    });
  };

  const filteredNewsletters = newsletters.filter(newsletter =>
    newsletter.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (newsletter.content && newsletter.content.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const allSubscribers = subscribedUsers ? [
    ...subscribedUsers.subscribed_users.map(user => ({
      id: user.id,
      email: user.email,
      name: user.name,
      type: 'user' as const,
      subscribed_at: user.subscribed_at,
      status: user.status
    })),
    ...subscribedUsers.subscribed_emails.map(sub => ({
      id: sub.id,
      email: sub.email,
      name: 'Abonné newsletter',
      type: 'subscriber' as const,
      subscribed_at: sub.subscribed_at,
      status: sub.status
    }))
  ] : [];

  const filteredSubscribers = allSubscribers.filter(subscriber =>
    subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subscriber.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalSubscribers = allSubscribers.length;
  const userSubscribers = subscribedUsers?.subscribed_users.length || 0;
  const emailSubscribers = subscribedUsers?.subscribed_emails.length || 0;

  const tabs = [
    { id: 'newsletters', name: 'Newsletters', icon: Mail },
    { id: 'subscribers', name: 'Abonnés', icon: Users }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">Gestion des newsletters</h1>
            <p className="text-sm text-gray-600">Créez et gérez vos campagnes email</p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="bg-green-50 px-4 py-2 rounded-lg">
              <span className="text-sm text-green-800 font-semibold">{totalSubscribers} abonné{totalSubscribers > 1 ? 's' : ''}</span>
            </div>
            <button
              onClick={() => {
                resetForm();
                setShowCreateModal(true);
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors flex items-center text-sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle newsletter
            </button>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <Mail className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-green-600 mr-1 sm:mr-2 lg:mr-3" />
            <div>
              <p className="text-xs text-gray-600">Newsletters</p>
              <p className="text-sm sm:text-lg lg:text-xl font-bold text-gray-900">{newsletters.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <Users className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-blue-600 mr-1 sm:mr-2 lg:mr-3" />
            <div>
              <p className="text-xs text-gray-600">Abonnés</p>
              <p className="text-sm sm:text-lg lg:text-xl font-bold text-gray-900">{totalSubscribers}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-green-600 mr-1 sm:mr-2 lg:mr-3" />
            <div>
              <p className="text-xs text-gray-600">Utilisateurs</p>
              <p className="text-sm sm:text-lg lg:text-xl font-bold text-gray-900">{userSubscribers}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <Mail className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-purple-600 mr-1 sm:mr-2 lg:mr-3" />
            <div>
              <p className="text-xs text-gray-600">Emails</p>
              <p className="text-sm sm:text-lg lg:text-xl font-bold text-gray-900">{emailSubscribers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600 bg-green-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search */}
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder={activeTab === 'newsletters' ? "Rechercher par sujet ou contenu..." : "Rechercher par email ou nom..."}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'newsletters' ? (
            /* Newsletters Tab */
            isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Chargement des newsletters...</p>
              </div>
            ) : filteredNewsletters.length === 0 ? (
              <div className="text-center py-12">
                <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  {searchTerm ? 'Aucune newsletter trouvée pour cette recherche' : 'Aucune newsletter envoyée'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredNewsletters.map((newsletter) => (
                  <div key={newsletter.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{newsletter.subject}</h3>
                        <p className="text-gray-600 mb-2">
                          {newsletter.content?.substring(0, 150)}...
                        </p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {newsletter.created_at ? new Date(newsletter.created_at).toLocaleDateString('fr-FR') : 'N/A'}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedNewsletter(newsletter);
                            setShowPreviewModal(true);
                          }}
                          className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-lg transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            /* Subscribers Tab */
            <div className="space-y-4">
              {filteredSubscribers.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    {searchTerm ? 'Aucun abonné trouvé pour cette recherche' : 'Aucun abonné'}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Abonné
                        </th>
                        <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date d'inscription
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Statut
                        </th>
                        <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ID
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredSubscribers.map((subscriber) => (
                        <tr key={subscriber.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {subscriber.name || 'Anonyme'}
                              </div>
                              <div className="text-sm text-gray-500">{subscriber.email}</div>
                            </div>
                          </td>
                          <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(subscriber.subscribed_at).toLocaleDateString('fr-FR')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              subscriber.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {subscriber.status === 'active' ? 'Actif' : 'Inactif'}
                            </span>
                          </td>
                          <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              subscriber.type === 'user' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {subscriber.type === 'user' ? 'Utilisateur' : 'Newsletter'}
                            </span>
                          </td>
                          <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            #{subscriber.id}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Create Newsletter Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-1 sm:p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[98vh] sm:max-h-[90vh] overflow-y-auto mx-1 sm:mx-0">
            <div className="p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Créer une newsletter</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl"
                >
                  ×
                </button>
              </div>
            </div>

            <form onSubmit={handleSendNewsletter} className="p-4 sm:p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sujet *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contenu *
                </label>
                <textarea
                  required
                  rows={8}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm resize-none"
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-blue-800 text-sm font-medium">
                    Cette newsletter sera envoyée à {totalSubscribers} abonné{totalSubscribers > 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 sticky bottom-0 bg-white">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2.5 px-4 rounded-lg font-medium transition-colors text-sm"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-2.5 px-4 rounded-lg font-medium transition-colors text-sm flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Envoi...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Envoyer
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Newsletter Modal */}
      {showPreviewModal && selectedNewsletter && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-1 sm:p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[98vh] sm:max-h-[90vh] overflow-y-auto mx-1 sm:mx-0">
            <div className="p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Prévisualisation</h2>
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sujet</label>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-900 font-medium">{selectedNewsletter.subject}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contenu</label>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-900 whitespace-pre-wrap">{selectedNewsletter.content}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date d'envoi</label>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-900">
                    {selectedNewsletter.created_at ? new Date(selectedNewsletter.created_at).toLocaleDateString('fr-FR') : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}