# Guide de Déploiement PRF

## 🚀 Vue d'ensemble du déploiement

Ce guide détaille le processus de déploiement de la plateforme PRF, incluant le frontend sur Netlify et la configuration backend.

---

## 📋 Prérequis

### Outils requis
- **Node.js** 18+
- **npm** ou **yarn**
- **Git**
- **Compte Netlify**
- **Accès au serveur backend**

### Comptes et services
- **GitHub** : Pour le code source
- **Netlify** : Pour l'hébergement frontend
- **Serveur backend** : https://ghvtest.ghvcameroon.com
- **Domaine** : Configuration DNS

---

## 🎯 Architecture de déploiement

```
Internet
    ↓
[Netlify CDN] ← Frontend React
    ↓
[Backend API] ← https://ghvtest.ghvcameroon.com
    ↓
[Database] ← MySQL/PostgreSQL
```

---

## 🌐 Déploiement Frontend (Netlify)

### 1. Configuration automatique

Le projet est configuré pour un déploiement automatique :

```toml
# netlify.toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

# Redirections pour SPA
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 2. Variables d'environnement Netlify

Dans l'interface Netlify, configurer :

```bash
# Variables de production
VITE_API_BASE_URL=https://ghvtest.ghvcameroon.com
VITE_APP_ENV=production
VITE_APP_NAME=PRF
VITE_APP_VERSION=1.0.0
```

### 3. Processus de build

```bash
# Installation des dépendances
npm ci

# Build de production
npm run build

# Génération du dossier dist/
# ├── index.html
# ├── assets/
# │   ├── css/
# │   ├── js/
# │   └── images/
# └── _redirects
```

### 4. Optimisations de build

```typescript
// vite.config.ts - Configuration de production
export default defineConfig({
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2015',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['lucide-react'],
          charts: ['recharts'],
          utils: ['date-fns'],
        },
        assetFileNames: 'assets/[type]/[name]-[hash][extname]',
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    chunkSizeWarningLimit: 1000,
  }
});
```

---

## 🔧 Configuration Backend

### 1. Serveur de production

**URL** : https://ghvtest.ghvcameroon.com

### 2. Configuration CORS

Le backend doit autoriser les requêtes depuis :

```php
// config/cors.php (Laravel)
'allowed_origins' => [
    'https://comforting-cheesecake-4937dd.netlify.app',
    'https://prf.cm', // Domaine personnalisé
    'http://localhost:3000', // Développement
],

'allowed_methods' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],

'allowed_headers' => [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
],
```

### 3. Variables d'environnement backend

```bash
# .env (Backend)
APP_ENV=production
APP_DEBUG=false
APP_URL=https://ghvtest.ghvcameroon.com

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=prf_database
DB_USERNAME=prf_user
DB_PASSWORD=secure_password

MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=noreply@prf.cm
MAIL_PASSWORD=app_password

