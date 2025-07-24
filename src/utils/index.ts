import { type ClassValue, clsx } from 'clsx';

// Utility function to combine class names
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Re-export all utilities
export * from './validation';
export * from './formatters';
export * from './helpers';
export * from './storage';