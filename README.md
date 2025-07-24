# PRF - Centre de Promotion des Politiques Publiques et des Initiatives Privées

## 📋 Table des Matières

1. [Vue d'ensemble du projet](#vue-densemble-du-projet)
2. [Architecture de la plateforme](#architecture-de-la-plateforme)
3. [Frontend - Interface utilisateur](#frontend---interface-utilisateur)
4. [Backend - API Implementation](#backend---api-implementation)
5. [Déploiement](#déploiement)
6. [Guide d'installation](#guide-dinstallation)
7. [Configuration](#configuration)
8. [Fonctionnalités](#fonctionnalités)
9. [Technologies utilisées](#technologies-utilisées)
10. [Maintenance et support](#maintenance-et-support)

---

## 🎯 Vue d'ensemble du projet

**PRF** est une plateforme web complète dédiée au développement de l'entrepreneuriat au Cameroun. Elle sert de pont entre les politiques publiques gouvernementales et les initiatives privées des entrepreneurs.

### Mission
- Faciliter l'accès aux programmes gouvernementaux
- Promouvoir l'entrepreneuriat local
- Accompagner les porteurs de projets
- Créer un écosystème entrepreneurial dynamique

### Public cible
- Entrepreneurs camerounais
- Producteurs agricoles
- Coopératives
- PME et startups
- Experts sectoriels

---

## 🏗️ Architecture de la plateforme

### Structure générale
```
PRF Platform
├── Frontend (React + TypeScript)
│   ├── Interface utilisateur publique
│   ├── Tableau de bord utilisateur
│   └── Interface d'administration
├── Backend API (Laravel/PHP)
│   ├── API REST
│   ├── Authentification
│   └── Base de données
└── Déploiement (Netlify + Backend)
```

### Architecture technique
```
src/
├── components/           # Composants réutilisables
│   ├── common/          # Composants génériques
│   ├── forms/           # Formulaires
│   ├── navigation/      # Navigation
│   ├── cards/           # Cartes de contenu
│   └── ui/              # Composants UI de base
├── pages/               # Pages de l'application
│   ├── admin/           # Pages d'administration
│   └── [autres pages]   # Pages publiques
├── contexts/            # Contextes React
├── services/            # Services API
├── lib/                 # Bibliothèques utilitaires
├── utils/               # Fonctions utilitaires
├── types/               # Types TypeScript
└── config/              # Configuration
```

---

## 🎨 Frontend - Interface utilisateur

### Technologies utilisées
- **React 18** avec TypeScript
- **Tailwind CSS** pour le styling
- **React Router** pour la navigation
- **Lucide React** pour les icônes
- **Vite** comme bundler

### Structure des composants

#### 1. Layout Principal
```typescript
// src/components/Layout.tsx
- Header avec navigation
- Footer avec newsletter
- Gestion des routes admin/public
```

#### 2. Navigation
```typescript
// src/components/Header.tsx
- Menu responsive
- Dropdown projets avec catégories
- Authentification utilisateur
- Panier d'achat
```

#### 3. Pages principales

##### Page d'accueil (`/`)
- Hero section avec présentation
- Carrousel de services
- Témoignages
- Statistiques

##### Projets (`/projects`)
- Liste des initiatives gouvernementales
- Filtres par catégorie
- Recherche avancée
- Projets gratuits et premium

##### Marketplace (`/marketplace`)
- Produits et services
- Système de panier
- Évaluations vendeurs
- Filtres sectoriels

##### Centre de Métier (`/experts`)
- Annuaire d'experts
- Profils détaillés
- Système d'avis
- Contact direct (VIP)

##### Formalisation (`/formalization`)
- Guide de création d'entreprise
- Types juridiques (SA, SARL, GIC, COOP)
- Formulaire de demande
- Documents requis

#### 4. Système d'authentification
```typescript
// src/contexts/AuthContext.tsx
- Inscription/Connexion
- Vérification OTP
- Gestion des rôles (user/admin)
- Mot de passe oublié
```

#### 5. Gestion des abonnements
```typescript
// src/contexts/SubscriptionContext.tsx
- Plans d'abonnement (Classique, Premium, VIP)
- Paiement Mobile Money
- Accès aux contenus premium
```

#### 6. Interface d'administration
```typescript
// src/pages/AdminDashboard.tsx
- Tableau de bord responsive
- Gestion des utilisateurs
- Gestion des projets
- Gestion du contenu (blog, experts)
- Statistiques et rapports
```

### Fonctionnalités clés

#### Responsive Design
- **Mobile First** approach
- **Breakpoints** : sm (640px), md (768px), lg (1024px), xl (1280px)
- **Navigation mobile** avec menu hamburger
- **Grilles adaptatives** pour tous les écrans

#### Animations et UX
- **Transitions fluides** avec Tailwind
- **Hover effects** sur les cartes
- **Loading states** avec spinners
- **Toast notifications** pour les actions

#### Accessibilité
- **Contraste** suffisant pour tous les textes
- **Navigation clavier** supportée
- **Alt text** pour toutes les images
- **ARIA labels** appropriés

---

## 🔧 Backend - API Implementation

### URL de base
```
Production: https://ghvtest.ghvcameroon.com/api
```

### Architecture API

#### 1. Authentification
```http
POST /api/register
POST /api/login
POST /api/verify-otp
POST /api/forgot-password
POST /api/set-password
```

**Flux d'authentification :**
1. Inscription → Compte créé
2. Connexion → OTP envoyé par email
3. Vérification OTP → Token JWT + Accès

#### 2. Gestion des projets
```http
GET    /api/projects              # Liste des projets
GET    /api/projects/{id}         # Détail d'un projet
POST   /api/projects              # Créer un projet (Admin)
PUT    /api/projects/{id}         # Modifier un projet (Admin)
DELETE /api/projects/{id}         # Supprimer un projet (Admin)
```

#### 3. Gestion des utilisateurs
```http
GET    /api/users                 # Liste des utilisateurs (Admin)
GET    /api/users/{id}            # Détail utilisateur (Admin)
PUT    /api/users/{id}/type       # Modifier le rôle (Admin)
```

#### 4. Marketplace
```http
GET    /api/products              # Liste des produits
GET    /api/products/{id}         # Détail produit
POST   /api/products              # Créer un produit (Admin)
PUT    /api/products/{id}         # Modifier un produit (Admin)
DELETE /api/products/{id}         # Supprimer un produit (Admin)

# Panier
GET    /api/cart                  # Contenu du panier
POST   /api/cart                  # Ajouter au panier
PUT    /api/cart/{id}             # Modifier quantité
DELETE /api/cart/{id}             # Supprimer du panier

# Commandes
POST   /api/checkout              # Créer une commande
GET    /api/orders                # Mes commandes
POST   /api/payment/confirm       # Confirmer paiement
```

#### 5. Blog et contenu
```http
GET    /api/blogs                 # Liste des articles
GET    /api/blogs/{id}            # Détail article
POST   /api/blogs                 # Créer un article (Admin)
PUT    /api/blogs/{id}            # Modifier un article (Admin)
DELETE /api/blogs/{id}            # Supprimer un article (Admin)

# Commentaires
GET    /api/blogs/{id}/comments   # Commentaires d'un article
POST   /api/blogs/{id}/comments   # Ajouter un commentaire
DELETE /api/comments/{id}         # Supprimer un commentaire (Admin)
```

#### 6. Experts et services
```http
GET    /api/service-providers     # Liste des experts
GET    /api/service-providers/{id} # Détail expert
POST   /api/service-providers     # Ajouter un expert (Admin)
PUT    /api/service-providers/{id} # Modifier un expert (Admin)
DELETE /api/service-providers/{id} # Supprimer un expert (Admin)

# Avis sur les experts
GET    /api/service-providers/{id}/reviews # Avis d'un expert
POST   /api/service-providers/{id}/reviews # Ajouter un avis
```

#### 7. Contact et formalisation
```http
POST   /api/contact               # Envoyer un message de contact
GET    /api/contacts              # Liste des contacts (Admin)
DELETE /api/contacts/{id}         # Supprimer un contact (Admin)

POST   /api/formalisation         # Demande de formalisation
GET    /api/formalisation         # Liste des demandes (Admin)
DELETE /api/formalisation/{id}    # Supprimer une demande (Admin)
```

#### 8. Newsletter
```http
POST   /api/newsletter/subscribe    # S'abonner à la newsletter
POST   /api/newsletter/unsubscribe  # Se désabonner
POST   /api/newsletter/send         # Envoyer newsletter (Admin)
GET    /api/newsletter/subscriptions # Liste des abonnés (Admin)
```

#### 9. Abonnements
```http
POST   /api/subscriptions         # Créer un abonnement
GET    /api/subscriptions         # Mes abonnements
POST   /api/subscriptions/payment/confirm # Confirmer paiement
```

### Format des réponses API

#### Succès
```json
{
  "success": true,
  "data": {
    // Données de la réponse
  },
  "message": "Opération réussie"
}
```

#### Erreur
```json
{
  "success": false,
  "error": "Message d'erreur",
  "message": "Description détaillée"
}
```

### Authentification
- **JWT Token** stocké dans localStorage
- **Header Authorization** : `Bearer {token}`
- **Expiration** gérée automatiquement
- **Refresh** via nouvelle connexion

### Gestion des fichiers
- **Upload d'images** : 2MB max (JPEG, PNG, JPG, GIF)
- **Upload de vidéos** : 10MB max (MP4, MOV, AVI)
- **FormData** pour les uploads
- **Validation côté client et serveur**

---

## 🚀 Déploiement

### Frontend (Netlify)

#### Configuration automatique
Le projet est configuré pour un déploiement automatique sur Netlify :

```toml
# netlify.toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"
```

#### Variables d'environnement
```bash
# Production
VITE_API_BASE_URL=https://ghvtest.ghvcameroon.com
VITE_APP_ENV=production
```

#### Étapes de déploiement
1. **Build automatique** via `npm run build`
2. **Optimisation** des assets
3. **Déploiement** sur CDN Netlify
4. **URL de production** générée automatiquement

### Backend (Serveur existant)

#### URL de production
```
https://ghvtest.ghvcameroon.com
```

#### Configuration CORS
Le backend doit autoriser les requêtes depuis :
- `https://comforting-cheesecake-4937dd.netlify.app`
- Autres domaines de production

#### Base de données
- **MySQL/PostgreSQL** pour les données
- **Migrations** pour la structure
- **Seeders** pour les données de test

---

## 📦 Guide d'installation

### Prérequis
- **Node.js** 18+ 
- **npm** ou **yarn**
- **Git**

### Installation locale

#### 1. Cloner le projet
```bash
git clone [repository-url]
cd prf-platform
```

#### 2. Installer les dépendances
```bash
npm install
```

#### 3. Configuration
```bash
# Copier le fichier d'environnement
cp .env.example .env

# Configurer les variables
VITE_API_BASE_URL=https://ghvtest.ghvcameroon.com
```

#### 4. Lancer en développement
```bash
npm run dev
```

#### 5. Build pour production
```bash
npm run build
npm run preview
```

### Structure des dépendances

#### Dépendances principales
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^7.6.3",
  "lucide-react": "^0.344.0",
  "date-fns": "^4.1.0",
  "recharts": "^3.1.0"
}
```

#### Dépendances de développement
```json
{
  "@vitejs/plugin-react": "^4.3.1",
  "tailwindcss": "^3.4.1",
  "typescript": "^5.5.3",
  "eslint": "^9.9.1"
}
```

---

## ⚙️ Configuration

### Variables d'environnement

#### Développement (.env.local)
```bash
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_ENV=development
VITE_APP_NAME=PRF
VITE_APP_VERSION=1.0.0
```

#### Production
```bash
VITE_API_BASE_URL=https://ghvtest.ghvcameroon.com
VITE_APP_ENV=production
VITE_APP_NAME=PRF
VITE_APP_VERSION=1.0.0
```

### Configuration Tailwind
```javascript
// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'float': 'float 3s ease-in-out infinite',
      }
    }
  }
}
```

### Configuration Vite
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://ghvtest.ghvcameroon.com',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
```

---

## 🎯 Fonctionnalités

### 1. Authentification et autorisation

#### Inscription
- Formulaire avec nom, email, mot de passe
- Validation côté client et serveur
- Confirmation par email

#### Connexion
- Email + mot de passe
- Vérification OTP par email
- Token JWT pour les sessions

#### Gestion des rôles
- **Utilisateur** : Accès aux fonctionnalités de base
- **Admin** : Accès complet à l'interface d'administration

### 2. Gestion des projets

#### Projets publics (gratuits)
- Initiatives gouvernementales
- Informations complètes
- Accès libre

#### Projets premium (payants)
- Contenu détaillé
- Plans d'abonnement (Basic, Classic, Premium)
- Accompagnement personnalisé

### 3. Marketplace

#### Fonctionnalités vendeur
- Ajout de produits
- Gestion du stock
- Suivi des commandes

#### Fonctionnalités acheteur
- Navigation par catégories
- Système de panier
- Paiement Mobile Money
- Évaluations produits

### 4. Centre de Métier

#### Annuaire d'experts
- Profils détaillés
- Spécialisations sectorielles
- Système d'évaluation

#### Contact experts
- Coordonnées (membres VIP)
- Réservation de consultations
- Avis et recommandations

### 5. Formalisation d'entreprises

#### Types d'entreprises
- **SA** : Société Anonyme
- **SARL** : Société à Responsabilité Limitée
- **GIC** : Groupe d'Initiative Commune
- **COOP** : Coopérative

#### Accompagnement
- Guide complet
- Documents requis
- Suivi personnalisé

### 6. Blog et ressources

#### Gestion du contenu
- Articles avec images/vidéos
- Catégorisation
- Système de commentaires
- Newsletter

### 7. Interface d'administration

#### Tableau de bord
- Statistiques en temps réel
- Gestion des utilisateurs
- Modération du contenu
- Rapports d'activité

#### Gestion des contenus
- **Projets** : CRUD complet
- **Produits** : Gestion marketplace
- **Blog** : Publication d'articles
- **Experts** : Annuaire de spécialistes
- **Contacts** : Suivi des demandes

---

## 💻 Technologies utilisées

### Frontend
| Technologie | Version | Usage |
|-------------|---------|-------|
| React | 18.3.1 | Framework principal |
| TypeScript | 5.5.3 | Typage statique |
| Tailwind CSS | 3.4.1 | Styling et design |
| React Router | 7.6.3 | Navigation SPA |
| Lucide React | 0.344.0 | Icônes |
| Vite | 5.4.2 | Build tool |
| ESLint | 9.9.1 | Linting |

### Backend (API existante)
| Technologie | Usage |
|-------------|-------|
| Laravel/PHP | Framework backend |
| MySQL | Base de données |
| JWT | Authentification |
| CORS | Cross-origin requests |

### Déploiement
| Service | Usage |
|---------|-------|
| Netlify | Hébergement frontend |
| CDN | Distribution globale |
| SSL | Certificats automatiques |

---

## 🔧 API Service Implementation

### Structure du service API
```typescript
// src/services/api.ts
class ApiService {
  private baseUrl = 'https://ghvtest.ghvcameroon.com/api';
  
  // Méthodes génériques
  private async makeRequest<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>>
  private async makeFormRequest<T>(endpoint: string, formData: FormData): Promise<ApiResponse<T>>
  private async makeAuthenticatedRequest<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>>
  
  // Authentification
  async register(userData: RegisterRequest): Promise<ApiResponse<{message: string; user: User}>>
  async login(credentials: LoginRequest): Promise<ApiResponse<{message: string}>>
  async verifyOtp(otpData: VerifyOtpRequest): Promise<ApiResponse<{message: string; token: string; user: User}>>
  
  // Projets
  async getProjects(): Promise<ApiResponse<{projects: Project[]}>>
  async createProject(projectData: CreateProjectRequest): Promise<ApiResponse<Project>>
  
  // Et toutes les autres méthodes...
}
```

### Gestion des erreurs
```typescript
// Gestion centralisée des erreurs
try {
  const response = await apiService.someMethod();
  if (response.success) {
    // Traiter les données
  } else {
    // Afficher l'erreur
    showToast(response.error, 'error');
  }
} catch (error) {
  // Erreur réseau
  showToast('Erreur de connexion', 'error');
}
```

### Types TypeScript
```typescript
// src/types/api.ts
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

export interface Project {
  id: number;
  name: string;
  description?: string;
  is_free: boolean;
  basic_price?: number;
  classic_price?: number;
  premium_price?: number;
}
// ... autres interfaces
```

---

## 📱 Guide d'utilisation

### Pour les utilisateurs

#### 1. Inscription et connexion
1. Créer un compte avec email
2. Vérifier l'email avec le code OTP
3. Accéder au tableau de bord

#### 2. Explorer les projets
1. Parcourir les initiatives gouvernementales
2. Filtrer par catégorie
3. Accéder aux détails (gratuit/premium)

#### 3. Utiliser le marketplace
1. Rechercher des produits
2. Ajouter au panier
3. Passer commande avec Mobile Money

#### 4. Consulter les experts
1. Parcourir l'annuaire
2. Voir les profils détaillés
3. Contacter (selon abonnement)

### Pour les administrateurs

#### 1. Accès administration
- Connexion avec compte admin
- Interface dédiée `/admin`

#### 2. Gestion des contenus
- Créer/modifier des projets
- Gérer les produits marketplace
- Publier des articles de blog
- Modérer les commentaires

#### 3. Gestion des utilisateurs
- Voir tous les utilisateurs
- Modifier les rôles
- Gérer les abonnements

#### 4. Suivi des activités
- Consulter les statistiques
- Gérer les contacts
- Suivre les demandes de formalisation

---

## 🔒 Sécurité

### Frontend
- **Validation** des formulaires côté client
- **Sanitisation** des données utilisateur
- **Protection XSS** avec React
- **HTTPS** obligatoire en production

### Backend
- **Authentification JWT** sécurisée
- **Validation** des données côté serveur
- **Protection CSRF**
- **Rate limiting** sur les API

### Données sensibles
- **Mots de passe** hashés
- **Tokens** avec expiration
- **Données personnelles** protégées
- **Logs** d'audit pour les actions admin

---

## 📊 Monitoring et analytics

### Métriques frontend
- **Performance** de chargement
- **Erreurs JavaScript** 
- **Interactions utilisateur**
- **Conversions** d'abonnement

### Métriques backend
- **Temps de réponse** API
- **Taux d'erreur** par endpoint
- **Utilisation** des ressources
- **Authentifications** réussies/échouées

---

## 🛠️ Maintenance

### Mises à jour
- **Dépendances** : Mise à jour mensuelle
- **Sécurité** : Patches immédiats
- **Fonctionnalités** : Releases planifiées

### Sauvegarde
- **Base de données** : Backup quotidien
- **Fichiers** : Synchronisation cloud
- **Code** : Versioning Git

### Support
- **Documentation** maintenue à jour
- **Issues** trackées sur GitHub
- **Support utilisateur** via contact

---

## 📞 Contact et support

### Équipe technique
- **Email** : dev@prf.cm
- **Documentation** : Ce fichier README
- **Issues** : GitHub Issues

### Support utilisateur
- **Email** : contact@prf.cm
- **Téléphone** : +237 671 234 567
- **Adresse** : Douala, Bonanjo - Rue de la Réunification

---

## 📄 Licence

Ce projet est la propriété du Centre de Promotion des Politiques Publiques et des Initiatives Privées (PRF).

**© 2025 PRF - Tous droits réservés**

---

*Version du projet : 1.0.0*