JWT_SECRET=your_jwt_secret_key
JWT_TTL=1440
```

### 4. Structure de la base de données

```sql
-- Tables principales
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE projects (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category_id BIGINT,
    image_url VARCHAR(500),
    is_free BOOLEAN DEFAULT TRUE,
    basic_price DECIMAL(10,2),
    classic_price DECIMAL(10,2),
    premium_price DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Autres tables : categories, blogs, service_providers, etc.
```

---

## 🔄 Processus de déploiement

### 1. Déploiement automatique (Recommandé)

#### Configuration GitHub + Netlify
1. **Connecter le repository** GitHub à Netlify
2. **Configurer les variables** d'environnement
3. **Activer le déploiement** automatique sur push
4. **Configurer les notifications** de déploiement

#### Workflow automatique
```
Git Push → GitHub → Netlify Build → Deploy → Live
```

### 2. Déploiement manuel

#### Via Netlify CLI
```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Login Netlify
netlify login

# Build local
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

#### Via interface Netlify
1. **Drag & drop** du dossier `dist/`
2. **Configuration** des redirections
3. **Test** de l'application

---

## 🌍 Configuration du domaine

### 1. Domaine personnalisé

#### Configuration DNS
```
Type    Name    Value
CNAME   www     comforting-cheesecake-4937dd.netlify.app
A       @       104.198.14.52 (IP Netlify)
```

#### Configuration Netlify
1. **Ajouter le domaine** dans les paramètres
2. **Configurer SSL** automatique
3. **Redirection** www vers apex (ou inverse)

### 2. Certificat SSL
- **Let's Encrypt** automatique via Netlify
- **Renouvellement** automatique
- **HTTPS** forcé

---

## 📊 Monitoring et Analytics

### 1. Netlify Analytics
- **Trafic** et pages vues
- **Performance** de chargement
- **Erreurs** 404
- **Bande passante** utilisée

### 2. Monitoring personnalisé
```typescript
// Performance monitoring
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    // Envoyer les métriques à un service
    sendMetrics({
      type: entry.entryType,
      duration: entry.duration,
      url: window.location.href
    });
  }
});
observer.observe({ entryTypes: ['navigation', 'paint'] });
```

### 3. Error tracking
```typescript
// Error boundary avec reporting
componentDidCatch(error: Error, errorInfo: ErrorInfo) {
  // Log local
  console.error('Error caught:', error, errorInfo);
  
  // Envoyer à un service de monitoring
  if (import.meta.env.PROD) {
    sendErrorReport({
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      url: window.location.href,
      userAgent: navigator.userAgent
    });
  }
}
```

---

## 🔒 Sécurité en production

### 1. Headers de sécurité
```toml
# netlify.toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
```

### 2. Variables sensibles
```bash
# Ne jamais exposer côté client
VITE_API_SECRET=❌ # Visible dans le bundle
API_SECRET=✅ # Côté serveur uniquement

# Variables publiques OK
VITE_API_BASE_URL=✅ # URL publique
VITE_APP_NAME=✅ # Nom de l'app
```

### 3. Validation des données
```typescript
// Validation stricte côté client
const validateApiResponse = (response: any): boolean => {
  return (
    response &&
    typeof response.success === 'boolean' &&
    (response.data || response.error)
  );
};
```

---

## 🚨 Gestion des erreurs

### 1. Stratégies de fallback
```typescript
// Fallback pour les images
<ImageWithFallback
  src={primaryImage}
  fallbackSrc={defaultImage}
  alt="Description"
/>

// Fallback pour les données API
const displayData = apiData || mockData || defaultData;
```

### 2. Retry logic
```typescript
// Retry automatique pour les appels API
const apiCallWithRetry = async (endpoint: string, retries = 3): Promise<any> => {
  for (let i = 0; i < retries; i++) {
    try {
      return await apiService.makeRequest(endpoint);
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
};
```

### 3. Graceful degradation
```typescript
// Dégradation gracieuse des fonctionnalités
const FeatureComponent = () => {
  const [isSupported, setIsSupported] = useState(true);
  
  useEffect(() => {
    // Vérifier le support de la fonctionnalité
    if (!window.fetch || !window.localStorage) {
      setIsSupported(false);
    }
  }, []);
  
  if (!isSupported) {
    return <FallbackComponent />;
  }
  
  return <FullFeatureComponent />;
};
```

---

## 📈 Optimisation des performances

### 1. Code splitting
```typescript
// Lazy loading des routes
const Projects = lazy(() => import('./pages/Projects'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

// Suspense wrapper
<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/projects" element={<Projects />} />
    <Route path="/admin" element={<AdminDashboard />} />
  </Routes>
</Suspense>
```

### 2. Optimisation des images
```typescript
// Images responsives
<img
  src={image}
  srcSet={`${image}?w=400 400w, ${image}?w=800 800w, ${image}?w=1200 1200w`}
  sizes="(max-width: 768px) 400px, (max-width: 1024px) 800px, 1200px"
  loading="lazy"
  alt="Description"
/>
```

### 3. Mise en cache
```typescript
// Service Worker pour la mise en cache (optionnel)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  navigator.serviceWorker.register('/sw.js');
}
```

---

## 🔄 CI/CD Pipeline

### 1. GitHub Actions (Optionnel)
```yaml
# .github/workflows/deploy.yml
name: Deploy to Netlify
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: netlify/actions/cli@master
        with:
          args: deploy --prod --dir=dist
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

### 2. Hooks de déploiement
```bash
# Pre-deploy hooks
npm run lint        # Vérification du code
npm run type-check  # Vérification TypeScript
npm run test        # Tests (si configurés)

# Post-deploy hooks
curl -X POST webhook-url  # Notification Slack/Discord
```

---

## 🧪 Tests de déploiement

### 1. Tests automatiques
```bash
# Tests de build
npm run build
npm run preview

# Tests de linting
npm run lint

# Tests de types
npx tsc --noEmit
```

### 2. Tests manuels post-déploiement
- [ ] **Page d'accueil** se charge correctement
- [ ] **Navigation** fonctionne sur toutes les pages
- [ ] **Authentification** (inscription/connexion)
- [ ] **API calls** retournent des données
- [ ] **Responsive design** sur mobile/tablet/desktop
- [ ] **Formulaires** de contact fonctionnent
- [ ] **Paiements** Mobile Money (en test)
- [ ] **Interface admin** accessible
- [ ] **Performance** acceptable (< 3s)

### 3. Tests de charge
```bash
# Outils recommandés
lighthouse https://your-domain.com
pagespeed insights
gtmetrix
webpagetest
```

---

## 🔧 Configuration avancée

### 1. Headers personnalisés
```toml
# netlify.toml
[[headers]]
  for = "/api/*"
  [headers.values]
    Access-Control-Allow-Origin = "*"
    Access-Control-Allow-Methods = "GET, POST, PUT, DELETE, OPTIONS"
    Access-Control-Allow-Headers = "Content-Type, Authorization"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### 2. Redirections personnalisées
```toml
# netlify.toml
[[redirects]]
  from = "/old-path/*"
  to = "/new-path/:splat"
  status = 301

[[redirects]]
  from = "/admin"
  to = "/admin/overview"
  status = 200
```

### 3. Variables d'environnement par branche
```toml
# netlify.toml
[context.production.environment]
  VITE_API_BASE_URL = "https://ghvtest.ghvcameroon.com"
  VITE_APP_ENV = "production"

[context.deploy-preview.environment]
  VITE_API_BASE_URL = "https://staging-api.ghvcameroon.com"
  VITE_APP_ENV = "staging"
```

---

## 📱 Déploiement mobile (PWA)

### 1. Configuration PWA
```json
// public/manifest.json
{
  "name": "PRF - Centre de Promotion",
  "short_name": "PRF",
  "description": "Plateforme entrepreneuriale camerounaise",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#2563eb",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### 2. Service Worker
```typescript
// public/sw.js
const CACHE_NAME = 'prf-v1';
const urlsToCache = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});
```

---

## 🔍 Monitoring post-déploiement

### 1. Métriques à surveiller
- **Uptime** : Disponibilité du site
- **Performance** : Core Web Vitals
- **Erreurs** : Taux d'erreur JavaScript
- **Trafic** : Nombre de visiteurs
- **Conversions** : Inscriptions, abonnements

### 2. Alertes automatiques
```javascript
// Monitoring des erreurs critiques
window.addEventListener('error', (event) => {
  if (import.meta.env.PROD) {
    fetch('/api/log-error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: event.error.message,
        stack: event.error.stack,
        url: window.location.href,
        timestamp: new Date().toISOString()
      })
    });
  }
});
```

### 3. Health checks
```bash
# Script de vérification automatique
#!/bin/bash
curl -f https://comforting-cheesecake-4937dd.netlify.app/health || exit 1
curl -f https://ghvtest.ghvcameroon.com/api/health || exit 1
echo "All services are healthy"
```

---

## 🛠️ Maintenance et mises à jour

### 1. Processus de mise à jour
```bash
# 1. Développement local
git checkout develop
git pull origin develop
npm install  # Nouvelles dépendances
npm run dev  # Test local

