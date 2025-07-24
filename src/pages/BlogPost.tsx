import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, Tag, Eye, MessageCircle, Share2, Heart, Bookmark } from 'lucide-react';
import { apiService, BlogPost as ApiBlogPost, BlogComment, CreateCommentRequest } from '../services/api';

export default function BlogPost() {
  const { id } = useParams();
  const [blogPost, setBlogPost] = useState<ApiBlogPost | null>(null);
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    content: ''
  });
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  useEffect(() => {
    if (id) {
      loadBlogPost(parseInt(id));
      loadComments(parseInt(id));
    }
  }, [id]);

  const loadComments = async (postId: number) => {
    try {
      const response = await apiService.getBlogComments(postId);
      if (response.success && response.data) {
        setComments(response.data.comments);
      }
    } catch (error) {
      console.error('Error loading comments:', error);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !newComment.name.trim() || !newComment.email.trim() || !newComment.content.trim()) {
      return;
    }

    setIsSubmittingComment(true);
    try {
      const response = await apiService.addComment(parseInt(id), {
        name: newComment.name.trim(),
        email: newComment.email.trim(),
        content: newComment.content.trim()
      });

      if (response.success) {
        // Reset form
        setNewComment({ name: '', email: '', content: '' });
        // Reload comments
        await loadComments(parseInt(id));
        
        // Show success message
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        notification.textContent = 'Commentaire publié avec succès!';
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
      console.error('Error submitting comment:', error);
      
      // Show error message
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      notification.textContent = 'Erreur lors de la publication du commentaire';
      document.body.appendChild(notification);
      
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 3000);
    } finally {
      setIsSubmittingComment(false);
    }
  };
  const loadBlogPost = async (postId: number) => {
    setIsLoading(true);
    try {
      const response = await apiService.getBlog(postId);
      if (response.success && response.data) {
        setBlogPost(response.data.blog || response.data);
      }
    } catch (error) {
      console.error('Error loading blog post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Mock blog post data for fallback
  const mockBlogPost = {
    id: 1,
    title: 'Comment réussir sa culture de cacao bio au Cameroun',
    excerpt: 'Découvrez les techniques modernes et durables pour développer une cacaoculture biologique rentable et respectueuse de l\'environnement.',
    content: `
      <p>La culture du cacao bio représente une opportunité majeure pour les agriculteurs camerounais souhaitant accéder aux marchés premium internationaux. Cette approche durable permet non seulement d'améliorer les revenus, mais aussi de préserver l'environnement pour les générations futures.</p>

      <h2>Les avantages du cacao bio</h2>
      <p>Le cacao biologique offre de nombreux avantages par rapport à la culture conventionnelle :</p>
      <ul>
        <li><strong>Prix premium :</strong> Le cacao bio se vend 20 à 30% plus cher que le cacao conventionnel</li>
        <li><strong>Durabilité :</strong> Préservation de la biodiversité et des sols</li>
        <li><strong>Santé :</strong> Absence de pesticides et d'engrais chimiques</li>
        <li><strong>Certification :</strong> Accès aux marchés internationaux exigeants</li>
      </ul>

      <h2>Étapes pour la conversion bio</h2>
      <p>La transition vers l'agriculture biologique nécessite une planification rigoureuse :</p>

      <h3>1. Période de conversion (3 ans)</h3>
      <p>La terre doit être exempte de produits chimiques pendant au moins 3 ans avant d'obtenir la certification bio. Cette période permet :</p>
      <ul>
        <li>L'élimination des résidus chimiques du sol</li>
        <li>La restauration de la biodiversité</li>
        <li>L'adaptation des pratiques culturales</li>
      </ul>

      <h3>2. Techniques de culture biologique</h3>
      <p>Plusieurs techniques sont essentielles pour réussir en bio :</p>
      <ul>
        <li><strong>Compostage :</strong> Utilisation de matière organique pour enrichir le sol</li>
        <li><strong>Agroforesterie :</strong> Association du cacao avec d'autres arbres</li>
        <li><strong>Lutte biologique :</strong> Utilisation d'insectes auxiliaires</li>
        <li><strong>Rotation des cultures :</strong> Maintien de la fertilité du sol</li>
      </ul>

      <h2>Certification et commercialisation</h2>
      <p>L'obtention de la certification bio est cruciale pour accéder aux marchés premium. Les principales certifications reconnues au Cameroun sont :</p>
      <ul>
        <li>Ecocert</li>
        <li>Rainforest Alliance</li>
        <li>Fairtrade</li>
        <li>UTZ Certified</li>
      </ul>

      <h2>Défis et solutions</h2>
      <p>La culture bio présente certains défis qu'il faut anticiper :</p>
      
      <h3>Défis principaux :</h3>
      <ul>
        <li>Baisse temporaire des rendements</li>
        <li>Coût de la certification</li>
        <li>Formation technique nécessaire</li>
        <li>Gestion des maladies sans pesticides</li>
      </ul>

      <h3>Solutions recommandées :</h3>
      <ul>
        <li>Formation continue avec des experts</li>
        <li>Groupement de producteurs pour réduire les coûts</li>
        <li>Diversification des cultures</li>
        <li>Accès au financement adapté</li>
      </ul>

      <h2>Conclusion</h2>
      <p>La culture du cacao bio représente l'avenir de la cacaoculture camerounaise. Bien que la transition demande des efforts et des investissements, les bénéfices à long terme sont considérables : revenus améliorés, environnement préservé et accès aux marchés internationaux.</p>

      <p>Pour réussir cette transition, l'accompagnement d'experts et l'adhésion à une coopérative sont fortement recommandés. EDUKLAN propose des formations et un accompagnement personnalisé pour vous aider dans cette démarche.</p>
      <p>Pour réussir cette transition, l'accompagnement d'experts et l'adhésion à une coopérative sont fortement recommandés. PRF propose des formations et un accompagnement personnalisé pour vous aider dans cette démarche.</p>
    `,
    category: 'agriculture',
    author: 'Dr. Marie Ngono',
    authorBio: 'Agro-économiste spécialisée en agriculture biologique avec 15 ans d\'expérience dans le développement de filières durables au Cameroun.',
    authorImage: 'https://etfovoice.ca/sites/default/files/0W2A9884.jpg',
    date: '2024-12-15',
    readTime: '8 min',
    image: 'https://africa.com/wp-content/uploads/2019/05/agriculture-entrepreneurs.jpg',
    views: 1250,
    comments: 23,
    likes: 89,
    tags: ['cacao', 'bio', 'agriculture', 'certification', 'durabilité']
  };

  const relatedPosts = [
    {
      id: 2,
      title: 'Pisciculture moderne : Les cages flottantes révolutionnent l\'aquaculture',
      image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      date: '2024-12-12',
      readTime: '6 min'
    },
    {
      id: 3,
      title: 'Formalisation d\'entreprise : Guide complet pour créer sa SARL',
      image: 'https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      date: '2024-12-10',
      readTime: '12 min'
    },
    {
      id: 4,
      title: 'E-commerce agricole : Digitaliser la vente de produits locaux',
      image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      date: '2024-12-08',
      readTime: '7 min'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de l'article...</p>
        </div>
      </div>
    );
  }

  // Use API blog post if available, otherwise use mock data
  const displayPost = blogPost ? {
    id: blogPost.id,
    title: blogPost.title,
    excerpt: blogPost.content?.substring(0, 150) + '...' || '',
    content: blogPost.content || '',
    category: 'general',
    author: blogPost.author || 'Équipe PRF',
    authorBio: 'Auteur sur la plateforme PRF',
    authorImage: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(blogPost.author || 'PRF') + '&background=06b6d4&color=fff&size=100',
    date: blogPost.created_at || new Date().toISOString().split('T')[0],
    readTime: Math.ceil((blogPost.content?.length || 0) / 200) + ' min',
    image_url: blogPost.image_url || 'https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop',
    views: Math.floor(Math.random() * 1000) + 100,
    comments: Math.floor(Math.random() * 50) + 5,
    likes: Math.floor(Math.random() * 100) + 10,
    tags: ['blog', 'article'],
    video: blogPost.video
  } : mockBlogPost;

  if (!displayPost && !isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Article non trouvé</h2>
          <Link
            to="/blog"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Retour au blog
          </Link>
        </div>
      </div>
    );
  }

  // Ensure displayPost exists before rendering
  if (!displayPost) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de l'article...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/blog"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-800 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Retour au blog
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Category and Meta */}
          <div className="flex items-center space-x-4 mb-6">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              Agriculture
            </span>
            <div className="flex items-center text-sm text-gray-500 space-x-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(displayPost.date).toLocaleDateString('fr-FR')}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {displayPost.readTime}
              </div>
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                {displayPost.views} vues
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight relative z-10">
            {displayPost?.title || 'Titre non disponible'}
          </h1>

          {/* Author Info */}
          <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-200 relative z-10">
            <div className="flex items-center">
              <img
                src={displayPost?.authorImage || 'https://ui-avatars.com/api/?name=Auteur&background=06b6d4&color=fff&size=100'}
                alt={displayPost?.author || 'Auteur'}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h3 className="font-semibold text-gray-900">{displayPost?.author || 'Auteur inconnu'}</h3>
                <p className="text-sm text-gray-600">{displayPost?.authorBio || 'Auteur sur la plateforme'}</p>
              </div>
            </div>
            
            {/* Social Actions */}
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors">
                <Heart className="h-5 w-5" />
                <span className="text-sm">{displayPost?.likes || 0}</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors">
                <Bookmark className="h-5 w-5" />
              </button>
              <button className="flex items-center space-x-1 text-gray-600 hover:text-emerald-600 transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-8 relative z-10">
            {displayPost?.video ? (
              <video
                controls
                className="w-full h-64 md:h-96 object-cover rounded-xl"
                poster={displayPost?.image_url}
              >
                <source src={displayPost?.video} type="video/mp4" />
                Votre navigateur ne supporte pas la lecture vidéo.
              </video>
            ) : (
              <img
                src={displayPost?.image_url || 'https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop'}
                alt={displayPost?.title || 'Image de l\'article'}
                className="w-full h-64 md:h-96 object-cover rounded-xl"
              />
            )}
          </div>

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none mb-8 relative z-10"
            dangerouslySetInnerHTML={{ __html: displayPost?.content || '<p>Contenu non disponible</p>' }}
            style={{
              lineHeight: '1.8',
              fontSize: '1.1rem',
              color: '#374151'
            }}
          />

          {/* Tags */}
          {displayPost?.tags && displayPost.tags.length > 0 && (
            <div className="mb-8 pb-8 border-b border-gray-200 relative z-10">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {displayPost.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author Card */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 mb-8 relative z-10">
            <div className="flex items-start">
              <img
                src={displayPost?.authorImage || 'https://ui-avatars.com/api/?name=Auteur&background=06b6d4&color=fff&size=100'}
                alt={displayPost?.author || 'Auteur'}
                className="w-16 h-16 rounded-full mr-6"
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">À propos de {displayPost?.author || 'l\'auteur'}</h3>
                <p className="text-gray-700 mb-4">{displayPost?.authorBio || 'Auteur sur la plateforme PRF'}</p>
                <div className="flex space-x-4">
                  <span className="text-sm text-gray-600">
                    {displayPost?.date ? new Date(displayPost.date).toLocaleDateString('fr-FR') : 'Date inconnue'}
                  </span>
                  <span className="text-sm text-gray-600">
                    {displayPost?.readTime || '5 min'}
                  </span>
                  <span className="text-sm text-gray-600">
                    {displayPost?.views || 0} vues
                  </span>
                  <Link
                    to="/experts"
                    className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Voir profil
                  </Link>
                  <button className="bg-white border border-orange-600 text-orange-600 hover:bg-orange-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Suivre
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mb-8 relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                Commentaires ({comments.length})
              </h3>
            </div>
                        {/* Comments List */}
            <div className="space-y-6">

              {comments.map((comment) => (
                <div key={comment.id} className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-start">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(comment.name)}&background=6b7280&color=fff&size=40`}
                      alt={comment.name}
                      className="w-10 h-10 rounded-full mr-4"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{comment.name}</h4>
                        <span className="text-sm text-gray-500">
                          {comment.created_at ? new Date(comment.created_at).toLocaleDateString('fr-FR') : 'Récemment'}
                        </span>
                      </div>
                      <p className="text-gray-700">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {comments.length === 0 && (
                <div className="text-center py-8">
                  <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Aucun commentaire pour le moment</p>
                  <p className="text-sm text-gray-500">Soyez le premier à commenter cet article!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
            {/* Comment Form */}
            <div className="bg-orange-50 rounded-xl p-6 mb-6">
              <form onSubmit={handleSubmitComment} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      value={newComment.name}
                      onChange={(e) => setNewComment(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      value={newComment.email}
                      onChange={(e) => setNewComment(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Commentaire *
                  </label>
                  <textarea
                    required
                    placeholder="Partagez votre expérience ou posez une question..."
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                    rows={4}
                    value={newComment.content}
                    onChange={(e) => setNewComment(prev => ({ ...prev, content: e.target.value }))}
                  />
                </div>
                <div className="flex justify-end">
                  <button 
                    type="submit"
                    disabled={isSubmittingComment}
                    className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
                  >
                    {isSubmittingComment ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    ) : null}
                    Publier
                  </button>
                </div>
              </form>
            </div>


      {/* Related Articles */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Articles similaires</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {relatedPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(post.date).toLocaleDateString('fr-FR')}
                    <span className="mx-2">•</span>
                    <Clock className="h-4 w-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ne manquez aucun article
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Recevez nos derniers conseils et guides directement dans votre boîte mail
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
            />
            <button
              type="submit"
              className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              S'abonner
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}