import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Calendar, FileText, Eye, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { stepsApi } from '../../lib/api/steps';
import { apiService, Project, SubscriptionLevel } from '../../services/api';

export default function StepsManagement() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [steps, setSteps] = useState<SubscriptionLevel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStepsLoading, setIsStepsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStep, setSelectedStep] = useState<SubscriptionLevel | null>(null);
  const [formData, setFormData] = useState({
    level: 'Basic' as 'Basic' | 'Classic' | 'Premium',
    details: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      loadProjectSteps(selectedProject.id);
    }
  }, [selectedProject]);

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

  const loadProjectSteps = async (projectId: number) => {
    setIsStepsLoading(true);
    try {
      const response = await stepsApi.getProjectSteps(projectId);
      if (response.success && response.data) {
        setSteps(response.data.steps);
      }
    } catch (error) {
      console.error('Error loading steps:', error);
      showToast('Erreur lors du chargement des étapes', 'error');
    } finally {
      setIsStepsLoading(false);
    }
  };

  const handleCreateStep = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedProject || !formData.level || !formData.details.trim()) {
      showToast('Tous les champs sont requis', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await stepsApi.createStep({
        project_id: selectedProject.id,
        level: formData.level,
        details: formData.details.trim()
      });
      
      if (response.success) {
        showToast('Étape créée avec succès', 'success');
        setShowCreateModal(false);
        resetForm();
        await loadProjectSteps(selectedProject.id);
      } else {
        showToast(response.error || 'Erreur lors de la création', 'error');
      }
    } catch (error) {
      console.error('Error creating step:', error);
      showToast('Erreur lors de la création de l\'étape', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateStep = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedStep || !formData.level || !formData.details.trim()) {
      showToast('Tous les champs sont requis', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await stepsApi.updateStep(selectedStep.id, {
        level: formData.level,
        details: formData.details.trim()
      });
      
      if (response.success) {
        showToast('Étape mise à jour avec succès', 'success');
        setShowEditModal(false);
        setSelectedStep(null);
        resetForm();
        if (selectedProject) {
          await loadProjectSteps(selectedProject.id);
        }
      } else {
        showToast(response.error || 'Erreur lors de la mise à jour', 'error');
      }
    } catch (error) {
      console.error('Error updating step:', error);
      showToast('Erreur lors de la mise à jour de l\'étape', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteStep = async (stepId: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette étape ?')) {
      return;
    }

    try {
      const response = await stepsApi.deleteStep(stepId);
      if (response.success) {
        setSteps(prev => prev.filter(step => step.id !== stepId));
        showToast('Étape supprimée avec succès', 'success');
      } else {
        showToast(response.error || 'Erreur lors de la suppression', 'error');
      }
    } catch (error) {
      console.error('Error deleting step:', error);
      showToast('Erreur lors de la suppression de l\'étape', 'error');
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
      level: 'Basic',
      details: ''
    });
  };

  const openEditModal = (step: SubscriptionLevel) => {
    setSelectedStep(step);
    setFormData({
      level: step.level,
      details: step.details
    });
    setShowEditModal(true);
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (project.description && project.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Basic':
        return 'bg-green-100 text-green-800';
      case 'Classic':
        return 'bg-blue-100 text-blue-800';
      case 'Premium':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvailableLevels = () => {
    const existingLevels = steps.map(step => step.level);
    const allLevels: ('Basic' | 'Classic' | 'Premium')[] = ['Basic', 'Classic', 'Premium'];
    return allLevels.filter(level => !existingLevels.includes(level));
  };

  if (!selectedProject) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">Gestion des étapes de projets</h1>
            <p className="text-sm text-gray-600">Sélectionnez un projet pour gérer ses étapes d'abonnement</p>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un projet..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Projects List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Sélectionner un projet ({filteredProjects.length})
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
              {filteredProjects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="text-left p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 hover:shadow-md"
                >
                  <div className="flex items-center mb-3">
                    {project.image_url ? (
                      <img
                        src={`https://ghvtest.ghvcameroon.com${project.image_url}`}
                        alt={project.name}
                        className="w-12 h-12 rounded-lg object-cover mr-3"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-blue-500 text-white rounded-lg flex items-center justify-center mr-3">
                        <FileText className="h-6 w-6" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 truncate">{project.name}</h3>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${
                        project.is_free ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                      }`}>
                        {project.is_free ? 'Gratuit' : 'Payant'}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {project.description || 'Aucune description'}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
          <div>
            <div className="flex items-center mb-2">
              <button
                onClick={() => {
                  setSelectedProject(null);
                  setSteps([]);
                }}
                className="text-blue-600 hover:text-blue-800 mr-3 flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Retour
              </button>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                Étapes - {selectedProject.name}
              </h1>
            </div>
            <p className="text-sm text-gray-600">Gérez les étapes d'abonnement pour ce projet</p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="bg-blue-50 px-4 py-2 rounded-lg">
              <span className="text-sm text-blue-800 font-semibold">{steps.length} étape{steps.length > 1 ? 's' : ''}</span>
            </div>
            {getAvailableLevels().length > 0 && (
              <button
                onClick={() => {
                  resetForm();
                  setShowCreateModal(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors flex items-center text-sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle étape
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Steps List */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Étapes d'abonnement ({steps.length})
          </h2>
        </div>

        {isStepsLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des étapes...</p>
          </div>
        ) : steps.length === 0 ? (
          <div className="p-8 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Aucune étape configurée pour ce projet</p>
            {getAvailableLevels().length > 0 && (
              <button
                onClick={() => {
                  resetForm();
                  setShowCreateModal(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Créer la première étape
              </button>
            )}
          </div>
        ) : (
          <div className="p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {steps.map((step) => (
                <div key={step.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getLevelColor(step.level)}`}>
                      {step.level}
                    </span>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => openEditModal(step)}
                        className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded"
                        title="Modifier"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteStep(step.id)}
                        className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded"
                        title="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm mb-3">{step.details}</p>
                  <div className="text-xs text-gray-500 flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {step.created_at ? new Date(step.created_at).toLocaleDateString('fr-FR') : 'N/A'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Create Step Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-1 sm:p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-1 sm:mx-0">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Créer une étape</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl"
                >
                  ×
                </button>
              </div>
            </div>

            <form onSubmit={handleCreateStep} className="p-4 sm:p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Niveau *
                </label>
                <select
                  required
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  value={formData.level}
                  onChange={(e) => setFormData(prev => ({ ...prev, level: e.target.value as 'Basic' | 'Classic' | 'Premium' }))}
                >
                  {getAvailableLevels().map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
                {getAvailableLevels().length === 0 && (
                  <p className="text-xs text-red-600 mt-1">Tous les niveaux sont déjà configurés</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Détails *
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                  value={formData.details}
                  onChange={(e) => setFormData(prev => ({ ...prev, details: e.target.value }))}
                  placeholder="Décrivez ce qui est inclus dans cette étape..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2.5 px-4 rounded-lg font-medium transition-colors text-sm"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || getAvailableLevels().length === 0}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2.5 px-4 rounded-lg font-medium transition-colors text-sm"
                >
                  {isSubmitting ? 'Création...' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Step Modal */}
      {showEditModal && selectedStep && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-1 sm:p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-1 sm:mx-0">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Modifier l'étape</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl"
                >
                  ×
                </button>
              </div>
            </div>

            <form onSubmit={handleUpdateStep} className="p-4 sm:p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Niveau *
                </label>
                <select
                  required
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  value={formData.level}
                  onChange={(e) => setFormData(prev => ({ ...prev, level: e.target.value as 'Basic' | 'Classic' | 'Premium' }))}
                >
                  <option value="Basic">Basic</option>
                  <option value="Classic">Classic</option>
                  <option value="Premium">Premium</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Détails *
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                  value={formData.details}
                  onChange={(e) => setFormData(prev => ({ ...prev, details: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4">
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