# 2. Tests
npm run lint
npm run build
npm run preview

# 3. Merge vers main
git checkout main
git merge develop
git push origin main

# 4. Déploiement automatique via Netlify
```

### 2. Rollback en cas de problème
```bash
# Via Netlify CLI
netlify sites:list
netlify api listSiteDeploys --site-id=SITE_ID
netlify api restoreSiteDeploy --site-id=SITE_ID --deploy-id=DEPLOY_ID

# Via interface Netlify
# Aller dans Deploys → Sélectionner version précédente → Publish deploy
```

### 3. Maintenance programmée
- **Mises à jour** de sécurité : Immédiat
- **Mises à jour** mineures : Mensuel
- **Mises à jour** majeures : Trimestriel
- **Backup** base de données : Quotidien

---

## 📞 Support et dépannage

### 1. Problèmes courants

#### Build fails
```bash
# Vérifier les dépendances
npm ci
rm -rf node_modules package-lock.json
npm install

# Vérifier les types
npx tsc --noEmit

# Vérifier le linting
npm run lint
```

#### API calls fail
```typescript
// Vérifier la configuration CORS
// Vérifier les variables d'environnement
// Tester les endpoints manuellement
console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL);
```

#### Performance issues
```bash
# Analyser le bundle
npm run build
npx vite-bundle-analyzer dist

