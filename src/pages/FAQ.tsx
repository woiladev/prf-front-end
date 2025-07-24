import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, MessageCircle, Mail, Phone } from 'lucide-react';

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqCategories = [
    {
      id: 'general',
      name: 'À propos du Centre (CPIP)',
      icon: MessageCircle,
      questions: [
        {
          id: 1,
          question: 'Quel est l\'objectif du Centre de Promotion des Politiques Publiques et des Initiatives Privées (CPIP) ?',
          answer: 'Le CPIP a pour objectif de servir de pont entre les politiques publiques et les initiatives privées au Cameroun. Nous facilitons l\'accès aux programmes gouvernementaux, promouvons l\'entrepreneuriat local, et accompagnons les porteurs de projets dans la réalisation de leurs ambitions. Notre mission est de contribuer au développement économique durable en soutenant les entrepreneurs et en facilitant leur accès aux ressources gouvernementales et aux marchés.'
        },
        {
          id: 2,
          question: 'Comment puis-je contacter le Centre pour obtenir plus d\'informations ?',
          answer: 'Vous pouvez nous contacter de plusieurs façons : par téléphone au +237 671 234 567, par email à contact@prf.cm, ou en visitant nos bureaux à Douala, Bonanjo - Rue de la Réunification. Vous pouvez également utiliser notre formulaire de contact en ligne sur notre site web pour nous envoyer vos questions spécifiques.'
        },
        {
          id: 3,
          question: 'Quel type de politiques publiques et d\'initiatives privées sont promues par le Centre ?',
          answer: 'Nous promouvons les politiques publiques dans les secteurs de l\'agriculture, de la pêche, de l\'artisanat, des PME, de la technologie et du développement rural. Côté initiatives privées, nous soutenons les projets entrepreneuriaux innovants, les coopératives, les startups technologiques, les entreprises agricoles modernes, et toute initiative contribuant au développement économique local et à la création d\'emplois.'
        },
        {
          id: 4,
          question: 'Comment puis-je obtenir les informations sur les Politiques Publiques et des Initiatives Privées ?',
          answer: 'Les informations sont disponibles sur notre plateforme en ligne où vous trouverez plus de 500 initiatives gouvernementales analysées et validées. Vous pouvez accéder gratuitement aux projets publics, ou souscrire à un abonnement VIP pour accéder aux contenus premium, analyses détaillées et accompagnement personnalisé.'
        },
        {
          id: 5,
          question: 'Quels sont les avantages de collaborer avec le Centre ?',
          answer: 'En collaborant avec le CPIP, vous bénéficiez d\'un accès privilégié aux programmes gouvernementaux, d\'un accompagnement personnalisé par nos experts sectoriels, d\'un réseau de partenaires et d\'investisseurs, d\'un soutien pour la formalisation de votre entreprise, et d\'une plateforme pour commercialiser vos produits et services. Nous offrons également des formations continues et un suivi post-création.'
        },
        {
          id: 6,
          question: 'Comment puis-je soumettre une initiative privée pour être promue par le Centre ?',
          answer: 'Vous pouvez soumettre votre initiative via notre formulaire de contact en ligne en sélectionnant "Développement d\'affaires" comme type de demande. Nos experts évalueront votre projet selon des critères de faisabilité technique, viabilité économique et impact social. Si votre projet est retenu, nous vous accompagnerons dans son développement et sa promotion.'
        },
        {
          id: 7,
          question: 'Puis-je obtenir un soutien ou des ressources pour développer mon initiative privée ?',
          answer: 'Absolument ! Nous offrons un accompagnement complet incluant : conseil technique et stratégique, aide à la recherche de financement, mise en relation avec des partenaires, formation en gestion d\'entreprise, accompagnement juridique pour la formalisation, et accès à notre réseau d\'experts sectoriels. Le niveau de soutien dépend de votre plan d\'abonnement.'
        },
        {
          id: 8,
          question: 'Comment puis-je rester informé des dernières actualités et événements du centre ?',
          answer: 'Inscrivez-vous à notre newsletter pour recevoir nos actualités, abonnez-vous à nos réseaux sociaux, consultez régulièrement notre blog avec des articles et guides pratiques, et participez à nos webinaires et formations. Les membres VIP reçoivent des notifications prioritaires sur les nouvelles opportunités et événements exclusifs.'
        },
        {
          id: 9,
          question: 'Quels sont les partenariats que le centre a établis avec d\'autres organisations ?',
          answer: 'Le CPIP collabore avec les ministères gouvernementaux (MINADER, MINPMEESA, MINEPIA), les institutions financières locales et internationales, les organisations de développement, les chambres de commerce, les universités et centres de recherche, ainsi que des partenaires techniques internationaux. Ces partenariats nous permettent d\'offrir un accompagnement complet et des opportunités diversifiées.'
        },
        {
          id: 10,
          question: 'Comment le centre garantit-il la transparence et la responsabilité dans ses activités ?',
          answer: 'Nous garantissons la transparence par la publication régulière de nos rapports d\'activités, l\'évaluation continue de nos programmes par des experts indépendants, la mise en place de mécanismes de feedback des bénéficiaires, et le respect strict des normes de gouvernance. Tous nos projets sont documentés et leurs impacts mesurés selon des indicateurs précis.'
        }
      ]
    },
    {
      id: 'services',
      name: 'Questions générales',
      icon: MessageCircle,
      questions: [
        {
          id: 1,
          question: 'Qu\'est-ce que PRF ?',
          answer: 'PRF est une plateforme dédiée au développement des entrepreneurs camerounais. Nous offrons l\'accès à des projets validés, des experts sectoriels, un marketplace, et un accompagnement juridique pour la formalisation d\'entreprises.'
        },
        {
          id: 11,
          question: 'Comment puis-je m\'inscrire sur PRF ?',
          answer: 'L\'inscription est simple et gratuite. Cliquez sur "Créer un compte", renseignez vos informations (nom, email, téléphone), et vérifiez votre compte avec le code OTP envoyé par email.'
        },
        {
          id: 12,
          question: 'PRF est-il disponible dans toutes les régions du Cameroun ?',
          answer: 'Oui, PRF est accessible dans toutes les 10 régions du Cameroun. Nos experts et partenaires couvrent l\'ensemble du territoire national pour vous accompagner localement.'
        },
        {
          id: 13,
          question: 'Puis-je utiliser PRF sans abonnement ?',
          answer: 'Oui, vous pouvez accéder gratuitement aux projets publics, au forum communautaire et à certaines fonctionnalités de base. L\'abonnement VIP débloque l\'accès aux contenus premium et aux services d\'experts.'
        }
      ]
    },
    {
      id: 'secteurs',
      name: 'Secteurs et services',
      icon: MessageCircle,
      questions: [
        {
          id: 14,
          question: 'Quels sont les secteurs d\'activités concernés ?',
          answer: 'Le CPIP couvre principalement l\'agriculture (cacao, café, palmier à huile, maraîchage), la pêche et l\'aquaculture, l\'élevage, l\'artisanat et la transformation, les PME et le commerce, la technologie et l\'innovation, ainsi que les services aux entreprises. Nous nous adaptons également aux secteurs émergents selon les besoins du marché.'
        },
        {
          id: 15,
          question: 'Toutes les activités promues bénéficient-elles d\'une recherche de financement ?',
          answer: 'Nous accompagnons tous nos membres dans la recherche de financement adapté à leur projet. Cela inclut l\'identification des sources de financement (banques, microfinance, investisseurs, programmes gouvernementaux), l\'aide à la préparation des dossiers, et la mise en relation avec les partenaires financiers. Le niveau d\'accompagnement varie selon votre plan d\'abonnement.'
        },
        {
          id: 16,
          question: 'Quels sont les services gratuits offerts par le Centre ?',
          answer: 'Nos services gratuits incluent : l\'accès aux projets gouvernementaux publics, la consultation de notre base de données d\'initiatives, la participation au forum communautaire, l\'inscription à notre newsletter, l\'accès aux webinaires publics, et les conseils de base via notre formulaire de contact. Pour un accompagnement personnalisé et l\'accès aux contenus premium, un abonnement est requis.'
        }
      ]
    },
    {
      id: 'subscription',
      name: 'Abonnements et paiements',
      icon: MessageCircle,
      questions: [
        {
          id: 17,
          question: 'Quels sont les différents plans d\'abonnement ?',
          answer: 'Nous proposons 3 plans : Basique (15,000 FCFA/mois), Premium (25,000 FCFA/mois) et Entreprise (50,000 FCFA/mois). Chaque plan offre des avantages croissants selon vos besoins.'
        },
        {
          id: 18,
          question: 'Quels moyens de paiement acceptez-vous ?',
          answer: 'Nous acceptons Mobile Money (MTN MoMo, Orange Money), les virements bancaires et le paiement à la livraison pour certains services. Tous les paiements sont sécurisés.'
        },
        {
          id: 19,
          question: 'Puis-je annuler mon abonnement à tout moment ?',
          answer: 'Oui, vous pouvez annuler votre abonnement à tout moment. Vous continuerez à bénéficier des services jusqu\'à la fin de votre période de facturation en cours.'
        },
        {
          id: 20,
          question: 'Y a-t-il une période d\'essai gratuite ?',
          answer: 'Nous offrons un accès gratuit aux contenus de base. Pour les services premium, contactez notre équipe pour discuter d\'une période d\'essai adaptée à vos besoins.'
        }
      ]
    },
    {
      id: 'projects',
      name: 'Projets et contenus',
      icon: MessageCircle,
      questions: [
        {
          id: 21,
          question: 'Comment les projets sont-ils validés ?',
          answer: 'Tous nos projets sont analysés et validés par nos experts sectoriels. Ils évaluent la faisabilité technique, la viabilité économique et l\'impact social de chaque projet avant publication.'
        },
        {
          id: 22,
          question: 'Puis-je proposer mon propre projet ?',
          answer: 'Absolument ! Vous pouvez soumettre votre projet via notre formulaire de contact. Nos experts l\'évalueront et vous accompagneront dans son développement si il est retenu.'
        },
        {
          id: 23,
          question: 'Les projets VIP valent-ils l\'investissement ?',
          answer: 'Les projets VIP contiennent des analyses détaillées, des plans financiers complets, des chronologies précises et des contacts d\'experts. Ils sont conçus pour maximiser vos chances de succès.'
        },
        {
          id: 24,
          question: 'À quelle fréquence de nouveaux projets sont-ils ajoutés ?',
          answer: 'Nous ajoutons de nouveaux projets chaque semaine. Les abonnés VIP sont notifiés en priorité des nouvelles publications dans leurs domaines d\'intérêt.'
        }
      ]
    },
    {
      id: 'experts',
      name: 'Experts et accompagnement',
      icon: MessageCircle,
      questions: [
        {
          id: 25,
          question: 'Comment puis-je contacter un expert ?',
          answer: 'Avec un abonnement VIP, vous accédez aux coordonnées complètes des experts. Vous pouvez les contacter directement par téléphone ou email selon leurs disponibilités.'
        },
        {
          id: 26,
          question: 'Les consultations avec les experts sont-elles payantes ?',
          answer: 'Les tarifs varient selon l\'expert et le type de consultation. Les abonnés Premium bénéficient de 2h de consultation gratuite par mois, les abonnés Entreprise ont un accès illimité.'
        },
        {
          id: 27,
          question: 'Dans quels domaines avez-vous des experts ?',
          answer: 'Nos experts couvrent l\'agriculture, la pêche, l\'élevage, le juridique, la finance, le marketing, la technologie, et bien d\'autres secteurs clés de l\'économie camerounaise.'
        },
        {
          id: 28,
          question: 'Comment devenir expert sur Infos et Coaching ?',
          answer: 'Nous recrutons des experts expérimentés avec des qualifications reconnues. Envoyez votre CV et vos certifications à notre équipe pour évaluation.'
        }
      ]
    },
    {
      id: 'marketplace',
      name: 'Marketplace',
      icon: MessageCircle,
      questions: [
        {
          id: 29,
          question: 'Comment vendre mes produits sur le marketplace ?',
          answer: 'Créez votre compte vendeur, ajoutez vos produits avec photos et descriptions détaillées. Nos équipes valident les annonces avant publication pour garantir la qualité.'
        },
        {
          id: 30,
          question: 'Y a-t-il des frais pour vendre sur le marketplace ?',
          answer: 'L\'inscription vendeur est gratuite. Nous prélevons une commission de 5% sur les ventes réalisées pour couvrir les frais de plateforme et de paiement sécurisé.'
        },
        {
          id: 31,
          question: 'Comment sont gérées les livraisons ?',
          answer: 'Chaque vendeur gère ses propres livraisons. Nous facilitons la mise en relation et proposons des partenariats avec des services de livraison locaux.'
        },
        {
          id: 32,
          question: 'Que faire en cas de problème avec une commande ?',
          answer: 'Contactez notre service client dans les 48h. Nous médions entre acheteurs et vendeurs pour résoudre les litiges et garantir une expérience satisfaisante.'
        }
      ]
    },
    {
      id: 'legal',
      name: 'Formalisation juridique',
      icon: MessageCircle,
      questions: [
        {
          id: 33,
          question: 'Quels types d\'entreprises pouvez-vous aider à créer ?',
          answer: 'Nous accompagnons la création de SA, SARL, GIC, Coopératives et autres structures juridiques adaptées à votre projet et à vos besoins spécifiques.'
        },
        {
          id: 34,
          question: 'Combien de temps prend la formalisation d\'une entreprise ?',
          answer: 'Le processus varie selon le type d\'entreprise : 2-4 semaines pour un GIC, 4-8 semaines pour une SARL, et 6-12 semaines pour une SA, selon la complexité du dossier.'
        },
        {
          id: 35,
          question: 'Quels documents dois-je fournir ?',
          answer: 'Les documents varient selon la structure choisie. Généralement : pièces d\'identité des associés, justificatifs de domicile, statuts, et attestations de versement de capital.'
        },
        {
          id: 36,
          question: 'Accompagnez-vous après la création de l\'entreprise ?',
          answer: 'Oui, nous offrons un suivi post-création : aide à l\'ouverture de compte bancaire, déclarations fiscales, conseils en gestion, et mise en relation avec des partenaires.'
        }
      ]
    }
  ];

  const allQuestions = faqCategories.flatMap(category => 
    category.questions.map(q => ({ ...q, category: category.name }))
  );

  const filteredQuestions = searchTerm 
    ? allQuestions.filter(q => 
        searchTerm === '' ||
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allQuestions;

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Questions fréquemment posées
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto">
              Trouvez rapidement les réponses à vos questions sur PRF
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher dans les questions..."
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {searchTerm ? (
            /* Search Results */
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Résultats de recherche ({filteredQuestions.length})
              </h2>
              <div className="space-y-4">
                {filteredQuestions.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {item.question}
                        </h3>
                        <span className="text-sm text-blue-600 font-medium">
                          {item.category}
                        </span>
                      </div>
                      {openItems.includes(item.id) ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                    {openItems.includes(item.id) && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Categories */
            <div className="space-y-12">
              {faqCategories.map((category) => (
                <div key={category.id}>
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-full mr-4">
                      <category.icon className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">{category.name}</h2>
                  </div>
                  
                  <div className="space-y-4">
                    {category.questions.map((item) => (
                      <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <button
                          onClick={() => toggleItem(item.id)}
                          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <h3 className="text-lg font-semibold text-gray-900">
                            {item.question}
                          </h3>
                          {openItems.includes(item.id) ? (
                            <ChevronUp className="h-5 w-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-500" />
                          )}
                        </button>
                        {openItems.includes(item.id) && (
                          <div className="px-6 pb-4 border-t border-gray-100">
                            <p className="text-gray-700 leading-relaxed pt-4">{item.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Vous ne trouvez pas votre réponse ?
            </h2>
            <p className="text-xl text-gray-600">
              Notre équipe est là pour vous aider
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                <Mail className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600 mb-4">Envoyez-nous un email</p>
              <a
                href="mailto:contact@infos-coaching.cm"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                contact@infos-coaching.cm
              </a>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
                <Phone className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Téléphone</h3>
              <p className="text-gray-600 mb-4">Appelez-nous directement</p>
              <a
                href="tel:+237671234567"
                className="text-green-600 hover:text-green-800 font-medium"
              >
                +237 671 234 567
              </a>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-600 rounded-full mb-4">
                <MessageCircle className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Chat en direct</h3>
              <p className="text-gray-600 mb-4">Discutez avec notre équipe</p>
              <button className="text-purple-600 hover:text-purple-800 font-medium">
                Démarrer une conversation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Conseils pour bien commencer
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
              <div className="text-3xl mb-4">📚</div>
              <h3 className="font-semibold text-gray-900 mb-2">Explorez les projets</h3>
              <p className="text-sm text-gray-600">Commencez par parcourir nos projets gratuits</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
              <div className="text-3xl mb-4">👥</div>
              <h3 className="font-semibold text-gray-900 mb-2">Rejoignez la communauté</h3>
              <p className="text-sm text-gray-600">Participez aux discussions du forum</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
              <div className="text-3xl mb-4">⭐</div>
              <h3 className="font-semibold text-gray-900 mb-2">Passez VIP</h3>
              <p className="text-sm text-gray-600">Débloquez tous les contenus premium</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="font-semibold text-gray-900 mb-2">Lancez votre projet</h3>
              <p className="text-sm text-gray-600">Mettez en pratique avec nos experts</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}