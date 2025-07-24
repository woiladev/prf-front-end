import React, { useState } from 'react';
import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Clock, Users, TrendingUp, Lock, Crown, Star, Award } from 'lucide-react';
import { apiService, Project as ApiProject } from '../services/api';

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [projects, setProjects] = useState<ApiProject[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Get category from URL params
  const urlParams = useMemo(() => new URLSearchParams(window.location.search), []);
  const categoryFromUrl = urlParams.get('category');

  useEffect(() => {
    if (categoryFromUrl && categoryFromUrl !== selectedCategory) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);
  useEffect(() => {
    loadProjects();
    loadCategories();
  }, []);

  const loadProjects = async () => {
    setIsLoading(true);
    try {
      console.log('Loading projects from API...');
      const response = await apiService.getProjects();
      console.log('Projects API Response:', response);
      if (response.success && response.data) {
        console.log('Projects loaded:', response.data.projects);
        setProjects(response.data.projects);
      } else {
        console.error('Projects API Error:', response.error);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      console.log('Loading categories from API...');
      const response = await apiService.getCategories();
      console.log('Categories API Response:', response);
      if (response.success && response.data) {
        console.log('Categories loaded:', response.data.categories);
        setCategories(response.data.categories);
      } else {
        console.error('Categories API Error:', response.error);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const staticCategories = [
    { id: 'all', name: 'Toutes les initiatives' },
    { id: 'gouvernemental', name: 'Initiatives gouvernementales' },
    { id: 'agriculture', name: 'Agriculture et Rural' },
    { id: 'jeunesse', name: 'Jeunesse et Formation' },
    { id: 'pme', name: 'PME et Artisanat' },
    { id: 'infrastructure', name: 'Infrastructure' },
    { id: 'financement', name: 'Financement' },
    { id: 'cooperatives', name: 'Coopératives' }
  ];

  // Combine API categories with static categories
  const allCategories = [
    { id: 'all', name: 'Toutes les initiatives' },
    ...categories.map(cat => ({ id: cat.name.toLowerCase(), name: cat.name })),
    ...staticCategories.slice(1) // Skip 'all' from static categories
  ];
  const mockProjects = [
    {
      id: 1,
      title: 'PLANUT - Plan National de Développement',
      category: 'gouvernemental',
      description: 'Programme d\'appui à la nutrition et à la transformation agricole visant à moderniser l\'agriculture camerounaise.',
      duration: '5 ans',
      investment: 'Budget gouvernemental',
      participants: 'Producteurs nationaux',
      image: 'https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      accessType: 'free',
      subscriptionPlans: null
    },
    {
      id: 2,
      title: 'PNDP - Programme National de Développement Participatif',
      category: 'gouvernemental',
      description: 'Initiative de développement communautaire qui finance des projets locaux d\'infrastructure.',
      duration: 'Permanent',
      investment: 'Financement public',
      participants: 'Communautés rurales',
      image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      accessType: 'paid',
      subscriptionPlans: {
        classique: { price: '15,000 FCFA', features: ['Aperçu du projet', 'Objectifs principaux', 'Contact de base'] },
        premium: { price: '35,000 FCFA', features: ['Tout Classique', 'Chronologie détaillée', 'Budget complet', 'Livrables'] },
        vip: { price: '65,000 FCFA', features: ['Tout Premium', 'Analyse des risques', 'Contacts privilégiés', 'Support dédié'] }
      }
    },
    {
      id: 3,
      title: 'FEICOM - Fonds d\'Équipement Intercommunal',
      category: 'gouvernemental',
      description: 'Organisme public qui finance les projets d\'équipement des collectivités territoriales.',
      duration: 'Permanent',
      investment: 'Fonds publics',
      participants: 'Collectivités locales',
      image: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      accessType: 'free',
      subscriptionPlans: null
    },
    {
      id: 4,
      title: 'PAJER-U - Projet d\'Appui à la Jeunesse',
      category: 'gouvernemental',
      description: 'Programme dédié à l\'insertion socio-économique des jeunes à travers la formation professionnelle.',
      duration: '7 ans',
      investment: 'Financement international',
      participants: 'Jeunes entrepreneurs',
      image: 'https://images.pexels.com/photos/159751/book-address-book-learning-learn-159751.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      accessType: 'paid',
      subscriptionPlans: {
        classique: { price: '20,000 FCFA', features: ['Informations de base', 'Critères d\'éligibilité', 'Processus de candidature'] },
        premium: { price: '45,000 FCFA', features: ['Tout Classique', 'Guide complet', 'Modèles de dossiers', 'Timeline détaillée'] },
        vip: { price: '80,000 FCFA', features: ['Tout Premium', 'Accompagnement personnalisé', 'Révision de dossier', 'Contacts directs'] }
      }
    },
    {
      id: 5,
      title: 'MINPMEESA - Appui aux PME',
      category: 'gouvernemental',
      description: 'Ministère dédié au développement des petites et moyennes entreprises et de l\'artisanat.',
      duration: 'Permanent',
      investment: 'Budget ministériel',
      participants: 'PME nationales',
      image: 'https://www.minpmeesa.cm/site/inhoud/uploads/2024/02/promote2024.png',
      accessType: 'paid',
      subscriptionPlans: {
        classique: { price: '25,000 FCFA', features: ['Programmes disponibles', 'Conditions générales', 'Contacts de base'] },
        premium: { price: '50,000 FCFA', features: ['Tout Classique', 'Guides détaillés', 'Procédures complètes', 'Calendrier des appels'] },
        vip: { price: '90,000 FCFA', features: ['Tout Premium', 'Coaching personnalisé', 'Révision de projets', 'Réseau privilégié'] }
      }
    },
    {
      id: 6,
      title: 'MINADER - Modernisation Agricole',
      category: 'gouvernemental',
      description: 'Ministère responsable de la politique agricole nationale et du développement rural.',
      duration: 'Permanent',
      investment: 'Budget national',
      participants: 'Agriculteurs nationaux',
      image: 'https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      accessType: 'free',
      subscriptionPlans: null
    }
  ];

  // Transform API projects to match the expected format
  const transformedProjects = projects.map((project) => ({
    id: project.id,
    title: project.name,
    category: 'gouvernemental',
    description: project.description || 'Initiative gouvernementale',
    duration: 'Variable',
    investment: project.is_free ? 'Gratuit' : 'Payant',
    participants: 'Entrepreneurs',
    image: project.image_url ? `https://ghvtest.ghvcameroon.com${project.image_url}` : 'https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
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
    }
  }));

  // Combine API projects with mock projects for display
  const staticProjects = [
    {
      id: 1001,
      title: 'PLANUT - Plan National de Développement',
      category: 'gouvernemental',
      description: 'Programme d\'appui à la nutrition et à la transformation agricole visant à moderniser l\'agriculture camerounaise.',
      duration: '5 ans',
      investment: 'Budget gouvernemental',
      participants: 'Producteurs nationaux',
      image: 'https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      accessType: 'free',
      subscriptionPlans: null
    },
    {
      id: 1002,
      title: 'PNDP - Programme National de Développement Participatif',
      category: 'gouvernemental',
      description: 'Initiative de développement communautaire qui finance des projets locaux d\'infrastructure.',
      duration: 'Permanent',
      investment: 'Financement public',
      participants: 'Communautés rurales',
      image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      accessType: 'paid',
      subscriptionPlans: {
        basic: { price: '15,000 FCFA', features: ['Aperçu du projet', 'Objectifs principaux', 'Contact de base'] },
        classic: { price: '35,000 FCFA', features: ['Tout Basic', 'Chronologie détaillée', 'Budget complet', 'Livrables'] },
        premium: { price: '65,000 FCFA', features: ['Tout Classic', 'Analyse des risques', 'Contacts privilégiés', 'Support dédié'] }
      }
    }
  ];

  const allProjects = [...transformedProjects, ...staticProjects];

  const filteredProjects = allProjects.filter(project => {
    const matchesSearch = searchTerm === '' || 
                         project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.participants.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.investment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Debug logging
  console.log('API Projects:', transformedProjects.length);
  console.log('Static Projects:', staticProjects.length);
  console.log('All Projects:', allProjects.length);
  console.log('Filtered Projects:', filteredProjects.length);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="relative bg-gradient-to-r from-blue-900 via-green-900 to-blue-800 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-black/50"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://www.afdb.org/sites/default/files/styles/1700x900/public/a1-dg-afrique-centrale-et-vp-marie-laure-2.jpg?itok=4quY-Ftc')`
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-green-900/30 to-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-1/3 w-72 h-72 bg-blue-500/25 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-emerald-500/20 rounded-full blur-2xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-2xl text-shadow-glow">
              Initiatives gouvernementales
            </h1>
            <p className="text-xl text-white/95 max-w-3xl mx-auto drop-shadow-xl text-shadow-glow">
              Découvrez les programmes et initiatives du gouvernement camerounais pour soutenir 
              l'entrepreneuriat et le développement économique.
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
                placeholder="Rechercher une initiative..."
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
                {allCategories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Initiatives disponibles ({filteredProjects.length})
            </h2>
            <p className="text-gray-600">
              {selectedCategory !== 'all' && `Catégorie: ${allCategories.find(cat => cat.id === selectedCategory)?.name || selectedCategory} • `}
              {searchTerm && `Recherche: "${searchTerm}" • `}
              {transformedProjects.length} de l'API + {staticProjects.length} exemples
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Chargement des initiatives...</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="text-gray-400 mb-4">
                  <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {searchTerm || selectedCategory !== 'all' 
                    ? 'Aucune initiative trouvée' 
                    : 'Aucune initiative disponible'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || selectedCategory !== 'all'
                    ? 'Essayez de modifier vos critères de recherche'
                    : 'Les initiatives seront bientôt disponibles'}
                </p>
                {(searchTerm || selectedCategory !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Voir toutes les initiatives
                  </button>
                )}
              </div>
            </div>
          ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover-lift animate-scale-in">
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                  />
                  {project.accessType === 'paid' && (
                    <div className="absolute top-4 right-4 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                      <Lock className="h-3 w-3 mr-1 animate-pulse" />
                      Premium
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                    {project.category}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {project.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {project.participants}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-green-600 font-semibold">
                      {project.investment}
                    </div>
                    
                    <div className="flex flex-col items-end space-y-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        project.accessType === 'paid'
                          ? 'bg-orange-100 text-orange-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {project.accessType === 'paid' ? 'Payante' : 'Accès gratuit'}
                      </span>
                      <Link
                        to={`/projects/${project.id}`}
                        className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 shadow-md transform hover:scale-105 hover:shadow-lg"
                      >
                        Voir détails
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Besoin d'accompagnement ?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            PRF vous accompagne pour identifier et accéder aux programmes gouvernementaux adaptés
          </p>
          <Link
            to="/experts"
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg transform hover:scale-105 hover:shadow-2xl inline-block hover-lift"
          >
            Consulter nos experts
          </Link>
        </div>
      </section>
    </div>
  );
}