import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Phone, Mail, ShoppingCart, Plus, Minus, Heart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { apiService, Product as ApiProduct } from '../services/api';

export default function ProductDetail() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState<ApiProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      loadProduct(parseInt(id));
    }
  }, [id]);

  const loadProduct = async (productId: number) => {
    setIsLoading(true);
    try {
      const response = await apiService.getProduct(productId);
      if (response.success && response.data) {
        setProduct(response.data.product);
      }
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Mock products database
  const products = [
    {
      id: 1,
      name: 'Cacao bio certifié',
      category: 'agriculture',
      price: '2,500 FCFA/kg',
      seller: 'Marie Ngono',
      location: 'Yaoundé',
      rating: 4.8,
      reviews: 15,
      images: [
        'https://www.afrique-agriculture.org/sites/afrique_agriculture/files/styles/large/public/ent_pepiniere_cacao_de_kko_internationale.jpg?itok=DOJ5Rqj0',
        'https://images.pexels.com/photos/4750277/pexels-photo-4750277.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/2872767/pexels-photo-2872767.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
      ],
      description: 'Cacao bio de qualité supérieure, certifié par nos experts PRF. Cultivé selon les méthodes traditionnelles respectueuses de l\'environnement dans les plantations de la région du Centre. Ce cacao biologique est produit sans pesticides ni engrais chimiques, garantissant une qualité exceptionnelle et un goût authentique.',
      specifications: {
        'Origine': 'Yaoundé, Cameroun',
        'Certification': 'Bio certifié',
        'Variété': 'Trinitario',
        'Humidité': '7% max',
        'Conditionnement': 'Sacs de 50kg',
        'Disponibilité': 'Toute l\'année'
      },
      phone: '+237 671 234 567',
      email: 'marie@example.com',
      isPremium: false,
      inStock: true,
      stockQuantity: 150
    },
    {
      id: 2,
      name: 'Tilapia frais',
      category: 'fishing',
      price: '1,800 FCFA/kg',
      seller: 'Paul Mbarga',
      location: 'Douala',
      rating: 4.9,
      reviews: 23,
      images: [
        'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/4022073/pexels-photo-4022073.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
      ],
      description: 'Tilapia frais d\'élevage, livraison rapide en région.',
      specifications: {
        'Origine': 'Douala, Cameroun',
        'Type': 'Élevage en cage',
        'Poids moyen': '300-500g',
        'Fraîcheur': 'Pêché du jour',
        'Conditionnement': 'Glacé',
        'Livraison': '24h max'
      },
      phone: '+237 682 345 678',
      email: 'paul@example.com',
      isPremium: true,
      inStock: true,
      stockQuantity: 80
    },
    {
      id: 3,
      name: 'Consultation agro-économique',
      category: 'services',
      price: '25,000 FCFA/session',
      seller: 'Dr. Fatima Aliou',
      location: 'Bafoussam',
      rating: 5.0,
      reviews: 8,
      images: [
        'https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
      ],
      description: 'Consultation personnalisée pour optimiser votre production.',
      specifications: {
        'Durée': '2 heures',
        'Format': 'Présentiel ou visio',
        'Expertise': '15 ans d\'expérience',
        'Domaines': 'Agriculture, Élevage',
        'Suivi': 'Rapport détaillé',
        'Disponibilité': 'Sur rendez-vous'
      },
      phone: '+237 693 456 789',
      email: 'fatima@example.com',
      isPremium: true,
      inStock: true,
      stockQuantity: 1
    },
    {
      id: 4,
      name: 'Huile de palme artisanale',
      category: 'agriculture',
      price: '1,200 FCFA/litre',
      seller: 'Jean Kouam',
      location: 'Bertoua',
      rating: 4.6,
      reviews: 12,
      images: [
        'https://images.pexels.com/photos/4750277/pexels-photo-4750277.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
      ],
      description: 'Huile de palme rouge, production artisanale traditionnelle.',
      specifications: {
        'Origine': 'Bertoua, Cameroun',
        'Type': 'Artisanale',
        'Couleur': 'Rouge naturel',
        'Acidité': '< 3%',
        'Conditionnement': 'Bidons de 5L',
        'Conservation': '12 mois'
      },
      phone: '+237 674 567 890',
      email: 'jean@example.com',
      isPremium: false,
      inStock: true,
      stockQuantity: 45
    },
    {
      id: 5,
      name: 'Matériel d\'irrigation',
      category: 'equipment',
      price: '450,000 FCFA/set',
      seller: 'AgroTech Cameroun',
      location: 'Yaoundé',
      rating: 4.7,
      reviews: 6,
      images: [
        'https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
      ],
      description: 'Système d\'irrigation goutte-à-goutte pour petites exploitations.',
      specifications: {
        'Type': 'Goutte-à-goutte',
        'Surface': 'Jusqu\'à 1 hectare',
        'Débit': '2-4 L/h par goutteur',
        'Matériau': 'PVC résistant UV',
        'Installation': 'Kit complet',
        'Garantie': '2 ans'
      },
      phone: '+237 685 678 901',
      email: 'agrotech@example.com',
      isPremium: true,
      inStock: true,
      stockQuantity: 8
    },
    {
      id: 6,
      name: 'Volaille fermière',
      category: 'livestock',
      price: '3,500 FCFA/unité',
      seller: 'Bernadette Essono',
      location: 'Ebolowa',
      rating: 4.8,
      reviews: 19,
      images: [
        'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
      ],
      description: 'Poulets fermiers élevés au grain, qualité supérieure.',
      specifications: {
        'Race': 'Poulet fermier local',
        'Âge': '3-4 mois',
        'Poids': '1.5-2 kg',
        'Alimentation': 'Grain naturel',
        'Élevage': 'Plein air',
        'Vaccination': 'Complète'
      },
      phone: '+237 676 789 012',
      email: 'bernadette@example.com',
      isPremium: false,
      inStock: true,
      stockQuantity: 25
    }
  ];

  // Use API product if available, otherwise use mock data
  const mockProduct = products.find(p => p.id === parseInt(id || '0'));
  const displayProduct = product ? {
    id: product.id,
    name: product.name,
    category: 'general',
    price: `${product.price.toLocaleString()} FCFA`,
    priceFormatted: `${product.price.toLocaleString()} FCFA`,
    seller: 'Vendeur PRF',
    location: 'Cameroun',
    rating: 4.5 + Math.random() * 0.5,
    reviews: Math.floor(Math.random() * 50) + 10,
    images: product.image_url ? [product.image_url] : [
      'https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
    ],
    description: product.description || 'Produit de qualité disponible sur PRF',
    specifications: {
      'Nom': product.name,
      'Prix': `${product.price.toLocaleString()} FCFA`,
      'Stock': `${product.stock} unités`,
      'Date d\'ajout': product.created_at ? new Date(product.created_at).toLocaleDateString('fr-FR') : 'N/A',
      'Dernière mise à jour': product.updated_at ? new Date(product.updated_at).toLocaleDateString('fr-FR') : 'N/A',
      'ID Produit': `#${product.id}`
    },
    phone: '+237 6XX XXX XXX',
    email: 'vendeur@prf.cm',
    isPremium: false,
    inStock: product.stock > 0,
    stockQuantity: product.stock
  } : mockProduct;
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du produit...</p>
        </div>
      </div>
    );
  }

  if (!displayProduct && !isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Produit non trouvé</h2>
          <Link
            to="/marketplace"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Retour au marketplace
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = async () => {
    if (!displayProduct || !displayProduct.inStock) return;

    try {
      const result = await addToCart({
        id: displayProduct.id,
        name: displayProduct.name,
        price: displayProduct.priceFormatted,
        image: displayProduct.images[0],
        seller: displayProduct.seller,
        quantity: quantity
      });
      
      // Show notification based on result
      const message = result.success 
        ? (quantity === 1 
            ? `${displayProduct.name} ajouté au panier!`
            : `${quantity} × ${displayProduct.name} ajoutés au panier!`)
        : result.message;
      
      // Create a temporary notification
      const notification = document.createElement('div');
      notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300 ${
        result.success ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      }`;
      notification.textContent = message;
      document.body.appendChild(notification);
      
      // Remove notification after 3 seconds
      setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification);
          }
        }, 300);
      }, 3000);
      
      // Reset quantity to 1 after successful addition
      if (result.success) {
        setQuantity(1);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      
      // Show error notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      notification.textContent = 'Erreur lors de l\'ajout au panier';
      document.body.appendChild(notification);
      
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 3000);
    }
  };

  // Alternative single add to cart for mock products
  const handleAddToCartMock = async () => {
    if (!displayProduct || !displayProduct.inStock) return;

    try {
      const result = await addToCart({
        id: displayProduct.id,
        name: displayProduct.name,
        price: displayProduct.price,
        image: displayProduct.images[0],
        seller: displayProduct.seller
      });
      
      // Show notification based on result
      const message = result.success 
        ? (quantity === 1 
            ? `${displayProduct.name} ajouté au panier!`
            : `${quantity} × ${displayProduct.name} ajoutés au panier!`)
        : result.message;
      
      // Create a temporary notification
      const notification = document.createElement('div');
      notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300 ${
        result.success ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      }`;
      notification.textContent = message;
      document.body.appendChild(notification);
      
      // Remove notification after 3 seconds
      setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification);
          }
        }, 300);
      }, 3000);
      
      // Reset quantity to 1 after successful addition
      if (result.success) {
        setQuantity(1);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

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
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/marketplace"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Retour au marketplace
          </Link>
        </div>
      </div>

      {/* Product Details */}
      <section className="relative py-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-4">
                <img
                  src={displayProduct.images[selectedImage]}
                  alt={displayProduct.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
              <div className="flex space-x-2">
                {displayProduct.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${displayProduct.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {displayProduct.category}
                </span>
                {displayProduct.isPremium && (
                  <span className="ml-2 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                    Premium
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">{displayProduct.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-4">
                  {renderStars(displayProduct.rating)}
                  <span className="ml-2 text-sm text-gray-600">({displayProduct.reviews} avis)</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  {displayProduct.location}
                </div>
              </div>

              <div className="text-3xl font-bold text-green-600 mb-6">{displayProduct.price}</div>

              <p className="text-gray-600 mb-6">{displayProduct.description}</p>

              {/* Stock Status */}
              <div className="mb-6">
                <div className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium ${
                  displayProduct.inStock 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {displayProduct.inStock 
                    ? `✅ En stock (${displayProduct.stockQuantity || 0} disponibles)`
                    : '❌ Rupture de stock'
                  }
                </div>
              </div>

              {/* Quantity Selector */}
              {displayProduct.inStock && (
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-700 font-medium">Quantité:</span>
                <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="p-3 hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-6 py-3 font-bold text-lg min-w-[60px] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(displayProduct.stockQuantity || 1, quantity + 1))}
                    disabled={quantity >= (displayProduct.stockQuantity || 1)}
                    className="p-3 hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-600 font-medium">
                  (Maximum: {displayProduct.stockQuantity || 0})
                </span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  disabled={!displayProduct.inStock || quantity > (displayProduct.stockQuantity || 0)}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-4 px-6 rounded-lg font-bold text-lg transition-all duration-200 flex items-center justify-center shadow-lg transform hover:scale-105 disabled:transform-none"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {!displayProduct.inStock ? 'Rupture de stock' : 'Ajouter au panier'}
                </button>
                <button className="sm:w-auto w-full p-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-red-400 transition-all duration-200 flex items-center justify-center">
                  <Heart className="h-5 w-5 text-gray-600" />
                  <span className="ml-2 sm:hidden">Ajouter aux favoris</span>
                </button>
              </div>

              {/* Seller Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Vendeur</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{displayProduct.seller}</p>
                    <p className="text-sm text-gray-600">{displayProduct.location}</p>
                  </div>
                  <div className="flex space-x-2">
                    <a
                      href={`tel:${displayProduct.phone}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors shadow-md"
                    >
                      <Phone className="h-5 w-5" />
                    </a>
                    <a
                      href={`mailto:${displayProduct.email}`}
                      className="bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-lg transition-colors shadow-md"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Specifications */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Specifications */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Spécifications du produit</h2>
              <div className="space-y-4">
                {Object.entries(displayProduct.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b border-gray-200">
                    <span className="font-medium text-gray-700">{key}:</span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Product Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Informations complémentaires</h2>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-800 mb-2">✅ Disponibilité</h3>
                  <p className="text-green-700 text-sm">
                    {displayProduct.inStock 
                      ? `En stock (${displayProduct.stockQuantity || 0} unités disponibles)`
                      : 'Rupture de stock - Contactez le vendeur pour plus d\'informations'
                    }
                  </p>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-800 mb-2">🚚 Livraison</h3>
                  <p className="text-blue-700 text-sm">
                    Livraison disponible dans toute la région. 
                    Contactez le vendeur pour connaître les modalités et tarifs de livraison.
                  </p>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h3 className="font-semibold text-orange-800 mb-2">💰 Paiement</h3>
                  <p className="text-orange-700 text-sm">
                    Paiement sécurisé par Mobile Money (MTN MoMo, Orange Money) 
                    ou paiement à la livraison selon disponibilité.
                  </p>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h3 className="font-semibold text-purple-800 mb-2">🛡️ Garantie qualité</h3>
                  <p className="text-purple-700 text-sm">
                    Tous nos produits sont vérifiés par l'équipe PRF. 
                    Satisfaction garantie ou remboursement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Avis clients</h2>
          
          {/* Reviews Summary */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="text-4xl font-bold text-gray-900 mr-4">
                  {displayProduct.rating.toFixed(1)}
                </div>
                <div>
                  <div className="flex items-center mb-1">
                    {renderStars(displayProduct.rating)}
                  </div>
                  <p className="text-sm text-gray-600">
                    Basé sur {displayProduct.reviews} avis
                  </p>
                </div>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Laisser un avis
              </button>
            </div>
          </div>

          {/* Sample Reviews */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3">
                    <span className="font-semibold">JD</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Jean Dupont</h4>
                    <div className="flex items-center">
                      {renderStars(5)}
                    </div>
                  </div>
                </div>
                <span className="text-sm text-gray-500">Il y a 2 semaines</span>
              </div>
              <p className="text-gray-700">
                Excellent produit, conforme à la description. Livraison rapide et vendeur très professionnel. 
                Je recommande vivement !
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center mr-3">
                    <span className="font-semibold">MK</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Marie Kamga</h4>
                    <div className="flex items-center">
                      {renderStars(4)}
                    </div>
                  </div>
                </div>
                <span className="text-sm text-gray-500">Il y a 1 mois</span>
              </div>
              <p className="text-gray-700">
                Très bonne qualité, prix correct. Le vendeur est réactif et de bon conseil. 
                Je commanderai à nouveau.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Produits similaires</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.filter(p => p.id !== displayProduct.id && p.category === displayProduct.category).slice(0, 4).map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                to={`/marketplace/product/${relatedProduct.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={relatedProduct.images[0]}
                  alt={relatedProduct.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {relatedProduct.name}
                  </h3>
                  <div className="flex items-center mb-2">
                    {renderStars(relatedProduct.rating)}
                    <span className="ml-1 text-sm text-gray-600">({relatedProduct.reviews})</span>
                  </div>
                  <div className="text-lg font-bold text-green-600">
                    {relatedProduct.price}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}