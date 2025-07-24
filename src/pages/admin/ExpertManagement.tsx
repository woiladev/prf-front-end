import React, { useState, useEffect } from 'react';
import { Plus, Search, Eye, Edit, Trash2, Calendar, User, MapPin, Mail, Phone, Briefcase, AlertCircle, CheckCircle } from 'lucide-react';
import { apiService, ServiceProvider } from '../../services/api';

export default function ExpertManagement() {
  const [experts, setExperts] = useState<ServiceProvider[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState<ServiceProvider | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    job_title: '',
    location: '',
    description: '',
    image: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadExperts();
  }, []);

  const loadExperts = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.getServiceProviders();
      if (response.success && response.data) {
        setExperts(response.data.service_providers);
      }
    } catch (error) {
      console.error('Error loading experts:', error);
      showToast('Erreur lors du chargement des experts', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateExpert = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim()) {
      showToast('Le nom et l\'email sont requis', 'error');
      return;
    }

    // Validate file size
    if (formData.image && formData.image.size > 2 * 1024 * 1024) {
      showToast('L\'image ne doit pas dépasser 2MB', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const expertFormData = new FormData();
      expertFormData.append('name', formData.name.trim());
      expertFormData.append('email', formData.email.trim());
      
      if (formData.phone.trim()) {
        expertFormData.append('phone', formData.phone.trim());
      }
      if (formData.job_title.trim()) {
        expertFormData.append('job_title', formData.job_title.trim());
      }
      if (formData.location.trim()) {
        expertFormData.append('location', formData.location.trim());
      }
      if (formData.description.trim()) {
        expertFormData.append('description', formData.description.trim());
      }
      if (formData.image) {
        expertFormData.append('image', formData.image);
      }

      const response = await apiService.createExpert(expertFormData);
      
      if (response.success) {
        showToast('Expert créé avec succès', 'success');
        setShowCreateModal(false);
        resetForm();
        await loadExperts();
      } else {
        showToast(response.error || 'Erreur lors de la création', 'error');
      }
    } catch (error) {
      console.error('Error creating expert:', error);
      showToast('Erreur lors de la création de l\'expert', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateExpert = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedExpert || !formData.name.trim() || !formData.email.trim()) {
      showToast('Le nom et l\'email sont requis', 'error');
      return;
    }

    // Validate file size
    if (formData.image && formData.image.size > 2 * 1024 * 1024) {
      showToast('L\'image ne doit pas dépasser 2MB', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const expertFormData = new FormData();
      expertFormData.append('name', formData.name.trim());
      expertFormData.append('email', formData.email.trim());
      
      if (formData.phone.trim()) {
        expertFormData.append('phone', formData.phone.trim());
      }
      if (formData.job_title.trim()) {
        expertFormData.append('job_title', formData.job_title.trim());
      }
      if (formData.location.trim()) {
        expertFormData.append('location', formData.location.trim());
      }
      if (formData.description.trim()) {
        expertFormData.append('description', formData.description.trim());
      }
      if (formData.image) {
        expertFormData.append('image', formData.image);
      }

      const response = await apiService.updateExpert(selectedExpert.id, expertFormData);
      
      if (response.success) {
        showToast('Expert mis à jour avec succès', 'success');
        setShowEditModal(false);
        setSelectedExpert(null);
        resetForm();
        await loadExperts();
      } else {
        showToast(response.error || 'Erreur lors de la mise à jour', 'error');
      }
    } catch (error) {
      console.error('Error updating expert:', error);
      showToast('Erreur lors de la mise à jour de l\'expert', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteExpert = async (expertId: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet expert ?')) {
      return;
    }

    try {
      const response = await apiService.deleteExpert(expertId);
      if (response.success) {
        setExperts(prev => prev.filter(expert => expert.id !== expertId));
        showToast('Expert supprimé avec succès', 'success');
        if (selectedExpert?.id === expertId) {
          setShowDetailModal(false);
          setSelectedExpert(null);
        }
      } else {
        showToast(response.error || 'Erreur lors de la suppression', 'error');
      }
    } catch (error) {
      console.error('Error deleting expert:', error);
      showToast('Erreur lors de la suppression de l\'expert', 'error');
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
      name: '',
      email: '',
      phone: '',
      job_title: '',
      location: '',
      description: '',
      image: null
    });
  };

  const openEditModal = (expert: ServiceProvider) => {
    setSelectedExpert(expert);
    setFormData({
      name: expert.name,
      email: expert.email,
      phone: expert.phone || '',
      job_title: expert.job_title || '',
      location: expert.location || '',
      description: expert.description || '',
      image: null
    });
    setShowEditModal(true);
  };

  const openDetailModal = (expert: ServiceProvider) => {
    setSelectedExpert(expert);
    setShowDetailModal(true);
  };

  const filteredExperts = experts.filter(expert =>
    expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expert.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (expert.job_title && expert.job_title.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (expert.location && expert.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (expert.description && expert.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const validateFile = (file: File) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
    const maxSize = 2 * 1024 * 1024; // 2MB
    
    if (!validTypes.includes(file.type)) {
      showToast('Format d\'image non supporté. Utilisez JPEG, PNG, JPG ou GIF', 'error');
      return false;
    }
    
    if (file.size > maxSize) {
      showToast('L\'image ne doit pas dépasser 2MB', 'error');
      return false;
    }
    
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      setFormData(prev => ({ ...prev, image: file }));
    } else {
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">Gestion des experts</h1>
            <p className="text-sm text-gray-600">Créez et gérez votre réseau d'experts sectoriels</p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="bg-purple-50 px-4 py-2 rounded-lg">
              <span className="text-sm text-purple-800 font-semibold">{experts.length} expert{experts.length > 1 ? 's' : ''}</span>
            </div>
            <button
              onClick={() => {
                resetForm();
                setShowCreateModal(true);
              }}
              className="bg-purple-600 hover:bg-purple-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors flex items-center text-sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nouvel expert
            </button>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par nom, email, titre, localisation..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Experts Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Experts ({filteredExperts.length})
          </h2>
        </div>

        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des experts...</p>
          </div>
        ) : filteredExperts.length === 0 ? (
          <div className="p-8 text-center">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              {searchTerm ? 'Aucun expert trouvé pour cette recherche' : 'Aucun expert disponible'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expert
                  </th>
                  <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Titre
                  </th>
                  <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Localisation
                  </th>
                  <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date d'ajout
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredExperts.map((expert) => (
                  <tr key={expert.id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 mr-3 flex-shrink-0">
                          <img
                            src={expert.image_url ? `https://ghvtest.ghvcameroon.com${expert.image_url}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(expert.name)}&background=8b5cf6&color=fff&size=40`}
                            alt={expert.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 truncate max-w-32 sm:max-w-none">{expert.name}</div>
                          <div className="text-xs text-gray-500 truncate max-w-32 sm:max-w-none">{expert.email}</div>
                          <div className="sm:hidden text-xs text-gray-600 mt-1 truncate">
                            {expert.job_title || 'Expert'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{expert.job_title || 'Expert'}</span>
                      </div>
                    </td>
                    <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{expert.location || 'Non spécifié'}</span>
                      </div>
                    </td>
                    <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {expert.created_at ? new Date(expert.created_at).toLocaleDateString('fr-FR') : 'N/A'}
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-1 sm:space-x-2">
                        <button
                          onClick={() => openDetailModal(expert)}
                          className="text-blue-600 hover:text-blue-900 p-1.5 sm:p-1 hover:bg-blue-50 rounded"
                          title="Voir détails"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => openEditModal(expert)}
                          className="text-green-600 hover:text-green-900 p-1.5 sm:p-1 hover:bg-green-50 rounded"
                          title="Modifier"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <a className="hidden md:inline-block"
                          href={`tel:${expert.phone}`}
                          className="text-purple-600 hover:text-purple-900 p-1 hover:bg-purple-50 rounded"
                          title="Appeler"
                        >
                          <Phone className="h-4 w-4" />
                        </a>
                        <a className="hidden md:inline-block"
                          href={`mailto:${expert.email}`}
                          className="text-indigo-600 hover:text-indigo-900 p-1 hover:bg-indigo-50 rounded"
                          title="Envoyer email"
                        >
                          <Mail className="h-4 w-4" />
                        </a>
                        <button
                          onClick={() => handleDeleteExpert(expert.id)}
                          className="text-red-600 hover:text-red-900 p-1.5 sm:p-1 hover:bg-red-50 rounded"
                          title="Supprimer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create Expert Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-1 sm:p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[98vh] sm:max-h-[90vh] overflow-y-auto mx-1 sm:mx-0">
            <div className="p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Ajouter un nouvel expert</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl"
                >
                  ×
                </button>
              </div>
            </div>

            <form onSubmit={handleCreateExpert} className="p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titre/Fonction
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    value={formData.job_title}
                    onChange={(e) => setFormData(prev => ({ ...prev, job_title: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Localisation
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Photo de profil (JPEG, PNG, JPG, GIF - max 2MB)
                </label>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/jpg,image/gif"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  onChange={handleFileChange}
                />
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
                  className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white py-2.5 px-4 rounded-lg font-medium transition-colors text-sm"
                >
                  {isSubmitting ? 'Création...' : 'Créer l\'expert'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Expert Modal */}
      {showEditModal && selectedExpert && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-1 sm:p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[98vh] sm:max-h-[90vh] overflow-y-auto mx-1 sm:mx-0">
            <div className="p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Modifier l'expert</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl"
                >
                  ×
                </button>
              </div>
            </div>

            <form onSubmit={handleUpdateExpert} className="p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titre/Fonction
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    value={formData.job_title}
                    onChange={(e) => setFormData(prev => ({ ...prev, job_title: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Localisation
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nouvelle photo de profil (JPEG, PNG, JPG, GIF - max 2MB)
                </label>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/jpg,image/gif"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  onChange={handleFileChange}
                />
                {selectedExpert.image_url && (
                  <p className="text-xs text-gray-500 mt-1">Photo actuelle disponible</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 sticky bottom-0 bg-white">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2.5 px-4 rounded-lg font-medium transition-colors text-sm"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white py-2.5 px-4 rounded-lg font-medium transition-colors text-sm"
                >
                  {isSubmitting ? 'Mise à jour...' : 'Mettre à jour'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Expert Detail Modal */}
      {showDetailModal && selectedExpert && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-1 sm:p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[98vh] sm:max-h-[90vh] overflow-y-auto mx-1 sm:mx-0">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Détails de l'expert</h2>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Profile Section */}
              <div className="flex items-center space-x-4">
                <img
                  src={selectedExpert.image_url ? `https://ghvtest.ghvcameroon.com${selectedExpert.image_url}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedExpert.name)}&background=8b5cf6&color=fff&size=80`}
                  alt={selectedExpert.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedExpert.name}</h3>
                  <p className="text-gray-600">{selectedExpert.job_title || 'Expert'}</p>
                  <p className="text-sm text-gray-500">ID: #{selectedExpert.id}</p>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Informations de contact</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-900">{selectedExpert.email}</span>
                    </div>
                  </div>

                  {selectedExpert.phone && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-900">{selectedExpert.phone}</span>
                      </div>
                    </div>
                  )}

                  {selectedExpert.location && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Localisation</label>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-900">{selectedExpert.location}</span>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date d'ajout</label>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-900">
                        {selectedExpert.created_at ? new Date(selectedExpert.created_at).toLocaleDateString('fr-FR') : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              {selectedExpert.description && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedExpert.description}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3 pt-4 border-t border-gray-200">
                {selectedExpert.phone && (
                  <a
                    href={`tel:${selectedExpert.phone}`}
                    className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Appeler
                  </a>
                )}
                <a
                  href={`mailto:${selectedExpert.email}`}
                  className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg font-medium transition-colors text-sm"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </a>
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    openEditModal(selectedExpert);
                  }}
                  className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg font-medium transition-colors text-sm"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Modifier
                </button>
                <button
                  onClick={() => handleDeleteExpert(selectedExpert.id)}
                  className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg font-medium transition-colors text-sm"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}