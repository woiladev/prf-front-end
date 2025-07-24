import React, { useState } from 'react';
import { useEffect } from 'react';
import { Search, Filter, Star, MapPin, Phone, Mail, Calendar, ArrowLeft } from 'lucide-react';
import { useSubscription } from '../contexts/SubscriptionContext';
import { useParams, Link } from 'react-router-dom';
import { apiService, ServiceProvider, ServiceProviderReview } from '../services/api';

export default function ExpertDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [selectedExpert, setSelectedExpert] = useState<number | null>(null);
  const [showCommentForm, setShowCommentForm] = useState<number | null>(null);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    email: '',
    rating: 5,
    comment: ''
  });
  const [serviceProviders, setServiceProviders] = useState<ServiceProvider[]>([]);
  const [expertReviews, setExpertReviews] = useState<{ [key: number]: ServiceProviderReview[] }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const { isVip } = useSubscription();
  const { id } = useParams();

  // If there's an ID in the URL, show expert detail
  React.useEffect(() => {
    if (id) {
      setSelectedExpert(parseInt(id));
    }
  }, [id]);

  useEffect(() => {
    loadServiceProviders();
  }, []);

  useEffect(() => {
    // Load reviews for all experts when they are loaded
    if (serviceProviders.length > 0) {
      loadAllExpertReviews();
    }
  }, [serviceProviders]);

  const loadServiceProviders = async () => {
    setIsLoading(true);
    try {
      console.log('Loading service providers from API...');
      const response = await apiService.getServiceProviders();
      console.log('Service Providers API Response:', response);
      if (response.success && response.data) {
        console.log('Service providers loaded:', response.data.service_providers);
        setServiceProviders(response.data.service_providers);
      } else {
        console.error('Service Providers API Error:', response.error);
      }
    } catch (error) {
      console.error('Error loading service providers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAllExpertReviews = async () => {
    try {
      const reviewsData: { [key: number]: ServiceProviderReview[] } = {};
      
      // Load reviews for all service providers
      for (const provider of serviceProviders) {
        try {
          const response = await apiService.getServiceProviderReviews(provider.id);
          if (response.success && response.data) {
            reviewsData[provider.id] = response.data.reviews;
          } else {
            reviewsData[provider.id] = [];
          }
        } catch (error) {
          console.error(`Error loading reviews for expert ${provider.id}:`, error);
          reviewsData[provider.id] = [];
        }
      }
      
      setExpertReviews(reviewsData);
    } catch (error) {
      console.error('Error loading expert reviews:', error);
    }
  };

  const loadExpertReviews = async (expertId: number) => {
    try {
      const response = await apiService.getServiceProviderReviews(expertId);
      if (response.success && response.data) {
        setExpertReviews(prev => ({
          ...prev,
          [expertId]: response.data.reviews
        }));
      }
    } catch (error) {
      console.error(`Error loading reviews for expert ${expertId}:`, error);
    }
  };

  const handleSubmitReview = async (expertId: number) => {
    if (!reviewForm.name.trim() || !reviewForm.email.trim()) {
      alert('Le nom et l\'email sont requis');
      return;
    }

    setIsSubmittingReview(true);
    try {
      const response = await apiService.addServiceProviderReview(expertId, {
        name: reviewForm.name.trim(),
        email: reviewForm.email.trim(),
        rating: reviewForm.rating,
        comment: reviewForm.comment.trim() || undefined
      });
      
      if (response.success) {
        // Reset form
        setReviewForm({ name: '', email: '', rating: 5, comment: '' });
        setShowCommentForm(null);
        
        // Reload reviews for this expert
        await loadExpertReviews(expertId);
        
        // Show success message
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        notification.textContent = 'Avis publié avec succès!';
        document.body.appendChild(notification);
        
        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification);
          }
        }, 3000);
      } else {
        throw new Error(response.error || 'Erreur lors de la publication');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      
      // Show error message
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      notification.textContent = 'Erreur lors de la publication de l\'avis';
      document.body.appendChild(notification);
      
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 3000);
    } finally {
      setIsSubmittingReview(false);
    }
  };
  const domains = [
    { id: 'all', name: 'Tous les experts' },
    { id: 'agriculture', name: 'Agriculture' },
    { id: 'fishing', name: 'Pêche' },
    { id: 'legal', name: 'Juridique' },
    { id: 'finance', name: 'Finance' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'technology', name: 'Technologie' }
  ];

  const experts = [
    {
      id: 1,
      name: 'Dr. Marie Ngono',
      title: 'Agro-économiste',
      domain: 'agriculture',
      experience: '15 ans',
      rating: 4.9,
      reviews: 47,
      location: 'Yaoundé',
      specialties: ['Cacao bio', 'Certification', 'Coopératives'],
      image: 'https://etfovoice.ca/sites/default/files/0W2A9884.jpg',
      description: 'Spécialiste en développement de filières agricoles durables avec une expertise particulière dans la certification bio.',
      phone: '+237 671 234 567',
      email: 'marie.ngono@expert.cm',
      price: '25,000 FCFA/h',
      availability: 'Disponible'
    },
    {
      id: 2,
      name: 'Paul Mbarga',
      title: 'Expert en aquaculture',
      domain: 'fishing',
      experience: '12 ans',
      rating: 4.8,
      reviews: 35,
      location: 'Douala',
      specialties: ['Pisciculture', 'Élevage en cage', 'Transformation'],
      image: 'https://media.cnn.com/api/v1/images/stellar/prod/211213130214-restricted-rich-serunjogi.jpg?q=w_1110,c_fill',
      description: 'Expert en développement de projets aquacoles modernes et durables pour les petits producteurs.',
      phone: '+237 682 345 678',
      email: 'paul.mbarga@expert.cm',
      price: '30,000 FCFA/h',
      availability: 'Occupé'
    },
    {
      id: 3,
      name: 'Maître Fatima Aliou',
      title: 'Avocate fiscaliste',
      domain: 'legal',
      experience: '20 ans',
      rating: 5.0,
      reviews: 28,
      location: 'Bafoussam',
      specialties: ['Droit des affaires', 'Fiscalité', 'Création d\'entreprise'],
      image: 'https://cdn.businessday.ng/2022/02/Canada-Black-Entrepreneurship-Program-1.jpg',
      description: 'Avocate spécialisée dans l\'accompagnement juridique des entrepreneurs et la formalisation d\'entreprises.',
      phone: '+237 693 456 789',
      email: 'fatima.aliou@expert.cm',
      price: '35,000 FCFA/h',
      availability: 'Disponible'
    },
    {
      id: 4,
      name: 'Jean Kouam',
      title: 'Consultant financier',
      domain: 'finance',
      experience: '10 ans',
      rating: 4.7,
      reviews: 22,
      location: 'Bertoua',
      specialties: ['Microfinance', 'Business plan', 'Investissement'],
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRERwTeH3S50U5rwKoBwX3LL5Omm6-lCbokdw&s',
      description: 'Consultant en finance pour PME avec une expertise dans la structuration financière des projets.',
      phone: '+237 674 567 890',
      email: 'jean.kouam@expert.cm',
      price: '28,000 FCFA/h',
      availability: 'Disponible'
    },
    {
      id: 5,
      name: 'Bernadette Essono',
      title: 'Experte en marketing digital',
      domain: 'marketing',
      experience: '8 ans',
      rating: 4.9,
      reviews: 31,
      location: 'Ebolowa',
      specialties: ['Marketing digital', 'E-commerce', 'Communication'],
      image: 'https://africa.com/wp-content/uploads/2019/05/agriculture-entrepreneurs.jpg',
      description: 'Spécialiste du marketing digital pour les entrepreneurs africains avec focus sur les réseaux sociaux.',
      phone: '+237 676 789 012',
      email: 'bernadette.essono@expert.cm',
      price: '22,000 FCFA/h',
      availability: 'Disponible'
    },
    {
      id: 6,
      name: 'Dr. Samuel Manga',
      title: 'Développeur senior',
      domain: 'technology',
      experience: '14 ans',
      rating: 4.8,
      reviews: 18,
      location: 'Yaoundé',
      specialties: ['Applications mobiles', 'E-commerce', 'Plateformes web'],
      image: 'https://ui-avatars.com/api/?name=Samuel+Manga&background=06b6d4&color=fff&size=300',
      description: 'Développeur spécialisé dans les solutions technologiques pour les entreprises locales.',
      phone: '+237 687 890 123',
      email: 'samuel.manga@expert.cm',
      price: '40,000 FCFA/h',
      availability: 'Disponible'
    }
  ];

  // Transform API service providers to match the expected format
  const transformedProviders = serviceProviders.map((provider) => ({
    id: provider.id,
    name: provider.name,
    title: provider.job_title || 'Expert',
    domain: 'general',
    experience: '5+ ans',
    rating: expertReviews[provider.id] && expertReviews[provider.id].length > 0 
      ? expertReviews[provider.id].reduce((sum, review) => sum + review.rating, 0) / expertReviews[provider.id].length 
      : 0,
    reviews: expertReviews[provider.id] ? expertReviews[provider.id].length : 0,
    location: provider.location || 'Cameroun',
    specialties: ['Conseil', 'Expertise'],
    image: provider.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(provider.name)}&background=06b6d4&color=fff&size=300`,
    description: provider.description || 'Expert qualifié dans son domaine',
    phone: provider.phone || '+237 6XX XXX XXX',
    email: provider.email,
    price: '25,000 FCFA/h',
    availability: 'Disponible'
  }));

  // Combine API providers with mock experts for display
  const allExperts = [...transformedProviders, ...experts];

  const filteredExperts = allExperts.filter(expert => {
    const matchesSearch = searchTerm === '' || 
                         expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expert.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expert.specialties.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDomain = selectedDomain === 'all' || expert.domain === selectedDomain;
    return matchesSearch && matchesDomain;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="relative bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-black/70"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://www.afdb.org/sites/default/files/styles/1700x900/public/a1-pr-cam.jpg?itok=fITCC8hv')`
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-orange-900/30 to-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-500/25 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-60 h-60 bg-red-500/20 rounded-full blur-2xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-2xl text-shadow-glow">
              Centre de Métier
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto drop-shadow-xl text-shadow-glow">
              Connectez-vous avec les meilleurs spécialistes camerounais pour développer votre entreprise
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un spécialiste..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
              >
                {domains.map(domain => (
                  <option key={domain.id} value={domain.id}>
                    {domain.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Experts Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Chargement des experts...</p>
            </div>
          ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExperts.map((expert) => (
              <div key={expert.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover-lift animate-scale-in">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={expert.image}
                      alt={expert.name}
                      className="w-16 h-16 rounded-full object-cover mr-4 transition-transform duration-300 hover:scale-110"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{expert.name}</h3>
                      <p className="text-gray-600">{expert.title}</p>
                      <div className="flex items-center mt-1">
                        {renderStars(expert.rating)}
                        <span className="ml-1 text-sm text-gray-600">({expert.reviews})</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-sm">{expert.description}</p>
                  
                  <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {expert.location}
                    </div>
                    <div>{expert.experience} d'exp.</div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Spécialités</h4>
                    <div className="flex flex-wrap gap-2">
                      {expert.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center mb-4">
                    <div className={`text-sm px-2 py-1 rounded-full ${
                      expert.availability === 'Disponible' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {expert.availability}
                    </div>
                  </div>
                  
                  {isVip ? (
                    <div className="flex space-x-2">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.href = `/experts/${expert.id}`;
                        }}
                        className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center hover:scale-105 hover:shadow-lg"
                      >
                        Voir profil
                      </a>
                      <a
                        href={`tel:${expert.phone}`}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center hover:scale-105 hover:shadow-lg"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Appeler
                      </a>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.href = `/experts/${expert.id}`;
                        }}
                        className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center hover:scale-105 hover:shadow-lg"
                      >
                        Voir profil
                      </a>
                      <div className="flex-1 bg-gray-300 text-gray-600 py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center cursor-not-allowed">
                        <Phone className="h-4 w-4 mr-1" />
                        VIP
                      </div>
                    </div>
                  )}
                
                {/* Comments and Rating Section */}
                <div className="mt-6 border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">Avis clients</h4>
                    <button
                      onClick={() => setShowCommentForm(showCommentForm === expert.id ? null : expert.id)}
                      className="text-orange-600 hover:text-orange-800 text-sm font-medium"
                    >
                      {showCommentForm === expert.id ? 'Annuler' : 'Laisser un avis'}
                    </button>
                  </div>
                  
                  {/* Comment Form */}
                  {showCommentForm === expert.id && (
                    <div className="mb-4 p-4 bg-orange-50 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                          <input
                            type="text"
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                            value={reviewForm.name}
                            onChange={(e) => setReviewForm(prev => ({ ...prev, name: e.target.value }))}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                          <input
                            type="email"
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                            value={reviewForm.email}
                            onChange={(e) => setReviewForm(prev => ({ ...prev, email: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
                              className={`h-6 w-6 ${star <= reviewForm.rating ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400 transition-colors`}
                            >
                              <Star className="h-full w-full fill-current" />
                            </button>
                          ))}
                        </div>
                      </div>
                      <textarea
                        placeholder="Partagez votre expérience avec ce spécialiste..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                        rows={3}
                        value={reviewForm.comment}
                        onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                      />
                      <div className="flex space-x-2 mt-3">
                        <button
                          onClick={() => {
                            handleSubmitReview(expert.id);
                          }}
                          disabled={isSubmittingReview || !reviewForm.name.trim() || !reviewForm.email.trim()}
                          className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                        >
                          {isSubmittingReview ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          ) : null}
                          Publier
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowCommentForm(null)}
                          className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          Annuler
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Real Reviews from Backend */}
                  <div className="space-y-3">
                    {expertReviews[expert.id] && expertReviews[expert.id].length > 0 ? (
                      expertReviews[expert.id].slice(0, 2).map((review) => (
                        <div key={review.id} className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-2">
                                {review.name.charAt(0).toUpperCase()}
                              </div>
                              <span className="font-medium text-gray-900">{review.name}</span>
                            </div>
                            <div className="flex items-center">
                              {renderStars(review.rating)}
                              <span className="ml-1 text-xs text-gray-600">({review.rating}/5)</span>
                            </div>
                          </div>
                          {review.comment && (
                            <p className="text-gray-700 text-sm mb-2">
                              {review.comment}
                            </p>
                          )}
                          <p className="text-xs text-gray-500">
                            {review.created_at ? new Date(review.created_at).toLocaleDateString('fr-FR') : 'Récemment'}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-gray-600 text-sm">Aucun avis pour le moment</p>
                        <p className="text-xs text-gray-500">Soyez le premier à laisser un avis!</p>
                      </div>
                    )}
                    
                    {/* Show "View all reviews" link if there are more than 2 reviews */}
                    {expertReviews[expert.id] && expertReviews[expert.id].length > 2 && (
                      <div className="text-center">
                        <Link
                          to={`/experts/${expert.id}`}
                          className="text-orange-600 hover:text-orange-800 text-sm font-medium"
                        >
                          Voir tous les avis ({expertReviews[expert.id].length})
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </section>

    </div>
  );
}