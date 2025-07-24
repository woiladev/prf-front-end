import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Phone, Mail, Calendar, Clock, Award, CheckCircle, MessageCircle, User } from 'lucide-react';
import { useSubscription } from '../contexts/SubscriptionContext';
import { apiService, ServiceProvider, ServiceProviderReview, CreateReviewRequest } from '../services/api';

export default function ExpertDetail() {
  const { id } = useParams();
  const [serviceProvider, setServiceProvider] = useState<ServiceProvider | null>(null);
  const [reviews, setReviews] = useState<ServiceProviderReview[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    email: '',
    rating: 5,
    comment: ''
  });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { isVip } = useSubscription();

  const loadServiceProvider = async (providerId: number) => {
    setIsLoading(true);
    try {
      const response = await apiService.getServiceProvider(providerId);
      if (response.success && response.data) {
        setServiceProvider(response.data.service_provider);
      }
    } catch (error) {
      console.error('Error loading service provider:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadReviews = async (providerId: number) => {
    try {
      const response = await apiService.getServiceProviderReviews(providerId);
      if (response.success && response.data) {
        setReviews(response.data.reviews);
      }
    } catch (error) {
      console.error('Error loading reviews:', error);
    }
  };

  useEffect(() => {
    if (id) {
      loadServiceProvider(parseInt(id));
      loadReviews(parseInt(id));
    }
  }, [id]);

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
      availability: 'Disponible',
      education: [
        'Doctorat en Agro-économie - Université de Yaoundé I',
        'Master en Développement Rural - IRAD',
        'Certification Bio - Ecocert'
      ],
      achievements: [
        '200+ producteurs accompagnés vers la certification bio',
        'Expert consultant pour le MINADER',
        'Formatrice certifiée en agriculture durable',
        'Auteure de 15 publications scientifiques'
      ],
      services: [
        'Audit et diagnostic d\'exploitation',
        'Accompagnement certification bio',
        'Formation en techniques durables',
        'Montage de dossiers de financement'
      ]
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
      availability: 'Occupé',
      education: [
        'Ingénieur Halieute - Université de Douala',
        'Formation en aquaculture intensive - FAO',
        'Certification en transformation du poisson'
      ],
      achievements: [
        '50+ fermes piscicoles créées',
        'Expert technique pour le MINEPIA',
        'Formateur en techniques modernes d\'élevage',
        'Consultant international en aquaculture'
      ],
      services: [
        'Conception de fermes piscicoles',
        'Formation en élevage en cage',
        'Optimisation de la production',
        'Accompagnement technique'
      ]
    }
  ];

  // Use API service provider if available, otherwise use mock data
  const expert = serviceProvider ? {
    id: serviceProvider.id,
    name: serviceProvider.name,
    title: serviceProvider.job_title || 'Expert',
    domain: 'general',
    experience: '5+ ans',
    rating: reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 4.5,
    reviews: reviews.length,
    location: serviceProvider.location || 'Cameroun',
    specialties: ['Conseil', 'Expertise'],
    image: serviceProvider.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(serviceProvider.name)}&background=06b6d4&color=fff&size=300`,
    description: serviceProvider.description || 'Expert qualifié dans son domaine',
    phone: serviceProvider.phone || '+237 6XX XXX XXX',
    email: serviceProvider.email,
    price: '25,000 FCFA/h',
    availability: 'Disponible',
    education: [
      'Formation professionnelle certifiée',
      'Expérience terrain reconnue',
      'Expertise sectorielle'
    ],
    achievements: [
      'Expert reconnu dans son domaine',
      'Accompagnement de nombreux projets',
      'Formation et conseil personnalisé'
    ],
    services: [
      'Consultation personnalisée',
      'Accompagnement de projets',
      'Formation et coaching',
      'Expertise technique'
    ]
  } : experts.find(e => e.id === parseInt(id || '0'));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de l'expert...</p>
        </div>
      </div>
    );
  }

  if (!expert && !isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Expert non trouvé</h2>
          <Link
            to="/experts"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Retour aux experts
          </Link>
        </div>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !reviewForm.name.trim() || !reviewForm.email.trim()) {
      return;
    }

    setIsSubmittingReview(true);
    try {
      const reviewData: CreateReviewRequest = {
        name: reviewForm.name.trim(),
        email: reviewForm.email.trim(),
        rating: reviewForm.rating,
        comment: reviewForm.comment.trim() || undefined
      };

      const response = await apiService.addServiceProviderReview(parseInt(id), reviewData);
      
      if (response.success) {
        // Reset form
        setReviewForm({ name: '', email: '', rating: 5, comment: '' });
        setShowReviewForm(false);
        // Reload reviews
        await loadReviews(parseInt(id));
        
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/experts"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Retour aux experts
          </Link>
        </div>
      </div>

      {/* Expert Profile */}
      <section className="relative py-8 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop')`
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/95 via-gray-50/98 to-gray-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-md overflow-hidden relative z-10">
            <div className="p-8">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Profile Image and Basic Info */}
                <div className="lg:w-1/3">
                  <img
                    src={expert.image}
                    alt={expert.name}
                    className="w-full h-64 lg:h-80 object-cover rounded-lg mb-6"
                  />
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        expert.availability === 'Disponible' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {expert.availability}
                      </span>
                    </div>
                    
                    {isVip ? (
                      <div className="space-y-2">
                        <a
                          href={`tel:${expert.phone}`}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          Appeler
                        </a>
                        <a
                          href={`mailto:${expert.email}`}
                          className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Email
                        </a>
                        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          Réserver
                        </button>
                      </div>
                    ) : (
                      <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-blue-800 mb-3">Accès VIP requis pour contacter directement cet expert</p>
                        <Link
                          to="/projects"
                          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                        >
                          Devenir VIP
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                {/* Detailed Information */}
                <div className="lg:w-2/3">
                  <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{expert.name}</h1>
                    <p className="text-xl text-gray-600 mb-4">{expert.title}</p>
                    
                    <div className="flex items-center space-x-6 mb-4">
                      <div className="flex items-center">
                        {renderStars(expert.rating)}
                        <span className="ml-2 text-sm text-gray-600">({expert.reviews} avis)</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        {expert.location}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        {expert.experience} d'expérience
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Spécialités</h3>
                      <div className="flex flex-wrap gap-2">
                        {expert.specialties.map((specialty, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-gray-700 mb-8">{expert.description}</p>
                  </div>

                  {/* Education */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <Award className="h-5 w-5 mr-2" />
                      Formation
                    </h3>
                    <ul className="space-y-2">
                      {expert.education.map((edu, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                          <span className="text-gray-700">{edu}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Achievements */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Réalisations</h3>
                    <ul className="space-y-2">
                      {expert.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                          <span className="text-gray-700">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Services */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Services proposés</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {expert.services.map((service, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <span className="text-gray-700">{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <MessageCircle className="h-6 w-6 mr-3 text-blue-600" />
                Avis clients ({reviews.length})
              </h2>
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                {showReviewForm ? 'Annuler' : 'Laisser un avis'}
              </button>
            </div>

            {/* Review Form */}
            {showReviewForm && (
              <div className="bg-blue-50 rounded-xl p-6 mb-8 border border-blue-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Partager votre expérience</h3>
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nom *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={reviewForm.name}
                        onChange={(e) => setReviewForm(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={reviewForm.email}
                        onChange={(e) => setReviewForm(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Note *</label>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
                          className={`h-8 w-8 ${star <= reviewForm.rating ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400 transition-colors`}
                        >
                          <Star className="h-full w-full fill-current" />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Commentaire (optionnel)
                    </label>
                    <textarea
                      placeholder="Partagez votre expérience avec cet expert..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      rows={4}
                      value={reviewForm.comment}
                      onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                    />
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      disabled={isSubmittingReview}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
                    >
                      {isSubmittingReview ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      ) : null}
                      Publier l'avis
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Reviews List */}
            <div className="space-y-6">
              {reviews.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Aucun avis pour le moment</p>
                  <p className="text-sm text-gray-500">Soyez le premier à laisser un avis!</p>
                </div>
              ) : (
                reviews.map((review) => (
                  <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3">
                          <User className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{review.name}</h4>
                          <div className="flex items-center mt-1">
                            {renderStars(review.rating)}
                            <span className="ml-2 text-sm text-gray-600">({review.rating}/5)</span>
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">
                        {review.created_at ? new Date(review.created_at).toLocaleDateString('fr-FR') : 'Récemment'}
                      </span>
                    </div>
                    {review.comment && (
                      <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}