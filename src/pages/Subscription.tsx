import React, { useState } from 'react';
import { Crown, Check, Star, Zap, Shield, Users, BookOpen, Phone } from 'lucide-react';
import { useSubscription } from '../contexts/SubscriptionContext';
import MobileMoneyPayment from '../components/MobileMoneyPayment';

export default function Subscription() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const { subscribe } = useSubscription();

  const plans = [
    {
      id: 'classique',
      name: 'Classique',
      price: '15,000 FCFA',
      period: '/mois',
      description: 'Parfait pour débuter votre aventure entrepreneuriale',
      features: [
        'Accès aux projets de base',
        'Forum communautaire',
        'Newsletter mensuelle',
        'Support par email',
        'Guides de démarrage'
      ],
      color: 'from-blue-500 to-blue-600',
      popular: false
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '25,000 FCFA',
      period: '/mois',
      description: 'Pour les entrepreneurs sérieux qui veulent aller plus loin',
      features: [
        'Tout du plan Classique',
        'Accès aux projets premium',
        'Consultation expert (2h/mois)',
        'Marketplace vendeur',
        'Webinaires exclusifs',
        'Support prioritaire'
      ],
      color: 'from-green-500 to-green-600',
      popular: true
    },
    {
      id: 'vip',
      name: 'VIP',
      price: '50,000 FCFA',
      period: '/mois',
      description: 'L\'expérience complète pour les entrepreneurs ambitieux',
      features: [
        'Tout du plan Premium',
        'Accès illimité aux experts',
        'Accompagnement personnalisé',
        'Formalisation assistée',
        'Réseau VIP exclusif',
        'Support téléphonique 24/7',
        'Accès anticipé aux nouveautés'
      ],
      color: 'from-orange-500 to-red-500',
      popular: false
    }
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    if (selectedPlan) {
      subscribe(selectedPlan);
      setShowPayment(false);
      setSelectedPlan(null);
    }
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
    setSelectedPlan(null);
  };

  const selectedPlanData = plans.find(plan => plan.id === selectedPlan);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Crown className="h-12 w-12 text-yellow-300 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">Abonnements PRF</h1>
            </div>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Choisissez le plan qui correspond à vos ambitions entrepreneuriales
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 ${
                  plan.popular ? 'ring-4 ring-green-500 ring-opacity-50' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-green-500 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      Populaire
                    </div>
                  </div>
                )}

                <div className={`bg-gradient-to-r ${plan.color} p-8 text-white`}>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-lg ml-2 opacity-80">{plan.period}</span>
                  </div>
                  <p className="text-sm opacity-90">{plan.description}</p>
                </div>

                <div className="p-8">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleSelectPlan(plan.id)}
                    className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg`}
                  >
                    Choisir {plan.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Pourquoi choisir PRF ?
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Projets Validés</h3>
              <p className="text-gray-600">Plus de 500 projets analysés et validés par nos experts</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Experts Qualifiés</h3>
              <p className="text-gray-600">Réseau de spécialistes dans tous les secteurs</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Accompagnement</h3>
              <p className="text-gray-600">Support personnalisé pour votre réussite</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600">Outils modernes et méthodes éprouvées</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Questions fréquentes
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Puis-je changer de plan à tout moment ?
              </h3>
              <p className="text-gray-600">
                Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. 
                Les changements prennent effet immédiatement.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Y a-t-il une période d'engagement ?
              </h3>
              <p className="text-gray-600">
                Non, tous nos plans sont sans engagement. Vous pouvez annuler 
                votre abonnement à tout moment.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Comment contacter le support ?
              </h3>
              <p className="text-gray-600">
                Le support est disponible par email pour tous les plans. 
                Les abonnés VIP bénéficient également du support téléphonique 24/7.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Money Payment Modal */}
      {showPayment && selectedPlanData && (
        <MobileMoneyPayment
          amount={selectedPlanData.price}
          planName={selectedPlanData.name}
          onSuccess={handlePaymentSuccess}
          onCancel={handlePaymentCancel}
        />
      )}
    </div>
  );
}