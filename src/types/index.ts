// Re-export all types
export * from './api';

// UI Component Types
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface ToastType {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  object: string;
  message: string;
  request_type: string;
}

// Cart Types (for context)
export interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
  image: string;
  seller: string;
  product_id?: number;
}

// Subscription Types (for context)
export interface Subscription {
  id: string;
  plan: string;
  status: 'active' | 'expired' | 'inactive';
  expiryDate: string;
}