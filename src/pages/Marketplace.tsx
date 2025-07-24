import React, { useState } from 'react';
import { useEffect } from 'react';
import { Search, Filter, Star, MapPin, Phone, Mail, ShoppingCart } from 'lucide-react';
import { useSubscription } from '../contexts/SubscriptionContext';
import { useCart } from '../contexts/CartContext';
import ImageWithFallback from '../components/ImageWithFallback';
import { apiService } from '../services/api';

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSector, setSelectedSector] = useState('all');
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isVip } = useSubscription();
  const { addToCart } = useCart();

  const categories = [
    { id: 'all', name: 'Tous les produits' },
    { id: 'agriculture', name: 'Agriculture' },
    { id: 'fishing', name: 'Pêche' },
    { id: 'livestock', name: 'Élevage' },
    { id: 'services', name: 'Services' },
    { id: 'equipment', name: 'Équipements' }
  ];

  const sectors = [
    { id: 'all', name: 'Tous les secteurs' },
    { id: 'cacao', name: 'Cacao' },
    { id: 'cafe', name: 'Café' },
    { id: 'palmier', name: 'Palmier à huile' },
    { id: 'manioc', name: 'Manioc' },
    { id: 'aquaculture', name: 'Aquaculture' },
    { id: 'aviculture', name: 'Aviculture' },
    { id: 'maraichage', name: 'Maraîchage' },
    { id: 'transformation', name: 'Transformation' },
    { id: 'conseil', name: 'Conseil' },
    { id: 'equipement', name: 'Équipement agricole' }
  ];

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      console.log('Loading products from API...');
      const response = await apiService.getProducts();
      console.log('API Response:', response);
      if (response.success && response.data) {
        console.log('Products loaded:', response.data.products);
        console.log('Products loaded:', response.data.products);
        setProducts(response.data.products);
      } else {
        console.error('API Error:', response.error);
        console.error('Failed to load products:', response.error);
      }
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const mockProducts = [
    {
      id: 1,
      name: 'Cacao bio certifié',
      category: 'agriculture',
      sector: 'cacao',
      price: '2,500 FCFA/kg',
      seller: 'Marie Ngono',
      location: 'Yaoundé',
      rating: 4.8,
      reviews: 15,
      image: 'https://www.afrique-agriculture.org/sites/afrique_agriculture/files/styles/large/public/ent_pepiniere_cacao_de_kko_internationale.jpg?itok=DOJ5Rqj0',
      description: 'Cacao bio de qualité supérieure, certifié par nos experts PRF.',
      phone: '+237 671 234 567',
      email: 'marie@example.com',
      isPremium: false,
      stock: 150
    },
    {
      id: 2,
      name: 'Tilapia frais',
      category: 'fishing',
      sector: 'aquaculture',
      price: '1,800 FCFA/kg',
      seller: 'Paul Mbarga',
      location: 'Douala',
      rating: 4.9,
      reviews: 23,
      image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      description: 'Tilapia frais d\'élevage, livraison rapide en région.',
      phone: '+237 682 345 678',
      email: 'paul@example.com',
      isPremium: true
    },
    {
      id: 3,
      name: 'Consultation agro-économique',
      category: 'services',
      sector: 'conseil',
      price: '25,000 FCFA/session',
      seller: 'Dr. Fatima Aliou',
      location: 'Bafoussam',
      rating: 5.0,
      reviews: 8,
      image: 'https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      description: 'Consultation personnalisée pour optimiser votre production.',
      phone: '+237 693 456 789',
      email: 'fatima@example.com',
      isPremium: true
    },
    {
      id: 4,
      name: 'Huile de palme artisanale',
      category: 'agriculture',
      sector: 'palmier',
      price: '1,200 FCFA/litre',
      seller: 'Jean Kouam',
      location: 'Bertoua',
      rating: 4.6,
      reviews: 12,
      image: 'https://images.pexels.com/photos/4750277/pexels-photo-4750277.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      description: 'Huile de palme rouge, production artisanale traditionnelle.',
      phone: '+237 674 567 890',
      email: 'jean@example.com',
      isPremium: false
    },
    {
      id: 5,
      name: 'Matériel d\'irrigation',
      category: 'equipment',
      sector: 'equipement',
      price: '450,000 FCFA/set',
      seller: 'AgroTech Cameroun',
      location: 'Yaoundé',
      rating: 4.7,
      reviews: 6,
      image: 'https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      description: 'Système d\'irrigation goutte-à-goutte pour petites exploitations.',
      phone: '+237 685 678 901',
      email: 'agrotech@example.com',
      isPremium: true
    },
    {
      id: 6,
      name: 'Volaille fermière',
      category: 'livestock',
      sector: 'aviculture',
      price: '3,500 FCFA/unité',
      seller: 'Bernadette Essono',
      location: 'Ebolowa',
      rating: 4.8,
      reviews: 19,
      image: 'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      description: 'Poulets fermiers élevés au grain, qualité supérieure.',
      phone: '+237 676 789 012',
      email: 'bernadette@example.com',
      isPremium: false
    },
    // Add more mock products as needed
  ];

  // Transform API products to match the expected format
  const transformedProducts = products.map((product) => ({
    id: product.id,
    name: product.name,
    category: 'general',
    sector: 'general',
    price: `${product.price.toLocaleString()} FCFA`,
    seller: 'Vendeur PRF',
    location: 'Cameroun',
    rating: 4.5 + Math.random() * 0.5,
    reviews: Math.floor(Math.random() * 50) + 10,
    image: product.image_url || 'https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    description: product.description || 'Produit de qualité disponible sur PRF',
    phone: '+237 6XX XXX XXX',
    email: 'vendeur@prf.cm',
    isPremium: false,
    stock: product.stock
  }));

  // Combine API products with mock products for display
  const allProducts = [...transformedProducts, ...mockProducts];

  const displayProducts = allProducts.filter(product => {
    const matchesSearch = searchTerm === '' || 
                         product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSector = selectedSector === 'all' || product.sector === selectedSector;
    return matchesSearch && matchesCategory && matchesSector;
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
            backgroundImage: `url('https://thumbs.dreamstime.com/b/busy-african-businessman-work-digital-tablet-modern-apartment-busy-african-businessman-work-digital-tablet-sits-sofa-265810848.jpg')`
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-orange-900/30 to-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-red-500/15 rounded-full blur-2xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-2xl text-shadow-glow">
              Marketplace PRF
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto drop-shadow-xl text-shadow-glow">
              Découvrez et achetez les meilleurs produits et services de nos entrepreneurs camerounais
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
                placeholder="Rechercher des produits..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <select
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
              >
                {sectors.map(sector => (
                  <option key={sector.id} value={sector.id}>
                    {sector.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Chargement des produits...</p>
            </div>
          ) : displayProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-600 mb-4">
                {searchTerm || selectedCategory !== 'all' || selectedSector !== 'all' 
                  ? 'Aucun produit trouvé pour ces critères' 
                  : 'Aucun produit disponible'}
              </div>
              <p className="text-sm text-gray-500">
                API Products: {products.length} | Mock Products: {mockProducts.length}
              </p>
            </div>
          ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover-lift animate-scale-in">
                <div className="relative">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                    onError={() => console.log(`Failed to load image for product: ${product.name}`)}
                  />
                  {product.isPremium && (
                    <div className="absolute top-4 right-4 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      Premium
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex items-center mr-4">
                      {renderStars(product.rating)}
                      <span className="ml-1 text-sm text-gray-600">({product.reviews})</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      {product.location}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-lg font-bold text-orange-600">{product.price}</div>
                    <div className="text-sm text-gray-600">par {product.seller}</div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <a
                      href={`/marketplace/product/${product.id}`}
                      className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center hover:scale-105 hover:shadow-lg"
                    >
                      Voir détails
                    </a>
                    <button
                      onClick={async () => {
                        const result = await addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                          seller: product.seller
                        });
                        
                        // Show notification
                        const notification = document.createElement('div');
                        notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300 ${
                          result.success ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                        }`;
                        notification.textContent = result.message;
                        document.body.appendChild(notification);
                        
                        setTimeout(() => {
                          notification.style.transform = 'translateX(100%)';
                          setTimeout(() => {
                            if (document.body.contains(notification)) {
                              document.body.removeChild(notification);
                            }
                          }, 300);
                        }, 3000);
                      }}
                      disabled={product.stock <= 0}
                      className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center hover:scale-105 hover:shadow-lg disabled:transform-none"
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </button>
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