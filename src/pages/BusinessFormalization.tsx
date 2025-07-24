import React, { useState } from 'react';
import { Download, FileText, Users, Building, CheckCircle, AlertCircle, MapPin, Phone, Mail } from 'lucide-react';
import { apiService, CreateFormalisationRequest } from '../services/api';

export default function BusinessFormalization() {
  const [selectedType, setSelectedType] = useState('sarl');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    structure: '',
    description: '',
    location: '',
    sector: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const businessTypes = [
    {
      id: 'sa',
      name: 'SA (Société Anonyme)',
      icon: Building,
      description: 'Forme juridique pour les grandes entreprises avec capital social important.',
      minCapital: '10,000,000 FCFA',
      minPartners: '7 actionnaires',
      requirements: [
        'Capital social minimum de 10 millions FCFA',
        'Minimum 7 actionnaires',
        'Conseil d\'administration',
        'Commissaire aux comptes obligatoire'
      ],
      documents: [
        'Statuts de la société',
        'Procès-verbal de l\'assemblée générale constitutive',
        'Attestation de versement du capital',
        'Déclaration notariée de souscription'
      ]
    },
    {
      id: 'sarl',
      name: 'SARL (Société à Responsabilité Limitée)',
      icon: Building,
      description: 'Forme juridique idéale pour les PME avec responsabilité limitée des associés.',
      minCapital: '1,000,000 FCFA',
      minPartners: '2 à 20 associés',
      requirements: [
        'Capital social minimum de 1 million FCFA',
        'Entre 2 et 20 associés',
        'Gérant désigné',
        'Répartition des parts sociales'
      ],
      documents: [
        'Statuts de la SARL',
        'Procès-verbal de l\'assemblée constitutive',
        'Attestation de versement du capital',
        'Déclaration de gérance'
      ]
    },
    {
      id: 'gic',
      name: 'GIC (Groupe d\'Initiative Commune)',
      icon: Users,
      description: 'Forme juridique associative pour les activités collectives et coopératives.',
      minCapital: 'Pas de minimum requis',
      minPartners: 'Minimum 5 membres',
      requirements: [
        'Minimum 5 membres fondateurs',
        'Activité d\'intérêt commun',
        'Règlement intérieur',
        'Bureau exécutif élu'
      ],
      documents: [
        'Statuts du GIC',
        'Liste des membres fondateurs',
        'Procès-verbal de l\'assemblée générale constitutive',
        'Règlement intérieur'
      ]
    },
    {
      id: 'coop',
      name: 'COOP (Coopérative)',
      icon: Users,
      description: 'Forme juridique démocratique pour les activités économiques collectives.',
      minCapital: 'Variable selon l\'activité',
      minPartners: 'Minimum 7 membres',
      requirements: [
        'Minimum 7 membres coopérateurs',
        'Un homme, une voix',
        'Activité économique commune',
        'Conseil d\'administration élu'
      ],
      documents: [
        'Statuts de la coopérative',
        'Règlement intérieur',
        'Procès-verbal de l\'assemblée générale constitutive',
        'Liste des membres fondateurs'
      ]
    }
  ];

  const sectors = [
    'Agriculture',
    'Pêche et Aquaculture',
    'Élevage',
    'Commerce',
    'Services',
    'Transformation',
    'Technologie',
    'Artisanat',
    'Transport',
    'Autre'
  ];

  const selectedBusinessType = businessTypes.find(type => type.id === selectedType);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitFormalisationData();
  };

  const submitFormalisationData = async () => {
    setIsSubmitting(true);
    setSubmitMessage(null);
    
    try {
      const formalisationData: CreateFormalisationRequest = {
        name: formData.name.trim(),
        email: formData.email.toLowerCase().trim(),
        phone: formData.phone.trim(),
        location: formData.location.trim(),
        structure: formData.structure.trim(),
        sector: formData.sector.trim(),
        description: formData.description.trim()
      };
      
      const response = await apiService.submitFormalisationRequest(formalisationData);
      
      if (response.success) {
        setIsSubmitted(true);
        setSubmitMessage({ 
          type: 'success', 
          text: response.data?.message || 'Demande de formalisation envoyée avec succès!' 
        });
      } else {
        setSubmitMessage({ 
          type: 'error', 
          text: response.error || 'Erreur lors de l\'envoi de la demande' 
        });
      }
    } catch (error) {
      console.error('Formalisation submission error:', error);
      setSubmitMessage({ 
        type: 'error', 
        text: 'Erreur de connexion. Veuillez réessayer.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Demande envoyée avec succès !
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Votre demande d'accompagnement pour la formalisation de votre entreprise a été transmise 
              au Centre de Promotion de Bonanjo.
            </p>
            
            <div className="bg-orange-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-orange-800 mb-4">
                Centre de Promotion de Bonanjo
              </h3>
              <div className="mb-4 p-4 bg-orange-100 rounded-lg border border-orange-200">
                <p className="text-orange-800 text-sm font-medium mb-2">
                  📍 Pour obtenir tous les documents nécessaires et finaliser votre formalisation :
                </p>
                <p className="text-orange-700 text-sm">
                  Rendez-vous au <strong>Centre de Promotion de Bonanjo</strong> avec votre dossier complet. 
                  Nos conseillers vous accompagneront dans toutes les démarches administratives.
                </p>
              </div>
              <div className="space-y-2 text-orange-700">
                <div className="flex items-center justify-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>Rue de la Réunification, Bonanjo - Douala</span>
                </div>
                <div className="flex items-center justify-center">
                  <Phone className="h-5 w-5 mr-2" />
                  <span>+237 233 42 89 67</span>
                </div>
                <div className="flex items-center justify-center">
                  <Mail className="h-5 w-5 mr-2" />
                  <span>contact@centre-bonanjo.cm</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <p className="text-blue-800 text-sm">
                <strong>Prochaines étapes :</strong><br />
                • Rassemblez tous les documents listés ci-dessus<br />
                • Un conseiller vous contactera sous 48h<br />
                • Rendez-vous au Centre de Promotion de Bonanjo<br />
                • Préparation de votre dossier de formalisation<br />
                • Accompagnement personnalisé jusqu'à l'immatriculation
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsSubmitted(false)}
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Nouvelle demande
              </button>
              <a
                href="/"
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Retour à l'accueil
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="relative bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-black/70"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://et3ukr3n7ug.exactdn.com/training-and-development-resources/wp-content/uploads/sites/2/2022/02/TDR_Legal_Risks.jpg?strip=all&lossy=1&ssl=1')`
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-orange-900/30 to-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-red-500/15 rounded-full blur-2xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-2xl text-shadow-glow">
              Formalisation / Structuration des Entreprises
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto drop-shadow-xl text-shadow-glow">
              Structurez votre entreprise avec l'accompagnement de nos experts juridiques
            </p>
          </div>
        </div>
      </section>

      {/* Business Type Selection */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choisissez votre forme juridique
            </h2>
            <p className="text-xl text-gray-600">
              Sélectionnez la structure juridique qui correspond le mieux à votre projet
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`p-6 rounded-xl border-2 transition-all duration-300 text-left hover:shadow-lg ${
                  selectedType === type.id
                    ? 'border-orange-500 bg-orange-50 shadow-lg transform scale-105'
                    : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                }`}
              >
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-full ${
                    selectedType === type.id ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <type.icon className="h-6 w-6" />
                  </div>
                  <h3 className={`ml-3 text-lg font-semibold ${
                    selectedType === type.id ? 'text-orange-900' : 'text-gray-900'
                  }`}>
                    {type.name}
                  </h3>
                </div>
                <p className={`text-sm mb-3 ${
                  selectedType === type.id ? 'text-orange-800' : 'text-gray-600'
                }`}>
                  {type.description}
                </p>
                <div className="space-y-1 text-xs">
                  <div className={selectedType === type.id ? 'text-orange-700' : 'text-gray-500'}>
                    <strong>Capital:</strong> {type.minCapital}
                  </div>
                  <div className={selectedType === type.id ? 'text-orange-700' : 'text-gray-500'}>
                    <strong>Membres:</strong> {type.minPartners}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Type Details */}
      {selectedBusinessType && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex items-center mb-6">
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Informations générales
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Capital minimum:</span>
                      <span className="font-semibold">{selectedBusinessType.minCapital}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nombre de partenaires:</span>
                      <span className="font-semibold">{selectedBusinessType.minPartners}</span>
                    </div>
                  </div>

                  <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-4">
                    Conditions requises
                  </h4>
                  <ul className="space-y-2">
                    {selectedBusinessType.requirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span className="text-gray-700">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Documents nécessaires
                  </h3>
                  <ul className="space-y-3">
                    {selectedBusinessType.documents.map((doc, index) => (
                      <li key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-orange-600 mr-3" />
                          <span className="text-gray-700">{doc}</span>
                        </div>
                      </li>
                    ))}
                      <span className="text-gray-600">Autres</span>
                  </ul>
                   <h3 className="text-lg font-semibold text-gray-900 mb-4">
               Pour toute question spécifique rendez-vous au centre de création d'entreprise
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Simplified Support Request Form */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Demande d'accompagnement simplifiée
            </h2>
            
            {submitMessage && (
              <div className={`mb-6 p-4 rounded-lg flex items-center ${
                submitMessage.type === 'success' 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {submitMessage.type === 'success' ? (
                  <CheckCircle className="h-5 w-5 mr-2" />
                ) : (
                  <AlertCircle className="h-5 w-5 mr-2" />
                )}
                <span className="text-sm">{submitMessage.text}</span>
              </div>
            )}
            
            {!isSubmitted && (
              <div className="mb-6 p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-orange-600 mr-2" />
                  <span className="text-orange-800 font-medium">
                    Nos experts vous contacteront sous 48h pour vous accompagner dans votre démarche
                  </span>
                </div>
              </div>
            )}

            <div className="mb-6 p-4 bg-orange-50 rounded-lg">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-orange-600 mr-2" />
                <span className="text-orange-800 font-medium">
                  Nos experts vous contacteront sous 48h pour vous accompagner dans votre démarche
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Localisation *
                  </label>
                  <input
                    type="text"
                    name="location"
                    required
                    placeholder="Ville, Région"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Forme juridique souhaitée
                  </label>
                  <select
                    name="structure"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    value={formData.structure}
                    onChange={handleInputChange}
                  >
                    <option value="">Sélectionner une forme juridique</option>
                    {businessTypes.map((type) => (
                      <option key={type.id} value={type.name}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secteur d'activité *
                  </label>
                  <select
                    name="sector"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    value={formData.sector}
                    onChange={handleInputChange}
                  >
                    <option value="">Sélectionner un secteur</option>
                    {sectors.map((sector) => (
                      <option key={sector} value={sector}>
                        {sector}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description de votre projet *
                </label>
                <textarea
                  name="description"
                  rows={4}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Décrivez brièvement votre projet d'entreprise et vos besoins en accompagnement..."
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed text-white' 
                      : 'bg-orange-600 hover:bg-orange-700 text-white'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Envoi en cours...
                    </div>
                  ) : (
                    'Envoyer ma demande d\'accompagnement'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-12 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pourquoi formaliser votre entreprise ?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Crédibilité
                  </h3>
                  <p className="text-gray-600">
                    Augmentez votre crédibilité auprès des partenaires et clients
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Accès au financement
                  </h3>
                  <p className="text-gray-600">
                    Facilitez l'accès aux prêts bancaires et financements
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Protection juridique
                  </h3>
                  <p className="text-gray-600">
                    Protégez votre patrimoine personnel et professionnel
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}