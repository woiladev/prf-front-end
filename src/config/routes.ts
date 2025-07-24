// Application Routes Configuration
export const ROUTES = {
  // Public Routes
  HOME: '/',
  PROJECTS: '/projects',
  PROJECT_DETAIL: '/projects/:id',
  MARKETPLACE: '/marketplace',
  PRODUCT_DETAIL: '/marketplace/product/:id',
  EXPERTS: '/experts',
  EXPERT_DETAIL: '/experts/:id',
  BLOG: '/blog',
  BLOG_POST: '/blog/:id',
  CONTACT: '/contact',
  FAQ: '/faq',
  SUCCESS_STORIES: '/success-stories',
  FORMALIZATION: '/formalization',
  
  // Authentication Routes
  LOGIN: '/login',
  REGISTER: '/register',
  VERIFY_OTP: '/verify-otp',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  
  // User Routes
  SUBSCRIPTION: '/subscription',
  VIP_DASHBOARD: '/vip-dashboard',
  CART: '/cart',
  CHECKOUT: '/checkout',
  
  // Admin Routes
  ADMIN: '/admin',
  ADMIN_OVERVIEW: '/admin/overview',
  ADMIN_USERS: '/admin/users',
  ADMIN_PROJECTS: '/admin/projects',
  ADMIN_BLOG: '/admin/blog',
  ADMIN_CONTACTS: '/admin/contacts',
  ADMIN_FORMALISATIONS: '/admin/formalisations',
  ADMIN_SETTINGS: '/admin/settings',
  ADMIN_NEWSLETTER: '/admin/newsletter',
} as const;

// Navigation Configuration
export const NAVIGATION = [
  { name: 'Accueil', href: ROUTES.HOME, icon: 'Home' },
  { 
    name: 'Projets', 
    href: ROUTES.PROJECTS, 
    hasDropdown: true, 
    icon: 'FileText',
    dropdownItems: [
      { name: 'Tous les projets', href: ROUTES.PROJECTS, description: 'Voir toutes les initiatives' },
      { name: 'Agriculture & Rural', href: `${ROUTES.PROJECTS}?category=agriculture`, description: 'Projets agricoles et développement rural' },
      { name: 'Jeunesse & Formation', href: `${ROUTES.PROJECTS}?category=jeunesse`, description: 'Programmes pour les jeunes entrepreneurs' },
      { name: 'PME & Artisanat', href: `${ROUTES.PROJECTS}?category=pme`, description: 'Support aux petites entreprises' },
      { name: 'Infrastructure', href: `${ROUTES.PROJECTS}?category=infrastructure`, description: 'Projets d\'équipement et infrastructure' },
      { name: 'Financement', href: `${ROUTES.PROJECTS}?category=financement`, description: 'Accès au crédit et financement' },
      { name: 'Coopératives', href: `${ROUTES.PROJECTS}?category=cooperatives`, description: 'Création et gestion de coopératives' },
    ]
  },
  { name: 'Métier', href: ROUTES.EXPERTS, icon: 'Users' },
  { name: 'Marketplace', href: ROUTES.MARKETPLACE, icon: 'ShoppingBag' },
  { name: 'Formalisation', href: ROUTES.FORMALIZATION, icon: 'Building' },
  { name: 'Stories', href: ROUTES.SUCCESS_STORIES, icon: 'Star' },
  { name: 'Blog', href: ROUTES.BLOG, icon: 'BookOpen' },
  { name: 'FAQ', href: ROUTES.FAQ, icon: 'HelpCircle' },
  { name: 'Contact', href: ROUTES.CONTACT, icon: 'MessageCircle' },
] as const;

// Admin Navigation
export const ADMIN_NAVIGATION = [
  { id: 'overview', name: 'Vue d\'ensemble', icon: 'Home' },
  { id: 'contacts', name: 'Contacts', icon: 'MessageCircle' },
  { id: 'formalisations', name: 'Formalisations', icon: 'Building' },
  { id: 'blogs', name: 'Blog', icon: 'Eye' },
  { id: 'projects', name: 'Projets', icon: 'FileText' },
  { id: 'users', name: 'Utilisateurs', icon: 'Users' },
  { id: 'newsletter', name: 'Newsletter', icon: 'Mail' },
  { id: 'settings', name: 'Paramètres', icon: 'Settings' },
] as const;