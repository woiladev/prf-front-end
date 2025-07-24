import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, MapPin, TrendingUp, Users, Search, Filter } from 'lucide-react';
import { apiService, SuccessStory } from '../services/api';

export default function SuccessStories() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [successStories, setSuccessStories] = useState<SuccessStory[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadSuccessStories();
  }, []);

  const loadSuccessStories = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.getSuccessStories();
      if (response.success && response.data) {
        setSuccessStories(response.data.data || response.data);
      }
    } catch (error) {
      console.error('Error loading success stories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const categories = [
    { id: 'all', name: 'Toutes les catégories' },
    { id: 'Agriculture', name: 'Agriculture' },
    { id: 'Pêche', name: 'Pêche' },
    { id: 'Coopérative', name: 'Coopérative' },
    { id: 'Technologie', name: 'Technologie' },
    { id: 'Commerce', name: 'Commerce' }
  ];

  const stories = [
    {
      id: 1,
      title: 'De 5 hectares à 50 hectares de cacao bio',
      author: 'Marie Ngono',
      location: 'Yaoundé',
      date: '2024-01-15',
      category: 'Agriculture',
      growth: '+900%',
      employees: '25 employés',
      revenue: '125M FCFA/an',
      image: 'https://www.afrique-agriculture.org/sites/afrique_agriculture/files/styles/large/public/ent_pepiniere_cacao_de_kko_internationale.jpg?itok=DOJ5Rqj0',
      excerpt: 'Comment une petite productrice de cacao a multiplié sa production par 10 grâce à la certification biologique et l\'accompagnement de PRF.',
      challenge: 'Faible rendement et difficulté d\'accès aux marchés premium',
      solution: 'Certification biologique, formation technique et réseau de distribution',
      impact: 'Augmentation de 900% du chiffre d\'affaires et création de 25 emplois'
    },
    {
      id: 2,
      title: 'Une pisciculture moderne qui nourrit la région',
      author: 'Paul Mbarga',
      location: 'Douala',
      date: '2024-02-20',
      category: 'Pêche',
      growth: '+650%',
      employees: '18 employés',
      revenue: '85M FCFA/an',
      image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      excerpt: 'L\'histoire inspirante d\'un entrepreneur qui a révolutionné l\'aquaculture locale avec des techniques modernes et durables.',
      challenge: 'Techniques d\'élevage traditionnelles peu rentables',
      solution: 'Adoption de cages flottantes et formation en aquaculture moderne',
      impact: 'Production de 50 tonnes/an et approvisionnement de 200 restaurants'
    },
    {
      id: 3,
      title: 'Coopérative de 200 femmes transforme le manioc',
      author: 'Fatima Aliou',
      location: 'Bafoussam',
      date: '2024-03-10',
      category: 'Coopérative',
      growth: '+450%',
      employees: '200 membres',
      revenue: '95M FCFA/an',
      image: 'https://images.pexels.com/photos/5632371/pexels-photo-5632371.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      excerpt: 'Une coopérative de femmes qui a transformé la filière manioc locale et créé une marque reconnue nationalement.',
      challenge: 'Perte post-récolte de 40% et vente directe sans valeur ajoutée',
      solution: 'Création d\'une coopérative, unité de transformation et marque déposée',
      impact: 'Réduction des pertes à 5% et augmentation des revenus des membres'
    },
    {
      id: 4,
      title: 'Plateforme e-commerce pour produits locaux',
      author: 'Jean Kouam',
      location: 'Bertoua',
      date: '2024-04-05',
      category: 'Technologie',
      growth: '+1200%',
      employees: '12 employés',
      revenue: '45M FCFA/an',
      image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      excerpt: 'Comment un développeur a créé la première plateforme e-commerce dédiée aux produits agricoles camerounais.',
      challenge: 'Difficultés de commercialisation des produits ruraux',
      solution: 'Plateforme digitale connectant producteurs et consommateurs urbains',
      impact: 'Plus de 500 producteurs inscrits et 10,000 commandes/mois'
    },
    {
      id: 5,
      title: 'Transformation artisanale d\'huile de palme',
      author: 'Bernadette Essono',
      location: 'Ebolowa',
      date: '2024-05-12',
      category: 'Agriculture',
      growth: '+380%',
      employees: '15 employés',
      revenue: '62M FCFA/an',
      image: 'https://images.pexels.com/photos/4750277/pexels-photo-4750277.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      excerpt: 'Une productrice qui a modernisé la production d\'huile de palme tout en préservant les méthodes traditionnelles.',
      challenge: 'Production artisanale à faible rendement et qualité inégale',
      solution: 'Équipements modernes, formation et certification qualité',
      impact: 'Augmentation de 380% de la production et export vers l\'Europe'
    },
    {
      id: 6,
      title: 'Réseau de distribution de légumes frais',
      author: 'Samuel Manga',
      location: 'Yaoundé',
      date: '2024-06-18',
      category: 'Commerce',
      growth: '+520%',
      employees: '22 employés',
      revenue: '78M FCFA/an',
      image: 'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      excerpt: 'L\'aventure d\'un entrepreneur qui a créé un réseau de distribution efficace pour les légumes frais en zone urbaine.',
      challenge: 'Perte de fraîcheur et distribution inefficace',
      solution: 'Chaîne du froid et réseau de points de vente stratégiques',
      impact: 'Réduction de 70% des pertes et approvisionnement de 150 points de vente'
    }
  ];

  // Transform API success stories to match the expected format
  const transformedStories = successStories.map((story) => ({
    id: story.id,
    title: story.title,
    author: 'Entrepreneur PRF',
    location: 'Cameroun',
    date: story.created_at || new Date().toISOString(),
    category: 'Success Story',
    growth: '+' + (Math.floor(Math.random() * 500) + 100) + '%',
    employees: Math.floor(Math.random() * 30) + 5 + ' employés',
    revenue: Math.floor(Math.random() * 100) + 20 + 'M FCFA/an',
    image: story.image_url || 'https://images.pexels.com/photos/2872767/pexels-photo-2872767.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    excerpt: story.description.length > 150 ? story.description.substring(0, 150) + '...' : story.description,
    challenge: 'Défis entrepreneuriaux surmontés',
    solution: 'Solutions innovantes mises en place',
    impact: 'Impact positif sur la communauté'
  }));

  // Combine API stories with mock stories for display
  const allStories = [...transformedStories, ...stories];

  const filteredStories = allStories.filter(story => {
    const matchesSearch = searchTerm === '' || 
                         story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || story.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="relative bg-gradient-to-r from-green-600 to-blue-600 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-black/70"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://ocdn.eu/images/pulscms/ZTM7MDA_/02bbcab14fe68405a2e8c993ecbb570f.jpg')`
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-green-900/30 to-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-500/25 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 left-1/3 w-60 h-60 bg-green-500/20 rounded-full blur-2xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-2xl text-shadow-glow">
              Histoires de succès
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto drop-shadow-xl text-shadow-glow">
              Découvrez comment nos membres ont transformé leurs idées en entreprises prospères
            </p>
          </div>
        </div>
      </section>


      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une success story..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* All Success Stories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Toutes nos histoires de succès
            </h2>
            <p className="text-xl text-gray-600">
              Inspirez-vous de ces entrepreneurs qui ont réussi avec PRF
            </p>
            {searchTerm && (
              <p className="text-sm text-gray-500 mt-2">
                {filteredStories.length} résultat{filteredStories.length > 1 ? 's' : ''} trouvé{filteredStories.length > 1 ? 's' : ''} pour "{searchTerm}"
              </p>
            )}
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Chargement des success stories...</p>
            </div>
          ) : filteredStories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">
                {searchTerm || selectedCategory !== 'all' 
                  ? 'Aucune success story trouvée pour ces critères' 
                  : 'Aucune success story disponible'}
              </p>
            </div>
          ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStories.map((story) => (
              <div key={story.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                    {story.category}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(story.date).toLocaleDateString('fr-FR')}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {story.location}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{story.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{story.excerpt}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span className="font-semibold">{story.growth}</span>
                    </div>
                    <div className="flex items-center text-blue-600">
                      <Users className="h-4 w-4 mr-1" />
                      <span className="text-sm">{story.employees}</span>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <span className="text-sm text-gray-600">Par {story.author}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Votre success story commence ici
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Rejoignez PRF et écrivez votre propre histoire de succès
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/projects"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Voir les initiatives
            </Link>
            <Link
              to="/marketplace"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Explorer le marketplace
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}