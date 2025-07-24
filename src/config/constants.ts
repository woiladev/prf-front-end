// Application Constants
export const APP_CONFIG = {
  NAME: 'PRF',
  FULL_NAME: 'Centre de Promotion des Politiques Publiques et des Initiatives Privées',
  VERSION: '1.0.0',
  DESCRIPTION: 'Plateforme dédiée aux entrepreneurs camerounais',
  LOGO_URL: 'https://i.imgur.com/igx1kpI.png',
} as const;

// Contact Information
export const CONTACT_INFO = {
  PHONE: '+237 671 234 567',
  EMAIL: 'contact@prf.cm',
  ADDRESS: 'Douala, Bonanjo - Rue de la Réunification',
  WEBSITE: 'https://prf.cm',
} as const;

// Business Types
export const BUSINESS_TYPES = [
  {
    id: 'sa',
    name: 'SA (Société Anonyme)',
    minCapital: '10,000,000 FCFA',
    minPartners: '7 actionnaires',
  },
  {
    id: 'sarl',
    name: 'SARL (Société à Responsabilité Limitée)',
    minCapital: '1,000,000 FCFA',
    minPartners: '2 à 20 associés',
  },
  {
    id: 'gic',
    name: 'GIC (Groupe d\'Initiative Commune)',
    minCapital: 'Pas de minimum requis',
    minPartners: 'Minimum 5 membres',
  },
  {
    id: 'coop',
    name: 'COOP (Coopérative)',
    minCapital: 'Variable selon l\'activité',
    minPartners: 'Minimum 7 membres',
  },
] as const;

// Categories
export const CATEGORIES = {
  PROJECTS: [
    { id: 'all', name: 'Toutes les initiatives' },
    { id: 'gouvernemental', name: 'Initiatives gouvernementales' },
    { id: 'agriculture', name: 'Agriculture et Rural' },
    { id: 'jeunesse', name: 'Jeunesse et Formation' },
    { id: 'pme', name: 'PME et Artisanat' },
    { id: 'infrastructure', name: 'Infrastructure' },
    { id: 'financement', name: 'Financement' },
    { id: 'cooperatives', name: 'Coopératives' },
  ],
  PRODUCTS: [
    { id: 'all', name: 'Tous les produits' },
    { id: 'agriculture', name: 'Agriculture' },
    { id: 'fishing', name: 'Pêche' },
    { id: 'livestock', name: 'Élevage' },
    { id: 'services', name: 'Services' },
    { id: 'equipment', name: 'Équipements' },
  ],
  EXPERTS: [
    { id: 'all', name: 'Tous les experts' },
    { id: 'agriculture', name: 'Agriculture' },
    { id: 'fishing', name: 'Pêche' },
    { id: 'legal', name: 'Juridique' },
    { id: 'finance', name: 'Finance' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'technology', name: 'Technologie' },
  ],
  BLOG: [
    { id: 'all', name: 'Tous les articles' },
    { id: 'agriculture', name: 'Agriculture' },
    { id: 'fishing', name: 'Pêche' },
    { id: 'business', name: 'Business' },
    { id: 'technology', name: 'Technologie' },
    { id: 'legal', name: 'Juridique' },
    { id: 'success', name: 'Success Stories' },
  ],
} as const;

// Contact Types
export const CONTACT_TYPES = [
  { id: 'general', name: 'Question générale' },
  { id: 'support', name: 'Support technique' },
  { id: 'partnership', name: 'Partenariat' },
  { id: 'expert', name: 'Devenir expert' },
  { id: 'feedback', name: 'Feedback' },
  { id: 'business', name: 'Développement d\'affaires' },
  { id: 'legal', name: 'Questions juridiques' },
  { id: 'technical', name: 'Assistance technique' },
] as const;

// Subscription Plans
export const SUBSCRIPTION_PLANS = [
  {
    id: 'classique',
    name: 'Classique',
    price: '15,000 FCFA',
    period: '/mois',
    description: 'Parfait pour débuter votre aventure entrepreneuriale',
    color: 'from-blue-500 to-blue-600',
    popular: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '25,000 FCFA',
    period: '/mois',
    description: 'Pour les entrepreneurs sérieux qui veulent aller plus loin',
    color: 'from-green-500 to-green-600',
    popular: true,
  },
  {
    id: 'vip',
    name: 'VIP',
    price: '50,000 FCFA',
    period: '/mois',
    description: 'L\'expérience complète pour les entrepreneurs ambitieux',
    color: 'from-orange-500 to-red-500',
    popular: false,
  },
] as const;

// Cameroon Regions
export const CAMEROON_REGIONS = [
  { id: 'centre', name: 'Centre' },
  { id: 'littoral', name: 'Littoral' },
  { id: 'ouest', name: 'Ouest' },
  { id: 'nord', name: 'Nord' },
  { id: 'sud', name: 'Sud' },
  { id: 'est', name: 'Est' },
  { id: 'adamaoua', name: 'Adamaoua' },
  { id: 'nord-ouest', name: 'Nord-Ouest' },
  { id: 'sud-ouest', name: 'Sud-Ouest' },
  { id: 'extreme-nord', name: 'Extrême-Nord' },
] as const;

// Activity Sectors
export const ACTIVITY_SECTORS = [
  'Agriculture',
  'Pêche et Aquaculture',
  'Élevage',
  'Commerce',
  'Services',
  'Transformation',
  'Technologie',
  'Artisanat',
  'Transport',
  'Autre',
] as const;

// File Upload Limits
export const FILE_LIMITS = {
  IMAGE: {
    MAX_SIZE: 2 * 1024 * 1024, // 2MB
    ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'],
  },
  VIDEO: {
    MAX_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_TYPES: ['video/mp4', 'video/mov', 'video/avi'],
  },
} as const;

// Animation Durations
export const ANIMATION = {
  FAST: 150,
  NORMAL: 200,
  SLOW: 300,
  VERY_SLOW: 500,
} as const;

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;