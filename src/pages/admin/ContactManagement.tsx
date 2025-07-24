import React, { useState, useEffect } from 'react';
import { Search, Eye, Trash2, Phone, Mail, Copy, Calendar, User, MessageCircle, AlertCircle, CheckCircle } from 'lucide-react';
import { apiService, Contact } from '../../services/api';

export default function ContactManagement() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.getContacts();
      if (response.success && response.data) {
        setContacts(response.data.contacts);
      }
    } catch (error) {
      console.error('Error loading contacts:', error);
      showToast('Erreur lors du chargement des contacts', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteContact = async (contactId: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce contact ?')) {
      return;
    }

    try {
      const response = await apiService.deleteContact(contactId);
      if (response.success) {
        setContacts(prev => prev.filter(contact => contact.id !== contactId));
        showToast('Contact supprimé avec succès', 'success');
        if (selectedContact?.id === contactId) {
          setShowDetailModal(false);
          setSelectedContact(null);
        }
      } else {
        showToast(response.error || 'Erreur lors de la suppression', 'error');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
      showToast('Erreur lors de la suppression du contact', 'error');
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

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.request_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.object.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRequestTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'general': 'bg-blue-100 text-blue-800',
      'support': 'bg-green-100 text-green-800',
      'partnership': 'bg-purple-100 text-purple-800',
      'expert': 'bg-orange-100 text-orange-800',
      'feedback': 'bg-yellow-100 text-yellow-800',
      'business': 'bg-red-100 text-red-800',
      'legal': 'bg-indigo-100 text-indigo-800',
      'technical': 'bg-gray-100 text-gray-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getRequestTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      'general': 'Question générale',
      'support': 'Support technique',
      'partnership': 'Partenariat',
      'expert': 'Devenir expert',
      'feedback': 'Feedback',
      'business': 'Développement d\'affaires',
      'legal': 'Questions juridiques',
      'technical': 'Assistance technique'
    };
    return labels[type] || type;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">Gestion des contacts</h1>
            <p className="text-sm text-gray-600">Gérez les demandes de contact et les messages clients</p>
          </div>
          <div className="flex-shrink-0">
            <div className="bg-blue-50 px-4 py-2 rounded-lg">
              <span className="text-sm text-blue-800 font-semibold">{contacts.length} contact{contacts.length > 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-lg p-3 sm:p-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par nom, email, téléphone, type..."
            className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-3 sm:p-6 border-b border-gray-200">
          <h2 className="text-base lg:text-lg font-semibold text-gray-900">
            Demandes de contact ({filteredContacts.length})
          </h2>
        </div>

        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des contacts...</p>
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="p-8 text-center">
            <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              {searchTerm ? 'Aucun contact trouvé pour cette recherche' : 'Aucun contact disponible'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Objet
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
                {filteredContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 truncate max-w-32 sm:max-w-none">{contact.name}</div>
                        <div className="text-xs text-gray-500 truncate">{contact.email}</div>
                        <div className="text-xs text-gray-500 sm:hidden truncate mt-1">{contact.phone}</div>
                        <div className="sm:hidden">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${getRequestTypeColor(contact.request_type)}`}>
                            {getRequestTypeLabel(contact.request_type)}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRequestTypeColor(contact.request_type)}`}>
                        {getRequestTypeLabel(contact.request_type)}
                      </span>
                    </td>
                    <td className="hidden md:table-cell px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {contact.object}
                      </div>
                    </td>
                    <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {contact.created_at ? new Date(contact.created_at).toLocaleDateString('fr-FR') : 'N/A'}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-1 sm:space-x-2">
                        <button
                          onClick={() => {
                            setSelectedContact(contact);
                            setShowDetailModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-900 p-1.5 sm:p-1 hover:bg-blue-50 rounded"
                          title="Voir détails"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <a className="hidden md:inline-block"
                          href={`tel:${contact.phone}`}
                          className="text-green-600 hover:text-green-900 p-1 hover:bg-green-50 rounded"
                          title="Appeler"
                        >
                          <Phone className="h-4 w-4" />
                        </a>
                        <a className="hidden md:inline-block"
                          href={`mailto:${contact.email}?subject=Re: ${contact.object}&body=Bonjour ${contact.name},%0D%0A%0D%0AConcernant votre demande: "${contact.object}"%0D%0A%0D%0A`}
                          className="text-purple-600 hover:text-purple-900 p-1 hover:bg-purple-50 rounded"
                          title="Envoyer email"
                        >
                          <Mail className="h-4 w-4" />
                        </a>
                        <button
                          onClick={() => handleDeleteContact(contact.id)}
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

      {/* Contact Detail Modal */}
      {showDetailModal && selectedContact && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-1 sm:p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[98vh] sm:max-h-[90vh] overflow-y-auto mx-1 sm:mx-0">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Détails du contact</h2>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl p-1"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900">{selectedContact.name}</span>
                      <button
                        onClick={() => copyToClipboard(selectedContact.name)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900">{selectedContact.email}</span>
                      <button
                        onClick={() => copyToClipboard(selectedContact.email)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900">{selectedContact.phone}</span>
                      <button
                        onClick={() => copyToClipboard(selectedContact.phone)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type de demande</label>
                    <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getRequestTypeColor(selectedContact.request_type)}`}>
                      {getRequestTypeLabel(selectedContact.request_type)}
                    </span>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date de soumission</label>
                    <div className="flex items-center text-gray-900">
                      <Calendar className="h-4 w-4 mr-2" />
                      {selectedContact.created_at ? new Date(selectedContact.created_at).toLocaleDateString('fr-FR') : 'N/A'}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ID de la demande</label>
                    <span className="text-gray-900 font-mono">#{selectedContact.id}</span>
                  </div>
                </div>
              </div>

              {/* Object */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Objet</label>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-900">{selectedContact.object}</p>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-900 whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 pt-4 border-t border-gray-200">
                <a
                  href={`tel:${selectedContact.phone}`}
                  className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg font-medium transition-colors text-sm"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Appeler
                </a>
                <a
                  href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.object}&body=Bonjour ${selectedContact.name},%0D%0A%0D%0AConcernant votre demande: "${selectedContact.object}"%0D%0A%0D%0A`}
                  className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg font-medium transition-colors text-sm"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Répondre par </span>Email
                </a>
                <button
                  onClick={() => copyToClipboard(`Nom: ${selectedContact.name}\nEmail: ${selectedContact.email}\nTéléphone: ${selectedContact.phone}\nType: ${getRequestTypeLabel(selectedContact.request_type)}\nObjet: ${selectedContact.object}\nMessage: ${selectedContact.message}`)}
                  className="flex items-center justify-center bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg font-medium transition-colors text-sm"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copier les infos
                </button>
                <button
                  onClick={() => handleDeleteContact(selectedContact.id)}
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