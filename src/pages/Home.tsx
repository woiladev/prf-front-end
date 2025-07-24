import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, TrendingUp, Shield, Star, ChevronLeft, ChevronRight, Eye, Calendar } from 'lucide-react';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const features = [
    {
      icon: Users,
      title: 'Communauté d\'entrepreneurs',
      description: 'Rejoignez une communauté dynamique de producteurs et entrepreneurs camerounais.'
    },
    {
      icon: TrendingUp,
      title: 'Initiatives gouvernementales',
      description: 'Accédez aux programmes gouvernementaux analysés et validés par nos experts.'
    },
    {
      icon: Shield,
      title: 'Formalisation / Structuration',
      description: 'Bénéficiez d\'un accompagnement pour la formalisation et structuration de votre entreprise.'
    },
    {
      icon: Star,
      title: 'Centre de Métier',
      description: 'Connectez-vous avec des spécialistes en agriculture, pêche et coopératives.'
    }
  ];

  const testimonials = [
    {
      name: 'Marie Ngono',
      role: 'Productrice de cacao',
      content: 'Grâce au PRF, j\'ai pu formaliser ma coopérative et accéder à de nouveaux marchés.',
      avatar: 'https://ui-avatars.com/api/?name=Marie+Ngono&background=10b981&color=fff&size=100'
    },
    {
      name: 'Paul Mbarga',
      role: 'Entrepreneur en pisciculture',
      content: 'Les projets VIP m\'ont permis de développer mon élevage de poissons avec succès.',
      avatar: 'https://ui-avatars.com/api/?name=Paul+Mbarga&background=3b82f6&color=fff&size=100'
    },
    {
      name: 'Fatima Aliou',
      role: 'Présidente GIC',
      content: 'L\'accompagnement juridique du PRF a été essentiel pour notre structuration.',
      avatar: 'https://ui-avatars.com/api/?name=Fatima+Aliou&background=8b5cf6&color=fff&size=100'
    }
  ];

  const carouselSlides = [
    {
      id: 1,
      type: 'success-story',
      title: 'Success Story: Marie Ngono',
      subtitle: 'De 5 hectares à 50 hectares de cacao bio',
      description: 'Découvrez comment Marie a multiplié sa production par 10 grâce aux programmes gouvernementaux.',
      image: 'https://africa.com/wp-content/uploads/2019/05/agriculture-entrepreneurs.jpg',
      link: '/success-stories',
      badge: 'Success Story',
      badgeColor: 'bg-green-500'
    },
    {
      id: 2,
      type: 'project',
      title: 'Initiative PLANUT',
      subtitle: 'Plan National de Développement',
      description: 'Programme d\'appui à la nutrition et à la transformation agricole pour moderniser l\'agriculture.',
      image: 'https://www.afdb.org/sites/default/files/styles/1700x900/public/a1-dg-afrique-centrale-et-vp-marie-laure-2.jpg?itok=4quY-Ftc',
      link: '/projects',
      badge: 'Initiative Gouvernementale',
      badgeColor: 'bg-blue-500'
    },
    {
      id: 3,
      type: 'marketplace',
      title: 'Marketplace PRF',
      subtitle: 'Vendez vos produits locaux',
      description: 'Plateforme de vente en ligne pour les producteurs et entrepreneurs camerounais.',
      image: 'https://thumbs.dreamstime.com/b/busy-african-businessman-work-digital-tablet-modern-apartment-busy-african-businessman-work-digital-tablet-sits-sofa-265810848.jpg',
      link: '/marketplace',
      badge: 'Marketplace',
      badgeColor: 'bg-orange-500'
    },
    {
      id: 4,
      type: 'centre-metier',
      title: 'Centre de Métier',
      subtitle: 'Consultez nos spécialistes',
      description: 'Accédez à notre réseau de spécialistes en agriculture, pêche, juridique et finance.',
      image: 'https://www.afdb.org/sites/default/files/styles/1700x900/public/a1-pr-cam.jpg?itok=fITCC8hv',
      link: '/experts',
      badge: 'Centre de Métier',
      badgeColor: 'bg-orange-500'
    },
    {
      id: 5,
      type: 'blog',
      title: 'Blog & Ressources',
      subtitle: 'Guides et conseils pratiques',
      description: 'Articles, guides et conseils pour développer votre entreprise au Cameroun.',
      image: 'https://etfovoice.ca/sites/default/files/0W2A9884.jpg',
      link: '/blog',
      badge: 'Blog',
      badgeColor: 'bg-indigo-500'
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [carouselSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-green-900 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/60"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://minepat.gov.cm/wp-content/uploads/2024/02/journe.jpg')`
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-blue-900/30 to-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-green-500/15 rounded-full blur-2xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left animate-fade-in-up">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 drop-shadow-lg leading-tight">
                CENTRE DE PROMOTION DES POLITIQUES PUBLIQUES ET DES <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">INITIATIVES PRIVÉES</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl mb-8 text-white drop-shadow-lg">
                La plateforme dédiée aux entrepreneurs camerounais. Accédez à des projets rentables, 
                des experts sectoriels et un accompagnement juridique complet.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/projects"
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all duration-300 shadow-lg flex items-center justify-center transform hover:scale-105 hover:shadow-2xl hover-lift"
                >
                  Découvrir les initiatives
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/marketplace"
                  className="bg-transparent border-2 border-slate-300 hover:bg-white hover:text-slate-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all duration-300 backdrop-blur-sm hover:scale-105 hover:shadow-xl"
                >
                  Explorer le marketplace
                </Link>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="relative mt-8 lg:mt-0 animate-slide-in-right">
              <div className="relative z-10">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/real-time-not-nukc52.appspot.com/o/iclan%20image.jpg?alt=media&token=2e81a476-4699-4781-a796-35a67f2f9dcd"
                  alt="Entrepreneurs africains travaillant ensemble"
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl shadow-2xl hover-lift transition-all duration-500"
                />
                {/* Floating Cards */}
                <div className="absolute -top-4 -left-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg animate-float">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-xs sm:text-sm font-semibold text-gray-800">500+ Initiatives</span>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-xs sm:text-sm font-semibold text-gray-800">Experts Certifiés</span>
                  </div>
                </div>
              </div>
              {/* Background Decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-2xl transform rotate-3 scale-105"></div>
            </div>
          </div>
        </div>
      </section>

      {/* À propos de nous Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                À propos de nous
              </h2>
              <div className="space-y-6 text-lg text-gray-700 animate-slide-in-left">
                <p>
                  Le <strong>Centre de Promotion des Politiques Publiques et des Initiatives Privées (PRF)</strong> 
                  est une plateforme dédiée au développement de l'entrepreneuriat au Cameroun. Notre mission est de 
                  faciliter l'accès aux programmes gouvernementaux et de promouvoir les initiatives privées.
                </p>
                <p>
                  Nous servons de pont entre les politiques publiques et les entrepreneurs, en offrant un 
                  accompagnement complet : de l'identification des opportunités à la formalisation des entreprises, 
                  en passant par la mise en relation avec des experts sectoriels.
                </p>
                <p>
                  Notre vision est de contribuer au développement économique durable du Cameroun en soutenant 
                  les entrepreneurs dans leurs projets et en facilitant leur accès aux ressources gouvernementales 
                  et aux marchés.
                  PRF propose des formations et un accompagnement personnalisé pour vous aider dans cette démarche.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl hover-lift transition-all duration-300">
                  <div className="text-2xl font-bold text-green-600">500+</div>
                  <div className="text-sm text-gray-600">Initiatives gouvernementales</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl hover-lift transition-all duration-300">
                  <div className="text-2xl font-bold text-blue-600">1000+</div>
                  <div className="text-sm text-gray-600">Entrepreneurs accompagnés</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://www.economieducameroun.info/wp-content/uploads/2021/04/INCH-CLASS-1.jpg"
                alt="Équipe PRF travaillant ensemble"
                className="w-full h-80 object-cover rounded-2xl shadow-xl hover-lift transition-all duration-500 animate-slide-in-right"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              PROMOTION ET FINANCEMENT POUR UN DÉVELOPPEMENT DURABLE DES ENTREPRISES
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une plateforme complète d'informations et de coaching pour accompagner votre réussite entrepreneuriale au Cameroun
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="text-center p-6 bg-white rounded-xl hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 hover-lift animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 text-orange-600 rounded-full mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 rounded-2xl p-8 md:p-12 text-white text-center shadow-2xl hover-lift animate-scale-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Accédez à plus de 500 initiatives avec VIP
            </h2>
            <p className="text-xl mb-8 text-orange-100">
              Rejoignez notre communauté VIP du PRF et débloquez l'accès à tous nos contenus premium, 
              marketplace et directory d'experts.
            </p>
            <Link
              to="/projects"
              className="bg-white text-orange-600 hover:bg-slate-50 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 inline-flex items-center shadow-lg transform hover:scale-105 hover:shadow-2xl"
            >
              Voir les initiatives
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Témoignages de nos membres
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez comment PRF a transformé leur activité
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover-lift animate-slide-in-left"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-20 bg-gradient-to-r from-orange-900 via-red-900 to-orange-800 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Découvrez nos services
            </h2>
            <p className="text-xl text-orange-100">
              Explorez nos différentes plateformes et services
            </p>
          </div>
          
          <div className="relative">
            {/* Carousel Container */}
            <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              {carouselSlides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    index === currentSlide 
                      ? 'opacity-100 transform translate-x-0' 
                      : index < currentSlide 
                        ? 'opacity-0 transform -translate-x-full'
                        : 'opacity-0 transform translate-x-full'
                  }`}
                >
                  <div className="relative h-full">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
                    
                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
                      <div className="max-w-2xl">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold text-white mb-4 ${slide.badgeColor}`}>
                          {slide.badge}
                        </span>
                        <h3 className="text-2xl md:text-4xl font-bold mb-2">{slide.title}</h3>
                        <h4 className="text-lg md:text-xl text-gray-200 mb-4">{slide.subtitle}</h4>
                        <p className="text-gray-300 mb-6 text-sm md:text-base">{slide.description}</p>
                        <Link
                          to={slide.link}
                          className="inline-flex items-center bg-white text-gray-900 hover:bg-gray-100 px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
                        >
                          <Eye className="h-5 w-5 mr-2" />
                          Découvrir
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {carouselSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-white scale-125 shadow-lg' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Slide Counter */}
          <div className="text-center mt-6">
            <span className="text-white/70 text-sm">
              {currentSlide + 1} / {carouselSlides.length}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}