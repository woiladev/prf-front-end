import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export default function CartIcon() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <Link
      to="/cart"
      className="relative p-1 sm:p-2 text-blue-100 hover:text-white transition-all duration-300 hover:scale-110"
    >
      <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center text-xs animate-pulse">
          {totalItems > 9 ? '9+' : totalItems}
        </span>
      )}
    </Link>
  );
}