# Optimiser les images
# Lazy load les composants
# Réduire les dépendances
```

### 2. Logs et debugging
```typescript
// Logs structurés en production
const logger = {
  info: (message: string, data?: any) => {
    if (import.meta.env.PROD) {
      // Envoyer à un service de logging
    } else {
      console.log(message, data);
    }
  },
  error: (message: string, error?: any) => {
    if (import.meta.env.PROD) {
      // Envoyer à un service d'erreur
    } else {
      console.error(message, error);
    }
  }
};
```

### 3. Contact support
- **Email technique** : dev@prf.cm
- **Documentation** : Ce guide
- **Issues GitHub** : Pour les bugs
- **Netlify Support** : Pour les problèmes d'hébergement

---

## 📋 Checklist de déploiement

### Pré-déploiement
- [ ] Code testé localement
- [ ] Variables d'environnement configurées
- [ ] Build réussi sans erreurs
- [ ] Linting passé
- [ ] Types TypeScript validés
- [ ] Images optimisées
- [ ] CORS configuré côté backend

### Déploiement
- [ ] Repository connecté à Netlify
- [ ] Variables d'environnement Netlify configurées
- [ ] Build automatique réussi
- [ ] Redirections SPA configurées
- [ ] SSL activé
- [ ] Domaine personnalisé configuré (si applicable)

### Post-déploiement
- [ ] Site accessible via HTTPS
- [ ] Toutes les pages se chargent
- [ ] API calls fonctionnent
- [ ] Authentification fonctionne
- [ ] Formulaires fonctionnent
- [ ] Responsive design validé
- [ ] Performance acceptable
- [ ] Monitoring activé
- [ ] Backup configuré

---

## 🎯 Prochaines étapes

### Améliorations futures
1. **PWA** complète avec offline support
2. **Tests automatisés** (Jest, Cypress)
3. **Monitoring avancé** (Sentry, LogRocket)
4. **CDN** pour les images
5. **Cache** intelligent
6. **Notifications push**

### Optimisations
1. **Bundle splitting** plus granulaire
2. **Preloading** des ressources critiques
3. **Service Worker** pour la mise en cache
4. **Compression** avancée des assets

---

*Guide de déploiement mis à jour le : Décembre 2024*
*Version : 1.0.0*