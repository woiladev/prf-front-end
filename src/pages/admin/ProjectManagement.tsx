import React, { useState, useEffect } from 'react';
import { Plus, Search, Eye, Edit, Trash2, Calendar, FileText, DollarSign, Image, AlertCircle, CheckCircle, Tag } from 'lucide-react';
import { apiService, Project, Category } from '../../services/api';

export default function ProjectManagement() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category_id: '',
    is_free: true,
    basic_price: '',
    classic_price: '',
    premium_price: '',
    image: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadProjects();
    loadCategories();
  }, []);

  const loadProjects = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.getProjects();
      if (response.success && response.data) {
        setProjects(response.data.projects);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
      showToast('Erreur lors du chargement des projets', 'error');
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.category_id) {
      showToast('Le nom et la catégorie sont requis', 'error');
      return;
    }

    // Validate file size
    if (formData.image && formData.image.size > 2 * 1024 * 1024) {
      showToast('L\'image ne doit pas dépasser 2MB', 'error');
      return;
    }

    // Validate prices if not free
    if (!formData.is_free) {
      const basicPrice = parseFloat(formData.basic_price);
      const classicPrice = parseFloat(formData.classic_price);
      const premiumPrice = parseFloat(formData.premium_price);

      if (isNaN(basicPrice) || basicPrice <= 0) {
        showToast('Le prix Basic doit être un nombre positif', 'error');
        return;
      }
      if (isNaN(classicPrice) || classicPrice <= 0) {
        showToast('Le prix Classic doit être un nombre positif', 'error');
        return;
      }
      if (isNaN(premiumPrice) || premiumPrice <= 0) {
        showToast('Le prix Premium doit être un nombre positif', 'error');
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const projectData = {
        name: formData.name.trim(),
        category_id: parseInt(formData.category_id),
        description: formData.description.trim() || undefined,
        is_free: formData.is_free,
        basic_price: formData.basic_price ? parseFloat(formData.basic_price) : null,
        classic_price: formData.classic_price ? parseFloat(formData.classic_price) : null,
        premium_price: formData.premium_price ? parseFloat(formData.premium_price) : null,
        image: formData.image
      };

      const response = await apiService.createProject(projectData);
      
      if (response.success) {
        showToast(response.data?.message || 'Projet créé avec succès', 'success');
        setShowCreateModal(false);
        resetForm();
        await loadProjects();
      } else {
        showToast(response.error || 'Erreur lors de la création', 'error');
      }
    } catch (error) {
      console.error('Error creating project:', error);
      showToast('Erreur lors de la création du projet', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedProject || !formData.name.trim() || !formData.category_id) {
      showToast('Le nom et la catégorie sont requis', 'error');
      return;
    }

    // Validate file size
    if (formData.image && formData.image.size > 2 * 1024 * 1024) {
      showToast('L\'image ne doit pas dépasser 2MB', 'error');
      return;
    }

    // Validate prices if not free
    if (!formData.is_free) {
      const basicPrice = parseFloat(formData.basic_price);
      const classicPrice = parseFloat(formData.classic_price);
      const premiumPrice = parseFloat(formData.premium_price);

      if (isNaN(basicPrice) || basicPrice <= 0) {
        showToast('Le prix Basic doit être un nombre positif', 'error');
        return;
      }
      if (isNaN(classicPrice) || classicPrice <= 0) {
        showToast('Le prix Classic doit être un nombre positif', 'error');
        return;
      }
      if (isNaN(premiumPrice) || premiumPrice <= 0) {
        showToast('Le prix Premium doit être un nombre positif', 'error');
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const projectData = {
        name: formData.name.trim(),
        category_id: parseInt(formData.category_id),
        description: formData.description.trim() || undefined,
        is_free: formData.is_free,
        basic_price: formData.basic_price ? parseFloat(formData.basic_price) : undefined,
        classic_price: formData.classic_price ? parseFloat(formData.classic_price) : undefined,
        premium_price: formData.premium_price ? parseFloat(formData.premium_price) : undefined,
        image: formData.image
      };

      const response = await apiService.updateProject(selectedProject.id, projectData);
      
      if (response.success) {
        showToast('Projet mis à jour avec succès', 'success');
        setShowEditModal(false);
        setSelectedProject(null);
        resetForm();
        await loadProjects();
      } else {
        showToast(response.error || 'Erreur lors de la mise à jour', 'error');
      }
    } catch (error) {
      console.error('Error updating project:', error);
      showToast('Erreur lors de la mise à jour du projet', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProject = async (projectId: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      return;
    }

    try {
      const response = await apiService.deleteProject(projectId);
      if (response.success) {
        setProjects(prev => prev.filter(project => project.id !== projectId));
        showToast('Projet supprimé avec succès', 'success');
      } else {
        showToast(response.error || 'Erreur lors de la suppression', 'error');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      showToast('Erreur lors de la suppression du projet', 'error');
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
      description: '',
      category_id: '',
      is_free: true,
      basic_price: '',
      classic_price: '',
      premium_price: '',
      image: null
    });
  };

  const openEditModal = (project: Project) => {
    setSelectedProject(project);
    setFormData({
      name: project.name,
      description: project.description || '',
      category_id: project.category_id?.toString() || '',
      is_free: project.is_free,
      basic_price: project.basic_price?.toString() || '',
      classic_price: project.classic_price?.toString() || '',
      premium_price: project.premium_price?.toString() || '',
      image: null
    });
    setShowEditModal(true);
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (project.description && project.description.toLowerCase().includes(searchTerm.toLowerCase()))
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

  const getStats = () => {
    const total = projects.length;
    const free = projects.filter(p => p.is_free).length;
    const paid = projects.filter(p => !p.is_free).length;
    
    return { total, free, paid };
  };

  const stats = getStats();

  const getCategoryName = (categoryId?: number) => {
    if (!categoryId) return 'Non catégorisé';
    const category = categories.find(cat => cat.id === categoryId);
    return category?.name || 'Catégorie inconnue';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">Gestion des projets</h1>
            <p className="text-sm text-gray-600">Créez et gérez les projets et initiatives</p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="bg-blue-50 px-4 py-2 rounded-lg">
              <span className="text-sm text-blue-800 font-semibold">{stats.total} projet{stats.total > 1 ? 's' : ''}</span>
            </div>
            <button
              onClick={() => {
                resetForm();
                setShowCreateModal(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors flex items-center text-sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nouveau projet
            </button>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <FileText className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-blue-600 mr-1 sm:mr-2 lg:mr-3" />
            <div>
              <p className="text-xs text-gray-600">Total</p>
              <p className="text-sm sm:text-lg lg:text-xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-green-600 mr-1 sm:mr-2 lg:mr-3" />
            <div>
              <p className="text-xs text-gray-600">Gratuits</p>
              <p className="text-sm sm:text-lg lg:text-xl font-bold text-gray-900">{stats.free}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-orange-600 mr-1 sm:mr-2 lg:mr-3" />
            <div>
              <p className="text-xs text-gray-600">Payants</p>
              <p className="text-sm sm:text-lg lg:text-xl font-bold text-gray-900">{stats.paid}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par nom ou description..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Projets ({filteredProjects.length})
          </h2>
        </div>

        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des projets...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="p-8 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              {searchTerm ? 'Aucun projet trouvé pour cette recherche' : 'Aucun projet disponible'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Projet
                  </th>
                  <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Catégorie
                  </th>
                  <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 mr-3 flex-shrink-0">
                          {project.image_url ? (
                            <img
                              src={`https://ghvtest.ghvcameroon.com${project.image_url}`}
                              alt={project.name}
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-blue-500 text-white rounded-lg flex items-center justify-center">
                              <FileText className="h-5 w-5" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 truncate max-w-32 sm:max-w-none">{project.name}</div>
                          <div className="text-xs text-gray-500 truncate max-w-32 sm:max-w-none">
                            {project.description || 'Aucune description'}
                          </div>
                          <div className="sm:hidden text-xs text-gray-600 mt-1">
                            {getCategoryName(project.category_id)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Tag className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{getCategoryName(project.category_id)}</span>
                      </div>
                    </td>
                    <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        project.is_free 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {project.is_free ? 'Gratuit' : 'Payant'}
                      </span>
                    </td>
                    <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {project.created_at ? new Date(project.created_at).toLocaleDateString('fr-FR') : 'N/A'}
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-1 sm:space-x-2">
                        <a
                          href={`/projects/${project.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-900 p-1.5 sm:p-1 hover:bg-blue-50 rounded"
                          title="Voir le projet"
                        >
                          <Eye className="h-4 w-4" />
                        </a>
                        <button
                          onClick={() => openEditModal(project)}
                          className="text-green-600 hover:text-green-900 p-1.5 sm:p-1 hover:bg-green-50 rounded"
                          title="Modifier"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
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

      {/* Create Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-1 sm:p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[98vh] sm:max-h-[90vh] overflow-y-auto mx-1 sm:mx-0">
            <div className="p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Créer un nouveau projet</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl"
                >
                  ×
                </button>
              </div>
            </div>

            <form onSubmit={handleCreateProject} className="p-4 sm:p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom du projet *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Catégorie *
                </label>
                <select
                  required
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  value={formData.category_id}
                  onChange={(e) => setFormData(prev => ({ ...prev, category_id: e.target.value }))}
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                    checked={formData.is_free}
                    onChange={(e) => setFormData(prev => ({ ...prev, is_free: e.target.checked }))}
                  />
                  <span className="text-sm text-gray-700">Projet gratuit</span>
                </label>
              </div>

              {!formData.is_free && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prix Basic (FCFA) *
                    </label>
                    <input
                      type="number"
                      required={!formData.is_free}
                      min="0"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      value={formData.basic_price}
                      onChange={(e) => setFormData(prev => ({ ...prev, basic_price: e.target.value }))}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prix Classic (FCFA) *
                    </label>
                    <input
                      type="number"
                      required={!formData.is_free}
                      min="0"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      value={formData.classic_price}
                      onChange={(e) => setFormData(prev => ({ ...prev, classic_price: e.target.value }))}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prix Premium (FCFA) *
                    </label>
                    <input
                      type="number"
                      required={!formData.is_free}
                      min="0"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      value={formData.premium_price}
                      onChange={(e) => setFormData(prev => ({ ...prev, premium_price: e.target.value }))}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image du projet (JPEG, PNG, JPG, GIF - max 2MB)
                </label>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/jpg,image/gif"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
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
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2.5 px-4 rounded-lg font-medium transition-colors text-sm"
                >
                  {isSubmitting ? 'Création...' : 'Créer le projet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Project Modal */}
      {showEditModal && selectedProject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-1 sm:p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[98vh] sm:max-h-[90vh] overflow-y-auto mx-1 sm:mx-0">
            <div className="p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Modifier le projet</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl"
                >
                  ×
                </button>
              </div>
            </div>

            <form onSubmit={handleUpdateProject} className="p-4 sm:p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom du projet *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Catégorie *
                </label>
                <select
                  required
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  value={formData.category_id}
                  onChange={(e) => setFormData(prev => ({ ...prev, category_id: e.target.value }))}
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                    checked={formData.is_free}
                    onChange={(e) => setFormData(prev => ({ ...prev, is_free: e.target.checked }))}
                  />
                  <span className="text-sm text-gray-700">Projet gratuit</span>
                </label>
              </div>

              {!formData.is_free && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prix Basic (FCFA) *
                    </label>
                    <input
                      type="number"
                      required={!formData.is_free}
                      min="0"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      value={formData.basic_price}
                      onChange={(e) => setFormData(prev => ({ ...prev, basic_price: e.target.value }))}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prix Classic (FCFA) *
                    </label>
                    <input
                      type="number"
                      required={!formData.is_free}
                      min="0"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      value={formData.classic_price}
                      onChange={(e) => setFormData(prev => ({ ...prev, classic_price: e.target.value }))}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prix Premium (FCFA) *
                    </label>
                    <input
                      type="number"
                      required={!formData.is_free}
                      min="0"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      value={formData.premium_price}
                      onChange={(e) => setFormData(prev => ({ ...prev, premium_price: e.target.value }))}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nouvelle image du projet (JPEG, PNG, JPG, GIF - max 2MB)
                </label>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/jpg,image/gif"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  onChange={handleFileChange}
                />
                {selectedProject.image_url && (
                  <p className="text-xs text-gray-500 mt-1">Image actuelle disponible</p>
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
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2.5 px-4 rounded-lg font-medium transition-colors text-sm"
                >
                  {isSubmitting ? 'Mise à jour...' : 'Mettre à jour'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}