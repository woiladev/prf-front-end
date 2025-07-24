# Documentation API PRF

## 🔌 API REST Documentation

**Base URL** : `https://ghvtest.ghvcameroon.com/api`

---

## 📋 Table des Matières

1. [Authentification](#authentification)
2. [Gestion des utilisateurs](#gestion-des-utilisateurs)
3. [Projets et initiatives](#projets-et-initiatives)
4. [Marketplace](#marketplace)
5. [Blog et contenu](#blog-et-contenu)
6. [Experts et services](#experts-et-services)
7. [Contact et formalisation](#contact-et-formalisation)
8. [Newsletter](#newsletter)
9. [Abonnements](#abonnements)
10. [Codes d'erreur](#codes-derreur)

---

## 🔐 Authentification

### Inscription
```http
POST /api/register
Content-Type: application/json

{
  "name": "string (required)",
  "email": "string (required, email format)",
  "password": "string (required, min 6 chars)"
}
```

**Réponse succès :**
```json
{
  "success": true,
  "data": {
    "message": "User registered successfully",
    "user": {
      "id": "string",
      "name": "string",
      "email": "string",
      "role": "user"
    }
  }
}
```

### Connexion
```http
POST /api/login
Content-Type: application/json

{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Réponse succès :**
```json
{
  "success": true,
  "data": {
    "message": "OTP sent to your email"
  }
}
```

### Vérification OTP
```http
POST /api/verify-otp
Content-Type: application/json

{
  "email": "string (required)",
  "otp": "string (required, 6 digits)"
}
```

**Réponse succès :**
```json
{
  "success": true,
  "data": {
    "message": "OTP verified successfully",
    "token": "jwt_token_string",
    "user": {
      "id": "string",
      "name": "string",
      "email": "string",
      "role": "user|admin"
    }
  }
}
```

### Renvoyer OTP
```http
POST /api/verify-otp
Content-Type: application/json

{
  "email": "string (required)",
  "otp": "resend"
}
```

### Mot de passe oublié
```http
POST /api/forgot-password
Content-Type: application/json

{
  "email": "string (required)"
}
```

### Réinitialiser mot de passe
```http
POST /api/set-password
Content-Type: application/json

{
  "email": "string (required)",
  "new_password": "string (required, min 6 chars)"
}
```

---

## 👥 Gestion des utilisateurs

### Liste des utilisateurs (Admin)
```http
GET /api/users
Authorization: Bearer {token}
```

**Réponse :**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "number",
        "name": "string",
        "email": "string",
        "role": "user|admin",
        "created_at": "datetime",
        "updated_at": "datetime"
      }
    ]
  }
}
```

### Détail utilisateur (Admin)
```http
GET /api/users/{id}
Authorization: Bearer {token}
```

### Modifier le rôle (Admin)
```http
PUT /api/users/{id}/type
Authorization: Bearer {token}
Content-Type: application/json

{
  "role": "user|admin"
}
```

---

## 📁 Projets et initiatives

### Liste des projets
```http
GET /api/projects
```

**Réponse :**
```json
{
  "success": true,
  "data": {
    "projects": [
      {
        "id": "number",
        "name": "string",
        "description": "string|null",
        "category_id": "number|null",
        "image_url": "string|null",
        "is_free": "boolean",
        "basic_price": "number|null",
        "classic_price": "number|null",
        "premium_price": "number|null",
        "created_at": "datetime",
        "updated_at": "datetime"
      }
    ]
  }
}
```

### Détail d'un projet
```http
GET /api/projects/{id}
```

### Créer un projet (Admin)
```http
POST /api/projects
Authorization: Bearer {token}
Content-Type: multipart/form-data

name: string (required)
category_id: number (required)
description: string (optional)
is_free: boolean (required)
basic_price: number (optional, if not free)
classic_price: number (optional, if not free)
premium_price: number (optional, if not free)
image: file (optional, max 2MB)
```

### Modifier un projet (Admin)
```http
PUT /api/projects/{id}
Authorization: Bearer {token}
Content-Type: multipart/form-data

# Mêmes champs que la création
```

### Supprimer un projet (Admin)
```http
DELETE /api/projects/{id}
Authorization: Bearer {token}
```

### Catégories
```http
GET /api/categories
POST /api/categories (Admin)
PUT /api/categories/{id} (Admin)
DELETE /api/categories/{id} (Admin)
```

---

## 🛍️ Marketplace

### Produits

#### Liste des produits
```http
GET /api/products
```

**Réponse :**
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "number",
        "name": "string",
        "description": "string|null",
        "price": "number",
        "stock": "number",
        "image_url": "string|null",
        "created_at": "datetime",
        "updated_at": "datetime"
      }
    ]
  }
}
```

#### Détail produit
```http
GET /api/products/{id}
```

#### Créer un produit (Admin)
```http
POST /api/products
Authorization: Bearer {token}
Content-Type: multipart/form-data

name: string (required)
description: string (optional)
price: number (required)
stock: number (required)
image: file (optional, max 2MB)
```

### Panier

#### Contenu du panier
```http
GET /api/cart
Authorization: Bearer {token}
```

#### Ajouter au panier
```http
POST /api/cart
Authorization: Bearer {token}
Content-Type: application/json

{
  "product_id": "number (required)",
  "quantity": "number (required, min 1)"
}
```

#### Modifier quantité
```http
PUT /api/cart/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "quantity": "number (required, min 1)"
}
```

#### Supprimer du panier
```http
DELETE /api/cart/{id}
Authorization: Bearer {token}
```

### Commandes

#### Checkout
```http
POST /api/checkout
Authorization: Bearer {token}
Content-Type: application/json

{
  "operator": "mtn|orange (optional)"
}
```

**Réponse :**
```json
{
  "success": true,
  "data": {
    "message": "Order created successfully",
    "order": {
      "id": "number",
      "total_amount": "number",
      "status": "pending",
      "operator": "string",
      "items": [
        {
          "id": "number",
          "product_id": "number",
          "quantity": "number",
          "price": "number",
          "product": {
            "name": "string",
            "image_url": "string"
          }
        }
      ],
      "created_at": "datetime"
    }
  }
}
```

#### Mes commandes
```http
GET /api/orders
Authorization: Bearer {token}
```

#### Confirmer paiement
```http
POST /api/payment/confirm
Content-Type: application/json

{
  "order_id": "number (required)",
  "payment_status": "success|failed (required)"
}
```

---

## 📝 Blog et contenu

### Articles de blog

#### Liste des articles
```http
GET /api/blogs
```

**Réponse :**
```json
{
  "success": true,
  "data": {
    "blogs": [
      {
        "id": "number",
        "title": "string",
        "content": "string",
        "author": "string|null",
        "image_url": "string|null",
        "video": "string|null",
        "created_at": "datetime",
        "updated_at": "datetime"
      }
    ]
  }
}
```

#### Détail d'un article
```http
GET /api/blogs/{id}
```

#### Créer un article (Admin)
```http
POST /api/blogs
Authorization: Bearer {token}
Content-Type: multipart/form-data

title: string (required)
content: string (required)
author: string (optional)
image: file (optional, max 2MB)
video: file (optional, max 10MB)
```

### Commentaires

#### Commentaires d'un article
```http
GET /api/blogs/{id}/comments
```

#### Ajouter un commentaire
```http
POST /api/blogs/{id}/comments
Content-Type: application/json

{
  "name": "string (required)",
  "email": "string (required, email format)",
  "content": "string (required)"
}
```

#### Supprimer un commentaire (Admin)
```http
DELETE /api/comments/{id}
Authorization: Bearer {token}
```

---

## 👨‍💼 Experts et services

### Service Providers (Experts)

#### Liste des experts
```http
GET /api/service-providers
```

**Réponse :**
```json
{
  "success": true,
  "data": {
    "service_providers": [
      {
        "id": "number",
        "name": "string",
        "email": "string",
        "phone": "string|null",
        "job_title": "string|null",
        "location": "string|null",
        "description": "string|null",
        "image_url": "string|null",
        "created_at": "datetime",
        "updated_at": "datetime"
      }
    ]
  }
}
```

#### Détail d'un expert
```http
GET /api/service-providers/{id}
```

#### Créer un expert (Admin)
```http
POST /api/service-providers
Authorization: Bearer {token}
Content-Type: multipart/form-data

name: string (required)
email: string (required)
phone: string (optional)
job_title: string (optional)
location: string (optional)
description: string (optional)
image: file (optional, max 2MB)
```

### Avis sur les experts

#### Avis d'un expert
```http
GET /api/service-providers/{id}/reviews
```

#### Ajouter un avis
```http
POST /api/service-providers/{id}/reviews
Content-Type: application/json

{
  "name": "string (required)",
  "email": "string (required, email format)",
  "rating": "number (required, 1-5)",
  "comment": "string (optional)"
}
```

---

## 💬 Contact et formalisation

### Contact

#### Envoyer un message
```http
POST /api/contact
Content-Type: application/json

{
  "name": "string (required)",
  "email": "string (required, email format)",
  "phone": "string (required)",
  "request_type": "string (required)",
  "object": "string (required)",
  "message": "string (required)"
}
```

**Types de demande :**
- `general` : Question générale
- `support` : Support technique
- `partnership` : Partenariat
- `expert` : Devenir expert
- `feedback` : Feedback
- `business` : Développement d'affaires
- `legal` : Questions juridiques
- `technical` : Assistance technique

#### Liste des contacts (Admin)
```http
GET /api/contacts
Authorization: Bearer {token}
```

### Formalisation

#### Demande de formalisation
```http
POST /api/formalisation
Content-Type: application/json

{
  "name": "string (required)",
  "email": "string (required, email format)",
  "phone": "string (required)",
  "location": "string (required)",
  "structure": "string (required)",
  "sector": "string (required)",
  "description": "string (required)"
}
```

#### Liste des demandes (Admin)
```http
GET /api/formalisation
Authorization: Bearer {token}
```

---

## 📧 Newsletter

### S'abonner
```http
POST /api/newsletter/subscribe
Content-Type: application/json

{
  "email": "string (required, email format)"
}
```

### Se désabonner
```http
POST /api/newsletter/unsubscribe
Content-Type: application/json

{
  "email": "string (required, email format)"
}
```

### Envoyer newsletter (Admin)
```http
POST /api/newsletter/send
Authorization: Bearer {token}
Content-Type: application/json

{
  "subject": "string (required)",
  "content": "string (required)"
}
```

### Liste des abonnés (Admin)
```http
GET /api/newsletter/subscriptions
Authorization: Bearer {token}
```

---

## 💎 Abonnements

### Créer un abonnement
```http
POST /api/subscriptions
Authorization: Bearer {token}
Content-Type: application/json

{
  "project_id": "number (required)",
  "subscription_level": "Basic|Classic|Premium (required)",
  "operator": "mtn|orange (required)"
}
```

### Mes abonnements
```http
GET /api/subscriptions
Authorization: Bearer {token}
```

### Confirmer paiement abonnement
```http
POST /api/subscriptions/payment/confirm
Content-Type: application/json

{
  "subscription_id": "number (required)",
  "payment_status": "success|failed (required)"
}
```

---

## 📊 Success Stories

### Liste des success stories
```http
GET /api/success-stories
```

### Détail d'une success story
```http
GET /api/success-stories/{id}
```

### Créer une success story (Admin)
```http
POST /api/success-stories
Authorization: Bearer {token}
Content-Type: multipart/form-data

title: string (required)
description: string (required)
image: file (optional, max 2MB)
```

---

## ⚠️ Codes d'erreur

### Codes HTTP
- **200** : Succès
- **201** : Créé avec succès
- **400** : Requête invalide
- **401** : Non authentifié
- **403** : Accès refusé
- **404** : Ressource non trouvée
- **422** : Données de validation invalides
- **500** : Erreur serveur

### Format d'erreur
```json
{
  "success": false,
  "error": "Message d'erreur court",
  "message": "Description détaillée de l'erreur"
}
```

### Erreurs courantes

#### Authentification
```json
{
  "success": false,
  "error": "Invalid credentials",
  "message": "Email ou mot de passe incorrect"
}
```

#### Validation
```json
{
  "success": false,
  "error": "Validation failed",
  "message": "Le champ email est requis"
}
```

#### Autorisation
```json
{
  "success": false,
  "error": "Unauthorized",
  "message": "Accès administrateur requis"
}
```

---

## 🔧 Utilisation côté client

### Configuration du service API
```typescript
// src/services/api.ts
class ApiService {
  private baseUrl = 'https://ghvtest.ghvcameroon.com/api';
  
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      mode: 'cors',
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || `HTTP error! status: ${response.status}`,
      };
    }

    return {
      success: true,
      data,
    };
  }
}
```

### Authentification avec token
```typescript
// Ajouter le token aux requêtes authentifiées
private async makeAuthenticatedRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = localStorage.getItem('prf_token');
  
  return this.makeRequest(endpoint, {
    ...options,
    headers: {
      ...options.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
}
```

### Gestion des uploads
```typescript
// Upload de fichiers
private async makeFormRequest<T>(
  endpoint: string,
  formData: FormData,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = localStorage.getItem('prf_token');
  
  const response = await fetch(`${this.baseUrl}${endpoint}`, {
    method: 'POST',
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
      // Ne pas définir Content-Type pour FormData
    },
    body: formData,
    ...options,
  });

  return await response.json();
}
```

---

## 🧪 Tests API

### Tests avec curl

#### Inscription
```bash
curl -X POST https://ghvtest.ghvcameroon.com/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

#### Connexion
```bash
curl -X POST https://ghvtest.ghvcameroon.com/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

#### Requête authentifiée
```bash
curl -X GET https://ghvtest.ghvcameroon.com/api/projects \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Tests avec Postman

#### Collection Postman
```json
{
  "info": {
    "name": "PRF API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [
    {
      "key": "baseUrl",
      "value": "https://ghvtest.ghvcameroon.com/api"
    },
    {
      "key": "token",
      "value": ""
    }
  ],
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Register",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"Test User\",\n  \"email\": \"test@example.com\",\n  \"password\": \"password123\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/register",
              "host": ["{{baseUrl}}"],
              "path": ["register"]
            }
          }
        }
      ]
    }
  ]
}
```

---

## 🔄 Gestion des erreurs côté client

### Wrapper de gestion d'erreurs
```typescript
// Wrapper pour les appels API avec gestion d'erreurs
const apiCall = async <T>(
  apiMethod: () => Promise<ApiResponse<T>>,
  onSuccess?: (data: T) => void,
  onError?: (error: string) => void
): Promise<void> => {
  try {
    const response = await apiMethod();
    
    if (response.success && response.data) {
      onSuccess?.(response.data);
    } else {
      onError?.(response.error || 'Une erreur est survenue');
    }
  } catch (error) {
    onError?.('Erreur de connexion');
  }
};

// Utilisation
await apiCall(
  () => apiService.getProjects(),
  (data) => setProjects(data.projects),
  (error) => showToast(error, 'error')
);
```

### Retry automatique
```typescript
// Retry logic pour les appels critiques
const apiCallWithRetry = async <T>(
  apiMethod: () => Promise<ApiResponse<T>>,
  maxRetries = 3,
  delay = 1000
): Promise<ApiResponse<T>> => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await apiMethod();
      
      if (response.success || attempt === maxRetries) {
        return response;
      }
      
      // Attendre avant le prochain essai
      await new Promise(resolve => setTimeout(resolve, delay * attempt));
    } catch (error) {
      if (attempt === maxRetries) {
        return {
          success: false,
          error: 'Erreur de connexion après plusieurs tentatives'
        };
      }
    }
  }
  
  return { success: false, error: 'Échec après tous les essais' };
};
```

---

## 📈 Monitoring et logs

### Logs d'API côté client
```typescript
// Logger pour les appels API
const apiLogger = {
  request: (endpoint: string, options?: RequestInit) => {
    if (import.meta.env.DEV) {
      console.log(`🔵 API Request: ${endpoint}`, options);
    }
  },
  
  response: (endpoint: string, response: any, duration: number) => {
    if (import.meta.env.DEV) {
      console.log(`🟢 API Response: ${endpoint} (${duration}ms)`, response);
    }
  },
  
  error: (endpoint: string, error: any) => {
    console.error(`🔴 API Error: ${endpoint}`, error);
    
    // Envoyer à un service de monitoring en production
    if (import.meta.env.PROD) {
      // sendToMonitoring({ endpoint, error, timestamp: Date.now() });
    }
  }
};
```

### Métriques de performance
```typescript
// Mesurer les performances des appels API
const measureApiCall = async <T>(
  apiMethod: () => Promise<T>,
  endpoint: string
): Promise<T> => {
  const startTime = performance.now();
  
  try {
    const result = await apiMethod();
    const duration = performance.now() - startTime;
    
    apiLogger.response(endpoint, result, duration);
    
    // Alerter si trop lent
    if (duration > 5000) {
      console.warn(`⚠️ Slow API call: ${endpoint} took ${duration}ms`);
    }
    
    return result;
  } catch (error) {
    apiLogger.error(endpoint, error);
    throw error;
  }
};
```

---

## 🔒 Sécurité API

### Validation côté client
```typescript
// Validation des données avant envoi
const validateApiData = (data: any, schema: any): boolean => {
  // Validation basique
  for (const [key, rules] of Object.entries(schema)) {
    const value = data[key];
    
    if (rules.required && (!value || value.trim() === '')) {
      throw new Error(`${key} est requis`);
    }
    
    if (rules.email && !isValidEmail(value)) {
      throw new Error(`${key} doit être un email valide`);
    }
    
    if (rules.minLength && value.length < rules.minLength) {
      throw new Error(`${key} doit contenir au moins ${rules.minLength} caractères`);
    }
  }
  
  return true;
};
```

### Sanitisation des données
```typescript
// Nettoyer les données utilisateur
const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Supprimer les balises HTML basiques
    .substring(0, 1000); // Limiter la longueur
};

// Utilisation
const cleanData = {
  name: sanitizeInput(formData.name),
  email: formData.email.toLowerCase().trim(),
  message: sanitizeInput(formData.message)
};
```

---

## 📚 Exemples d'intégration

### Hook React personnalisé
```typescript
// Hook pour les appels API
function useApi<T>(endpoint: string, dependencies: any[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await apiService.makeRequest<T>(endpoint);
        
        if (response.success && response.data) {
          setData(response.data);
        } else {
          setError(response.error || 'Erreur inconnue');
        }
      } catch (err) {
        setError('Erreur de connexion');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return { data, loading, error, refetch: () => fetchData() };
}

// Utilisation
const ProjectsList = () => {
  const { data, loading, error } = useApi<{projects: Project[]}>('/projects');
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  
  return (
    <div>
      {data?.projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};
```

---

*Documentation API mise à jour le : Décembre 2024*
*Version : 1.0.0*