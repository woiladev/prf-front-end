import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Clock, Tag, Search, Filter, ArrowRight, Eye, MessageCircle } from 'lucide-react';
import { apiService, BlogPost as ApiBlogPost } from '../services/api';

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [blogPosts, setBlogPosts] = useState<ApiBlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { id: 'all', name: 'Tous les articles' },
    { id: 'agriculture', name: 'Agriculture' },
    { id: 'fishing', name: 'Pêche' },
    { id: 'business', name: 'Business' },
    { id: 'technology', name: 'Technologie' },
    { id: 'legal', name: 'Juridique' },
    { id: 'success', name: 'Success Stories' }
  ];

  const mockBlogPosts = [
    {
      id: 1,
      title: 'Comment réussir sa culture de cacao bio au Cameroun',
      excerpt: 'Découvrez les techniques modernes et durables pour développer une cacaoculture biologique rentable et respectueuse de l\'environnement.',
      content: 'La culture du cacao bio représente une opportunité majeure pour les agriculteurs camerounais...',
      category: 'agriculture',
      author: 'Dr. Marie Ngono',
      authorImage: 'https://etfovoice.ca/sites/default/files/0W2A9884.jpg',
      date: '2024-12-15',
      readTime: '8 min',
      image: 'https://africa.com/wp-content/uploads/2019/05/agriculture-entrepreneurs.jpg',
      views: 1250,
      comments: 23,
      featured: true,
      tags: ['cacao', 'bio', 'agriculture', 'certification']
    },
    {
      id: 2,
      title: 'Pisciculture moderne : Les cages flottantes révolutionnent l\'aquaculture',
      excerpt: 'L\'élevage en cages flottantes transforme la pisciculture camerounaise. Découvrez cette technique innovante et ses avantages.',
      content: 'Les cages flottantes représentent l\'avenir de l\'aquaculture au Cameroun...',
      category: 'fishing',
      author: 'Paul Mbarga',
      authorImage: 'https://media.cnn.com/api/v1/images/stellar/prod/211213130214-restricted-rich-serunjogi.jpg?q=w_1110,c_fill',
      date: '2024-12-12',
      readTime: '6 min',
      image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop',
      views: 890,
      comments: 15,
      featured: false,
      tags: ['pisciculture', 'aquaculture', 'innovation', 'cages flottantes']
    },
    {
      id: 3,
      title: 'Formalisation d\'entreprise : Guide complet pour créer sa SARL',
      excerpt: 'Tout ce que vous devez savoir pour créer votre SARL au Cameroun : démarches, coûts, délais et conseils pratiques.',
      content: 'La création d\'une SARL est souvent le choix privilégié des entrepreneurs camerounais...',
      category: 'legal',
      author: 'Maître Fatima Aliou',
      authorImage: 'https://cdn.businessday.ng/2022/02/Canada-Black-Entrepreneurship-Program-1.jpg',
      date: '2024-12-10',
      readTime: '12 min',
      image: 'https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop',
      views: 2100,
      comments: 34,
      featured: true,
      tags: ['SARL', 'formalisation', 'juridique', 'entreprise']
    },
    {
      id: 4,
      title: 'E-commerce agricole : Digitaliser la vente de produits locaux',
      excerpt: 'Comment les plateformes digitales transforment la commercialisation des produits agricoles camerounais.',
      content: 'La digitalisation de l\'agriculture ouvre de nouvelles perspectives...',
      category: 'technology',
      author: 'Jean Kouam',
      authorImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRERwTeH3S50U5rwKoBwX3LL5Omm6-lCbokdw&s',
      date: '2024-12-08',
      readTime: '7 min',
      image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop',
      views: 1450,
      comments: 28,
      featured: false,
      tags: ['e-commerce', 'digital', 'agriculture', 'technologie']
    },
    {
      id: 5,
      title: 'Financement participatif : Lever des fonds pour votre projet agricole',
      excerpt: 'Découvrez comment utiliser le crowdfunding pour financer vos projets agricoles et attirer des investisseurs.',
      content: 'Le financement participatif devient une alternative crédible...',
      category: 'business',
      author: 'Bernadette Essono',
      authorImage: 'https://africa.com/wp-content/uploads/2019/05/agriculture-entrepreneurs.jpg',
      date: '2024-12-05',
      readTime: '9 min',
      image: 'https://images.pexels.com/photos/4750277/pexels-photo-4750277.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop',
      views: 980,
      comments: 19,
      featured: false,
      tags: ['financement', 'crowdfunding', 'investissement', 'business']
    },
    {
      id: 6,
      title: 'Success Story : De 5 hectares à 50 hectares en 3 ans',
      excerpt: 'L\'histoire inspirante de Marie qui a multiplié sa production de cacao par 10 grâce aux techniques modernes.',
      content: 'Marie Ngono avait un rêve : transformer sa petite exploitation...',
      category: 'success',
      author: 'Équipe Infos et Coaching',
      authorImage: 'https://ui-avatars.com/api/?name=Infos+et+Coaching&background=06b6d4&color=fff&size=100',
      date: '2024-12-03',
      readTime: '5 min',
      image: 'https://images.pexels.com/photos/2872767/pexels-photo-2872767.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop',
      views: 3200,
      comments: 45,
      featured: true,
      tags: ['success story', 'cacao', 'expansion', 'inspiration']
    },
    {
      id: 7,
      title: 'Coopératives agricoles : Unir ses forces pour réussir',
      excerpt: 'Comment créer et gérer une coopérative agricole efficace pour maximiser les bénéfices de tous les membres.',
      content: 'Les coopératives agricoles représentent un modèle économique puissant...',
      category: 'business',
      author: 'Dr. Samuel Manga',
      authorImage: 'https://etfovoice.ca/sites/default/files/0W2A9884.jpg',
      date: '2024-12-01',
      readTime: '10 min',
      image: 'https://images.pexels.com/photos/5632371/pexels-photo-5632371.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop',
      views: 1680,
      comments: 31,
      featured: false,
      tags: ['coopérative', 'agriculture', 'collaboration', 'gestion']
    },
    {
      id: 8,
      title: 'Transformation du manioc : Créer de la valeur ajoutée',
      excerpt: 'Techniques modernes de transformation du manioc pour développer des produits à forte valeur ajoutée.',
      content: 'Le manioc est l\'une des cultures les plus importantes du Cameroun...',
      category: 'agriculture',
      author: 'Marie Ngono',
      authorImage: 'https://etfovoice.ca/sites/default/files/0W2A9884.jpg',
      date: '2024-11-28',
      readTime: '8 min',
      image: 'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop',
      views: 1120,
      comments: 22,
      featured: false,
      tags: ['manioc', 'transformation', 'valeur ajoutée', 'innovation']
    }
  ];

  useEffect(() => {
    loadBlogPosts();
  }, []);

  const loadBlogPosts = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.getBlogs();
      if (response.success && response.data) {
        setBlogPosts(response.data.blogs);
      }
    } catch (error) {
      console.error('Error loading blog posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Transform API blog posts to match the expected format
  const transformedBlogPosts = blogPosts.map((post) => ({
    id: post.id,
    title: post.title,
    excerpt: post.content?.substring(0, 150) + '...' || 'Aucun extrait disponible',
    content: post.content || '',
    category: 'general',
    author: post.author || 'Équipe PRF',
    authorImage: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(post.author || 'PRF') + '&background=06b6d4&color=fff&size=100',
    date: post.created_at || new Date().toISOString(),
    readTime: Math.ceil((post.content?.length || 0) / 200) + ' min',
    image: post.image_url || 'https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop',
    views: Math.floor(Math.random() * 1000) + 100,
    comments: Math.floor(Math.random() * 50) + 5,
    featured: false,
    tags: ['blog', 'article'],
    video: post.video
  }));

  // Combine API posts with mock posts for display
  const allBlogPosts = [...transformedBlogPosts, ...mockBlogPosts];

  const displayPosts = allBlogPosts.filter(post => {
    const matchesSearch = searchTerm === '' || 
                         post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) ||
                         (post.content && post.content.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = allBlogPosts.filter(post => post.featured);
  const recentPosts = allBlogPosts.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Blog PRF
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto">
              Conseils, guides pratiques et actualités pour développer votre entreprise au Cameroun
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
                placeholder="Rechercher des articles..."
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

      {/* Featured Articles */}
      {!searchTerm && selectedCategory === 'all' && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Articles à la une</h2>
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Chargement des articles...</p>
              </div>
            ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {featuredPosts.slice(0, 3).map((post, index) => (
                <div key={post.id} className={`${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}>
                  <Link
                    to={`/blog/${post.id}`}
                    className="group block bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                          index === 0 ? 'h-64 lg:h-80' : 'h-48'
                        }`}
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          À la une
                        </span>
                      </div>
                    </div>
                    <div className={`p-6 ${index === 0 ? 'lg:p-8' : ''}`}>
                      <div className="flex items-center space-x-4 mb-3 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(post.date).toLocaleDateString('fr-FR')}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {post.readTime}
                        </div>
                      </div>
                      <h3 className={`font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors ${
                        index === 0 ? 'text-2xl lg:text-3xl' : 'text-xl'
                      }`}>
                        {post.title}
                      </h3>
                      <p className={`text-gray-600 mb-4 ${index === 0 ? 'text-lg' : ''}`}>
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img
                            src={post.authorImage}
                            alt={post.author}
                            className="w-8 h-8 rounded-full mr-3"
                          />
                          <span className="text-sm font-medium text-gray-700">{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {post.views}
                          </div>
                          <div className="flex items-center">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            {post.comments}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            )}
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Articles List */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  {searchTerm ? `Résultats de recherche (${displayPosts.length})` : 'Tous les articles'}
                </h2>
              </div>
              
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Chargement des articles...</p>
                </div>
              ) : (
              <div className="space-y-8">
                {displayPosts.map((post) => (
                  <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <Link to={`/blog/${post.id}`}>
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-48 md:h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </Link>
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-center space-x-4 mb-3">
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                            {categories.find(cat => cat.id === post.category)?.name}
                          </span>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(post.date).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                        
                        <Link to={`/blog/${post.id}`}>
                          <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-green-600 transition-colors">
                            {post.title}
                          </h3>
                        </Link>
                        
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <img
                              src={post.authorImage}
                              alt={post.author}
                              className="w-8 h-8 rounded-full mr-3"
                            />
                            <div>
                              <p className="text-sm font-medium text-gray-700">{post.author}</p>
                              <p className="text-xs text-gray-500">{post.readTime} de lecture</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Eye className="h-4 w-4 mr-1" />
                              {post.views}
                            </div>
                            <div className="flex items-center">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              {post.comments}
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <Link
                            to={`/blog/${post.id}`}
                            className="inline-flex items-center text-green-600 hover:text-green-800 font-medium"
                          >
                            Lire la suite
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-8">
                {/* Recent Posts */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Articles récents</h3>
                  <div className="space-y-4">
                    {recentPosts.map((post) => (
                      <Link
                        key={post.id}
                        to={`/blog/${post.id}`}
                        className="flex items-start space-x-3 group"
                      >
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2">
                            {post.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(post.date).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Catégories</h3>
                  <div className="space-y-2">
                    {categories.slice(1).map((category) => {
                      const count = blogPosts.filter(post => post.category === category.id).length;
                      return (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                            selectedCategory === category.id
                              ? 'bg-green-100 text-green-800'
                              : 'hover:bg-gray-100 text-gray-700'
                          }`}
                        >
                          <span>{category.name}</span>
                          <span className="text-sm">{count}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Newsletter */}
                <div className="bg-gradient-to-br from-green-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
                  <h3 className="text-xl font-bold mb-4">Newsletter</h3>
                  <p className="text-green-100 mb-4">
                    Recevez nos derniers articles et conseils directement dans votre boîte mail.
                  </p>
                  <form className="space-y-3">
                    <input
                      type="email"
                      placeholder="Votre email"
                      className="w-full px-4 py-2 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="w-full bg-white text-green-600 py-2 px-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                      S'abonner
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à passer à l'action ?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Transformez vos connaissances en succès avec nos projets et notre accompagnement
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/projects"
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Voir les initiatives
            </Link>
            <Link
              to="/marketplace"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Explorer le marketplace
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}