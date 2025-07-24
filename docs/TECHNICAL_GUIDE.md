# Guide Technique PRF - Documentation Développeur

## 🔧 Architecture Technique Détaillée

### Stack Technologique

#### Frontend
```
React 18.3.1 + TypeScript 5.5.3
├── Vite 5.4.2 (Build tool)
├── Tailwind CSS 3.4.1 (Styling)
├── React Router 7.6.3 (Navigation)
├── Lucide React 0.344.0 (Icons)
├── Date-fns 4.1.0 (Date utilities)
└── Recharts 3.1.0 (Charts)
```

#### Backend API
```
Laravel/PHP Framework
├── MySQL Database
├── JWT Authentication
├── File Upload Management
├── Email Services (OTP)
└── CORS Configuration
```

---

## 📁 Structure de Fichiers Détaillée

```
src/
├── components/                 # Composants réutilisables
│   ├── common/                # Composants génériques
│   │   ├── ErrorBoundary.tsx  # Gestion d'erreurs
│   │   ├── LoadingSpinner.tsx # Indicateurs de chargement
│   │   └── NotFound.tsx       # Page 404
│   ├── forms/                 # Formulaires
│   │   └── ContactForm.tsx    # Formulaire de contact
│   ├── navigation/            # Navigation
│   │   ├── MobileMenu.tsx     # Menu mobile
│   │   └── UserMenu.tsx       # Menu utilisateur
│   ├── cards/                 # Cartes de contenu
│   │   ├── ProjectCard.tsx    # Carte projet
│   │   └── ProductCard.tsx    # Carte produit
│   ├── ui/                    # Composants UI de base
│   │   ├── Button.tsx         # Boutons
│   │   ├── Modal.tsx          # Modales
│   │   ├── Toast.tsx          # Notifications
│   │   └── Input.tsx          # Champs de saisie
│   ├── Header.tsx             # En-tête principal
│   ├── Footer.tsx             # Pied de page
│   ├── Layout.tsx             # Layout principal
│   ├── AdminHeader.tsx        # En-tête admin
│   ├── CartIcon.tsx           # Icône panier
│   ├── ImageWithFallback.tsx  # Images avec fallback
│   ├── MobileMoneyPayment.tsx # Paiement Mobile Money
│   └── AnnouncementBanner.tsx # Bannière d'annonce
├── pages/                     # Pages de l'application
│   ├── admin/                 # Pages d'administration
│   │   ├── AdminOverview.tsx      # Vue d'ensemble
│   │   ├── UserManagement.tsx     # Gestion utilisateurs
│   │   ├── ProjectManagement.tsx  # Gestion projets
│   │   ├── BlogManagement.tsx     # Gestion blog
│   │   ├── ProductManagement.tsx  # Gestion produits
│   │   ├── ExpertManagement.tsx   # Gestion experts
│   │   ├── CategoryManagement.tsx # Gestion catégories
│   │   ├── ContactManagement.tsx  # Gestion contacts
│   │   ├── FormalisationManagement.tsx # Gestion formalisations
│   │   ├── NewsletterManagement.tsx    # Gestion newsletter
│   │   ├── SuccessStoryManagement.tsx  # Gestion success stories
│   │   ├── StepsManagement.tsx         # Gestion étapes projets
│   │   ├── SubscriptionsManagement.tsx # Gestion abonnements
│   │   └── OrdersManagement.tsx        # Gestion commandes
│   ├── Home.tsx               # Page d'accueil
│   ├── Projects.tsx           # Liste des projets
│   ├── ProjectDetail.tsx      # Détail d'un projet
│   ├── Marketplace.tsx        # Marketplace
│   ├── ProductDetail.tsx      # Détail produit
│   ├── ExpertDirectory.tsx    # Annuaire experts
│   ├── ExpertDetail.tsx       # Détail expert
│   ├── BusinessFormalization.tsx # Formalisation
│   ├── SuccessStories.tsx     # Success stories
│   ├── Blog.tsx               # Liste blog
│   ├── BlogPost.tsx           # Article de blog
│   ├── Contact.tsx            # Contact
│   ├── FAQ.tsx                # Questions fréquentes
│   ├── Login.tsx              # Connexion
│   ├── Register.tsx           # Inscription
│   ├── OtpVerification.tsx    # Vérification OTP
│   ├── ForgotPassword.tsx     # Mot de passe oublié
│   ├── ResetPassword.tsx      # Réinitialisation
│   ├── Subscription.tsx       # Abonnements
│   ├── VipDashboard.tsx       # Tableau de bord VIP
│   ├── Cart.tsx               # Panier
│   ├── Checkout.tsx           # Commande
│   └── AdminDashboard.tsx     # Dashboard admin
├── contexts/                  # Contextes React
│   ├── AuthContext.tsx        # Authentification
│   ├── SubscriptionContext.tsx # Abonnements
│   └── CartContext.tsx        # Panier
├── services/                  # Services API
│   └── api.ts                 # Service API principal
├── lib/                       # Bibliothèques
│   └── api/                   # Services API modulaires
│       ├── base.ts            # Service de base
│       ├── auth.ts            # Authentification
│       ├── projects.ts        # Projets
│       ├── users.ts           # Utilisateurs
│       ├── blog.ts            # Blog
│       ├── steps.ts           # Étapes projets
│       └── subscriptions.ts   # Abonnements
├── utils/                     # Fonctions utilitaires
│   ├── index.ts               # Exports principaux
│   ├── validation.ts          # Validation
│   ├── formatters.ts          # Formatage
│   ├── helpers.ts             # Helpers
│   └── storage.ts             # Stockage local
├── types/                     # Types TypeScript
│   ├── index.ts               # Types principaux
│   └── api.ts                 # Types API
├── config/                    # Configuration
│   ├── constants.ts           # Constantes
│   ├── routes.ts              # Routes
│   └── api.ts                 # Configuration API
└── index.css                  # Styles globaux
```

