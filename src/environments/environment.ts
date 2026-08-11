import { commonEnvironment } from './common.environment';

export const environment = {
  production: false,
  env: 'development',
  apiBaseUrl: 'http://localhost:3000',
  
  // Extend common environment
  ...commonEnvironment,
  
  // Override common URLs for development
  url1: 'http://localhost:3000',
  url2: 'http://localhost:3001',
  url3: 'http://localhost:3002',
  
  // Override feature flags for development
  features: {
    ...commonEnvironment.features,
    enableLogging: true,
    enableDebugInfo: true,
    enableAnalytics: false
  }
};
