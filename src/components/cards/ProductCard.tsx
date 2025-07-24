import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, ShoppingCart } from 'lucide-react';
import { ROUTES } from '../../config/routes';
import ImageWithFallback from '../ImageWithFallback';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    category: string;
    price: string;
    seller: string;
    location: string;
    rating: number;
    reviews: number;
    image: string;
    description: string;
    isPremium?: boolean;
    stock?: number;
  };
  onAddToCart?: (product: any) => void;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, className = '' }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover-lift animate-scale-in ${className}`}>
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
          <Link
            to={ROUTES.PRODUCT_DETAIL.replace(':id', product.id.toString())}
            className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center hover:scale-105 hover:shadow-lg"
          >
            Voir détails
          </Link>
          {onAddToCart && (
            <button
              onClick={() => onAddToCart(product)}
              disabled={product.stock === 0}
              className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center hover:scale-105 hover:shadow-lg disabled:transform-none"
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;