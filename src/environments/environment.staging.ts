import { commonEnvironment } from './common.environment';

export const environment = {
  production: false,
  env: 'staging',
  apiBaseUrl: 'https://staging-api.yourapp.com',
  
  // Extend common environment
  ...commonEnvironment,
  
  // Override common URLs for staging
  url1: 'https://staging-api.yourapp.com',
  url2: 'https://staging-cdn.yourapp.com',
  url3: 'https://staging-auth.yourapp.com',
  
  // Override feature flags for staging
  features: {
    ...commonEnvironment.features,
    enableLogging: true,
    enableDebugInfo: false,
    enableAnalytics: true
  }
};
