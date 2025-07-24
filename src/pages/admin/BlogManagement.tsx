import React, { useState, useEffect } from 'react';
import { Plus, Search, Eye, Edit, Trash2, Calendar, User, Image, Video, AlertCircle, CheckCircle } from 'lucide-react';
import { apiService, BlogPost } from '../../services/api';

export default function BlogManagement() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    image: null as File | null,
    video: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.getBlogs();
      if (response.success && response.data) {
        setBlogs(response.data.blogs);
      }
    } catch (error) {
      console.error('Error loading blogs:', error);
      showToast('Erreur lors du chargement des articles', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      showToast('Le titre et le contenu sont requis', 'error');
      return;
    }

    // Validate file sizes
    if (formData.image && formData.image.size > 2 * 1024 * 1024) {
      showToast('L\'image ne doit pas dépasser 2MB', 'error');
      return;
    }

    if (formData.video && formData.video.size > 10 * 1024 * 1024) {
      showToast('La vidéo ne doit pas dépasser 10MB', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const blogFormData = new FormData();
      blogFormData.append('title', formData.title.trim());
      blogFormData.append('content', formData.content.trim());
      
      if (formData.author.trim()) {
        blogFormData.append('author', formData.author.trim());
      }
      if (formData.image) {
        blogFormData.append('image', formData.image);
      }
      if (formData.video) {
        blogFormData.append('video', formData.video);
      }

      const response = await apiService.createBlog(blogFormData);
      
      if (response.success) {
        showToast('Article créé avec succès', 'success');
        setShowCreateModal(false);
        resetForm();
        await loadBlogs();
      } else {
        showToast(response.error || 'Erreur lors de la création', 'error');
      }
    } catch (error) {
      console.error('Error creating blog:', error);
      showToast('Erreur lors de la création de l\'article', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedBlog || !formData.title.trim() || !formData.content.trim()) {
      showToast('Le titre et le contenu sont requis', 'error');
      return;
    }

    // Validate file sizes
    if (formData.image && formData.image.size > 2 * 1024 * 1024) {
      showToast('L\'image ne doit pas dépasser 2MB', 'error');
      return;
    }

    if (formData.video && formData.video.size > 10 * 1024 * 1024) {
      showToast('La vidéo ne doit pas dépasser 10MB', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const blogFormData = new FormData();
      blogFormData.append('title', formData.title.trim());
      blogFormData.append('content', formData.content.trim());
      
      if (formData.author.trim()) {
        blogFormData.append('author', formData.author.trim());
      }
      if (formData.image) {
        blogFormData.append('image', formData.image);
      }
      if (formData.video) {
        blogFormData.append('video', formData.video);
      }

      const response = await apiService.updateBlog(selectedBlog.id, blogFormData);
      
      if (response.success) {
        showToast('Article mis à jour avec succès', 'success');
        setShowEditModal(false);
        setSelectedBlog(null);
        resetForm();
        await loadBlogs();
      } else {
        showToast(response.error || 'Erreur lors de la mise à jour', 'error');
      }
    } catch (error) {
      console.error('Error updating blog:', error);
      showToast('Erreur lors de la mise à jour de l\'article', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteBlog = async (blogId: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      return;
    }

    try {
      const response = await apiService.deleteBlog(blogId);
      if (response.success) {
        setBlogs(prev => prev.filter(blog => blog.id !== blogId));
        showToast('Article supprimé avec succès', 'success');
      } else {
        showToast(response.error || 'Erreur lors de la suppression', 'error');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      showToast('Erreur lors de la suppression de l\'article', 'error');
    }
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${
      type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    }`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
    }, 3000);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      author: '',
      image: null,
      video: null
    });
  };

  const openEditModal = (blog: BlogPost) => {
    setSelectedBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content || '',
      author: blog.author || '',
      image: null,
      video: null
    });
    setShowEditModal(true);
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (blog.author && blog.author.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (blog.content && blog.content.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const validateFile = (file: File, type: 'image' | 'video') => {
    if (type === 'image') {
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
      const maxSize = 2 * 1024 * 1024; // 2MB
      
      if (!validTypes.includes(file.type)) {
        showToast('Format d\'image non supporté. Utilisez JPEG, PNG, JPG ou GIF', 'error');
        return false;
      }
      
      if (file.size > maxSize) {
        showToast('L\'image ne doit pas dépasser 2MB', 'error');
        return false;
      }
    } else if (type === 'video') {
      const validTypes = ['video/mp4', 'video/mov', 'video/avi'];
      const maxSize = 10 * 1024 * 1024; // 10MB
      
      if (!validTypes.includes(file.type)) {
        showToast('Format vidéo non supporté. Utilisez MP4, MOV ou AVI', 'error');
        return false;
      }
      
      if (file.size > maxSize) {
        showToast('La vidéo ne doit pas dépasser 10MB', 'error');
        return false;
      }
    }
    
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const file = e.target.files?.[0];
    if (file && validateFile(file, type)) {
      setFormData(prev => ({ ...prev, [type]: file }));
    } else {
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">Gestion des articles</h1>
            <p className="text-sm text-gray-600">Créez et gérez les articles de blog</p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="bg-indigo-50 px-4 py-2 rounded-lg">
              <span className="text-sm text-indigo-800 font-semibold">{blogs.length} article{blogs.length > 1 ? 's' : ''}</span>
            </div>
            <button
              onClick={() => {
                resetForm();
                setShowCreateModal(true);
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors flex items-center text-sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nouvel article
            </button>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par titre, auteur ou contenu..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Blogs Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Articles de blog ({filteredBlogs.length})
          </h2>
        </div>

        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des articles...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="p-8 text-center">
            <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              {searchTerm ? 'Aucun article trouvé pour cette recherche' : 'Aucun article disponible'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Article
                  </th>
                  <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Auteur
                  </th>
                  <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Médias
                  </th>
                  <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBlogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 max-w-32 sm:max-w-xs truncate">
                          {blog.title}
                        </div>
                        <div className="text-xs text-gray-500 max-w-32 sm:max-w-xs truncate">
                          {blog.content?.substring(0, 100)}...
                        </div>
                        <div className="sm:hidden text-xs text-gray-600 mt-1 truncate">
                          Par: {blog.author || 'Anonyme'}
                        </div>
                      </div>
                    </td>
                    <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{blog.author || 'Anonyme'}</span>
                      </div>
                    </td>
                    <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        {blog.image && (
                          <div className="flex items-center text-green-600">
                            <Image className="h-4 w-4" />
                          </div>
                        )}
                        {blog.video && (
                          <div className="flex items-center text-blue-600">
                            <Video className="h-4 w-4" />
                          </div>
                        )}
                        {!blog.image && !blog.video && (
                          <span className="text-gray-400 text-sm">Aucun</span>
                        )}
                      </div>
                    </td>
                    <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {blog.created_at ? new Date(blog.created_at).toLocaleDateString('fr-FR') : 'N/A'}
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-1 sm:space-x-2">
                        <a
                          href={`/blog/${blog.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-900 p-1.5 sm:p-1 hover:bg-blue-50 rounded"
                          title="Voir l'article"
                        >
                          <Eye className="h-4 w-4" />
                        </a>
                        <button
                          onClick={() => openEditModal(blog)}
                          className="text-green-600 hover:text-green-900 p-1.5 sm:p-1 hover:bg-green-50 rounded"
                          title="Modifier"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(blog.id)}
                          className="text-red-600 hover:text-red-900 p-1.5 sm:p-1 hover:bg-red-50 rounded"
                          title="Supprimer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create Blog Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-1 sm:p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[98vh] sm:max-h-[90vh] overflow-y-auto mx-1 sm:mx-0">
            <div className="p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Créer un nouvel article</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl p-1"
                >
                  ×
                </button>
              </div>
            </div>

            <form onSubmit={handleCreateBlog} className="p-4 sm:p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Auteur
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                  value={formData.author}
                  onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contenu *
                </label>
                <textarea
                  required
                  rows={6}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm resize-none"
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image (JPEG, PNG, JPG, GIF - max 2MB)
                  </label>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/jpg,image/gif"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                    onChange={(e) => handleFileChange(e, 'image')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vidéo (MP4, MOV, AVI - max 10MB)
                  </label>
                  <input
                    type="file"
                    accept="video/mp4,video/mov,video/avi"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                    onChange={(e) => handleFileChange(e, 'video')}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 sticky bottom-0 bg-white">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2.5 px-4 rounded-lg font-medium transition-colors text-sm"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white py-2.5 px-4 rounded-lg font-medium transition-colors text-sm"
                >
                  {isSubmitting ? 'Création...' : 'Créer l\'article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Blog Modal */}
      {showEditModal && selectedBlog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-1 sm:p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[98vh] sm:max-h-[90vh] overflow-y-auto mx-1 sm:mx-0">
            <div className="p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Modifier l'article</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl"
                >
                  ×
                </button>
              </div>
            </div>

            <form onSubmit={handleUpdateBlog} className="p-4 sm:p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Auteur
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                  value={formData.author}
                  onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contenu *
                </label>
                <textarea
                  required
                  rows={6}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm resize-none"
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nouvelle image (JPEG, PNG, JPG, GIF - max 2MB)
                  </label>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/jpg,image/gif"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                    onChange={(e) => handleFileChange(e, 'image')}
                  />
                  {selectedBlog.image && (
                    <p className="text-xs text-gray-500 mt-1">Image actuelle disponible</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nouvelle vidéo (MP4, MOV, AVI - max 10MB)
                  </label>
                  <input
                    type="file"
                    accept="video/mp4,video/mov,video/avi"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                    onChange={(e) => handleFileChange(e, 'video')}
                  />
                  {selectedBlog.video && (
                    <p className="text-xs text-gray-500 mt-1">Vidéo actuelle disponible</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 sticky bottom-0 bg-white">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2.5 px-4 rounded-lg font-medium transition-colors text-sm"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white py-2.5 px-4 rounded-lg font-medium transition-colors text-sm"
                >
                  {isSubmitting ? 'Mise à jour...' : 'Mettre à jour'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}