import { commonEnvironment } from './common.environment';
import type { Environment } from './environment.model';

export const environment: Environment = {
  production: false,
  env: 'development',
  domainName: 'http://dev.ayuva.local:4200',
  apiBaseUrl: 'https://dev-api.ayuva.com',

  ...commonEnvironment,

  // Override URLs for development environment
  url1: 'https://dev-api.ayuva.com',
  url2: 'https://dev-cdn.ayuva.com',
  url3: 'https://dev-auth.ayuva.com'
};