---

## 🔄 Flux de Données

### 1. Authentification
```
User Input → AuthContext → API Service → Backend → JWT Token → LocalStorage
```

### 2. Gestion des projets
```
Admin Input → ProjectManagement → API Service → Backend → Database → Frontend Update
```

### 3. Marketplace
```
Product Selection → CartContext → API Service → Backend → Order Creation → Payment
```

### 4. Abonnements
```
Plan Selection → SubscriptionContext → Payment → API Confirmation → Access Update
```

---

## 🎨 Design System

### Couleurs principales
```css
/* Couleurs de marque */
--blue-primary: #2563eb;
--green-primary: #059669;
--orange-primary: #ea580c;
--red-primary: #dc2626;

/* Couleurs d'état */
--success: #10b981;
--warning: #f59e0b;
--error: #ef4444;
--info: #3b82f6;

/* Couleurs neutres */
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-900: #111827;
```

### Typographie
```css
/* Tailles de police */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */

/* Poids de police */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Espacements
```css
/* Système d'espacement 8px */
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
```

### Breakpoints
```css
/* Responsive breakpoints */
--sm: 640px;   /* Mobile large */
--md: 768px;   /* Tablet */
--lg: 1024px;  /* Desktop */
--xl: 1280px;  /* Desktop large */
--2xl: 1536px; /* Desktop XL */
```

---

## 🔌 API Endpoints Détaillés

### Authentification
```http
# Inscription
POST /api/register
Content-Type: application/json
{
  "name": "string",
  "email": "string",
  "password": "string"
}

# Connexion
POST /api/login
Content-Type: application/json
{
  "email": "string",
  "password": "string"
}

# Vérification OTP
POST /api/verify-otp
Content-Type: application/json
{
  "email": "string",
  "otp": "string"
}
```

### Projets
```http
# Liste des projets
GET /api/projects
Authorization: Bearer {token}

# Créer un projet
POST /api/projects
Authorization: Bearer {token}
Content-Type: multipart/form-data
{
  "name": "string",
  "category_id": "number",
  "description": "string",
  "is_free": "boolean",
  "basic_price": "number",
  "classic_price": "number",
  "premium_price": "number",
  "image": "file"
}
```

### Marketplace
```http
# Liste des produits
GET /api/products

# Ajouter au panier
POST /api/cart
Authorization: Bearer {token}
Content-Type: application/json
{
  "product_id": "number",
  "quantity": "number"
}

# Checkout
POST /api/checkout
Authorization: Bearer {token}
Content-Type: application/json
{
  "operator": "mtn|orange"
}
```

---

## 🧪 Tests et Qualité

### Tests Frontend
```bash
# Linting
npm run lint

# Type checking
npm run type-check

# Build test
npm run build
```

### Validation des données
```typescript
// Validation email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validation téléphone camerounais
export function isValidCameroonPhone(phone: string): boolean {
  const phoneRegex = /^(\+237|237)?[6][0-9]{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Validation mot de passe
export function validatePassword(password: string): {valid: boolean; errors: string[]} {
  const errors: string[] = [];
  if (password.length < 6) errors.push('Minimum 6 caractères');
  if (!/[A-Za-z]/.test(password)) errors.push('Au moins une lettre');
  if (!/[0-9]/.test(password)) errors.push('Au moins un chiffre');
  return { valid: errors.length === 0, errors };
}
```

---

## 🔄 État de l'Application

### Gestion d'état
```typescript
// AuthContext - Authentification globale
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{success: boolean; message?: string}>;
  logout: () => void;
  isAuthenticated: boolean;
}

// CartContext - Panier d'achat
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: any) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

