// API Configuration
export const API_CONFIG = {
  BASE_URL: '/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    REGISTER: '/register',
    LOGIN: '/login',
    VERIFY_OTP: '/verify-otp',
    FORGOT_PASSWORD: '/forgot-password',
    SET_PASSWORD: '/set-password',
  },
  
  // Projects
  PROJECTS: {
    BASE: '/projects',
    BY_ID: (id: number) => `/projects/${id}`,
    STEPS: (id: number) => `/projects/${id}/steps`,
    SUBSCRIPTIONS: (id: number) => `/projects/${id}/subscriptions`,
  },
  
  // Users
  USERS: {
    BASE: '/users',
    BY_ID: (id: number) => `/users/${id}`,
    UPDATE_TYPE: (id: number) => `/users/${id}/type`,
  },
  
  // Products
  PRODUCTS: {
    BASE: '/products',
    BY_ID: (id: number) => `/products/${id}`,
  },
  
  // Cart & Orders
  CART: {
    BASE: '/cart',
    BY_ID: (id: number) => `/cart/${id}`,
  },
  ORDERS: {
    BASE: '/orders',
    BY_ID: (id: number) => `/orders/${id}`,
    CHECKOUT: '/checkout',
    CONFIRM_PAYMENT: '/payment/confirm',
  },
  
  // Blog
  BLOG: {
    BASE: '/blogs',
    BY_ID: (id: number) => `/blogs/${id}`,
    COMMENTS: (id: number) => `/blogs/${id}/comments`,
  },
  
  // Contact & Support
  CONTACT: '/contact',
  CONTACTS: '/contacts',
  FORMALISATION: '/formalisation',
  
  // Service Providers
  SERVICE_PROVIDERS: {
    BASE: '/service-providers',
    BY_ID: (id: number) => `/service-providers/${id}`,
  },
  
  // Subscriptions
  SUBSCRIPTIONS: {
    BASE: '/subscriptions',
    BY_ID: (id: number) => `/subscriptions/${id}`,
    PAYMENT_CONFIRM: '/subscriptions/payment/confirm',
  },
  
  // Steps
  STEPS: {
    BASE: '/steps',
    BY_ID: (id: number) => `/steps/${id}`,
    INDEX: '/steps/index',
  },
  
  // Newsletter
  NEWSLETTER: {
    SEND: '/newsletter/send',
    SUBSCRIPTIONS: '/newsletter/subscriptions',
    UNSUBSCRIBE: '/newsletter/unsubscribe',
  },
  
  // Reports
  REPORTS: '/reports',
} as const;