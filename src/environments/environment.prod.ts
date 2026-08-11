import { commonEnvironment } from './common.environment';
import type { Environment } from './environment.model';

export const environment: Environment = {
  production: true,
  env: 'production',
  domainName: 'https://www.ayuva.com',
  apiBaseUrl: 'https://api.ayuva.com',

  ...commonEnvironment,

  // Override URLs for production
  url1: 'https://api.ayuva.com',
  url2: 'https://cdn.ayuva.com',
  url3: 'https://auth.ayuva.com'
};