// SubscriptionContext - Abonnements
interface SubscriptionContextType {
  subscription: Subscription | null;
  subscribe: (planId: string) => void;
  isVip: boolean;
}
```

### Stockage local
```typescript
// Données persistées
localStorage.setItem('prf_token', token);        // Token JWT
localStorage.setItem('prf_user', JSON.stringify(user)); // Données utilisateur
localStorage.setItem('prf_cart', JSON.stringify(cart)); // Panier (non-connecté)
localStorage.setItem('prf_subscription', JSON.stringify(sub)); // Abonnement
```

---

## 🎯 Patterns de Développement

### 1. Composants réutilisables
```typescript
// Pattern de composant avec props typées
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick
}) => {
  // Implémentation...
};
```

### 2. Hooks personnalisés
```typescript
// Hook pour les appels API
function useApi<T>(endpoint: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Logique d'appel API
  }, [endpoint]);

  return { data, loading, error };
}
```

### 3. Gestion d'erreurs
```typescript
// ErrorBoundary pour capturer les erreurs React
class ErrorBoundary extends Component<Props, State> {
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

---

## 📱 Responsive Design

### Breakpoints Tailwind
```typescript
const BREAKPOINTS = {
  SM: 640,   // Mobile large
  MD: 768,   // Tablet
  LG: 1024,  // Desktop
  XL: 1280,  // Desktop large
  '2XL': 1536 // Desktop XL
} as const;
```

### Patterns responsive
```tsx
// Grid responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// Texte responsive
<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">

// Espacement responsive
<div className="p-4 md:p-6 lg:p-8">

// Visibilité responsive
<div className="hidden md:block">Desktop only</div>
<div className="block md:hidden">Mobile only</div>
```

---

## 🔐 Sécurité Frontend

### Protection XSS
```typescript
// Sanitisation des données utilisateur
const sanitizeInput = (input: string): string => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
};

// Utilisation de dangerouslySetInnerHTML avec précaution
<div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
```

### Validation côté client
```typescript
// Validation avant envoi API
const validateForm = (data: FormData): {valid: boolean; errors: string[]} => {
  const errors: string[] = [];
  
  if (!isValidEmail(data.email)) {
    errors.push('Email invalide');
  }
  
  if (data.password.length < 6) {
    errors.push('Mot de passe trop court');
  }
  
  return { valid: errors.length === 0, errors };
};
```

---

## 🚀 Performance

### Optimisations
```typescript
// Lazy loading des composants
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

// Mémorisation des calculs coûteux
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);

// Debouncing pour les recherches
const debouncedSearch = useMemo(
  () => debounce((term: string) => {
    performSearch(term);
  }, 300),
  []
);
```

### Bundle optimization
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react'],
          charts: ['recharts'],
          utils: ['date-fns']
        }
      }
    }
  }
});
```

---

## 📊 Monitoring

### Métriques à surveiller
- **Core Web Vitals** (LCP, FID, CLS)
- **Temps de chargement** des pages
- **Taux d'erreur** JavaScript
- **Conversions** d'abonnement
- **Utilisation** des fonctionnalités

### Logging
```typescript
// Logger personnalisé
const logger = {
  info: (message: string, data?: any) => {
    console.log(`[INFO] ${message}`, data);
  },
  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${message}`, error);
    // Envoyer à un service de monitoring
  },
  warn: (message: string, data?: any) => {
    console.warn(`[WARN] ${message}`, data);
  }
};
```

---

## 🛠️ Outils de Développement

### Scripts NPM
```json
{
  "scripts": {
    "dev": "vite",                    // Développement
    "build": "vite build",            // Build production
    "preview": "vite preview",        // Prévisualisation
    "lint": "eslint .",               // Linting
    "type-check": "tsc --noEmit"      // Vérification types
  }
}
```

### Configuration ESLint
```javascript
// eslint.config.js
export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  }
);
```

---

## 🔧 Maintenance

### Mise à jour des dépendances
```bash
# Vérifier les mises à jour
npm outdated

# Mettre à jour les dépendances mineures
npm update

# Mettre à jour les dépendances majeures (avec précaution)
npm install package@latest
```

### Monitoring des performances
```typescript
// Performance monitoring
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.entryType === 'navigation') {
      console.log('Page load time:', entry.duration);
    }
  }
});
observer.observe({ entryTypes: ['navigation'] });
```

---

## 🐛 Debugging

### Outils de debug
```typescript
// Debug mode en développement
if (import.meta.env.DEV) {
  console.log('Debug info:', data);
}

// React DevTools
// Redux DevTools (si utilisé)
// Network tab pour les appels API
```

### Gestion d'erreurs
```typescript
// Error boundary avec détails en développement
{process.env.NODE_ENV === 'development' && this.state.error && (
  <details className="mt-4 text-left">
    <summary>Détails de l'erreur (dev)</summary>
    <pre className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded overflow-auto">
      {this.state.error.stack}
    </pre>
  </details>
)}
```

---

## 📚 Ressources Additionnelles

### Documentation externe
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)

### Outils recommandés
- **VS Code** avec extensions React/TypeScript
- **React Developer Tools**
- **Tailwind CSS IntelliSense**
- **ES7+ React/Redux/React-Native snippets**

---

*Guide technique mis à jour le : Décembre 2024*
*Version : 1.0.0*