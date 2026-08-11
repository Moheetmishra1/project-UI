/**
 * Common environment configuration
 * Define all common API endpoints and URLs here
 * These can be overridden in specific environment files
 */

export const commonEnvironment = {
  appName: 'AYUVA',
  appVersion: '1.0.0',
  
  // Common API endpoints (can be overridden in environment-specific files)
  apiEndpoints: {
    auth: '/auth',
    users: '/users',
    products: '/products',
    orders: '/orders',
    dashboard: '/dashboard',
    profile: '/profile',
    settings: '/settings'
  },
  
  // Common feature flags
  features: {
    enableLogging: true,
    enableDebugInfo: true,
    enableAnalytics: false
  },
  
  // Common API configuration
  apiTimeout: 30000,
  apiRetryAttempts: 3,
  apiRetryDelay: 1000,
  
  // Cache configuration
  cache: {
    enabled: true,
    ttl: 3600000 // 1 hour
  },
  
  // Pagination defaults
  pagination: {
    pageSize: 10,
    maxPageSize: 100
  },
  
  // Common URLs (can be overridden per environment)
  url1: 'https://api.example.com',
  url2: 'https://cdn.example.com',
  url3: 'https://auth.example.com'
};
