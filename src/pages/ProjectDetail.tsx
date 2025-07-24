import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Users, TrendingUp, Lock, CheckCircle, AlertCircle, Calendar, MapPin, Phone, Mail, Star, Award, FileText, Target, DollarSign } from 'lucide-react';
import { apiService, Project as ApiProject, SubscriptionLevel } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import MobileMoneyPayment from '../components/MobileMoneyPayment';

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState<ApiProject | null>(null);
  const [subscriptionLevels, setSubscriptionLevels] = useState<SubscriptionLevel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ level: string; price: number } | null>(null);
  const [subscriptionId, setSubscriptionId] = useState<number | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (id) {
      loadProject(parseInt(id));
    }
  }, [id]);

  const loadProject = async (projectId: number) => {
    setIsLoading(true);
    try {
      const [projectResponse, levelsResponse] = await Promise.all([
        apiService.getProject(projectId),
        apiService.getProjectSubscriptionLevels(projectId)
      ]);
      
      if (projectResponse.success && projectResponse.data) {
        setProject(projectResponse.data.project || projectResponse.data);
      }
      
      if (levelsResponse.success && levelsResponse.data) {
        setSubscriptionLevels(levelsResponse.data.steps);
      }
    } catch (error) {
      console.error('Error loading project:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubscribe = async (level: 'Basic' | 'Classic' | 'Premium', price: number) => {
    if (!user || !project) {
      alert('Veuillez vous connecter pour vous abonner');
      return;
    }

    try {
      const response = await apiService.subscribeToProject({
        project_id: project.id,
        subscription_level: level,
        operator: 'mtn' // Default to MTN, user can change in payment modal
      });

      if (response.success && response.data) {
        setSubscriptionId(response.data.subscription.id);
        setSelectedPlan({ level, price });
        setShowPayment(true);
      } else {
        alert(response.error || 'Erreur lors de l\'abonnement');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      alert('Erreur de connexion');
    }
  };

  const handlePaymentSuccess = async () => {
    if (subscriptionId) {
      try {
        await apiService.confirmSubscriptionPayment({
          subscription_id: subscriptionId,
          payment_status: 'success'
        });
        setShowPayment(false);
        alert('Abonnement activé avec succès!');
      } catch (error) {
        console.error('Payment confirmation error:', error);
      }
    }
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
    setSelectedPlan(null);
    setSubscriptionId(null);
  };

  // Mock project data - in real app, this would come from API
  const projects = [
    {
      id: 1,
      title: 'PLANUT - Plan National de Développement',
      category: 'Gouvernemental',
      description: 'Programme d\'appui à la nutrition et à la transformation agricole visant à moderniser l\'agriculture camerounaise et améliorer la sécurité alimentaire.',
      duration: '5 ans',
      investment: 'Budget gouvernemental',
      participants: 'Producteurs nationaux',
      image: 'https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
      accessType: 'free',
      subscriptionPlans: null,
      publicContent: {
        overview: 'Le Plan National de Développement de la Nutrition et de la Transformation Agricole (PLANUT) est une initiative gouvernementale majeure visant à moderniser le secteur agricole camerounais. Ce programme ambitieux s\'inscrit dans la vision 2035 du Cameroun et vise à transformer l\'agriculture traditionnelle en un secteur moderne, productif et durable.',
        objectives: [
          'Moderniser les techniques agricoles et améliorer la productivité',
          'Développer les chaînes de valeur agricoles et agro-industrielles',
          'Améliorer la sécurité alimentaire et nutritionnelle',
          'Créer des emplois dans le secteur agricole et rural',
          'Promouvoir l\'agriculture durable et respectueuse de l\'environnement'
        ],
        targetBeneficiaries: [
          'Petits producteurs agricoles',
          'Coopératives agricoles',
          'Entreprises agro-industrielles',
          'Jeunes entrepreneurs agricoles',
          'Femmes rurales'
        ],
        geographicScope: 'Toutes les 10 régions du Cameroun',
        implementingAgency: 'Ministère de l\'Agriculture et du Développement Rural (MINADER)',
        contact: {
          phone: '+237 222 223 400',
          email: 'info@minader.cm',
          address: 'Yaoundé, Cameroun'
        }
      }
    },
    {
      id: 2,
      title: 'PNDP - Programme National de Développement Participatif',
      category: 'Gouvernemental',
      description: 'Initiative de développement communautaire qui finance des projets locaux d\'infrastructure et de développement socio-économique.',
      duration: 'Permanent',
      investment: 'Financement public et international',
      participants: 'Communautés rurales',
      image: 'https://www.minpmeesa.cm/site/inhoud/uploads/2024/02/promote2024.png',
      accessType: 'paid',
      subscriptionPlans: {
        classique: { 
          price: '15,000 FCFA', 
          features: ['Aperçu du programme', 'Critères d\'éligibilité de base', 'Contact général', 'Procédures simplifiées'] 
        },
        premium: { 
          price: '35,000 FCFA', 
          features: ['Tout Classique', 'Guide complet de candidature', 'Modèles de dossiers', 'Timeline détaillée', 'Liste des projets financés'] 
        },
        vip: { 
          price: '65,000 FCFA', 
          features: ['Tout Premium', 'Accompagnement personnalisé', 'Révision de dossier', 'Contacts privilégiés', 'Support dédié'] 
        }
      },
      publicContent: {
        overview: 'Le Programme National de Développement Participatif (PNDP) est un mécanisme de financement qui appuie les initiatives de développement local portées par les communautés. Il vise à réduire la pauvreté en milieu rural et à améliorer les conditions de vie des populations.',
        objectives: [
          'Financer des projets d\'infrastructure communautaire',
          'Renforcer les capacités des organisations communautaires',
          'Améliorer l\'accès aux services sociaux de base',
          'Promouvoir la participation citoyenne au développement local'
        ],
        targetBeneficiaries: [
          'Communautés rurales organisées',
          'Organisations de la société civile',
          'Collectivités territoriales décentralisées',
          'Groupes vulnérables (femmes, jeunes, personnes handicapées)'
        ],
        geographicScope: 'Zones rurales prioritaires',
        implementingAgency: 'Coordination Nationale du PNDP'
      }
    }
  ];

  // Use API project if available, otherwise use mock data
  const mockProject = projects.find(p => p.id === parseInt(id || '0'));
  const displayProject = project ? {
    id: project.id,
    title: project.name || 'Initiative sans titre',
    category: 'Gouvernemental',
    description: project.description || 'Description de l\'initiative',
    duration: 'Variable selon le projet',
    investment: project.is_free ? 'Accès gratuit' : 'Contenu premium',
    participants: 'Entrepreneurs et porteurs de projets',
    image: project.image_url ? `https://ghvtest.ghvcameroon.com${project.image_url}` : 'https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    accessType: project.is_free ? 'free' : 'paid',
    subscriptionPlans: project.is_free ? null : {
      basic: { 
        price: project.basic_price ? `${project.basic_price.toLocaleString()} FCFA` : '15,000 FCFA', 
        features: ['Aperçu du projet', 'Objectifs principaux', 'Contact de base'] 
      },
      classic: { 
        price: project.classic_price ? `${project.classic_price.toLocaleString()} FCFA` : '35,000 FCFA', 
        features: ['Tout Basic', 'Chronologie détaillée', 'Budget complet', 'Livrables'] 
      },
      premium: { 
        price: project.premium_price ? `${project.premium_price.toLocaleString()} FCFA` : '65,000 FCFA', 
        features: ['Tout Classic', 'Analyse des risques', 'Contacts privilégiés', 'Support dédié'] 
      }
    },
    publicContent: {
      overview: project.description || 'Initiative gouvernementale pour le développement économique.',
      objectives: [
        'Soutenir l\'entrepreneuriat local',
        'Faciliter l\'accès au financement',
        'Promouvoir l\'innovation',
        'Créer des emplois durables'
      ],
      targetBeneficiaries: [
        'Entrepreneurs',
        'PME',
        'Startups',
        'Coopératives'
      ],
      geographicScope: 'Cameroun',
      implementingAgency: 'PRF',
      contact: {
        phone: '+237 671 234 567',
        email: 'contact@prf.cm',
        address: 'Douala, Cameroun'
      }
    }
  } : mockProject;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de l'initiative...</p>
        </div>
      </div>
    );
  }

  if (!displayProject && !isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Initiative non trouvée</h2>
          <p className="text-gray-600 mb-6">L'initiative que vous recherchez n'existe pas ou a été supprimée.</p>
          <Link
            to="/projects"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Retour aux initiatives
          </Link>
        </div>
      </div>
    );
  }

  const renderSubscriptionPlans = () => {
    if (!displayProject.subscriptionPlans) return null;

    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <Lock className="h-16 w-16 text-orange-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Contenu Premium</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cette initiative contient des informations détaillées et un accompagnement personnalisé. 
            Choisissez le plan qui correspond à vos besoins.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {Object.entries(displayProject.subscriptionPlans).map(([planType, plan]) => (
            <div 
              key={planType}
              className={`relative bg-white border-2 rounded-xl p-6 transition-all duration-200 hover:shadow-lg ${
                planType === 'classic' 
                  ? 'border-blue-500 transform scale-105' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {planType === 'classic' && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Populaire
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                  planType === 'basic' ? 'bg-green-100 text-green-600' :
                  planType === 'classic' ? 'bg-blue-100 text-blue-600' :
                  'bg-orange-100 text-orange-600'
                }`}>
                  {planType === 'basic' ? <FileText className="h-6 w-6" /> :
                   planType === 'classic' ? <Award className="h-6 w-6" /> :
                   <Star className="h-6 w-6" />}
                </div>
                <h3 className="text-xl font-bold text-gray-900 capitalize mb-2">{planType}</h3>
                <div className="text-3xl font-bold text-gray-900 mb-1">{plan.price}</div>
                <p className="text-sm text-gray-600">Accès unique</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => {
                  const price = parseFloat(plan.price.replace(/[^\d]/g, ''));
                  handleSubscribe(planType.charAt(0).toUpperCase() + planType.slice(1) as 'Basic' | 'Classic' | 'Premium', price);
                }}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                  planType === 'classic'
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
              >
                Choisir {planType}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
          <div className="flex items-start">
            <AlertCircle className="h-6 w-6 text-blue-600 mr-3 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">Garantie de satisfaction</h4>
              <p className="text-blue-800 text-sm">
                Accès immédiat après paiement. Support client disponible pour vous accompagner. 
                Paiement sécurisé par Mobile Money ou virement bancaire.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/projects"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Retour aux initiatives
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                  {displayProject.category}
                </span>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  displayProject.accessType === 'free' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-orange-100 text-orange-800'
                }`}>
                  {displayProject.accessType === 'free' ? 'Accès gratuit' : 'Payante'}
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {displayProject.title}
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {displayProject.description}
              </p>
              
              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-600 mb-1">Durée</div>
                  <div className="font-bold text-gray-900">{displayProject.duration}</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-600 mb-1">Bénéficiaires</div>
                  <div className="font-bold text-gray-900">{displayProject.participants}</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-xl">
                  <DollarSign className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-600 mb-1">Financement</div>
                  <div className="font-bold text-gray-900 text-sm">{displayProject.investment}</div>
                </div>
              </div>
            </div>
            
            {/* Image */}
            <div className="relative">
              <img
                src={displayProject.image}
                alt={displayProject.title}
                className="w-full h-80 lg:h-96 object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {displayProject.accessType === 'free' ? (
            /* Free Content */
            <div className="space-y-12">
              {/* Overview */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <Target className="h-8 w-8 text-blue-600 mr-3" />
                  Aperçu du programme
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  {displayProject.publicContent.overview}
                </p>
                
                {/* Objectives */}
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Objectifs principaux</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {displayProject.publicContent.objectives.map((objective, index) => (
                    <div key={index} className="flex items-start p-4 bg-blue-50 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">{objective}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Target Beneficiaries */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <Users className="h-8 w-8 text-green-600 mr-3" />
                  Bénéficiaires cibles
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {displayProject.publicContent.targetBeneficiaries.map((beneficiary, index) => (
                    <div key={index} className="p-4 bg-green-50 rounded-lg text-center">
                      <div className="font-semibold text-green-800">{beneficiary}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Implementation Details */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                    <MapPin className="h-6 w-6 text-orange-600 mr-3" />
                    Couverture géographique
                  </h3>
                  <p className="text-lg text-gray-700">{displayProject.publicContent.geographicScope}</p>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                    <Award className="h-6 w-6 text-purple-600 mr-3" />
                    Organisme de mise en œuvre
                  </h3>
                  <p className="text-lg text-gray-700">{displayProject.publicContent.implementingAgency}</p>
                </div>
              </div>

              {/* Contact Information */}
              {displayProject.publicContent.contact && (
                <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                    Informations de contact
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div className="flex flex-col items-center">
                      <Phone className="h-8 w-8 text-blue-600 mb-3" />
                      <div className="font-semibold text-gray-900">Téléphone</div>
                      <a href={`tel:${displayProject.publicContent.contact.phone}`} className="text-blue-600 hover:text-blue-800">
                        {displayProject.publicContent.contact.phone}
                      </a>
                    </div>
                    <div className="flex flex-col items-center">
                      <Mail className="h-8 w-8 text-green-600 mb-3" />
                      <div className="font-semibold text-gray-900">Email</div>
                      <a href={`mailto:${displayProject.publicContent.contact.email}`} className="text-green-600 hover:text-green-800">
                        {displayProject.publicContent.contact.email}
                      </a>
                    </div>
                    <div className="flex flex-col items-center">
                      <MapPin className="h-8 w-8 text-orange-600 mb-3" />
                      <div className="font-semibold text-gray-900">Adresse</div>
                      <span className="text-gray-700">{displayProject.publicContent.contact.address}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Success Message */}
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Contenu complet disponible
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Cette initiative gouvernementale est en accès libre. Toutes les informations 
                  détaillées sont disponibles gratuitement pour soutenir votre projet.
                </p>
              </div>
            </div>
          ) : (
            /* Paid Content - Show Subscription Plans */
            <div className="space-y-12">
              {/* Basic Overview */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Aperçu du programme</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {displayProject.publicContent.overview}
                </p>
                
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                  <div className="flex items-center">
                    <Lock className="h-6 w-6 text-orange-600 mr-3" />
                    <div>
                      <h4 className="font-semibold text-orange-900 mb-1">Contenu premium disponible</h4>
                      <p className="text-orange-800 text-sm">
                        Accédez aux guides détaillés, procédures complètes et accompagnement personnalisé 
                        en choisissant un plan d'abonnement ci-dessous.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subscription Plans */}
              {renderSubscriptionPlans()}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Besoin d'accompagnement ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            PRF vous accompagne pour identifier et accéder aux programmes gouvernementaux adaptés à votre projet
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/experts"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl text-lg font-semibold transition-colors"
            >
              Consulter nos experts
            </Link>
            <Link
              to="/projects"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold transition-colors"
            >
              Voir d'autres initiatives
            </Link>
          </div>
        </div>
      </section>

      {/* Mobile Money Payment Modal */}
      {showPayment && selectedPlan && (
        <MobileMoneyPayment
          amount={`${selectedPlan.price.toLocaleString()} FCFA`}
          planName={`Plan ${selectedPlan.level}`}
          onSuccess={handlePaymentSuccess}
          onCancel={handlePaymentCancel}
        />
      )}
    </div>
  );
}