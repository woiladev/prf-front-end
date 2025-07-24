import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService, CartItem as ApiCartItem, Product } from '../services/api';
import { useAuth } from './AuthContext';

interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
  image: string;
  seller: string;
  product_id?: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: any) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  loadCart: () => Promise<void>;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      loadCart();
    } else {
      // Load cart from localStorage for non-authenticated users
      const storedCart = localStorage.getItem('prf_cart');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    }
  }, [isAuthenticated]);

  useEffect(() => {
    // Save cart to localStorage for non-authenticated users
    if (!isAuthenticated) {
      localStorage.setItem('prf_cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isAuthenticated]);

  const loadCart = async () => {
    if (!isAuthenticated) return;
    
    setIsLoading(true);
    try {
      const response = await apiService.getCart();
      if (response.success && response.data) {
        const apiCartItems = response.data.cart;
        const formattedItems: CartItem[] = apiCartItems.map((item: ApiCartItem) => ({
          id: item.product_id,
          product_id: item.product_id,
          name: item.product?.name || 'Produit',
          price: `${item.product?.price || 0} FCFA`,
          quantity: item.quantity,
          image: item.product?.image ? `https://ghvtest.ghvcameroon.com${item.product.image}` : 'https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
          seller: 'Vendeur' // You might want to add seller info to the API
        }));
        setCartItems(formattedItems);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (product: any) => {
    if (isAuthenticated) {
      try {
        const response = await apiService.addToCart({
          product_id: product.id,
          quantity: 1
        });
        
        if (response.success) {
          await loadCart(); // Reload cart from server
          return { success: true, message: response.data?.message || 'Product added to cart' };
        } else {
          return { success: false, message: response.error || 'Failed to add product to cart' };
        }
      } catch (error) {
        console.error('Error adding to cart:', error);
        return { success: false, message: 'Network error occurred' };
      }
    } else {
      // Local cart management for non-authenticated users
      setCartItems(prev => {
        const existingItem = prev.find(item => item.id === product.id);
        if (existingItem) {
          return prev.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...prev, {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image,
            seller: product.seller
          }];
        }
      });
      return { success: true, message: 'Product added to cart' };
    }
  };

  const removeFromCart = async (productId: number) => {
    if (isAuthenticated) {
      try {
        // Find the cart item ID from the current cart
        const cartItem = cartItems.find(item => item.product_id === productId);
        if (cartItem && cartItem.product_id) {
          const response = await apiService.removeCartItem(cartItem.product_id);
          if (response.success) {
            await loadCart(); // Reload cart from server
          }
        }
      } catch (error) {
        console.error('Error removing from cart:', error);
      }
    } else {
      setCartItems(prev => prev.filter(item => item.id !== productId));
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    if (isAuthenticated) {
      try {
        const cartItem = cartItems.find(item => item.product_id === productId);
        if (cartItem && cartItem.product_id) {
          const response = await apiService.updateCartItem(cartItem.product_id, { quantity });
          if (response.success) {
            await loadCart(); // Reload cart from server
          }
        }
      } catch (error) {
        console.error('Error updating cart:', error);
      }
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
    if (!isAuthenticated) {
      localStorage.removeItem('prf_cart');
    }
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^\d]/g, ''));
      return total + (price * item.quantity);
    }, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice,
      loadCart,
      isLoading
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}