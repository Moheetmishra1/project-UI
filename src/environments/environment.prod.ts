import { commonEnvironment } from './common.environment';

export const environment = {
  production: true,
  env: 'production',
  apiBaseUrl: 'https://api.yourapp.com',
  
  // Extend common environment
  ...commonEnvironment,
  
  // Override common URLs for production
  url1: 'https://api.yourapp.com',
  url2: 'https://cdn.yourapp.com',
  url3: 'https://auth.yourapp.com',
  
  // Override feature flags for production
  features: {
    ...commonEnvironment.features,
    enableLogging: false,
    enableDebugInfo: false,
    enableAnalytics: true
  }
};
