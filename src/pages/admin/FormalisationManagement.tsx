import React, { useState, useEffect } from 'react';
import { Search, Eye, Trash2, Phone, Mail, Copy, Calendar, Building, MapPin, User, AlertCircle } from 'lucide-react';
import { apiService, Formalisation } from '../../services/api';

export default function FormalisationManagement() {
  const [formalisations, setFormalisations] = useState<Formalisation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFormalisation, setSelectedFormalisation] = useState<Formalisation | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    loadFormalisations();
  }, []);

  const loadFormalisations = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.getFormalisations();
      if (response.success && response.data) {
        setFormalisations(response.data.formalisations);
      }
    } catch (error) {
      console.error('Error loading formalisations:', error);
      showToast('Erreur lors du chargement des demandes', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteFormalisation = async (formalisationId: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette demande de formalisation ?')) {
      return;
    }

    try {
      const response = await apiService.deleteFormalisation(formalisationId);
      if (response.success) {
        setFormalisations(prev => prev.filter(form => form.id !== formalisationId));
        showToast('Demande supprimée avec succès', 'success');
        if (selectedFormalisation?.id === formalisationId) {
          setShowDetailModal(false);
          setSelectedFormalisation(null);
        }
      } else {
        showToast(response.error || 'Erreur lors de la suppression', 'error');
      }
    } catch (error) {
      console.error('Error deleting formalisation:', error);
      showToast('Erreur lors de la suppression de la demande', 'error');
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast('Copié dans le presse-papiers', 'success');
  };

  const filteredFormalisations = formalisations.filter(form =>
    form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    form.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    form.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    form.structure.toLowerCase().includes(searchTerm.toLowerCase()) ||
    form.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
    form.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStructureColor = (structure: string) => {
    const colors: { [key: string]: string } = {
      'SA': 'bg-blue-100 text-blue-800',
      'SARL': 'bg-green-100 text-green-800',
      'GIC': 'bg-purple-100 text-purple-800',
      'COOP': 'bg-orange-100 text-orange-800',
      'Coopérative': 'bg-orange-100 text-orange-800'
    };
    
    // Check if structure contains any of the keys
    for (const [key, color] of Object.entries(colors)) {
      if (structure.toUpperCase().includes(key)) {
        return color;
      }
    }
    return 'bg-gray-100 text-gray-800';
  };

  const getStats = () => {
    const total = formalisations.length;
    const sarl = formalisations.filter(f => f.structure.toUpperCase().includes('SARL')).length;
    const gic = formalisations.filter(f => f.structure.toUpperCase().includes('GIC')).length;
    const coop = formalisations.filter(f => f.structure.toUpperCase().includes('COOP')).length;
    
    return { total, sarl, gic, coop };
  };

  const stats = getStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Gestion des formalisations</h1>
            <p className="text-gray-600">Gérez les demandes de création d'entreprises</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="bg-purple-50 px-4 py-2 rounded-lg">
              <span className="text-purple-800 font-semibold">{stats.total} demande{stats.total > 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <Building className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-purple-600 mr-1 sm:mr-2 lg:mr-3" />
            <div>
              <p className="text-xs text-gray-600">Total</p>
              <p className="text-sm sm:text-lg lg:text-xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <Building className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-green-600 mr-1 sm:mr-2 lg:mr-3" />
            <div>
              <p className="text-xs text-gray-600">SARL</p>
              <p className="text-sm sm:text-lg lg:text-xl font-bold text-gray-900">{stats.sarl}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <Building className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-purple-600 mr-1 sm:mr-2 lg:mr-3" />
            <div>
              <p className="text-xs text-gray-600">GIC</p>
              <p className="text-sm sm:text-lg lg:text-xl font-bold text-gray-900">{stats.gic}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <Building className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-orange-600 mr-1 sm:mr-2 lg:mr-3" />
            <div>
              <p className="text-xs text-gray-600">Coops</p>
              <p className="text-sm sm:text-lg lg:text-xl font-bold text-gray-900">{stats.coop}</p>
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
            placeholder="Rechercher par nom, email, structure, secteur..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Formalisations Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Demandes de formalisation ({filteredFormalisations.length})
          </h2>
        </div>

        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des demandes...</p>
          </div>
        ) : filteredFormalisations.length === 0 ? (
          <div className="p-8 text-center">
            <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              {searchTerm ? 'Aucune demande trouvée pour cette recherche' : 'Aucune demande de formalisation'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Demandeur
                  </th>
                  <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Structure
                  </th>
                  <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Secteur
                  </th>
                  <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Localisation
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
                {filteredFormalisations.map((formalisation) => (
                  <tr key={formalisation.id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 truncate max-w-32 sm:max-w-none">{formalisation.name}</div>
                        <div className="text-xs text-gray-500 truncate max-w-32 sm:max-w-none">{formalisation.email}</div>
                        <div className="text-xs text-gray-500 sm:hidden truncate mt-1">{formalisation.phone}</div>
                        <div className="sm:hidden mt-1">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStructureColor(formalisation.structure)}`}>
                            {formalisation.structure}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStructureColor(formalisation.structure)}`}>
                        {formalisation.structure}
                      </span>
                    </td>
                    <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formalisation.sector}
                    </td>
                    <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formalisation.location}
                    </td>
                    <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formalisation.created_at ? new Date(formalisation.created_at).toLocaleDateString('fr-FR') : 'N/A'}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-1 sm:space-x-2">
                        <button
                          onClick={() => {
                            setSelectedFormalisation(formalisation);
                            setShowDetailModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-900 p-1.5 sm:p-1 hover:bg-blue-50 rounded"
                          title="Voir détails"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <a className="hidden md:inline-block"
                          href={`tel:${formalisation.phone}`}
                          className="text-green-600 hover:text-green-900 p-1 hover:bg-green-50 rounded"
                          title="Appeler"
                        >
                          <Phone className="h-4 w-4" />
                        </a>
                        <a className="hidden md:inline-block"
                          href={`mailto:${formalisation.email}?subject=Demande de formalisation - ${formalisation.structure}&body=Bonjour ${formalisation.name},%0D%0A%0D%0AConcernant votre demande de création de ${formalisation.structure}...%0D%0A%0D%0A`}
                          className="text-purple-600 hover:text-purple-900 p-1 hover:bg-purple-50 rounded"
                          title="Envoyer email"
                        >
                          <Mail className="h-4 w-4" />
                        </a>
                        <button
                          onClick={() => handleDeleteFormalisation(formalisation.id)}
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

      {/* Formalisation Detail Modal */}
      {showDetailModal && selectedFormalisation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-1 sm:p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[98vh] sm:max-h-[90vh] overflow-y-auto mx-1 sm:mx-0">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Détails de la demande</h2>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Informations personnelles
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900 truncate mr-2">{selectedFormalisation.name}</span>
                      <button
                        onClick={() => copyToClipboard(selectedFormalisation.name)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900 truncate mr-2">{selectedFormalisation.email}</span>
                      <button
                        onClick={() => copyToClipboard(selectedFormalisation.email)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900 truncate mr-2">{selectedFormalisation.phone}</span>
                      <button
                        onClick={() => copyToClipboard(selectedFormalisation.phone)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Localisation</label>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-900 truncate">{selectedFormalisation.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Building className="h-5 w-5 mr-2" />
                  Informations de l'entreprise
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Structure juridique</label>
                    <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStructureColor(selectedFormalisation.structure)}`}>
                      {selectedFormalisation.structure}
                    </span>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Secteur d'activité</label>
                    <span className="text-gray-900 truncate">{selectedFormalisation.sector}</span>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date de soumission</label>
                    <div className="flex items-center text-gray-900">
                      <Calendar className="h-4 w-4 mr-2" />
                      {selectedFormalisation.created_at ? new Date(selectedFormalisation.created_at).toLocaleDateString('fr-FR') : 'N/A'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description du projet</label>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-900 whitespace-pre-wrap">{selectedFormalisation.description}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3 pt-4 border-t border-gray-200">
                <a
                  href={`tel:${selectedFormalisation.phone}`}
                  className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg font-medium transition-colors text-sm"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Appeler
                </a>
                <a
                  href={`mailto:${selectedFormalisation.email}?subject=Demande de formalisation - ${selectedFormalisation.structure}&body=Bonjour ${selectedFormalisation.name},%0D%0A%0D%0AConcernant votre demande de création de ${selectedFormalisation.structure} dans le secteur ${selectedFormalisation.sector}...%0D%0A%0D%0A`}
                  className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg font-medium transition-colors text-sm"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Répondre par </span>Email
                </a>
                <button
                  onClick={() => copyToClipboard(`Nom: ${selectedFormalisation.name}\nEmail: ${selectedFormalisation.email}\nTéléphone: ${selectedFormalisation.phone}\nLocalisation: ${selectedFormalisation.location}\nStructure: ${selectedFormalisation.structure}\nSecteur: ${selectedFormalisation.sector}\nDescription: ${selectedFormalisation.description}`)}
                  className="flex items-center justify-center bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg font-medium transition-colors text-sm"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copier les infos
                </button>
                <button
                  onClick={() => handleDeleteFormalisation(selectedFormalisation.id)}
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