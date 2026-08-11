import { environment } from '../environments/environment';

export const AppConfig = {
  environment: environment.env,
  production: environment.production,
  apiBaseUrl: environment.apiBaseUrl,
  apiEndpoints: environment.apiEndpoints,
  
  // Custom URLs
  url1: environment.url1,
  url2: environment.url2,
  url3: environment.url3,
  
  // Common configuration
  appName: environment.appName,
  appVersion: environment.appVersion,
  
  // Feature flags
  features: environment.features,
  
  // API timeouts (in milliseconds)
  apiTimeout: environment.apiTimeout,
  apiRetryAttempts: environment.apiRetryAttempts,
  apiRetryDelay: environment.apiRetryDelay,
  
  // Cache configuration
  cache: environment.cache,
  
  // Pagination
  pagination: environment.pagination
};
